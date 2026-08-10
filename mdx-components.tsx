import type { MDXComponents } from "mdx/types";
import { Callout, CheckpointQuiz, WorkedExampleSet } from "./components/MDXPrimitives";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return { ...components, Callout, CheckpointQuiz, WorkedExampleSet };
}
