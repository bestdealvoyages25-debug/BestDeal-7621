import { z } from "zod";
import { asc } from "drizzle-orm";
import { base } from "../__core/app";
import { db } from "../database";
import * as schema from "../database/schema";
import { testimonialContent, toLang } from "../content";

type Row = typeof schema.testimonials.$inferSelect;

function parse(row: Row, lang: ReturnType<typeof toLang>) {
  const t = testimonialContent(row.name, lang);
  return {
    ...row,
    message: t?.message ?? row.message,
    city: t?.city ?? row.city,
  };
}

export const testimonials = {
  list: base
    .input(z.object({ lang: z.enum(["fr", "en", "es", "de"]).optional() }).optional())
    .handler(async ({ input }) => {
      const lang = toLang(input?.lang);
      const rows = await db
        .select()
        .from(schema.testimonials)
        .orderBy(asc(schema.testimonials.sortOrder));
      return rows.map((row) => parse(row, lang));
    }),
};
