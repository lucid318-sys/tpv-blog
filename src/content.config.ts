import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    date: z.string(),
    category: z.enum(["chwideuk", "yangdo", "jeungyeo", "sangsok", "etc"]),
    type: z.enum(["column", "case"]).optional(),
    tags: z.array(z.string()).optional(),
    summary: z.string(),
  }),
});

export const collections = { blog };
