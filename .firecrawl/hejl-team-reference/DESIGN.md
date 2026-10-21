# Who We Are — team-page UI reference

## Purpose and scope

Prepared October 20, 2026 for the DebateCraft React/Vite project.

**Artifact:** source capture and design-system reference. The Hejl page supplies visual patterns; a future DebateCraft team page must use DebateCraft's own identity, portraits, names, roles and biographies. No application implementation is included in this capture task.

Source: [Who We Are](https://www.hejlfoundation.org/who-we-are/). Only this page was fetched; the homepage's prior captures supplied context rather than a new crawl.

## Capture context and files

- [Original CLI JSON](.firecrawl/design-reference.json): branding, Markdown, image inventory, processed HTML, raw HTML, screenshot URL and source metadata.
- CLI live fetch: `--max-age 0 --wait-for 3000`, full page retained; HTTP 200; scrape ID `01a15b9e-a39b-7688-b5c3-298daf6aca9b`; returned timezone America/New_York, proxy basic.
- [Downloaded CLI screenshot](.firecrawl/design-reference.png): 1920 × 6645 image pixels. CLI viewport height was not returned.
- [Mobile Firecrawl screenshot](mobile-full.png): requested viewport 390 × 844; full image 390 × 9518. [Mobile metadata](.firecrawl/mobile-capture.json); scrape ID `01a15b9e-9bdc-70bc-b95d-4caaefd77bbd`.
- [Markdown](page.md), [processed HTML](page.html), [raw HTML](page.raw.html), [mobile HTML](mobile.html).
- [Fresh theme stylesheet](styles.source.css), fetched from [the source CSS](https://www.hejlfoundation.org/app/themes/hejl-foundation/_/dist/styles.css?ver=1718970371). The URL/version also matches the previously captured homepage stylesheet.
- [Selected CSS declarations with media-query context](.firecrawl/css-evidence.json).
- [HTML image inventory](image-inventory.json), including source URL, rendered URL, source dimensions and ancestor component classes.

The source metadata modification date, July 19, 2024, is not the capture date. Signed remote screenshot URLs expire; the downloaded PNGs remain usable.

### Settled views and biography state

Initial Firecrawl captures caught some desktop headings mid-reveal. The mobile hero appears mostly gray because its top crop shows the photograph’s sky and the cookie banner covers the lower image; a focused viewport capture confirmed that the responsive image is decoded and visible. Supplementary Chromium captures scrolled through this same page, awaited fonts/image decoding, and returned to the top before taking screenshots:

| Capture | Viewport | Saved image/state |
| --- | --- | --- |
| Desktop page, settled | 1440 × 1000 | [Full page](desktop-settled.png), image height 5023 |
| Mobile page, settled | 390 × 844 | [Full page](mobile-settled.png), image height 9518 |
| Desktop team sections | Derived crop of desktop capture | [Team detail](team-desktop.png) |
| Mobile board section | Derived crop, first 1800px of team area | [Team detail](team-mobile.png); does not contain the whole roster |
| Desktop biography open | 1440 × 1000 | [Overlay screenshot](bio-desktop.png), [active dialog HTML](bio-desktop.html) |
| Mobile biography open | 390 × 844 | [Overlay screenshot](bio-mobile.png), [active dialog HTML](bio-mobile.html) |

For biography screenshots, cookie settings were opened and optional cookies denied before opening the first board card. Escape closed the biography at both captured viewports. [Capture context and measured rectangles](.firecrawl/settled-captures.json) and [reproduction script](capture-states.mjs) are saved.

All initial full-page captures, both settled pages, focused desktop cards, and both biography screenshots were visually inspected. The [focused mobile hero](mobile-hero-viewport.png) and [its loading/style evidence](.firecrawl/mobile-hero-state.json) distinguish actual sky/crop content from a missing image. A screenshot URL alone was not treated as inspected evidence.

## Evidence conventions

- **Extracted:** exact declarations in saved CSS/HTML, returned metadata, or browser measurements.
- **Observed:** visible in screenshot pixels.
- **Proposed:** recommendations for a future React/Vite implementation.
- CSS rem values below are exact source declarations. Pixel conversions are calculations at a specified width, not universal pixel tokens. Do not present unmeasured spacing as exact CSS.

## Page composition

Observed and confirmed by HTML:

1. Fixed black logo at left, white pill navigation at right; circular menu trigger on mobile.
2. Centered editorial introductory heading, then a rounded monochrome coastal photograph.
3. About text at left, a tilted contextual image partly beyond the right edge, and a curved dashed decorative path.
4. Mission: large photograph beside a dusty-pink text panel on desktop; stacked photograph and panel on mobile.
5. Values: introduction followed by four white cards with circular collage images. Four columns on desktop; one column on mobile.
6. Board: centered label/title, then three large portrait cards.
7. Leadership: left-aligned heading on desktop, then four smaller portrait cards; heading centered on mobile.
8. Shared black footer with capsule logo, social pills, newsletter field, links and copyright.
9. A fixed cookie banner in the initial state. Biography overlays appear above the page when a team card opens.

The source has seven visible member cards but five unique people: two people appear in both groups with different roles. This duplication is source content, not a requirement for DebateCraft's roster.

## Semantic color roles

| Role | Exact source value | Evidence |
| --- | --- | --- |
| Page background | `#F7EBEA` | `body.page-template-page-about-us`; measured rgb(247,235,234) on both viewports |
| Main text and dark footer/controls | `#0A0A0A` | root primary color; shared body/button/footer rules |
| Portrait name strips, value cards, nav, biography overlay | `#FFFFFF` | `.leaders-about__item`, `.members-about__item`, `.card`, `.nav`, `.dialog` |
| Mission panel | `#F2D8D3` | `.mission-about__content` |
| Mission panel text | `#842B27` | `.mission-about__content` |
| Muted role text | `#737373` | board/member role selectors; biography role selector |
| About/value section dots; mobile biography link pills | `#E7A579` | `.label--orange:before`; mobile `.team-dialog__content-link` |
| Board label dot | `#CBD6A2` | `.label--green:before` |
| Leadership label dot and biography close control | `#A8C7C4` | `.label--sea:before`; `.team-dialog__close` |
| Decorative circles | `#FBF3F3` | `.animated-line--about-*` background variables |
| Close hover/focus surface | `#ECF3F3` | `.team-dialog__close:hover` / `:focus-visible` |

The page background differs from the homepage's cream `#FEF9F2`. Firecrawl's branding output correctly reports the blush background here, but its generic heading font stack/size summary conflicts with the source heading declarations. Use the CSS and observed typography.

## Typography and root sizing

Extracted font faces: PP Editorial New, weight 200 normal and italic; Inter, weights 400 and 500. Heading selectors explicitly use PP Editorial New; body and role labels use Inter.

The source's desktop root font size is `.5787037037vw`, capped at 12px for widths ≥1280px. At ≤767px portrait, it is `2.5641025641vw`; a separate landscape rule uses `1.3020833333vw`. At 1440px, 1rem ≈ 8.333px. At 390px portrait, 1rem ≈ 10px.

| Element | Desktop source | Mobile ≤767px source | Computed at 1440 / 390px portrait |
| --- | --- | --- | --- |
| Hero heading | 6.4rem / 1.1 | 4rem / 1.2 | 53.33 / 40px |
| Team section titles | 6.4rem / 1.1 | 3.6rem / 1.2222 | 53.33 / 36px |
| Member names | 3.2rem / 1.1 | 2.4rem / 1.1667 | 26.67 / 24px |
| Member roles | 1.6rem / 1.4 | 1.2rem / 1.1667 | 13.33 / 12px |
| Biography name | 4rem / 1.1 | 3.2rem / 1.25 | 33.33 / 32px |
| Body | 1.8rem / 1.4 | 1.6rem / 1.375 | 15 / 16px |

Evidence: root `--font-size-*` declarations and `.hero-about__heading`, `.leaders-about__heading`, `.members-about__heading`, name/role selectors, and biography selectors.

Labels use uppercase Inter with small colored circular markers. Names are light serif, not bold sans-serif. Roles use gray Inter beneath the name.

## Layout and portrait cards

### Shared container

Extracted: 24 desktop columns, six mobile columns, 1.2rem gutters. Main inner content span is `3 / span 20` on desktop and `1 / -1` on mobile. Wrapper-width token: 172.8rem. Outer margin: 2.4rem desktop, 1.6rem mobile.

Repeated section padding:
`max((100% - var(--wrapper-width)) / 2 + var(--margin), var(--margin))`.

At 1440px, the first board/member card starts at x=137.5px. At 390px, it starts at x=16px. These are measured examples; the underlying layout is fluid.

### Board / primary group

Extracted selectors: `.leaders-about__header`, `.leaders-about__list`, `.leaders-about__item*`.

- The heading and label are centered.
- The list is flex with nowrap, gap 4.8rem and margin-top 8rem. Three source cards have width 33.3333% and shrink within that row.
- At ≤767px: wrap, gap 2.4rem, margin-top 4rem, each card width 100%.
- Cards have a white surface clipped with `inset(0 0 0 0 round var(--border-radius-l))`, changing to radius-m on mobile. This is source clip-path rounding, even though computed border-radius itself is 0.
- Portrait media declares aspect ratio .783 desktop and .852 mobile. Image treatment is cover; mobile explicitly uses object-position top.
- Name/role footer padding: 2.4rem. Roles have .8rem top margin.
- Measured first card at 1440px: 361.672 × 556.531px, with 20px clipping radius.
- Measured first card at 390px: 358 × 518.188px, with 16px clipping radius.

### Leadership / secondary group

Extracted selectors: `.members-about__header`, `.members-about__list`, `.members-about__item*`.

- Heading is left-aligned within the inner content grid on desktop and centered on mobile.
- List is wrapping flex with gap 2.4rem and margin-top 8rem; mobile top margin is 4rem.
- Desktop card width is a fixed source 33.1rem. This produces four cards in the captured desktop row; do not flatten it into the board group's wider card rule.
- Portrait media declares .762 aspect ratio with 43.5rem max-height. Mobile uses .852 with 42rem max-height.
- Mobile card width is 100%; portrait image object-position becomes top.
- Same light serif name, gray role, white name strip and clipping radii as the board cards.
- Measured first card at 1440px: 275.828 × 456.609px.
- Measured first card at 390px: 358 × 518px.

Observed: large clean portraits, minimal white footers, generous inter-group space and no prominent card shadows. Source board and leadership sections use bottom padding `--spacing-default`: 19.2rem desktop, 9.6rem mobile.

## Biography overlay

Observed: clicking the first board card opens a full-viewport white detail view. Desktop places a large portrait left and name, role, social/site links and biography right. Mobile stacks the portrait, name/role, orange link pills and long biography. A teal circular × close control sits near the upper-right edge. Escape closed the view in both tested states.

Extracted:

| Pattern | Source declaration |
| --- | --- |
| Overlay | `.dialog`: fixed, full viewport, white, z-index 9000; 100dvh when supported |
| Open state | `.dialog--is-open`: visible, pointer-events auto, opacity 1 |
| Transition | opacity .4s, visibility transition |
| Content grid | `.team-dialog__content`: shared columns, padding 13vh 0 |
| Desktop image span | `2 / span 10`; declared aspect ratio .976 |
| Desktop text span | `13 / span 11`; padding 3.2rem 6rem 3.2rem 0 |
| Mobile image/text | both span the full grid; text padding 4rem 0 0; image declared ratio .823 |
| Image corners | radius-l desktop, radius-m mobile |
| Biography text | margin-top 4.8rem; max-height 50vh; overflow-y auto |
| Mobile biography | margin-top 3.8rem; no max-height; line-height 1.25 |
| Close control | size 3.2rem; desktop top/right 6.4rem; mobile top 4rem/right 3.2rem |
| Mobile external links | pill padding 1.5rem 2.4rem, radius-xl, orange background |

The image aspect ratios above are declared CSS; the actual displayed box can also be affected by grid stretching/content height. Use the screenshot and measured layout when reproducing that state.

Seven dialog bodies are present in extracted content, including duplicate people with different roles. This is not evidence they are all visible on page load. The raw HTML contains hidden templates and rendered dialog copies; use the active-dialog HTML to distinguish the observed state.

Only the first person's biography was opened. The captured close control is a BUTTON, but its aria-label attribute is absent; a future implementation should provide an explicit accessible close name. Focus trapping, focus restoration, all other profiles, mobile internal scrolling and pointer close were not exhaustively tested.

## Other page patterns worth retaining

- Hero uses centered text in columns 6/span14, media in 7/span12; both span the mobile grid. Hero row gap: 6.4rem desktop / 3.9rem mobile. Padding: 10.8rem top and 22.3rem bottom; mobile 6.5rem / 9.5rem.
- About heading uses size-2; text has an 8rem top gap and 8rem right padding on desktop, becoming a 2.4rem gap without right padding on mobile.
- Contextual about photograph rotates 15° and partly leaves the right edge. It relocates into the mobile flow; do not assume its desktop absolute position applies on mobile.
- Mission photo and text are paired within the 20-column inner container; each spans ten columns. Mobile stacks with 1.2rem row gap. Mission text padding: 8.4rem desktop / 3.2rem mobile.
- Value cards use span-five within a 20-column inner grid; mobile spans the full six-column grid. Source padding is 4rem 2.4rem, radius-m. Circular illustrations declare 16rem desktop and 12rem mobile.
- Decorative dashed paths are SVGs inside `animated-line` custom elements, with different desktop/mobile variants. The pale circles are pseudo-elements. Geometry is retained in the raw HTML/CSS; animation timing/scroll progression was not measured.
- Header/footer and cookie patterns are shared with the previously captured homepage. Use the existing DebateCraft React modules when implementing, rather than importing the reference's WordPress runtime.

## Image references and observed use

These are URLs, not downloaded standalone portrait/image files. Only page/overlay screenshots, HTML/JSON/CSS and derived screenshot crops were downloaded/saved for this task. The inventory includes responsive URL variants; those variants are not distinct page illustrations.

| Use | Source URL |
| --- | --- |
| Hero coast photograph | [Image](https://www.hejlfoundation.org/app/uploads/2024/06/james-lee-nnl-exyot2u-unsplash-min-2560x1707.webp) |
| Tilted about photograph | [Image](https://www.hejlfoundation.org/app/uploads/2024/06/sebastianstrong-oscar-at-35-mile-ride-2.jpg) |
| Mission photograph | [Image](https://www.hejlfoundation.org/app/uploads/2024/04/image-mission.png) |
| Value collage 1 | [Image](https://www.hejlfoundation.org/app/uploads/2024/05/image-76-jpg.webp) |
| Value collage 2 | [Image](https://www.hejlfoundation.org/app/uploads/2024/05/image-53-jpg.webp) |
| Value collage 3 | [Image](https://www.hejlfoundation.org/app/uploads/2024/05/image-61-jpg.webp) |
| Value collage 4 | [Image](https://www.hejlfoundation.org/app/uploads/2024/05/engaged-04-1-jpg.webp) |
| Board portrait 1 | [Image](https://www.hejlfoundation.org/app/uploads/2024/04/img-4602-1.jpg) |
| Board portrait 2; leadership portrait 3 | [Image](https://www.hejlfoundation.org/app/uploads/2024/04/img-3674-jpg-e1773242942300.webp) |
| Board portrait 3; leadership portrait 4 | [Image](https://www.hejlfoundation.org/app/uploads/2024/04/photo-2-jpg.webp) |
| Leadership portrait 1 | [Image](https://www.hejlfoundation.org/app/uploads/2024/04/photo-3-jpg.webp) |
| Leadership portrait 2 | [Image](https://www.hejlfoundation.org/app/uploads/2024/04/photo-4-jpg.webp) |

Source portrait dimensions in HTML vary: 320×480, 320×390, 320×408 and 320×420. Rendered card crop ratios differ from those source ratios. Responsive URLs and actual ancestor component context are in image-inventory.json.

## Proposed DebateCraft React/Vite implementation

1. Reuse the existing DebateCraft header, footer, typography and consent modules. Add a page-scoped blush background and team layout; do not replace DebateCraft copy or identity with source names/logos.
2. Bring the preserved DebateCraft team JSON into the active project's data path, keeping it authoritative. Use each record's existing name, role, bio, image and category information. Preserve original image filenames; keep English and Chinese data aligned if both languages are in scope.
3. Derive real groupings from DebateCraft's records. Do not assign board/director roles merely because the source has those headings. Do not duplicate people just to match source card counts.
4. Implement reusable portrait cards with explicit primary/secondary size variants, plus a single selected-member dialog. Use an accessible button for each card trigger, native dialog behavior where appropriate, visible focus, named close control, Escape, focus trapping and focus restoration.
5. Match the source cover/top crop when comparing reference states, but review DebateCraft portraits individually so important faces are not cut off. Any intentional uncropped treatment should be documented as a product choice.
6. Do not invent LinkedIn/website links. Render external profile links only if supplied by actual DebateCraft records.
7. Preserve desktop and mobile layout differences. Test at 1440×1000 and 390×844 first, then intermediate widths and longer biographies.
8. Keep reveals progressive and honor reduced motion. Keep all names and biographies available when animation is disabled.
9. Fetch no source WordPress scripts, tracking or form credentials into the application. Use the HTML/CSS as evidence, not a runtime dependency.

These are implementation recommendations, not completed functionality.

## Gaps and limits

- Initial Firecrawl captures include heading reveal gaps. Use the settled captures for complete headings. The gray-looking mobile hero is a decoded coastal photograph whose sky crop is visible above the cookie banner, not a confirmed loading failure.
- Supplemental browser screenshots establish one settled state and one biography state per viewport. They do not establish every hover, scroll-animation frame, keyboard path or profile.
- Desktop card counts and single-column mobile behavior are visually verified at the listed widths; tablet layout was not visually captured.
- CSS values are extracted, but not every declaration is a universal token. Firecrawl's suggested 4px base unit and computed font summaries are not substitutes for the source CSS.
- The default page's bio text includes duplicate people and inconsistent source details between role entries. Those source biographies should not become DebateCraft content.
- Third-party logos, portraits, images and copy remain source material; this capture does not grant reuse rights.
- No DebateCraft application files were modified and no site was deployed.

## Reproduction commands

From the repository root:

```sh
firecrawl scrape 'https://www.hejlfoundation.org/who-we-are/' \
  --format branding,markdown,images,html,rawHtml \
  --full-page-screenshot --json --max-age 0 --wait-for 3000 \
  -o .firecrawl/hejl-team-reference/.firecrawl/design-reference.json

# Read the signed screenshot field from the JSON, then:
curl --fail -sL '<returned-screenshot-url>' \
  -o .firecrawl/hejl-team-reference/.firecrawl/design-reference.png

curl --fail -sL \
  'https://www.hejlfoundation.org/app/themes/hejl-foundation/_/dist/styles.css?ver=1718970371' \
  -o .firecrawl/hejl-team-reference/styles.source.css

node .firecrawl/hejl-team-reference/capture-states.mjs
```

The mobile Firecrawl capture used fullPage=true, mobile=true, waitFor=3000, maxAge=0 and viewport 390×844 through the Firecrawl connector because this CLI does not expose viewport flags. Metadata and the downloaded PNG are retained. The supplementary browser script reproduces both explicit viewports without requiring that connector.

