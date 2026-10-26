import { Link, useParams } from "wouter";
import { ArrowLeft, CalendarDays, Clock, User } from "lucide-react";
import { CtaBand } from "../components/cta-band";
import { Loader, Section } from "../components/ui/section";
import { usePost, usePosts } from "../queries/content";
import { formatDate } from "../lib/format";
import { useI18n } from "../lib/i18n";

export default function BlogPostPage() {
  const { t, locale } = useI18n();
  const { slug } = useParams<{ slug: string }>();
  const post = usePost(slug ?? "");
  const posts = usePosts();

  if (post.isLoading) return <Loader label={t("blog.loading")} />;

  if (post.isError || !post.data) {
    return (
      <Section tone="paper" className="py-32 text-center">
        <h1 className="font-display text-3xl">{t("blog.notFound")}</h1>
        <Link to="/blog" className="btn-gold mt-8">
          {t("blog.back")}
        </Link>
      </Section>
    );
  }

  const data = post.data;
  const others = (posts.data ?? []).filter((item) => item.slug !== data.slug).slice(0, 3);

  return (
    <>
      <section className="relative overflow-hidden bg-ink">
        <img src={data.image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-45" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/80 to-ink/40" />
        <div className="container-x relative flex min-h-[52vh] flex-col justify-end pb-14 pt-32">
          <p className="flex items-center gap-2 text-[12px] uppercase tracking-[0.16em] text-sand/50">
            <Link to="/" className="hover:text-gold-soft">
              {t("nav.home")}
            </Link>
            <span>/</span>
            <Link to="/blog" className="hover:text-gold-soft">
              {t("blog.breadcrumb")}
            </Link>
          </p>
          <p className="label-gold mt-6">{data.category}</p>
          <h1 className="mt-5 max-w-3xl font-display text-3xl leading-tight text-cream sm:text-4xl lg:text-5xl">
            {data.title}
          </h1>
          <div className="mt-6 flex flex-wrap items-center gap-6 text-[12px] uppercase tracking-[0.14em] text-sand/60">
            <span className="flex items-center gap-2">
              <User className="size-3.5 text-gold" />
              {data.author}
            </span>
            <span className="flex items-center gap-2">
              <CalendarDays className="size-3.5 text-gold" />
              {formatDate(data.publishedAt, locale)}
            </span>
            <span className="flex items-center gap-2">
              <Clock className="size-3.5 text-gold" />
              {data.readMinutes} {t("blog.readMin")}
            </span>
          </div>
        </div>
      </section>

      <Section tone="paper">
        <div className="mx-auto max-w-3xl">
          <p className="border-l-2 border-gold pl-6 font-display text-xl leading-relaxed text-[#1c1814]">
            {data.excerpt}
          </p>
          <div className="mt-10 space-y-6 text-[16px] leading-[1.85] text-ink-soft">
            {data.content.split("\n\n").map((block) => {
              const match = block.match(/^\*\*(.+?)\*\*\s*(.*)$/s);
              if (match) {
                return (
                  <p key={block.slice(0, 24)}>
                    <strong className="font-display text-[17px] text-[#1c1814]">{match[1]}</strong>{" "}
                    {match[2]}
                  </p>
                );
              }
              return <p key={block.slice(0, 24)}>{block}</p>;
            })}
          </div>

          <Link
            to="/blog"
            className="mt-14 inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.16em] text-gold hover:text-terracotta"
          >
            <ArrowLeft className="size-4" />
            {t("blog.all")}
          </Link>
        </div>
      </Section>

      {others.length ? (
        <Section tone="cream">
          <h2 className="font-display text-3xl">{t("blog.also")}</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {others.map((item) => (
              <Link
                key={item.slug}
                to={`/blog/${item.slug}`}
                className="group border border-border bg-white p-6 transition-colors hover:border-gold/60"
              >
                <p className="text-[11px] uppercase tracking-[0.16em] text-gold">{item.category}</p>
                <h3 className="mt-3 font-display text-lg leading-snug group-hover:text-gold">
                  {item.title}
                </h3>
                <p className="mt-3 line-clamp-2 text-[14px] text-ink-soft">{item.excerpt}</p>
              </Link>
            ))}
          </div>
        </Section>
      ) : null}

      <CtaBand />
    </>
  );
}
