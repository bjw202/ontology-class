# SPEC-UI-001: Implementation Plan

## Overview

Migrate four UI components from hardcoded inline styles to a Pencil-based design token system with CSS classes, adding elevation, hover interactions, and animated feedback. This is a visual-only refactor with no business logic changes.

**SPEC Reference:** SPEC-UI-001 (Pencil Design System Integration)

---

## Milestones

### Milestone 1: Design Token Foundation (Priority High)

**Goal:** Establish the CSS custom property layer that all component work depends on.

**Tasks:**
1. Add surface color tokens (`--color-bg-page`, `--color-bg-card`, `--color-bg-sidebar`) to `:root` in `styles/globals.css`
2. Add elevation tokens (`--shadow-card`, `--shadow-card-hover`) to `:root`
3. Add transition tokens (`--transition-base`, `--transition-lift`) to `:root`
4. Add component-specific tokens (`--color-quiz`, `--color-quiz-bg`) to `:root`
5. Add corresponding dark mode overrides in `.dark` selector
6. Verify no token name collisions with Nextra theme by inspecting Nextra's generated CSS

**Risks:**
- Token name collision with Nextra internals: Mitigate by prefixing with `--ont-` if collision detected
- Dark mode token values may need tuning: Mitigate by testing in both modes before proceeding

**Covers:** REQ-UI-001-01, REQ-UI-001-02, REQ-UI-001-03, REQ-UI-001-04

**Dependencies:** None (foundation milestone)

---

### Milestone 2: ConceptCard Enhancement (Priority High)

**Goal:** Transform ConceptCard from inline-styled box to an elevated card with left accent bar and hover interaction.

**Tasks:**
1. Define CSS classes in `styles/globals.css`:
   - `.concept-card` (base card: padding, border-radius, shadow, transition)
   - `.concept-card--default`, `.concept-card--highlight`, `.concept-card--warning` (variant-specific accent bar color and background)
   - `.concept-card:hover` (lift effect)
   - `.concept-card__icon` (circular colored background for icon)
2. Replace all inline `style` attributes in `ConceptCard.tsx` with CSS class references
3. Implement 4px left accent bar using `border-left` with variant colors
4. Add subtle 1px border on remaining sides
5. Set icon container as 32px circle with variant-tinted background (15% opacity)
6. Add hover transform (`translateY(-2px)`) and shadow transition
7. Verify all three variants render correctly across Phase 1-8 content

**Risks:**
- MDX files may pass custom `style` props to ConceptCard: Mitigate by auditing usage across content directory
- Border-left accent may clip with border-radius: Mitigate by using `overflow: hidden` on the card

**Covers:** REQ-UI-001-05, REQ-UI-001-06, REQ-UI-001-07, REQ-UI-001-08, REQ-UI-001-09

**Dependencies:** Milestone 1 (tokens must exist)

---

### Milestone 3: Exercise Enhancement (Priority Medium)

**Goal:** Add a colored header strip, pill-shaped badge, and animated solution reveal to the Exercise component.

**Tasks:**
1. Define CSS classes in `styles/globals.css`:
   - `.exercise` (base: shadow, border-radius, overflow hidden)
   - `.exercise--basic`, `.exercise--challenge` (variant: header strip color)
   - `.exercise__header-strip` (8px tall colored bar at top)
   - `.exercise__badge` (pill shape: `border-radius: 100px`, increased padding)
   - `.exercise__solution` (animated reveal: max-height + opacity transition)
   - `.exercise__toggle-btn` (button styles with hover state)
2. Replace all inline `style` attributes in `Exercise.tsx` with CSS class references
3. Implement header strip as a pseudo-element or dedicated div at the top of the card
4. Reshape badge to pill with `border-radius: 100px`
5. Implement solution reveal animation:
   - Hidden state: `max-height: 0; opacity: 0; overflow: hidden;`
   - Visible state: `max-height: 500px; opacity: 1;`
   - Transition: `max-height 300ms ease, opacity 300ms ease;`
6. Verify basic and challenge variants in exercise MDX pages

**Risks:**
- `max-height` animation requires an estimated maximum value: Mitigate by using a generous `max-height` (e.g., 2000px) that exceeds any realistic solution content
- Solution content with code blocks may have specific height requirements: Mitigate by testing with longest exercise solutions

**Covers:** REQ-UI-001-10, REQ-UI-001-11, REQ-UI-001-12, REQ-UI-001-13

**Dependencies:** Milestone 1 (tokens must exist)

---

### Milestone 4: CompetencyQuestion Enhancement (Priority Medium)

**Goal:** Improve quiz UX with progress indicators, hover states, animated feedback, and visual consistency with the card design language.

**Tasks:**
1. Define CSS classes in `styles/globals.css`:
   - `.competency-question` (base: shadow, accent bar, border-radius)
   - `.competency-question__progress` (question number indicator)
   - `.competency-question__option` (option button card with hover state)
   - `.competency-question__option--selected` (selected state)
   - `.competency-question__option--correct` (correct feedback with transition)
   - `.competency-question__option--incorrect` (incorrect feedback with transition)
   - `.competency-question__feedback` (explanation panel)
   - `.competency-question__progress-bar` (optional horizontal bar)
2. Add optional props to `CompetencyQuestion.tsx`:
   - `questionNumber?: number`
   - `totalQuestions?: number`
3. Replace all inline `style` attributes with CSS class references
4. Implement 4px left accent bar (`#9b59b6`) matching ConceptCard pattern
5. Add hover state on option buttons: background `#f0ebf5`, border color change
6. Add 200ms background-color transition on answer reveal
7. Conditionally render progress indicator ("N / M") when props provided
8. (Optional) Implement progress bar below question indicator

**Risks:**
- Adding new optional props changes the TypeScript interface: Mitigate by making both props optional with `?`; existing MDX usage is unaffected
- Progress bar requires external state management across multiple questions: Mark as optional (REQ-UI-001-18) and implement only if straightforward

**Covers:** REQ-UI-001-14, REQ-UI-001-15, REQ-UI-001-16, REQ-UI-001-17, REQ-UI-001-18

**Dependencies:** Milestone 1 (tokens must exist)

---

## Technical Approach

### CSS Architecture Decision

**Chosen approach:** Add all component classes to `styles/globals.css`

**Rationale:**
- The project has only 4 custom components; a separate CSS module system adds unnecessary complexity
- `structure.md` already lists `styles/components.css` as a file, but consolidating into `globals.css` keeps the token layer and component classes co-located for easy maintenance
- If the component count grows beyond 8-10, consider migrating to CSS Modules per component

### Animation Performance

- All animations use CSS `transform` and `opacity` (GPU-composited properties) for smooth 60fps performance
- `max-height` animation is used for solution reveal because it avoids JavaScript measurement; the slight imprecision in timing is acceptable for this use case
- No `will-change` property needed at this scale

### Backward Compatibility Strategy

- No component prop is removed or renamed
- New optional props (`questionNumber`, `totalQuestions`) default to `undefined` and are not rendered when absent
- CSS class application replaces inline styles; visual output is equivalent or improved
- Any MDX file using these components with existing props continues to work without modification

---

## Architecture Design Direction

```
styles/globals.css
  :root {
    /* Existing tokens (unchanged) */
    /* New surface tokens */
    /* New elevation tokens */
    /* New transition tokens */
  }
  .dark {
    /* Dark mode overrides for new tokens */
  }

  /* Component: ConceptCard */
  .concept-card { ... }
  .concept-card--default { ... }
  .concept-card--highlight { ... }
  .concept-card--warning { ... }

  /* Component: Exercise */
  .exercise { ... }
  .exercise--basic { ... }
  .exercise--challenge { ... }

  /* Component: CompetencyQuestion */
  .competency-question { ... }
  .competency-question__option { ... }
```

Component files reference classes via `className` instead of `style` objects. Variant selection maps the prop value to the appropriate BEM modifier class.

---

## Risks and Mitigation

| Risk                                              | Probability | Impact | Mitigation                                                  |
| ------------------------------------------------- | ----------- | ------ | ----------------------------------------------------------- |
| Nextra CSS token collision                         | Low         | Medium | Inspect Nextra CSS at build; prefix tokens if needed        |
| Dark mode token values need color tuning           | Medium      | Low    | Visual QA pass in both modes before marking complete        |
| MDX content uses inline style overrides            | Low         | Medium | Grep content directory for `style=` on target components   |
| max-height animation edge case for long solutions  | Low         | Low    | Use generous max-height value (2000px); test with longest   |
| New optional props cause TypeScript lint warnings  | Low         | Low    | All props are typed as optional; no breaking change         |

---

## Definition of Done

- All 4 files modified and passing TypeScript compilation (`npx tsc --noEmit`)
- All component variants visually match Pencil mockup design tokens
- Hover interactions and transitions work in Chrome, Firefox, and Safari
- Dark mode renders correctly with appropriate token overrides
- No Nextra theme conflicts (sidebar, search, navigation unchanged)
- All existing MDX content renders without visual regression
- WCAG 2.1 AA contrast ratios met for all text on new backgrounds
