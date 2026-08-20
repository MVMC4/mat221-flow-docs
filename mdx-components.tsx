import type { MDXComponents } from "mdx/types";
import { Callout, CheckpointQuiz, Concept, LessonIntro, Theorem, WorkedExample, WorkedExampleSet } from "./components/MDXPrimitives";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return { ...components, Callout, CheckpointQuiz, Concept, LessonIntro, Theorem, WorkedExample, WorkedExampleSet };
}
