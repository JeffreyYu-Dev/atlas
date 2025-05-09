CREATE TABLE "categories" (
	"category_id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "categories_category_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(50) NOT NULL,
	"created_at" timestamp,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "menu_items" (
	"category_id" integer NOT NULL,
	"item_id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "menu_items_item_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(50) NOT NULL,
	"price" numeric NOT NULL,
	"description" varchar(200),
	"created_at" timestamp,
	"updated_at" timestamp
);
--> statement-breakpoint
DROP TABLE "users" CASCADE;