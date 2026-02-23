import { ArrowRight, Compass, MapPinned, Star, TriangleAlert } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { api, ApiError, RestaurantListItem } from "@/lib/api";
import { getFallbackCategories, getFallbackRestaurants } from "@/lib/fallbackData";
import { useTranslation } from "@/contexts/TranslationContext";

const moodKeys = ["moods.casual", "moods.dateNight", "moods.seafood", "moods.vegetarian", "moods.michelin"] as const;

const priceLabel = (priceTier: number) => "€".repeat(Math.max(1, Math.min(4, priceTier)));

const curatedScore = (item: RestaurantListItem) => {
  const ratingWeight = (item.ratingAsier ?? 0) * 10;
  const mapWeight = item.mapUrl ? 4 : 0;
  const youngTalentWeight = item.isYoungTalent ? 2 : 0;
  return ratingWeight + mapWeight + youngTalentWeight;
};

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
        const response = await api.getRestaurants(language, undefined, { limit: 80, sort: "highest-rated" });
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
  const isFallback = Boolean(categoriesQuery.data?.isFallback || restaurantsQuery.data?.isFallback);

  useEffect(() => {
    if (location.hash === "#categories") {
      const timer = window.setTimeout(() => {
        document.getElementById("categories")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 60);
      return () => window.clearTimeout(timer);
    }
    return undefined;
  }, [location.hash]);

  const sortedByCuration = useMemo(() => [...restaurants].sort((a, b) => curatedScore(b) - curatedScore(a)), [restaurants]);
  const topPicks = sortedByCuration.slice(0, 6);
  const weeklyPicks = sortedByCuration.slice(0, 9);
  const featuredMapUrl = topPicks.find((item) => item.mapUrl)?.mapUrl ?? "https://maps.google.com/?q=Donostia";

  const categoryCountMap = restaurants.reduce<Record<string, number>>((acc, item) => {
    acc[item.categorySlug] = (acc[item.categorySlug] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <div className="space-y-8 pb-8">
      {isFallback && (
        <div className="mx-auto mt-4 flex max-w-7xl items-start gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-800">
          <TriangleAlert className="mt-0.5 h-4 w-4" />
          <p>{t("common.fallbackBanner")}</p>
        </div>
      )}

      <section className="relative overflow-hidden border-b border-border/60">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8 lg:py-16">
          <div className="space-y-6 reveal">
            <p className="editorial-kicker">{t("home.kicker")}</p>
            <h1 className="editorial-title">{t("home.title")}</h1>
            <p className="max-w-2xl text-base text-muted-foreground sm:text-lg">{t("home.subtitle")}</p>
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
            <div className="flex flex-wrap gap-2">
              {moodKeys.map((key) => (
                <span key={key} className="rounded-full border border-border/70 bg-card px-3 py-1.5 text-xs text-muted-foreground">
                  {t(key)}
                </span>
              ))}
            </div>
          </div>

          <Card className="editorial-card reveal">
            <CardContent className="space-y-4 p-5 sm:p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-foreground">{t("home.selectionTitle")}</h3>
                <Badge variant="outline" className="border-primary/40 bg-primary/10 text-primary">
                  {t("common.curatedByAsier")}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{t("home.selectionSubtitle")}</p>
              {restaurantsQuery.isLoading && <p className="text-sm text-muted-foreground">{t("home.loadingHighlights")}</p>}
              {restaurantsQuery.isError && <p className="text-sm text-destructive">{t("home.errorHighlights")}</p>}
              <ul className="space-y-3">
                {topPicks.slice(0, 4).map((item) => (
                  <li key={item.slug} className="rounded-xl border border-border/70 bg-background/70 p-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-foreground">{item.name}</p>
                        <p className="text-xs text-muted-foreground">{item.city}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-muted-foreground">{priceLabel(item.priceTier)}</span>
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-foreground">
                          <Star className="h-3.5 w-3.5 text-amber-500" />
                          {item.ratingAsier ?? "-"}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-4 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
        <Card className="editorial-card reveal">
          <CardContent className="space-y-2 p-5">
            <p className="text-sm font-semibold text-foreground">{t("home.principleProductTitle")}</p>
            <p className="text-sm text-muted-foreground">{t("home.principleProductDesc")}</p>
          </CardContent>
        </Card>
        <Card className="editorial-card reveal" style={{ animationDelay: "60ms" }}>
          <CardContent className="space-y-2 p-5">
            <p className="text-sm font-semibold text-foreground">{t("home.principleTechniqueTitle")}</p>
            <p className="text-sm text-muted-foreground">{t("home.principleTechniqueDesc")}</p>
          </CardContent>
        </Card>
        <Card className="editorial-card reveal" style={{ animationDelay: "120ms" }}>
          <CardContent className="space-y-2 p-5">
            <p className="text-sm font-semibold text-foreground">{t("home.principleConsistencyTitle")}</p>
            <p className="text-sm text-muted-foreground">{t("home.principleConsistencyDesc")}</p>
          </CardContent>
        </Card>
      </section>

      <section className="mx-auto max-w-7xl space-y-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="editorial-kicker">{t("home.weeklyTitle")}</p>
            <h2 className="editorial-section-title">{t("home.weeklySubtitle")}</h2>
          </div>
          <Link to="/jovenes-talentos" className="text-sm font-semibold text-primary hover:underline">
            {t("home.talents")}
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
          {weeklyPicks.map((item) => (
            <Card key={item.slug} className="editorial-card">
              <CardContent className="space-y-3 p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-lg font-semibold text-foreground">{item.name}</p>
                    <p className="text-sm text-muted-foreground">{item.specialty}</p>
                  </div>
                  <Badge variant="secondary" className="rounded-full bg-muted text-muted-foreground">
                    {priceLabel(item.priceTier)}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{item.city}</span>
                  <span className="inline-flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 text-amber-500" />
                    {item.ratingAsier ?? "-"}
                  </span>
                </div>
                {item.mapUrl && (
                  <a
                    href={item.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-primary px-3 text-sm font-semibold text-primary-foreground transition hover:brightness-95"
                  >
                    {t("common.openMap")}
                  </a>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section id="categories" className="mx-auto max-w-7xl space-y-8 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="space-y-2">
            <h2 className="editorial-section-title">{t("home.categoriesTitle")}</h2>
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
                className="editorial-card p-5 text-left"
              >
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-lg text-primary">
                  <span>{category.emoji}</span>
                </div>
                <h3 className="text-2xl font-semibold text-foreground">{category.title}</h3>
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

        <Card className="editorial-card border-primary/20 bg-primary/5">
          <CardContent className="space-y-2 p-6">
            <p className="text-sm uppercase tracking-[0.16em] text-primary">{t("home.signatureTitle")}</p>
            <p className="max-w-3xl text-lg text-foreground sm:text-xl">{t("home.signatureQuote")}</p>
          </CardContent>
        </Card>

        <Card className="editorial-card">
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
