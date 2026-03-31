# Design System Document

## 1. Overview & Creative North Star

### The Creative North Star: "The Academic Curator"
This design system moves away from the chaotic, "resource-dump" aesthetic common in educational platforms and instead embraces the feeling of a high-end digital gallery or a premium editorial publication. The goal is to transform "BCA resources" into a curated experience that feels authoritative, serene, and intentional.

We achieve this through **Organic Minimalism**. While the underlying structure is built on a rigorous grid, we break the "template" feel by using intentional asymmetry, overlapping depth, and a high-contrast typography scale. This system doesn't just present information; it archives it with dignity. We prioritize breathing room over information density, ensuring that students feel calm and focused, rather than overwhelmed.

---

## 2. Colors

The palette is a sophisticated journey through deep nocturnal tones and vibrant, floral accents. It is designed to be high-contrast yet soft on the eyes during long study sessions.

*   **Primary (#ffaedf / #6a1e55):** Used for "Hero" actions and brand expression. The contrast between the light Dusty Rose and the Deep Crimson creates a vibrant, energetic focal point.
*   **Surface Hierarchy:** We utilize `surface-container` tiers to build depth. 
    *   `surface` (#131316) is our canvas.
    *   `surface-container-low` (#1b1b1e) defines large section blocks.
    *   `surface-container-highest` (#353438) is reserved for interactive elements like cards.

### The "No-Line" Rule
**Explicit Instruction:** Do not use 1px solid borders to separate sections or define boxes. Traditional lines create visual "noise" that clutters the interface. Instead, define boundaries exclusively through background color shifts. A `surface-container-low` section sitting on a `surface` background provides a cleaner, more modern separation than any line ever could.

### The "Glass & Gradient" Rule
To add visual "soul," utilize **Glassmorphism** for floating elements (navbars, modal overlays). Use semi-transparent surface colors with a `backdrop-blur` of 12px–20px. For primary CTAs, apply a subtle linear gradient transitioning from `primary` to `primary_container` at a 135-degree angle to create a sense of tactile depth.

---

## 3. Typography

We use **Inter** as our sole typeface, relying on a drastic scale rather than multiple fonts to create hierarchy. 

*   **Display (Lg/Md):** Used for high-impact hero statements. These should be set with tight letter-spacing (-0.02em) to feel like a premium magazine header.
*   **Headline (Sm/Md):** Used for section titles. These act as the "anchors" for the grid.
*   **Body (Md/Lg):** The workhorse for resource descriptions. Line height must be generous (1.6) to ensure readability during heavy reading.
*   **Label (Sm):** Used for metadata (e.g., "PDF," "2024"). Always set in uppercase with slight letter spacing (+0.05em) for a refined, "tagged" look.

The typographic hierarchy communicates authority; large, bold headlines paired with light, airy body text give the student a clear path through the content.

---

## 4. Elevation & Depth

We reject traditional drop shadows in favor of **Tonal Layering** and **Ambient Light.**

### The Layering Principle
Depth is achieved by "stacking" surface tiers. To make a card feel "raised," do not reach for a shadow first; instead, place a `surface-container-highest` card on top of a `surface-container-low` background. The subtle shift in hex value creates a natural, sophisticated lift.

### Ambient Shadows
When a floating effect is required (e.g., a hovered card), use an **Extra-Diffused Shadow**.
*   **Blur:** 40px–60px.
*   **Opacity:** 4%–8%.
*   **Color:** Use a tinted version of `on-surface` (a deep plum tint) rather than black. This mimics how light behaves in a physical space.

### The "Ghost Border" Fallback
If accessibility requires a container definition, use a **Ghost Border**: the `outline-variant` token at 15% opacity. It should be felt, not seen.

---

## 5. Components

### Buttons
*   **Primary:** Gradient fill (`primary` to `primary-container`), no border, `md` (0.75rem) roundedness.
*   **Secondary:** Ghost style. Transparent background with a `ghost border`. On hover, shift background to `surface-container-high`.
*   **Tertiary:** Text only, using `primary` color with an underline that appears only on hover.

### Cards & Lists
**Forbid the use of divider lines.** 
*   **Cards:** Use `surface-container-highest` with `lg` (1rem) corner radius. Use vertical whitespace (Token 8 or 10) to separate internal content.
*   **Lists:** Items are separated by a subtle background hover state change. Leading elements (icons) should be housed in a soft `primary-container` circle to provide a splash of color.

### Input Fields
Text inputs should not be "boxes." Use a `surface-container-low` fill with a bottom-only "Ghost Border." On focus, the border transitions to a 2px `primary` color stroke.

### Academic Specific Components
*   **The "Progress Orb":** A small, circular glassmorphic element showing how much of a roadmap a student has completed.
*   **Resource Chips:** Use `secondary-container` for tags like "Mathematics" or "C Programming." These should have a `full` roundedness (9999px) to contrast against the architectural squareness of the grid.

---

## 6. Do's and Don'ts

### Do
*   **DO** use intentional asymmetry. For example, left-align your headlines but right-align your "View All" buttons with significant negative space between them.
*   **DO** use the `spacing-20` (7rem) token for section margins. Breathing room is a feature, not a waste of space.
*   **DO** use backdrop blurs on the main navigation bar to keep the content visible as the user scrolls, creating a sense of continuity.

### Don't
*   **DON'T** use 100% black (#000000) for shadows or backgrounds. Always use the provided `surface` and `on-surface` tints.
*   **DON'T** use traditional 1px dividers. If you feel the need for a line, try using a 4px vertical "accent bar" in `primary` color next to a heading instead.
*   **DON'T** crowd the cards. If a card has more than three lines of text, it belongs on a detail page, not a grid.