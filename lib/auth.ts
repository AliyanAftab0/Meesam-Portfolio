import { betterAuth } from "better-auth";
import { neon } from "@neondatabase/serverless";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined");
}

export const auth = betterAuth({
    database: {
        provider: "postgresql",
        url: process.env.DATABASE_URL,
    },
    emailAndPassword: {
        enabled: true,
    },
});
