> Content correction: The user clarified that DebateCraft is the website identity; Hejl is the visual reference only. Literal Hejl content requirements and measurements below describe the earlier baseline and are superseded by the DebateCraft content adaptation. See the DebateCraft verification report.

# Hejl homepage implementation design

Status: Implemented under the combined approval; see ../../verification/hejl-rebuild.md.
Canonical design evidence: /Users/adrianclasses/.codex/visualizations/2026/10/20/01a15b5e-e174-70c3-9755-e498f79c8196/hejl-foundation/DESIGN.md
Reference page: https://www.hejlfoundation.org/?ref=land-book.com

## Visual decisions

The original literal-copy design has been superseded by DebateCraft content. The user's October 20 palette correction also replaces warm backgrounds with corresponding blue tones: page `#FEF9F2` → `#F2F7FE` (shared with Team), impact circle `#FAECE2` → `#E2EFFA`, featured story `#D7A49C` → `#9CBFD7`, secondary story `#F7EBEA` → `#EAF0F7`. Keep white surfaces, `#0A0A0A` text/footer and existing colored section dots. These palette values are user-directed adaptations rather than source-extracted colors.

Use locally served PP Editorial New ultralight normal/italic and Inter regular/medium. Preserve source fluid html sizing, capped desktop rem scaling and the ≤767px mobile overrides. Use source CSS values for the 24-column/6-column grids, inner content spans, radii, component spacing and crop ratios.

Screen composition: Header → video hero → circular grant section → programs introduction and collage cards → news introduction and two unequal cards → dark rounded footer. Cookie consent is an independent fixed overlay.

Desktop program card rotations: 4°, 4°, −4°, 15°. Mobile cards are full width and unrotated; the oversized Program Areas backdrop is hidden. Desktop news cards are horizontal and unequal width; mobile cards stack image above text. Preserve the two distinct SVG logo treatments.

## State design

- Initial consent banner, manage settings, accepted/denied preferences, reload persistence.
- Desktop inline navigation; mobile closed/open full-screen navigation with keyboard dismissal and restored focus.
- Loaded video with poster fallback; reduced-motion uses a still frame and readable final section states.
- Newsletter idle, invalid and honest service-unavailable preview feedback. No false success.
- Card hover/focus/reveal states derived from the source; static readable fallback.

## Architecture choice

React functional components and content arrays; native CSS grid/flex and React state. No UI kit, screenshot-as-background page, iframe, WordPress runtime, analytics or copied third-party form integration. Avoid introducing an animation dependency unless native APIs cannot reproduce a required verified pattern.

## Comparison rules

Compare the loaded page at the same viewport, consent state, font-loaded state and stable media time. Scroll to settle reveals before taking full-page captures. Inspect hero, grant circle, programs, news and footer separately. Do not treat missing animated headings in the original screenshots as desired omissions.

Additional routes remain original absolute links. Rebuilding unseen Hejl pages or adapting this layout to DebateCraft content requires separate scope.

