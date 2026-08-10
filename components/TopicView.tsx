import type { Topic } from "../lib/types";
import type { ComponentType } from "react";

/* Notes are deliberately learning-first. Interactive recall tools live on
   the Review route so a long chapter cannot bury the actual explanation. */
export default function TopicView({ t, Body }: { t: Topic; Body?: ComponentType<any> }) {
  var n = Number(t.num);
  var assessment = n <= 2 ? "Test 1" : n <= 6 ? "Test 2" : n <= 10 ? "Test 3" : "Final exam preparation";
  var assessmentNote = n <= 2 ? "Prioritise antiderivatives, substitution and trig fluency before the first test." : n <= 6 ? "Build technique choice and setup speed; practise mixed integration and applications." : n <= 10 ? "Expect classification, convergence and limit decisions under time pressure." : "Use this topic for cumulative revision and timed mixed papers.";
  return (
    <>
      <p className="eyebrow">Topic {t.num} · {t.week}</p>
      <h1>{t.title}</h1>
      <p className="lead">{t.blurb}</p>
      <div className="exam-rail"><span className="chip bad">Assessment track</span><strong>{assessment}</strong><span>{assessmentNote}</span></div>
      <section id="overview" className="mdx-content"><h2>Guided notes</h2><p className="section-lead">Move in order: name the idea, state the rule, work one example, then try the variation before moving on.</p>{Body ? <Body /> : <p className="hint">This topic's MDX notes are not available yet.</p>}</section>
      <section id="summary"><h2>Chapter summary</h2><div className="chapter-summary"><span className="chip ink">The chapter in brief</span><p className="summary-statement">{t.cornell.summary}</p><h3>Rules and decisions to remember</h3><ul className="summary-points">{t.cornell.cues.map(function (item, index) { return <li key={index}><strong>{item.cue}</strong><span>{item.note}</span></li>; })}</ul></div></section>
      <div className="next-step card"><span className="chip grn">Next step</span><h3>Close the notes and write the questions</h3><p>Use the sidebar when you are ready for review tools. For now, test whether you can reproduce the method and explain each line without looking back.</p><a className="btn sm" href={"/topics/" + t.slug + "/questions"}>Open written questions →</a></div>
    </>
  );
}
