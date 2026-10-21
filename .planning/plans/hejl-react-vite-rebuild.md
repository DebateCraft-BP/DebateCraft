> Content correction: The user clarified that DebateCraft is the website identity; Hejl is the visual reference only. Literal Hejl content requirements and measurements below describe the earlier baseline and are superseded by the DebateCraft content adaptation. See the DebateCraft verification report.

# React/Vite Hejl homepage rebuild plan

Status: Implemented and verified. Approved by the user: “tdd implement plan”.
Specification: ../specs/hejl-react-vite-rebuild.md
Screen design: ../design/screens/hejl-homepage.md

## 1. Preserve and establish the application

Inventory legacy public site files and move them to legacy/ while retaining their relative layout, before creating the new root index.html. Retain LICENSE, project instructions and tooling metadata. Create a minimal React/Vite project with development, build, preview and test scripts; add appropriate ignore rules and exact dependency lockfile. No dependency install or production source replacement occurs before approval.

## 2. Establish focused failing acceptance tests

Before implementing interactive behavior, add tests using a suitable lightweight React test setup (Vitest + Testing Library) for:
- Mobile navigation toggles, Escape closes and focus returns.
- Consent starts visible, settings changes save, and saved state survives remount/reload.
- Newsletter rejects invalid email, gives honest preview feedback for valid email and does not issue a subscription request.
- All homepage sections render in the specified order with complete copy and expected link destinations.

Run the tests and confirm relevant failures before implementation. Do not add artificial tests for static prose or copy the component implementation into its assertions.

## 3. Local assets and source tokens

Download the necessary original fonts, hero video/poster, page images and SVG treatments; record sources in an asset manifest. Verify HTTP success, actual file type and dimensions where applicable. Use captured HTML/srcset and styles rather than guessing. Keep source evidence separate from application CSS. Do not ship third-party analytics, original runtime bundles or external form credentials.

## 4. Build in page order

Create semantic React components and content arrays; implement the exact reference sections using verified CSS values. Preserve desktop and mobile arrangements, original text, crop treatment and SVGs. Wire local interactions and readable motion fallbacks; ensure the new site does not import legacy runtime files.

## 5. Verify behavior and build

Run focused tests, production build and built preview. Check browser console, failed requests, font loading, image completeness, native validation, keyboard menu/consent operation, persistence and reduced-motion behavior. Test external link targets without submitting forms or sending messages.

## 6. Compare and repair visual mismatches

Capture local desktop 1440×1000, mobile 390×844 and supplementary 1920px/intermediate views. Compare against existing screenshots and source evidence; fetch a fresh same-state reference only if a material gap requires it. Use consistent video time/consent/reveal state for image comparisons. Inspect and fix typography, line breaks, dimensions, section positions, crop ratios, footer layout and overflow. Save screenshots and comparison notes.

If browser tooling is unavailable, try the available supported browser path and report precisely which visual checks remain unverified. Do not equate a passing build with visual fidelity.

## 7. Review and deliver

Review changed files against acceptance criteria and fix in-scope findings. Run final affected checks after repairs. Update README with dev/build/preview/test commands, explain archived legacy files, and summarize remaining service/fidelity limits. Provide the running preview and concrete screenshots. Do not commit, publish or deploy.

## Approval scope

One approval covers this specification, screen design and plan through implementation, testing, visual repair and review. No phase-by-phase approval prompts. Scope changes involving other pages, DebateCraft branding/content adaptation, external service delivery or deployment require a separate decision.

