import type { ApiLocale, CategoryListItem, RestaurantListItem, RestaurantFilterState } from "@/lib/api";

type Localized = { es: string; en: string };

type FallbackCategory = {
  slug: string;
  emoji: string;
  title: Localized;
  description: Localized;
};

type FallbackRestaurant = {
  slug: string;
  categorySlug: string;
  name: Localized;
  specialty: Localized;
  description: Localized;
  categoryName: Localized;
  city: string;
  locationLabel: string;
  priceTier: number;
  ratingAsier?: number;
  mapUrl?: string;
};

const categories: FallbackCategory[] = [
  {
    slug: "pintxos",
    emoji: "🍤",
    title: { es: "Pintxos Donosti", en: "Pintxos Donosti" },
    description: {
      es: "Ruta imprescindible de pintxos clásicos y creativos en Donostia.",
      en: "Essential route of classic and creative pintxos in Donostia."
    }
  },
  {
    slug: "pescados-mariscos",
    emoji: "🌊",
    title: { es: "Pescados y Mariscos", en: "Fish and Seafood" },
    description: {
      es: "Cocina del Cantábrico con producto fresco y técnica local.",
      en: "Cantabrian cuisine with fresh product and local technique."
    }
  },
  {
    slug: "carnes",
    emoji: "🐄",
    title: { es: "Carnes", en: "Meats" },
    description: {
      es: "Asadores de referencia para chuletón y maduración de alto nivel.",
      en: "Reference steakhouses for premium grilled meats and aging."
    }
  },
  {
    slug: "sidreria",
    emoji: "🍎",
    title: { es: "Sidrería", en: "Cider House" },
    description: {
      es: "Experiencias tradicionales de sidra y menú vasco.",
      en: "Traditional cider experiences and Basque menu."
    }
  }
];

const restaurants: FallbackRestaurant[] = [
  {
    slug: "cuchara-san-telmo",
    categorySlug: "pintxos",
    name: { es: "La Cuchara de San Telmo", en: "La Cuchara de San Telmo" },
    specialty: { es: "Pintxos creativos", en: "Creative pintxos" },
    description: {
      es: "Bar icónico de pintxos en la Parte Vieja.",
      en: "Iconic pintxos bar in the Old Town."
    },
    categoryName: { es: "Pintxos Donosti", en: "Pintxos Donosti" },
    city: "Donostia",
    locationLabel: "Donostia - Parte Vieja",
    priceTier: 2,
    ratingAsier: 3,
    mapUrl: "https://maps.google.com/?q=La+Cuchara+de+San+Telmo+Donostia"
  },
  {
    slug: "bar-nestor",
    categorySlug: "pintxos",
    name: { es: "Bar Nestor", en: "Bar Nestor" },
    specialty: { es: "Tortilla y tomate", en: "Tortilla and tomato" },
    description: {
      es: "Clásico donostiarra con producto y ejecución impecables.",
      en: "Donostia classic with flawless product and execution."
    },
    categoryName: { es: "Pintxos Donosti", en: "Pintxos Donosti" },
    city: "Donostia",
    locationLabel: "Donostia - Parte Vieja",
    priceTier: 1,
    ratingAsier: 3,
    mapUrl: "https://maps.google.com/?q=Bar+Nestor+Donostia"
  },
  {
    slug: "elkano",
    categorySlug: "pescados-mariscos",
    name: { es: "Elkano", en: "Elkano" },
    specialty: { es: "Rodaballo a la parrilla", en: "Grilled turbot" },
    description: {
      es: "Templo del pescado a la brasa en Getaria.",
      en: "Temple of grilled fish in Getaria."
    },
    categoryName: { es: "Pescados y Mariscos", en: "Fish and Seafood" },
    city: "Getaria",
    locationLabel: "Getaria",
    priceTier: 4,
    ratingAsier: 3,
    mapUrl: "https://maps.google.com/?q=Elkano+Getaria"
  },
  {
    slug: "asador-nicolas",
    categorySlug: "carnes",
    name: { es: "Asador Nicolas", en: "Asador Nicolas" },
    specialty: { es: "Chuletón", en: "Steak" },
    description: {
      es: "Asador de referencia en Tolosa para amantes de la carne.",
      en: "Reference steakhouse in Tolosa for meat lovers."
    },
    categoryName: { es: "Carnes", en: "Meats" },
    city: "Tolosa",
    locationLabel: "Tolosa",
    priceTier: 4,
    ratingAsier: 3,
    mapUrl: "https://maps.google.com/?q=Asador+Nicolas+Tolosa"
  },
  {
    slug: "saizar-sagardotegia",
    categorySlug: "sidreria",
    name: { es: "Saizar Sagardotegia", en: "Saizar Cider House" },
    specialty: { es: "Menú de sidrería", en: "Cider house menu" },
    description: {
      es: "Sidrería tradicional vasca con experiencia completa.",
      en: "Traditional Basque cider house with full experience."
    },
    categoryName: { es: "Sidrería", en: "Cider House" },
    city: "Usurbil",
    locationLabel: "Usurbil",
    priceTier: 2,
    mapUrl: "https://maps.app.goo.gl/vrzeNMdZ1M2L8EhP9?g_st=ic"
  }
];

export function getFallbackCategories(locale: ApiLocale): CategoryListItem[] {
  return categories.map((category) => ({
    slug: category.slug,
    emoji: category.emoji,
    title: category.title[locale],
    description: category.description[locale]
  }));
}

function normalizeRestaurants(locale: ApiLocale): RestaurantListItem[] {
  return restaurants.map((item) => ({
    slug: item.slug,
    name: item.name[locale],
    specialty: item.specialty[locale],
    description: item.description[locale],
    categorySlug: item.categorySlug,
    categoryName: item.categoryName[locale],
    city: item.city,
    locationLabel: item.locationLabel,
    priceTier: item.priceTier,
    ratingAsier: item.ratingAsier,
    isYoungTalent: false,
    mapUrl: item.mapUrl,
    websiteUrl: null,
    imageUrl: null
  }));
}

export function getFallbackRestaurants(
  locale: ApiLocale,
  categorySlug?: string,
  filters: RestaurantFilterState = {}
): RestaurantListItem[] {
  let data = normalizeRestaurants(locale);

  if (categorySlug) {
    data = data.filter((item) => item.categorySlug === categorySlug);
  }

  if (filters.search) {
    const query = filters.search.toLowerCase();
    data = data.filter((item) => {
      return (
        item.name.toLowerCase().includes(query) ||
        item.specialty.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.city.toLowerCase().includes(query)
      );
    });
  }

  if (filters.city) {
    data = data.filter((item) => item.city.toLowerCase() === filters.city?.toLowerCase());
  }

  if (filters.priceTier) {
    data = data.filter((item) => item.priceTier === filters.priceTier);
  }

  if (filters.ratingMin) {
    data = data.filter((item) => (item.ratingAsier ?? 0) >= filters.ratingMin!);
  }

  if (filters.sort === "price-low") {
    data = data.sort((a, b) => a.priceTier - b.priceTier);
  } else if (filters.sort === "price-high") {
    data = data.sort((a, b) => b.priceTier - a.priceTier);
  } else {
    data = data.sort((a, b) => (b.ratingAsier ?? 0) - (a.ratingAsier ?? 0));
  }

  return data;
}
