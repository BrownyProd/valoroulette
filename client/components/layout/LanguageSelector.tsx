import { useI18n } from "@/i18n/I18nProvider";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

const ORDER: ("en" | "es" | "fr")[] = ["en", "es", "fr"];
const FLAG_SRC: Record<(typeof ORDER)[number], string> = {
  en: "./flags/gb.svg",
  es: "./flags/es.svg",
  fr: "./flags/fr.svg",
};

export default function LanguageSelector() {
  const { locale, setLocale, t } = useI18n();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="secondary"
          size="sm"
          aria-label={t("lang.label")}
          className="w-24 justify-between"
        >
          <img
            src={FLAG_SRC[locale]}
            alt=""
            className="mr-2 h-4 w-6 object-cover"
          />
          <span className="font-semibold">{t(`lang.${locale}`)}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-32">
        {ORDER.map((l) => (
          <DropdownMenuItem key={l} onClick={() => setLocale(l)}>
            <img
              src={FLAG_SRC[l]}
              alt=""
              className="mr-2 h-4 w-6 object-cover"
            />
            <span>{t(`lang.${l}`)}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
