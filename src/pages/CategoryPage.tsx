import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, MapPin, Search, SlidersHorizontal, TriangleAlert } from "lucide-react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { api, ApiError, PaginatedResponse, RestaurantFilterState, type RestaurantListItem } from "@/lib/api";
import { useTranslation } from "@/contexts/TranslationContext";
import { getFallbackCategories, getFallbackRestaurants } from "@/lib/fallbackData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MobileFilterSheet } from "@/components/filters/MobileFilterSheet";

const PAGE_SIZE = 24;
const priceLabel = (priceTier: number) => "€".repeat(Math.max(1, Math.min(4, priceTier)));
const ratingValue = (rating?: number | null) => Math.max(1, Math.min(3, rating ?? 3));
const ratingStars = (rating?: number | null) => "★".repeat(ratingValue(rating));
const DEFAULT_SORT: RestaurantFilterState["sort"] = "highest-rated";

interface RestaurantFilterDraftState {
  category: string;
  search: string;
  city: string;
  priceTier: string;
  ratingMin: string;
  sort: RestaurantFilterState["sort"];
}

type RestaurantsPage = PaginatedResponse<RestaurantListItem> & {
  isFallback: boolean;
  error: ApiError | null;
};

export const CategoryPage = () => {
  const navigate = useNavigate();
  const { category: categoryParam } = useParams<{ category: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const { language, t } = useTranslation();

  const [search, setSearch] = useState("");
  const [city, setCity] = useState("all");
  const [priceTier, setPriceTier] = useState("all");
  const [ratingMin, setRatingMin] = useState("all");
  const [sort, setSort] = useState<RestaurantFilterState["sort"]>(DEFAULT_SORT);
  const [selected, setSelected] = useState<RestaurantListItem | null>(null);
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const categoryFromQuery = searchParams.get("category") ?? "all";
  const categoryFilter = categoryParam ?? categoryFromQuery;
  const activeCategorySlug = categoryFilter === "all" ? undefined : categoryFilter;
  const isRestaurantsHub = !categoryParam;
  const [draftFilters, setDraftFilters] = useState<RestaurantFilterDraftState>({
    category: categoryFilter,
    search,
    city,
    priceTier,
    ratingMin,
    sort
  });

  const baseFilters = useMemo<RestaurantFilterState>(
    () => ({
      search: search || undefined,
      city: city === "all" ? undefined : city,
      priceTier: priceTier === "all" ? undefined : Number(priceTier),
      ratingMin: ratingMin === "all" ? undefined : Number(ratingMin),
      sort,
      includeYoungTalents: false,
      limit: PAGE_SIZE
    }),
    [search, city, priceTier, ratingMin, sort]
  );

  useEffect(() => {
    if (isFilterSheetOpen) return;
    setDraftFilters({
      category: categoryFilter,
      search,
      city,
      priceTier,
      ratingMin,
      sort
    });
  }, [isFilterSheetOpen, categoryFilter, search, city, priceTier, ratingMin, sort]);

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

  const restaurantsQuery = useInfiniteQuery<RestaurantsPage>({
    queryKey: ["restaurants", "infinite", activeCategorySlug ?? "all", language, baseFilters],
    initialPageParam: 1,
    queryFn: async ({ pageParam }) => {
      try {
        const response = await api.getRestaurants(language, activeCategorySlug, {
          ...baseFilters,
          page: Number(pageParam),
          limit: PAGE_SIZE
        });
        return { ...response, isFallback: false, error: null };
      } catch (error) {
        const fallbackData = getFallbackRestaurants(language, activeCategorySlug, baseFilters);
        const page = Number(pageParam);
        const start = (page - 1) * PAGE_SIZE;
        const end = start + PAGE_SIZE;
        const data = fallbackData.slice(start, end);

        return {
          data,
          count: data.length,
          total: fallbackData.length,
          page,
          limit: PAGE_SIZE,
          hasMore: end < fallbackData.length,
          isFallback: true,
          error: error instanceof ApiError ? error : new ApiError(t("common.error"), 0)
        };
      }
    },
    getNextPageParam: (lastPage) => (lastPage.hasMore ? lastPage.page + 1 : undefined)
  });

  const restaurants = restaurantsQuery.data?.pages.flatMap((page) => page.data) ?? [];
  const total = restaurantsQuery.data?.pages[0]?.total ?? restaurants.length;
  const categories = categoryQuery.data?.data ?? [];
  const currentCategory = categories.find((item) => item.slug === activeCategorySlug);
  const cities = Array.from(new Set(restaurants.map((item) => item.city))).sort();
  const isFallback = Boolean(
    categoryQuery.data?.isFallback || restaurantsQuery.data?.pages.some((page) => page.isFallback)
  );
  const { hasNextPage, isFetchingNextPage, fetchNextPage } = restaurantsQuery;

  useEffect(() => {
    const node = loadMoreRef.current;
    if (!node || !hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          void fetchNextPage();
        }
      },
      { rootMargin: "500px 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleCategoryChange = (value: string) => {
    if (!isRestaurantsHub) return;
    if (value === "all") {
      setSearchParams({});
      return;
    }
    setSearchParams({ category: value });
  };

  const appliedFilterCount =
    (isRestaurantsHub && categoryFilter !== "all" ? 1 : 0) +
    (search.trim() ? 1 : 0) +
    (city !== "all" ? 1 : 0) +
    (priceTier !== "all" ? 1 : 0) +
    (ratingMin !== "all" ? 1 : 0) +
    (sort !== DEFAULT_SORT ? 1 : 0);

  const draftFilterCount =
    (isRestaurantsHub && draftFilters.category !== "all" ? 1 : 0) +
    (draftFilters.search.trim() ? 1 : 0) +
    (draftFilters.city !== "all" ? 1 : 0) +
    (draftFilters.priceTier !== "all" ? 1 : 0) +
    (draftFilters.ratingMin !== "all" ? 1 : 0) +
    (draftFilters.sort !== DEFAULT_SORT ? 1 : 0);

  const clearDraftFilters = () => {
    setDraftFilters({
      category: isRestaurantsHub ? "all" : categoryFilter,
      search: "",
      city: "all",
      priceTier: "all",
      ratingMin: "all",
      sort: DEFAULT_SORT
    });
  };

  const applyDraftFilters = () => {
    setSearch(draftFilters.search);
    setCity(draftFilters.city);
    setPriceTier(draftFilters.priceTier);
    setRatingMin(draftFilters.ratingMin);
    setSort(draftFilters.sort);

    if (isRestaurantsHub && draftFilters.category !== categoryFilter) {
      if (draftFilters.category === "all") {
        setSearchParams({});
      } else {
        setSearchParams({ category: draftFilters.category });
      }
    }

    setIsFilterSheetOpen(false);
  };

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

      <section className="editorial-card p-5 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-2">
            <p className="editorial-kicker">{t("category.label")}</p>
            <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              {currentCategory?.title ?? t("category.allTitle")}
            </h1>
            <p className="max-w-2xl text-sm text-muted-foreground sm:text-base">
              {currentCategory?.description ?? t("category.allDescription")}
            </p>
            <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
              {total} {t("category.totalResults")}
            </p>
          </div>
          <Badge variant="outline" className="rounded-full border-primary/40 bg-primary/10 px-3 py-1.5 text-primary">
            {t("category.editorialTag")}
          </Badge>
        </div>
      </section>

      {isRestaurantsHub && (
        <section className="editorial-card space-y-4 p-5 sm:p-6">
          <p className="editorial-kicker">{t("category.ratingLegendTitle")}</p>
          <p className="text-sm text-muted-foreground">{t("category.ratingLegendIntro")}</p>
          <div className="grid gap-2 sm:grid-cols-3">
            <div className="rounded-xl border border-border/60 bg-background/70 px-3 py-2 text-xs">
              <p className="font-semibold text-foreground">3★</p>
              <p className="text-muted-foreground">{t("category.ratingLegend3")}</p>
            </div>
            <div className="rounded-xl border border-border/60 bg-background/70 px-3 py-2 text-xs">
              <p className="font-semibold text-foreground">2★</p>
              <p className="text-muted-foreground">{t("category.ratingLegend2")}</p>
            </div>
            <div className="rounded-xl border border-border/60 bg-background/70 px-3 py-2 text-xs">
              <p className="font-semibold text-foreground">1★</p>
              <p className="text-muted-foreground">{t("category.ratingLegend1")}</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">{t("category.ratingLegendNote")}</p>
        </section>
      )}

      <section className="sticky top-28 z-30 rounded-2xl border border-border/70 bg-background/95 p-4 backdrop-blur-lg md:top-20">
        <div className="flex items-center justify-between md:hidden">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">{t("filters.title")}</p>
          <Button
            type="button"
            variant="outline"
            className="min-h-11 rounded-xl"
            onClick={() => setIsFilterSheetOpen(true)}
            aria-expanded={isFilterSheetOpen}
            aria-controls="restaurants-filters-sheet"
          >
            <SlidersHorizontal className="mr-1.5 h-4 w-4" />
            {t("filters.open")}
            {appliedFilterCount > 0 && (
              <span className="ml-2 inline-flex min-h-6 min-w-6 items-center justify-center rounded-full bg-primary px-1.5 text-xs font-semibold text-primary-foreground">
                {appliedFilterCount}
              </span>
            )}
          </Button>
        </div>

        <MobileFilterSheet
          id="restaurants-filters-sheet"
          open={isFilterSheetOpen}
          onOpenChange={setIsFilterSheetOpen}
          title={t("filters.title")}
          activeCountLabel={`${t("filters.activeCount")}: ${draftFilterCount}`}
          closeA11yLabel={t("filters.closeA11y")}
          footerHint={`${t("filters.resultsPreview")}: ${total} ${t("category.totalResults")}`}
          clearLabel={t("filters.clear")}
          applyLabel={t("filters.apply")}
          onClear={clearDraftFilters}
          onApply={applyDraftFilters}
        >
          {isRestaurantsHub && (
            <div className="space-y-1">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">{t("common.allCategories")}</p>
              <Select
                value={draftFilters.category}
                onValueChange={(value) => setDraftFilters((prev) => ({ ...prev, category: value }))}
                disabled={!isRestaurantsHub}
              >
                <SelectTrigger className="min-h-11 rounded-xl">
                  <SelectValue placeholder={t("common.allCategories")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("common.allCategories")}</SelectItem>
                  {categories.map((item) => (
                    <SelectItem key={item.slug} value={item.slug}>
                      {item.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">{t("category.searchPlaceholder")}</p>
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={draftFilters.search}
                onChange={(event) => setDraftFilters((prev) => ({ ...prev, search: event.target.value }))}
                placeholder={t("category.searchPlaceholder")}
                className="min-h-11 rounded-xl pl-9"
              />
            </div>
          </div>

          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">{t("common.allCities")}</p>
            <Select value={draftFilters.city} onValueChange={(value) => setDraftFilters((prev) => ({ ...prev, city: value }))}>
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
          </div>

          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">{t("common.allPrices")}</p>
            <Select value={draftFilters.priceTier} onValueChange={(value) => setDraftFilters((prev) => ({ ...prev, priceTier: value }))}>
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
          </div>

          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">{t("common.allRatings")}</p>
            <Select value={draftFilters.ratingMin} onValueChange={(value) => setDraftFilters((prev) => ({ ...prev, ratingMin: value }))}>
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
          </div>

          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">{t("category.sort")}</p>
            <Select
              value={draftFilters.sort}
              onValueChange={(value) => setDraftFilters((prev) => ({ ...prev, sort: value as RestaurantFilterState["sort"] }))}
            >
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
        </MobileFilterSheet>

        <div className="hidden gap-3 md:grid md:grid-cols-2 xl:grid-cols-6">
          <Select value={categoryFilter} onValueChange={handleCategoryChange} disabled={!isRestaurantsHub}>
            <SelectTrigger className="min-h-11 rounded-xl">
              <SelectValue placeholder={t("common.allCategories")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("common.allCategories")}</SelectItem>
              {categories.map((item) => (
                <SelectItem key={item.slug} value={item.slug}>
                  {item.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="relative md:col-span-2 xl:col-span-1">
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

      {restaurantsQuery.isPending && restaurants.length === 0 && (
        <p className="text-sm text-muted-foreground">{t("category.loadingRestaurants")}</p>
      )}

      {restaurantsQuery.isError && restaurants.length === 0 && (
        <p className="text-sm text-destructive">{t("category.errorRestaurants")}</p>
      )}

      {!restaurantsQuery.isPending && restaurants.length === 0 && (
        <Card className="editorial-card">
          <CardContent className="p-6 text-sm text-muted-foreground">
            <p>{t("category.noResults")}</p>
            <p className="mt-1 text-xs">{t("category.noResultsHint")}</p>
          </CardContent>
        </Card>
      )}

      <section className="space-y-4">
        {restaurants.map((item) => (
          <article key={item.slug} className="editorial-card p-5 sm:p-6">
            <div className="grid gap-4 lg:grid-cols-[220px_120px_minmax(0,1fr)_210px]">
              <div className="rounded-xl border border-border/60 bg-background/70 px-3 py-3">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">{t("category.rating")}</p>
                <p className="mt-2 text-xl leading-none text-amber-500">{ratingStars(item.ratingAsier)}</p>
                <p className="mt-2 text-sm font-semibold text-foreground">{ratingValue(item.ratingAsier)}/3</p>
                {item.ratingAsier == null && (
                  <p className="mt-1 text-xs text-muted-foreground">{t("category.provisional")}</p>
                )}
              </div>

              <div className="rounded-xl border border-border/60 bg-background/70 px-3 py-3">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">{t("category.price")}</p>
                <p className="mt-2 text-lg font-semibold text-foreground">{priceLabel(item.priceTier)}</p>
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl font-semibold text-foreground">{item.name}</h2>
                <p className="text-sm font-medium text-foreground">{item.specialty}</p>
                <p className="text-sm text-muted-foreground">{item.description}</p>
                <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">
                  {t("category.city")}: {item.city}
                </p>
              </div>

              <div className="flex flex-col gap-2 sm:flex-row lg:flex-col lg:justify-end">
                {item.mapUrl ? (
                  <a
                    href={item.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground transition hover:brightness-95"
                    aria-label={`${t("common.openMap")}: ${item.name}`}
                  >
                    <MapPin className="h-4 w-4" />
                    {t("common.openMap")}
                  </a>
                ) : (
                  <span className="inline-flex min-h-11 items-center justify-center rounded-xl border border-border/70 px-4 text-sm text-muted-foreground">
                    {t("category.mapUnavailable")}
                  </span>
                )}

                <Button variant="outline" className="min-h-11 rounded-xl" onClick={() => setSelected(item)}>
                  {t("common.viewDetails")}
                </Button>
              </div>
            </div>
          </article>
        ))}
      </section>

      {restaurantsQuery.hasNextPage && <div ref={loadMoreRef} className="h-12 w-full" aria-hidden />}
      {restaurantsQuery.isFetchingNextPage && (
        <p className="text-center text-sm text-muted-foreground">{t("category.loadingMore")}</p>
      )}
      {!restaurantsQuery.hasNextPage && restaurants.length > 0 && (
        <p className="text-center text-sm text-muted-foreground">{t("category.endOfList")}</p>
      )}

      <Dialog
        open={Boolean(selected)}
        onOpenChange={(open) => {
          if (!open) setSelected(null);
        }}
      >
        {selected && (
          <DialogContent className="max-h-[88vh] overflow-y-auto rounded-2xl border border-border/70 p-6 sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl text-foreground">{selected.name}</DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground">{selected.specialty}</DialogDescription>
            </DialogHeader>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-border/60 bg-background/70 px-3 py-3">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">{t("category.rating")}</p>
                <p className="mt-2 text-xl leading-none text-amber-500">{ratingStars(selected.ratingAsier)}</p>
                <p className="mt-2 text-sm font-semibold text-foreground">{ratingValue(selected.ratingAsier)}/3</p>
              </div>

              <div className="rounded-xl border border-border/60 bg-background/70 px-3 py-3">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">{t("category.price")}</p>
                <p className="mt-2 text-lg font-semibold text-foreground">{priceLabel(selected.priceTier)}</p>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-semibold text-foreground">{t("category.specialty")}</p>
              <p className="text-sm text-muted-foreground">{selected.specialty}</p>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-semibold text-foreground">{t("common.curatedByAsier")}</p>
              <p className="text-sm text-muted-foreground">{selected.description}</p>
            </div>

            <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">
              {t("category.city")}: {selected.city}
            </p>

            {selected.mapUrl && (
              <a
                href={selected.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground transition hover:brightness-95"
              >
                <MapPin className="h-4 w-4" />
                {t("common.openMap")}
              </a>
            )}
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};
