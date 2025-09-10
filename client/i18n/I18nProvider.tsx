import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { DICT, type Locale, fallbackLocale } from "./dictionary";

type I18nCtx = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
};

const Ctx = createContext<I18nCtx | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    const saved = localStorage.getItem("locale") as Locale | null;
    return saved && (saved === "en" || saved === "es" || saved === "fr")
      ? saved
      : "en";
  });

  useEffect(() => {
    try {
      localStorage.setItem("locale", locale);
    } catch {}
  }, [locale]);

  const setLocale = (l: Locale) => setLocaleState(l);

  const t = (key: string, params?: Record<string, string | number>) => {
    const dict = DICT[locale] ?? DICT[fallbackLocale];
    const base = dict[key] ?? DICT[fallbackLocale][key] ?? key;
    if (!params) return base;
    return base.replace(/\{(\w+)\}/g, (_, k) => String(params[k] ?? ""));
  };

  const value = useMemo(() => ({ locale, setLocale, t }), [locale]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useI18n() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
