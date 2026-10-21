> Content correction: The user clarified that DebateCraft is the website identity; Hejl is the visual reference only. Literal Hejl content requirements and measurements below describe the earlier baseline and are superseded by the DebateCraft content adaptation. See the DebateCraft verification report.

# React/Vite rebuild verification

Completed October 20, 2026 under the approved Hejl homepage replacement plan.

## Result

The active root application is React 19 + Vite 8, with local fonts, video, photographs and SVG marks. The old static website is preserved under legacy/. No commit, publishing or deployment was performed. Production preview: http://127.0.0.1:4173/ (while the preview process is running).

## Test-first evidence

Each slice was written and run before its implementation, then rerun successfully:

1. Navigation workflow: initially failed because Menu was absent; passed after opening, focus wrapping, Escape dismissal and focus restoration were implemented.
2. Consent workflow: initially failed because Manage Cookies was absent; passed after selection, required-cookie protection and persistence across visits were implemented.
3. Newsletter workflow: initially failed because Email address was absent; passed with native invalid-email rejection, honest preview feedback and no external request.
4. Homepage exploration: initially failed because main was absent; passed with the ordered complete sections and correct grant/article destinations.
5. Browser resize regression: initially failed with the mobile menu still present at desktop width; passed after responsive dismissal and focus transfer.
6. Browser drag regression: initially failed because the card did not move; passed after pointer capture, movement and return-to-layout behavior.

Final Vitest result: four tests across four files passed. These exercise rendered public controls/content; internal modules are not mocked. HTMLMediaElement behavior is checked in the real browser rather than simulated by the unit environment.

## Production and browser checks

- npm run build passed using Vite 8.3.4.
- The complete browser suite passed against the built preview as well as the development application.
- Confirmed consent acceptance and denial survive reload, native settings Escape handling, mobile-to-desktop menu dismissal, draggable card return, native email validation, no subscription request, and reduced-motion video pause/readable headings.
- At 390, 900, 1440 and 1920px widths: no horizontal document overflow, missing photographs, missing primary fonts or browser console/application errors.
- npm audit reported zero vulnerabilities after updating the initially selected Vite version to its patched release.
- git diff --check passed.
- Validated checksums of 16 downloaded source assets and the derived poster. Confirmed all are present in dist/ and legacy content is excluded from dist/.
- Compared all 96 originally tracked website files moved to legacy/ against HEAD byte for byte. Also preserved the original README.

## Visual comparison

Captured both source and local pages with Chromium at deviceScaleFactor 1, after fonts loaded and reveal sections settled. Paused/seeked video to 0.4 seconds. Captures retain the initial consent banner. Explicit image decoding prevents offscreen lazy-image paint gaps in full-page screenshots.

The following table compares whole document heights and the largest bounding-rectangle difference among the hero, grant section, programs section, news section and footer. This establishes geometry at these viewports, not universal pixel identity.

| Viewport | Local document height | Reference height | Largest section rectangle difference |
| --- | --- | --- | --- |
| 390 × 844 | 5443 | 5443 | 0.000px |
| 900 × 1000 | 3317 | 3317 | 0.000px |
| 1440 × 1000 | 5625 | 5625 | 0.031px |
| 1920 × 1080 | 7142 | 7142 | 0.000px |

Screenshots:

- [Desktop local](../../.firecrawl/verification/local-1440.png) / [reference](../../.firecrawl/verification/reference-1440.png)
- [Mobile local](../../.firecrawl/verification/local-390.png) / [reference](../../.firecrawl/verification/reference-390.png)
- [Wide local](../../.firecrawl/verification/local-1920.png) / [reference](../../.firecrawl/verification/reference-1920.png)
- [Intermediate local](../../.firecrawl/verification/local-900.png) / [reference](../../.firecrawl/verification/reference-900.png)

Raw evidence: [local measurements](../../.firecrawl/verification/comparison-metrics.json), [reference measurements](../../.firecrawl/verification/reference-metrics.json), [browser checks](../../.firecrawl/verification/browser-results.json), and [pixel comparison](../../.firecrawl/verification/pixel-comparison.json).

Static-region image comparison excludes the hero video and footer's moving social pills. Its mean absolute RGB differences, on a 0–255 channel scale, are:

- 390px: 0.995; 1.78% of region pixels differ by more than 10 grayscale levels.
- 900px: 0.525; 0.93% of region pixels differ by more than 10 grayscale levels.
- 1440px: 0.398; 0.92% of region pixels differ by more than 10 grayscale levels.
- 1920px: 0.316; 0.78% of region pixels differ by more than 10 grayscale levels.

This metric is descriptive, not an assertion that the page is a particular percentage pixel-perfect. Section geometry, complete text, typography, colors, image crops, layouts and responsive changes were compared using source HTML/CSS plus screenshot pixels. The reference's word-splitting wrappers can produce different heading element bounds from normal React text even when line wrapping is visually aligned.

## Fidelity and service limits

- The hero video is original media, but a live frame depends on timing. Native reveal and hover/drag behavior approximates the reference runtime; social pills use a deterministic arrangement rather than its physics engine.
- Newsletter delivery is intentionally unconfigured. Valid input reports that signup is unavailable in this preview; it never claims a successful subscription.
- Cookie preferences are local UI state; no source analytics or tracking is loaded. A preferences control is available on footer hover or keyboard focus.
- Other Hejl pages remain external destinations and are outside the approved homepage scope.
- The supplied design is implemented closely at the tested viewports; exact pixel identity across arbitrary browsers, timestamps and interaction states is not asserted.

## Reproduce

Use README.md for installation, development, build, preview and browser commands. Screenshots and raw measurements are local generated artifacts under .firecrawl/verification/, excluded from Git by design. Original extraction evidence remains in the chat's hejl-foundation reference folder.
