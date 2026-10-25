# DebateCraft full editorial pages

Status: Implemented and verified on 2026-10-21; approved by the user’s request to implement the full pages.
Date: 2026-10-20

## Purpose

Create three English React/Vite pages using the captured Hejl Who We Are, What We Do and How We Work layouts, populated with DebateCraft's schools, holiday-program and bioethics information. Maintain the approved blue/white palette, local assets, shared header/footer and existing Team page behavior.

Who We Are introduces the mission, values and people behind DebateCraft. What We Do answers **what can I join or arrange?** How We Work answers **how will learning, feedback and progression happen?** Both give all three strands a clear place, with distinct school and student contact actions.

## Sources and factual boundaries

| Subject | Repository evidence | Treatment |
| --- | --- | --- |
| Schools | `legacy/scripts/reactPages.js`: `TrainingPathwayPage`, `PartnershipPage`, `ContactPage` | Preserve tailored online coaching, school-calendar alignment, baseline audit, foundations, junior squad, competition cycle, handover and staff records. Do not promise all schools receive identical timings or fee arrangements. |
| Holiday programs | Same file: `programs`, `OfferingsPage`, `CalendarPage`, FAQ; `legacy/pages/calendar.html` | Treat the archived Summer 2026 cohorts as evidence of the seasonal format. Do not present June–August 2026 dates, old cohort openings, Saturday Lab availability or enrollment counts as current. Proposed Holiday Programs wording is an evergreen adaptation of this material; no winter/Easter camp, new dates or residential program is asserted. |
| Debate levels | English `programs` array in the archived runtime | Preserve Level 1 ages 9+ / 13 sessions / cohort of eight; Level 2 bridge / up to ten; WSDC and BP ages 13+ / 2+ years / ten two-hour sessions, with their respective ten/eight caps; advanced seminar ages 15+ / 5+ years. Keep facts scoped to each track, not universal promises for every holiday cohort. |
| Bioethics | `BiologyPage` | Ages 13+, ten one-hour sessions, maximum ten students; biology/genetics, bioethics history, CRISPR/gene therapy and AI in healthcare, Harkness discussion, writing and final presentation. Preserve optional/schedule-dependent project mentoring. Do not add a debate-experience prerequisite from the more generic old FAQ. |
| Student class cost | Archived FAQ and biology/course descriptions | Describe student group classes as free. Do not extend that claim into an unverified school-service pricing policy. |
| Contacts | Archived `STUDENT_FORM_URL`, `SCHOOL_CONTACT_URL`; active `src/content.js` | School email: `info@debatecraft.org`. Student-interest form exists at `https://form.jotform.com/261003548067049`; inspect its current published purpose before linking it as an active intake. If it is season-specific or unavailable, use the existing email inquiry route and say dates/availability are confirmed by inquiry. Do not submit the form. |
| Photos | `public/media/debatecraft/` and `src/content.js` | Reuse the supplied class photographs with original filenames and neutral, supported captions. Do not claim an image proves a specific school partnership or bioethics session without evidence. |
| Visual system | `.firecrawl/hejl-pages-reference/DESIGN.md`, saved screenshots, CSS/HTML and metrics | Reuse measured layout patterns. Do not import Hejl branding, philanthropy claims, contacts, photos, runtime bundles or source video. |

The course-specific age and session data take precedence over inconsistent generic FAQ summaries. Old schedules are historical source material, not verified future offerings. No new schedule is required to publish the proposed evergreen pages.

## Page scope

### Who We Are — `/pages/who-we-are.html`

- Centered editorial hero with DebateCraft identity, existing classroom imagery and blue/white decoration.
- Mission, access to learning, four values and introduction to the people supporting the initiative.
- Keep the complete roster on its separate Team page and link to it; link to the program and delivery pages.
- Audience-specific email inquiry actions and shared footer.

### What We Do — `/pages/what-we-do.html`

- Centered statement hero, inline image bubbles and large white/pale-blue circular backdrop.
- Three jump links: Schools, Holiday Programs, Bioethics.
- Three numbered editorial sections in that order, alternating image/text on desktop and text-first on mobile.
- Schools: audience, delivery scope, school outcomes and CTA to its How We Work section, plus an inquiry email action.
- Holiday: seasonal small-group debate teaching, concise course-level comparison, course-specific requirements and an inquiry/interest action. No stale dates.
- Bioethics: science/ethics topics, four-unit outline, class facts and link to its delivery section and student-interest action.
- Restrained typographic strip using DebateCraft learning themes, followed by an audience-specific closing contact block and shared footer.

### How We Work — `/pages/how-we-work.html`

- Larger statement hero with the reference's pale curved backdrop and inline class imagery.
- Compact three-image learning gallery with actual DebateCraft photos, captions, count and previous/next controls; no autoplay or artificial five-slide padding.
- Four method cards: Analyse, Practise, Discuss, Reflect. Describe the common learning habits without imposing one identical class format on all strands.
- Our Approach: desktop image at left and three white text panels at right; stacked on mobile. Panels have stable IDs for Schools, Holiday Programs and Bioethics.
- Schools panel includes the five documented training stages and their outputs; holiday panel explains inquiry, placement, cohort teaching and progression; bioethics panel explains discussion, research/writing, optional mentoring and presentation.
- Replace the reference's unrelated foundation video with a static “What students leave with” section: school progress/handover records, debate speeches and actionable feedback, and bioethics writing/presentation work. No fake play control.
- Eight relevant FAQs with independently expandable answers, including cost, ages, class format, holiday availability, choosing a debate level, school setup, bioethics prerequisites and student outcomes.
- Two closing actions for school inquiries and student interest, then shared footer.

## Navigation and compatibility

- Header is Who We Are / What We Do / How We Work / Resources / Our Team / Contact. The first three now open their respective full canonical pages. Keep the separate Team, Resources and Contact pages.
- Homepage Explore Our Programs and relevant course links target What We Do or the matching anchor. Keep Meet Our Team unchanged.
- Preserve prominent Schools entry points through the first What We Do jump link, its first numbered section and school-specific contact actions on both pages.
- Add static-build-compatible aliases: `/pages/about.html` → Who We Are; `/pages/offerings.html` → What We Do; `/pages/biology.html` → What We Do `#bioethics`; `/pages/training-pathway.html` and `/pages/partnership.html` → How We Work `#schools`. Each must work on direct visit/reload without hosting-specific redirect configuration. Keep canonical metadata pointed at the new pages.
- School delivery anchors are `/pages/how-we-work.html#schools`, holiday `#holiday`, bioethics `#bioethics`. What We Do uses the same section-ID vocabulary. Keep separate course facts and each CTA's purpose explicit.
- Do not redirect the historical 2026 calendar to a fictional current schedule or migrate the full calendar in this feature.

## Acceptance criteria

1. All three new pages and the five compatibility URLs load directly from a production build, with correct canonical destinations and anchors.
2. Schools, Holiday Programs and Bioethics are equally discoverable on What We Do and have distinct delivery panels on How We Work. No fabricated fourth strand is added to match the source's count.
3. Course-specific ages, caps, session formats and school progression survive the migration. Old Summer 2026 dates are not shown as upcoming; no unsupported holiday dates or program availability are invented.
4. Source layouts retain their distinct hero sizing, desktop/mobile composition and imagery treatment; both pages use the existing `#F2F7FE` background, white surfaces, fonts and DebateCraft assets.
5. Gallery arrows update image/caption/count without autoplay and remain keyboard-accessible. Each FAQ toggles independently with accurate expanded state and no focusable hidden answer links.
6. Jump links, cross-page anchors, school email actions and the verified student-interest destination work. Decorative layers do not intercept clicks; reduced motion keeps all text available.
7. Home and Team regressions pass, including Team filters, corrected roster placement, retired restrictions and biographies.
8. Tests, production build, browser checks, visual inspection and review complete with recorded evidence. No publication or deployment is included.

## Affected areas and exclusions

Affected: new React page modules/content, small shared visual modules where actually reused, page-specific CSS, route selection, `src/content.js`, homepage CTA links, Vite HTML inputs, compatibility entry files, tests, browser checks and documentation.

Reuse installed React/Vite/native CSS and existing dependencies. Keep archived `legacy/` files intact. Do not rebuild unrelated Resources, guides, Contact, legal or Chinese pages; do not change Team membership, add a booking backend, send inquiries, submit third-party forms, commit or deploy.

## Approval scope

One approval covers this specification, the three screen designs and the ordered implementation plan through testing, visual repairs and review. Routine implementation decisions can be resolved within that scope. New live-cohort dates, a different holiday product or an enrollment/backend change requires specific supporting information and a scope decision.

## Approved scope extension — 2026-10-21

The user explicitly requested three full pages: Who We Are, What We Do and How We Work. Add `/pages/who-we-are.html` with mission, identity, values and a Team link, using the captured Who We Are design. Connect all three header links to full pages; preserve Contact and Resources. Add `/pages/about.html` compatibility entry. Rename the Team filter/heading to Alumni, preserve text-only noninteractive entries, and assign Operations Team Member to every missing title while preserving existing titles and roster membership.

Verification: shared navigation, direct built-page entry/reload, metadata/sitemap, three program anchors, gallery keyboard controls, independent disclosures, Home/Team/Contact/Resources regressions, desktop/mobile screenshots. No deployment or form submission.

## Final inquiry instruction

The user explicitly required email inquiries instead of Google Forms. All school/student actions on the three new pages use `mailto:info@debatecraft.org` with audience-specific subjects. No Google Forms, Jotform, registration form or iframe is linked or embedded in these pages. The existing Contact page remains a separate, preserved page. The old Jotform was inspected only as evidence; its Summer 2026 wording was not used as an active intake.

## Delivery evidence

See `../verification/debatecraft-program-pages.md` for tests, production build, four-width browser checks, screenshots and deliberate reference adaptations. All acceptance checks passed.
