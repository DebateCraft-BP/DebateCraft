# DebateCraft

React/Vite website for DebateCraft with Home, Who We Are, What We Do, How We Work, Schools, Team, Contact and Resources pages. The visual layout takes its typography, spacing and component treatment from the Hejl reference; the live pages use DebateCraft branding, people, programs, photographs and copy from the preserved original site. The pages share a pale-blue (`#F2F7FE`) background and white cards.

## Run

Node.js 22.12+ is required.

```sh
npm ci
npm run dev
npm test
npm run build
npm run preview
```

## Browser checks and screenshots

```sh
PLAYWRIGHT_BROWSERS_PATH="$PWD/.cache/ms-playwright" npx playwright install chromium
TEST_URL=http://127.0.0.1:4173 npm run test:browser
CAPTURE_NAME=debatecraft TEST_URL=http://127.0.0.1:4173 node tools/compare-reference.mjs --all
```

Start the preview before running these checks. `npm run test:browser` checks the homepage, Team and four editorial pages at 390, 900, 1440 and 1920px widths, including navigation, filters, biographies, keyboard operation, Alumni entries, recovery states, program disclosures, gallery controls, FAQs and compatibility routes. Screenshots and raw browser measurements are saved under `.firecrawl/verification/`. Verification reports are `.planning/verification/debatecraft-content.md` and `.planning/verification/debatecraft-team.md`, plus `.planning/verification/debatecraft-program-pages.md` and `.planning/verification/debatecraft-schools-page.md`.

## Content and assets

- `src/content.js` owns DebateCraft navigation, course cards, article/resource links and social accounts.
- `src/programContent.js` contains the documented debate track, bioethics unit, school-stage and method-card content.
- `src/components/EditorialPage.jsx` contains the school/student email inquiry destinations and small shared page elements. The four editorial pages use email inquiries; no Google Forms or historical registration forms are linked.
- `src/components/` implements the shared visual layout and interactions.
- `public/media/debatecraft/` contains the original DebateCraft logos and class photographs, copied without alterations and with original filenames.
- `public/debatecraft-asset-sources.json` records the original file paths and checksums.
- `public/data/team_members.json` is the active English Team roster; update this JSON to change public member details. It was migrated from the archived roster with former-member image fields removed and missing roles assigned Operations Team Member.
- `public/Images/` contains current members' portraits with original filenames. `public/team-asset-sources.json` records their sources and checksums. Alumni portraits are excluded from the active assets.
- `src/styles/reference.css` preserves the extracted design rules with local font paths; `src/styles/app.css` handles shared state, branding and the requested blue palette; `src/styles/team.css` adds Team controls, accessible focus styling and responsive adaptations. `src/styles/editorial.css` supplies their shared layout, and `src/styles/schools.css` adds the school pathway and delivery composition.
- `legacy/` preserves the original site, including archived English/Chinese roster JSON, pages, scripts and assets. It is excluded from the production build.

The homepage's Team links open `/pages/team.html`, a real Vite build entry that supports direct visits and reloads. The Team page's home logo returns to `/`. Other header, footer, program and resource destinations point to the corresponding existing DebateCraft pages. The source page's grant section is now DebateCraft's impact section. Its program cards and story cards contain DebateCraft courses and learning resources. The reference site's video, portraits and photographs are not shipped in the active build.

The Team page shows Adrian Chan, Gavin Zhao and Sandeep Chulani under Leadership, and the other 26 current members under Our Team. Existing category filters keep their original JSON matching independently of these visual groups; the Leadership filter therefore still matches all executive-category members. Name search applies within the selected category. Current cards open a full-screen biography, with no website or LinkedIn buttons; `#member-adrian-chan` and other current-member hashes support profile links. Six alumni appear only through Alumni, as text-only, non-interactive entries with no portrait or biography access. Anyone without a title is shown as Operations Team Member, including Alumni. The internal `retired` category is retained for data compatibility. Failed current-member portraits show initials, and failed roster requests offer Retry.

Cookie preferences persist locally without enabling tracking. The newsletter field validates locally and reports that delivery is unavailable in this preview; the footer also links to DebateCraft's existing Substack subscription page.

The earlier Hejl-only specification and pixel comparisons are retained as design-baseline evidence and explicitly superseded for identity/content. Different copy and photographs naturally change text wrapping and document heights. No publication, deployment or commit has been performed.

## Full editorial pages

- `/pages/who-we-are.html`: identity, mission, values and a link to the separate Team page.
- `/pages/what-we-do.html`: Schools, Holiday Programs and Bioethics, with visible eligibility/logistics and expandable track/curriculum details.
- `/pages/schools.html`: school-program overview, five-stage pathway, online delivery, progress records and an email inquiry checklist.
- `/pages/how-we-work.html`: manual three-photo gallery, learning habits, three delivery summaries, outcomes and independent FAQs.

Header links open full pages. Each program page has `#schools`, `#holiday` and `#bioethics` anchors. Historical `/pages/about.html`, `/pages/offerings.html`, `/pages/biology.html`, `/pages/training-pathway.html` and `/pages/partnership.html` redirect to the matching canonical page/section. These are actual build entries and work without a hosting redirect configuration. Query strings and applicable fragments are preserved. The sitemap lists the 16 English and Cantonese canonical pages.

Holiday pages describe the documented course formats and ask visitors to email about availability; the archived Summer 2026 schedule is not advertised as upcoming. Course-specific caps and eligibility come from the approved repository content. School arrangements are agreed separately. The gallery is manual; there is no autoplay or placeholder video. Reduced motion stops the decorative strip and reveal animations.

The Schools header item sits between How We Work and Resources. `links.method` points to How We Work; `links.schools` points to the separate Schools page. What We Do and How We Work keep their `#schools` summaries and link to the full school page. The detailed five-stage sequence is maintained once in `src/programContent.js` and rendered on Schools. `/pages/training-pathway.html` now redirects to Schools#pathway; `/pages/partnership.html` redirects to Schools#inquiries. The new page uses the same email inquiry destination and retains no Google Forms or registration forms. Active editorial copy uses American spelling.


## Cantonese / Traditional Chinese site

The eight English pages have Cantonese counterparts: `/cnindex.html` and `/pages/cnwho-we-are.html`, `/pages/cnwhat-we-do.html`, `/pages/cnhow-we-work.html`, `/pages/cnschools.html`, `/pages/cnteam.html`, `/pages/cnresources.html`, `/pages/cncontact.html`. The header language link switches to the matching page, retaining queries and section/tool/member fragments. Ordinary internal navigation and home logos stay in the selected language.

`src/i18n/index.js` owns the small URL/translation interface. The English source text is the fallback; grouped `zh-HK.json`, `pages.zh-HK.json`, `team.zh-HK.json` and `resources.zh-HK.json` catalogs supply Cantonese. Update the matching catalog when changing public copy. `tests/locale-coverage.test.jsx` checks current roster and owned resource content coverage. Both languages render the same React components; there is no duplicated Chinese component tree or DOM translation overlay.

The current `public/data/team_members.json` remains the roster authority. Team translations are matched to exact current source text. The archived Chinese roster was used only as translation evidence; it is not loaded at runtime. Changed untranslated source text falls back to its current English version and must receive a catalog update before the coverage gate passes.

Cantonese tool labels, lessons, motions and game feedback preserve existing IDs, score rules and storage keys. Existing user drafts remain exact; new drafts use a localized sample. External PDFs, videos and posts keep their actual URLs/language and are identified as English resources. Native browser validation and third-party content follow their own language settings.

`src/styles/locale.css` provides native CJK font stacks and locale-scoped typography. Blue/white colors, photographs and Latin brand treatment remain shared. Fonts can vary with the operating system; source photographs retain their original embedded text.

Six Chinese compatibility entries (`cnabout`, `cnofferings`, `cncourses`, `cnbiology`, `cntraining-pathway`, `cnpartnership`) redirect to the current Chinese pages/sections. All canonical HTML entries include paired `en`, `zh-HK` and `x-default` links.

`npm run test:browser` now also runs `tools/cantonese-browser-check.mjs`: 32 Chinese page/viewport checks, language round trips, aliases, disclosures, gallery, biographies, Alumni and an intercepted Contact success. Chinese captures/results are under `.firecrawl/verification/cantonese/`; the delivery record is `.planning/verification/debatecraft-cantonese-site.md`. No live submission or deployment is part of verification.
