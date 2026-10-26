import { Phone } from "lucide-react";
import { site, telHref } from "../lib/site";
import { useI18n } from "../lib/i18n";

/** Bouton d'appel fixe — sur mobile, c'est le canal le plus utilisé par nos clients. */
export function WhatsAppButton() {
  const { t } = useI18n();

  return (
    <a
      href={telHref(site.contact.phone)}
      className="fixed bottom-5 right-5 z-40 flex items-center gap-2 bg-gold px-4 py-3 text-[12px] font-medium uppercase tracking-[0.14em] text-ink shadow-lg shadow-ink/20 transition-colors hover:bg-gold-soft"
      aria-label={t("call.aria")}
    >
      <Phone className="size-4" />
      <span className="hidden sm:inline">{t("call.label")}</span>
    </a>
  );
}
