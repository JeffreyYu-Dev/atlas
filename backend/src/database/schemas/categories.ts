import { relations } from "drizzle-orm";
import { integer, pgTable, varchar, timestamp } from "drizzle-orm/pg-core";
import { items } from "./items";

export const categories = pgTable("categories", {
  category: varchar("category", { length: 50 }).notNull().primaryKey().unique(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});

export const categoryRelations = relations(categories, ({ many }) => ({
  items: many(items),
}));
