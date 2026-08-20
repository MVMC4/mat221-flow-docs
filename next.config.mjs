import createMDX from "fumadocs-mdx/config";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import remarkWorkedExamples from "./lib/remark-worked-examples.mjs";

/** @type {import('next').NextConfig} */
const nextConfig = { reactStrictMode: true, agentRules: false };
const withMDX = createMDX({
  rootContentPath: "./content/docs",
  mdxOptions: {
    remarkPlugins: [remarkMath, remarkWorkedExamples],
    /* One DOM/text representation per authored formula. KaTeX's default
       htmlAndMathml output duplicates every expression when a learner copies
       or exports the page. Native MathML stays accessible and selectable
       without a second hidden copy. */
    rehypePlugins: [[rehypeKatex, { output: "mathml" }]]
  }
});

export default withMDX(nextConfig);
