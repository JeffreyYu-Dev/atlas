CREATE TABLE "items" (
	"category_id" integer NOT NULL,
	"item_id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "items_item_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(50) NOT NULL,
	"price" numeric NOT NULL,
	"description" varchar(200),
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
DROP TABLE "menu_items" CASCADE;