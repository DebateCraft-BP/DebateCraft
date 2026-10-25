# DebateCraft program pages implementation plan

Status: Complete and verified on 2026-10-21.
Date: 2026-10-20
Specification: ../specs/debatecraft-program-pages.md
Designs: ../design/screens/debatecraft-who-we-are.md, ../design/screens/debatecraft-what-we-do.md and ../design/screens/debatecraft-how-we-work.md

## Decisions proposed for approval

- Build What We Do as three offering sections: Schools, Holiday Programs, Bioethics.
- Build How We Work as the teaching method plus three distinct delivery pathways and FAQs.
- Follow the two captured Hejl layouts using DebateCraft copy, imagery and the approved blue/white palette.
- Use Who We Are / What We Do / How We Work in shared navigation, per the subsequent user instruction; these labels are now implemented against the existing destinations. Connect the latter two to the canonical new pages during this feature and keep Schools prominent within both pages.
- Use evergreen holiday information and inquiry actions because the archived Summer 2026 schedule is past. Do not invent upcoming cohorts.
- Keep the source-like gallery and disclosures; replace unrelated video content with program-specific outcomes.

## 1. Content and link preparation

Map the source course, schools and biology text into a focused content module, preserving facts and eliminating repeated descriptions between pages. Keep explicit source comments/records for eligibility, durations, caps and school-stage windows. Use course-specific facts rather than inconsistent generic FAQ summaries.

Inspect the existing student-interest form's public purpose without submitting it. If its intake is season-specific or unavailable, use the existing email inquiry destination with honest availability wording. This fallback is part of the proposed scope, not a reason to invent dates or stop unrelated work.

Inventory only the existing DebateCraft photographs needed for the two pages; preserve their filenames and use neutral captions. Do not download Hejl photographs, media or runtime code. No new dependencies are expected.

## 2. Route and navigation tracer bullet — TDD

Write one acceptance test for reaching What We Do through shared navigation/homepage CTA, confirm its failure, then implement the smallest route/HTML entry/navigation change to pass it. Repeat for How We Work and the return links to Home/Team.

Use a small explicit route table for the growing set of native React pages, rather than introducing a router dependency. Include correct title/canonical metadata and real Vite HTML inputs. Add each approved compatibility URL in a focused test/build check, with direct visits/reloads landing on the correct canonical page and section.

## 3. What We Do — incremental delivery

Build the statement hero, three jump links and the three numbered editorial sections using source grid, typography and background patterns. Reuse a small editorial-row module where the same interface is actually used. Keep DOM reading order meaningful; alternate desktop placement in CSS and reset text-first on mobile.

In successive red/green cycles, verify section discovery and cross-page anchors, course-detail disclosure behavior, bioethics curriculum disclosure behavior and audience-specific CTA destinations. Preserve documented course facts in focused content acceptance checks without testing private helper functions. Static prose and CSS do not need artificial unit tests.

## 4. How We Work — incremental delivery

Create the larger hero, three-slide learning gallery, four method cards, three approach panels, outcomes section and FAQ. Share only modules needed by real call sites; avoid a generic CMS/schema or new component framework.

Use separate red/green cycles for gallery Next/Previous updating image/caption/count, keyboard operation, independent FAQ expansion/collapse and hidden-answer focus behavior. Do not write every test before every implementation. Add the school-stage output checks and three-pathway deep links through public page interfaces.

Apply source sticky-image treatment and subtle card tilt only where they remain readable in the actual layouts. Handle ancestor overflow deliberately; decorative disks, curves and moving strips must not intercept input. Omit video controls because no DebateCraft video is supplied for this feature.

## 5. Shared polish and regressions

Use the same `#F2F7FE` page background and white surfaces as Home and Team. Match the captured font hierarchy, width rules, rounded imagery, desktop/mobile crop differences, card treatment and FAQ dividers. Keep useful content visible with reduced motion and support keyboard navigation/focus indicators.

Update relevant homepage program links to the new page/anchors without changing its four program cards or Team roster. Preserve the existing Team filters, biographies, corrected group placement and retired-member restrictions.

## 6. Production and browser verification

- Run the full existing Vitest suite plus the new page tests and a production build.
- Confirm both canonical pages and all four aliases load from the built preview on direct visits and reloads; check hash destinations and canonical metadata.
- Run homepage/Team browser regressions, plus new page checks at 1440×1000, 390×844, 900px and 1920px widths.
- Check gallery states, multi-open FAQ/disclosure states, hidden content focus, section anchors under the fixed header, email/interest destinations, image/font loading, console errors, overflow, reduced motion and sticky layout.
- Compare screenshots with the saved reference geometry; inspect actual pixels and repair clipping, bad crops, wrapping and layout inconsistencies. Record deliberate palette/content differences rather than promising whole-page pixel identity.

## 7. Review and delivery

Review changed files against the approved acceptance criteria, repair in-scope findings and rerun affected checks. Save the verification report and representative desktop/mobile screenshots; update runtime, navigation and content-editing documentation. Deliver working local previews for both pages. No commit, deployment, form submission or inquiry email is included.

## Verification priorities for approval

Highest priority: factual separation of all three offerings; no stale holiday dates; course-specific eligibility/logistics; correct school/student actions; direct routes/aliases; gallery controls; independent disclosures and keyboard access; Home/Team regressions. The remaining layout work is checked through structural review and browser screenshots.

The user's AGENTS.md requires one approval of the combined specification/design/plan before substantial implementation. Approval covers the full sequence through verification and review, without further phase-by-phase permission prompts.

## Approved scope extension — 2026-10-21

The user explicitly requested three full pages: Who We Are, What We Do and How We Work. Add `/pages/who-we-are.html` with mission, identity, values and a Team link, using the captured Who We Are design. Connect all three header links to full pages; preserve Contact and Resources. Add `/pages/about.html` compatibility entry. Rename the Team filter/heading to Alumni, preserve text-only noninteractive entries, and assign Operations Team Member to every missing title while preserving existing titles and roster membership.

Verification: shared navigation, direct built-page entry/reload, metadata/sitemap, three program anchors, gallery keyboard controls, independent disclosures, Home/Team/Contact/Resources regressions, desktop/mobile screenshots. No deployment or form submission.

## Execution result

All seven stages completed. Added the three canonical full pages, five static compatibility redirects, shared navigation/current-page state, metadata and sitemap entries. Applied the Alumni/title corrections without altering membership or profile restrictions. Used email-only inquiry actions per the user’s follow-up. Contact and Resources remain intact.

Incremental failures were observed before the matching navigation, page-routing, disclosure, gallery, FAQ, Alumni and missing-role implementations. Production browser checks also exposed an initial React fragment-scroll issue; section scrolling now waits for mounting and local fonts. Reveal animations respect changes to reduced-motion preference.

Validation: 60 tests in 10 files; production build; Home/Team/new-page browser suite at 390, 900, 1440 and 1920 pixels; final new-page rerun after FAQ visual polish; screenshot inspection; source review and whitespace checks. Details: `../verification/debatecraft-program-pages.md`. No deployment, commit, form submission or inquiry was performed.
