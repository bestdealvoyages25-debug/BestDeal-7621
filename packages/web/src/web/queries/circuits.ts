import { useQuery } from "@tanstack/react-query";
import { orpc } from "../lib/api";
import { useI18n } from "../lib/i18n";

export type CircuitFilters = {
  destination?: string;
  type?: string;
  duration?: string;
  maxPrice?: number;
  search?: string;
  sort?: "recommande" | "prix-asc" | "prix-desc" | "duree";
};

export function useCircuits(filters: CircuitFilters = {}) {
  const { lang } = useI18n();
  return useQuery(
    orpc.circuits.list.queryOptions({ input: { ...filters, lang }, staleTime: 30_000 }),
  );
}

export function useFeaturedCircuits() {
  const { lang } = useI18n();
  return useQuery(orpc.circuits.featured.queryOptions({ input: { lang }, staleTime: 60_000 }));
}

export function useCircuit(slug: string) {
  const { lang } = useI18n();
  return useQuery(
    orpc.circuits.bySlug.queryOptions({ input: { slug, lang }, staleTime: 60_000 }),
  );
}

export function useRelatedCircuits(slug: string) {
  const { lang } = useI18n();
  return useQuery(
    orpc.circuits.related.queryOptions({ input: { slug, lang }, staleTime: 60_000 }),
  );
}

export function useCircuitFilters() {
  const { lang } = useI18n();
  return useQuery(orpc.circuits.filters.queryOptions({ input: { lang }, staleTime: 300_000 }));
}

export function useCircuitStats() {
  return useQuery(orpc.circuits.stats.queryOptions({ staleTime: 300_000 }));
}
