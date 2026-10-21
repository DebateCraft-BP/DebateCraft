# DebateCraft Team implementation plan

Status: Complete. Approved by the user: “Implement plan”.
Specification: ../specs/debatecraft-team.md
Design: ../design/screens/debatecraft-team.md
Verification: ../verification/debatecraft-team.md

## Structure

Keep the existing React/Vite stack and dependencies. Add a Team page module with a small public interface; keep loading, filters, member selection and biography behavior local to that module. Reuse shared chrome. Do not introduce a routing framework or generic data layer for one additional page.

Affected areas: `src/App.jsx`, `src/content.js`, `src/components/Header.jsx`, a new Team page and scoped stylesheet, `public/data/team_members.json`, current members' referenced `public/Images/` portraits, `pages/team.html`, Vite multi-page build inputs, focused tests and browser verification tooling. Remove retired image fields during migration and exclude retired portraits from active assets. Keep archived legacy files unchanged.

## Ordered work and TDD

Use one behavior per red/green cycle: add one focused test, run it to confirm the relevant failure, implement that behavior, rerun it, then continue. Tests exercise rendered page controls and public routes; mock only the network request where needed.

1. **Reach the page.** Test the homepage Team destination and rendering at `/pages/team.html`; implement page selection and the shared header's dark theme. Add a real Vite HTML entry so the production page works on direct visits. Update the document title appropriately.
2. **Load the real roster.** Test that the current roster loads without retired members or duplicate people, with Adrian Chan, Gavin Zhao and Sandeep Chulani in Leadership and the other 26 current members in Our Team. Explicitly verify Matthew Wong, Bella Cai, Valmik Dagayach, Rachel Rhodes and Oliver Choi appear only in Our Team. Migrate the authoritative English JSON, removing retired image fields, and copy only current members' portrait files; keep roster categories intact and implement the requested visual section assignments separately.
3. **Find members.** Test name search and each existing filter button's original category matching, selected state, combined search/filter behavior, Retired behavior and empty results in successive cycles. Keep visual section placement stable after filtering and omit empty sections. Verify retired results contain no images, initials, portrait placeholders, links or buttons; clicking or keyboard interaction cannot open a biography. Preserve current member hash links in a focused cycle and verify retired hashes cannot open a biography.
4. **Read a biography.** Test current-member card activation and corresponding details without website/LinkedIn controls. Implement a single selected-current-member dialog. In a following cycle test Escape, keyboard containment and focus restoration, then implement any missing behavior.
5. **Recover from failures.** Test roster error/retry and failed-current-member-portrait initials in separate cycles. Implement explicit recovery and fallback states; never render portrait fallbacks for retired members.
6. **Apply the design.** Reuse measured source team styles with scoped adaptations for larger groups and search controls. Match the homepage's shared pale-blue `--color-bg: #F2F7FE` and white cards/dialog; do not restore the reference's cream or blush page backgrounds. Verify original image crops, headings, responsive layouts and motion fallbacks. No artificial unit tests for CSS or static prose.
7. **Verify and repair.** Run the complete Vitest suite and production build. Run existing homepage browser checks plus Team checks at desktop/mobile and supplemental widths: deep-route load/reload, images, search, filters, dialog, focus, scroll, no external-profile buttons, console errors and horizontal overflow. Verify retired entries are text-only and cannot open biographies by click, keyboard or hash; check the active asset inventory excludes their portraits. Capture page/card/dialog screenshots; inspect pixels before reporting visual fidelity.
8. **Review and deliver.** Review changed files against acceptance criteria, repair in-scope findings and rerun affected checks. Save a verification report, update runtime/page documentation, and show the Team preview with a screenshot. No commit or deployment.

## Approval

One approval covers this specification, screen design and implementation plan through testing, visual repair and review. Key behaviors for TDD are local navigation, roster accuracy/filtering, biography keyboard operation, and failure recovery. This is an additional page beyond the approved homepage rebuild.
