# DebateCraft Schools screen

Date: 2026-10-21
Status: Approved, implemented and verified on 2026-10-21.
Specification: ../../specs/debatecraft-schools-page.md

## Design system and composition

Reuse `.firecrawl/hejl-pages-reference/DESIGN.md` and the current three editorial pages: #F2F7FE page background, white surfaces, #E2EFFA supporting blue, #0A0A0A text, local PP Editorial New/Inter fonts, shared header/footer, 20-column inner desktop grid and 16px-equivalent mobile margins. This is an additional school-focused adaptation of the captured Hejl design, not another design system.

## Screen order and concrete copy

1. **Hero.** Eyebrow “DebateCraft for Schools.” H1 “Build a school team that keeps growing.” Supporting copy: “Live online coaching, a shared curriculum and clear progress records, shaped around your students and school calendar.” Use the existing centered editorial statement and blue/white disk, with one inline classroom crop. Primary email CTA “Discuss your school.” Three ordinary jump links: Pathway → #pathway; Delivery → #delivery; School inquiries → #inquiries.
2. **Why a school program.** Heading “Keep the next cohort moving forward.” One existing classroom image (`Image1.jpeg` or `Image7.png`, with neutral caption) beside a short introduction about continuity between graduating leaders and junior students. Three small white cards address shared foundations, practical staff oversight and readiness-based progression. Describe the intended approach, not a proven result or school testimonial.
3. **The pathway — #pathway.** Eyebrow “A framework to tailor.” Heading “From first speeches to a lasting team.” Show five numbered stages with the documented windows, coaching work and a separate “What the school receives” output line. Use generously spaced editorial rows/white panels; keep key facts visible, without requiring five disclosures. Stage numbers/timing sit at left and work/output at right on desktop; stack in reading order on mobile. Explicit note: “We adapt the sequence and timing with your school.”
4. **Delivery and records — #delivery.** Heading “Useful teaching. Visible progress.” Three white cards: live online coaching (5–10 students, schedule agreed with the school); progress records (attendance, skill checkpoints, round notes and next steps); continuity (staff checkpoints, competition-preparation plan and handover). Use “every other week” instead of “fortnightly.” A small “Meet our team” link leads to the existing Team page, without reproducing coach biographies.
5. **School inquiries — #inquiries.** Rounded white contact panel. Heading “Tell us what your school needs.” Show a concise checklist: student numbers/year groups and experience; preferred formats and target competitions; calendar and weekly availability; staff contact and assessment needs. Primary button “Email a school inquiry,” with the established school mailto destination. Note “We’ll discuss scope, timing and arrangements with you.” Secondary link returns to the general How We Work page. Keep the closing panel school-focused; do not add a student registration form.
6. Shared footer and consent controls remain as they are.

## Navigation and related pages

Header: Who We Are / What We Do / How We Work / Schools / Resources / Our Team / Contact. Current-page indication is blue. Desktop spacing reuses the current pill navigation; mobile uses the existing accessible menu. Check all seven labels at intermediate widths.

What We Do retains its Schools summary and links directly to the full page. How We Work retains #schools but replaces the long stage list with a short process summary and a clear pathway link. The detailed sequence lives on the new page.

## Responsive/accessibility details

Use the existing hero/section heading scale (desktop 6.4rem-scale heading, mobile 3.6–4rem), rounded imagery, meaningful crop and existing type tokens. Allow content-driven height; do not copy a fixed screenshot height. Preserve text-first mobile order, one visible semantic H1, logical H2/H3 hierarchy, clear labels, 44px-equivalent minimum controls and visible keyboard focus. Set section scroll margins below the fixed header. Decorative disks ignore pointer input. No new animation is required; existing reveals respect reduced motion.

## Visual checks

Capture and inspect full page/hero/pathway/inquiry views at 1440×1000 and 390×844; check overflow, header fit and image/font loading at 900 and 1920px too. Verify direct fragments, legacy redirects, mailto subjects, Home/Team links and reduced motion. Use real source photographs with original filenames. No new partner logos, testimonials, credentials, awards or enrollment dates.

## Completion evidence

Implemented and verified after the user approved the plan. The dedicated page, navigation, school summaries, compatibility URLs, email-only actions and American spelling are complete. All 65 automated tests, production build and four-viewport browser checks passed. See `.planning/verification/debatecraft-schools-page.md` for checks and screenshots. No deployment or external submission.
