import { Link } from "wouter";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { RequestForm } from "../components/request-form";
import { Reveal } from "../components/ui/reveal";
import { Section } from "../components/ui/section";
import { site, telHref } from "../lib/site";
import { useT } from "../lib/i18n";

export default function ContactPage() {
  const t = useT();
  const infos = [
    { icon: Phone, label: t("contact.info.phone"), value: site.contact.phone, href: telHref(site.contact.phone) },
    { icon: Phone, label: t("contact.info.mobile"), value: site.contact.phone2, href: telHref(site.contact.phone2) },
    { icon: Mail, label: t("contact.info.email"), value: site.contact.email, href: `mailto:${site.contact.email}` },
    { icon: MapPin, label: t("contact.info.agency"), value: t("site.address") },
    { icon: Clock, label: t("contact.info.hours"), value: t("site.hours") },
  ];

  return (
    <>
      <section className="relative overflow-hidden bg-ink py-20 lg:py-24">
        <img
          src="/images/hero/hero-timimoun.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/45" />
        <div className="container-x relative">
          <p className="flex items-center gap-2 text-[12px] uppercase tracking-[0.18em] text-sand/50">
            <Link to="/" className="hover:text-gold-soft">
              {t("nav.home")}
            </Link>
            <span>/</span>
            <span className="text-gold">{t("contact.breadcrumb")}</span>
          </p>
          <h1 className="mt-6 max-w-3xl font-display text-4xl leading-tight text-cream sm:text-5xl">
            {t("contact.title")}
          </h1>
          <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-sand/75">
            {t("contact.subtitle")}
          </p>
        </div>
      </section>

      <Section tone="paper">
        <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <Reveal>
            <p className="label-gold">{t("contact.info.label")}</p>
            <h2 className="mt-5 font-display text-3xl">{site.name}</h2>
            <ul className="mt-8 space-y-6">
              {infos.map((info) => (
                <li key={info.label} className="flex gap-4 border-b border-border pb-6 last:border-0">
                  <span className="flex size-11 shrink-0 items-center justify-center border border-gold/40 text-gold">
                    <info.icon className="size-4" />
                  </span>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.18em] text-ink-soft">
                      {info.label}
                    </p>
                    {info.href ? (
                      <a
                        href={info.href}
                        className="mt-1 block font-display text-[17px] transition-colors hover:text-gold"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="mt-1 font-display text-[17px] leading-snug">{info.value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-8 border border-border bg-cream p-6">
              <h3 className="font-display text-lg">{t("contact.fast.title")}</h3>
              <p className="mt-3 text-[14px] leading-relaxed text-ink-soft">
                {t("contact.fast.text")}
              </p>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="border border-border p-7 lg:p-10">
              <p className="label-gold">{t("contact.form.label")}</p>
              <h2 className="mt-4 font-display text-3xl">{t("contact.form.title")}</h2>
              <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">
                {t("contact.form.text")}
              </p>
              <RequestForm kind="devis" className="mt-8" />
            </div>
          </Reveal>
        </div>
      </Section>

      <section className="bg-cream py-16">
        <div className="container-x">
          <div className="grid gap-8 border border-border bg-white p-8 lg:grid-cols-3 lg:p-10">
            <div>
              <p className="label-gold">{t("contact.zones.label")}</p>
              <h3 className="mt-4 font-display text-2xl">{t("contact.zones.title")}</h3>
            </div>
            <div className="lg:col-span-2">
              <ul className="grid gap-3 text-[14px] text-ink-soft sm:grid-cols-2">
                {(
                  [
                    "contact.zones.z1",
                    "contact.zones.z2",
                    "contact.zones.z3",
                    "contact.zones.z4",
                    "contact.zones.z5",
                    "contact.zones.z6",
                  ] as const
                ).map((key) => t(key)).map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
