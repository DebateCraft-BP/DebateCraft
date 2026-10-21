# DebateCraft How We Work screen

Status: Proposed for combined approval; no application implementation started.
Specification: ../../specs/debatecraft-program-pages.md
Source evidence: ../../../.firecrawl/hejl-pages-reference/DESIGN.md

## Design direction

Use the source How We Work page's larger statement hero, captioned image gallery, four white cards, image-plus-tilted-panel approach section and thin-rule FAQs. Keep DebateCraft's shared pale-blue background, white surfaces, editorial serif, Inter body text and dark footer. Replace the source's foundation video with useful student outcomes and no play button.

## Ordered screen and proposed copy

### 1. Hero

Eyebrow: How We Work.

Proposed H1: **Learn by questioning. Improve through practice.**

Supporting line: “Small-group teaching, thoughtful feedback and a clear next step—for school teams, holiday learners and bioethics students.”

Use the source's large curved white/pale-blue backdrop and inline image bubbles. Preserve a real H1. Desktop hero uses the source's larger size-1 treatment (8.4rem under the current scaling); mobile uses 4rem. Make the learning process the focus rather than repeating the complete What We Do program descriptions.

### 2. Learning gallery

Three source-backed DebateCraft images, with neutral captions:

1. `Image2.jpeg` — Live online discussion.
2. `Image7.png` — Building a structured argument.
3. `Image3.png` — Timed speaking practice.

Use the reference's rounded image, caption, fraction counter and circular arrows. Default to slide one. Arrows change photograph, caption and counter together; no autoplay. Desktop crop follows the wide gallery surface; mobile follows the reference's taller composition when it keeps the image meaningful. Do not create fake school testimonials or imply these three photos prove three distinct program cohorts.

### 3. The DebateCraft Method — four cards

| Card | Proposed explanation |
| --- | --- |
| Analyse | Break down a question, examine assumptions and build a reasoned position. |
| Practise | Apply ideas through speaking exercises, debate rounds or structured case discussion. |
| Discuss | Listen carefully, test evidence and respond to another person's reasoning. |
| Reflect | Use specific feedback to revise the next speech, argument or piece of writing. |

Four columns desktop, one column mobile; white surfaces, source circular photo crops, padding and rounded corners. These are common learning habits, not a promise that every program uses identical timings or assessment.

### 4. Our Approach — three delivery panels

Title: **A clear path, shaped around the learner.**

Desktop: one existing classroom image on the left and three white panels on the right, using the reference's subtle -3° settled tilt. Mobile: image, then the three panels. Allow panel height to follow content; reduce tilt if it causes clipping or hurts readability. Source sticky-image behavior is an implementation target to verify against the current wrapper overflow.

**Schools — `#schools`**

Proposed lead: “Start with your school, not a generic workshop.”

Keep a concise visible summary of timetable, cohort, staff contact and competition goals, then a readable five-stage list:

| Stage | Source planning window | Evidence/output |
| --- | --- | --- |
| Baseline audit | Weeks 1–2 | Placement bands, objectives and coach responsibilities |
| Shared foundations | 8–12 weeks | Complete speeches and visible skill records |
| Junior squad | One term | Readiness-based groups, role rotation and student leadership |
| Competition cycle | 6–10 weeks per event | Selection evidence, preparation plan and post-round actions |
| Institutional handover | Annual review | Curriculum, assessment and staff checkpoints retained by the school |

Present these as the documented school-training framework to tailor with the school, not fixed dates or guaranteed results. Mention live online cohorts, progress records and staff visibility without imposing the school's two-hour rhythm on bioethics.

Action: **Discuss a school program** → school-inquiry email.

**Holiday Programs — `#holiday`**

Proposed lead: “Join at the right level. Practise with purpose.”

Flow: express interest → discuss age/experience/goals → agree the available cohort and timetable → live small-group teaching → drills/practice rounds and specific feedback → next-level guidance.

Distinguish track-specific caps and lesson lengths through a link back to What We Do `#holiday`. Do not promise current holiday dates, a guaranteed place, a daily-camp format or optional summer labs in an unconfirmed season.

Action: **Ask about the next cohort** → inquiry email or a verified evergreen student-interest destination.

**Bioethics — `#bioethics`**

Proposed lead: “Move from a scientific question to an informed position.”

Flow: establish scientific concepts → examine a dilemma through Harkness discussion → develop an evidence-based argument → draft a project/research or review paper → optional schedule-dependent mentoring → final panel presentation, with parents able to attend.

Visible facts: ages 13+, ten one-hour sessions, maximum ten students. Link to the four-unit curriculum on What We Do `#bioethics`. Do not promise publication, competition selection or external accreditation.

Action: **Register student interest**, using a checked current destination.

### 5. What students leave with

Use a calm, wide rounded section in the position of the reference video. Three concise outcome columns/cards, stacking on mobile:

- Schools: skill and attendance records, round notes, a competition-preparation plan and handover materials.
- Holiday students: structured speeches, practice-round experience and concrete next steps.
- Bioethics students: a developed written project and presentation experience.

Use real class imagery or text-only blue/white surfaces. No fake video poster, unsupported student work samples, invented testimonials or numerical outcome claims.

### 6. Frequently Asked Questions

Use the reference's curved decorative label, wide thin-rule rows, serif questions and small arrows. Keep a normal accessible section heading even if the decorative text follows a curve.

Proposed questions and answer boundaries:

1. **Are student group classes free?** Yes, according to the existing student program information; school arrangements are discussed separately without asserting an unverified pricing model.
2. **Which ages and experience levels are suitable?** Use course-specific criteria: beginners 9+; WSDC/BP 13+ with two years; advanced 15+ with five years; bioethics 13+.
3. **Are sessions online?** Existing delivery is live online, in small cohorts; class size and session length vary by track.
4. **When is the next holiday cohort?** Confirm availability and timetable by inquiry; no stale Summer 2026 dates or invented openings.
5. **How do I choose a debate level?** Share age, experience and goals for placement; link to the What We Do track comparison.
6. **What does a school need to provide?** Cohort size/year groups, experience, timetable, staff contact, target format/competitions and assessment needs.
7. **Do bioethics students need prior debate experience?** Do not invent a debate prerequisite; describe the science/medicine/ethics interest and age requirement, and invite an inquiry if suitability is uncertain.
8. **What progress or work can we expect?** Explain the program-specific outputs above without guaranteeing awards, grades, publication or selection.

Each disclosure operates independently; multiple answers can remain open, matching the source. Use real buttons, `aria-expanded`/`aria-controls`, keyboard support and non-focusable collapsed answers. Open/hover surfaces use the shared blues rather than the source pink/orange variants.

### 7. Closing action

Heading: **Start with a conversation.**

Separate **School inquiries** and **Student interest** actions. Keep the audience clear; avoid one ambiguous Apply button for schools, holiday cohorts and bioethics alike. Reuse the shared footer and consent module.

## Verification views

Check desktop/mobile hero differences, gallery states, long school-stage content, all three anchor targets, multi-open FAQs, CTA destinations and reduced motion at 1440×1000 and 390×844, then 900px and 1920px widths. Verify sticky imagery and clipped decoration do not hide content or block pointer interaction. Use original photo filenames and document intentional crop changes.
