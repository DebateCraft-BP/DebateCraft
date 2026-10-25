# DebateCraft Schools implementation plan

Date: 2026-10-21
Status: Approved, implemented and verified on 2026-10-21.
Specification: ../specs/debatecraft-schools-page.md
Screen design: ../design/screens/debatecraft-schools.md

## Completed independent work

American spelling in active content now uses Analyze, Practice, fulfillment, toward and Advisor. Existing wording-dependent test expectations and the archived-to-active roster browser expectation were updated. All 60 tests and the production build passed; whitespace checks passed. Archived source material and proper names remain intact.

## Approved-work sequence after the single approval

1. **Routing tracer bullet — TDD.** Write one focused test for visiting the Schools URL and reaching it from shared navigation; observe the relevant failure. Implement the minimal route, real HTML entry and navigation/link split (`links.method` versus `links.schools`) to pass. Preserve Contact/Resources and all current page destinations.
2. **School content and design.** Reuse the shared editorial components and the existing schoolStages data. Build the hero, three anchors, program-continuity introduction, five-stage pathway, delivery/records cards and school-only email inquiry checklist as designed. Add a small local content module only for actual school copy not already shared. Use no new dependency or backend. Static copy/layout is checked through source inspection and browser evidence, not artificial unit tests.
3. **Cross-page behavior — incremental TDD.** Verify a What We Do visitor can reach Schools; implement its CTA. Then verify How We Work#schools reaches the detailed pathway while retaining the summary fragment; move the detailed list and update the existing public-interface test accordingly. Keep each red/green cycle separate.
4. **Compatibility — TDD/browser acceptance.** Observe the old training-pathway and partnership redirects failing their new destinations, then retarget them to Schools#pathway and Schools#inquiries. Preserve query strings/applicable fragments. Keep the other three aliases unchanged. Update canonical metadata and sitemap to eight canonical pages.
5. **Verification.** Run the full Vitest suite, production build and relevant browser checks. Verify all seven header items at desktop/mobile/intermediate widths; direct visits/reloads; fixed-header fragment positioning; new/old page links; mailto destinations; no third-party form; no broken images/fonts, console errors or overflow; and reduced motion. Capture 1440/390 screenshots and check 900/1920 geometry. Check Home, Team, Contact and Resources regressions appropriate to the shared-link changes. Never send an inquiry or submit a form.
6. **Review and delivery.** Review changed behavior and content against the specification, repair in-scope findings and rerun affected checks. Save verification evidence and README guidance. Deliver the working local page. No separate permission prompt is needed for these quality gates; publishing/deployment remains outside scope.

## Approval scope

Approve the specification, design and steps above as one combined plan. This authorizes building and verifying the new Schools page and the explicitly listed navigation, compatibility and summary changes. The user’s supplied AGENTS.md says: “Ask once for approval of the combined plan.” No deployment, commit, email or external submission is requested.

## Completion evidence

Implemented and verified after the user approved the plan. The dedicated page, navigation, school summaries, compatibility URLs, email-only actions and American spelling are complete. All 65 automated tests, production build and four-viewport browser checks passed. See `.planning/verification/debatecraft-schools-page.md` for checks and screenshots. No deployment or external submission.
