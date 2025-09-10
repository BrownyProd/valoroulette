import { useI18n } from "@/i18n/I18nProvider";

export default function Footer() {
  const { t } = useI18n();
  return (
    <footer className="border-t">
      <div className="container flex flex-col items-center justify-between gap-4 py-8 text-sm text-muted-foreground md:flex-row">
        <p>
          © {new Date().getFullYear()} Valoroulette. Not affiliated with Riot
          Games.
        </p>
        <div className="flex items-center gap-6">
          <a href="#provably-fair" className="hover:text-foreground">
            {t("footer.provably")}
          </a>
          <a href="#terms" className="hover:text-foreground">
            {t("footer.terms")}
          </a>
          <a href="#privacy" className="hover:text-foreground">
            {t("footer.privacy")}
          </a>
        </div>
      </div>
    </footer>
  );
}
