# DebateCraft Team page

Status: Implemented and verified. Approved by the user: “Implement plan”.
Date: 2026-10-20
Verification: ../verification/debatecraft-team.md

## Outcome

Add the Team page to the active React/Vite website using the captured Hejl Who We Are page's portrait-card and biography design. Keep DebateCraft names, roles, biographies, achievements, schools, portraits and branding. **Do not render website or LinkedIn buttons in member cards or biographies.**

## Scope and behavior

- Serve `/pages/team.html` as a local, directly loadable built page. Shared navigation and the homepage's Meet Our Team link point there; the home logo returns to `/`.
- Use the preserved English roster in `legacy/data/team_members.json` as the migration source. Copy it into `public/data/team_members.json`, removing image fields from retired records; this becomes the active page's authoritative source. Preserve all other roster facts and keep the archived site intact.
- Copy only current members' referenced portraits with their existing filenames into `public/Images/`. There are 35 records: 29 current and six retired. Exclude retired portraits from the active assets. Use an initials fallback for absent or failed portraits of current members only.
- Default view shows current members once each, preserving source order within groups: Adrian Chan, Gavin Zhao and Sandeep Chulani under Leadership; the remaining 26 current members under Our Team. Matthew Wong, Bella Cai, Valmik Dagayach, Rachel Rhodes and Oliver Choi belong in Our Team, per the user's correction. Retired members appear only when the Retired filter is selected, as on the archived page.
- Preserve the old button-filter functionality and name search: All, Leadership, Coaching, Hong Kong, Bioethics and Retired. Keep the same category matching, selected-button state and case-insensitive substring search within the selected category. All excludes retired members; Retired includes only retired members. Display a clear empty state.
- Visual section placement is independent of category filtering: keep existing JSON categories intact. For example, the Leadership filter still matches the existing executive category, while the five moved members remain in the Our Team visual section when included in filtered results. Omit sections with no matching members.
- Retired members have text-only entries with no image, initials, portrait placeholder or reserved image space. They are not clickable or keyboard-activatable and have no biography trigger or member-detail destination. Retired-member hashes must not open a biography.
- Clicking a current member's card opens one full-screen biography dialog with the member's actual role, school, badge, achievements and biography when present. Do not invent content for blank fields. Preserve Sandeep Chulani's public role as Adviser to DebateCraft.
- Preserve `#member-<name-slug>` links for current members. Escape or the close button closes the dialog, restores focus and releases scroll locking. Keyboard focus stays within the open dialog.
- Show accessible loading, failure and retry states if the roster cannot load. Do not silently substitute invented member records.
- Reuse header, footer, consent and fonts. Use the shared pale-blue page background `--color-bg: #F2F7FE`, matching the homepage, with white cards and biography dialog. This user-requested palette overrides the reference's blush background. Give the header a small explicit theme option so its logo stays dark on the pale-blue Team page.

## Acceptance criteria

1. The homepage remains functional and its Team links open the new local page; direct visits and reloads work in the production build.
2. All 29 current members are available by default with no duplicates: three in Leadership and 26 in Our Team, including the five explicitly moved members. All six existing filter buttons retain their category-matching behavior and work with name search. Six retired members are reachable through the Retired filter as text-only, non-interactive entries. Retired records have no image fields or portraits in the active assets and cannot open a biography, including by hash.
3. A current member's portrait card opens the corresponding full biography, with accessible keyboard closing/focus behavior and no website or LinkedIn buttons.
4. Current-member portrait failure leaves a readable, clickable initials card without a broken image. Retired entries never render an image fallback. Data-load failure can be retried.
5. Desktop cards and biographies follow the captured typography, spacing and portrait proportions, using the requested shared pale-blue/white surfaces instead of blush. Mobile stacks cards and dialog content without horizontal overflow. Reduced motion keeps content visible.
6. Relevant automated checks, production build, desktop/mobile browser checks and a source review pass; remaining visual approximations are recorded honestly.

## Scope limits

This change covers the English Team page and shared links/theme needed to reach it. It does not recreate the reference's unrelated foundation mission/values content, add a Chinese-language interface, change roster facts, add dependencies, publish or deploy. The reference's seven-card composition cannot be identical with DebateCraft's larger roster and different portraits; fidelity targets its design patterns and measured CSS values.

## Evidence

- Source: https://www.hejlfoundation.org/who-we-are/
- Captured evidence and exact CSS: `.firecrawl/hejl-team-reference/DESIGN.md`, `styles.source.css`, `.firecrawl/css-evidence.json`.
- Inspected reference states: `team-desktop.png`, `team-mobile.png`, `bio-desktop.png`, `bio-mobile.png` in the same capture folder.
- Existing implementation: `src/App.jsx`, `src/content.js`, shared header/footer, `src/styles/reference.css`, and `legacy/scripts/reactPages.js` TeamPage.
