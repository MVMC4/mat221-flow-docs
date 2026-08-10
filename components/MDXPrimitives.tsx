import type { ReactNode } from "react";
import { getRepairTopic, type WorkedExample } from "../lib/content-model";
import { IM } from "../lib/mathx";
import Quiz from "./Quiz";

export function Callout({ label = "Note", tone = "why", children }: { label?: string; tone?: "why" | "trap" | "check"; children: ReactNode }) {
  var className = tone === "trap" ? "trap" : tone === "check" ? "solution-check" : "why";
  return <aside className={className}><strong>{label}</strong><div>{children}</div></aside>;
}

export function WorkedExampleSet({ topic, from = 0, count = 2 }: { topic: string; from?: number; count?: number }) {
  var model = getRepairTopic(topic);
  var examples: WorkedExample[] = model ? model.examples.slice(from, from + count) : [];
  return (
    <div className="mdx-example-set" aria-label={"Worked examples " + (from + 1) + " to " + (from + examples.length)}>
      {examples.map(function (example, index) {
        var number = from + index + 1;
        return (
          <article className="integrated-example" key={example.id}>
            <div className="integrated-example-head"><span className="chip grn">Worked example {number}</span><strong>{example.classification}</strong></div>
            <h4>{IM(example.source_title)}</h4>
            <p><strong>Choose the method:</strong> {example.method_decision}</p>
            <p className="example-rule"><strong>Rule and conditions:</strong> {example.rule_and_conditions}</p>
            <ol className="steps">{example.worked_steps.slice(1).map(function (step, stepIndex) { return <li key={stepIndex}>{IM(step)}</li>; })}</ol>
            <div className="solution-check"><strong>Quick check:</strong> {example.verification}</div>
            <Callout label="Try the variation" tone="why">{example.transfer_variant}</Callout>
            <p className="hint"><strong>Common error:</strong> {example.common_wrong_path}</p>
          </article>
        );
      })}
    </div>
  );
}

export function CheckpointQuiz({ topic, from = 0, count = 2 }: { topic: string; from?: number; count?: number }) {
  var model = getRepairTopic(topic);
  var questions = model ? model.quiz.slice(from, from + count) : [];
  if (!questions.length) return null;
  return (
    <section className="inline-checkpoint" aria-label="Inline checkpoint">
      <div className="inline-checkpoint-head">
        <span className="chip lav">Pause and check</span>
        <strong>Can you choose the next move?</strong>
      </div>
      <p className="hint">Answer these before continuing. The explanation appears immediately so the reasoning stays attached to the note.</p>
      <Quiz questions={questions} />
    </section>
  );
}
