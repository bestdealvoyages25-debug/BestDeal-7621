import { Link } from "wouter";
import { ArrowRight, CalendarDays, Compass } from "lucide-react";
import { CtaBand } from "../components/cta-band";
import { CircuitCard } from "../components/circuit-card";
import { Reveal } from "../components/ui/reveal";
import { Loader, Section, SkeletonCard } from "../components/ui/section";
import { useCircuits } from "../queries/circuits";
import { useDestinations } from "../queries/content";
import { cn } from "../lib/utils";
import { useT } from "../lib/i18n";

export default function DestinationsPage() {
  const t = useT();
  const destinations = useDestinations();
  const circuits = useCircuits();

  return (
    <>
      <section className="relative overflow-hidden bg-ink py-20 lg:py-24">
        <img
          src="/images/destinations/ghardaia.jpg"
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
            <span className="text-gold">{t("dest.breadcrumb")}</span>
          </p>
          <h1 className="mt-6 max-w-3xl font-display text-4xl leading-tight text-cream sm:text-5xl">
            {t("dest.title")}
          </h1>
          <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-sand/75">
            {t("dest.subtitle")}
          </p>
        </div>
      </section>

      <Section tone="paper">
        {destinations.isLoading ? (
          <Loader />
        ) : (
          <div className="space-y-20 lg:space-y-28">
            {(destinations.data ?? []).map((destination, index) => {
              const linked = (circuits.data ?? []).filter(
                (circuit) => circuit.destination === destination.slug,
              );
              return (
                <div
                  key={destination.slug}
                  id={destination.slug}
                  className="scroll-mt-32 grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
                >
                  <Reveal className={cn(index % 2 === 1 && "lg:order-2")}>
                    <div className="relative">
                      <img
                        src={destination.image}
                        alt={destination.name}
                        loading="lazy"
                        className="h-[420px] w-full object-cover"
                      />
                      <span className="absolute bottom-0 left-0 bg-ink/90 px-5 py-3 text-[11px] uppercase tracking-[0.18em] text-gold-soft">
                        {destination.bestFor}
                      </span>
                    </div>
                  </Reveal>
                  <Reveal delay={120} className={cn(index % 2 === 1 && "lg:order-1")}>
                    <p className="label-gold">
                      {t("dest.index")} 0{index + 1} · {destination.season}
                    </p>
                    <h2 className="mt-5 font-display text-3xl leading-tight lg:text-4xl">
                      {destination.name}
                    </h2>
                    <p className="mt-4 text-[15px] text-gold">{destination.tagline}</p>
                    <p className="mt-5 text-[15px] leading-relaxed text-ink-soft">
                      {destination.description}
                    </p>
                    <div className="mt-7 flex flex-wrap gap-6 text-[12px] uppercase tracking-[0.14em] text-ink-soft">
                      <span className="flex items-center gap-2">
                        <CalendarDays className="size-4 text-gold" />
                        {destination.season}
                      </span>
                      <span className="flex items-center gap-2">
                        <Compass className="size-4 text-gold" />
                        {linked.length > 1
                          ? t("dest.availableMany", { n: linked.length })
                          : t("dest.availableOne")}
                      </span>
                    </div>
                    <Link
                      to={`/circuits?destination=${destination.slug}`}
                      className="btn-ghost-gold mt-8 border-gold text-gold hover:text-ink"
                    >
                      {t("dest.see", { name: destination.name.split(" — ")[0] ?? destination.name })}
                      <ArrowRight className="size-4" />
                    </Link>
                  </Reveal>
                </div>
              );
            })}
          </div>
        )}
      </Section>

      <Section tone="cream">
        <h2 className="font-display text-3xl">{t("dest.allTitle")}</h2>
        <p className="mt-4 max-w-2xl text-[15px] text-ink-soft">
          {t("dest.allText")}
        </p>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {circuits.isLoading
            ? [1, 2, 3].map((i) => <SkeletonCard key={i} />)
            : (circuits.data ?? []).slice(0, 6).map((circuit, index) => (
                <Reveal key={circuit.slug} delay={(index % 3) * 80}>
                  <CircuitCard circuit={circuit} />
                </Reveal>
              ))}
        </div>
      </Section>

      <CtaBand
        title={t("dest.ctaTitle")}
        text={t("dest.ctaText")}
      />
    </>
  );
}
