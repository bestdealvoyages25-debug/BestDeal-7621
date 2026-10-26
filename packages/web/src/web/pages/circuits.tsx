import { useEffect, useMemo, useState } from "react";
import { Link, useSearch } from "wouter";
import { SlidersHorizontal, Search, X } from "lucide-react";
import { CircuitCard } from "../components/circuit-card";
import { CtaBand } from "../components/cta-band";
import { Reveal } from "../components/ui/reveal";
import { Section, SkeletonCard } from "../components/ui/section";
import { useCircuitFilters, useCircuits, type CircuitFilters } from "../queries/circuits";
import { cn } from "../lib/utils";
import { useI18n } from "../lib/i18n";

const sorts = [
  { value: "recommande", key: "circuits.sortRecommended" },
  { value: "duree", key: "circuits.sortDuration" },
] as const;

export default function CircuitsPage() {
  const { t, tc, tDuration } = useI18n();
  const search = useSearch();
  const filters = useCircuitFilters();

  const initial = useMemo(() => {
    const params = new URLSearchParams(search);
    return {
      destination: params.get("destination") ?? "all",
      type: params.get("type") ?? "all",
      duration: params.get("duration") ?? "all",
      search: params.get("search") ?? "",
    };
  }, [search]);

  const [destination, setDestination] = useState(initial.destination);
  const [type, setType] = useState(initial.type);
  const [duration, setDuration] = useState(initial.duration);
  const [term, setTerm] = useState(initial.search);
  const [sort, setSort] = useState<NonNullable<CircuitFilters["sort"]>>("recommande");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    setDestination(initial.destination);
    setType(initial.type);
    setDuration(initial.duration);
    setTerm(initial.search);
  }, [initial]);

  const circuits = useCircuits({
    destination,
    type,
    duration,
    search: term || undefined,
    sort,
  });

  const reset = () => {
    setDestination("all");
    setType("all");
    setDuration("all");
    setTerm("");
    setSort("recommande");
  };

  const activeFilters = [
    destination !== "all" ? destination : null,
    type !== "all" ? type : null,
    duration !== "all" ? duration : null,
    term ? `« ${term} »` : null,
  ].filter(Boolean) as string[];

  return (
    <>
      <section className="relative overflow-hidden bg-ink py-20 lg:py-24">
        <img
          src="/images/hero/hero-djanet.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/50" />
        <div className="container-x relative">
          <p className="flex items-center gap-2 text-[12px] uppercase tracking-[0.18em] text-sand/50">
            <Link to="/" className="hover:text-gold-soft">
              {t("nav.home")}
            </Link>
            <span>/</span>
            <span className="text-gold">{t("circuits.breadcrumb")}</span>
          </p>
          <h1 className="mt-6 max-w-3xl font-display text-4xl leading-tight text-cream sm:text-5xl">
            {t("circuits.title")}
          </h1>
          <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-sand/75">
            {t("circuits.subtitle")}
          </p>
        </div>
      </section>

      <Section tone="paper">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-1 items-center gap-3 border border-border px-4">
            <Search className="size-4 text-gold" />
            <input
              aria-label={t("circuits.searchAria")}
              value={term}
              onChange={(event) => setTerm(event.target.value)}
              placeholder={t("circuits.searchPlaceholder")}
              className="w-full bg-transparent py-3 text-[15px] outline-none placeholder:text-clay/70"
            />
            {term ? (
              <button type="button" onClick={() => setTerm("")} aria-label={t("circuits.clear")}>
                <X className="size-4 text-clay" />
              </button>
            ) : null}
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setShowFilters((value) => !value)}
              className="flex items-center gap-2 border border-border px-4 py-3 text-[12px] uppercase tracking-[0.14em] text-ink-soft transition-colors hover:border-gold lg:hidden"
            >
              <SlidersHorizontal className="size-4 text-gold" />
              {t("circuits.filters")}
            </button>
            <label className="flex items-center gap-3 border border-border px-4 py-3">
              <span className="text-[11px] uppercase tracking-[0.14em] text-ink-soft">{t("circuits.sort")}</span>
              <select
                aria-label={t("circuits.sortAria")}
                value={sort}
                onChange={(event) => setSort(event.target.value as NonNullable<CircuitFilters["sort"]>)}
                className="bg-transparent text-[14px] outline-none"
              >
                {sorts.map((item) => (
                  <option key={item.value} value={item.value}>
                    {t(item.key)}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        <div className={cn("mt-8 grid gap-10 lg:grid-cols-[260px_1fr]", !showFilters && "max-lg:hidden")}>
          <aside className="space-y-7 border border-border bg-cream p-6">
            <FilterGroup label={t("circuits.filter.destination")}>
              <Select
                ariaLabel={t("circuits.filterAria")}
                value={destination}
                onChange={setDestination}
                options={[
                  { value: "all", label: t("search.allDestinations") },
                  ...(filters.data?.destinations ?? []).map((item) => ({
                    value: item.value,
                    label: item.label,
                  })),
                ]}
              />
            </FilterGroup>
            <FilterGroup label={t("circuits.filter.type")}>
              <Select
                ariaLabel={t("circuits.filterAria")}
                value={type}
                onChange={setType}
                options={[
                  { value: "all", label: t("search.allTypes") },
                  ...(filters.data?.types ?? []).map((item) => ({ value: item, label: tc("cat", item) })),
                ]}
              />
            </FilterGroup>
            <FilterGroup label={t("circuits.filter.duration")}>
              <Select
                ariaLabel={t("circuits.filterAria")}
                value={duration}
                onChange={setDuration}
                options={[
                  { value: "all", label: t("search.allDurations") },
                  ...(filters.data?.durations ?? []).map((item) => ({ value: item, label: tDuration(item) })),
                ]}
              />
            </FilterGroup>
            {activeFilters.length ? (
              <button
                type="button"
                onClick={reset}
                className="w-full border border-gold/50 px-4 py-2.5 text-[11px] uppercase tracking-[0.14em] text-gold transition-colors hover:bg-gold hover:text-ink"
              >
                {t("circuits.filter.reset")}
              </button>
            ) : null}
          </aside>

          <div>
            <p className="mb-6 text-[12px] uppercase tracking-[0.16em] text-ink-soft">
              {circuits.isLoading
                ? t("circuits.searching")
                : t((circuits.data?.length ?? 0) > 1 ? "circuits.foundMany" : "circuits.foundOne", {
                    n: circuits.data?.length ?? 0,
                  })}
            </p>

            {circuits.isLoading ? (
              <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            ) : circuits.data?.length ? (
              <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                {circuits.data.map((circuit, index) => (
                  <Reveal key={circuit.slug} delay={(index % 3) * 80}>
                    <CircuitCard circuit={circuit} />
                  </Reveal>
                ))}
              </div>
            ) : (
              <div className="border border-dashed border-border px-8 py-20 text-center">
                <h3 className="font-display text-2xl">{t("circuits.empty.title")}</h3>
                <p className="mx-auto mt-3 max-w-md text-[14px] text-ink-soft">
                  {t("circuits.empty.text")}
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-4">
                  <button type="button" onClick={reset} className="btn-gold">
                    {t("circuits.empty.reset")}
                  </button>
                  <Link to="/contact" className="btn-ghost-gold border-gold text-gold hover:text-ink">
                    {t("circuits.empty.custom")}
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-3 text-[11px] uppercase tracking-[0.18em] text-ink-soft">{label}</p>
      {children}
    </div>
  );
}

function Select({
  value,
  onChange,
  options,
  ariaLabel,
}: {
  ariaLabel?: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <select
      aria-label={ariaLabel}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="field appearance-none bg-white py-2.5 text-[14px]"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
