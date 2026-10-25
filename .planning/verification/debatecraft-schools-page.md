# DebateCraft Schools page verification

Date: 2026-10-21
Status: Complete. The user approved the combined plan before implementation.

## Delivered

- `/pages/schools.html` is a full React/Vite page with its own title, description, canonical URL, social metadata and sitemap entry. It supports direct visits and reloads.
- Seven-item desktop/mobile header: Who We Are / What We Do / How We Work / Schools / Resources / Our Team / Contact. `links.method` and `links.schools` are separate destinations.
- School content: shared curriculum and coaching overview; three school priorities; five visible pathway stages with planning windows, coaching work and outputs; 5–10-student online delivery with schedule confirmation; staff progress records; school-only email inquiry checklist.
- What We Do links directly to Schools, while retaining its #schools summary and general-method link. How We Work#schools remains accessible and links to Schools#pathway. The full stage list is now rendered only on Schools, from `src/programContent.js`.
- Training-pathway redirects to Schools#pathway; partnership redirects to Schools#inquiries. Query strings are preserved. Other compatibility URLs still work.
- Email inquiry links use `mailto:info@debatecraft.org?subject=School%20debate%20program`. No Google Forms, registration forms, iframe, backend or email submission was added.
- Existing blue/white tokens, fonts, classroom assets, shared footer and consent controls are reused. American copy uses Analyze, Practice, fulfillment, toward and Advisor; proper names and the user’s exact Adrian Chan achievement remain intact.

## Validation

- `npm test`: **65 tests passed in 11 files**, including navigation, Schools entry/content/contact flow, cross-page links, all existing page interactions, metadata and eight canonical sitemap entries.
- `npm run build`: passed; produces eight canonical HTML entries and five compatibility entries, without new dependencies.
- `TEST_URL=http://127.0.0.1:4173 npm run test:browser`: passed for Home, Team and all four editorial pages.
- Viewports: **1440×1000, 390×844, 900×1000, 1920×1080**. Four editorial pages produce 16 health records. No horizontal overflow, broken images, missing fonts or browser errors. Header navigation fits without overlapping the brand at desktop/intermediate widths.
- Schools interaction checks: desktop/mobile menu entry; direct reload/title/canonical; five stages; all three jumps clear the fixed header; school email destination; Team link; entry through What We Do; How We Work → school pathway fragment; reduced-motion text visibility.
- Compatibility checks: five old URLs; direct navigation/reload; current canonical metadata; incoming query/fragment preservation on offerings; query preservation on both school redirects.
- Existing browser regressions: Home identity, mobile menu/resize, card drag/settle, consent and newsletter validation; Team roster/filter/search, biographies/focus/Escape, Alumni restrictions, deep links, failed portrait and roster retry. Contact/Resources regression coverage is supplied by the full automated suite and their navigation/file/metadata integrity checks; no real contact form was submitted.
- Red failures were observed before route/header, sitemap, school page content, What We Do entry, How We Work migration and changed compatibility implementations. Existing public-interface tests were updated to the approved new behavior.
- Source review checked stage windows/content against archived TrainingPathwayPage, current links, metadata, aliases, unique stage ownership and inquiry behavior. Obsolete stage-list CSS was removed. `git diff --check` passed; a scan for the edited British spelling variants in active page content returned no matches.

## Visual evidence

Actual pixels were inspected for desktop/mobile school heroes, full desktop composition, mobile pathway cards and mobile inquiry panel. The layout follows the approved centered statement/disk, editorial photo introduction, white cards, numbered pathway and rounded inquiry panel. Classroom screenshots retain original filenames; they are not presented as school partnership evidence.

Locally saved under `.firecrawl/verification/` (ignored by Git):

- `schools-{1440,390,900,1920}.png`: full-page captures.
- `schools-hero-{1440,390,900,1920}.png`: header/hero and jump navigation.
- `schools-pathway-{1440,390,900,1920}.png`: detailed five-stage sequence.
- `schools-inquiries-{1440,390,900,1920}.png`: email inquiry/checklist.
- `program-pages-browser-results.json`: all four editorial-page health and compatibility checks.
- `browser-results.json`, `team-browser-results.json`: Home and Team regressions.

## Boundaries

Planning windows and delivery arrangements are tailored with each school. No new price, availability date, partner, testimonial, school accreditation or guaranteed competitive result is asserted. The new page is a source-informed adaptation using DebateCraft content; whole-page pixel identity with Hejl is not claimed.

No deployment, commit, email, external form submission, new dependency or unrelated content change was performed. Existing user work, including the tracked .DS_Store change, remains intact.
