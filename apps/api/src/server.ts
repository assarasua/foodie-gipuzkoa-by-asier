import "dotenv/config";
import cors from "cors";
import express, { type Request, type Response } from "express";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

if (!process.env.DATABASE_URL && process.env.DATABASE_PUBLIC_URL) {
  process.env.DATABASE_URL = process.env.DATABASE_PUBLIC_URL;
}

const prisma = new PrismaClient();
const app = express();

const PORT = Number(process.env.PORT ?? 8080);
const API_BASE_URL = process.env.API_BASE_URL ?? "https://api.gipuzkoafoodie.eu";
const CORS_ORIGIN = process.env.CORS_ORIGIN ?? "https://gipuzkoafoodie.eu,https://www.gipuzkoafoodie.eu";
const allowedOrigins = CORS_ORIGIN.split(",").map((origin) => origin.trim());

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }
      callback(new Error(`Origin not allowed by CORS: ${origin}`));
    }
  })
);
app.use(express.json());

const localeSchema = z.enum(["es", "en"]).default("es");
const numberSchema = z.preprocess((value) => Number(value), z.number().int().positive());
const sortSchema = z.enum(["recommended", "highest-rated", "price-low", "price-high"]).default("recommended");

const asyncHandler =
  (handler: (req: Request, res: Response) => Promise<void>) =>
  (req: Request, res: Response, next: express.NextFunction) =>
    Promise.resolve(handler(req, res)).catch(next);

app.get("/v1/health", asyncHandler(async (_req: Request, res: Response) => {
  let db = "ok";
  try {
    await prisma.$queryRaw`SELECT 1`;
  } catch {
    db = "error";
  }

  res.status(200).json({
    status: "ok",
    db,
    service: API_BASE_URL,
    timestamp: new Date().toISOString()
  });
}));

app.get("/v1/categories", asyncHandler(async (req: Request, res: Response) => {
  const locale = localeSchema.parse(req.query.locale);

  const categories = await prisma.category.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
    select: {
      slug: true,
      emoji: true,
      titleEs: true,
      titleEn: true,
      descriptionEs: true,
      descriptionEn: true
    }
  });

  res.json({
    data: categories.map((category: {
      slug: string;
      emoji: string;
      titleEs: string;
      titleEn: string;
      descriptionEs: string;
      descriptionEn: string;
    }) => ({
      slug: category.slug,
      emoji: category.emoji,
      title: locale === "en" ? category.titleEn : category.titleEs,
      description: locale === "en" ? category.descriptionEn : category.descriptionEs
    }))
  });
}));

app.get("/v1/restaurants", asyncHandler(async (req: Request, res: Response) => {
  const locale = localeSchema.parse(req.query.locale);
  const categorySlug = typeof req.query.categorySlug === "string" ? req.query.categorySlug : undefined;
  const search = typeof req.query.search === "string" ? req.query.search.trim() : "";
  const city = typeof req.query.city === "string" ? req.query.city.trim() : "";
  const priceTierRaw = typeof req.query.priceTier === "string" ? req.query.priceTier : undefined;
  const ratingMinRaw = typeof req.query.ratingMin === "string" ? req.query.ratingMin : undefined;
  const includeYoungTalentsRaw = typeof req.query.includeYoungTalents === "string" ? req.query.includeYoungTalents : "";
  const sort = sortSchema.parse(req.query.sort);
  const pageRaw = typeof req.query.page === "string" ? req.query.page : "1";
  const limitRaw = typeof req.query.limit === "string" ? req.query.limit : "100";

  const page = numberSchema.parse(pageRaw);
  const limit = numberSchema.parse(limitRaw);
  const priceTier = priceTierRaw ? numberSchema.parse(priceTierRaw) : undefined;
  const ratingMin = ratingMinRaw ? numberSchema.parse(ratingMinRaw) : undefined;
  const includeYoungTalents = ["1", "true", "yes"].includes(includeYoungTalentsRaw.toLowerCase());

  const restaurantWhere = {
    isPublished: true,
    ...(includeYoungTalents ? {} : { isYoungTalent: false }),
    ...(categorySlug
      ? {
          category: {
            slug: categorySlug
          }
        }
      : {}),
    ...(city ? { city: { contains: city, mode: "insensitive" as const } } : {}),
    ...(priceTier ? { priceTier } : {}),
    ...(ratingMin ? { ratingAsier: { gte: ratingMin } } : {}),
    ...(search
      ? {
          OR: [
            { nameEs: { contains: search, mode: "insensitive" as const } },
            { nameEn: { contains: search, mode: "insensitive" as const } },
            { specialtyEs: { contains: search, mode: "insensitive" as const } },
            { specialtyEn: { contains: search, mode: "insensitive" as const } },
            { descriptionEs: { contains: search, mode: "insensitive" as const } },
            { descriptionEn: { contains: search, mode: "insensitive" as const } },
            { city: { contains: search, mode: "insensitive" as const } }
          ]
        }
      : {})
  };

  const [total, restaurants] = await prisma.$transaction([
    prisma.restaurant.count({
      where: restaurantWhere
    }),
    prisma.restaurant.findMany({
      where: restaurantWhere,
      orderBy:
        sort === "highest-rated"
          ? [{ ratingAsier: "desc" }, { nameEs: "asc" }]
          : sort === "price-low"
            ? [{ priceTier: "asc" }, { ratingAsier: "desc" }]
            : sort === "price-high"
              ? [{ priceTier: "desc" }, { ratingAsier: "desc" }]
              : [{ ratingAsier: "desc" }, { nameEs: "asc" }],
      skip: (page - 1) * limit,
      take: limit,
      include: {
        category: {
          select: {
            slug: true,
            titleEs: true,
            titleEn: true
          }
        }
      }
    })
  ]);

  res.json({
    data: restaurants.map((restaurant: {
      slug: string;
      nameEs: string;
      nameEn: string;
      specialtyEs: string;
      specialtyEn: string;
      descriptionEs: string;
      descriptionEn: string;
      city: string;
      locationLabel: string;
      priceTier: number;
      ratingAsier: number | null;
      isYoungTalent: boolean;
      age: number | null;
      mapUrl: string | null;
      websiteUrl: string | null;
      imageUrl: string | null;
      category: { slug: string; titleEs: string; titleEn: string };
    }) => ({
      slug: restaurant.slug,
      name: locale === "en" ? restaurant.nameEn : restaurant.nameEs,
      specialty: locale === "en" ? restaurant.specialtyEn : restaurant.specialtyEs,
      description: locale === "en" ? restaurant.descriptionEn : restaurant.descriptionEs,
      categorySlug: restaurant.category.slug,
      categoryName: locale === "en" ? restaurant.category.titleEn : restaurant.category.titleEs,
      city: restaurant.city,
      locationLabel: restaurant.locationLabel,
      priceTier: restaurant.priceTier,
      ratingAsier: restaurant.ratingAsier,
      isYoungTalent: restaurant.isYoungTalent,
      age: restaurant.age,
      mapUrl: restaurant.mapUrl,
      websiteUrl: restaurant.websiteUrl,
      imageUrl: restaurant.imageUrl
    })),
    total,
    hasMore: page * limit < total,
    count: restaurants.length,
    page,
    limit
  });
}));

app.get("/v1/talents", asyncHandler(async (req: Request, res: Response) => {
  const search = typeof req.query.search === "string" ? req.query.search.trim() : "";
  const sector = typeof req.query.sector === "string" ? req.query.sector.trim() : "";
  const location = typeof req.query.location === "string" ? req.query.location.trim() : "";
  const pageRaw = typeof req.query.page === "string" ? req.query.page : "1";
  const limitRaw = typeof req.query.limit === "string" ? req.query.limit : "100";
  const page = numberSchema.parse(pageRaw);
  const limit = numberSchema.parse(limitRaw);

  const talentsWhere = {
    ...(sector ? { sector } : {}),
    ...(location ? { location: { contains: location, mode: "insensitive" as const } } : {}),
    ...(search
      ? {
          OR: [
            { name: { contains: search, mode: "insensitive" as const } },
            { company: { contains: search, mode: "insensitive" as const } },
            { role: { contains: search, mode: "insensitive" as const } },
            { location: { contains: search, mode: "insensitive" as const } }
          ]
        }
      : {})
  };

  const [total, talents] = await prisma.$transaction([
    prisma.talent.count({
      where: talentsWhere
    }),
    prisma.talent.findMany({
      where: talentsWhere,
      orderBy: [{ name: "asc" }],
      skip: (page - 1) * limit,
      take: limit
    })
  ]);

  res.json({
    data: talents,
    total,
    hasMore: page * limit < total,
    count: talents.length,
    page,
    limit
  });
}));

app.use((_req, res) => {
  res.status(404).json({
    error: "Not Found"
  });
});

app.use((error: unknown, _req: Request, res: Response, _next: express.NextFunction) => {
  if (error instanceof z.ZodError) {
    res.status(400).json({
      error: "Invalid request parameters",
      details: error.issues
    });
    return;
  }

  const message = error instanceof Error ? error.message : "Internal Server Error";
  console.error("Unhandled API error:", error);
  res.status(500).json({
    error: message
  });
});

app.listen(PORT, () => {
  console.log(`API listening on port ${PORT}`);
});
