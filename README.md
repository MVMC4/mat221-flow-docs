# MAT 221 Flow Docs

A responsive Calculus I study companion for MAT 221 at the University of Botswana. It combines guided chapter notes, worked examples, chapter summaries, written questions, quizzes, flashcards, exam practice and revision tools.

## Features

- 12 calculus chapters with MDX notes and rendered mathematics
- Self-contained, exam-style written questions with marks and revealed solutions
- Checkpoint quizzes, active-recall flashcards and common exam traps
- Printable formula sheet, semester planner, goals, countdowns and Pomodoro timer
- Responsive full-screen mobile navigation
- Open Graph sharing image, sitemap, robots file and web-app manifest

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Validate

```bash
npm audit --omit=dev
npm run typecheck
npm run build
```

## Stack

- Next.js 16 and React 19
- TypeScript
- Fumadocs MDX with KaTeX and MathJax
- Plain responsive CSS and Lucide icons

Most routes are statically generated. Interactive features such as flashcards, quizzes, timers, goals and mobile navigation are isolated client components. Set `NEXT_PUBLIC_SITE_URL` when deploying outside Vercel; Vercel production URLs are detected automatically.
