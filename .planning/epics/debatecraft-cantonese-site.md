# DebateCraft Cantonese / Traditional Chinese site

Date: 2026-10-21
Status: Approved on 2026-10-21; implementation and verification completed on 2026-10-22.
Specification: ../specs/debatecraft-cantonese-site.md
Design: ../design/screens/debatecraft-cantonese-site.md

## Approved-scope proposal

Localize all eight live pages and their shared/interactive UI into natural Hong Kong Cantonese in Traditional Chinese. Keep the English site, add a same-page language switch, preserve the current roster/facts and email inquiry behavior, and reuse the existing blue/white design. External documents/videos keep their actual language and links.

## Ordered feature plans

1. [Locale foundation and shared interface](../plans/debatecraft-cantonese-01-foundation.md): URL/counterpart mapping, catalogs, language link, header/footer, consent/newsletter and Chinese type support.
2. [Home and editorial content](../plans/debatecraft-cantonese-02-pages.md): Home, Who We Are, What We Do, How We Work and Schools, retaining all current facts and interactive disclosures/gallery.
3. [Team localization](../plans/debatecraft-cantonese-03-team.md): current 35-person roster, translated biographies/achievements, search/filter/dialog/recovery UI and coverage/drift checks.
4. [Resource tools](../plans/debatecraft-cantonese-04-resources.md): full resource UI, site-owned lessons/motions, practice workspace/timers, Manner Lab and Even If game.
5. [Contact, metadata and final verification](../plans/debatecraft-cantonese-05-validation.md): localized Contact states, all HTML metadata/aliases/sitemap, English and Chinese checks, screenshots, source/content review and delivery.

Each feature depends on the foundation. Complete them in this order to keep behavior protected and avoid a superficially translated site with untranslated tools or dialogs.

## Decisions for the single approval

- All eight current pages, not only the homepage; no resurrection of archived discontinued pages.
- Natural Hong Kong Cantonese wording in Traditional Chinese; proper names and useful debate acronyms retained.
- `/cnindex.html` and seven `/pages/cn…html` canonical entries; matching English/Cantonese language links.
- Explicit catalogs and one shared locale-aware page implementation; no duplicated page trees or DOM translation overlay.
- Current English roster is factual authority. The archive supplies only verified matching translations, including updates for the recent titles/Adrian achievement.
- Site-owned learning content is translated; linked third-party PDFs/videos/posts are identified by their original language.
- Existing email inquiry routes and Contact backend are preserved; no Google Forms or live test messages.
- CJK typography is adapted to real text lengths using the existing layout and native font fallbacks.

## Gates and delivery

Run incremental TDD for changed behavior, preserve English regressions, validate all 16 canonical pages/six Chinese aliases, inspect CJK desktop/mobile screenshots and record limitations honestly. Deliver a working local bilingual site and a verification report. No publication or deployment.

The supplied AGENTS.md requires one approval of the combined plan. Approval of this epic covers all linked specification/design/feature plans and their quality gates; do not request approval again for each feature.
