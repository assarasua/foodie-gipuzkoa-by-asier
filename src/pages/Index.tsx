import { ArrowRight, Compass, MapPinned, Sparkles, Star } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { api } from "@/lib/api";
import { useTranslation } from "@/contexts/TranslationContext";

const HomeCopy = {
  es: {
    kicker: "Guía editorial",
    title: "Descubre la nueva escena gastronómica de Gipuzkoa",
    subtitle:
      "Selecciones premium pero accesibles, con foco en dónde comer hoy y cómo llegar rápido.",
    ctaPrimary: "Abrir top picks en el mapa",
    ctaSecondary: "Explorar categorías",
    categories: "Categorías",
    categoriesSub: "Explora por estilo culinario con una interfaz pensada para decidir más rápido.",
    trending: "Trending en Gipuzkoa",
    byMood: "By mood",
    topRated: "Mejor valorados",
    seeAll: "Ver todo",
    talents: "Ver talentos"
  },
  en: {
    kicker: "Editorial guide",
    title: "Discover Gipuzkoa's new gourmet scene",
    subtitle:
      "Premium yet mainstream picks, focused on where to eat today and how to get there quickly.",
    ctaPrimary: "Open top picks on map",
    ctaSecondary: "Explore categories",
    categories: "Categories",
    categoriesSub: "Browse by culinary style with a faster decision-first interface.",
    trending: "Trending in Gipuzkoa",
    byMood: "By mood",
    topRated: "Top rated",
    seeAll: "See all",
    talents: "View talents"
  }
};

const moodChips = ["Casual", "Date night", "Seafood", "Vegetarian", "Michelin"];

const Index = () => {
  const navigate = useNavigate();
  const { language } = useTranslation();
  const copy = HomeCopy[language];

  const categoriesQuery = useQuery({
    queryKey: ["categories", language],
    queryFn: async () => (await api.getCategories(language)).data
  });

  const restaurantsQuery = useQuery({
    queryKey: ["restaurants", "home", language],
    queryFn: async () => (await api.getRestaurants(language, undefined, { limit: 8, sort: "highest-rated" })).data
  });

  const topPicks = restaurantsQuery.data?.filter((item) => item.mapUrl).slice(0, 3) ?? [];
  const featuredMapUrl = topPicks[0]?.mapUrl ?? "https://maps.google.com/?q=Donostia";

  return (
    <div>
      <section className="relative overflow-hidden border-b border-border/60 bg-[radial-gradient(circle_at_20%_20%,hsl(var(--accent)/0.2),transparent_45%),radial-gradient(circle_at_80%_0%,hsl(var(--primary)/0.18),transparent_42%)]">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8 lg:py-20">
          <div className="space-y-6">
            <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">{copy.kicker}</p>
            <h1 className="max-w-2xl text-balance text-4xl font-semibold leading-tight text-foreground sm:text-5xl lg:text-6xl">
              {copy.title}
            </h1>
            <p className="max-w-xl text-base text-muted-foreground sm:text-lg">{copy.subtitle}</p>
            <div className="flex flex-wrap gap-3">
              <a
                href={featuredMapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground transition hover:brightness-95"
              >
                <MapPinned className="h-4 w-4" />
                {copy.ctaPrimary}
              </a>
              <Button
                variant="outline"
                className="min-h-11 rounded-xl"
                onClick={() => document.getElementById("categories")?.scrollIntoView({ behavior: "smooth" })}
              >
                <Compass className="mr-2 h-4 w-4" />
                {copy.ctaSecondary}
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 pt-2">
              {moodChips.map((chip) => (
                <span key={chip} className="rounded-full border border-border/70 bg-card px-3 py-1.5 text-xs text-muted-foreground">
                  {chip}
                </span>
              ))}
            </div>
          </div>

          <Card className="border-border/70 bg-card/90 shadow-sm">
            <CardContent className="space-y-4 p-5 sm:p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-foreground">{copy.topRated}</h3>
                <Link to="/jovenes-talentos" className="text-xs font-medium text-primary hover:underline">
                  {copy.talents}
                </Link>
              </div>
              {restaurantsQuery.isLoading && <p className="text-sm text-muted-foreground">Loading...</p>}
              {restaurantsQuery.isError && <p className="text-sm text-destructive">Failed to load highlights.</p>}
              <ul className="space-y-3">
                {(restaurantsQuery.data ?? []).slice(0, 5).map((item) => (
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
            <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">{copy.categories}</h2>
            <p className="max-w-2xl text-sm text-muted-foreground sm:text-base">{copy.categoriesSub}</p>
          </div>
          <Button variant="ghost" className="min-h-11 rounded-xl" onClick={() => navigate("/jovenes-talentos")}>
            {copy.seeAll}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        {categoriesQuery.isLoading && <p className="text-sm text-muted-foreground">Loading categories...</p>}
        {categoriesQuery.isError && <p className="text-sm text-destructive">Failed to load categories.</p>}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {(categoriesQuery.data ?? []).map((category) => {
            const count = (restaurantsQuery.data ?? []).filter((item) => item.categorySlug === category.slug).length;

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
                  <span>{copy.trending}</span>
                  <span>{count} spots</span>
                </div>
              </button>
            );
          })}
        </div>

        <Card className="border-border/70 bg-card/70">
          <CardContent className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <div>
              <p className="text-sm font-semibold text-foreground">{copy.byMood}</p>
              <p className="text-xs text-muted-foreground">Quick paths for faster decision making.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {moodChips.map((chip) => (
                <span key={chip} className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
                  {chip}
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
