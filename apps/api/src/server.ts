import "dotenv/config";
import cors from "cors";
import express, { type Request, type Response } from "express";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

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

app.get("/v1/health", async (_req: Request, res: Response) => {
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
});

app.get("/v1/categories", async (req: Request, res: Response) => {
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
    data: categories.map((category) => ({
      slug: category.slug,
      emoji: category.emoji,
      title: locale === "en" ? category.titleEn : category.titleEs,
      description: locale === "en" ? category.descriptionEn : category.descriptionEs
    }))
  });
});

app.get("/v1/restaurants", async (req: Request, res: Response) => {
  const locale = localeSchema.parse(req.query.locale);
  const categorySlug = typeof req.query.categorySlug === "string" ? req.query.categorySlug : undefined;

  const restaurants = await prisma.restaurant.findMany({
    where: {
      isPublished: true,
      ...(categorySlug
        ? {
            category: {
              slug: categorySlug
            }
          }
        : {})
    },
    orderBy: [{ ratingAsier: "desc" }, { nameEs: "asc" }],
    include: {
      category: {
        select: {
          slug: true,
          titleEs: true,
          titleEn: true
        }
      }
    }
  });

  res.json({
    data: restaurants.map((restaurant) => ({
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
    count: restaurants.length
  });
});

app.use((_req, res) => {
  res.status(404).json({
    error: "Not Found"
  });
});

app.listen(PORT, () => {
  console.log(`API listening on port ${PORT}`);
});
