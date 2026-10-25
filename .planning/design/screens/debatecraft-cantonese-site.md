# Cantonese / Traditional Chinese locale design

Date: 2026-10-21
Status: Approved on 2026-10-21; implementation and verification completed on 2026-10-22.
Specification: ../../specs/debatecraft-cantonese-site.md

## Visual direction

Keep the current page order, photographs, logo, pale blue #F2F7FE, white surfaces, supporting blues, rounded images/cards, statement circles, editorial rows, school pathway, tilted approach panels and dark footer. This is a language adaptation of all eight screens, not a redesign or a new course page.

Use Cantonese phrasing in Traditional Chinese. Preserve the current English copy for English routes. Retain proper names, WSDC/BP/POI, event names and original resource titles where they identify the source.

## Shared header and language switch

Keep seven primary destinations in the same order:

| English | Cantonese |
| --- | --- |
| Who We Are | 關於我哋 |
| What We Do | 我哋嘅課程 |
| How We Work | 教學方式 |
| Schools | 學校課程 |
| Resources | 學習資源 |
| Our Team | 團隊 |
| Contact | 聯絡我哋 |

Add a small outlined/white language link beside the brand, outside the seven-item navigation: 繁體中文 on English routes, English on Cantonese routes. Accessible labels explain the destination language. Keep the home logo recognizable and locale-aware. Current-page indication, mobile dialog, focus trap and Escape behavior remain intact. At narrow widths, ensure the language link never overlaps the brand or menu; adapt spacing/brand text width locally rather than dropping a primary destination.

Language switching uses ordinary links to the matching page, preserving valid query/hash state. Do not use a modal language picker, globe-only control or automatic browser-language redirect.

## Cantonese type treatment

The supplied PP Editorial New/Inter assets do not provide full CJK coverage. Keep Latin brand treatment and use explicit native Traditional Chinese stacks, such as PingFang TC / Microsoft JhengHei / Noto Sans CJK TC for body text and Songti TC / Noto Serif CJK TC / serif for editorial headings. Inspect actual browser glyphs; do not claim fonts loaded merely because a family name was listed. No external font dependency is required by the initial design.

Scope all CJK adjustments to the Chinese locale. Start with 1.6–1.8rem body copy and 1.5–1.65 line height; heading size/line height is adapted to actual Chinese wrapping rather than copying a Latin pixel size. Preserve the established mobile/desktop hierarchy, meaningful emphasis and whitespace. Avoid forcing long Chinese phrases into Latin italic styling; use appropriate weight/emphasis. Apply Chinese line-breaking and review punctuation placement, buttons, pills, FAQs, counters and form labels. Concrete type adjustments must be recorded as implementation choices after screenshot inspection.

## Screen content examples

- Home: 諗得清楚，講得自信。辯論，唔設界限。 CTA: 睇吓我哋嘅課程.
- Who We Are: 由年輕人出發，陪更多年輕人搵到自己嘅聲音。 Retain mission/values and Team entry.
- What We Do: 學校課程 / 假期課程 / 生物倫理. All current eligibility, class caps/session formats and inquiry caveats remain visible.
- How We Work: 從提問開始，喺實踐中進步。 Habits: 分析 / 練習 / 討論 / 反思. Preserve gallery/manual controls, three summaries and independent FAQs.
- Schools: 建立一支持續成長嘅校隊。 Keep five stages and adaptable timing, source-supported delivery and the school inquiry checklist.
- Team: filters 全部 / 領導團隊 / 教練團隊 / 香港 / 生物倫理 / 歷屆成員. Missing title 營運團隊成員. All six Alumni remain text-only; the biography dialog keeps its existing layout and focus behavior.
- Resources: clearly labeled Chinese tool tabs and instructions. English documents/videos receive a visible 英文資源 indication where appropriate. Own lesson examples and game feedback are Chinese, not just the surrounding menus.
- Contact: translate fields, optional/required hints, sending/success/failure and email fallback, preserving the existing submission contract.

Copy examples set tone; exact final translations must preserve meaning and facts. Do not present website language as a claim about the teaching language of any class.

## Tools and dialogs

Translate visible/accessibility labels and non-default states: empty search, retry, image failure, biography close, cookie settings, newsletter preview feedback, copy failure, timer/POI states, game loss/timeouts and restart. Keep stable IDs and values behind translated labels.

Manner Lab should use explicit Cantonese emphasis chunks matching the original exercise’s meaning (the current exercise uses 我 / 好鍾意 / 你 / 媽媽 / 煮嘅餸), with a distinct explanation for each selection. Do not use spaces as a Chinese word splitter.

User-written drafts are preserved exactly across language navigation. Resource favorites, consent choices and preset IDs are language-neutral. Native browser UI and third-party material follow their own language settings; the site’s own explanations and status copy are translated.

## Verification views

Capture all eight Chinese pages at 1440×1000 and 390×844; check 900/1920px geometry. Inspect actual text, glyphs and wrapping, plus localized mobile menu, course/FAQ disclosure, school pathway, team biography/Alumni, resource-tool selected/error states, Contact feedback and consent dialog. Verify language links both ways, equivalent fragments, same assets, no overflow, visible focus and reduced motion. Record real evidence and any deliberate difference from Latin layout.


## Verified type decisions

Chinese body copy uses Inter with PingFang TC / Microsoft JhengHei / Noto Sans CJK TC fallbacks and 1.65 line height. Editorial Chinese headings use Songti TC / Noto Serif CJK TC / PMingLiU fallbacks, normal weight and 1.3 line height. The Home heading is 7.8rem on desktop and 4.7rem on mobile; separate-page hero headings keep the shared sizes, with Team/Contact mobile headings adapted to 4.4rem. Chinese emphasis avoids synthetic italic. The language control sits beside the unchanged Latin brand with compact mobile spacing. These are implementation choices verified against actual local Chromium pixels at 1440 and 390px; they are not extracted Hejl font tokens. Native CJK font selection can vary by operating system.
