const API_BASE_URL = import.meta.env.VITE_API_URL ?? "https://api.gipuzkoafoodie.eu/v1";

export type ApiLocale = "es" | "en";

export class ApiError extends Error {
  status: number;
  body?: unknown;

  constructor(message: string, status: number, body?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.body = body;
  }
}

export interface CategoryListItem {
  slug: string;
  emoji: string;
  title: string;
  description: string;
}

export interface RestaurantListItem {
  slug: string;
  name: string;
  specialty: string;
  description: string;
  categorySlug: string;
  categoryName: string;
  city: string;
  locationLabel: string;
  priceTier: number;
  ratingAsier?: number | null;
  isYoungTalent: boolean;
  age?: number | null;
  mapUrl?: string | null;
  websiteUrl?: string | null;
  imageUrl?: string | null;
}

export interface TalentListItem {
  id: string;
  name: string;
  role: string;
  company: string;
  location: string;
  sector: string;
  description?: string | null;
}

export interface RestaurantFilterState {
  search?: string;
  city?: string;
  priceTier?: number;
  ratingMin?: number;
  sort?: "recommended" | "highest-rated" | "price-low" | "price-high";
  includeYoungTalents?: boolean;
  page?: number;
  limit?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  count: number;
  total: number;
  hasMore: boolean;
  page: number;
  limit: number;
}

export interface ListResponse<T> {
  data: T[];
}

function toQuery(params: Record<string, string | number | boolean | undefined>) {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== "") {
      query.set(key, String(value));
    }
  });
  const value = query.toString();
  return value ? `?${value}` : "";
}

async function parseResponseBody(response: Response): Promise<unknown> {
  const text = await response.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

async function apiGet<T>(path: string): Promise<T> {
  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`);
  } catch {
    throw new ApiError("Network error while contacting API", 0);
  }

  const body = await parseResponseBody(response);

  if (!response.ok) {
    const message =
      typeof body === "object" && body && "error" in body
        ? String((body as { error: string }).error)
        : `API request failed with status ${response.status}`;
    throw new ApiError(message, response.status, body);
  }

  return body as T;
}

export const api = {
  baseUrl: API_BASE_URL,
  async getCategories(locale: ApiLocale) {
    return apiGet<ListResponse<CategoryListItem>>(`/categories${toQuery({ locale })}`);
  },
  async getRestaurants(locale: ApiLocale, categorySlug?: string, filters: RestaurantFilterState = {}) {
    const query = toQuery({
      locale,
      categorySlug,
      search: filters.search,
      city: filters.city,
      priceTier: filters.priceTier,
      ratingMin: filters.ratingMin,
      sort: filters.sort,
      includeYoungTalents: filters.includeYoungTalents,
      page: filters.page,
      limit: filters.limit
    });

    return apiGet<PaginatedResponse<RestaurantListItem>>(`/restaurants${query}`);
  },
  async getTalents(params: {
    search?: string;
    sector?: string;
    location?: string;
    page?: number;
    limit?: number;
  }) {
    const query = toQuery(params);
    return apiGet<PaginatedResponse<TalentListItem>>(`/talents${query}`);
  }
};
