import { Link } from "wouter";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { LanguageSwitcher } from "../language-switcher";
import { useI18n } from "../../lib/i18n";
import { footerCircuits, site, telHref } from "../../lib/site";
import { useDestinations } from "../../queries/content";

export function Footer() {
  const destinations = useDestinations();
  const { t } = useI18n();

  return (
    <footer className="bg-ink text-sand/70">
      <div className="container-x grid gap-12 py-16 lg:grid-cols-4 lg:py-20">
        <div>
          <img src="/images/misc/logo-512.png" alt="Best Deal Voyages" className="h-20 w-auto" />
          <p className="mt-5 text-sm leading-relaxed">{t("site.intro")}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            {site.socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="border border-gold/30 px-3 py-1.5 text-[11px] uppercase tracking-[0.16em] text-gold-soft transition-colors hover:bg-gold hover:text-ink"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-display text-sm uppercase tracking-[0.22em] text-gold">
            {t("footer.address")}
          </h3>
          <ul className="mt-6 space-y-4 text-sm">
            <li className="flex gap-3">
              <MapPin className="mt-1 size-4 shrink-0 text-gold" />
              <span>{t("site.address")}</span>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-1 size-4 shrink-0 text-gold" />
              <a href={`mailto:${site.contact.email}`} className="hover:text-gold-soft">
                {site.contact.email}
              </a>
            </li>
            <li className="flex gap-3">
              <Phone className="mt-1 size-4 shrink-0 text-gold" />
              <span>
                <a href={telHref(site.contact.phone)} className="hover:text-gold-soft">
                  {site.contact.phone}
                </a>
                <br />
                <a href={telHref(site.contact.phone2)} className="hover:text-gold-soft">
                  {site.contact.phone2}
                </a>
              </span>
            </li>
            <li className="flex gap-3">
              <Clock className="mt-1 size-4 shrink-0 text-gold" />
              <span>{t("site.hours")}</span>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm uppercase tracking-[0.22em] text-gold">
            {t("footer.destinations")}
          </h3>
          <ul className="mt-6 space-y-3 text-sm">
            {destinations.isLoading
              ? [1, 2, 3, 4].map((i) => <li key={i} className="h-4 w-40 animate-pulse bg-sand/10" />)
              : destinations.data?.map((destination) => (
                  <li key={destination.slug}>
                    <Link
                      to={`/destinations#${destination.slug}`}
                      className="transition-colors hover:text-gold-soft"
                    >
                      {destination.name}
                    </Link>
                  </li>
                ))}
          </ul>
          <h3 className="mt-8 font-display text-sm uppercase tracking-[0.22em] text-gold">
            {t("footer.navigation")}
          </h3>
          <ul className="mt-6 space-y-3 text-sm">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link to={item.href} className="transition-colors hover:text-gold-soft">
                  {t(item.key)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm uppercase tracking-[0.22em] text-gold">
            {t("footer.ourCircuits")}
          </h3>
          <ul className="mt-6 space-y-3 text-sm">
            {footerCircuits.map((item) => (
              <li key={item.href}>
                <Link to={item.href} className="transition-colors hover:text-gold-soft">
                  {t(item.key)}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-xs leading-relaxed text-sand/50">{t("footer.legal")}</p>
        </div>
      </div>

      <div className="border-t border-sand/10">
        <div className="container-x flex flex-col items-center justify-between gap-4 py-6 text-xs text-sand/50 sm:flex-row">
          <p>© {new Date().getFullYear()} Best Deal Voyages — {t("footer.rights")}</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {["Visa", "Mastercard", "CIB"].map((label) => (
              <span
                key={label}
                className="border border-sand/15 px-2.5 py-1 text-[10px] uppercase tracking-[0.14em]"
              >
                {label}
              </span>
            ))}
            <span className="border border-sand/15 px-2.5 py-1 text-[10px] uppercase tracking-[0.14em]">
              {t("footer.transfer")}
            </span>
          </div>
          <LanguageSwitcher variant="footer" />
        </div>
      </div>
    </footer>
  );
}
