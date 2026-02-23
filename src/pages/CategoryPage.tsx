import { useMemo, useState } from "react";
import { ArrowLeft, MapPin, Search, SlidersHorizontal, Star, TriangleAlert } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { api, ApiError, RestaurantFilterState, type RestaurantListItem } from "@/lib/api";
import { useTranslation } from "@/contexts/TranslationContext";
import { getFallbackCategories, getFallbackRestaurants } from "@/lib/fallbackData";

const priceLabel = (priceTier: number) => "€".repeat(Math.max(1, Math.min(4, priceTier)));

const RestaurantDetail = ({ item, openMapLabel, specialtyLabel, cityLabel }: { item: RestaurantListItem; openMapLabel: string; specialtyLabel: string; cityLabel: string }) => (
  <Card className="border-border/70 bg-card/90">
    <CardContent className="space-y-4 p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-2xl font-semibold text-foreground">{item.name}</h3>
          <p className="text-sm text-muted-foreground">{item.locationLabel}</p>
        </div>
        <Badge variant="outline" className="rounded-full border-primary/30 bg-primary/10 text-primary">
          {priceLabel(item.priceTier)}
        </Badge>
      </div>
      <p className="text-sm text-muted-foreground">{item.description}</p>
      <div className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
        <p>
          <span className="font-semibold text-foreground">{specialtyLabel}:</span> {item.specialty}
        </p>
        <p>
          <span className="font-semibold text-foreground">{cityLabel}:</span> {item.city}
        </p>
      </div>
      {item.mapUrl && (
        <a
          href={item.mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground transition hover:brightness-95"
        >
          <MapPin className="h-4 w-4" />
          {openMapLabel}
        </a>
      )}
    </CardContent>
  </Card>
);

export const CategoryPage = () => {
  const navigate = useNavigate();
  const { category } = useParams<{ category: string }>();
  const { language, t } = useTranslation();

  const [search, setSearch] = useState("");
  const [city, setCity] = useState("all");
  const [priceTier, setPriceTier] = useState("all");
  const [ratingMin, setRatingMin] = useState("all");
  const [sort, setSort] = useState<RestaurantFilterState["sort"]>("recommended");
  const [selected, setSelected] = useState<RestaurantListItem | null>(null);

  const filters = useMemo<RestaurantFilterState>(
    () => ({
      search,
      city: city === "all" ? undefined : city,
      priceTier: priceTier === "all" ? undefined : Number(priceTier),
      ratingMin: ratingMin === "all" ? undefined : Number(ratingMin),
      sort,
      limit: 100
    }),
    [search, city, priceTier, ratingMin, sort]
  );

  const categoryQuery = useQuery({
    queryKey: ["categories", language],
    queryFn: async () => {
      try {
        const response = await api.getCategories(language);
        return { data: response.data, isFallback: false, error: null as ApiError | null };
      } catch (error) {
        return {
          data: getFallbackCategories(language),
          isFallback: true,
          error: error instanceof ApiError ? error : new ApiError(t("common.error"), 0)
        };
      }
    }
  });

  const restaurantsQuery = useQuery({
    queryKey: ["restaurants", category, language, filters],
    queryFn: async () => {
      try {
        const response = await api.getRestaurants(language, category, filters);
        return { data: response.data, isFallback: false, error: null as ApiError | null };
      } catch (error) {
        return {
          data: getFallbackRestaurants(language, category, filters),
          isFallback: true,
          error: error instanceof ApiError ? error : new ApiError(t("common.error"), 0)
        };
      }
    },
    enabled: Boolean(category)
  });

  const categories = categoryQuery.data?.data ?? [];
  const restaurants = restaurantsQuery.data?.data ?? [];
  const currentCategory = categories.find((item) => item.slug === category);
  const cities = Array.from(new Set(restaurants.map((item) => item.city))).sort();
  const isFallback = Boolean(categoryQuery.data?.isFallback || restaurantsQuery.data?.isFallback);

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
      {isFallback && (
        <div className="flex items-start gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-800">
          <TriangleAlert className="mt-0.5 h-4 w-4" />
          <p>{t("common.fallbackBanner")}</p>
        </div>
      )}

      <Button variant="ghost" className="min-h-11 rounded-xl" onClick={() => navigate("/")}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        {t("common.backHome")}
      </Button>

      <section className="rounded-2xl border border-border/70 bg-card/80 p-5 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{t("category.label")}</p>
            <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              {currentCategory?.title ?? t("category.loadingTitle")}
            </h1>
            <p className="max-w-2xl text-sm text-muted-foreground sm:text-base">{currentCategory?.description}</p>
          </div>
          <div className="rounded-2xl bg-primary/10 px-4 py-3 text-primary">
            <SlidersHorizontal className="h-5 w-5" />
          </div>
        </div>
      </section>

      <section className="sticky top-16 z-30 rounded-2xl border border-border/70 bg-background/95 p-4 backdrop-blur-lg">
        <div className="grid gap-3 md:grid-cols-[1.5fr_repeat(4,minmax(0,1fr))]">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={t("category.searchPlaceholder")}
              className="min-h-11 rounded-xl pl-9"
            />
          </div>

          <Select value={city} onValueChange={setCity}>
            <SelectTrigger className="min-h-11 rounded-xl">
              <SelectValue placeholder={t("common.allCities")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("common.allCities")}</SelectItem>
              {cities.map((cityOption) => (
                <SelectItem key={cityOption} value={cityOption}>
                  {cityOption}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={priceTier} onValueChange={setPriceTier}>
            <SelectTrigger className="min-h-11 rounded-xl">
              <SelectValue placeholder={t("common.allPrices")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("common.allPrices")}</SelectItem>
              {[1, 2, 3, 4].map((tier) => (
                <SelectItem key={tier} value={String(tier)}>
                  {priceLabel(tier)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={ratingMin} onValueChange={setRatingMin}>
            <SelectTrigger className="min-h-11 rounded-xl">
              <SelectValue placeholder={t("common.allRatings")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("common.allRatings")}</SelectItem>
              {[1, 2, 3].map((value) => (
                <SelectItem key={value} value={String(value)}>
                  {value}+ {t("category.stars")}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sort} onValueChange={(value) => setSort(value as RestaurantFilterState["sort"])}>
            <SelectTrigger className="min-h-11 rounded-xl">
              <SelectValue placeholder={t("category.sort")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recommended">{t("category.sortRecommended")}</SelectItem>
              <SelectItem value="highest-rated">{t("category.sortHighestRated")}</SelectItem>
              <SelectItem value="price-low">{t("category.sortPriceLow")}</SelectItem>
              <SelectItem value="price-high">{t("category.sortPriceHigh")}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </section>

      {restaurantsQuery.isLoading && <p className="text-sm text-muted-foreground">{t("category.loadingRestaurants")}</p>}
      {restaurantsQuery.isError && <p className="text-sm text-destructive">{t("category.errorRestaurants")}</p>}

      {!restaurantsQuery.isLoading && restaurants.length === 0 && (
        <Card className="border-border/70 bg-card/90">
          <CardContent className="p-6 text-sm text-muted-foreground">
            <p>{t("category.noResults")}</p>
            <p className="mt-1 text-xs">{t("category.noResultsHint")}</p>
          </CardContent>
        </Card>
      )}

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {restaurants.map((item) => (
          <Card key={item.slug} className="border-border/70 bg-card/90 transition hover:-translate-y-0.5 hover:shadow-sm">
            <CardContent className="space-y-4 p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-lg font-semibold text-foreground">{item.name}</p>
                  <p className="text-sm text-muted-foreground">{item.locationLabel}</p>
                </div>
                <Badge variant="secondary" className="rounded-full bg-muted text-muted-foreground">
                  {priceLabel(item.priceTier)}
                </Badge>
              </div>

              <p className="line-clamp-2 text-sm text-muted-foreground">{item.description}</p>

              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <Star className="h-3.5 w-3.5 text-amber-500" />
                  {item.ratingAsier ?? "-"}
                </span>
                <span>{item.city}</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {item.mapUrl && (
                  <a
                    href={item.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center rounded-xl bg-primary px-3 text-sm font-semibold text-primary-foreground transition hover:brightness-95"
                  >
                    {t("common.openMap")}
                  </a>
                )}
                <Button variant="outline" className="min-h-11 rounded-xl" onClick={() => setSelected(item)}>
                  {t("common.viewDetails")}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>

      {selected && (
        <RestaurantDetail
          item={selected}
          openMapLabel={t("common.openMap")}
          specialtyLabel={t("category.specialty")}
          cityLabel={t("category.city")}
        />
      )}
    </div>
  );
};
