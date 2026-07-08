import fs from "fs";
import path from "path";

const BLOG_DIR = path.resolve("src/content/blog");
const OUT = path.resolve("public/search-index.json");

const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md"));

const index = files.map((file) => {
  const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf-8");
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return null;

  const frontmatter = match[1];
  const body = match[2]
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/\*\*|__/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[|>-]+/g, " ")
    .replace(/\n+/g, " ")
    .trim();

  const get = (key) => {
    const m = frontmatter.match(new RegExp(`^${key}:\\s*"?(.+?)"?\\s*$`, "m"));
    return m ? m[1] : "";
  };

  const tagsMatch = frontmatter.match(/^tags:\s*\[([^\]]*)\]/m);
  const tags = tagsMatch
    ? tagsMatch[1].split(",").map((t) => t.trim().replace(/^"|"$/g, ""))
    : [];

  const slug = file.replace(/\.md$/, "");

  return {
    slug,
    title: get("title"),
    summary: get("summary"),
    category: get("category"),
    type: get("type") || null,
    tags,
    body,
  };
}).filter(Boolean);

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, JSON.stringify(index, null, 0), "utf-8");
console.log(`Search index: ${index.length} posts → ${OUT}`);
