# Design System

This page mirrors the `Design System` setup request in implementation-ready format.

## Desktop layout tokens (1440 frame)
- Container max width: `1200`
- Container alignment: centered
- Grid: `12` columns with `24` gutter
- Section spacing: `96`
- Sub-block spacing: `48`
- Standard section vertical padding: `96`

## Component tokens
- Card radius: `16`
- Button/pill radius: `999`
- Sticky header: white background + `1px` neutral bottom border

## Reusable components
- Header: logo + nav + `Sign Up`
- Footer: 4-column content + copyright row
- Universal CTA strip: neutral background + right-aligned `Sign Up`

## Component states
For cards, pills, tabs, and CTAs:
- `default`
- `hover`
- `active`

Implemented in `styles/main.css` using shared tokens and component classes.
