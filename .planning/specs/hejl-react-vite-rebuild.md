> Content correction: The user clarified that DebateCraft is the website identity; Hejl is the visual reference only. Literal Hejl content requirements and measurements below describe the earlier baseline and are superseded by the DebateCraft content adaptation. See the DebateCraft verification report.

# React/Vite homepage replacement specification

Status: Implemented and verified. Approved by the user: “tdd implement plan”.
Date: October 20, 2026.
Target: /Users/adrianclasses/Documents/GitHub/DebateCraft

## Requested result

Restart the active website as a React/Vite project and closely reproduce the supplied Hejl Foundation homepage at https://www.hejlfoundation.org/?ref=land-book.com.

Interpretation for approval: reproduce the reference's Hejl branding, English copy, logo, photographs, video, typography, sections and responsive presentation. This is a literal homepage recreation, rather than a DebateCraft content adaptation. Other Hejl pages are outside this scope; navigation, article and social links retain their original destination URLs.

## Current state, verified

The repository is a static multipage site. Root index.html and cnindex.html load React 18 from a CDN; scripts/reactPages.js owns the shared runtime; styles/main.css owns shared styling. There is no package.json, Vite configuration, automated test implementation or repository release workflow. Git working tree is clean at planning time. Node 22.23.1 and npm 10.9.8 are available.

The existing English/Chinese pages, data and images contain user work. Before replacing the entry point, preserve the existing website files in legacy/ with their directory structure. Retain project guidance, LICENSE and Git metadata at their current locations. Legacy content is not included in the Vite production build. The former site routes are retired from the active application.

## Scope

- Establish a conventional React + Vite application with npm scripts and a lockfile; use ordinary CSS and native browser APIs.
- Implement real React components for header/navigation, hero, grant database, program introduction/cards, news, footer/newsletter and consent. Do not embed a screenshot or run the old WordPress application.
- Reuse the captured original stylesheet rules, verified fonts, SVGs and media as fidelity evidence. Vendor required assets into public/ and record their source URLs. Remove reliance on reference-site runtime scripts and tracking.
- Preserve the provided root tokens, original fluid-rem sizing and desktop/mobile component differences. Browser-injected Arc palette variables and unrelated WordPress/Swiper defaults do not drive visual styling.
- Desktop: video hero, pill navigation, floating grant photographs, circle, tilted program cards over oversized title, unequal horizontal news cards, spacious two-column footer.
- Mobile: circular menu trigger, full-screen menu, stacked unrotated program cards, stacked story cards and footer.
- Implement accessible menu open/close, Escape and focus handling; consent/settings state persisted locally; native email validation. Newsletter has no configured delivery service: validate locally and give an honest unavailable-in-preview response, never a false subscription success or a request to the reference site's service.
- Add progressively enhanced section reveals, restrained card hover/drag behavior where the reference supports it, and reduced-motion support. Keep all content visible if animations are disabled.
- Run locally, capture visual comparisons, fix mismatches, and provide build and test evidence.

## Fidelity criteria

Target the supplied page's actual UI, not missing text caused by screenshot timing. The source HTML and CSS resolve animation gaps in the captures. Compare at 1440×1000 and 390×844; also inspect 1920px and an intermediate width. Match fonts/weights, line breaks, section heights, shared inset, colors, radii, image crops, card rotation and responsive order. Screenshots should be reviewed at full-page and section scale.

Use a stable reference video frame for automated comparisons; a looping video cannot be pixel-identical across arbitrary timestamps. Font rendering and animation capture also affect image diffs. Record residual differences rather than promising unmeasured pixel perfection. Investigate material geometry/text/crop mismatches; do not hide differences behind broad screenshot thresholds.

## Acceptance criteria

1. npm run dev and npm run build work, and npm run preview serves the built application.
2. The homepage matches the reference layout and complete content at desktop and mobile widths; no horizontal document overflow, broken media or missing fonts.
3. Menu and consent controls function with pointer and keyboard; persisted consent survives reload; navigation destinations are explicit and correct.
4. Newsletter accepts valid input, rejects malformed input and does not falsely claim subscription or contact external services.
5. Reduced motion preserves readable content; heading hierarchy, accessible control labels and visible focus are present.
6. Automated behavior checks pass; browser console/network checks reveal no application errors or missing local assets.
7. Existing website files remain recoverable under legacy/; unrelated project files are preserved.
8. Deliver actual screenshots and a concise verification report identifying any remaining fidelity or environment limits.

## Affected areas

New package.json / lockfile, Vite config, src/, public/, focused tests and ignore rules; replace root index.html and README.md; preserve old site files under legacy/. Planning and design evidence stay in .planning/ and reference artifacts. No commit, publishing, production deployment, remote repository change or newsletter service setup is included.

## Evidence

Full extracted design report: /Users/adrianclasses/.codex/visualizations/2026/10/20/01a15b5e-e174-70c3-9755-e498f79c8196/hejl-foundation/DESIGN.md
Original CSS: /Users/adrianclasses/.codex/visualizations/2026/10/20/01a15b5e-e174-70c3-9755-e498f79c8196/hejl-foundation/styles.source.css
HTML: /Users/adrianclasses/.codex/visualizations/2026/10/20/01a15b5e-e174-70c3-9755-e498f79c8196/hejl-foundation/homepage.raw.html
Screenshots: /Users/adrianclasses/.codex/visualizations/2026/10/20/01a15b5e-e174-70c3-9755-e498f79c8196/hejl-foundation/desktop-full.png, /Users/adrianclasses/.codex/visualizations/2026/10/20/01a15b5e-e174-70c3-9755-e498f79c8196/hejl-foundation/mobile-full.png, /Users/adrianclasses/.codex/visualizations/2026/10/20/01a15b5e-e174-70c3-9755-e498f79c8196/hejl-foundation/.firecrawl/design-reference.png

