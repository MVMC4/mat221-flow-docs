import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const docsDir = path.join(root, "content", "docs");
const files = fs.readdirSync(docsDir).filter((name) => name.endsWith(".mdx")).sort();
const failures = [];

for (const file of files) {
  const text = fs.readFileSync(path.join(docsDir, file), "utf8");
  const slug = file.replace(/\.mdx$/, "");
  const required = ["<LessonIntro", "<Concept", "<Theorem", "<WorkedExampleSet", "<CheckpointQuiz"];
  for (const marker of required) {
    if (!text.toLowerCase().includes(marker.toLowerCase())) failures.push(`${slug}: missing ${marker}`);
  }
  if (!/common (mistakes|errors)/i.test(text)) failures.push(`${slug}: missing common mistakes`);
  if (/supplementary worked example/i.test(text)) failures.push(`${slug}: supplementary example label remains`);
  const tag = text.match(/<WorkedExampleSet[^>]+>/)?.[0] || "";
  const count = Number(tag.match(/count=\{(\d+)\}/)?.[1] || 0);
  const start = Number(tag.match(/numberStart=\{(\d+)\}/)?.[1] || 0);
  const authoredCount = (text.match(/^#{2,6}\s+(?:(?:worked|fully worked|second worked) example|worked approximation|example)(?:\s+\d+)?(?:\s*:|\s|$)/gim) || []).length;
  if (start !== authoredCount + 1) failures.push(`${slug}: data-driven examples start at ${start}, but ${authoredCount} authored examples require ${authoredCount + 1}`);
  if (!count || !start || start + count - 1 < 8) failures.push(`${slug}: worked-example sequence does not reach example 8`);
}

const primitives = fs.readFileSync(path.join(root, "components", "MDXPrimitives.tsx"), "utf8");
for (const capability of ["Learning objectives", "Required prior knowledge", "Purpose:", "difficulty", "consequences", "prerequisites", "data-worked-example"]) {
  if (!primitives.includes(capability)) failures.push(`components: missing ${capability} support`);
}

const flashCss = fs.readFileSync(path.join(root, "styles", "flashcards.css"), "utf8");
if (!/\.fc-scene\{[^}]*height:clamp\(/.test(flashCss) || !/\.fc-face\{[^}]*position:absolute/.test(flashCss) || !/\.fc-face\{[^}]*height:100%/.test(flashCss)) {
  failures.push("flashcards: prompt and answer do not share a stable fixed scene height");
}
if (!/overflow-anchor:none/.test(flashCss)) failures.push("flashcards: scroll anchoring is not disabled");

const flashcards = fs.readFileSync(path.join(root, "components", "Flashcards.tsx"), "utf8");
if (!flashcards.includes("fc-front") || !flashcards.includes("fc-back") || !flashcards.includes("inert=")) failures.push("flashcards: both accessible faces are not permanently mounted");
if (/typesetWhenMathJaxReady\(ref\.current\); \}, \[i, flip/.test(flashcards)) failures.push("flashcards: flipping still triggers MathJax");

const layout = fs.readFileSync(path.join(root, "app", "layout.tsx"), "utf8");
for (const tag of ["annotation", "semantics", "math"]) {
  if (!layout.includes(`\"${tag}\"`)) failures.push(`math pipeline: MathJax does not exclude KaTeX ${tag} nodes`);
}

const nextConfig = fs.readFileSync(path.join(root, "next.config.mjs"), "utf8");
if (!nextConfig.includes("remarkWorkedExamples")) failures.push("worked examples: authored MDX sections are not routed through the shared component");
if (!/rehypeKatex,\s*\{\s*output:\s*"mathml"/.test(nextConfig)) failures.push("math pipeline: static formulas still emit duplicate HTML and MathML text layers");

if (failures.length) {
  console.error("Lesson audit failed:\n- " + failures.join("\n- "));
  process.exit(1);
}

console.log(`Lesson audit passed: ${files.length} lessons have the shared structure and examples 1-8.`);
