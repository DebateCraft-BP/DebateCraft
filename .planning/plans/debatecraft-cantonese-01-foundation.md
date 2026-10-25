# Cantonese feature 1 — Locale foundation

Date: 2026-10-21
Status: Approved on 2026-10-21; implementation and verification completed on 2026-10-22.
Depends on: approved specification/design.

1. Establish an explicit locale/counterpart map for the eight English/Chinese pairs. Keep the URL authoritative; no new router/dependency or automatic language redirect.
2. TDD tracer bullet: English Home language link → Chinese Home shell with correct language identity and counterpart. Observe failure, implement the smallest working slice, rerun. Then add matching-page/fragment/query preservation and locale-aware internal links in separate red/green cycles.
3. Introduce a small shared locale interface and grouped catalogs. Extract shared header/footer, skip link, menu/dialog accessibility, inquiry links, newsletter and consent strings without changing English output.
4. Test and localize consent persistence/settings/keyboard behavior and newsletter validation/preview feedback. Keep storage keys and no-tracking behavior unchanged.
5. Add actual Chinese HTML entries as their pages are implemented; start CJK-scoped font/spacing rules. Verify the language control and seven-item navigation at desktop/mobile widths.

Affected: src locale modules/catalogs, App/main, content/navigation, Header/Footer/Newsletter/CookieConsent/EditorialPage, localized Home entry, metadata/build inputs and focused tests.

Acceptance: a visitor can switch language and navigate the localized shell without losing counterpart location or saved consent. English shell regressions pass. No DOM text-replacement translation and no cloned page implementations.
