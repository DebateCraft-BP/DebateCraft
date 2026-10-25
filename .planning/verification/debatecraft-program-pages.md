# DebateCraft full-page verification

Date: 2026-10-21
Result: Implemented; automated and browser checks passed. No deployment or commit.

## Delivered behavior

The header now opens separate Who We Are, What We Do and How We Work pages. These are genuine Vite HTML entries with their own titles, descriptions, canonical URLs, Open Graph/Twitter metadata and sitemap records. Existing Home, Team, Contact and Resources entries remain available.

- Who We Are: student-run identity, mission, access, four values, supplied classroom photographs and a link to the separate Team page.
- What We Do: three numbered offerings, Schools / Holiday Programs / Bioethics; visible track eligibility and class formats; independent course and four-unit curriculum disclosures; cross-page delivery links.
- How We Work: three-slide manual gallery, four method cards, three delivery panels, five school stages, learning outcomes, curved decorative FAQ typography and eight independent FAQs.
- All school/student inquiry actions on these pages are email links to info@debatecraft.org, with distinct subjects. No Google Forms, Jotform, embedded forms or iframes are included in the three new pages. The separate existing Contact page is preserved.
- Team: Alumni replaces Retired in the filter and heading. All six alumni remain text-only without portraits or biography controls. Nine blank titles now say Operations Team Member; existing titles and all 35 memberships/categories are preserved. Current members remain three leaders plus 26 team members. The internal retired category is retained for compatibility.

Five static compatibility entries work on direct visit and reload: about → Who We Are; offerings → What We Do; biology → What We Do#bioethics; training-pathway and partnership → How We Work#schools. Query strings and applicable incoming fragments are preserved. No host-specific rewrite is needed.

## Evidence

- `npm test`: **60 passing tests, 10 files**. Includes Home, Team, Contact, Resources, metadata/sitemap, navigation and the new pages.
- `npm run build`: passed, producing seven canonical page entries and five compatibility entries. No added dependencies.
- `TEST_URL=http://127.0.0.1:4173 npm run test:browser`: passed for Home, Team and all three new pages. The final new-page browser check was rerun after FAQ visual polish.
- Browser sizes: **1440×1000, 390×844, 900×1000, 1920×1080**. Each new page passed direct reload, shared navigation, canonical/title, one H1, loaded local fonts/images, blue background, email-only actions, no horizontal overflow and no browser errors.
- Interactions: desktop/mobile header navigation; compatibility redirects with query/hash; program jump links clearing the header; course/curriculum expansion; cross-page pathway anchors; gallery Enter/click controls, caption/image/count and bidirectional wrapping; independent FAQs; collapsed answer links excluded from keyboard order; reduced-motion visibility and stopped strip animation.
- Home regressions: card drag/settle, responsive menu, consent persistence/settings, native newsletter email validation and preview feedback without external submission.
- Team regressions: roster/filter/search matching, biography text and portrait controls, focus trap/return, Escape, current-member hash links/reload, Alumni noninteraction, portrait failure and roster retry states.
- Source review: checked course eligibility/session/cap facts, school windows and bioethics units against the archived runtime. Inspected route, alias, metadata, inquiry and roster changes. `git diff --check` passed.

Raw results and screenshots are in `.firecrawl/verification/` (locally retained, ignored by Git):

- `program-pages-browser-results.json`: twelve page/viewport health records and five alias records.
- `browser-results.json` and `team-browser-results.json`: existing-page regressions.
- `{who-we-are,what-we-do,how-we-work}-{1440,390,900,1920}.png`: full-page captures.
- Matching `*-hero-*.png`, `what-we-do-courses-*.png`, `how-we-work-gallery-*.png` and `how-we-work-faq-*.png`: focused/interactive states.

Actual pixels were inspected for desktop and mobile heroes, complete page composition, expanded course details and FAQ/focus states. The reference evidence remains in `.firecrawl/hejl-pages-reference/` and `.firecrawl/hejl-team-reference/`, including Markdown, HTML, CSS, metrics and source screenshots.

## Reference fidelity and factual boundaries

The implementation follows the reference’s serif hierarchy, large disk/curved heroes, inner grid, alternating editorial rows, round image treatments, four-card method, tilted approach panels, thin-rule FAQs and curved typography. It uses the requested pale blue #F2F7FE and white surfaces, DebateCraft imagery and copy. This is an adapted design, not a claim of whole-page pixel identity: different text lengths, three offerings, three real gallery photos, additional course details, mission/values content and email actions change document height. The unrelated source video is replaced with concrete learning outcomes. Mobile offering screenshots use square crops to retain more classroom context; the gallery retains the reference’s taller mobile treatment. No Hejl images or runtime bundles were added.

The archived Jotform at https://form.jotform.com/261003548067049 was inspected without submission and still describes Summer 2026. It is not linked as current enrollment. Holiday availability is inquiry-based; no past dates are promoted as future cohorts. Course-specific eligibility/caps follow the approved repository source, with school arrangements discussed separately. No prize, publication or selection guarantees were added.

No email was sent, third-party form submitted, backend changed, package installed, site deployed or commit created. The pre-existing tracked .DS_Store modification was left untouched.
