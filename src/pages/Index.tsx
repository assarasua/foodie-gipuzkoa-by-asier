import { ArrowRight, TriangleAlert } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { api, ApiError } from "@/lib/api";
import { getFallbackCategories } from "@/lib/fallbackData";
import { useTranslation } from "@/contexts/TranslationContext";

const asierSelection = ["Asador Nicolas", "Ganbara", "Ama", "Elkano", "Arrea"] as const;

const Index = () => {
  const navigate = useNavigate();
  const { language, t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState("all");

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

  const categories = categoriesQuery.data?.data ?? [];
  const isFallback = Boolean(categoriesQuery.data?.isFallback);

  const handleOpenRestaurants = () => {
    if (selectedCategory === "all") {
      navigate("/restaurants");
      return;
    }
    navigate(`/category/${selectedCategory}`);
  };

  return (
    <div className="mx-auto max-w-5xl space-y-8 px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      {isFallback && (
        <div className="flex items-start gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-800">
          <TriangleAlert className="mt-0.5 h-4 w-4" />
          <p>{t("common.fallbackBanner")}</p>
        </div>
      )}

      <section className="editorial-card space-y-5 p-6 sm:p-8">
        <p className="editorial-kicker">{t("home.kicker")}</p>
        <h1 className="editorial-title text-5xl sm:text-6xl">{t("home.aboutTitle")}</h1>
        <p className="text-base text-muted-foreground sm:text-lg">{t("home.aboutIntro")}</p>
        <div className="flex flex-wrap gap-3">
          <Button className="min-h-11 rounded-xl" onClick={() => navigate("/restaurants")}>
            {t("home.ctaRestaurants")}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button variant="outline" className="min-h-11 rounded-xl" onClick={() => navigate("/jovenes-talentos")}>
            {t("home.ctaTalents")}
          </Button>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <Card className="editorial-card">
          <CardContent className="space-y-2 p-5">
            <p className="text-sm font-semibold text-foreground">{t("home.howStep1Title")}</p>
            <p className="text-sm text-muted-foreground">{t("home.howStep1Desc")}</p>
          </CardContent>
        </Card>
        <Card className="editorial-card">
          <CardContent className="space-y-2 p-5">
            <p className="text-sm font-semibold text-foreground">{t("home.howStep2Title")}</p>
            <p className="text-sm text-muted-foreground">{t("home.howStep2Desc")}</p>
          </CardContent>
        </Card>
        <Card className="editorial-card">
          <CardContent className="space-y-2 p-5">
            <p className="text-sm font-semibold text-foreground">{t("home.howStep3Title")}</p>
            <p className="text-sm text-muted-foreground">{t("home.howStep3Desc")}</p>
          </CardContent>
        </Card>
      </section>

      <section className="editorial-card space-y-4 p-6">
        <div>
          <p className="editorial-kicker">{t("home.asierSelectionCompactTitle")}</p>
          <h2 className="text-3xl font-semibold text-foreground">{t("home.asierSelectionCompactSubtitle")}</h2>
        </div>
        <div className="grid gap-2 sm:grid-cols-2">
          {asierSelection.map((name) => (
            <div key={name} className="rounded-xl border border-border/70 bg-background/70 px-4 py-3 text-sm font-semibold text-foreground">
              {name}
            </div>
          ))}
        </div>
        <div className="flex">
          <Button className="min-h-11 rounded-xl" onClick={() => navigate("/restaurants")}>
            {t("home.ctaRestaurants")}
          </Button>
        </div>
      </section>

      <section className="editorial-card space-y-4 p-6">
        <div>
          <p className="editorial-kicker">{t("home.categoriesOptionsTitle")}</p>
          <h2 className="text-3xl font-semibold text-foreground">{t("home.categoriesOptionsSubtitle")}</h2>
        </div>
        <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="min-h-11 rounded-xl">
              <SelectValue placeholder={t("common.allCategories")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("common.allCategories")}</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.slug} value={category.slug}>
                  {category.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button className="min-h-11 rounded-xl" onClick={handleOpenRestaurants}>
            {t("home.ctaRestaurants")}
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
