import { useQuery } from "@tanstack/react-query";
import { orpc } from "../lib/api";
import { useI18n } from "../lib/i18n";

export function useDestinations() {
  const { lang } = useI18n();
  return useQuery(
    orpc.destinations.list.queryOptions({ input: { lang }, staleTime: 300_000 }),
  );
}

export function useTestimonials() {
  const { lang } = useI18n();
  return useQuery(
    orpc.testimonials.list.queryOptions({ input: { lang }, staleTime: 300_000 }),
  );
}

export function usePosts() {
  const { lang } = useI18n();
  return useQuery(orpc.posts.list.queryOptions({ input: { lang }, staleTime: 300_000 }));
}

export function usePost(slug: string) {
  const { lang } = useI18n();
  return useQuery(
    orpc.posts.bySlug.queryOptions({ input: { slug, lang }, staleTime: 300_000 }),
  );
}
