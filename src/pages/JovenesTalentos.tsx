import { useMemo, useState } from "react";
import { ArrowLeft, ChevronDown, Search, SlidersHorizontal, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { api } from "@/lib/api";
import { useTranslation } from "@/contexts/TranslationContext";

const sectorValues = [
  "all",
  "restauracion",
  "sector-del-vino",
  "pasteleria-panaderia",
  "productor",
  "comunicacion",
  "start-ups",
  "investigacion",
  "otros-perfiles"
] as const;

type SectorValue = (typeof sectorValues)[number];

export const JovenesTalentos = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [search, setSearch] = useState("");
  const [sector, setSector] = useState<SectorValue>("all");
  const [location, setLocation] = useState("");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const talentsQuery = useQuery({
    queryKey: ["talents", search, sector, location],
    queryFn: async () => {
      const response = await api.getTalents({
        search: search || undefined,
        sector: sector === "all" ? undefined : sector,
        location: location || undefined,
        limit: 200
      });
      return response.data;
    }
  });

  const locations = useMemo(
    () => Array.from(new Set((talentsQuery.data ?? []).map((item) => item.location))).sort((a, b) => a.localeCompare(b)),
    [talentsQuery.data]
  );

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
      <Button variant="ghost" className="min-h-11 rounded-xl" onClick={() => navigate("/")}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        {t("common.backHome")}
      </Button>

      <section className="editorial-card p-6 sm:p-8">
        <div className="space-y-3">
          <p className="editorial-kicker">{t("talents.kicker")}</p>
          <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">{t("talents.title")}</h1>
          <p className="max-w-3xl text-sm text-muted-foreground sm:text-base">{t("talents.subtitle")}</p>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="editorial-card border-primary/25 bg-primary/5">
          <CardContent className="space-y-2 p-5">
            <p className="text-sm uppercase tracking-[0.18em] text-primary">{t("talents.spotlightTitle")}</p>
            <p className="text-sm text-foreground">{t("talents.spotlightText")}</p>
          </CardContent>
        </Card>
        <Card className="editorial-card">
          <CardContent className="space-y-2 p-5">
            <p className="text-sm font-semibold text-foreground">{t("common.curatedByAsier")}</p>
            <p className="text-sm text-muted-foreground">{t("talents.curationNote")}</p>
          </CardContent>
        </Card>
      </section>

      <section className="sticky top-28 z-30 rounded-2xl border border-border/70 bg-background/95 p-4 backdrop-blur-lg md:top-20">
        <div className="flex items-center justify-between md:hidden">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">{t("nav.filters")}</p>
          <Button
            type="button"
            variant="outline"
            className="min-h-10 rounded-xl"
            onClick={() => setShowMobileFilters((value) => !value)}
          >
            <SlidersHorizontal className="mr-1.5 h-4 w-4" />
            {t("nav.filters")}
            <ChevronDown className={`ml-1.5 h-4 w-4 transition-transform ${showMobileFilters ? "rotate-180" : ""}`} />
          </Button>
        </div>

        {showMobileFilters && (
          <div className="mt-3 grid gap-3 md:hidden">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder={t("talents.searchPlaceholder")}
                className="min-h-11 rounded-xl pl-9"
              />
            </div>

            <Select value={sector} onValueChange={setSector}>
              <SelectTrigger className="min-h-11 rounded-xl">
                <SelectValue placeholder={t("talents.sector")} />
              </SelectTrigger>
              <SelectContent>
                {sectorValues.map((value) => (
                  <SelectItem key={value} value={value}>
                    {t(`talents.sectors.${value}`)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={location || "all"} onValueChange={(value) => setLocation(value === "all" ? "" : value)}>
              <SelectTrigger className="min-h-11 rounded-xl">
                <SelectValue placeholder={t("talents.location")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t("common.allLocations")}</SelectItem>
                {locations.map((item) => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        <div className="hidden gap-3 md:grid md:grid-cols-[1.4fr_1fr_1fr]">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={t("talents.searchPlaceholder")}
              className="min-h-11 rounded-xl pl-9"
            />
          </div>

          <Select value={sector} onValueChange={setSector}>
            <SelectTrigger className="min-h-11 rounded-xl">
              <SelectValue placeholder={t("talents.sector")} />
            </SelectTrigger>
            <SelectContent>
              {sectorValues.map((value) => (
                <SelectItem key={value} value={value}>
                  {t(`talents.sectors.${value}`)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={location || "all"} onValueChange={(value) => setLocation(value === "all" ? "" : value)}>
            <SelectTrigger className="min-h-11 rounded-xl">
              <SelectValue placeholder={t("talents.location")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("common.allLocations")}</SelectItem>
              {locations.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </section>

      {talentsQuery.isLoading && <p className="text-sm text-muted-foreground">{t("talents.loading")}</p>}
      {talentsQuery.isError && <p className="text-sm text-destructive">{t("talents.error")}</p>}

      <section className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        {(talentsQuery.data ?? []).map((talent) => (
          <Card key={talent.id} className="editorial-card">
            <CardContent className="space-y-3 p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-2xl font-semibold text-foreground">{talent.name}</p>
                  <p className="text-sm text-muted-foreground">{talent.role}</p>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                  <Sparkles className="h-3 w-3" />
                  {sectorValues.includes(talent.sector as SectorValue)
                    ? t(`talents.sectors.${talent.sector as SectorValue}`)
                    : talent.sector}
                </span>
              </div>
              <p className="text-sm text-foreground">{talent.company}</p>
              <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">{talent.location}</p>
              {talent.description && <p className="text-sm text-muted-foreground">{talent.description}</p>}
            </CardContent>
          </Card>
        ))}
      </section>

      {!talentsQuery.isLoading && (talentsQuery.data ?? []).length === 0 && (
        <Card className="editorial-card">
          <CardContent className="p-6 text-sm text-muted-foreground">{t("talents.noResults")}</CardContent>
        </Card>
      )}
    </div>
  );
};
