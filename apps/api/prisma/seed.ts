import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import talentsSeed from "./talents.seed.json" with { type: "json" };

const prisma = new PrismaClient();

type SeedCategory = {
  slug: string;
  emoji: string;
  sortOrder: number;
  titleEs: string;
  titleEn: string;
  descriptionEs: string;
  descriptionEn: string;
};

type SeedRestaurant = {
  slug: string;
  categorySlug: string;
  nameEs: string;
  nameEn: string;
  specialtyEs: string;
  specialtyEn: string;
  descriptionEs: string;
  descriptionEn: string;
  city: string;
  locationLabel: string;
  priceTier: number;
  ratingAsier?: number;
  isYoungTalent?: boolean;
  age?: number;
  mapUrl?: string;
};

type SeedTalent = {
  name: string;
  role: string;
  company: string;
  location: string;
  sector: string;
  description?: string;
};

const categories: SeedCategory[] = [
  {
    slug: "pintxos",
    emoji: "🍤",
    sortOrder: 1,
    titleEs: "Pintxos Donosti",
    titleEn: "Pintxos Donosti",
    descriptionEs: "Ruta de pintxos por Donostia con cocina tradicional y creativa.",
    descriptionEn: "Pintxos route in Donostia with traditional and creative cuisine."
  },
  {
    slug: "vegetarianos",
    emoji: "🌱",
    sortOrder: 2,
    titleEs: "Vegetarianos",
    titleEn: "Vegetarian",
    descriptionEs: "Opciones vegetarianas y veganas innovadoras en Gipuzkoa.",
    descriptionEn: "Innovative vegetarian and vegan options in Gipuzkoa."
  },
  {
    slug: "txakolindegis",
    emoji: "🍇",
    sortOrder: 3,
    titleEs: "Txakolindegis",
    titleEn: "Txakolindegis",
    descriptionEs: "Bodegas y txakolindegis con tradición de Getariako Txakolina.",
    descriptionEn: "Wineries and txakolindegis with Getariako Txakolina tradition."
  },
  {
    slug: "pescados-mariscos",
    emoji: "🌊",
    sortOrder: 4,
    titleEs: "Pescados & Mariscos",
    titleEn: "Fish & Seafood",
    descriptionEs: "Cocina del Cantábrico con producto fresco y técnica local.",
    descriptionEn: "Cantabrian cuisine with fresh seafood and local technique."
  },
  {
    slug: "carnes",
    emoji: "🐄",
    sortOrder: 5,
    titleEs: "Carnes",
    titleEn: "Meats",
    descriptionEs: "Asadores y templos del chuletón en Gipuzkoa.",
    descriptionEn: "Steakhouses and meat temples in Gipuzkoa."
  },
  {
    slug: "sidreria",
    emoji: "🍎",
    sortOrder: 6,
    titleEs: "Sidrería",
    titleEn: "Cider House",
    descriptionEs: "Sidrerías tradicionales con menú vasco clásico.",
    descriptionEn: "Traditional cider houses with classic Basque menu."
  },
  {
    slug: "estrellas-desconocidas",
    emoji: "⭐",
    sortOrder: 7,
    titleEs: "Estrellas Desconocidas",
    titleEn: "Unknown Stars",
    descriptionEs: "Propuestas Michelin y jóvenes talentos gastronómicos.",
    descriptionEn: "Michelin proposals and emerging culinary talent."
  }
];

const restaurants: SeedRestaurant[] = [
  {
    slug: "green-garden",
    categorySlug: "vegetarianos",
    nameEs: "Green Garden",
    nameEn: "Green Garden",
    specialtyEs: "Cocina vegana",
    specialtyEn: "Vegan cuisine",
    descriptionEs: "Restaurante vegano con producto local y menú cambiante.",
    descriptionEn: "Vegan restaurant with local produce and changing menu.",
    city: "Donostia",
    locationLabel: "Donostia",
    priceTier: 2,
    mapUrl: "https://maps.google.com/?q=Green+Garden+Donostia"
  },
  {
    slug: "verdura-co",
    categorySlug: "vegetarianos",
    nameEs: "Verdura & Co",
    nameEn: "Verdura & Co",
    specialtyEs: "Vegetariano gourmet",
    specialtyEn: "Gourmet vegetarian",
    descriptionEs: "Cocina vegetal mediterránea y vasca con mercado local.",
    descriptionEn: "Mediterranean and Basque plant-based cuisine from local markets.",
    city: "Tolosa",
    locationLabel: "Tolosa",
    priceTier: 2,
    mapUrl: "https://maps.google.com/?q=Verdura+Co+Tolosa"
  },
  {
    slug: "plant-based-pintxos",
    categorySlug: "vegetarianos",
    nameEs: "Plant Based Pintxos",
    nameEn: "Plant Based Pintxos",
    specialtyEs: "Pintxos veganos",
    specialtyEn: "Vegan pintxos",
    descriptionEs: "Pintxos vegetales en la Parte Vieja de Donostia.",
    descriptionEn: "Plant-based pintxos in Donostia Old Town.",
    city: "Donostia",
    locationLabel: "Donostia - Parte Vieja",
    priceTier: 1,
    mapUrl: "https://maps.google.com/?q=Plant+Based+Pintxos+Donostia"
  },
  {
    slug: "txomin-etxaniz",
    categorySlug: "txakolindegis",
    nameEs: "Txomin Etxaniz",
    nameEn: "Txomin Etxaniz",
    specialtyEs: "Txakoli tradicional",
    specialtyEn: "Traditional txakoli",
    descriptionEs: "Txakolindegi de referencia en Getaria.",
    descriptionEn: "Reference txakolindegi in Getaria.",
    city: "Getaria",
    locationLabel: "Getaria",
    priceTier: 2,
    ratingAsier: 2,
    mapUrl: "https://maps.google.com/?q=Txomin+Etxaniz+Getaria"
  },
  {
    slug: "gaintza",
    categorySlug: "txakolindegis",
    nameEs: "Gaintza",
    nameEn: "Gaintza",
    specialtyEs: "Txakoli premium",
    specialtyEn: "Premium txakoli",
    descriptionEs: "Bodega familiar con carácter atlántico.",
    descriptionEn: "Family winery with Atlantic character.",
    city: "Getaria",
    locationLabel: "Getaria",
    priceTier: 2,
    mapUrl: "https://maps.google.com/?q=Gaintza+Getaria"
  },
  {
    slug: "ameztoi",
    categorySlug: "txakolindegis",
    nameEs: "Ameztoi",
    nameEn: "Ameztoi",
    specialtyEs: "Txakoli ecológico",
    specialtyEn: "Organic txakoli",
    descriptionEs: "Producción sostenible con reconocimiento internacional.",
    descriptionEn: "Sustainable production with international recognition.",
    city: "Getaria",
    locationLabel: "Getaria",
    priceTier: 2,
    mapUrl: "https://maps.google.com/?q=Ameztoi+Getaria"
  },
  {
    slug: "rezabal",
    categorySlug: "txakolindegis",
    nameEs: "Rezabal",
    nameEn: "Rezabal",
    specialtyEs: "Txakoli artesanal",
    specialtyEn: "Artisan txakoli",
    descriptionEs: "Pequeña producción con perfil propio.",
    descriptionEn: "Small production with unique profile.",
    city: "Zarauz",
    locationLabel: "Zarauz",
    priceTier: 2,
    mapUrl: "https://maps.google.com/?q=Rezabal+Zarauz"
  },
  {
    slug: "cuchara-san-telmo",
    categorySlug: "pintxos",
    nameEs: "La Cuchara de San Telmo",
    nameEn: "La Cuchara de San Telmo",
    specialtyEs: "Pintxos creativos",
    specialtyEn: "Creative pintxos",
    descriptionEs: "Bar icónico de pintxos creativos en Parte Vieja.",
    descriptionEn: "Iconic creative pintxos bar in Old Town.",
    city: "Donostia",
    locationLabel: "Donostia - Parte Vieja",
    priceTier: 2,
    ratingAsier: 3,
    mapUrl: "https://maps.google.com/?q=La+Cuchara+de+San+Telmo+Donostia"
  },
  {
    slug: "bar-nestor",
    categorySlug: "pintxos",
    nameEs: "Bar Nestor",
    nameEn: "Bar Nestor",
    specialtyEs: "Tortilla y tomate",
    specialtyEn: "Tortilla and tomato",
    descriptionEs: "Clásico donostiarra de cocina sencilla y excelente.",
    descriptionEn: "Donostia classic with simple and excellent cuisine.",
    city: "Donostia",
    locationLabel: "Donostia - Parte Vieja",
    priceTier: 1,
    ratingAsier: 3,
    mapUrl: "https://maps.google.com/?q=Bar+Nestor+Donostia"
  },
  {
    slug: "gandarias",
    categorySlug: "pintxos",
    nameEs: "Gandarias",
    nameEn: "Gandarias",
    specialtyEs: "Gilda y jamón",
    specialtyEn: "Gilda and jam",
    descriptionEs: "Bar de referencia para ruta clásica de pintxos.",
    descriptionEn: "Reference bar for a classic pintxos route.",
    city: "Donostia",
    locationLabel: "Donostia - Parte Vieja",
    priceTier: 2,
    ratingAsier: 2,
    mapUrl: "https://maps.google.com/?q=Gandarias+Donostia"
  },
  {
    slug: "atari",
    categorySlug: "pintxos",
    nameEs: "Atari",
    nameEn: "Atari",
    specialtyEs: "Pintxos innovadores",
    specialtyEn: "Innovative pintxos",
    descriptionEs: "Propuesta moderna junto a la Basílica de Santa María.",
    descriptionEn: "Modern proposal near Santa Maria Basilica.",
    city: "Donostia",
    locationLabel: "Donostia - Parte Vieja",
    priceTier: 2,
    ratingAsier: 2,
    mapUrl: "https://maps.google.com/?q=Atari+Donostia"
  },
  {
    slug: "elkano",
    categorySlug: "pescados-mariscos",
    nameEs: "Elkano",
    nameEn: "Elkano",
    specialtyEs: "Rodaballo",
    specialtyEn: "Turbot",
    descriptionEs: "Templo del pescado a la parrilla en Getaria.",
    descriptionEn: "Temple of grilled fish in Getaria.",
    city: "Getaria",
    locationLabel: "Getaria",
    priceTier: 4,
    ratingAsier: 3,
    mapUrl: "https://maps.google.com/?q=Elkano+Getaria"
  },
  {
    slug: "kaia-kaipe",
    categorySlug: "pescados-mariscos",
    nameEs: "Kaia Kaipe",
    nameEn: "Kaia Kaipe",
    specialtyEs: "Pescado fresco",
    specialtyEn: "Fresh fish",
    descriptionEs: "Cocina marinera de producto en Getaria.",
    descriptionEn: "Seafood product cuisine in Getaria.",
    city: "Getaria",
    locationLabel: "Getaria",
    priceTier: 3,
    ratingAsier: 3,
    mapUrl: "https://maps.google.com/?q=Kaia+Kaipe+Getaria"
  },
  {
    slug: "mayflower",
    categorySlug: "pescados-mariscos",
    nameEs: "Mayflower",
    nameEn: "Mayflower",
    specialtyEs: "Pescado a la brasa",
    specialtyEn: "Grilled fish",
    descriptionEs: "Carta centrada en sabores del Cantábrico.",
    descriptionEn: "Menu focused on Cantabrian flavors.",
    city: "Donostia",
    locationLabel: "Donostia",
    priceTier: 3,
    ratingAsier: 2,
    mapUrl: "https://maps.google.com/?q=Mayflower+Donostia"
  },
  {
    slug: "txuleta",
    categorySlug: "pescados-mariscos",
    nameEs: "Txuleta",
    nameEn: "Txuleta",
    specialtyEs: "Besugo y marisco",
    specialtyEn: "Sea bream and seafood",
    descriptionEs: "Asador con foco en mar y parrilla.",
    descriptionEn: "Grill house focused on seafood and fire.",
    city: "Donostia",
    locationLabel: "Donostia - Parte Vieja",
    priceTier: 3,
    ratingAsier: 2,
    mapUrl: "https://maps.google.com/?q=Txuleta+Donostia"
  },
  {
    slug: "ni-neu",
    categorySlug: "pescados-mariscos",
    nameEs: "Ni Neu",
    nameEn: "Ni Neu",
    specialtyEs: "Pescado de roca",
    specialtyEn: "Rock fish",
    descriptionEs: "Producto de costa en formato contemporáneo.",
    descriptionEn: "Coastal produce in contemporary format.",
    city: "Hondarribia",
    locationLabel: "Hondarribia",
    priceTier: 4,
    ratingAsier: 3,
    mapUrl: "https://maps.google.com/?q=Ni+Neu+Hondarribia"
  },
  {
    slug: "asador-nicolas",
    categorySlug: "carnes",
    nameEs: "Asador Nicolas",
    nameEn: "Asador Nicolas",
    specialtyEs: "Pimientos y chuletón",
    specialtyEn: "Peppers and steak",
    descriptionEs: "Asador clásico de Tolosa para carne de alto nivel.",
    descriptionEn: "Classic Tolosa grill for top-level meats.",
    city: "Tolosa",
    locationLabel: "Tolosa",
    priceTier: 4,
    ratingAsier: 3,
    mapUrl: "https://maps.google.com/?q=Asador+Nicolas+Tolosa"
  },
  {
    slug: "casa-julian",
    categorySlug: "carnes",
    nameEs: "Casa Julian",
    nameEn: "Casa Julian",
    specialtyEs: "Pimientos y chuletón",
    specialtyEn: "Peppers and steak",
    descriptionEs: "Uno de los grandes nombres del chuletón vasco.",
    descriptionEn: "One of the great names in Basque steak.",
    city: "Tolosa",
    locationLabel: "Tolosa",
    priceTier: 3,
    ratingAsier: 3,
    mapUrl: "https://maps.google.com/?q=Casa+Julian+Tolosa"
  },
  {
    slug: "maun-grill-bar",
    categorySlug: "carnes",
    nameEs: "Maun Grill bar",
    nameEn: "Maun Grill bar",
    specialtyEs: "Chuleta",
    specialtyEn: "Steak",
    descriptionEs: "Parrilla urbana en Donostia con enfoque cárnico.",
    descriptionEn: "Urban grill in Donostia focused on meat.",
    city: "Donostia",
    locationLabel: "Donostia",
    priceTier: 3,
    ratingAsier: 2,
    mapUrl: "https://maps.google.com/?q=Maun+Grill+Bar+Donostia"
  },
  {
    slug: "david-yarnoz-martin-berasategui",
    categorySlug: "carnes",
    nameEs: "David Yarnoz - Martin Berasategui",
    nameEn: "David Yarnoz - Martin Berasategui",
    specialtyEs: "Carnes premium e I+D",
    specialtyEn: "Premium meats and R&D",
    descriptionEs: "Perfil de joven talento en entorno de alta cocina.",
    descriptionEn: "Young talent profile in a fine dining environment.",
    city: "Lasarte",
    locationLabel: "Lasarte",
    priceTier: 4,
    isYoungTalent: true,
    age: 29
  },
  {
    slug: "saizar-sagardotegia",
    categorySlug: "sidreria",
    nameEs: "Saizar Sagardotegia",
    nameEn: "Saizar Sagardotegia",
    specialtyEs: "Menu de sidreria",
    specialtyEn: "Cider house menu",
    descriptionEs: "Sidreria tradicional con experiencia completa.",
    descriptionEn: "Traditional cider house with full experience.",
    city: "Usurbil",
    locationLabel: "Usurbil",
    priceTier: 2,
    mapUrl: "https://maps.app.goo.gl/vrzeNMdZ1M2L8EhP9?g_st=ic"
  },
  {
    slug: "zabala-sagardotegia",
    categorySlug: "sidreria",
    nameEs: "Zabala Sagardotegia",
    nameEn: "Zabala Sagardotegia",
    specialtyEs: "Menu de sidreria",
    specialtyEn: "Cider house menu",
    descriptionEs: "Cocina vasca de temporada en formato sidreria.",
    descriptionEn: "Seasonal Basque cuisine in cider-house format.",
    city: "Aduna",
    locationLabel: "Aduna",
    priceTier: 2,
    mapUrl: "https://maps.app.goo.gl/PuZtCkTVp6wjTca16?g_st=ic"
  },
  {
    slug: "lizeaga-sagardotegia",
    categorySlug: "sidreria",
    nameEs: "Lizeaga Sagardotegia",
    nameEn: "Lizeaga Sagardotegia",
    specialtyEs: "Menu de sidreria",
    specialtyEn: "Cider house menu",
    descriptionEs: "Sidreria histórica de referencia en la zona.",
    descriptionEn: "Historic cider house reference in the area.",
    city: "Martutene",
    locationLabel: "Martutene",
    priceTier: 2,
    mapUrl: "https://maps.app.goo.gl/WGFSzf3cN38xji3g8?g_st=ic"
  },
  {
    slug: "zelaia-sagardotegia",
    categorySlug: "sidreria",
    nameEs: "Zelaia Sagardotegia",
    nameEn: "Zelaia Sagardotegia",
    specialtyEs: "Menu de sidreria",
    specialtyEn: "Cider house menu",
    descriptionEs: "Ambiente clásico y sidra natural de kupela.",
    descriptionEn: "Classic atmosphere and natural cider from barrels.",
    city: "Hernani",
    locationLabel: "Hernani",
    priceTier: 2,
    mapUrl: "https://maps.app.goo.gl/6BG2wBwJqU6gEZSEA?g_st=ic"
  },
  {
    slug: "ama",
    categorySlug: "estrellas-desconocidas",
    nameEs: "Ama",
    nameEn: "Ama",
    specialtyEs: "Menu degustacion 1 estrella",
    specialtyEn: "1-star tasting menu",
    descriptionEs: "Propuesta contemporánea con estrella Michelin.",
    descriptionEn: "Contemporary Michelin-starred proposal.",
    city: "Tolosa",
    locationLabel: "Tolosa",
    priceTier: 3,
    ratingAsier: 1,
    mapUrl: "https://maps.app.goo.gl/batHyFFoDRaHtHRA9?g_st=ic"
  },
  {
    slug: "arrea",
    categorySlug: "estrellas-desconocidas",
    nameEs: "Arrea",
    nameEn: "Arrea",
    specialtyEs: "Menu degustacion 1 estrella",
    specialtyEn: "1-star tasting menu",
    descriptionEs: "Alta cocina de territorio y técnica precisa.",
    descriptionEn: "Fine dining rooted in territory and precise technique.",
    city: "Kanpezu",
    locationLabel: "Kanpezu",
    priceTier: 3,
    ratingAsier: 1,
    mapUrl: "https://maps.app.goo.gl/SSJMPRYK4RKEsU919?g_st=ic"
  },
  {
    slug: "molino-de-urdaniz",
    categorySlug: "estrellas-desconocidas",
    nameEs: "Molino de Urdaniz",
    nameEn: "Molino de Urdaniz",
    specialtyEs: "Menu degustacion 2 estrellas",
    specialtyEn: "2-star tasting menu",
    descriptionEs: "Restaurante de autor con doble estrella Michelin.",
    descriptionEn: "Chef-driven restaurant with two Michelin stars.",
    city: "Urdaniz",
    locationLabel: "Urdaniz",
    priceTier: 3,
    ratingAsier: 2,
    mapUrl: "https://maps.app.goo.gl/fgGmZHvf5tFaF4Bw9?g_st=ic"
  },
  {
    slug: "aitor-lopez-arzak-id",
    categorySlug: "estrellas-desconocidas",
    nameEs: "Aitor Lopez - Arzak I+D",
    nameEn: "Aitor Lopez - Arzak R&D",
    specialtyEs: "I+D e innovacion culinaria",
    specialtyEn: "R&D and culinary innovation",
    descriptionEs: "Joven talento centrado en investigación gastronómica.",
    descriptionEn: "Young talent focused on gastronomic research.",
    city: "Donostia",
    locationLabel: "Donostia",
    priceTier: 4,
    isYoungTalent: true,
    age: 28
  },
  {
    slug: "marc-cusso-mugaritz",
    categorySlug: "estrellas-desconocidas",
    nameEs: "Marc Cusso - Mugaritz",
    nameEn: "Marc Cusso - Mugaritz",
    specialtyEs: "Alta cocina 2 estrellas",
    specialtyEn: "2-star haute cuisine",
    descriptionEs: "Perfil emergente en entorno de alta cocina vasca.",
    descriptionEn: "Emerging profile in Basque haute cuisine.",
    city: "Errenteria",
    locationLabel: "Errenteria",
    priceTier: 4,
    ratingAsier: 2,
    isYoungTalent: true,
    age: 29
  },
  {
    slug: "arzak",
    categorySlug: "estrellas-desconocidas",
    nameEs: "Arzak",
    nameEn: "Arzak",
    specialtyEs: "Alta cocina de autor",
    specialtyEn: "Author-driven haute cuisine",
    descriptionEs: "Restaurante histórico de alta cocina en Donostia.",
    descriptionEn: "Historic fine dining restaurant in Donostia.",
    city: "Donostia",
    locationLabel: "Donostia",
    priceTier: 4,
    ratingAsier: 3,
    mapUrl: "https://maps.google.com/?q=Arzak+Donostia"
  }
];

async function main() {
  await prisma.talent.deleteMany();
  await prisma.restaurant.deleteMany();
  await prisma.category.deleteMany();

  for (const category of categories) {
    await prisma.category.create({ data: category });
  }

  const categoriesInDb = await prisma.category.findMany({
    select: { id: true, slug: true }
  });
  const categoryBySlug = new Map(
    categoriesInDb.map((category: { id: string; slug: string }) => [category.slug, category.id])
  );

  for (const restaurant of restaurants) {
    const categoryId = categoryBySlug.get(restaurant.categorySlug);
    if (!categoryId) {
      throw new Error(`Category not found for slug: ${restaurant.categorySlug}`);
    }

    await prisma.restaurant.create({
      data: {
        slug: restaurant.slug,
        categoryId,
        nameEs: restaurant.nameEs,
        nameEn: restaurant.nameEn,
        specialtyEs: restaurant.specialtyEs,
        specialtyEn: restaurant.specialtyEn,
        descriptionEs: restaurant.descriptionEs,
        descriptionEn: restaurant.descriptionEn,
        city: restaurant.city,
        locationLabel: restaurant.locationLabel,
        priceTier: restaurant.priceTier,
        ratingAsier: restaurant.ratingAsier,
        isYoungTalent: restaurant.isYoungTalent ?? false,
        age: restaurant.age,
        mapUrl: restaurant.mapUrl
      }
    });
  }

  const talents = talentsSeed as SeedTalent[];
  if (talents.length > 0) {
    await prisma.talent.createMany({
      data: talents.map((talent) => ({
        name: talent.name,
        role: talent.role,
        company: talent.company,
        location: talent.location,
        sector: talent.sector,
        description: talent.description
      }))
    });
  }

  const categoryCount = await prisma.category.count();
  const restaurantCount = await prisma.restaurant.count();
  const talentCount = await prisma.talent.count();
  console.log(
    `Seed completed: ${categoryCount} categories, ${restaurantCount} restaurants, ${talentCount} talents.`
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
