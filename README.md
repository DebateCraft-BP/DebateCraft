# DebateCraft

React/Vite website for DebateCraft with a homepage and Team page. The visual layout takes its typography, spacing and component treatment from the Hejl reference; the live pages use DebateCraft branding, people, programs, photographs and copy from the preserved original site. Both pages share a pale-blue (`#F2F7FE`) background and white cards.

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

Start the preview before running these checks. `npm run test:browser` checks both the homepage and Team page at 390, 900, 1440 and 1920px widths, including navigation, filters, biographies, keyboard operation, retired entries and recovery states. Screenshots and raw browser measurements are saved under `.firecrawl/verification/`. Verification reports are `.planning/verification/debatecraft-content.md` and `.planning/verification/debatecraft-team.md`.

## Content and assets

- `src/content.js` owns DebateCraft navigation, course cards, article/resource links and social accounts.
- `src/components/` implements the shared visual layout and interactions.
- `public/media/debatecraft/` contains the original DebateCraft logos and class photographs, copied without alterations and with original filenames.
- `public/debatecraft-asset-sources.json` records the original file paths and checksums.
- `public/data/team_members.json` is the active English Team roster; update this JSON to change public member details. It was migrated from the archived roster with retired image fields removed.
- `public/Images/` contains current members' portraits with original filenames. `public/team-asset-sources.json` records their sources and checksums. Retired portraits are excluded from the active assets.
- `src/styles/reference.css` preserves the extracted design rules with local font paths; `src/styles/app.css` handles shared state, branding and the requested blue palette; `src/styles/team.css` adds Team controls, accessible focus styling and responsive adaptations.
- `legacy/` preserves the original site, including archived English/Chinese roster JSON, pages, scripts and assets. It is excluded from the production build.

The homepage's Team links open `/pages/team.html`, a real Vite build entry that supports direct visits and reloads. The Team page's home logo returns to `/`. Other header, footer, program and resource destinations point to the corresponding existing DebateCraft pages. The source page's grant section is now DebateCraft's impact section. Its program cards and story cards contain DebateCraft courses and learning resources. The reference site's video, portraits and photographs are not shipped in the active build.

The Team page shows Adrian Chan, Gavin Zhao and Sandeep Chulani under Leadership, and the other 26 current members under Our Team. Existing category filters keep their original JSON matching independently of these visual groups; the Leadership filter therefore still matches all executive-category members. Name search applies within the selected category. Current cards open a full-screen biography, with no website or LinkedIn buttons; `#member-adrian-chan` and other current-member hashes support profile links. Six retired members appear only through Retired, as text-only, non-interactive entries with no portrait or biography access. Failed current-member portraits show initials, and failed roster requests offer Retry.

Cookie preferences persist locally without enabling tracking. The newsletter field validates locally and reports that delivery is unavailable in this preview; the footer also links to DebateCraft's existing Substack subscription page.

The earlier Hejl-only specification and pixel comparisons are retained as design-baseline evidence and explicitly superseded for identity/content. Different copy and photographs naturally change text wrapping and document heights. No publication, deployment or commit has been performed.
