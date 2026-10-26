import { z } from "zod";
import { asc, eq } from "drizzle-orm";
import { ORPCError } from "@orpc/server";
import { base } from "../__core/app";
import { db } from "../database";
import * as schema from "../database/schema";
import { destinationContent, toLang } from "../content";

type Row = typeof schema.destinations.$inferSelect;

function parse(row: Row, lang: ReturnType<typeof toLang>) {
  const t = destinationContent(row.slug, lang);
  return {
    ...row,
    name: t?.name ?? row.name,
    tagline: t?.tagline ?? row.tagline,
    description: t?.description ?? row.description,
    season: t?.season ?? row.season,
    bestFor: t?.bestFor ?? row.bestFor,
  };
}

export const destinations = {
  list: base
    .input(z.object({ lang: z.enum(["fr", "en", "es", "de"]).optional() }).optional())
    .handler(async ({ input }) => {
      const lang = toLang(input?.lang);
      const rows = await db
        .select()
        .from(schema.destinations)
        .orderBy(asc(schema.destinations.sortOrder));
      return rows.map((row) => parse(row, lang));
    }),
  bySlug: base
    .input(z.object({ slug: z.string(), lang: z.enum(["fr", "en", "es", "de"]).optional() }))
    .handler(async ({ input }) => {
      const [row] = await db
        .select()
        .from(schema.destinations)
        .where(eq(schema.destinations.slug, input.slug));
      if (!row) throw new ORPCError("NOT_FOUND", { message: "Destination introuvable" });
      return parse(row, toLang(input.lang));
    }),
};
