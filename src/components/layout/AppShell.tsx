import { Compass, UtensilsCrossed } from "lucide-react";
import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { LanguageToggle } from "@/components/LanguageToggle";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/contexts/TranslationContext";

export const AppShell = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const { t } = useTranslation();

  const navItems = [
    { label: t("nav.home"), to: "/" },
    { label: t("nav.categories"), to: "/restaurants" },
    { label: t("nav.talents"), to: "/jovenes-talentos" }
  ];

  const mobileNavItems = [
    { label: t("nav.home"), icon: Compass, to: "/" },
    { label: t("nav.categories"), icon: UtensilsCrossed, to: "/restaurants" },
    { label: t("nav.talents"), icon: Compass, to: "/jovenes-talentos" }
  ];

  const isActive = (target: string) => {
    if (target === "/") return location.pathname === "/";
    if (target === "/jovenes-talentos") return location.pathname === "/jovenes-talentos";
    if (target === "/restaurants") return location.pathname === "/restaurants" || location.pathname.startsWith("/category/");
    return false;
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/95 backdrop-blur-xl">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <Link to="/" className="inline-flex items-center gap-3">
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
            <LanguageToggle />
          </div>

          <div className="md:hidden">
            <LanguageToggle />
          </div>
        </div>

        <nav className="mx-auto w-full max-w-7xl border-t border-border/60 px-2 py-2 md:hidden">
          <ul className="grid grid-cols-3 gap-2">
            {mobileNavItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    className={cn(
                      "flex min-h-11 items-center justify-center gap-1.5 rounded-xl px-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground",
                      isActive(item.to) && "bg-muted/70 text-foreground"
                    )}
                    aria-label={item.label}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    <span className="truncate">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </header>

      <main>{children}</main>
    </div>
  );
};
