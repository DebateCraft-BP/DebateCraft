# Hejl reference patterns for DebateCraft's remaining pages

Prepared October 20, 2026. Artifact: **UI capture and design-system reference**, not an application implementation or a brand-asset-only lookup.

Sources: [What We Do](https://www.hejlfoundation.org/what-we-do/) and [How We Work](https://www.hejlfoundation.org/how-we-work/). Only these two pages were fetched. Shared header/footer, fonts and tokens were checked against the existing homepage/Team evidence. DebateCraft content, branding and the approved blue-and-white palette remain authoritative for future implementation.

## Deliverables

| Page | Markdown and HTML | Downloaded Firecrawl screenshot | Settled desktop / mobile |
| --- | --- | --- | --- |
| What We Do | [Markdown](what-we-do/page.md), [processed HTML](what-we-do/page.html), [raw HTML](what-we-do/page.raw.html) | [PNG](what-we-do/.firecrawl/design-reference.png), 1920×5785 | [Desktop](what-we-do/desktop-clean.png), 1440×4373; [mobile](what-we-do/mobile-clean.png), 390×6028 |
| How We Work | [Markdown](how-we-work/page.md), [processed HTML](how-we-work/page.html), [raw HTML](how-we-work/page.raw.html) | [PNG](how-we-work/.firecrawl/design-reference.png), 1920×7998 | [Desktop](how-we-work/desktop-clean.png), 1440×6229; [mobile](how-we-work/mobile-clean.png), 390×7800 |

Each page also has `desktop-settled.png` and `mobile-settled.png` retaining the initial cookie banner, and `desktop-hero.png` / `mobile-hero.png` without it. Clean views dismiss optional cookies through the source controls. Source forms were not submitted and no messages were sent.

### Captured component states

Both `desktop-` and `mobile-` versions are available:

- What We Do: `program-1.png`, `program-2.png` and `marquee.png` in its folder. These show the alternating desktop layout, stacked mobile layout and one scrolling-strip frame.
- How We Work: `gallery-1.png`, `gallery-2.png`, `cards.png`, `approach.png`, `video-poster.png`, `faq-closed.png` and `faq-open.png` in its folder. Open FAQ HTML is also saved as `desktop-faq-open.html` / `mobile-faq-open.html`.

The gallery changed index **0 → 1 → 0** through Next and Previous at both sizes. The first FAQ changed `aria-expanded` to true and removed `inert` from its answer. Opening the second left **both answers open**; toggling the first closed it. These are observed behaviors, not assumptions from static HTML. Video playback was not tested.

## Capture context and evidence

- CLI: `firecrawl scrape`, `--format branding,markdown,images,html,rawHtml --full-page-screenshot --json --max-age 0 --wait-for 3000`; full page retained, without `--only-main-content`.
- What We Do: HTTP 200, scrape ID `01a15bb8-a6d3-74d2-bf3d-f39cf761c2ac`; [complete JSON](what-we-do/.firecrawl/design-reference.json).
- How We Work: HTTP 200, scrape ID `01a15bb8-a4e1-73a0-ac65-f839ee5b3e1a`; [complete JSON](how-we-work/.firecrawl/design-reference.json).
- Returned timezone: America/New_York; proxy: basic. Returned page modification dates are June 18 and July 23, 2024; these are not the capture date.
- Firecrawl returned signed screenshot URLs. They were downloaded with curl and the local PNGs were inspected. The CLI did not return its viewport height; screenshot pixel dimensions alone do not establish that viewport.
- Supplemental Chromium: 1440×1000 desktop and 390×844 mobile, device scale factor 1, separate fresh contexts. Each page was scrolled through, fonts awaited and images decoded before captures; videos were paused without starting playback. The mobile context used touch/mobile emulation.
- The two original Firecrawl screenshots, both settled desktop pages, both settled mobile pages, focused mobile program/gallery examples and open FAQ screenshots were visually inspected. Full-page images are supplemented by component captures so tiny downscaled text is not the only evidence.
- All four supplemental captures had no document-level horizontal overflow and no uncaught page errors. Three off-screen scrolling-strip images on What We Do mobile still had no `src`; this is recorded below rather than counted as a completed image load.

Evidence files:

- [Source/capture metadata](.firecrawl/source-context.json), [settled states and measurements](.firecrawl/settled-captures.json), per-page `.firecrawl/desktop-metrics.json`, `mobile-metrics.json`, `desktop-states.json`, `mobile-states.json`.
- [Fresh source stylesheet](styles.source.css), [selected CSS rules with media-query contexts](.firecrawl/css-evidence.json), [HTML evidence](.firecrawl/html-evidence.json).
- [What We Do image inventory](what-we-do/image-inventory.json), [How We Work image inventory](how-we-work/image-inventory.json).
- [Capture/download preparation](prepare-captures.mjs), [browser reproduction script](capture-states.mjs).

Both pages link to [the same theme stylesheet](https://www.hejlfoundation.org/app/themes/hejl-foundation/_/dist/styles.css?ver=1718970371). Its fresh SHA-256 is `c2953c1d31674aa42b5a51b49e435715721cf281d9e7af3d8c8d388c0a1d4948`, identical to the earlier Team capture. Existing `src/styles/reference.css` already contains these component rules with local font paths.

## Evidence conventions

**Extracted** means declared CSS/HTML or a returned value. **Observed** means inspected screenshot pixels or a tested interaction. **Proposed** means a DebateCraft implementation choice. Exact rem declarations below are extracted; pixel measurements apply only to the stated viewport. No unmeasured spacing or animation timing is presented as exact CSS.

## Shared tokens and page-specific colors

| Semantic role | Source value | Evidence |
| --- | --- | --- |
| Main text, dark controls/footer | `#0A0A0A` | Root primary token and shared component rules |
| What We Do page | `#ECF3F3` | `body.page-template-page-areas`; measured rgb(236,243,243) at both sizes |
| What We Do hero disk | `#FBFFFF` | `.hero-areas:before` |
| How We Work page | `#ECECE7` | `body.page-template-page-grant-resources`; measured rgb(236,236,231) |
| How We Work hero disk | `#F5F5F0` | `.hero-gr:before` |
| Program and approach cards; desktop gallery arrows | `#FFFFFF` | `.card`, `.approach-card`, `.slider-navigation__button` |
| Gallery pagination / muted content | `#737373` | `.slider-gallery__pagination` and measured components |
| Mobile gallery arrows and selected links | `#842B27` | Mobile `.slider-navigation__button`, shared text/link treatment |
| FAQ heading hover/focus surfaces | `#F2D8D3`, `#FAECE2`, `#EEF1DF`, `#ECF3F3` | FAQ item variant custom properties + `.accordion__heading:before` |
| Pale decorative disks | `#FBF3F3` | `.animated-line--areas-*` declarations |

Observed cards are flat white with rounded corners and no visible shadows; their measured `boxShadow` was `none`. Thin FAQ dividers are declared as `1px solid #0A0A0A` in `.accordion:before`.

**DebateCraft palette adaptation:** use the current shared `--color-bg: #F2F7FE`, white surfaces, and supporting blue tokens `#EAF0F7`, `#E2EFFA`, `#9CBFD7`. Replace the source's green-gray, warm-gray and pink/orange surfaces as appropriate; keep the source color evidence above separate from this proposed mapping. Preserve DebateCraft's existing text, logos and accent treatment. Avoid assigning WordPress body classes that would silently restore source backgrounds.

### Fonts, sizing and containers

Extracted fonts: PP Editorial New weight 200, normal and italic; Inter weights 400 and 500. Firecrawl identifies these families but its generic heading stack/size summary conflicts with the actual heading selectors. Use the saved CSS and browser measurements.

Desktop root sizing is `.5787037037vw`, capped at 12px above the source's 1280px breakpoint; 1rem ≈ 8.333px at 1440px. At ≤767px portrait, `2.5641025641vw` makes 1rem = 10px at 390px. Separate landscape rules exist; landscape was not captured.

| Element | Source desktop declaration | Source mobile declaration | Measured at 1440 / 390px |
| --- | --- | --- | --- |
| What We Do hero | size-2: 6.4rem / 1.1 | size-1: 4rem / 1.2 | 53.33 / 40px |
| How We Work hero | size-1: 8.4rem / 1.1 | size-1: 4rem / 1.2 | 70 / 40px |
| Section and alternating-row titles | size-2: 6.4rem / 1.1 | size-2: 3.6rem / 1.2222 | 53.33 / 36px |
| Program-card titles | size-4: 3.2rem / 1.1 | size-4: 2.4rem / 1.1667 | 26.67 / 24px |
| FAQ questions | size-3: 4rem / 1.1 | size-3: 3.2rem / 1.25 | 33.33 / 32px |
| Body | default: 1.8rem / 1.4 | default: 1.6rem / 1.375 | 15 / 16px |

Shared layout uses 24 desktop columns, six mobile columns, gutter 1.2rem and inner span `3 / span 20` desktop / `1 / -1` mobile. Wrapper token: 172.8rem; margins: 2.4rem desktop / 1.6rem mobile. Common outer padding is `max((100% - var(--wrapper-width)) / 2 + var(--margin), var(--margin))`. Inner content begins at x=137.5px at 1440px and x=16px at 390px. Main section spacing token is 19.2rem desktop / 9.6rem mobile.

## What We Do patterns

### Section order

1. Shared fixed header.
2. Centered large serif statement inside a pale circular surface, with three small circular inline image bubbles and one italic word.
3. Centered Program Areas label/title.
4. Four numbered text/image sections: Arts & Culture, Education, Health, Privacy & Advocacy. Desktop alternates text-left/image-right, then image-left/text-right. Mobile uses **text then image for every item**.
5. Two oversized horizontal typographic strips with inline photographs, clipped beyond the page edges.
6. Shared dark footer.

### Hero and inline imagery

`.hero-areas` declares `--size:106.8rem`, `--offset-top:1.6rem`, height `calc(var(--size) + var(--offset-top))`, and container padding `43.4rem 0 33.6rem`. Mobile changes size to `144vw` and padding to `22.5rem 0 9.6rem`. The round surface is a pseudo-element; its initial scale .6 transitions to the in-viewport state. The exact scroll/reveal timeline was not measured.

The text spans columns 6/span14 desktop and the entire mobile grid. `.heading-bubbles` uses flex wrapping, centered text and .2em column gaps. Bubble height is 6.3rem desktop / 3.5rem mobile; variants can be two or three times as wide, with radius half their height. Which variant is used must be read from each page's markup rather than assuming every hero has the same bubble count.

### Alternating editorial rows

`.areas-areas__list` has row gap **28.4rem desktop / 9.6rem mobile**. Each desktop item is a 20-column subgrid: text spans nine columns and imagery spans the final nine; even items reverse placement through CSS order and column rules. Mobile resets that order and spans both parts across the full grid, with 6.4rem row gap inside each item.

Titles have a 2.4rem top gap from the numbered colored-dot label. Body text starts 8rem below the title desktop / 2.4rem mobile. Images use radius-l (2.4rem) and cover cropping, with declared aspect ratio **1.578 desktop / .823 mobile**. Desktop max height is 39.4rem; mobile max height is 43.5rem.

Measured first image: 518.75×328.33px desktop; 358×434.98px mobile. The narrow portrait crop is a mobile design change, not a different source image. Curved dashed SVG lines and pale circles sit behind rows, with separate desktop/mobile variants retained in raw HTML.

### Scrolling strips

`.scrolling-heading__heading` uses size-2, `white-space:nowrap`, `width:max-content` and shrinking disabled. Inline photograph width is 12rem desktop / 6rem mobile. The two rows show different horizontal positions in observed frames. A static screenshot does not establish their velocity, looping or response to scroll.

The source text includes template-like entries such as “Lorem ipsum” and inconsistent Privacy/Policy labels. Keep them as source evidence; do not migrate these strings into DebateCraft content.

## How We Work patterns

### Section order

1. Shared fixed header.
2. Larger centered serif statement with inline circular/pill images, over a large pale curved disk.
3. Five-image gallery with caption, numeric counter and circular previous/next controls.
4. Centered introductory copy followed by four white cards with circular collage imagery.
5. Centered approach heading, then a portrait image at left and three tilted white text cards at right; stacked on mobile.
6. Section label/title and a rounded video poster/player surface.
7. A large curved Frequently Asked Questions decoration, then one General Questions category and eight disclosure rows.
8. Shared dark footer.

### Hero and gallery

`.hero-gr` is centered and viewport-height on large desktop, with responsive changes at 1279px and 767px. Its background disk is 140vw desktop / 414.6vw mobile. This is distinct from the smaller circular What We Do hero; do not force both into identical dimensions.

The gallery spans columns **7 / span 12** desktop and fills the mobile content width. Its figure padding ratio is `470 / 834` desktop, switching to `435.18 / 358` mobile. Measured media box: **695×391.77px desktop** and approximately **358×436.05px mobile**. Images use cover/center crops. Caption text and pagination sit below; controls are beside the caption desktop, over the image edges on mobile. Source control circles declare size 3.2rem, white desktop and dark red mobile; a future implementation should retain adequate accessible hit areas and use the DebateCraft palette.

Observed Next/Previous changed both the photograph and counter. There are five source slides, not five separately linked pages. Only the first two slide states were visually inspected; the complete gallery inventory is retained in HTML/JSON.

### Four-card grid

`.cards` declares a 20-column inner grid; each `.card` spans five columns desktop. Mobile uses a six-column grid with each card spanning the full width and a 2.4rem row gap.

Cards: white, padding **4rem 2.4rem**, radius-m **1.6rem**, no shadow. Circular imagery is **16rem desktop / 12rem mobile**. Title gap: 3.2rem; description gap: 1.6rem desktop / .8rem mobile. The first card measured **283.75×395.30px desktop** and **358×356px mobile**; heights depend on content and row stretching, not a universal fixed height.

### Approach image and tilted text cards

The section header spans 7/span12 desktop. Content uses the common inner span, 2.9rem horizontal inset and 8.4rem flex gap; mobile removes the inset, stacks content and uses the mobile spacing token.

`.approach__image` is **41% width**, `position:sticky`, top `--header-top`, with figure height ratio `671 / 552`; mobile becomes 100% width and relative position. The source template explicitly removes `.overall` overflow restrictions to support this. DebateCraft currently has shared overflow handling, so sticky behavior must be tested rather than copied without checking the ancestor layout.

Three white `.approach-card` surfaces have desktop padding `4.7rem 6.8rem 4.7rem 4.8rem`, mobile padding 2.4rem, gap 1rem, radius-m and no shadow. Captured inline styles specify **rotate(-3deg)** on all three; computed matrices also show approximately -3° on desktop and mobile. These are observed settled transforms, not proof of every animation frame.

### Video surface

`.video-player` declares figure padding ratio `751 / 1393`, radius 3.7rem desktop; mobile uses `435.18 / 358`, radius 1.6rem. The poster is a cropped image with a Play video control and source custom controls in HTML. The source video URL is recorded in HTML evidence, but the MP4 was not downloaded as a standalone file and playback, audio, fullscreen and control interactions were not exercised. A visible poster does not establish working playback.

### FAQ disclosures and curved decoration

Rows span the shared 20-column inner container on desktop. Heading layout itself has 20 columns: number at left, serif question in `9 / 20`, arrow at right. Answer content aligns to `9 / 18`. Heading padding is 3.2rem top and 3.3rem bottom. Mobile uses a 5.4rem left indent, 3.6rem right allowance, absolute number/arrow and stacked answer text; answer container adds 3.1rem top padding.

The source expands from grid rows `max-content 0fr` to `max-content 1fr` through `.accordion.is-open`, with declared .5s grid transition. Hover/focus adds a full-width pastel heading background; the answer does not become a large pastel card. Mobile open-state screenshot has no desktop hover surface. These differences are visible in the focused captures.

Multiple questions can remain expanded simultaneously. Only the first two questions were exercised. There is one visible General Questions category here; the presence of reusable tab-related class names is not evidence of additional working category tabs.

The curved FAQ decoration is a very large inline SVG of outlined paths, not ordinary heading text. `.faq-marquee` declares width 241vw desktop / 443vw mobile; current transform/markup is in HTML evidence. Its exact animation sequence was not established. It may be reconstructed using accessible text plus a decorative SVG/textPath as a proposed implementation rather than copying a huge opaque path asset.

## Image references and observed use

Individual photograph/collage URLs below are **references**, not downloaded standalone image files. Screenshots, HTML, CSS and JSON were saved locally. Inventories retain responsive variants, declared dimensions and ancestor classes; metrics retain rendered `currentSrc`, decoded dimensions and crop styles.

| Use | Source reference |
| --- | --- |
| What We Do hero bubbles | [portrait bubble](https://www.hejlfoundation.org/app/uploads/2024/05/areas-bubble-1-jpg.webp), [event image](https://www.hejlfoundation.org/app/uploads/2024/05/image006.png), [health image](https://www.hejlfoundation.org/app/uploads/2024/06/cdc-ehwsgs4t2ui-unsplash-1-jpg.webp) |
| Four alternating program collages | [Arts](https://www.hejlfoundation.org/app/uploads/2024/05/arts-04-3-2560x1440.webp), [Education](https://www.hejlfoundation.org/app/uploads/2024/05/image-71-2560x1440.webp), [Health](https://www.hejlfoundation.org/app/uploads/2024/05/image-74-2560x1440.webp), [Policy/Privacy](https://www.hejlfoundation.org/app/uploads/2024/05/collage-05-4-2560x1441.webp) |
| Gallery slides 1–2, inspected | [Casita Maria](https://www.hejlfoundation.org/app/uploads/2024/06/unnamed-4b73dccc-1920w.webp), [aWall Mural Projects](https://www.hejlfoundation.org/app/uploads/2024/06/img-1733-jpg.webp) |
| Gallery slides 3–5, inventory only | [Sebastian Strong](https://www.hejlfoundation.org/app/uploads/2024/06/caleb-wilson-2-jpg.webp), [Florida Grand Opera](https://www.hejlfoundation.org/app/uploads/2024/05/grant-slider.png), [Casa Cuba](https://www.hejlfoundation.org/app/uploads/2024/06/casacuba-body-min-jpg.webp) |
| Circular program-card collages | [Arts](https://www.hejlfoundation.org/app/uploads/2024/05/arts-04-4-2048x2048.webp), [Education](https://www.hejlfoundation.org/app/uploads/2024/05/education-01-1-2048x2048.webp), [Health](https://www.hejlfoundation.org/app/uploads/2024/05/health-05-1-2048x2048.webp), [Policy](https://www.hejlfoundation.org/app/uploads/2024/05/collage-05-5-1-2048x2048.webp) |
| Approach portrait | [Classroom photograph](https://www.hejlfoundation.org/app/uploads/2024/05/grant-jpg.webp) |
| Video poster | [Poster](https://www.hejlfoundation.org/app/uploads/2024/05/poster-jpg.webp) |

Firecrawl returned 16 image references for What We Do and 19 for How We Work; raw HTML contains 14 and 15 main image elements respectively. Counts differ because returned image references/branding and responsive variants are not a one-to-one visible image inventory.

## Proposed React/Vite application to DebateCraft

Reuse the active shared Header, Footer, consent, typography, palette tokens and locally supplied DebateCraft assets. Preserve program names, member data, contact details and messaging from DebateCraft; the source foundation copy is not replacement content.

| DebateCraft page family | Candidate source patterns | Important limits |
| --- | --- | --- |
| Programs / offerings and subject pages | What We Do hero plus numbered alternating image/text rows; How We Work four-card grid for summaries | Use actual DebateCraft program descriptions and class photographs; preserve links and curriculum facts |
| For Schools / training pathway | How We Work introduction, gallery, outcome cards, approach panels and FAQ | Preserve real school-training process and inquiries; do not substitute grant policies |
| About | Hero statement and editorial/approach sections, alongside existing Who We Are evidence | Keep the approved Team page and grouping separate |
| Resources / guides | White summary-card grid, editorial rows and disclosures for genuinely expandable material | These references do not establish search, downloads, article-detail layouts or access rules |
| Contact, legal pages and blog/article details | Shared header/footer, fonts, containers and spacing | No contact form, legal-page template or article-detail UI was captured here; exact cloning of those screens needs additional scoped evidence |

Suggested reusable React modules are a statement hero with inline imagery, an alternating editorial section, a captioned gallery, a summary-card grid, an approach section and FAQ disclosures. Use native CSS grid/flex and existing dependencies; source WordPress/Swiper/GSAP runtime code is not required merely to reproduce these patterns.

For interactions, use real buttons for gallery controls and FAQ triggers with `aria-expanded` / `aria-controls`; hide collapsed answers from keyboard navigation and preserve the observed multiple-open behavior. The source's checkbox/label implementation is evidence, not an accessibility requirement to copy. Honor reduced motion, keep headings readable without reveals, and make decorative disks/paths ignore pointer events so they cannot block links. Scope clipping around moving decoration without breaking sticky content.

New page implementation is a separate task requiring its page/content mapping and approved plan. This capture does not change the application, publish a site or promise pixel-perfect reconstruction across unobserved states.

## Gaps and boundaries

- Initial CLI What We Do capture includes lazy-image placeholders; some How We Work headings were mid-reveal. Use the settled captures for image and typography comparison.
- What We Do mobile still had three off-screen marquee images with empty `src` at measurement time (`faq-4-jpg.webp`, `e6fe7c3e25140bffb7288f84f0eba3ac-jpeg.webp`, `4babaa1e49e44e8696414414bc9cfab8-jpeg.webp`). Their URLs are in the inventories and the desktop instances decoded. This is not a verified mobile load failure or complete mobile asset capture.
- Only desktop 1440×1000 and mobile 390×844 were tested for these references. Tablet, landscape, other browsers, reduced-motion source behavior and all hover/scroll states remain unverified.
- Gallery first/second states, previous navigation and two FAQ disclosures were exercised; slider looping, autoplay, swipe and complete keyboard semantics were not exhaustively tested.
- No video playback or source newsletter submission was tested. Markdown may include hidden templates, consent copy and inactive slides; it does not identify visible UI by itself.
- Photographs, collages, logos and source text remain third-party material. Capturing them is not a grant of reuse rights; future DebateCraft work should use its own assets and copy.

## Reproduction

From the DebateCraft repository root:

```sh
firecrawl scrape 'https://www.hejlfoundation.org/what-we-do/' \
  --format branding,markdown,images,html,rawHtml --full-page-screenshot \
  --json --max-age 0 --wait-for 3000 \
  -o .firecrawl/hejl-pages-reference/what-we-do/.firecrawl/design-reference.json

firecrawl scrape 'https://www.hejlfoundation.org/how-we-work/' \
  --format branding,markdown,images,html,rawHtml --full-page-screenshot \
  --json --max-age 0 --wait-for 3000 \
  -o .firecrawl/hejl-pages-reference/how-we-work/.firecrawl/design-reference.json

# Extracts Markdown/HTML and downloads signed screenshots plus source CSS with curl:
node .firecrawl/hejl-pages-reference/prepare-captures.mjs

# Supplemental viewports and interaction states, using installed Playwright Chromium:
node .firecrawl/hejl-pages-reference/capture-states.mjs
```

Keep the original capture JSON with these files. Signed URLs may expire; rerun Firecrawl before redownloading expired screenshots. Existing standalone source photographs were not downloaded in this task.
