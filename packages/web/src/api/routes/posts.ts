import { z } from "zod";
import { desc, eq } from "drizzle-orm";
import { ORPCError } from "@orpc/server";
import { base } from "../__core/app";
import { db } from "../database";
import * as schema from "../database/schema";
import { postContent, toLang } from "../content";

type Row = typeof schema.posts.$inferSelect;

function parse(row: Row, lang: ReturnType<typeof toLang>) {
  const t = postContent(row.slug, lang);
  return {
    ...row,
    title: t?.title ?? row.title,
    excerpt: t?.excerpt ?? row.excerpt,
    content: t?.content ?? row.content,
    category: t?.category ?? row.category,
  };
}

export const posts = {
  list: base
    .input(z.object({ lang: z.enum(["fr", "en", "es", "de"]).optional() }).optional())
    .handler(async ({ input }) => {
      const lang = toLang(input?.lang);
      const rows = await db.select().from(schema.posts).orderBy(desc(schema.posts.publishedAt));
      return rows.map((row) => parse(row, lang));
    }),
  bySlug: base
    .input(z.object({ slug: z.string(), lang: z.enum(["fr", "en", "es", "de"]).optional() }))
    .handler(async ({ input }) => {
      const [row] = await db.select().from(schema.posts).where(eq(schema.posts.slug, input.slug));
      if (!row) throw new ORPCError("NOT_FOUND", { message: "Article introuvable" });
      return parse(row, toLang(input.lang));
    }),
};
