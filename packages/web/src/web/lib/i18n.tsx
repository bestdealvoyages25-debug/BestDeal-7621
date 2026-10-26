import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { fr, type Dict } from "../locales/fr";
import { en } from "../locales/en";
import { es } from "../locales/es";
import { de } from "../locales/de";

export const LANGS = ["fr", "en", "es", "de"] as const;
export type Lang = (typeof LANGS)[number];

export const LANG_LABELS: Record<Lang, { short: string; name: string; flag: string }> = {
  fr: { short: "FR", name: "Français", flag: "🇫🇷" },
  en: { short: "EN", name: "English", flag: "🇬🇧" },
  es: { short: "ES", name: "Español", flag: "🇪🇸" },
  de: { short: "DE", name: "Deutsch", flag: "🇩🇪" },
};

const dicts: Record<Lang, Dict> = { fr, en, es, de };

const STORAGE_KEY = "bdv.lang";

function isLang(value: unknown): value is Lang {
  return typeof value === "string" && (LANGS as readonly string[]).includes(value);
}

/** Langue initiale : ?lang= > localStorage > français (langue par défaut du site). */
export function detectLang(): Lang {
  if (typeof window === "undefined") return "fr";
  const fromUrl = new URLSearchParams(window.location.search).get("lang");
  if (isLang(fromUrl)) return fromUrl;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (isLang(stored)) return stored;
  } catch {
    /* localStorage indisponible */
  }
  return "fr";
}

type TFunction = (key: keyof Dict, vars?: Record<string, string | number>) => string;

interface I18nValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: TFunction;
  /** Traduit une valeur catégorielle venue de la base (type, niveau). */
  tc: (prefix: string, value: string) => string;
  /** « 7-8 jours » → « 7-8 days » */
  tDuration: (value: string) => string;
  /** « Oct - Nov - Déc » → « Oct - Nov - Dec » */
  tMonths: (value: string) => string;
  /** « 6 à 12 personnes » — conservé tel quel, traduit côté contenu. */
  locale: string;
}

/** Abréviations françaises stockées en base → suffixe de clé `mo.*`. */
const frMonths: Record<string, string> = {
  fev: "feb",
  avr: "apr",
  mai: "may",
  juin: "jun",
  juil: "jul",
  aout: "aug",
};

const I18nContext = createContext<I18nValue | null>(null);

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "")
    .trim();
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => detectLang());

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* ignore */
    }
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      if (next === "fr") url.searchParams.delete("lang");
      else url.searchParams.set("lang", next);
      window.history.replaceState({}, "", url.toString());
    }
  }, []);

  const t = useCallback<TFunction>(
    (key, vars) => {
      const raw = dicts[lang][key] ?? fr[key] ?? String(key);
      if (!vars) return raw;
      return raw.replace(/\{(\w+)\}/g, (match, name: string) =>
        vars[name] !== undefined ? String(vars[name]) : match,
      );
    },
    [lang],
  );

  const tc = useCallback(
    (prefix: string, value: string) => {
      const key = `${prefix}.${slugify(value)}` as keyof Dict;
      return dicts[lang][key] ?? fr[key] ?? value;
    },
    [lang],
  );

  const tDuration = useCallback(
    (value: string) => {
      const match = value.match(/^(\d+)\s*-\s*(\d+)\s*(.*)$/);
      if (!match) return value;
      return `${match[1]}–${match[2]} ${t("unit.days")}`;
    },
    [t],
  );

  const tMonths = useCallback(
    (value: string) => {
      return value
        .split(" - ")
        .map((token) => {
          const slug = slugify(token);
          const key = `mo.${frMonths[slug] ?? slug}` as keyof Dict;
          return dicts[lang][key] ?? token;
        })
        .join(" · ");
    },
    [lang],
  );

  const value = useMemo<I18nValue>(
    () => ({
      lang,
      setLang,
      t,
      tc,
      tDuration,
      tMonths,
      locale: lang === "fr" ? "fr-FR" : lang === "en" ? "en-GB" : lang === "es" ? "es-ES" : "de-DE",
    }),
    [lang, setLang, t, tc, tDuration, tMonths],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) throw new Error("useI18n doit être utilisé dans <I18nProvider>");
  return context;
}

export function useT() {
  return useI18n().t;
}
