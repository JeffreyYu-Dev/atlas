import "dotenv/config";
import { defineConfig } from "drizzle-kit";

import * as dotenv from "dotenv";

dotenv.config({
  path: ".env.local",
});

export default defineConfig({
  out: "./drizzle",
  schema: "./src/database/schemas/*",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
