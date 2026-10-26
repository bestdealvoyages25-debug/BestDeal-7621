import { Link } from "wouter";
import { Calendar, MapPin, Plane, Users } from "lucide-react";
import { useI18n } from "../lib/i18n";
import { cn } from "../lib/utils";

export type CircuitCardData = {
  slug: string;
  title: string;
  destinationLabel: string;
  type: string;
  level: string;
  summary: string;
  image: string;
  durationDays: number;
  durationBucket: string;
  priceFrom: number | null;
  months: string[];
  departureCity: string;
  destination?: string;
  promo: number | null;
};

export function CircuitCard({
  circuit,
  className,
}: {
  circuit: CircuitCardData;
  className?: string;
}) {
  const { t, tc, tMonths } = useI18n();
  const months = tMonths(circuit.months.join(" - ")).split(" · ");

  return (
    <article
      className={cn(
        "group flex h-full flex-col border border-border bg-white transition-all duration-300 hover:border-gold/60 hover:shadow-[0_18px_40px_-28px_rgba(11,10,8,0.45)]",
        className,
      )}
    >
      <Link to={`/circuits/${circuit.slug}`} className="relative block overflow-hidden">
        <img
          src={circuit.image}
          alt={circuit.title}
          loading="lazy"
          className="h-56 w-full object-cover transition-transform duration-[900ms] group-hover:scale-105"
        />
        <span className="absolute left-0 top-0 bg-ink/85 px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-gold-soft">
          {circuit.destinationLabel}
        </span>
        <span className="absolute bottom-0 left-0 flex items-center gap-2 bg-gold px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-ink">
          <Calendar className="size-3.5" />
          {circuit.durationDays} {t("card.days")}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-ink-soft">
          <span>{tc("cat", circuit.type)}</span>
          <span className="h-1 w-1 rounded-full bg-gold" />
          <span>{tc("level", circuit.level)}</span>
        </div>

        <h3 className="mt-3 font-display text-[21px] leading-snug">
          <Link to={`/circuits/${circuit.slug}`} className="transition-colors hover:text-gold">
            {circuit.title}
          </Link>
        </h3>

        <p className="mt-4 line-clamp-3 flex-1 text-[14px] leading-relaxed text-ink-soft">
          {circuit.summary}
        </p>

        <div className="mt-5 flex flex-wrap gap-3 text-[11px] uppercase tracking-[0.12em] text-clay">
          <span className="flex items-center gap-1.5">
            <MapPin className="size-3.5 text-gold" />
            {t("card.departure")} {circuit.departureCity}
          </span>
          <span className="flex items-center gap-1.5">
            <Users className="size-3.5 text-gold" />
            {months[0]} – {months[months.length - 1]}
          </span>
        </div>

        <div className="mt-6 flex items-end justify-between gap-3 border-t border-border pt-5">
          <div>
            <p className="text-[10px] uppercase tracking-[0.18em] text-ink-soft">
              {t("card.price")}
            </p>
            <p className="font-display text-[17px] whitespace-nowrap text-gold">
              {t("card.onRequest")}
            </p>
            {circuit.destination === "djanet" ? (
              <p className="mt-1 flex items-center gap-1.5 text-[11px] text-ink-soft">
                <Plane className="size-3 text-gold" />
                {t("flights.included")}
              </p>
            ) : null}
          </div>
          <Link
            to={`/circuits/${circuit.slug}`}
            className="whitespace-nowrap border border-gold/60 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.14em] text-gold transition-colors hover:bg-gold hover:text-ink"
          >
            {t("card.more")}
          </Link>
        </div>
      </div>
    </article>
  );
}
