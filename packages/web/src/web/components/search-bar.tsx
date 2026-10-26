import { useState } from "react";
import { useLocation } from "wouter";
import { CalendarDays, Compass, MapPin, Search } from "lucide-react";
import { useCircuitFilters } from "../queries/circuits";
import { useI18n } from "../lib/i18n";

export function SearchBar() {
  const [, navigate] = useLocation();
  const filters = useCircuitFilters();
  const { t, tc, tDuration } = useI18n();
  const [destination, setDestination] = useState("all");
  const [type, setType] = useState("all");
  const [duration, setDuration] = useState("all");

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const params = new URLSearchParams();
    if (destination !== "all") params.set("destination", destination);
    if (type !== "all") params.set("type", type);
    if (duration !== "all") params.set("duration", duration);
    navigate(`/circuits${params.toString() ? `?${params.toString()}` : ""}`);
  };

  const options = {
    destinations: filters.data?.destinations ?? [],
    types: filters.data?.types ?? [],
    durations: filters.data?.durations ?? [],
  };

  return (
    <div className="relative z-20 -mt-16 lg:-mt-20">
      <div className="container-x">
        <form
          onSubmit={submit}
          className="grid gap-4 border border-border bg-white p-6 shadow-[0_28px_60px_-40px_rgba(11,10,8,0.55)] lg:grid-cols-[1fr_1fr_1fr_1fr_auto] lg:items-end lg:p-7"
        >
          <Field icon={<MapPin className="size-4 text-gold" />} label={t("search.destination")}>
            <select
              value={destination}
              onChange={(event) => setDestination(event.target.value)}
              disabled={filters.isLoading}
              className="field appearance-none"
            >
              <option value="all">{t("search.allDestinations")}</option>
              {options.destinations.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </Field>

          <Field icon={<Compass className="size-4 text-gold" />} label={t("search.type")}>
            <select
              value={type}
              onChange={(event) => setType(event.target.value)}
              disabled={filters.isLoading}
              className="field appearance-none"
            >
              <option value="all">{t("search.allTypes")}</option>
              {options.types.map((item) => (
                <option key={item} value={item}>
                  {tc("cat", item)}
                </option>
              ))}
            </select>
          </Field>

          <Field icon={<CalendarDays className="size-4 text-gold" />} label={t("search.duration")}>
            <select
              value={duration}
              onChange={(event) => setDuration(event.target.value)}
              disabled={filters.isLoading}
              className="field appearance-none"
            >
              <option value="all">{t("search.allDurations")}</option>
              {options.durations.map((item) => (
                <option key={item} value={item}>
                  {tDuration(item)}
                </option>
              ))}
            </select>
          </Field>

          <button type="submit" className="btn-gold h-[50px] lg:px-8">
            <Search className="size-4" />
            {t("search.submit")}
          </button>
        </form>
      </div>
    </div>
  );
}

function Field({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-ink-soft">
        {icon}
        {label}
      </span>
      {children}
    </label>
  );
}
