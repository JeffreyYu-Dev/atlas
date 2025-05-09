import { relations } from "drizzle-orm";
import {
  integer,
  pgTable,
  varchar,
  decimal,
  timestamp,
} from "drizzle-orm/pg-core";
import { categories } from "./categories";

export const items = pgTable("items", {
  name: varchar("name", { length: 50 }).notNull().primaryKey().unique(),
  category: varchar("category", { length: 50 }).notNull(),
  price: decimal("price").notNull(),
  description: varchar("description", { length: 200 }),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});

export const itemRelations = relations(items, ({ one }) => ({
  category: one(categories, {
    fields: [items.category],
    references: [categories.category],
  }),
}));
