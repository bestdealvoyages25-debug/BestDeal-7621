import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { Mail, Menu, Phone, X } from "lucide-react";
import { LanguageSwitcher } from "../language-switcher";
import { useI18n } from "../../lib/i18n";
import { site, telHref } from "../../lib/site";
import { cn } from "../../lib/utils";

export function TopBar() {
  const { t } = useI18n();

  return (
    <div className="hidden bg-night text-sand/80 lg:block">
      <div className="container-x flex h-10 items-center justify-between gap-8 text-[12px] tracking-wide">
        <p className="truncate whitespace-nowrap uppercase tracking-[0.18em] text-sand/60">
          {t("topbar.tagline")}
        </p>
        <div className="flex shrink-0 items-center gap-6">
          <a
            href={`mailto:${site.contact.email}`}
            className="flex shrink-0 items-center gap-2 whitespace-nowrap transition-colors hover:text-gold-soft"
          >
            <Mail className="size-3.5" />
            {site.contact.email}
          </a>
          <a
            href={telHref(site.contact.phone)}
            className="flex shrink-0 items-center gap-2 whitespace-nowrap transition-colors hover:text-gold-soft"
          >
            <Phone className="size-3.5" />
            {site.contact.phone}
          </a>
          <div className="hidden items-center gap-3 xl:flex">
            {site.socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="uppercase tracking-[0.14em] transition-colors hover:text-gold-soft"
              >
                {social.label}
              </a>
            ))}
          </div>
          <LanguageSwitcher />
        </div>
      </div>
    </div>
  );
}

export function Header() {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t } = useI18n();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location]);

  const isActive = (href: string) =>
    href === "/" ? location === "/" : location === href || location.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-50">
      <TopBar />
      <div
        className={cn(
          "border-b border-gold/15 bg-ink/95 backdrop-blur transition-all duration-300",
          scrolled ? "py-2" : "py-4",
        )}
      >
        <div className="container-x flex items-center justify-between gap-6">
          <Link to="/" className="flex items-center gap-3">
            <img
              src="/images/misc/logo-512.png"
              alt="Best Deal Voyages"
              className={cn(
                "w-auto transition-all duration-300",
                scrolled ? "h-12" : "h-16",
              )}
            />
            <span className="hidden flex-col leading-none sm:flex lg:hidden xl:flex">
              <span className="whitespace-nowrap font-display text-lg text-gold-soft">
                Best Deal Voyages
              </span>
              <span className="mt-1 whitespace-nowrap text-[10px] uppercase tracking-[0.3em] text-sand/50">
                {t("header.brandSub")}
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-6 lg:flex xl:gap-8">
            {site.nav.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "relative whitespace-nowrap py-2 text-[12px] uppercase tracking-[0.14em] transition-colors xl:tracking-[0.2em]",
                  isActive(item.href) ? "text-gold" : "text-sand/75 hover:text-gold-soft",
                )}
              >
                {t(item.key)}
                <span
                  className={cn(
                    "absolute -bottom-0.5 left-0 h-px w-full bg-gold transition-transform duration-300",
                    isActive(item.href) ? "scale-x-100" : "scale-x-0",
                  )}
                />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <a
              href={telHref(site.contact.phone)}
              className="hidden items-center gap-2 whitespace-nowrap text-[13px] text-sand/80 transition-colors hover:text-gold-soft 2xl:flex"
            >
              <Phone className="size-4 text-gold" />
              {site.contact.phone}
            </a>
            <Link to="/contact" className="btn-gold hidden whitespace-nowrap px-5 sm:inline-flex">
              {t("header.quote")}
            </Link>
            <LanguageSwitcher className="lg:hidden" />
            <button
              type="button"
              aria-label={t("header.openMenu")}
              onClick={() => setOpen(true)}
              className="text-gold-soft lg:hidden"
            >
              <Menu className="size-7" />
            </button>
          </div>
        </div>
      </div>

      {open ? (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-ink/98 lg:hidden">
          <div className="flex items-center justify-between border-b border-gold/15 px-5 py-4">
            <img src="/images/misc/logo-512.png" alt="" className="h-12 w-auto" />
            <button
              type="button"
              aria-label={t("header.closeMenu")}
              onClick={() => setOpen(false)}
            >
              <X className="size-7 text-gold-soft" />
            </button>
          </div>
          <nav className="flex flex-col px-5 py-8">
            {site.nav.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "border-b border-sand/10 py-4 font-display text-2xl",
                  isActive(item.href) ? "text-gold" : "text-cream",
                )}
              >
                {t(item.key)}
              </Link>
            ))}
            <Link to="/contact" className="btn-gold mt-8">
              {t("header.quoteLong")}
            </Link>
            <a
              href={telHref(site.contact.phone)}
              className="mt-4 flex items-center gap-2 text-sand/70"
            >
              <Phone className="size-4 text-gold" /> {site.contact.phone}
            </a>
            <LanguageSwitcher variant="list" />
          </nav>
        </div>
      ) : null}
    </header>
  );
}
