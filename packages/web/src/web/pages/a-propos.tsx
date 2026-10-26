import { Link } from "wouter";
import { BadgeCheck, Compass, HeartHandshake, Leaf, MapPin, ShieldCheck, Tent, Users } from "lucide-react";
import { CtaBand } from "../components/cta-band";
import { Reveal } from "../components/ui/reveal";
import { Section, SectionHeading } from "../components/ui/section";
import { useCircuitStats } from "../queries/circuits";
import { useT } from "../lib/i18n";

const values = [
  { icon: Compass, key: "about.v1" },
  { icon: Users, key: "about.v2" },
  { icon: ShieldCheck, key: "about.v3" },
  { icon: Leaf, key: "about.v4" },
  { icon: HeartHandshake, key: "about.v5" },
  { icon: BadgeCheck, key: "about.v6" },
] as const;

export default function AboutPage() {
  const t = useT();
  const stats = useCircuitStats();

  return (
    <>
      <section className="relative overflow-hidden bg-ink">
        <img
          src="/images/misc/about-agence.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/45" />
        <div className="container-x relative py-24 lg:py-32">
          <p className="flex items-center gap-2 text-[12px] uppercase tracking-[0.18em] text-sand/50">
            <Link to="/" className="hover:text-gold-soft">
              {t("nav.home")}
            </Link>
            <span>/</span>
            <span className="text-gold">{t("about.breadcrumb")}</span>
          </p>
          <h1 className="mt-6 max-w-3xl font-display text-4xl leading-tight text-cream sm:text-5xl">
            {t("about.title")}
          </h1>
          <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-sand/75">{t("site.intro")}</p>
        </div>
      </section>

      <Section tone="paper">
        <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <Reveal>
            <p className="label-gold">{t("about.history.label")}</p>
            <h2 className="mt-5 font-display text-3xl leading-tight lg:text-4xl">
              {t("about.history.title")}
            </h2>
            <div className="mt-7 space-y-5 text-[15px] leading-relaxed text-ink-soft">
              <p>{t("about.p1")}</p>
              <p>{t("about.p2")}</p>
              <p>{t("about.p3")}</p>
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              {[
                { value: stats.data?.circuits ?? "12", label: t("about.stat.circuits") },
                { value: stats.data?.destinations ?? "5", label: t("about.stat.regions") },
                { value: "24 h", label: t("about.stat.response") },
              ].map((item) => (
                <div key={item.label} className="border border-border bg-cream px-5 py-6">
                  <p className="font-display text-3xl text-gold">{item.value}</p>
                  <p className="mt-2 text-[11px] uppercase tracking-[0.16em] text-ink-soft">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={140}>
            <img
              src="/images/misc/about-agence.jpg"
              alt={t("about.title")}
              loading="lazy"
              className="h-full min-h-[420px] w-full object-cover"
            />
            <div className="mt-6 border border-border bg-cream p-6">
              <h3 className="font-display text-lg">{t("about.agency")}</h3>
              <ul className="mt-4 space-y-3 text-[14px] text-ink-soft">
                <li className="flex gap-3">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-gold" />
                  {t("site.address")}
                </li>
                <li className="flex gap-3">
                  <Tent className="mt-0.5 size-4 shrink-0 text-gold" />
                  {t("about.departures")}
                </li>
              </ul>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section tone="cream">
        <SectionHeading
          label={t("about.values.label")}
          title={t("about.values.title")}
          subtitle={t("about.values.subtitle")}
        />
        <div className="mt-16 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((value, index) => (
            <Reveal key={value.key} delay={index * 80}>
              <div className="flex gap-5">
                <span className="flex size-12 shrink-0 items-center justify-center border border-gold/40 text-gold">
                  <value.icon className="size-5" />
                </span>
                <div>
                  <h3 className="font-display text-xl">{t(`${value.key}.title`)}</h3>
                  <p className="mt-3 text-[14px] leading-relaxed text-ink-soft">{t(`${value.key}.text`)}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <CtaBand
        title={t("about.ctaTitle")}
        text={t("about.ctaText")}
      />
    </>
  );
}
