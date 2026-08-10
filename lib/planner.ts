import type { Assessment, WeekPlan } from "./types";
export const SEMESTER_START = "2026-08-17T00:00:00";
export const ASSESSMENTS: Assessment[] = [
  { name: "Test 1", date: "2026-09-06T13:00:00", time: "13:00-15:00", venue: "233/G12, 230/G5", weight: "CA" },
  { name: "Test 2", date: "2026-10-04T13:00:00", time: "13:00-15:00", venue: "233/G12, 230/G5", weight: "CA" },
  { name: "Test 3", date: "2026-10-25T13:00:00", time: "13:00-15:00", venue: "233/G12, 230/G5", weight: "CA" },
  { name: "Special Test (1,2,3)", date: "2026-11-04T18:00:00", time: "18:00-20:00", venue: "TBA", weight: "CA rescue" }
];
export const TIMELINE: WeekPlan[] = [
  { week: "Week 1", dates: "17-23 Aug", focus: "Antiderivatives, FTC, start u-sub", topics: "00, 01" },
  { week: "Week 2", dates: "24-30 Aug", focus: "u-sub fluency, parts, partial fractions", topics: "01, 03, 04" },
  { week: "Week 3", dates: "31 Aug-6 Sep", focus: "Trig integrals + full revision of 00-02", topics: "02", milestone: "TEST 1 - Sun 06 Sep" },
  { week: "Week 4", dates: "7-13 Sep", focus: "Improper integrals, trig sub review", topics: "07, 02" },
  { week: "Week 5", dates: "14-20 Sep", focus: "Numerical integration + error bounds", topics: "05" },
  { week: "Week 6", dates: "21-27 Sep", focus: "Volumes: disks, washers, shells", topics: "06" },
  { week: "Week 7", dates: "28 Sep-4 Oct", focus: "Arc length, centroid + revision 03-06", topics: "06", milestone: "TEST 2 - Sun 04 Oct" },
  { week: "Week 8", dates: "5-11 Oct", focus: "L'Hopital & indeterminate forms", topics: "08" },
  { week: "Week 9", dates: "12-18 Oct", focus: "Sequences, geometric series, test toolbox", topics: "10" },
  { week: "Week 10", dates: "19-25 Oct", focus: "Series tests + revision 07-10", topics: "10", milestone: "TEST 3 - Sun 25 Oct" },
  { week: "Week 11", dates: "26 Oct-1 Nov", focus: "Power series: radius & endpoints", topics: "11", milestone: "SPECIAL - Wed 04 Nov" },
  { week: "Week 12", dates: "2-8 Nov", focus: "Taylor & Maclaurin, remainder bounds", topics: "09" },
  { week: "Week 13", dates: "9-15 Nov", focus: "Mixed problem sets, weak-topic surgery", topics: "all" },
  { week: "Week 14", dates: "16-22 Nov", focus: "Timed past papers; formula sheet memorized", topics: "all", milestone: "FINAL EXAM PREP" }
];
export const DEFAULT_GOALS: string[] = [
  "Run flashcards 00-02 until every card is 'Got it' twice",
  "Reproduce the chapter summaries for Topics 00-04 from memory",
  "Score 100% on quizzes 00-05 closed-book",
  "Memorize formula sheet sections 1-4 verbatim",
  "Do a timed 2-hour mock of Test 1 style questions",
  "Write out all 4 partial-fraction cases from memory"
];
