import { z } from "zod";
import { base } from "../__core/app";
import { db } from "../database";
import * as schema from "../database/schema";

export const requests = {
  create: base
    .input(
      z.object({
        kind: z.enum(["contact", "devis"]),
        name: z.string().min(2, "Merci d'indiquer votre nom"),
        email: z.string().email("Adresse e-mail invalide"),
        phone: z.string().optional(),
        circuitSlug: z.string().optional(),
        travelers: z.number().int().positive().optional(),
        period: z.string().optional(),
        message: z.string().optional(),
      }),
    )
    .handler(async ({ input }) => {
      const [row] = await db
        .insert(schema.requests)
        .values({
          kind: input.kind,
          name: input.name.trim(),
          email: input.email.trim().toLowerCase(),
          phone: input.phone?.trim() ?? "",
          circuitSlug: input.circuitSlug ?? "",
          travelers: input.travelers ?? null,
          period: input.period?.trim() ?? "",
          message: input.message?.trim() ?? "",
        })
        .returning();
      return { id: row.id, createdAt: row.createdAt };
    }),
};
