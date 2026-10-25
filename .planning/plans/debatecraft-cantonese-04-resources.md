# Cantonese feature 4 — Resource hub and learning tools

Date: 2026-10-21
Status: Approved on 2026-10-21; implementation and verification completed on 2026-10-22.
Depends on: locale foundation.

Localize each existing tool as its own protected slice. Keep stable IDs, enum values, favorites/draft/preset storage, timing and scoring. Do not translate only the tab labels.

1. Guides/videos: translated descriptions/categories/search/empty states and external-language indicators; original resource identifiers/titles remain searchable. Do not alter linked PDFs/videos/transcripts.
2. Practice toolkit: Chinese motion text and filters, prep labels, confirmations/copy status/export headings, countdown/POI controls. Test Chinese search, motion selection, shared storage, copy fallback and timer states without erasing user-entered text.
3. Framework library: Chinese lessons/examples/exercises, answer controls and generator feedback; maintain IDs and exercise meaning.
4. Manner Lab: spectrum/level/advice/archetype/profile localization and explicit Cantonese emphasis chunks keyed to stable IDs. Test that selecting different chunks changes the correct explanation; slider/preset behavior stays identical.
5. Even If: Chinese questions/options/difficulty/status/verdict/outcomes. Keep TURN/MITIGATE/TRAP logic, points, health and deadlines unchanged. Test representative correct/trap/timeout/end states in both languages.
6. For each tool: one public-interface acceptance test → relevant failure → minimal implementation → green, then the next behavior. Inspect Chinese selected and non-default states in the browser.

Affected: Resources, resources/data and locale catalogs, GuideLibrary/PracticeToolkit/FrameworkLibrary/MannerLab/EvenIfGame/Tabs, cnresources.html, locale styles and tests. Reuse existing hooks/math rather than changing unrelated game behavior.

Acceptance: all site-owned resource content and feedback are usable in Chinese; saved data survives language navigation; English tool regressions pass. External English material is labeled honestly rather than claimed to be translated.
