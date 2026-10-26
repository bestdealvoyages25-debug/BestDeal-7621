/**
 * Types des traductions éditoriales (circuits, destinations, avis, articles).
 * Le français reste la source de vérité en base ; les autres langues sont
 * fusionnées à la lecture par `mergeContent` dans ./index.ts.
 */
export const LANGS = ["fr", "en", "es", "de"] as const;
export type Lang = (typeof LANGS)[number];

export interface CircuitTranslation {
  title: string;
  summary: string;
  description: string;
  groupSize: string;
  pension: string;
  departureCity: string;
  highlights: string[];
  program: { title: string; text: string }[];
  included: string[];
  notIncluded: string[];
}

export interface DestinationTranslation {
  name: string;
  tagline: string;
  description: string;
  season: string;
  bestFor: string;
}

export interface TestimonialTranslation {
  message: string;
  city: string;
}

export interface PostTranslation {
  title: string;
  excerpt: string;
  content: string;
  category: string;
}

export interface ContentPack {
  circuits: Record<string, CircuitTranslation>;
  destinations: Record<string, DestinationTranslation>;
  testimonials: Record<string, TestimonialTranslation>;
  posts: Record<string, PostTranslation>;
}
