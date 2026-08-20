import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const out = path.join(root, ".next", "server", "app", "topics");
const slugs = ["foundations", "substitution", "partials", "parts", "reduction-formulas", "trig", "trig-substitution", "weierstrass", "improper", "numerical", "applications", "lhopital", "sequences-series", "power-series", "taylor"];
const failures = [];

for (const slug of slugs) {
  const file = path.join(out, `${slug}.html`);
  if (!fs.existsSync(file)) { failures.push(`${slug}: rendered HTML is missing`); continue; }
  const html = fs.readFileSync(file, "utf8");
  if (html.includes("katex-html") || html.includes("katex-mathml")) failures.push(`${slug}: a duplicated KaTeX text layer remains`);
  if (!html.includes("<math")) failures.push(`${slug}: native MathML output is missing`);
  const numbers = [...html.matchAll(/data-worked-example="(\d+)"/g)].map((match) => Number(match[1]));
  const unique = [...new Set(numbers)];
  if (unique.join(",") !== "1,2,3,4,5,6,7,8") failures.push(`${slug}: rendered worked-example sequence is ${unique.join(",") || "missing"}`);
}

if (failures.length) {
  console.error("Rendered-math audit failed:\n- " + failures.join("\n- "));
  process.exit(1);
}

console.log("Rendered-math audit passed: 15 lessons use one selectable MathML layer and examples 1-8.");
