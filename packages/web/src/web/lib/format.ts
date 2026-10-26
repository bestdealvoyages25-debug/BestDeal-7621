/** Dates localisées — la locale vient de `useI18n().locale`. */
export function formatDate(value: Date | string, locale = "fr-FR") {
  const date = typeof value === "string" ? new Date(value) : value;
  return date.toLocaleDateString(locale, { day: "numeric", month: "long", year: "numeric" });
}
