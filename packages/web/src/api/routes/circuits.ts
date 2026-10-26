import { z } from "zod";
import { and, asc, desc, eq, lte } from "drizzle-orm";
import { ORPCError } from "@orpc/server";
import { base } from "../__core/app";
import { db } from "../database";
import * as schema from "../database/schema";
import { circuitContent, destinationContent, toLang } from "../content";
import type { Lang } from "../content/types";

type Row = typeof schema.circuits.$inferSelect;

const langInput = z.enum(["fr", "en", "es", "de"]).optional();

/** Le français vient de la base, la langue demandée écrase les champs traduits. */
function parse(row: Row, lang: Lang = "fr") {
  const t = circuitContent(row.slug, lang);
  const baseProgram = JSON.parse(row.program) as { day?: string; title: string; text: string }[];
  const program: { day?: string; title: string; text: string }[] = t?.program ?? baseProgram;

  return {
    ...row,
    title: t?.title ?? row.title,
    summary: t?.summary ?? row.summary,
    description: t?.description ?? row.description,
    groupSize: t?.groupSize ?? row.groupSize,
    pension: t?.pension ?? row.pension,
    departureCity: t?.departureCity ?? row.departureCity,
    highlights: t?.highlights ?? (JSON.parse(row.highlights) as string[]),
    program: program.map((step, index) => ({
      day: step.day ?? `Jour ${index + 1}`,
      title: step.title,
      text: step.text,
    })),
    included: t?.included ?? (JSON.parse(row.included) as string[]),
    notIncluded: t?.notIncluded ?? (JSON.parse(row.notIncluded) as string[]),
    months: row.months.split(" - "),
  };
}

export type Circuit = ReturnType<typeof parse>;

export const circuits = {
  list: base
    .input(
      z
        .object({
          destination: z.string().optional(),
          type: z.string().optional(),
          duration: z.string().optional(),
          maxPrice: z.number().optional(),
          search: z.string().optional(),
          sort: z.enum(["recommande", "prix-asc", "prix-desc", "duree"]).optional(),
          lang: langInput,
        })
        .optional(),
    )
    .handler(async ({ input }) => {
      const f = input ?? {};
      const lang = toLang(f.lang);
      const where = [];
      if (f.destination && f.destination !== "all") where.push(eq(schema.circuits.destination, f.destination));
      if (f.type && f.type !== "all") where.push(eq(schema.circuits.type, f.type));
      if (f.duration && f.duration !== "all") where.push(eq(schema.circuits.durationBucket, f.duration));
      if (f.maxPrice) where.push(lte(schema.circuits.priceFrom, f.maxPrice));

      const order =
        f.sort === "prix-asc"
          ? [asc(schema.circuits.priceFrom)]
          : f.sort === "prix-desc"
            ? [desc(schema.circuits.priceFrom)]
            : f.sort === "duree"
              ? [desc(schema.circuits.durationDays)]
              : [desc(schema.circuits.featured), asc(schema.circuits.id)];

      const rows = await db
        .select()
        .from(schema.circuits)
        .where(where.length ? and(...where) : undefined)
        .orderBy(...order);

      // La recherche porte sur les champs traduits : on filtre après fusion.
      const query = f.search?.trim().toLowerCase();
      const localized = rows.map((row) => parse(row, lang));
      if (!query) return localized;

      return localized.filter((circuit) =>
        [circuit.title, circuit.summary, circuit.destinationLabel, circuit.type]
          .join(" ")
          .toLowerCase()
          .includes(query),
      );
    }),

  featured: base.input(z.object({ lang: langInput }).optional()).handler(async ({ input }) => {
    const rows = await db
      .select()
      .from(schema.circuits)
      .where(eq(schema.circuits.featured, 1))
      .orderBy(asc(schema.circuits.id));
    const lang = toLang(input?.lang);
    return rows.map((row) => parse(row, lang));
  }),

  bySlug: base
    .input(z.object({ slug: z.string(), lang: langInput }))
    .handler(async ({ input }) => {
      const [row] = await db.select().from(schema.circuits).where(eq(schema.circuits.slug, input.slug));
      if (!row) throw new ORPCError("NOT_FOUND", { message: "Circuit introuvable" });
      return parse(row, toLang(input.lang));
    }),

  related: base
    .input(z.object({ slug: z.string(), limit: z.number().optional(), lang: langInput }))
    .handler(async ({ input }) => {
      const lang = toLang(input.lang);
      const [current] = await db
        .select()
        .from(schema.circuits)
        .where(eq(schema.circuits.slug, input.slug));
      if (!current) return [];
      const rows = await db
        .select()
        .from(schema.circuits)
        .where(eq(schema.circuits.destination, current.destination));
      return rows
        .filter((r) => r.slug !== input.slug)
        .slice(0, input.limit ?? 3)
        .map((row) => parse(row, lang));
    }),

  filters: base.input(z.object({ lang: langInput }).optional()).handler(async ({ input }) => {
    const lang = toLang(input?.lang);
    const rows = await db
      .select({
        destination: schema.circuits.destination,
        destinationLabel: schema.circuits.destinationLabel,
        type: schema.circuits.type,
        durationBucket: schema.circuits.durationBucket,
        priceFrom: schema.circuits.priceFrom,
      })
      .from(schema.circuits);

    const uniq = <T,>(items: T[]) => Array.from(new Set(items));
    const regions = await db
      .select({ slug: schema.destinations.slug, name: schema.destinations.name })
      .from(schema.destinations);
    const nameBySlug = new Map(
      regions.map((r) => [
        r.slug,
        (destinationContent(r.slug, lang)?.name ?? r.name).split(" — ")[0],
      ]),
    );
    const destMap = new Map<string, string>();
    rows.forEach((r) =>
      destMap.set(r.destination, nameBySlug.get(r.destination) ?? r.destinationLabel),
    );
    const prices = rows.map((r) => r.priceFrom ?? 0).filter(Boolean);

    return {
      destinations: Array.from(destMap, ([value, label]) => ({ value, label })),
      types: uniq(rows.map((r) => r.type)).sort(),
      durations: uniq(rows.map((r) => r.durationBucket)).sort(),
      minPrice: prices.length ? Math.min(...prices) : 0,
      maxPrice: prices.length ? Math.max(...prices) : 0,
    };
  }),

  stats: base.handler(async () => {
    const rows = await db.select().from(schema.circuits);
    return {
      circuits: rows.length,
      destinations: new Set(rows.map((r) => r.destination)).size,
      days: rows.reduce((acc, r) => acc + r.durationDays, 0),
    };
  }),
};
