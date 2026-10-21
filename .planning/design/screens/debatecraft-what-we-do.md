# DebateCraft What We Do screen

Status: Proposed for combined approval; no application implementation started.
Specification: ../../specs/debatecraft-program-pages.md
Source evidence: ../../../.firecrawl/hejl-pages-reference/DESIGN.md

## Design direction

Follow the source What We Do page's centered statement, large pale disk, alternating numbered editorial sections and typographic strips. Use DebateCraft's blue-and-white palette and original class photographs. Three real offerings replace the source's four philanthropy areas. Keep primary explanatory text visible; disclosures are reserved for detailed curriculum or track comparisons.

Shared colors: page `#F2F7FE`, white hero disk/cards, supporting blue `#EAF0F7` / `#E2EFFA`, main text `#0A0A0A`, muted text `#737373`. Keep the existing dark footer and supplied DebateCraft branding. Use current PP Editorial New/Inter fonts and source container/grid rules.

## Ordered screen and proposed copy

### 1. Hero

Eyebrow: What We Do.

Proposed H1: **Clear thinking. Confident voices. New possibilities.**

Supporting line: “Debate, public speaking and bioethics education for students, school teams and holiday cohorts.”

Use two or three inline circular crops from existing class photographs among balanced serif lines, with one italic phrase. Keep a real, accessible H1 rather than copying the source's hidden-heading structure. Below the hero, show three ordinary anchor links: Schools / Holiday Programs / Bioethics; these navigate to content rather than hide/filter sections.

Source typography: hero 6.4rem desktop / 4rem mobile, within the existing root scaling. Use the smaller What We Do hero treatment; do not reuse How We Work's larger hero geometry unchanged.

### 2. / 01 — Schools

Heading: **Build a team that keeps growing.**

Proposed introduction: “We help schools establish shared foundations, develop junior squads and prepare for competition, with a curriculum and progress records the next cohort can build on.”

Visible content:

- Existing teams and new debate programs; align to cohort readiness, timetable, staff capacity and target competitions.
- Argument construction, rebuttal, role rotation, practice rounds and specific post-round feedback.
- Attendance, skill checkpoints and next steps that school leads can review.
- Online delivery and a school contact agreed before launch; geography can mention Hong Kong, Malaysia and Singapore as the archived program's intended regions without claiming current partners.

CTA: **How school training works** → `/pages/how-we-work.html#schools`.
Secondary action: **Discuss your school** → existing school-inquiry email.

Desktop: text left / photograph right. Candidate image: `Image7.png` (argument-building lesson), with a neutral caption. Do not use school logos or partner claims as decoration.

### 3. / 02 — Holiday Programs

Heading: **Make room for deeper practice.**

Proposed introduction: “Seasonal small-group courses give students time to build arguments, practise speaking and work through debate rounds with focused feedback.”

Keep the offer anchored to the documented seasonal online-cohort model. Do not advertise residential camps, daily intensives, winter/Easter sessions or new enrollment dates without facts supporting them.

Use a compact course comparison beneath the introduction, visually subordinate to the three main page sections. Its five rows/disclosures cover:

| Track | Specific source facts to preserve |
| --- | --- |
| Introduction to Debate | Ages 9+, beginners, 13 sessions, eight students; PEEL and mock debates |
| Intermediate Debate | Bridge from Level 1 or limited experience; rebuttal and motion analysis; maximum ten |
| WSDC Mastery | Ages 13+, 2+ years; ten two-hour sessions; maximum ten |
| BP Competitive Track | Ages 13+, 2+ years; ten two-hour sessions; maximum eight |
| Advanced Seminar | Ages 15+, 5+ years and tournament experience; advanced analysis and weighing |

Label logistics as the documented course format, not a promise that every track is open for the next holiday. General availability text: **Ask about the next cohort and timetable.** Do not show the old Summer 2026 timetable or a new countdown.

CTA: **How holiday cohorts work** → `/pages/how-we-work.html#holiday`.
Secondary action: **Ask about the next cohort** → email; use a published student-interest form only after its current purpose is checked.

Desktop: photograph left / text right. Candidate image: `Image3.png` (timed-speaking exercise), with a neutral caption.

### 4. / 03 — Bioethics

Heading: **Explore the choices behind scientific progress.**

Proposed introduction: “Students examine gene editing, AI in healthcare and scientific responsibility, then turn discussion into evidence-based writing and a final project.”

Visible facts: **Ages 13+ · ten one-hour sessions · maximum ten students · free student group class**.

Four compact curriculum disclosures preserve the course's units and lesson detail:

1. Biology and genetics: cells, DNA, inheritance, experimental design and embryo-testing discussion.
2. Bioethics history: scientific responsibility and the historical misuse of research.
3. Modern questions: CRISPR, gene therapy and AI in healthcare.
4. Project work: proposal, optional schedule-dependent mentoring, writing and presentation; parents may attend the final presentation.

CTA: **How bioethics learning works** → `/pages/how-we-work.html#bioethics`.
Secondary action: **Register student interest**, using a currently appropriate destination.

Desktop: text left / photograph right. Candidate image: `Image2.jpeg`, captioned “Live online discussion” rather than claiming a specific bioethics class without photo provenance.

### 5. Closing strip and contact

Use the source's oversized, gently moving typographic strip with real learning themes: “Reason / Speak / Question / Reflect”. Keep it decorative and stop movement under reduced motion; no Hejl program labels or placeholders.

Follow with a compact white contact panel: **Find the right starting point.** Two links: school inquiry and student interest. Do not turn the page into a long application form.

## Responsive and accessibility rules

- Source desktop alternating rows use the 20-column inner grid; mobile puts text before imagery in all three sections. Do not preserve the desktop reversed DOM reading order on mobile.
- Retain the source's wide desktop image treatment (declared ratio 1.578) and portrait mobile treatment (.823) where the supplied image supports a useful crop. Review faces and instructional content; a deliberate contain/crop adjustment is a documented adaptation.
- Reference row gaps: 28.4rem desktop / 9.6rem mobile. Titles are 6.4rem desktop / 3.6rem mobile, with body gap 8rem desktop / 2.4rem mobile. Preserve visual rhythm while accommodating the longer track/curriculum details without clipping them.
- Course comparisons and curriculum disclosures use native accessible controls, accurate expanded state, visible focus and readable open content. Do not hide essential eligibility or availability caveats inside a collapsed row.
- Each anchored section has a stable ID and enough scroll margin for the fixed header. Decorative paths and disks ignore pointer events.

## Visual verification

Inspect 1440×1000, 390×844, 900px and 1920px widths; verify all three sections, course/curriculum detail states, anchors, CTA destinations and reduced motion. Compare geometry against the local What We Do captures, while documenting changed copy, imagery, content length and palette.
