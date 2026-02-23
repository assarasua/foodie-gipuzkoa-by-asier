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
        <h1 className="editorial-title text-5xl sm:text-6xl">{t("home.title")}</h1>
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

      <section className="editorial-card space-y-4 p-6 sm:p-8">
        <div>
          <p className="editorial-kicker">{t("home.projectTitle")}</p>
          <h2 className="text-3xl font-semibold text-foreground">{t("home.projectSubtitle")}</h2>
        </div>
        <p className="max-w-3xl text-sm text-muted-foreground sm:text-base">{t("home.projectText")}</p>
      </section>

      <section className="editorial-card space-y-5 p-6 sm:p-8">
        <div>
          <p className="editorial-kicker">{t("home.useGuideTitle")}</p>
          <h2 className="text-3xl font-semibold text-foreground">{t("home.useGuideSubtitle")}</h2>
        </div>
        <p className="max-w-3xl text-sm text-muted-foreground sm:text-base">{t("home.useGuideIntro")}</p>
        <div className="grid gap-3 md:grid-cols-3">
          <Card className="border-border/60 bg-background/70 shadow-none">
            <CardContent className="space-y-2 p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">01</p>
              <p className="text-sm font-semibold text-foreground">{t("home.step1Title")}</p>
              <p className="text-sm text-muted-foreground">{t("home.step1Desc")}</p>
            </CardContent>
          </Card>
          <Card className="border-border/60 bg-background/70 shadow-none">
            <CardContent className="space-y-2 p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">02</p>
              <p className="text-sm font-semibold text-foreground">{t("home.step2Title")}</p>
              <p className="text-sm text-muted-foreground">{t("home.step2Desc")}</p>
            </CardContent>
          </Card>
          <Card className="border-border/60 bg-background/70 shadow-none">
            <CardContent className="space-y-2 p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">03</p>
              <p className="text-sm font-semibold text-foreground">{t("home.step3Title")}</p>
              <p className="text-sm text-muted-foreground">{t("home.step3Desc")}</p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Index;
