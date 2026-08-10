import createMDX from "fumadocs-mdx/config";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

/** @type {import('next').NextConfig} */
const nextConfig = { reactStrictMode: true };
const withMDX = createMDX({
  rootContentPath: "./content/docs",
  mdxOptions: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex]
  }
});

export default withMDX(nextConfig);
