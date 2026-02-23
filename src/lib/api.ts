const API_BASE_URL = import.meta.env.VITE_API_URL ?? "https://api.gipuzkoafoodie.eu/v1";

export type ApiLocale = "es" | "en";

export const apiConfig = {
  baseUrl: API_BASE_URL
};

export async function apiGet<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`);
  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }
  return (await response.json()) as T;
}
