import { Compass, Filter, MapPinned, Sparkles, UtensilsCrossed } from "lucide-react";
import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { LanguageToggle } from "@/components/LanguageToggle";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/contexts/TranslationContext";

const MAP_FALLBACK = "https://maps.google.com/?q=Donostia";

export const AppShell = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const { t } = useTranslation();

  const navItems = [
    { label: t("nav.home"), to: "/" },
    { label: t("nav.categories"), to: "/#categories" },
    { label: t("nav.talents"), to: "/jovenes-talentos" }
  ];

  const mobileActions = [
    { label: t("nav.explore"), icon: Compass, to: "/" },
    { label: t("nav.filters"), icon: Filter, to: "/#categories" },
    { label: t("nav.map"), icon: MapPinned, href: MAP_FALLBACK },
    { label: t("nav.categories"), icon: UtensilsCrossed, to: "/#categories" }
  ];

  const isActive = (target: string) => {
    if (target === "/") return location.pathname === "/";
    if (target === "/jovenes-talentos") return location.pathname === "/jovenes-talentos";
    if (target === "/#categories") return location.pathname === "/";
    return false;
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/95 backdrop-blur-xl">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <Link to="/" className="inline-flex items-center gap-3">
            <div className="rounded-xl bg-primary/10 p-2 text-primary">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.24em] text-muted-foreground">{t("brand.region")}</p>
              <p className="text-sm font-semibold text-foreground sm:text-base">{t("brand.name")}</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-7 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className={cn(
                  "text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
                  isActive(item.to) && "text-foreground"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <a
              href={MAP_FALLBACK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-primary px-3.5 text-sm font-semibold text-primary-foreground transition hover:brightness-95"
            >
              <MapPinned className="h-4 w-4" />
              {t("common.openMap")}
            </a>
            <LanguageToggle />
          </div>

          <div className="md:hidden">
            <LanguageToggle />
          </div>
        </div>
      </header>

      <main className="pb-24 md:pb-0">{children}</main>

      <nav className="fixed inset-x-4 bottom-4 z-40 rounded-2xl border border-border/70 bg-background/95 p-2 shadow-lg backdrop-blur-xl md:hidden">
        <ul className="grid grid-cols-4 gap-1">
          {mobileActions.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.label}>
                {"href" in item ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-12 flex-col items-center justify-center rounded-xl px-1 py-1 text-[11px] font-medium text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground"
                    aria-label={item.label}
                  >
                    <Icon className="mb-1 h-4 w-4" />
                    {item.label}
                  </a>
                ) : (
                  <Link
                    to={item.to}
                    className={cn(
                      "flex min-h-12 flex-col items-center justify-center rounded-xl px-1 py-1 text-[11px] font-medium text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground",
                      isActive(item.to) && "text-foreground"
                    )}
                    aria-label={item.label}
                  >
                    <Icon className="mb-1 h-4 w-4" />
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};
