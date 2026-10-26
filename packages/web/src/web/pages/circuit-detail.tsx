import { useState } from "react";
import { Link, useParams } from "wouter";
import {
  BedDouble,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Clock,
  Gauge,
  MapPin,
  MinusCircle,
  Plane,
  Users,
} from "lucide-react";
import { CircuitCard } from "../components/circuit-card";
import { RequestForm } from "../components/request-form";
import { Reveal } from "../components/ui/reveal";
import { Loader, Section, SectionHeading } from "../components/ui/section";
import { useCircuit, useRelatedCircuits } from "../queries/circuits";
import { cn } from "../lib/utils";
import { useI18n } from "../lib/i18n";

export default function CircuitDetailPage() {
  const { t, tc, tDuration, tMonths } = useI18n();
  const { slug } = useParams<{ slug: string }>();
  const circuit = useCircuit(slug ?? "");
  const related = useRelatedCircuits(slug ?? "");
  const [openDay, setOpenDay] = useState<number | null>(0);

  if (circuit.isLoading) return <Loader label={t("detail.loading")} />;

  if (circuit.isError || !circuit.data) {
    return (
      <Section tone="paper" className="py-32 text-center">
        <h1 className="font-display text-3xl">{t("detail.notFound.title")}</h1>
        <p className="mt-4 text-ink-soft">
          {t("detail.notFound.text")}
        </p>
        <Link to="/circuits" className="btn-gold mt-8">
          {t("detail.notFound.cta")}
        </Link>
      </Section>
    );
  }

  const data = circuit.data;
  const level = tc("level", data.level);
  const info = [
    { icon: Clock, label: t("detail.info.duration"), value: `${data.durationDays} ${t("detail.days")}` },
    { icon: Gauge, label: t("detail.info.level"), value: level },
    { icon: CalendarDays, label: t("detail.info.season"), value: data.months.slice(0, 3).map(tMonths).join(" · ") },
    { icon: MapPin, label: t("detail.info.departure"), value: data.departureCity },
    { icon: Users, label: t("detail.info.group"), value: data.groupSize },
    { icon: BedDouble, label: t("detail.info.lodging"), value: data.pension },
  ];

  return (
    <>
      <section className="relative overflow-hidden bg-ink">
        <img src={data.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/35" />
        <div className="container-x relative flex min-h-[62vh] flex-col justify-end pb-14 pt-32">
          <p className="flex flex-wrap items-center gap-2 text-[12px] uppercase tracking-[0.16em] text-sand/50">
            <Link to="/" className="hover:text-gold-soft">
              {t("nav.home")}
            </Link>
            <span>/</span>
            <Link to="/circuits" className="hover:text-gold-soft">
              {t("nav.circuits")}
            </Link>
            <span>/</span>
            <span className="text-gold">{data.destinationLabel}</span>
          </p>
          <h1 className="mt-6 max-w-4xl font-display text-3xl leading-tight text-cream sm:text-4xl lg:text-[52px]">
            {data.title}
          </h1>
          <div className="mt-6 flex flex-wrap items-center gap-6 text-[13px] text-sand/75">
            <span className="flex items-center gap-2">
              <MapPin className="size-4 text-gold" />
              {tc("cat", data.type)}
            </span>
            <span className="flex items-center gap-2">
              <Clock className="size-4 text-gold" />
              {tDuration(data.durationBucket)}
            </span>
          </div>
        </div>
      </section>

      <div className="border-b border-border bg-cream">
        <div className="container-x grid divide-y divide-border sm:grid-cols-2 lg:grid-cols-3 lg:divide-y-0">
          {info.map((item) => (
            <div key={item.label} className="flex items-center gap-4 px-2 py-6 lg:px-6">
              <item.icon className="size-5 shrink-0 text-gold" />
              <div>
                <p className="text-[10px] uppercase tracking-[0.18em] text-ink-soft">{item.label}</p>
                <p className="font-display text-[15px]">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Section tone="paper">
        <div className="grid gap-14 lg:grid-cols-[1fr_380px]">
          <div>
            <Reveal>
              <p className="label-gold">{t("detail.section")}</p>
              <h2 className="mt-4 font-display text-3xl">{t("detail.presentation")}</h2>
              <div className="mt-6 space-y-5 text-[15px] leading-relaxed text-ink-soft">
                {data.description.split("\n\n").map((paragraph) => (
                  <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                ))}
              </div>
            </Reveal>

            <Reveal className="mt-14">
              <h3 className="font-display text-2xl">{t("detail.highlights")}</h3>
              <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                {data.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-3 text-[14px] leading-relaxed text-ink-soft">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-gold" />
                    {highlight}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal className="mt-14">
              <h3 className="font-display text-2xl">{t("detail.program")}</h3>
              <div className="mt-6 divide-y divide-border border-y border-border">
                {data.program.map((step, index) => {
                  const open = openDay === index;
                  return (
                    <div key={step.day}>
                      <button
                        type="button"
                        onClick={() => setOpenDay(open ? null : index)}
                        className="flex w-full items-center gap-5 py-5 text-left"
                      >
                        <span
                          className={cn(
                            "flex size-10 shrink-0 items-center justify-center border font-display text-[13px]",
                            open ? "border-gold bg-gold text-ink" : "border-border text-gold",
                          )}
                        >
                          {index + 1}
                        </span>
                        <span className="flex-1">
                          <span className="block text-[11px] uppercase tracking-[0.16em] text-ink-soft">
                            {t("detail.day")} {index + 1}
                          </span>
                          <span className="mt-1 block font-display text-lg">{step.title}</span>
                        </span>
                        <ChevronDown
                          className={cn(
                            "size-5 shrink-0 text-gold transition-transform",
                            open && "rotate-180",
                          )}
                        />
                      </button>
                      {open ? (
                        <p className="pb-6 pl-15 text-[14px] leading-relaxed text-ink-soft">
                          {step.text}
                        </p>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </Reveal>

            <Reveal className="mt-14 grid gap-10 sm:grid-cols-2">
              <div>
                <h3 className="font-display text-xl">{t("detail.included")}</h3>
                <ul className="mt-5 space-y-3">
                  {data.included.map((item) => (
                    <li key={item} className="flex gap-3 text-[14px] text-ink-soft">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-gold" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-display text-xl">{t("detail.notIncluded")}</h3>
                <ul className="mt-5 space-y-3">
                  {data.notIncluded.map((item) => (
                    <li key={item} className="flex gap-3 text-[14px] text-ink-soft">
                      <MinusCircle className="mt-0.5 size-4 shrink-0 text-clay" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          <aside className="lg:sticky lg:top-32 lg:self-start">
            <div className="border border-border bg-cream p-7">
              <p className="text-[10px] uppercase tracking-[0.18em] text-ink-soft">{t("detail.price")}</p>
              <p className="mt-2 font-display text-3xl text-gold">{t("detail.onRequest")}</p>
              {data.destination === "djanet" ? (
                <p className="mt-3 flex items-center gap-2 text-[13px] text-ink">
                  <Plane className="size-4 text-gold" />
                  {t("flights.included")}
                </p>
              ) : null}
              {data.privateOnDemand ? (
                <p className="mt-3 border border-gold/50 bg-gold/10 px-3 py-2 text-[12px] leading-relaxed text-ink">
                  {t("detail.private")}
                </p>
              ) : null}
              <ul className="mt-6 space-y-3 border-t border-border pt-6 text-[13px] text-ink-soft">
                <li className="flex justify-between gap-4">
                  <span>{t("detail.info.duration")}</span>
                  <span className="text-[#1c1814]">{data.durationDays} {t("detail.days")}</span>
                </li>
                <li className="flex justify-between gap-4">
                  <span>{t("detail.info.level")}</span>
                  <span className="text-[#1c1814]">{level}</span>
                </li>
                <li className="flex justify-between gap-4">
                  <span>{t("detail.info.departure")}</span>
                  <span className="text-[#1c1814]">{data.departureCity}</span>
                </li>
                <li className="flex justify-between gap-4">
                  <span>{t("detail.info.group")}</span>
                  <span className="text-[#1c1814]">{data.groupSize}</span>
                </li>
                <li className="flex justify-between gap-4">
                  <span>{t("detail.info.season")}</span>
                  <span className="text-right text-[#1c1814]">{tMonths(data.months[0] ?? "")} – {tMonths(data.months[data.months.length - 1] ?? "")}</span>
                </li>
              </ul>
              <div className="mt-7 border-t border-border pt-7">
                <h3 className="font-display text-lg">{t("detail.request.title")}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-ink-soft">
                  {t("detail.request.text")}
                </p>
                <RequestForm
                  kind="devis"
                  circuitSlug={data.slug}
                  circuitTitle={data.title}
                  className="mt-5"
                />
              </div>
            </div>
          </aside>
        </div>
      </Section>

      {related.data?.length ? (
        <Section tone="cream">
          <SectionHeading
            align="left"
            label={t("detail.related.label")}
            title={t("detail.related.title", { name: data.destinationLabel })}
            subtitle={t("detail.related.subtitle")}
          />
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {related.data.map((item, index) => (
              <Reveal key={item.slug} delay={index * 90}>
                <CircuitCard circuit={item} />
              </Reveal>
            ))}
          </div>
        </Section>
      ) : null}
    </>
  );
}
