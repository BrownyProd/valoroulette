import { Link, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useI18n } from "@/i18n/I18nProvider";
import LanguageSelector from "./LanguageSelector";

export default function Header() {
  const { t } = useI18n();
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/50">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="group inline-flex items-center gap-2">
          <div className="relative">
            <span className="absolute inset-0 -skew-x-6 rounded-sm bg-primary/30 blur-sm transition-opacity group-hover:opacity-80" />
            <span className="relative -skew-x-6 rounded-sm bg-primary px-2 py-1 text-xs font-bold uppercase tracking-widest text-primary-foreground">
              Valo
            </span>
          </div>
          <span className="text-lg font-extrabold tracking-tight">
            Roulette
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <NavItem to="/" label={t("nav.play")} />
          <NavItem to="/minigames" label={t("nav.minigames")} />
          <NavItem to="/how-it-works" label={t("nav.how")} />
        </nav>

        <div className="flex items-center gap-2">
          <Button
            asChild
            variant="secondary"
            size="sm"
            className="hidden sm:inline-flex"
          >
            <a href="#provably-fair">{t("btn.provably")}</a>
          </Button>
          <LanguageSelector />
        </div>
      </div>
    </header>
  );
}

function NavItem({ to, label }: { to: string; label: string }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "text-sm text-muted-foreground transition-colors hover:text-foreground",
          isActive && "text-foreground",
        )
      }
      end
    >
      {label}
    </NavLink>
  );
}
