import { useCallback, useEffect, useState } from "react";
import { Link } from "wouter";
import { ChevronLeft, ChevronRight, Clock, MapPin } from "lucide-react";
import { useI18n } from "../lib/i18n";
import type { Dict } from "../locales/fr";
import { cn } from "../lib/utils";

type SlideKey = "hero.s1" | "hero.s2" | "hero.s3" | "hero.s4";

type Slide = {
  key: SlideKey;
  image: string;
  slug: string;
};

const slides: Slide[] = [
  { key: "hero.s1", image: "/images/hero/hero-tadjlahine.jpg", slug: "djanet-plateau-tadjlahine" },
  { key: "hero.s2", image: "/images/hero/hero-timimoun.jpg", slug: "timimoun-joyau-zenete" },
  { key: "hero.s3", image: "/images/hero/hero-ghardaia.jpg", slug: "ghardaia-porte-du-sahara" },
  { key: "hero.s4", image: "/images/hero/hero-tamanrasset.jpg", slug: "tamanrasset-hoggar-assekrem" },
];

export function HeroSlider() {
  const [index, setIndex] = useState(0);
  const { t } = useI18n();

  const go = useCallback((next: number) => {
    setIndex((next + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setIndex((current) => (current + 1) % slides.length), 7500);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[index];
  const label = (suffix: string) => t(`${slide.key}.${suffix}` as keyof Dict);
  const kicker = label("kicker");
  const [region, area] = kicker.split(" · ");

  return (
    <section className="relative overflow-hidden bg-ink">
      <div className="absolute inset-0">
        {slides.map((item, i) => (
          <img
            key={item.image}
            src={item.image}
            alt=""
            className={cn(
              "absolute inset-0 h-full w-full object-cover transition-opacity duration-1000",
              i === index ? "opacity-100" : "opacity-0",
            )}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-ink/88 via-ink/45 to-ink/5" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-ink/25" />
      </div>

      <div className="container-x relative flex min-h-[78vh] flex-col justify-center py-24 lg:min-h-[88vh]">
        <div className="grid items-center gap-12 lg:grid-cols-[1.35fr_0.65fr]">
          <div key={slide.slug}>
            <p className="label-gold">{kicker}</p>
            <h1 className="mt-6 max-w-3xl font-display text-4xl leading-[1.08] text-cream sm:text-5xl lg:text-[64px]">
              {label("title")}
            </h1>
            <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-sand/80">
              {label("subtitle")}
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link to={`/circuits/${slide.slug}`} className="btn-gold">
                {t("hero.discover")}
              </Link>
              <Link to="/circuits" className="btn-ghost-gold">
                {t("hero.allCircuits")}
              </Link>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="bg-white/95 p-7 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)] backdrop-blur">
              <p className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-ink-soft">
                <MapPin className="size-3.5 text-gold" />
                {label("departure")}
              </p>
              <p className="mt-5 font-display text-2xl text-[#1c1814]">{region}</p>
              <p className="mt-1 text-[13px] text-ink-soft">{area}</p>
              <div className="mt-6 flex items-center gap-2 border-y border-border py-4 text-[12px] uppercase tracking-[0.14em] text-ink-soft">
                <Clock className="size-4 text-gold" />
                {label("duration")}
              </div>
              <p className="mt-6 text-[10px] uppercase tracking-[0.18em] text-ink-soft">
                {t("hero.price")}
              </p>
              <p className="font-display text-2xl text-gold">{t("hero.onRequest")}</p>
              <Link to={`/circuits/${slide.slug}`} className="btn-gold mt-6 w-full">
                {t("hero.viewProgram")}
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-14 flex items-center gap-6">
          <div className="flex gap-2">
            {slides.map((item, i) => (
              <button
                key={item.slug}
                type="button"
                aria-label={`Slide ${i + 1}`}
                onClick={() => go(i)}
                className={cn(
                  "h-[3px] transition-all duration-500",
                  i === index ? "w-12 bg-gold" : "w-6 bg-sand/30 hover:bg-sand/60",
                )}
              />
            ))}
          </div>
          <div className="ml-auto flex gap-3">
            <button
              type="button"
              aria-label={t("hero.prev")}
              onClick={() => go(index - 1)}
              className="flex size-11 items-center justify-center border border-sand/25 text-sand/70 transition-colors hover:border-gold hover:text-gold"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              aria-label={t("hero.next")}
              onClick={() => go(index + 1)}
              className="flex size-11 items-center justify-center border border-sand/25 text-sand/70 transition-colors hover:border-gold hover:text-gold"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
