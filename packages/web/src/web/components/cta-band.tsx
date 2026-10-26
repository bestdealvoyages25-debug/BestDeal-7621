import { Link } from "wouter";
import { Phone } from "lucide-react";
import { site, telHref } from "../lib/site";
import { useI18n } from "../lib/i18n";
import { Reveal } from "./ui/reveal";

export function CtaBand({ title, text }: { title?: string; text?: string }) {
  const { t } = useI18n();

  return (
    <section className="relative overflow-hidden bg-ink">
      <img
        src="/images/misc/cta-dunes.jpg"
        alt=""
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover opacity-45"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/45" />
      <div className="container-x relative py-20 lg:py-24">
        <Reveal className="max-w-2xl">
          <p className="label-gold">{t("cta.label")}</p>
          <h2 className="mt-5 font-display text-3xl leading-tight text-cream sm:text-4xl">
            {title ?? t("cta.title")}
          </h2>
          <p className="mt-5 text-[15px] leading-relaxed text-sand/75">{text ?? t("cta.text")}</p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link to="/contact" className="btn-gold">
              {t("cta.button")}
            </Link>
            <a
              href={telHref(site.contact.phone)}
              className="flex items-center gap-3 text-sand/80 transition-colors hover:text-gold-soft"
            >
              <span className="flex size-11 items-center justify-center border border-gold/40">
                <Phone className="size-4 text-gold" />
              </span>
              <span className="text-[15px]">
                {site.contact.phone}
                <span className="block text-[11px] uppercase tracking-[0.16em] text-sand/50">
                  {t("cta.hours")}
                </span>
              </span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
