/**
 * Fusion des contenus éditoriaux : le français reste en base (source de vérité),
 * les traductions vivent dans les packs ci-dessous et sont appliquées à la lecture
 * selon la langue demandée par le client. Toute clé absente retombe sur le français.
 */
import { en } from "./translations-en";
import { es } from "./translations-es";
import { de } from "./translations-de";
import type {
  CircuitTranslation,
  ContentPack,
  DestinationTranslation,
  Lang,
  PostTranslation,
  TestimonialTranslation,
} from "./types";

export { LANGS } from "./types";
export type { Lang } from "./types";

/** Traductions par langue (le français n'a pas de pack : il est déjà en base). */
export const packs: Record<Exclude<Lang, "fr">, ContentPack> = { en, es, de };

export function isLang(value: unknown): value is Lang {
  return value === "fr" || value === "en" || value === "es" || value === "de";
}

/** Normalise une langue reçue de l'extérieur (query string, body d'API). */
export function toLang(value: unknown): Lang {
  return isLang(value) ? value : "fr";
}

function pack(lang: Lang): ContentPack | null {
  return lang === "fr" ? null : (packs[lang] ?? null);
}

export function circuitContent(slug: string, lang: Lang): CircuitTranslation | undefined {
  return pack(lang)?.circuits[slug];
}

export function destinationContent(slug: string, lang: Lang): DestinationTranslation | undefined {
  return pack(lang)?.destinations[slug];
}

export function testimonialContent(name: string, lang: Lang): TestimonialTranslation | undefined {
  return pack(lang)?.testimonials[name];
}

export function postContent(slug: string, lang: Lang): PostTranslation | undefined {
  return pack(lang)?.posts[slug];
}
