import { Hono } from "hono";
import menu from "./controllers/menu";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.route("/menu", menu);

export default {
  port: process.env.PORT || 4000,
  fetch: app.fetch,
};
