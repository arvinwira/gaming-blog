---
name: Chronic Reload
description: A gaming news, reviews, and hardware buying-guide blog
colors:
  vivid-cerulean: "rgb(30 152 192)"
  cerulean-foreground: "rgb(255 255 255)"
  sky-blue: "rgb(107 195 214)"
  sky-blue-foreground: "rgb(28 58 72)"
  dark-teal: "rgb(28 58 72)"
  muted-sage: "rgb(122 140 133)"
  warm-off-white: "rgb(248 246 240)"
  near-white-card: "rgb(255 254 250)"
  warm-linen: "rgb(209 204 188)"
  linen-border: "rgb(218 213 199)"
  teal-green-success: "rgb(14 160 95)"
  amber-warning: "rgb(195 128 10)"
  vivid-crimson-error: "rgb(210 40 55)"
  affiliate-orange: "#FF9900"
typography:
  display:
    fontFamily: "Outfit, sans-serif"
    fontSize: "clamp(2.25rem, 5vw, 3.75rem)"
    fontWeight: 800
    lineHeight: 1.1
  headline:
    fontFamily: "Outfit, sans-serif"
    fontSize: "clamp(1.5rem, 3vw, 3rem)"
    fontWeight: 800
    lineHeight: 1.15
  body:
    fontFamily: "Space Grotesk, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Space Grotesk, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 700
    letterSpacing: "0.1em"
  article:
    fontFamily: "Georgia, 'Times New Roman', serif"
    fontSize: "1.125rem"
    lineHeight: 1.85
  mono:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "0.75rem"
rounded:
  xs: "0.375rem"
  sm: "0.5rem"
  md: "0.75rem"
  lg: "1rem"
  xl: "1.5rem"
  full: "9999px"
components:
  button-primary:
    backgroundColor: "{colors.vivid-cerulean}"
    textColor: "{colors.cerulean-foreground}"
    rounded: "{rounded.full}"
    padding: "12px 32px"
  button-secondary:
    backgroundColor: "{colors.near-white-card}"
    textColor: "{colors.dark-teal}"
    rounded: "{rounded.full}"
    padding: "16px 32px"
  card-article:
    backgroundColor: "{colors.near-white-card}"
    textColor: "{colors.dark-teal}"
    rounded: "{rounded.xl}"
    padding: "24px"
  button-affiliate:
    backgroundColor: "rgba(255, 153, 0, 0.12)"
    textColor: "{colors.affiliate-orange}"
    rounded: "{rounded.md}"
    padding: "10px 20px"
---

# Design System: Chronic Reload

## Overview

**Creative North Star: "The Reload Console"**

Chronic Reload reads like a calm instrument panel that hands a reader back control amid the noise of daily gaming news — warm, paper-toned surfaces instead of clinical white, a single confident cerulean accent doing all the pointing, and every interactive surface built as a soft, fully-rounded control rather than a sharp technical edge. The palette is deliberately not neutral-gray: even the "neutral" background and borders carry a warm linen tint, and the deep teal used for body text reads as ink rather than default black. In dark mode the same five source colors invert onto near-black surfaces without ever going cold or desaturated — cerulean and sky blue both brighten to stay vivid against the dark.

The system is friendly and approachable by intent: heavy corner rounding, pill-shaped buttons and search fields, and generous padding all soften what is functionally a dense content-and-ad-supported blog into something that feels welcoming rather than transactional.

**Key Characteristics:**
- Warm, linen-tinted neutrals instead of pure white/gray/black at every layer (background, card, border).
- One confident brand color (vivid cerulean) carries nearly all calls-to-action, links, and active states; sky blue is reserved for secondary/supporting accents.
- Corners are never sharp: the rounding scale runs from 6px (menu items) up to fully pill-shaped (buttons, tags, search).
- Long-form article body copy switches to a serif (Georgia) while all UI chrome — nav, headings, cards, buttons — stays on the Space Grotesk / Outfit pairing.

## Colors

The palette is warm and low-saturation at rest, with a single vivid, cool accent doing all the pointing.

### Primary
- **Vivid Cerulean** (`rgb(30 152 192)` / brightens to `rgb(40 172 212)` in dark mode): the sole action color — links, primary buttons, active nav states, focus rings, icon accents. Used sparingly against warm neutrals so it reads as confident rather than loud.

### Secondary
- **Sky Blue** (`rgb(107 195 214)`): supporting accent — category labels/eyebrows on article cards, secondary hover states. Stays the same value in both light and dark mode since it's already light enough to read on a dark surface.

### Neutral
- **Warm Off-White** (`rgb(248 246 240)`) — page background (light mode); becomes near-black `rgb(10 10 12)` in dark mode.
- **Near-White Card** (`rgb(255 254 250)`) — card/surface background (light mode); becomes dark charcoal `rgb(18 18 22)` in dark mode.
- **Warm Linen** (`rgb(209 204 188)`) — the `accent` role; used at low opacity (`/10`–`/30`) to tint alternating section backgrounds, never at full strength as a surface.
- **Linen Border** (`rgb(218 213 199)`) — all hairline borders and dividers (light mode); dark charcoal `rgb(38 42 48)` in dark mode.
- **Dark Teal** (`rgb(28 58 72)`) — body/heading text color (`foreground`), doing the job pure black would elsewhere; becomes warm near-white linen (`rgb(238 234 224)`) in dark mode.
- **Muted Sage** (`rgb(122 140 133)`) — secondary/meta text (dates, byline, helper copy).

### State colors
- **Teal-Green Success** (`rgb(14 160 95)`) — pairs naturally with cerulean; used for "Pros" and success badges.
- **Amber Warning** (`rgb(195 128 10)`) — warm contrast against the cool palette.
- **Vivid Crimson Error** (`rgb(210 40 55)`) — used for "Cons" and error states.
- A distinct **Amazon Orange** (`#FF9900`, low-opacity fill + border) is reserved specifically for affiliate/"buy" CTAs (`.affiliate-btn`) so revenue-driving buttons are visually distinguishable from ordinary navigation CTAs — do not reuse this color for non-affiliate actions.

### Named Rules
**The One Accent Rule.** Vivid cerulean is the only color that means "act here." Sky blue, warm linen, and sage are supporting/neutral roles and should never carry a primary call-to-action.

## Typography

**Display/Heading Font:** Outfit (with sans-serif fallback) — `var(--font-heading)`
**Body/UI Font:** Space Grotesk (with sans-serif fallback) — default body font
**Mono Font:** JetBrains Mono (with monospace fallback) — used sparingly for numeric/technical details (category counts)
**Article Font:** Georgia, 'Times New Roman' (serif) — long-form post body copy only

**Character:** Outfit's geometric weight gives headings confidence without feeling cold; Space Grotesk keeps UI chrome technical and legible. The deliberate switch to Georgia for article prose signals "this is the read" the moment a visitor enters a post — a magazine-style shift most competitor blogs don't make.

### Hierarchy
- **Display** (800 extrabold, `text-4xl` → `text-6xl` responsive clamp, tight line-height): hero H1 on home/about only.
- **Headline** (800 extrabold, `text-3xl` → `text-5xl`): section headers (`SectionHeader` component), page titles.
- **Title** (700 bold, `text-xl`–`text-2xl`): article card titles, component headings (Key Highlights, Pros/Cons).
- **Body** (400 regular, `1rem`, 1.6 line-height): UI copy, excerpts, nav labels — Space Grotesk.
- **Article body** (400 regular, `large`/1.125rem, 1.85 line-height, Georgia serif): long-form post content only, via `.prose` (confirmed in `app/blog/[slug]/page.js`). Headings *inside* article content stay on Outfit (`prose-headings:font-heading`) — only the running body copy switches to serif.
- **Label** (700 bold, `0.75rem`, wide letter-spacing, uppercase): category eyebrows, section tags.

### Named Rules
**The Editorial Serif Rule.** Every UI surface (nav, cards, buttons, headings) uses the Outfit/Space Grotesk pairing. The moment content becomes an actual article body (`.prose`), typography switches to Georgia serif. Never mix the two within the same content class.

## Layout

Content is constrained to a `max-w-7xl` container (`max-w-4xl`/`max-w-5xl` for narrower reading-focused sections like About and article-adjacent CTAs) with responsive horizontal padding (`px-4 sm:px-6 lg:px-8`). Sections stack vertically with generous breathing room — `py-16` to `py-24` between major homepage sections — and alternate between plain background and a `bg-accent/30` tinted band to separate content groups without hard rules. Card grids are responsive: 1 column on mobile scaling to 2–4 columns at `md`/`lg` breakpoints (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`). The header is fixed (`fixed top-0`) at a consistent `h-20`, so page content reserves top padding (`pt-24`+) to clear it.

## Elevation & Depth

The system is mostly flat at rest — cards sit on the warm-linen/near-white distinction rather than a shadow to read as "raised." A soft ambient shadow (`shadow-md`, `0 2px 8px rgba(0,0,0,0.04–0.06)`) gives resting cards the barest lift. On hover, interactive cards and buttons combine a small vertical lift (`-translate-y-1` to `-translate-y-2`) with an expanded, brand-tinted shadow (`shadow-2xl shadow-primary/20`, `shadow-primary/30`) rather than a neutral gray shadow — this is simply the current implementation's hover treatment, not a codified rule; a future direction is free to use a different hover language. Large blurred, low-opacity color blobs (`blur-[100px]`, `bg-primary/10`) sit behind several hero and section headers as ambient background decoration; also observed but not prescriptive.

### Shadow Vocabulary
- **Resting card** (`box-shadow: 0 2px 8px rgba(0,0,0,0.04)` / `shadow-md`): default card elevation.
- **Hover lift** (`shadow-2xl` combined with `shadow-primary/20` or `shadow-primary/30`): interactive card/button hover state.

## Shapes

Corners are never sharp. The rounding scale runs: `rounded-md` (6px, dropdown menu items) → `rounded-lg` (8px, pagination controls) → `rounded-xl` (12px, dropdown containers, category pill links) → `rounded-2xl` (16px, compact highlight/pros-cons cards, image thumbnails) → `rounded-3xl` (24px, article cards, category cards, large CTA panels) → fully pill-shaped `rounded-full` (all primary/secondary buttons, tags, search input, the theme toggle). Borders are thin (1px) and always the warm linen border color, never a heavier structural line except the deliberate 4px top-accent border used on the Key Highlights and Pros/Cons callout components.

## Components

### Buttons
- **Shape:** fully pill-shaped (`rounded-full`) — no square or slightly-rounded button exists in the system.
- **Primary:** vivid cerulean background, white text, bold weight, `py-3 px-8` padding.
- **Hover/Focus:** lift (`-translate-y-0.5` to `-translate-y-1`) plus a brand-tinted glow shadow; no background color change on hover.
- **Secondary/Ghost:** card-background with foreground text and a linen border; on hover it inverts to the primary treatment (cerulean background, white text, primary border).

### Cards / Containers
- **Corner style:** `rounded-2xl` for compact/callout cards, `rounded-3xl` for article and category cards.
- **Background:** near-white card color (light) / dark charcoal (dark).
- **Shadow strategy:** flat at rest (`shadow-md`), brand-tinted glow + lift on hover.
- **Border:** 1px linen border at low opacity (`border-border/40`), brightening toward primary on hover (`hover:border-primary/50`).
- **Internal padding:** `p-6` for compact cards, `p-6`–`p-8` for larger panels.

### Inputs / Fields
- **Style:** the `.glass` utility (opaque card-color background, thin linen border, soft ambient shadow — despite the name, it carries no transparency or blur), fully pill-shaped (`rounded-full`) for the search input specifically. Note: `--glass-bg`/`--glass-border` custom properties exist in `globals.css` with real alpha values but are currently unused by the `.glass` utility itself.
- **Focus:** 2px cerulean focus ring plus border color shift to primary.

### Navigation
- **Style:** fixed header, card-colored background, bottom hairline border. Top-level items are plain links; multi-item sections use hover-triggered desktop dropdowns (`rounded-xl` panel, `shadow-xl`) and tap-triggered accordions on mobile. Active/hover state is always a shift to the primary cerulean text color, never a background fill on top-level items.

### Signature Component: Callout Cards (Key Highlights / Pros & Cons)
Both use the opaque `.glass` card background, `rounded-2xl` corners, and a distinctive 4px top border in a semantic color (`border-primary` for highlights, `border-success`/`border-error` for pros/cons). The same 4px accent-border treatment also appears on blockquotes (`border-left`, using `--border` outside articles and `--primary` inside `.prose`), so it's a recurring device rather than unique to these two components — but always thin borders elsewhere; a 4px accent border signals "this is a callout."

### Affiliate Button
- **Style:** low-opacity Amazon-orange fill (`rgba(255,153,0,0.12)`) with a matching-hue border and text, `rounded-xl` (12px) corners — visually distinct from every other button in the system, by design (see Colors § affiliate-orange).
- **Hover:** fill and border opacity increase, plus a small lift and orange-tinted shadow glow.

## Do's and Don'ts

### Do:
- **Do** keep vivid cerulean as the only color that signals a primary action; every other color (sky blue, linen, sage) stays supporting/neutral.
- **Do** use full `rounded-full` pill shapes for every button, tag, and search field — partial rounding on an interactive control is off-system.
- **Do** switch to Georgia serif only for `.prose` article body content; keep every other surface on Outfit/Space Grotesk.
- **Do** keep neutrals warm (linen-tinted) rather than reaching for pure gray or pure white/black, in both light and dark mode.
- **Do** reserve the amber/orange affiliate-button treatment (`.affiliate-btn`) exclusively for outbound purchase links, never for ordinary internal navigation CTAs.

### Don't:
- **Don't** introduce a fourth heading/body font family outside Outfit, Space Grotesk, and JetBrains Mono.
- **Don't** ship a sharp-cornered (non-rounded) button, input, or card; it breaks the friendly, approachable character the palette and shapes are built around.
