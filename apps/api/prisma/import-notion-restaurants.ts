import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

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

type NotionSeedData = {
  categories: SeedCategory[];
  restaurants: SeedRestaurant[];
};

const categoryEmojiByKeyword: Array<{ keyword: string; emoji: string }> = [
  { keyword: "pintxo", emoji: "🍤" },
  { keyword: "marisc", emoji: "🌊" },
  { keyword: "pescad", emoji: "🌊" },
  { keyword: "carne", emoji: "🐄" },
  { keyword: "sidr", emoji: "🍎" },
  { keyword: "txakoli", emoji: "🍇" },
  { keyword: "veg", emoji: "🌱" },
  { keyword: "estrella", emoji: "⭐" }
];

const cityKeywords = [
  "donostia",
  "san sebastian",
  "getaria",
  "tolosa",
  "zarautz",
  "hondarribia",
  "irun",
  "errenteria",
  "rentaria",
  "usurbil",
  "orio",
  "pasaia",
  "lasarte",
  "hernani",
  "oiartzun",
  "kanpezu"
];

function normalizeText(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function normalizeKey(value: string) {
  return normalizeText(value).toLowerCase().replace(/\s+/g, " ").trim();
}

function slugify(value: string) {
  return normalizeText(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function parsePriceTier(value: string) {
  const trimmed = value.trim();
  const euroCount = (trimmed.match(/€/g) ?? []).length;
  if (euroCount > 0) return Math.max(1, Math.min(4, euroCount));

  const numeric = Number(trimmed.replace(/[^\d]/g, ""));
  if (Number.isFinite(numeric) && numeric > 0) return Math.max(1, Math.min(4, numeric));

  return 2;
}

function parseStars(raw: string) {
  const trimmed = raw.trim();
  const starGlyphs = (trimmed.match(/[★⭐]/g) ?? []).length;
  if (starGlyphs > 0) return Math.max(1, Math.min(3, starGlyphs));

  const numericMatch = trimmed.match(/\d+/);
  if (numericMatch) {
    const numeric = Number(numericMatch[0]);
    if (Number.isFinite(numeric) && numeric > 0) {
      return Math.max(1, Math.min(3, numeric));
    }
  }

  return 3;
}

function inferCity(input: string) {
  const source = normalizeText(decodeURIComponent(input)).toLowerCase();
  const found = cityKeywords.find((keyword) => source.includes(keyword));
  if (!found) return "Gipuzkoa";

  return found
    .split(" ")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function categoryEmoji(categoryName: string) {
  const source = normalizeText(categoryName).toLowerCase();
  const match = categoryEmojiByKeyword.find((entry) => source.includes(entry.keyword));
  return match?.emoji ?? "🍽️";
}

function splitCategoryAndRating(categoryRaw: string): { category: string; starsFromCategory?: number } {
  const match = categoryRaw.match(/^(.+?)\s*\(([^)]+)\)\s*$/);
  if (!match) return { category: categoryRaw.trim() };
  return { category: match[1].trim(), starsFromCategory: parseStars(match[2]) };
}

function detectDelimiter(headerLine: string) {
  const comma = (headerLine.match(/,/g) ?? []).length;
  const semicolon = (headerLine.match(/;/g) ?? []).length;
  return semicolon > comma ? ";" : ",";
}

function parseCsvRows(content: string): string[][] {
  const source = content.replace(/^\uFEFF/, "");
  const headerLine = source.split(/\r?\n/, 1)[0] ?? "";
  const delimiter = detectDelimiter(headerLine);

  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;

  for (let i = 0; i < source.length; i += 1) {
    const char = source[i];
    const next = source[i + 1];

    if (char === "\"") {
      if (inQuotes && next === "\"") {
        field += "\"";
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === delimiter && !inQuotes) {
      row.push(field.trim());
      field = "";
      continue;
    }

    if ((char === "\n" || char === "\r") && !inQuotes) {
      if (char === "\r" && next === "\n") i += 1;
      row.push(field.trim());
      if (row.some((item) => item.length > 0)) rows.push(row);
      row = [];
      field = "";
      continue;
    }

    field += char;
  }

  if (field.length > 0 || row.length > 0) {
    row.push(field.trim());
    if (row.some((item) => item.length > 0)) rows.push(row);
  }

  return rows;
}

function findColumnIndex(headers: string[], candidates: string[]) {
  const normalizedCandidates = candidates.map((candidate) => normalizeKey(candidate));
  return headers.findIndex((header) => normalizedCandidates.some((candidate) => header.includes(candidate)));
}

type NormalizedRestaurantRecord = {
  categoryRaw: string;
  nameRaw: string;
  ratingRaw: string;
  priceRaw: string;
  specialtyRaw: string;
  commentRaw: string;
  mapRaw: string;
  cityRaw: string;
};

function recordFromRow(headers: string[], row: string[]): NormalizedRestaurantRecord {
  const valueAt = (index: number) => (index >= 0 && index < row.length ? row[index]?.trim() ?? "" : "");

  const categoryIndex = findColumnIndex(headers, ["categoria", "category"]);
  const nameIndex = findColumnIndex(headers, ["nombre", "name", "restaurante"]);
  const ratingIndex = findColumnIndex(headers, ["valoracion", "valoración", "rating", "estrellas", "stars"]);
  const priceIndex = findColumnIndex(headers, ["precio", "price"]);
  const specialtyIndex = findColumnIndex(headers, ["especialidad", "specialty"]);
  const commentIndex = findColumnIndex(headers, ["comentario", "comment", "description", "descripcion", "descripción"]);
  const mapIndex = findColumnIndex(headers, ["google maps", "maps", "mapa", "map url", "mapurl"]);
  const cityIndex = findColumnIndex(headers, ["ciudad", "city", "localidad"]);

  return {
    categoryRaw: valueAt(categoryIndex),
    nameRaw: valueAt(nameIndex),
    ratingRaw: valueAt(ratingIndex),
    priceRaw: valueAt(priceIndex),
    specialtyRaw: valueAt(specialtyIndex),
    commentRaw: valueAt(commentIndex),
    mapRaw: valueAt(mapIndex),
    cityRaw: valueAt(cityIndex)
  };
}

function recordFromObject(item: Record<string, unknown>): NormalizedRestaurantRecord {
  const keyValues = Object.entries(item).map(([key, value]) => [normalizeKey(key), String(value ?? "").trim()] as const);
  const getValue = (candidates: string[]) => {
    const normalizedCandidates = candidates.map((candidate) => normalizeKey(candidate));
    const found = keyValues.find(([key]) => normalizedCandidates.some((candidate) => key.includes(candidate)));
    return found?.[1] ?? "";
  };

  return {
    categoryRaw: getValue(["categoria", "category"]),
    nameRaw: getValue(["nombre", "name", "restaurante"]),
    ratingRaw: getValue(["valoracion", "valoración", "rating", "estrellas", "stars"]),
    priceRaw: getValue(["precio", "price"]),
    specialtyRaw: getValue(["especialidad", "specialty"]),
    commentRaw: getValue(["comentario", "comment", "description", "descripcion", "descripción"]),
    mapRaw: getValue(["google maps", "maps", "mapa", "map url", "mapurl"]),
    cityRaw: getValue(["ciudad", "city", "localidad"])
  };
}

function toSeedData(records: NormalizedRestaurantRecord[]): NotionSeedData | null {
  const categoryBySlug = new Map<string, SeedCategory>();
  const restaurants: SeedRestaurant[] = [];
  const slugCounter = new Map<string, number>();

  for (const record of records) {
    if (!record.categoryRaw) continue;

    let categoryName = record.categoryRaw.trim();
    let restaurantName = record.nameRaw.trim();

    const legacyMatch = record.categoryRaw.match(/^(.+?)\s*\(([^)]+)\)\s*(.+)$/);
    const starsFromLegacyHead = legacyMatch ? parseStars(legacyMatch[2]) : undefined;
    if (legacyMatch && !restaurantName) {
      categoryName = legacyMatch[1].trim();
      restaurantName = legacyMatch[3].trim();
    } else {
      const split = splitCategoryAndRating(record.categoryRaw);
      categoryName = split.category;
    }

    if (!restaurantName || !categoryName) continue;

    const parsedCategory = splitCategoryAndRating(record.categoryRaw);
    const ratingAsier = parseStars(record.ratingRaw || String(parsedCategory.starsFromCategory ?? starsFromLegacyHead ?? 3));
    const specialty = record.specialtyRaw || "Especialidad sin definir";
    const comment = record.commentRaw || specialty;
    const categorySlug = slugify(categoryName);

    if (!categoryBySlug.has(categorySlug)) {
      categoryBySlug.set(categorySlug, {
        slug: categorySlug,
        emoji: categoryEmoji(categoryName),
        sortOrder: categoryBySlug.size + 1,
        titleEs: categoryName,
        titleEn: categoryName,
        descriptionEs: `Selección de ${categoryName} en Gipuzkoa.`,
        descriptionEn: `${categoryName} selection in Gipuzkoa.`
      });
    }

    const baseSlug = slugify(restaurantName) || `restaurant-${restaurants.length + 1}`;
    const currentCount = slugCounter.get(baseSlug) ?? 0;
    slugCounter.set(baseSlug, currentCount + 1);
    const restaurantSlug = currentCount === 0 ? baseSlug : `${baseSlug}-${currentCount + 1}`;

    const city = record.cityRaw || inferCity(`${restaurantName} ${comment} ${record.mapRaw}`);
    const mapUrl = record.mapRaw.startsWith("http") ? record.mapRaw : undefined;

    restaurants.push({
      slug: restaurantSlug,
      categorySlug,
      nameEs: restaurantName,
      nameEn: restaurantName,
      specialtyEs: specialty,
      specialtyEn: specialty,
      descriptionEs: comment,
      descriptionEn: comment,
      city,
      locationLabel: city,
      priceTier: parsePriceTier(record.priceRaw),
      ratingAsier,
      isYoungTalent: false,
      mapUrl
    });
  }

  if (restaurants.length === 0) return null;
  return { categories: [...categoryBySlug.values()], restaurants };
}

function loadFromCsv(path: string): NotionSeedData | null {
  if (!existsSync(path)) return null;
  const raw = readFileSync(path, "utf8");
  const rows = parseCsvRows(raw);
  if (rows.length < 2) return null;
  const headers = rows[0].map((header) => normalizeKey(header));
  const records = rows.slice(1).map((row) => recordFromRow(headers, row));
  return toSeedData(records);
}

function loadFromJson(path: string): NotionSeedData | null {
  if (!existsSync(path)) return null;
  const raw = readFileSync(path, "utf8");
  const parsed = JSON.parse(raw) as unknown;
  const items = Array.isArray(parsed)
    ? parsed
    : parsed && typeof parsed === "object" && "data" in parsed && Array.isArray((parsed as { data: unknown }).data)
      ? (parsed as { data: unknown[] }).data
      : [];

  const records = items
    .filter((item): item is Record<string, unknown> => item !== null && typeof item === "object")
    .map((item) => recordFromObject(item));

  return toSeedData(records);
}

export function loadNotionRestaurantsSeed(baseDir: string): NotionSeedData | null {
  const csvPath = join(baseDir, "restaurants.notion.csv");
  const jsonPath = join(baseDir, "restaurants.notion.json");
  return loadFromCsv(csvPath) ?? loadFromJson(jsonPath);
}
