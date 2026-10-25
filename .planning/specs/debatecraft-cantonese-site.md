# DebateCraft Cantonese / Traditional Chinese site

Date: 2026-10-21
Status: Approved on 2026-10-21; implementation and verification completed on 2026-10-22.
User request: “Build Cantonese page.” Clarified by the user: **Entire site in Cantonese / Traditional Chinese**.
Epic: ../epics/debatecraft-cantonese-site.md
Design: ../design/screens/debatecraft-cantonese-site.md

## Outcome and scope

Provide a complete Cantonese / Traditional Chinese version of all **eight currently active pages**, including shared controls and interactive learning content. Keep the English site available in American English. The design remains the current Hejl-inspired blue/white system with the supplied DebateCraft branding and photographs.

| Current English page | Cantonese canonical URL | Cantonese navigation label |
| --- | --- | --- |
| `/` | `/cnindex.html` | 首頁 through the home logo |
| `/pages/who-we-are.html` | `/pages/cnwho-we-are.html` | 關於我哋 |
| `/pages/what-we-do.html` | `/pages/cnwhat-we-do.html` | 我哋嘅課程 |
| `/pages/how-we-work.html` | `/pages/cnhow-we-work.html` | 教學方式 |
| `/pages/schools.html` | `/pages/cnschools.html` | 學校課程 |
| `/pages/resources.html` | `/pages/cnresources.html` | 學習資源 |
| `/pages/team.html` | `/pages/cnteam.html` | 團隊 |
| `/pages/contact.html` | `/pages/cncontact.html` | 聯絡我哋 |

The labels are proposed UI copy, not new page concepts. Language controls are “繁體中文” on English pages and “English” on Cantonese pages. Each links to the equivalent page, retaining valid section/tool/member fragments and query strings. Do not silently send a visitor to a different page or automatically redirect based on browser language.

## Language and content decisions

Use natural Hong Kong Cantonese phrasing in Traditional Chinese, with clear professional explanations for programs, schools and technical lessons. Avoid Simplified Chinese and mechanical word-for-word English syntax. Examples:

- Home statement: **諗得清楚，講得自信。辯論，唔設界限。**
- Schools statement: **建立一支持續成長嘅校隊。**
- School inquiry: **電郵查詢學校課程**.
- Team filters: **全部 / 領導團隊 / 教練團隊 / 香港 / 生物倫理 / 歷屆成員**.
- Missing member title: **營運團隊成員**.

Keep DebateCraft, personal names, WSDC, BP, POI, event names, institution names and other meaningful abbreviations where translation would obscure identity. Explain technical terms in Chinese where useful. Keep all course ages, capacities, durations, school-stage windows, rankings and dates aligned with the current English source. Do not imply the classes themselves are taught in Cantonese merely because the website is localized.

The archived Chinese runtime and roster are translation references only. Inspection confirmed the same 35 names, but the archive lacks the nine Operations Team Member titles and Adrian Chan’s newly added Pre-WUDC Ottowa(2026) achievement. Do not restore stale English/Chinese source claims, retired portraits, old enrollment forms, analytics bundles or past Summer 2026 availability.

## Coverage

### Shared experience

Translate header/footer links, skip link, menu controls and accessible names, inquiry labels, image descriptions/captions, newsletter labels/preview message, cookie banner/settings, preferences/status feedback and all shared dialog controls. Preserve keyboard behavior, focus restoration and reduced motion. Brand names/social-network names may remain their actual names.

Add a compact language link beside the brand, outside the seven primary navigation items. It must fit mobile and intermediate widths without covering the logo, menu or Contact action. URL determines the active language. Reuse existing consent and resource-storage records across languages; do not erase saved preferences, favorites, drafts or timer presets when switching. User-written draft text is preserved as entered, not automatically translated. In-progress, nonpersisted game/timer state is not newly guaranteed to survive a full navigation.

### Home and editorial pages

Translate complete content on Home, Who We Are, What We Do, How We Work and Schools: statements, impact text, values, program descriptions/facts, five school stages, delivery/records, gallery captions/count context, all course/curriculum disclosures, outcomes, eight FAQs and email inquiry checklists. Keep current section IDs stable so both local and cross-language fragments continue working.

### Team

Use `/public/data/team_members.json` as the authoritative roster for identities, categories, membership, ordering, images and achievements. Add an explicit localized text catalog keyed to stable member identity/source text; do not make the archived Chinese roster a competing source of truth. Match translations to current source entries and validate coverage, including the new Adrian achievement and Operations Team Member titles. Do not rely on parallel achievement-array positions that could silently drift after an insertion.

Translate roles, supported biography text, achievement descriptions, filters/search, loading/error/retry/empty states, image-failure descriptions and biography controls. Preserve original personal names, English member slugs/hash links, three leadership / 26 current-team placement, six Alumni, text-only Alumni restrictions and no website/LinkedIn profile actions. If a source entry changes later and its translation is unavailable, show that exact source text rather than attach a stale translation; an explicit coverage check must identify the missing translation for maintenance. Delivery requires full coverage of the current content.

### Resource hub and tools

Translate navigation, instructions, filters, search labels/results, empty states, captions, buttons, accessible labels, confirmation/status messages and **the site-owned learning content**:

- Guides/video library: Chinese descriptions/categories with original titles where helpful for identifying the external resource. Search supports Chinese terms and original English titles/acronyms.
- Practice toolkit: translated motion bank, filters, prep workspace labels/export headings, confirmations, clipboard feedback, timer controls/status and POI information. Keep stable motion IDs, stored enum values, countdown calculations and user data.
- Framework drills: lessons, examples, exercises, answer reveals, motion generator and feedback. Translate visible labels while preserving format terminology and lesson IDs.
- Manner Lab: spectrum names/levels, examples, strengths/weaknesses, profiles/archetypes and emphasis exercise. Use explicit Cantonese phrase tokens with stable IDs; do not assume Chinese words are separated by spaces.
- Even If: questions, answer choices, difficulty labels, timer/score/health/round labels, feedback, timeout, victory/defeat and restart. Preserve the current answer types, scoring, health, timing and game rules.

External PDFs, Google documents, YouTube videos, transcripts and Substack posts remain their original linked material. Label English-only resources clearly; translating this website does not translate those external documents/videos. Existing document/resource links remain available; no Google **Forms** or new registration service is introduced.

### Contact and newsletter

Translate the existing Contact page’s labels, optional/required hints, validation-related site messages, loading/success/failure and email fallback, while preserving its existing backend contract, spam field and error handling. Test submissions only with mocked/intercepted responses; never send a real message. The school/student program inquiry actions remain email links to info@debatecraft.org, with appropriate audience subjects.

Translate the newsletter’s existing honest preview status without pretending delivery is configured or sending a subscription request.

## Implementation approach

Use the installed React/Vite/native CSS stack, with one explicit locale interface and grouped English/Cantonese catalogs. Shared page modules read localized content; do not clone eight implementations or perform runtime DOM text replacement. Preserve current English wording and behavior while extracting strings in small, test-protected increments.

Centralize locale-aware internal URLs, shared navigation and language counterparts. Keep the static build model: eight new canonical HTML entries, translated metadata, correct document language (`zh-HK`, consistent with the existing archived locale), corresponding English/Cantonese alternate-language metadata and 16 canonical sitemap entries. Alias pages are excluded from the canonical sitemap.

Add localized compatibility entries using the same static redirect pattern:

- `cnabout.html` → `cnwho-we-are.html`.
- `cnofferings.html` → `cnwhat-we-do.html`.
- `cncourses.html` → `cnwhat-we-do.html#holiday`.
- `cnbiology.html` → `cnwhat-we-do.html#bioethics`.
- `cntraining-pathway.html` → `cnschools.html#pathway`.
- `cnpartnership.html` → `cnschools.html#inquiries`.

Preserve query strings and applicable incoming fragments. These entries must work directly/reload from a production build without hosting rewrite configuration. Do not revive unrelated archived legal, calendar, donation or other routes as part of localization.

## Acceptance and verification

1. All eight Cantonese canonical URLs render complete localized pages, load directly/reload, and link within the Cantonese site. English routes still work in American English.
2. Language switching reaches the corresponding page and preserves supported section, resource-tool and current-member fragments. Home logos stay in the active locale. Seven primary items remain available on desktop/mobile.
3. All current site-owned copy and relevant accessible names are localized, including interactive prompts/status/error/empty states. Proper names, abbreviations, original resource titles and user input have explicit reasons to remain English.
4. Team membership, categories, portraits/restrictions and factual content match the current English roster; all current localized texts have coverage checks. The new Adrian achievement is present and no missing-title regression occurs.
5. Resource interactions work in Chinese: search/filter, favorites/drafts, lesson/answer disclosure, emphasis selection, sliders, clipboard feedback, timer/POI states and game outcomes. Language does not alter scoring or existing stored data.
6. Contact/newsletter/consent localized states retain validation, keyboard/focus behavior and privacy behavior. No real contact, inquiry, subscription or third-party form is submitted during tests.
7. All 16 canonical entries have correct language, unique localized metadata, matching counterpart links and sitemap records. Localized aliases preserve intended destination/query/fragment.
8. CJK characters render correctly; text is readable and unclipped at 390, 900, 1440 and 1920px. Blue/white visual identity, actual images, focus visibility and reduced-motion behavior remain intact.
9. Incremental red/green tests, full English/Cantonese automated regression suite, production build, browser interaction checks, screenshot inspection, content review and verification report complete before delivery.

## Boundaries and approval

No deployment, commit, messages, live submissions, new course product, invented Chinese personal names, external-document translation, archived calendar migration or new tracking is included. No new dependency is expected; use system CJK font fallbacks and inspect actual rendering before deciding any additional font asset is necessary.

One combined approval covers this specification, the locale design and all five ordered feature plans through implementation, testing, visual repairs and review. Separate phase approvals are not required within this scope.
