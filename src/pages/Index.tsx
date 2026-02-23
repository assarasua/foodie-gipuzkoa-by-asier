import { ArrowRight, Compass, MapPinned, Star, TriangleAlert } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { api, ApiError } from "@/lib/api";
import { getFallbackCategories, getFallbackRestaurants } from "@/lib/fallbackData";
import { useTranslation } from "@/contexts/TranslationContext";

const moodKeys = ["moods.casual", "moods.dateNight", "moods.seafood", "moods.vegetarian", "moods.michelin"] as const;

const Index = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { language, t } = useTranslation();

  const categoriesQuery = useQuery({
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
    queryKey: ["restaurants", "home", language],
    queryFn: async () => {
      try {
        const response = await api.getRestaurants(language, undefined, { limit: 8, sort: "highest-rated" });
        return { data: response.data, isFallback: false, error: null as ApiError | null };
      } catch (error) {
        return {
          data: getFallbackRestaurants(language),
          isFallback: true,
          error: error instanceof ApiError ? error : new ApiError(t("common.error"), 0)
        };
      }
    }
  });

  const restaurantsCountQuery = useQuery({
    queryKey: ["restaurants", "counts", language],
    queryFn: async () => {
      try {
        const response = await api.getRestaurants(language, undefined, { limit: 300 });
        return { data: response.data, isFallback: false, error: null as ApiError | null };
      } catch (error) {
        return {
          data: getFallbackRestaurants(language),
          isFallback: true,
          error: error instanceof ApiError ? error : new ApiError(t("common.error"), 0)
        };
      }
    }
  });

  const categories = categoriesQuery.data?.data ?? [];
  const restaurants = restaurantsQuery.data?.data ?? [];
  const restaurantsForCount = restaurantsCountQuery.data?.data ?? [];
  const isFallback = Boolean(
    categoriesQuery.data?.isFallback || restaurantsQuery.data?.isFallback || restaurantsCountQuery.data?.isFallback
  );

  useEffect(() => {
    if (location.hash === "#categories") {
      const timer = window.setTimeout(() => {
        document.getElementById("categories")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 60);
      return () => window.clearTimeout(timer);
    }
    return undefined;
  }, [location.hash]);

  const categoryCountMap = restaurantsForCount.reduce<Record<string, number>>((acc, item) => {
    acc[item.categorySlug] = (acc[item.categorySlug] ?? 0) + 1;
    return acc;
  }, {});

  const topPicks = restaurants.filter((item) => item.mapUrl).slice(0, 3);
  const featuredMapUrl = topPicks[0]?.mapUrl ?? "https://maps.google.com/?q=Donostia";

  return (
    <div>
      {isFallback && (
        <div className="mx-auto mt-4 flex max-w-7xl items-start gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-800">
          <TriangleAlert className="mt-0.5 h-4 w-4" />
          <p>{t("common.fallbackBanner")}</p>
        </div>
      )}

      <section className="relative overflow-hidden border-b border-border/60 bg-[radial-gradient(circle_at_20%_20%,hsl(var(--accent)/0.2),transparent_45%),radial-gradient(circle_at_80%_0%,hsl(var(--primary)/0.18),transparent_42%)]">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8 lg:py-20">
          <div className="space-y-6">
            <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">{t("home.kicker")}</p>
            <h1 className="max-w-2xl text-balance text-4xl font-semibold leading-tight text-foreground sm:text-5xl lg:text-6xl">
              {t("home.title")}
            </h1>
            <p className="max-w-xl text-base text-muted-foreground sm:text-lg">{t("home.subtitle")}</p>
            <div className="flex flex-wrap gap-3">
              <a
                href={featuredMapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground transition hover:brightness-95"
              >
                <MapPinned className="h-4 w-4" />
                {t("home.ctaPrimary")}
              </a>
              <Button
                variant="outline"
                className="min-h-11 rounded-xl"
                onClick={() => document.getElementById("categories")?.scrollIntoView({ behavior: "smooth" })}
              >
                <Compass className="mr-2 h-4 w-4" />
                {t("home.ctaSecondary")}
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 pt-2">
              {moodKeys.map((key) => (
                <span key={key} className="rounded-full border border-border/70 bg-card px-3 py-1.5 text-xs text-muted-foreground">
                  {t(key)}
                </span>
              ))}
            </div>
          </div>

          <Card className="border-border/70 bg-card/90 shadow-sm">
            <CardContent className="space-y-4 p-5 sm:p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-foreground">{t("home.topRated")}</h3>
                <Link to="/jovenes-talentos" className="text-xs font-medium text-primary hover:underline">
                  {t("home.talents")}
                </Link>
              </div>
              {restaurantsQuery.isLoading && <p className="text-sm text-muted-foreground">{t("home.loadingHighlights")}</p>}
              {restaurantsQuery.isError && <p className="text-sm text-destructive">{t("home.errorHighlights")}</p>}
              <ul className="space-y-3">
                {restaurants.slice(0, 5).map((item) => (
                  <li key={item.slug} className="flex items-start justify-between gap-3 rounded-xl border border-border/60 p-3">
                    <div>
                      <p className="text-sm font-semibold text-foreground">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{item.locationLabel}</p>
                    </div>
                    <div className="flex items-center gap-1 text-amber-500">
                      <Star className="h-3.5 w-3.5 fill-current" />
                      <span className="text-xs font-semibold text-foreground">{item.ratingAsier ?? "-"}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="categories" className="mx-auto max-w-7xl space-y-8 px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="space-y-2">
            <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">{t("home.categoriesTitle")}</h2>
            <p className="max-w-2xl text-sm text-muted-foreground sm:text-base">{t("home.categoriesSubtitle")}</p>
          </div>
          <Button variant="ghost" className="min-h-11 rounded-xl" onClick={() => navigate("/jovenes-talentos")}>
            {t("common.viewAll")}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        {categoriesQuery.isLoading && <p className="text-sm text-muted-foreground">{t("home.loadingCategories")}</p>}
        {categoriesQuery.isError && <p className="text-sm text-destructive">{t("home.errorCategories")}</p>}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {categories.map((category) => {
            const count = categoryCountMap[category.slug] ?? 0;

            return (
              <button
                key={category.slug}
                onClick={() => navigate(`/category/${category.slug}`)}
                className="group rounded-2xl border border-border/70 bg-card/90 p-5 text-left transition duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-sm"
              >
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-lg text-primary">
                  <span>{category.emoji}</span>
                </div>
                <h3 className="text-lg font-semibold text-foreground">{category.title}</h3>
                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{category.description}</p>
                <div className="mt-5 flex items-center justify-between text-xs text-muted-foreground">
                  <span>{t("home.trending")}</span>
                  <span>
                    {count} {t("home.spots")}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        <Card className="border-border/70 bg-card/70">
          <CardContent className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <div>
              <p className="text-sm font-semibold text-foreground">{t("home.byMood")}</p>
              <p className="text-xs text-muted-foreground">{t("home.quickPaths")}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {moodKeys.map((key) => (
                <span key={key} className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
                  {t(key)}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default Index;
