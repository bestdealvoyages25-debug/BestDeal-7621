import { LANGS, LANG_LABELS, useI18n, type Lang } from "../lib/i18n";
import { cn } from "../lib/utils";

/**
 * Sélecteur de langue — `bar` (barre supérieure, pastilles FR/EN/ES/DE),
 * `list` (menu mobile, lignes pleine largeur) ou `footer` (pastilles bordées).
 */
export function LanguageSwitcher({
  variant = "bar",
  className,
}: {
  variant?: "bar" | "list" | "footer";
  className?: string;
}) {
  const { lang, setLang, t } = useI18n();

  if (variant === "list") {
    return (
      <div className={cn("mt-8 border-t border-sand/10 pt-6", className)}>
        <p className="mb-4 text-[11px] uppercase tracking-[0.18em] text-sand/50">{t("lang.label")}</p>
        <div className="flex flex-wrap gap-3">
          {LANGS.map((code: Lang) => (
            <button
              key={code}
              type="button"
              onClick={() => setLang(code)}
              aria-pressed={code === lang}
              className={cn(
                "border px-4 py-2 text-[12px] uppercase tracking-[0.14em] transition-colors",
                code === lang
                  ? "border-gold bg-gold text-ink"
                  : "border-sand/25 text-sand/70 hover:border-gold hover:text-gold",
              )}
            >
              {LANG_LABELS[code].name}
            </button>
          ))}
        </div>
      </div>
    );
  }

  const outlined = variant === "footer";

  return (
    <div className={cn("flex items-center gap-2", className)} aria-label={t("lang.label")}>
      {LANGS.map((code: Lang) => (
        <button
          key={code}
          type="button"
          onClick={() => setLang(code)}
          aria-pressed={code === lang}
          title={LANG_LABELS[code].name}
          className={cn(
            "text-[11px] uppercase tracking-[0.16em] transition-colors",
            outlined && "border px-2.5 py-1",
            code === lang
              ? outlined
                ? "border-gold bg-gold text-ink"
                : "text-gold"
              : outlined
                ? "border-sand/25 text-sand/60 hover:border-gold hover:text-gold"
                : "text-sand/60 hover:text-gold-soft",
          )}
        >
          {LANG_LABELS[code].short}
        </button>
      ))}
    </div>
  );
}
