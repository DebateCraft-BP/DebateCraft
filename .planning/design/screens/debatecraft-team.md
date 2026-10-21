# DebateCraft Team screen

Status: Implemented and visually reviewed at 390, 900, 1440 and 1920px widths.
Specification: ../../specs/debatecraft-team.md
Verification: ../../verification/debatecraft-team.md
Reference evidence: ../../../.firecrawl/hejl-team-reference/DESIGN.md

## Composition

Reuse the shared fixed header and black footer. Start with a centered editorial heading, “The people behind DebateCraft.”, and the existing roster introduction about coaching and judging experience. Follow with a compact name-search field and category controls, then Leadership and Our Team portrait groups. The Retired filter replaces those groups with a text-only Retired Members list: show names and existing roles where present, without images, initials, placeholder space or biography controls. Retired entries are plain content, with no pointer cursor, button/link semantics, interactive hover treatment or tab stop. Do not add the reference's foundation photographs, values or philanthropy copy.

Leadership contains Adrian Chan, Gavin Zhao and Sandeep Chulani in the source's three larger portrait cards per row. Our Team contains the remaining 26 current members, including Matthew Wong, Bella Cai, Valmik Dagayach, Rachel Rhodes and Oliver Choi, using the source's smaller wrapping cards (four per row at the captured desktop width). Do not duplicate people across sections. At mobile widths, all groups become single-column.

Retain the old All, Leadership, Coaching, Hong Kong, Bioethics and Retired filter buttons with a visible selected state, alongside name search. Preserve their existing JSON-category matching independently of visual section placement; hide empty sections after filtering. These controls are an adaptation to the reference design, not a replacement with decorative tabs.

## Visual system and requested palette

- User-requested adaptation: page background `--color-bg: #F2F7FE`, shared with the homepage, instead of the source blush `#F7EBEA`. Keep white (`#FFFFFF`) cards and dialog. Supporting blue surfaces use shared `#EAF0F7`, `#E2EFFA` and `#9CBFD7` tokens if needed. These are implementation choices, not source-extracted colors.
- Extracted colors retained: main text `#0A0A0A`, role text `#737373`, teal close control `#A8C7C4` and the shared dark footer.
- Reuse locally installed PP Editorial New 200 for headings/names and Inter for body/roles.
- Reuse the source's 24-column desktop/six-column mobile grid, desktop inner span `3 / span 20`, mobile full span, 2.4rem/1.6rem outer margins and root sizing.
- Group headings: 6.4rem/1.1 desktop, 3.6rem/1.2222 mobile. Card names: 3.2rem/1.1 desktop, 2.4rem/1.1667 mobile. Role text: 1.6rem/1.4 desktop, 1.2rem/1.1667 mobile.
- Larger portrait ratio .783 desktop/.852 mobile; smaller portrait ratio .762 desktop/.852 mobile, respecting source maximum heights. Use cover cropping and review original portraits for face visibility.
- White name strips with 2.4rem padding; clipping radius 2.4rem desktop/1.6rem mobile; no prominent shadows.
- Source primary card gap 4.8rem desktop; secondary gap 2.4rem; mobile both 2.4rem. Source group-to-card gap 8rem desktop/4rem mobile. Reuse source section spacing; adjust only where the added search controls require separation.

Typography, layout dimensions and retained colors above are extracted CSS declarations. Pixel conversions and viewport context are recorded in the reference DESIGN.md. The blue/white palette, search/filter-control sizing and roster section assignments are implementation choices, not extracted source behavior.

## Biography

White full-viewport dialog: portrait left and text right on desktop, stacked on mobile. Reuse source content-grid spans, rounded portrait, light serif name and gray role. Preserve member details as text and lists. Remove the external-link row entirely: no website/LinkedIn buttons, icons, empty placeholders or reserved gap.

Biographies are available for current members only. Use a named close button, focus containment, focus restoration, Escape and scroll locking. Long biographies must remain scrollable on desktop and mobile. Provide a visible focus ring on current-member card triggers. Use initials when a current member's portrait is unavailable, retaining the same card proportions. Retired members have neither portrait fallbacks nor biography access, including through member hashes.

## Validation views

Compare against saved source card/dialog captures at 1440×1000 and 390×844. Also inspect 900px and 1920px widths for wrapping and overflow. Check a long biography, missing current-member portrait, text-only retired list, filtered empty state and reduced-motion view. Keep current members' original portrait filenames and record any deliberate crop adjustment. Exclude retired portraits from the active build; preserve archived originals.
