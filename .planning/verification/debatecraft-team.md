# DebateCraft Team implementation verification

Date: 2026-10-20
Approval: User instruction “Implement plan”, covering the saved specification, design and implementation plan with the subsequent roster, retired-member, filter and palette corrections.
Preview: http://127.0.0.1:4173/pages/team.html

## Delivered behavior

- `/pages/team.html` is a real React/Vite build entry; direct visits, reloads and shared navigation work. Homepage Team links stay local and Team home links return to `/`.
- Leadership contains Adrian Chan, Gavin Zhao and Sandeep Chulani. Our Team contains the other 26 current members, including Matthew Wong, Bella Cai, Valmik Dagayach, Rachel Rhodes and Oliver Choi. No duplicated people.
- All, Leadership, Coaching, Hong Kong, Bioethics and Retired buttons retain the archived page's category matching and combine with case-insensitive name search. Visual section membership stays independent of those categories, as specified.
- Current cards open a full-screen biography with actual available roster details, keyboard focus containment, Escape, named close control, focus restoration and scroll locking. Current `#member-...` links open the matching member and survive reloads. No website or LinkedIn controls or reserved link-row gap.
- Six retired entries are text-only, with no images, initials, portrait placeholders, buttons, links or biography access. Retired hashes cannot open biographies.
- The active roster is `public/data/team_members.json`, migrated from the archived English JSON with only retired image fields removed. All other fields match the source. The active assets contain exactly 29 current-member portraits; all checksums match their archived originals and `public/team-asset-sources.json`. Archived originals remain intact.
- Missing current-member portraits show initials; failed or malformed roster requests show an error, with Retry available. No invented fallback profiles.
- Home and Team share `#F2F7FE` page backgrounds and white cards/dialog surfaces. Existing dark footer and accent dots remain. The homepage impact circle and story surfaces use corresponding blue tones.

## TDD and final checks

Implemented in successive red/green cycles: local Team link; page route/theme; roster grouping; filters/search; retired entries; biography details/close; keyboard/scroll/focus; hashes; error/retry; failed portraits; malformed profile handling. Failures were observed before each behavior was implemented. Tests use rendered controls and network-request seams, rather than private helpers.

- `npm test`: **14 tests passed across five files**, including ten Team integration tests.
- `npm run build`: passed, including `dist/index.html` and `dist/pages/team.html`.
- `TEST_URL=http://127.0.0.1:4173 npm run test:browser`: passed both homepage and Team suites at **390×844, 900×1000, 1440×1000 and 1920×1080**.
- `git diff --check`: passed.
- Portrait checksum and active asset-inventory audit: passed for all 29 current portraits, with no retired assets migrated.

Browser checks cover roster/group counts, each filter, combined search, empty results, actual portrait clicks, biography details and mobile scrolling, focus containment/restoration, Escape, scroll unlocking, retired non-interactivity, profile hashes/reloads, shared mobile/desktop navigation, reduced motion, fonts, missing images, errors and overflow. Separate deliberate failures verified HTTP 503/retry and portrait-image fallback. Both page backgrounds measured `rgb(242, 247, 254)`.

Raw outputs: `.firecrawl/verification/browser-results.json` and `.firecrawl/verification/team-browser-results.json`.

## Visual evidence

Compared with the saved Hejl Team cards and biography captures in `.firecrawl/hejl-team-reference/`. Inspected desktop full-page, overview, leadership, biography and retired views, plus mobile leadership/biography/retired views and the intermediate-width overview. Final mobile biography screenshot was also inspected before keyboard scrolling to document the initial overlay state.

Screenshots live in `.firecrawl/verification/`:

- `team-{width}.png`: complete default roster.
- `team-overview-{width}.png`: first viewport.
- `team-leadership-{width}.png`: full three-person Leadership section.
- `team-bio-{width}.png`: initial Sandeep Chulani biography state.
- `team-retired-{width}.png`: text-only retired state.

At 1440px the first Leadership card measured **361.672×556.531px at x=137.5px**; the first Our Team card measured **275.828×456.609px**. These match the source's measured card dimensions. At 390px the larger card measured approximately **358.03×518.17px**, matching the source's approximately 358×518px mobile card. Names, roles and image crops were reviewed with DebateCraft's original portrait files.

## Review findings and limits

Source review found that malformed optional profile fields could cause a biography render error; validated fields now route to the accessible roster error instead. Browser navigation also revealed the homepage's decorative impact layer intercepted its Team link; decorative layers now ignore pointer events, and the full navigation path passes.

The first portrait-click browser test mistakenly targeted an image whose pointer events intentionally belong to the stretched card button; the harness now clicks actual portrait coordinates, verifying the intended interaction. This was a test correction, not an application failure.

The blue palette, roster size/content, search controls and text-only retired entries intentionally differ from the reference. Typography and portrait-card geometry use extracted source rules; this is not a claim that the whole page is pixel-identical to Hejl. Portrait resolution varies with the original supplied files. Verification used Chromium; Safari/Firefox and the Chinese interface were not tested or added. No independent reviewer was requested; source review was performed within this task. No commit, publication or deployment was performed.
