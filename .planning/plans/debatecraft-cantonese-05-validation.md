# Cantonese feature 5 — Contact, metadata and delivery verification

Date: 2026-10-21
Status: Approved on 2026-10-21; implementation and verification completed on 2026-10-22.
Depends on: all preceding locale features.

1. Translate Contact labels/hints/accessibility and sending/success/failure/email fallback using incremental mocked submission/validation tests. Preserve field names, endpoint contract, spam protection and error handling. Never send a live message during verification.
2. Complete all 16 canonical HTML entries and matching English/Cantonese alternate-language metadata. Add the six specified Chinese compatibility entries; verify direct/reload/query/fragment behavior. Update the sitemap to canonical pages only.
3. Run full English/Chinese tests and production build. Add explicit locale coverage/link/roster checks, including present dynamic/error text rather than headline-only validation.
4. Browser-check all eight Chinese pages at 1440/390 and geometry at 900/1920. Verify language links both directions, locale-aware navigation/logos, key fragments, local assets/fonts, console errors, overflow, reduced motion and keyboard focus.
5. Exercise localized course/FAQ/gallery controls, Team filters/dialog/Alumni/recovery, each resource tool, Contact mocked feedback and consent settings. Intercept all live submission endpoints; no inquiry, subscription or external form is sent.
6. Inspect actual Chinese screenshots and repair clipping, missing glyphs, poor line breaks, overlong controls, menu overlap and unreadable type. Review translations for meaning, Traditional characters and consistency with current English facts/proper names.
7. Rerun affected checks after repairs, save verification/screenshots, mark the epic complete only when all accepted scope is verified, and provide working local Chinese URLs. No commit/deployment.

Affected: Contact/Newsletter shared catalogs, all static metadata/alternate links, localized aliases, Vite inputs, sitemap, tests/browser tooling, README and verification report.

Acceptance: all eight current pages and complete site-owned interactions are localized and verified, with English regressions intact. Report any actual unresolved gap instead of describing a partial translation as a completed site.
