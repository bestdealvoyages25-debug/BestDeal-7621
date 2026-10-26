import { Link } from "wouter";
import {
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  Compass,
  Leaf,
  ShieldCheck,
  Tent,
  Users,
} from "lucide-react";
import { HeroSlider } from "../components/hero-slider";
import { SearchBar } from "../components/search-bar";
import { CircuitCard } from "../components/circuit-card";
import { CtaBand } from "../components/cta-band";
import { Reveal } from "../components/ui/reveal";
import { Section, SectionHeading, SkeletonCard } from "../components/ui/section";
import { useFeaturedCircuits, useCircuitStats } from "../queries/circuits";
import { useDestinations, usePosts } from "../queries/content";
import { featureKeys, typeTiles } from "../lib/site";
import { formatDate } from "../lib/format";
import { useI18n } from "../lib/i18n";

const featureIcons = [Tent, Compass, Users, ShieldCheck, Leaf, BadgeCheck];

function Home() {
  const { t, locale } = useI18n();
  const featured = useFeaturedCircuits();
  const stats = useCircuitStats();
  const destinations = useDestinations();
  const posts = usePosts();

  const featuredList = (featured.data ?? []).slice(0, 6);

  return (
    <>
      <HeroSlider />
      <SearchBar />

      {/* Pourquoi nous choisir */}
      <Section tone="paper" className="pt-28">
        <SectionHeading
          label={t("home.why.label")}
          title={t("home.why.title")}
          subtitle={t("home.why.subtitle")}
        />
        <div className="mt-16 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {featureKeys.map((key, index) => {
            const Icon = featureIcons[index] ?? Tent;
            return (
              <Reveal key={key} delay={index * 90}>
                <div className="flex gap-5">
                  <span className="flex size-12 shrink-0 items-center justify-center border border-gold/40 text-gold">
                    <Icon className="size-5" />
                  </span>
                  <div>
                    <h3 className="font-display text-xl">{t(`${key}.title`)}</h3>
                    <p className="mt-3 text-[14px] leading-relaxed text-ink-soft">
                      {t(`${key}.text`)}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={200}>
          <div className="mt-16 grid divide-y divide-border border border-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {[
              { value: stats.data ? `${stats.data.circuits}` : "—", label: t("stats.circuits") },
              { value: stats.data ? `${stats.data.destinations}` : "—", label: t("stats.regions") },
              { value: stats.data ? `${stats.data.days}` : "—", label: t("stats.days") },
            ].map((item) => (
              <div key={item.label} className="px-6 py-8 text-center">
                <p className="font-display text-4xl text-gold">{item.value}</p>
                <p className="mt-2 text-[11px] uppercase tracking-[0.18em] text-ink-soft">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </Section>

      {/* Forfaits vedette */}
      <Section tone="cream">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            align="left"
            label={t("home.featured.label")}
            title={t("home.featured.title")}
            subtitle={t("home.featured.subtitle")}
            className="lg:max-w-2xl"
          />
          <Reveal delay={120}>
            <Link to="/circuits" className="btn-ghost-gold border-gold text-gold hover:text-ink">
              {t("home.featured.cta")}
              <ArrowRight className="size-4" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featured.isLoading
            ? [1, 2, 3].map((i) => <SkeletonCard key={i} />)
            : featuredList.map((circuit, index) => (
                <Reveal key={circuit.slug} delay={index * 90}>
                  <CircuitCard circuit={circuit} />
                </Reveal>
              ))}
        </div>
      </Section>

      {/* Destinations */}
      <Section tone="paper">
        <SectionHeading
          label={t("home.dest.label")}
          title={t("home.dest.title")}
          subtitle={t("home.dest.subtitle")}
        />
        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {destinations.isLoading ? (
            [1, 2, 3, 4].map((i) => <SkeletonCard key={i} />)
          ) : (
            (destinations.data ?? []).map((destination, index) => (
              <Reveal key={destination.slug} delay={index * 90}>
                <Link
                  to={`/destinations#${destination.slug}`}
                  className="group relative block h-[420px] overflow-hidden"
                >
                  <img
                    src={destination.image}
                    alt={destination.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-8">
                    <p className="label-gold">{destination.season}</p>
                    <h3 className="mt-4 font-display text-2xl text-cream lg:text-3xl">
                      {destination.name}
                    </h3>
                    <p className="mt-3 max-w-md text-[14px] leading-relaxed text-sand/75">
                      {destination.tagline}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-gold">
                      {t("home.discover")}
                      <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))
          )}
        </div>
      </Section>

      {/* Types de séjour */}
      <section className="relative overflow-hidden bg-ink py-20 lg:py-28">
        <div className="container-x">
          <SectionHeading
            tone="dark"
            label={t("home.types.label")}
            title={t("home.types.title")}
            subtitle={t("home.types.subtitle")}
          />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {typeTiles.map((tile, index) => (
              <Reveal key={tile.key} delay={index * 100}>
                <Link
                  to={`/circuits?type=${encodeURIComponent(tile.type)}`}
                  className="group relative block h-[320px] overflow-hidden border border-sand/10"
                >
                  <img
                    src={tile.image}
                    alt={t(`${tile.key}.label`)}
                    loading="lazy"
                    className="h-full w-full object-cover opacity-70 transition-all duration-700 group-hover:scale-105 group-hover:opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-7 text-center">
                    <Compass className="mx-auto size-6 text-gold" />
                    <h3 className="mt-4 font-display text-xl text-cream">{t(`${tile.key}.label`)}</h3>
                    <p className="mt-2 text-[13px] text-sand/70">{t(`${tile.key}.text`)}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Blog */}
      <Section tone="paper">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            align="left"
            label={t("home.blog.label")}
            title={t("home.blog.title")}
            subtitle={t("home.blog.subtitle")}
            className="lg:max-w-2xl"
          />
          <Reveal delay={120}>
            <Link to="/blog" className="btn-ghost-gold border-gold text-gold hover:text-ink">
              {t("home.blog.cta")}
              <ArrowRight className="size-4" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {posts.isLoading
            ? [1, 2, 3].map((i) => <SkeletonCard key={i} />)
            : (posts.data ?? []).slice(0, 3).map((post, index) => (
                <Reveal key={post.slug} delay={index * 90}>
                  <article className="group flex h-full flex-col border border-border bg-white transition-colors hover:border-gold/60">
                    <Link to={`/blog/${post.slug}`} className="block overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        loading="lazy"
                        className="h-48 w-full object-cover transition-transform duration-[900ms] group-hover:scale-105"
                      />
                    </Link>
                    <div className="flex flex-1 flex-col p-6">
                      <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.16em] text-ink-soft">
                        <span className="text-gold">{post.category}</span>
                        <span className="h-1 w-1 rounded-full bg-gold" />
                        <span>{post.readMinutes} {t("blog.min")}</span>
                      </div>
                      <h3 className="mt-3 font-display text-xl leading-snug">
                        <Link to={`/blog/${post.slug}`} className="hover:text-gold">
                          {post.title}
                        </Link>
                      </h3>
                      <p className="mt-3 line-clamp-3 flex-1 text-[14px] leading-relaxed text-ink-soft">
                        {post.excerpt}
                      </p>
                      <p className="mt-5 flex items-center gap-2 text-[12px] text-clay">
                        <CalendarDays className="size-3.5 text-gold" />
                        {formatDate(post.publishedAt, locale)}
                      </p>
                    </div>
                  </article>
                </Reveal>
              ))}
        </div>
      </Section>

      <CtaBand />
    </>
  );
}

export default Home;
