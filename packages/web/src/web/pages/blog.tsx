import { Link } from "wouter";
import { ArrowRight, CalendarDays, Clock } from "lucide-react";
import { CtaBand } from "../components/cta-band";
import { Reveal } from "../components/ui/reveal";
import { Section, SkeletonCard } from "../components/ui/section";
import { usePosts } from "../queries/content";
import { formatDate } from "../lib/format";
import { useI18n } from "../lib/i18n";

export default function BlogPage() {
  const { t, locale } = useI18n();
  const posts = usePosts();
  const [first, ...rest] = posts.data ?? [];

  return (
    <>
      <section className="relative overflow-hidden bg-ink py-20 lg:py-24">
        <img
          src="/images/blog/blog-1.jpg"
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
            <span className="text-gold">{t("blog.breadcrumb")}</span>
          </p>
          <h1 className="mt-6 max-w-3xl font-display text-4xl leading-tight text-cream sm:text-5xl">
            {t("blog.title")}
          </h1>
          <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-sand/75">
            {t("blog.subtitle")}
          </p>
        </div>
      </section>

      <Section tone="paper">
        {posts.isLoading ? (
          <div className="grid gap-8 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : first ? (
          <>
            <Reveal>
              <Link
                to={`/blog/${first.slug}`}
                className="group grid gap-8 border border-border bg-cream lg:grid-cols-2"
              >
                <div className="overflow-hidden">
                  <img
                    src={first.image}
                    alt={first.title}
                    className="h-full min-h-[320px] w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-col justify-center p-8 lg:p-12">
                  <p className="label-gold">{t("blog.featured")} · {first.category}</p>
                  <h2 className="mt-5 font-display text-3xl leading-tight">{first.title}</h2>
                  <p className="mt-5 text-[15px] leading-relaxed text-ink-soft">{first.excerpt}</p>
                  <div className="mt-6 flex items-center gap-5 text-[12px] uppercase tracking-[0.14em] text-clay">
                    <span className="flex items-center gap-2">
                      <CalendarDays className="size-3.5 text-gold" />
                      {formatDate(first.publishedAt, locale)}
                    </span>
                    <span className="flex items-center gap-2">
                      <Clock className="size-3.5 text-gold" />
                      {first.readMinutes} {t("blog.min")}
                    </span>
                  </div>
                  <span className="mt-8 inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.16em] text-gold">
                    {t("blog.read")}
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </Reveal>

            <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {rest.map((post, index) => (
                <Reveal key={post.slug} delay={index * 90}>
                  <article className="group flex h-full flex-col border border-border bg-white transition-colors hover:border-gold/60">
                    <Link to={`/blog/${post.slug}`} className="overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        loading="lazy"
                        className="h-52 w-full object-cover transition-transform duration-[900ms] group-hover:scale-105"
                      />
                    </Link>
                    <div className="flex flex-1 flex-col p-7">
                      <p className="text-[11px] uppercase tracking-[0.16em] text-gold">
                        {post.category}
                      </p>
                      <h3 className="mt-3 font-display text-xl leading-snug">
                        <Link to={`/blog/${post.slug}`} className="hover:text-gold">
                          {post.title}
                        </Link>
                      </h3>
                      <p className="mt-3 flex-1 text-[14px] leading-relaxed text-ink-soft">
                        {post.excerpt}
                      </p>
                      <p className="mt-6 flex items-center gap-2 text-[12px] text-clay">
                        <CalendarDays className="size-3.5 text-gold" />
                        {formatDate(post.publishedAt, locale)}
                      </p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </>
        ) : (
          <p className="text-ink-soft">{t("blog.none")}</p>
        )}
      </Section>

      <CtaBand />
    </>
  );
}
