import { ArrowRight, Compass, MapPinned, NotebookPen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "@/contexts/TranslationContext";

const Index = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <section className="editorial-card space-y-6 p-6 sm:p-8 lg:p-10">
        <p className="editorial-kicker">{t("home.kicker")}</p>
        <div className="flex items-start justify-between gap-6">
          <h1 className="editorial-title text-5xl sm:text-6xl">{t("home.title")}</h1>
          <img
            src="/images/gipuzkoafoodie.png"
            alt="Foodie logo"
            className="h-24 w-24 flex-shrink-0 rounded-2xl object-cover shadow-elegant sm:h-28 sm:w-28"
          />
        </div>
        <p className="max-w-3xl text-base text-muted-foreground sm:text-lg">{t("home.subtitle")}</p>
        <div className="grid gap-3 sm:grid-cols-2">
          <p className="rounded-2xl border border-border/60 bg-background/70 p-4 text-sm text-muted-foreground">
            {t("home.manifestoBody1")}
          </p>
          <p className="rounded-2xl border border-border/60 bg-background/70 p-4 text-sm text-muted-foreground">
            {t("home.manifestoBody2")}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button className="min-h-11 rounded-xl" onClick={() => navigate("/restaurants")}>
            {t("home.ctaRestaurants")}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <Card className="editorial-card">
          <CardContent className="space-y-2 p-5">
            <Compass className="h-5 w-5 text-primary" />
            <p className="text-sm font-semibold text-foreground">{t("home.role1Title")}</p>
            <p className="text-sm text-muted-foreground">{t("home.role1Desc")}</p>
          </CardContent>
        </Card>
        <Card className="editorial-card">
          <CardContent className="space-y-2 p-5">
            <NotebookPen className="h-5 w-5 text-primary" />
            <p className="text-sm font-semibold text-foreground">{t("home.role2Title")}</p>
            <p className="text-sm text-muted-foreground">{t("home.role2Desc")}</p>
          </CardContent>
        </Card>
        <Card className="editorial-card">
          <CardContent className="space-y-2 p-5">
            <MapPinned className="h-5 w-5 text-primary" />
            <p className="text-sm font-semibold text-foreground">{t("home.role3Title")}</p>
            <p className="text-sm text-muted-foreground">{t("home.role3Desc")}</p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default Index;
