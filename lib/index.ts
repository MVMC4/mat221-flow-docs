import { T_FOUNDATIONS } from "./topics-foundations";
import { T_TECHNIQUES } from "./topics-techniques";
import { T_APPLICATIONS } from "./topics-applications";
import { T_SERIES } from "./topics-series";
import { EXTRAS } from "./topics-extra";
import type { Topic, Extra } from "./types";

function merge(base: Topic, ex?: Extra): Topic {
  if (!ex) return base;
  return {
    ...base,
    blocks: base.blocks.concat(ex.blocks || []),
    cornell: { cues: base.cornell.cues.concat(ex.cues || []), summary: base.cornell.summary },
    cards: base.cards.concat(ex.cards || []),
    quiz: base.quiz.concat(ex.quiz || []),
    traps: base.traps.concat(ex.traps || [])
  };
}
const DEPENDENCY_ORDER = ["foundations", "substitution", "trig", "parts", "partials", "numerical", "applications", "improper", "lhopital", "sequences-series", "power-series", "taylor"];
const ALL_TOPICS = ([] as Topic[]).concat(T_FOUNDATIONS, T_TECHNIQUES, T_APPLICATIONS, T_SERIES);

export const TOPICS: Topic[] = DEPENDENCY_ORDER
  .map(function (slug) { return ALL_TOPICS.find(function (t) { return t.slug === slug; }); })
  .filter(function (t): t is Topic { return Boolean(t); })
  .map(function (t) { return merge(t, EXTRAS[t.slug]); });
