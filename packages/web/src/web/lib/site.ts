/**
 * Coordonnées et structure du site. Les libellés visibles ne sont pas ici :
 * ils vivent dans les dictionnaires `locales/{fr,en,es,de}.ts` et s'obtiennent
 * avec `t()` (voir `lib/i18n.tsx`).
 */
export const site = {
  name: "Best Deal Voyages",
  contact: {
    phone: "+213 560 77 94 55",
    phone2: "+213 560 39 51 67",
    email: "bestdeal.voyages25@gmail.com",
  },
  socials: [
    { label: "Facebook", href: "https://facebook.com" },
    { label: "Instagram", href: "https://instagram.com" },
    { label: "WhatsApp", href: "https://wa.me/213560779455" },
  ],
  nav: [
    { key: "nav.home", href: "/" },
    { key: "nav.circuits", href: "/circuits" },
    { key: "nav.destinations", href: "/destinations" },
    { key: "nav.blog", href: "/blog" },
    { key: "nav.about", href: "/a-propos" },
    { key: "nav.contact", href: "/contact" },
  ],
} as const;

/** Clés de dictionnaire des six arguments « pourquoi nous choisir ». */
export const featureKeys = [
  "features.f1",
  "features.f2",
  "features.f3",
  "features.f4",
  "features.f5",
  "features.f6",
] as const;

/** Tuiles « par envie » — `type` reste la valeur française stockée en base. */
export const typeTiles = [
  { key: "types.t1", type: "Aventure", image: "/images/misc/type-aventure.jpg" },
  { key: "types.t2", type: "Culturel", image: "/images/misc/type-culturel.jpg" },
  { key: "types.t3", type: "Découverte", image: "/images/misc/type-decouverte.jpg" },
] as const;

/** Huit circuits mis en avant dans le pied de page. */
export const footerCircuits = [
  { key: "footer.c1", href: "/circuits/djanet-plateau-tadjlahine" },
  { key: "footer.c2", href: "/circuits/djanet-tadrart-rouge" },
  { key: "footer.c3", href: "/circuits/djanet-mehari-tadrart" },
  { key: "footer.c4", href: "/circuits/djanet-trekking-sefar" },
  { key: "footer.c5", href: "/circuits/djanet-iherir-essendilene" },
  { key: "footer.c6", href: "/circuits/timimoun-joyau-zenete" },
  { key: "footer.c7", href: "/circuits/ghardaia-porte-du-sahara" },
  { key: "footer.c8", href: "/circuits/tamanrasset-hoggar-assekrem" },
] as const;

/** `+213 560 77 94 55` → `tel:+213560779455` */
export function telHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}
