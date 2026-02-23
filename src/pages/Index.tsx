import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "@/contexts/TranslationContext";

const Index = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="mx-auto max-w-5xl space-y-8 px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
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
            <p className="text-sm font-semibold text-foreground">{t("home.role1Title")}</p>
            <p className="text-sm text-muted-foreground">{t("home.role1Desc")}</p>
          </CardContent>
        </Card>
        <Card className="editorial-card">
          <CardContent className="space-y-2 p-5">
            <p className="text-sm font-semibold text-foreground">{t("home.role2Title")}</p>
            <p className="text-sm text-muted-foreground">{t("home.role2Desc")}</p>
          </CardContent>
        </Card>
        <Card className="editorial-card">
          <CardContent className="space-y-2 p-5">
            <p className="text-sm font-semibold text-foreground">{t("home.role3Title")}</p>
            <p className="text-sm text-muted-foreground">{t("home.role3Desc")}</p>
          </CardContent>
        </Card>
      </section>

      <section className="editorial-card space-y-4 p-6">
        <div>
          <p className="editorial-kicker">{t("home.projectTitle")}</p>
          <h2 className="text-3xl font-semibold text-foreground">{t("home.projectSubtitle")}</h2>
        </div>
        <p className="text-sm text-muted-foreground sm:text-base">{t("home.projectText")}</p>
      </section>

      <section className="editorial-card space-y-4 p-6">
        <div>
          <p className="editorial-kicker">{t("home.trajectoryTitle")}</p>
          <h2 className="text-3xl font-semibold text-foreground">{t("home.trajectorySubtitle")}</h2>
        </div>
        <p className="text-sm text-muted-foreground sm:text-base">{t("home.trajectoryText")}</p>
      </section>
    </div>
  );
};

export default Index;
