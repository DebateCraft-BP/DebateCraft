# DebateCraft content correction

The user's correction establishes DebateCraft as the site identity; the Hejl page supplies visual layout only. This supersedes the earlier literal-copy content scope without changing the adopted layout system.

## Content mapping

- Hero: DebateCraft name, original white symbol and class photograph, plus a DebateCraft program call to action.
- Grant circle → Our Impact: 400+ students, 19 countries and territories, and more than 450 instructional hours, sourced from legacy/index.html and the preserved shared runtime. No new impact figures are invented.
- Program introduction → The DebateCraft Method, based on the original mission and school-training content.
- Four cards → Introduction to Debate, World Schools (WSDC), British Parliamentary and Bioethics, summarized from the original course definitions in legacy/scripts/reactPages.js.
- Story cards → the existing “Why I Debate” Substack article by Adrian Chan, dated July 6, 2025, and an editorial guide card leading to the existing guides library. The guide card is not presented as a newly published article.
- Header/footer → existing DebateCraft pages, Facebook, Instagram, Substack, info@debatecraft.org and the actual privacy/terms routes. No LinkedIn account is invented.
- Source video and photographic assets → original DebateCraft files with original filenames, copied without alteration. The 9 copies were checksum-verified. No reference-site video or photographs remain in the active build.

## Verification

- A focused homepage regression first failed on the old Hejl headings, then passed after the correction. It asserts DebateCraft identity, program names, original destinations, local DebateCraft image paths, absence of the reference video, and no visible Hejl/grant/story content or Hejl hyperlinks.
- All four Vitest integration tests pass.
- Production build passes.
- The production browser suite passes: branding and destinations, menu resize/Escape/focus behavior, program-card dragging, consent persistence, native email validation, reduced motion and no subscription request.
- Browser checks pass at 390, 900, 1440 and 1920px: no horizontal overflow, missing images, missing primary fonts or application/console errors.
- Desktop and mobile screenshot pixels were inspected. The current in-app preview was reloaded and verified to show DebateCraft's title, programs, photographs and destinations.
- Original archive remains intact. No publishing or deployment occurred.

## Evidence

- [Desktop](../../.firecrawl/verification/debatecraft-1440.png)
- [Mobile](../../.firecrawl/verification/debatecraft-390.png)
- [Wide](../../.firecrawl/verification/debatecraft-1920.png)
- [Intermediate](../../.firecrawl/verification/debatecraft-900.png)
- [Measurements](../../.firecrawl/verification/debatecraft-metrics.json)
- [Browser checks](../../.firecrawl/verification/browser-results.json)

These pages retain the source layout, type system, circle composition, rotated cards and pastel panels. Different content naturally changes line breaks and document heights; the earlier literal-copy pixel measurements do not describe the corrected DebateCraft page.

Existing DebateCraft destination pages remain external links rather than newly rebuilt local routes. Newsletter delivery remains unconfigured, with an actual Substack subscription link available in the footer.
