import { useMemo, useState } from "react";
import { ArrowLeft, MapPin, Search, SlidersHorizontal, Star } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { api, RestaurantFilterState, type RestaurantListItem } from "@/lib/api";
import { useTranslation } from "@/contexts/TranslationContext";

const priceLabel = (priceTier: number) => "€".repeat(Math.max(1, Math.min(4, priceTier)));

const RestaurantDetail = ({ item }: { item: RestaurantListItem }) => (
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
          <span className="font-semibold text-foreground">Specialty:</span> {item.specialty}
        </p>
        <p>
          <span className="font-semibold text-foreground">City:</span> {item.city}
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
          Open map
        </a>
      )}
    </CardContent>
  </Card>
);

export const CategoryPage = () => {
  const navigate = useNavigate();
  const { category } = useParams<{ category: string }>();
  const { language } = useTranslation();

  const [search, setSearch] = useState("");
  const [city, setCity] = useState("all");
  const [priceTier, setPriceTier] = useState("all");
  const [ratingMin, setRatingMin] = useState("all");
  const [sort, setSort] = useState<RestaurantFilterState["sort"]>("recommended");
  const [selected, setSelected] = useState<RestaurantListItem | null>(null);

  const categoryQuery = useQuery({
    queryKey: ["categories", language],
    queryFn: async () => (await api.getCategories(language)).data
  });

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

  const restaurantsQuery = useQuery({
    queryKey: ["restaurants", category, language, filters],
    queryFn: async () => (await api.getRestaurants(language, category, filters)).data,
    enabled: Boolean(category)
  });

  const currentCategory = (categoryQuery.data ?? []).find((item) => item.slug === category);
  const cities = Array.from(new Set((restaurantsQuery.data ?? []).map((item) => item.city))).sort();

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
      <Button variant="ghost" className="min-h-11 rounded-xl" onClick={() => navigate("/")}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to home
      </Button>

      <section className="rounded-2xl border border-border/70 bg-card/80 p-5 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Category</p>
            <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              {currentCategory?.title ?? "Loading..."}
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
              placeholder="Search name, specialty, city..."
              className="min-h-11 rounded-xl pl-9"
            />
          </div>

          <Select value={city} onValueChange={setCity}>
            <SelectTrigger className="min-h-11 rounded-xl">
              <SelectValue placeholder="City" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All cities</SelectItem>
              {cities.map((cityOption) => (
                <SelectItem key={cityOption} value={cityOption}>
                  {cityOption}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={priceTier} onValueChange={setPriceTier}>
            <SelectTrigger className="min-h-11 rounded-xl">
              <SelectValue placeholder="Price" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All prices</SelectItem>
              {[1, 2, 3, 4].map((tier) => (
                <SelectItem key={tier} value={String(tier)}>
                  {priceLabel(tier)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={ratingMin} onValueChange={setRatingMin}>
            <SelectTrigger className="min-h-11 rounded-xl">
              <SelectValue placeholder="Rating" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All ratings</SelectItem>
              {[1, 2, 3].map((value) => (
                <SelectItem key={value} value={String(value)}>
                  {value}+ stars
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sort} onValueChange={(value) => setSort(value as RestaurantFilterState["sort"])}>
            <SelectTrigger className="min-h-11 rounded-xl">
              <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recommended">Recommended</SelectItem>
              <SelectItem value="highest-rated">Highest rated</SelectItem>
              <SelectItem value="price-low">Price low</SelectItem>
              <SelectItem value="price-high">Price high</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </section>

      {restaurantsQuery.isLoading && <p className="text-sm text-muted-foreground">Loading restaurants...</p>}
      {restaurantsQuery.isError && <p className="text-sm text-destructive">Could not load restaurants.</p>}

      {!restaurantsQuery.isLoading && (restaurantsQuery.data ?? []).length === 0 && (
        <Card className="border-border/70 bg-card/90">
          <CardContent className="p-6 text-sm text-muted-foreground">No results found. Try removing filters.</CardContent>
        </Card>
      )}

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {(restaurantsQuery.data ?? []).map((item) => (
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
                    Open map
                  </a>
                )}
                <Button variant="outline" className="min-h-11 rounded-xl" onClick={() => setSelected(item)}>
                  View details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>

      {selected && <RestaurantDetail item={selected} />}
    </div>
  );
};
