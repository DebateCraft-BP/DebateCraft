# Cantonese / Traditional Chinese delivery verification

Completed: 2026-10-22. Approval: 2026-10-21, covering the specification, design, epic and five implementation plans.

## Delivered

All eight active pages now have Cantonese/Traditional Chinese equivalents with shared React implementations: Home, Who We Are, What We Do, How We Work, Schools, Team, Resources and Contact. Header/footer/menu/consent/newsletter labels, accessibility text, editorial descriptions, curricula, FAQs, team biographies/achievements and resource interactions are translated. English routes remain available in American English.

The counterpart map preserves queries and fragments. Header logos and internal destinations retain the active locale. Six Chinese aliases are actual Vite build entries. Sixteen canonical pages include paired alternate links and complete localized social metadata; the sitemap includes all sixteen.

The 35-record current roster stays authoritative. Chinese translations do not create a second runtime roster. The same 29 current members have biography access, the same six Alumni remain text-only and non-interactive, missing roles remain Operations Team Member / 營運團隊成員, and Adrian's Pre-WUDC Ottowa (2026) judging entry is present. The historical Chinese Matthew Wong achievements were incomplete; the two missing current achievements received explicit translations. HKEDO's current 2026 date is retained.

Resource search supports Chinese descriptions/motions and original English identifiers. Options display translated labels while persisting original enum values/IDs. Existing drafts remain unchanged, newly created samples are localized, and selected Chinese motions are copied into preparation notes only on explicit selection. Favorites, cookie preferences and timer choices share their existing storage keys. Scoring/timer rules and Contact request fields/endpoint are unchanged.

## Automated evidence

- Incremental failing localization acceptance checks were observed before the shared shell, page slices, team, Contact, resource search, practice tools, framework/Manner content, game rank, metadata and new-draft defaults were implemented.
- `npm test`: 106 passing tests in 14 files, including existing English regressions, locale navigation/content/interactions, coverage of present roster/resource data and sixteen-page integrity/metadata.
- `npm run build`: passed; all sixteen canonical pages and compatibility entries emitted. No dependency added.
- `git diff --check` and `node --check tools/cantonese-browser-check.mjs`: passed.
- Existing English Home, Team and four editorial-page browser checks passed at 390, 900, 1440 and 1920px, including menus, filters, profiles, error recovery, disclosures, gallery, FAQ, reduced motion and aliases.
- `node tools/cantonese-browser-check.mjs`: 32 page/viewport checks passed (all eight pages at 1440, 390, 900 and 1920px). No page errors or horizontal overflow. The language link remains visible without logo overlap; mobile menus expose all seven destinations.
- Chinese browser interactions passed: all eight language pairs both ways with query retention, manual gallery, independent FAQ/course disclosures, current-member deep link/dialog and text-only Alumni, game feedback, all six aliases with preserved query/sections, Contact success with the request intercepted locally.
- Unit checks cover original draft text/enum persistence, Chinese motion selection, timer start/reset/status, resource search, answers/emphasis, five-round game score/rank, Contact failure, consent/newsletter states and fragment-aware counterpart updates.

## Visual evidence

Downloaded local browser captures and raw measurements are in `.firecrawl/verification/cantonese/`; `results.json` records the 32 view checks and interactions. All eight Chinese pages were captured at 1440×1000 and 390×844 and inspected as actual pixels. Tool practice/framework/Manner/game and the Adrian biography were also inspected. Chinese glyphs, body/heading hierarchy, blue/white surfaces, original photographs, wrapping, cards, school pathway and form fields render correctly. Native CJK fallbacks are used; no claim is made that an identical CJK font is present on every operating system.

## Review and limits

Source review checked URL mapping, template interpolation, source-text fallback, current-roster coverage, original option values, storage compatibility, translation evaluation at render time, and external-link preservation. A module-level FAQ JSX initialization issue and untranslated rank interpolation were repaired and verified. Review was performed locally; no independent reviewer was requested or claimed.

External PDFs, videos and posts retain their original language/titles/links and receive English-resource labels. Original text inside photographs is unchanged. Browser-native validation messages follow the browser language; site-owned feedback is Cantonese. Third-party delivery, real email, subscription and live form submission were not exercised. No deployment, commit or outbound message was performed.
