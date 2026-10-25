# DebateCraft Schools page

Date: 2026-10-21
Status: Approved, implemented and verified on 2026-10-21.
User request: “Make sure American spelling and make a separate school page.”

## Outcome

Create a full, independently accessible school-program page at `/pages/schools.html`, using the existing React/Vite stack, shared blue/white editorial design and documented DebateCraft school content. Schools receive one clear destination for the offer, progression, delivery, staff records and an email inquiry.

American spelling has already been updated in active content: Analyze, Practice, fulfillment, toward and Advisor. Proper names, source evidence, archived files and Adrian Chan’s exact supplied achievement wording remain intact. These copy edits passed the existing 60 tests and production build.

## Proposed public behavior

1. Add Schools between How We Work and Resources in desktop and mobile navigation. Preserve the first three labels and all existing destinations.
2. Give `links.schools` its literal meaning: `/pages/schools.html`. Introduce `links.method` for `/pages/how-we-work.html`, updating the existing How We Work navigation and Who We Are CTA.
3. What We Do keeps a brief Schools offering and a primary “Explore school programs” link to the new page. Its separate link to How We Work#schools can remain for the overall method.
4. How We Work#schools remains a valid fragment with a short explanation and a “Explore the school pathway” link to `/pages/schools.html#pathway`. Move the detailed five-stage list to Schools so one page owns it.
5. Update `/pages/training-pathway.html` to redirect to Schools#pathway and `/pages/partnership.html` to Schools#inquiries. Preserve applicable query strings and keep the existing What We Do#schools and How We Work#schools summaries accessible.
6. School inquiry links open `mailto:info@debatecraft.org?subject=School%20debate%20program`. No Google Forms, other registration forms, iframe or form backend is added. No email is sent during implementation or verification.
7. Supply a real Vite HTML entry, page title “Schools | DebateCraft,” unique description, canonical/Open Graph/Twitter metadata and canonical sitemap entry. Direct visits and reloads work on the production preview.

## Content and factual sources

- `legacy/scripts/reactPages.js`: TrainingPathwayPage, PartnershipPage and school inquiry copy, inspected on 2026-10-21.
- `src/programContent.js`: existing shared schoolStages; keep the same source of truth for timing and outputs.
- Current English roster at `public/data/team_members.json` remains authoritative if a Team link is needed. Do not duplicate roster biographies or alter membership.
- Existing classroom images in `public/media/debatecraft/`, with original filenames and neutral captions. An image does not establish a particular school partnership.

School audience: leads setting up or developing debate teams. Discuss cohort readiness, staff capacity, calendar and target formats/events. Regional planning may refer to Hong Kong, Singapore and Malaysia as documented target contexts, without implying existing partnerships.

Preserve the documented framework, presented as adaptable planning windows:

| Stage | Window | Work and evidence |
| --- | --- | --- |
| Baseline audit | Weeks 1–2 | Cohort size, age/experience, calendar, goals and staff capacity; placement bands, objectives and coach responsibilities. |
| Shared foundations | 8–12 weeks | Analysis, case construction, rebuttal, delivery and feedback; complete speeches and visible skill records. |
| Junior squad | One term | Readiness-based grouping, role rotation, timed preparation and round review; junior team, reserve bench and emerging leaders. |
| Competition cycle | 6–10 weeks per event | Format, speaker roles, preparation and tournament calendar; selection evidence, preparation plan and post-round actions. |
| Institutional handover | Annual review | Retain curriculum, assessment and staff checkpoints so the next cohort can build on previous work. |

Delivery: live online groups of 5–10 students; documented weekly or every-other-week two-hour sessions, tailored and confirmed with each school. Confirm time zone, exam dates, platform and school contact. Keep student group-class formats separate from school arrangements. School pricing, availability and outcomes are discussed by inquiry; no fixed price, current opening, partner list or guaranteed competitive outcome is invented.

Staff records: attendance, skill checkpoints, round notes, student next steps and a competition-preparation plan. Inquiry checklist: cohort size/year groups; experience; formats; school calendar/weekly availability; target competitions; staff contact/assessment needs.

## Acceptance criteria

- Schools is a genuine full page, reachable from desktop/mobile navigation and both program pages; its direct production URL and reload work.
- Five stage windows and source-supported outputs appear clearly, with adaptable timing language.
- Delivery arrangements, staff visibility, flexible progression and school inquiry checklist are present in American English.
- All school/student inquiry destinations remain email links; no form is introduced.
- What We Do and How We Work retain clear school entry points; both existing #schools fragments work and the latter no longer duplicates the full five-stage list.
- Two legacy school URLs reach the appropriate new page/section and preserve query strings. Other aliases and canonical pages still work.
- Shared pale blue/white colors, fonts, layout widths, image treatment and reduced-motion behavior remain consistent. Native links/buttons have visible focus; content does not overflow at 390, 900, 1440 or 1920px.
- Focused TDD cycles protect new routing/navigation and revised cross-page/compatibility behavior. Full tests, build and relevant browser checks pass; screenshots and source review are recorded.

## Affected areas and boundaries

Add Schools React component, HTML entry and narrowly scoped school CSS/content if needed. Update App route table, centralized links/navigation, What We Do/How We Work school summaries, compatibility HTML, Vite inputs, sitemap, tests, browser checks and README/verification documentation. Reuse existing EditorialPage and schoolStages rather than adding a dependency or generic page framework.

Preserve unrelated work, all other offerings, current team details, Contact/Resources functionality and archived/source evidence. No commit, deployment, message, form submission, new enrollment backend or pricing change is included.

## Approval

One approval covers this specification, the screen design and implementation plan through build, testing, visual repair and review. No subsequent phase approval is needed within this scope.

## Completion evidence

Implemented and verified after the user approved the plan. The dedicated page, navigation, school summaries, compatibility URLs, email-only actions and American spelling are complete. All 65 automated tests, production build and four-viewport browser checks passed. See `.planning/verification/debatecraft-schools-page.md` for checks and screenshots. No deployment or external submission.
