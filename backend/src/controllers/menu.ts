import { Hono } from "hono";

import db from "../database/db";

// import { menuItemTable } from "../database/schemas/menuItems";
import { categories } from "../database/schemas/categories";
import { items } from "../database/schemas";

const app = new Hono();

app.get("/", async (c) => {
  const categoryItems = await db.query.categories.findMany({
    with: {
      items: true,
    },
  });
  return c.json({ menu: categoryItems }, 200);
});

// testing purposes must use some client
app.get("/a", async (c) => {
  const typesOfPasta = [
    "Penne",
    "Fettuccine",
    "Lasagna",
    "Ravioli",
    "Spaghetti",
    "Farfalle",
    "Linguine",
    "Gnocchi",
  ];

  const typesOfPizza = [
    "New York",
    "Deep Dish",
    "Neopolitan",
    "Margherita",
    "Hawaiian",
  ];

  // insert pasta category
  const pasta = await db
    .insert(categories)
    .values({
      category: "pasta",
    })
    .returning({
      id: categories.category,
    });

  // insert pasta category
  const pizza = await db
    .insert(categories)
    .values({
      category: "pizza",
    })
    .returning({
      id: categories.category,
    });

  typesOfPasta.forEach(
    async (item) =>
      await db.insert(items).values({
        price: "10.0",
        category: pasta[0].id,
        name: item,
      })
  );

  typesOfPizza.forEach(
    async (item) =>
      await db.insert(items).values({
        price: "10.0",
        category: pizza[0].id,
        name: item,
      })
  );

  return c.status(200);
});

export default app;
