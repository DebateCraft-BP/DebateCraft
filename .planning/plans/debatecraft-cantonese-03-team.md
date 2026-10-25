# Cantonese feature 3 — Team and biography localization

Date: 2026-10-21
Status: Approved on 2026-10-21; implementation and verification completed on 2026-10-22.
Depends on: locale foundation; current English roster.

1. Build a localized text catalog from verified archived translations, keyed to current identities and source content. Preserve the active English roster as the only membership/category/image/order authority. Do not use achievement-array positions as translation identity.
2. Update all nine missing-title translations and Adrian Chan’s latest judging achievement. Retain proper names and member hash slugs. Add coverage/drift checks so new English facts cannot silently inherit old Chinese text.
3. Incremental TDD: Chinese Team loading/filter/search; current biography copy; keyboard/focus/Escape and shared hash links; Alumni restrictions; load/portrait failure and retry. Observe each relevant failure before its implementation.
4. Translate all Team UI, roles, biographies, supported achievement descriptions, empty/error/status and accessible controls. Keep 3 leaders + 26 team members + 6 text-only Alumni and no profile social buttons.
5. Verify the full Chinese roster/dialog layout at desktop/mobile sizes and existing English Team regressions.

Affected: Team/TeamBiography/TeamPortrait, localized roster text catalog and validation, cnteam.html, metadata and tests.

Acceptance: the same 35 identities and current facts appear in both languages, with full present-source translation coverage and unchanged interaction restrictions. No retired image restoration or stale biography insertion.
