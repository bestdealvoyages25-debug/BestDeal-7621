import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

/** Circuits & séjours vendus par l'agence (désert algérien). */
export const circuits = sqliteTable("circuits", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  destination: text("destination").notNull(),
  destinationLabel: text("destination_label").notNull(),
  type: text("type").notNull(),
  level: text("level").notNull().default("Facile"),
  summary: text("summary").notNull(),
  description: text("description").notNull(),
  image: text("image").notNull(),
  durationDays: integer("duration_days").notNull(),
  durationBucket: text("duration_bucket").notNull(),
  priceFrom: integer("price_from"),
  departureCity: text("departure_city").notNull(),
  groupSize: text("group_size").notNull(),
  pension: text("pension").notNull(),
  months: text("months").notNull(),
  rating: integer("rating").notNull().default(5),
  reviews: integer("reviews").notNull().default(0),
  promo: integer("promo"),
  featured: integer("featured").notNull().default(0),
  privateOnDemand: integer("private_on_demand").notNull().default(0),
  highlights: text("highlights").notNull(),
  program: text("program").notNull(),
  included: text("included").notNull(),
  notIncluded: text("not_included").notNull(),
});

/** Grandes régions du Sahara algérien mises en avant. */
export const destinations = sqliteTable("destinations", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  tagline: text("tagline").notNull(),
  description: text("description").notNull(),
  image: text("image").notNull(),
  season: text("season").notNull(),
  bestFor: text("best_for").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
});

/** Avis clients affichés sur l'accueil. */
export const testimonials = sqliteTable("testimonials", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  city: text("city").notNull(),
  message: text("message").notNull(),
  rating: integer("rating").notNull().default(5),
  sortOrder: integer("sort_order").notNull().default(0),
});

/** Articles du blog / carnet de voyage. */
export const posts = sqliteTable("posts", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  image: text("image").notNull(),
  category: text("category").notNull(),
  author: text("author").notNull(),
  readMinutes: integer("read_minutes").notNull().default(4),
  publishedAt: integer("published_at", { mode: "timestamp" }).notNull(),
});

/** Demandes de contact et de devis envoyées depuis le site. */
export const requests = sqliteTable("requests", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  kind: text("kind").notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull().default(""),
  circuitSlug: text("circuit_slug").notNull().default(""),
  travelers: integer("travelers"),
  period: text("period").notNull().default(""),
  message: text("message").notNull().default(""),
  status: text("status").notNull().default("nouveau"),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
});
