# SPEC-UI-001: Acceptance Criteria

## Overview

Acceptance criteria for the Pencil Design System integration. Each criterion maps to one or more requirements from `spec.md` and milestones from `plan.md`.

**SPEC Reference:** SPEC-UI-001

---

## AC-01: Surface Color Tokens Defined

**Covers:** REQ-UI-001-01

```gherkin
Given the file styles/globals.css exists
When I inspect the :root CSS custom properties
Then the following tokens are defined with exact values:
  | Token              | Value                              |
  | --color-bg-page    | #F8F9FC                            |
  | --color-bg-card    | #FFFFFF                            |
  | --color-bg-sidebar | #FFFFFF                            |
  | --shadow-card      | 0 2px 12px rgba(26, 25, 24, 0.08)  |
  | --shadow-card-hover| 0 4px 20px rgba(26, 25, 24, 0.12)  |
  | --transition-base  | 200ms ease                         |
  | --transition-lift  | 300ms ease                         |
```

**Verification:** Manual inspection of `globals.css` and browser DevTools computed styles.

---

## AC-02: Existing Tokens Preserved

**Covers:** REQ-UI-001-02

```gherkin
Given the file styles/globals.css exists
When I inspect the :root CSS custom properties
Then the following tokens remain unchanged:
  | Token            | Value    |
  | --color-primary  | #3498db  |
  | --color-success  | #2ecc71  |
  | --color-warning  | #e67e22  |
  | --color-danger   | #e74c3c  |
  | --border-radius  | 8px      |
And the spacing scale (--spacing-xs through --spacing-xl) is unchanged
And the font-size scale (--font-size-sm through --font-size-xl) is unchanged
```

**Verification:** Diff comparison of `:root` block before and after changes.

---

## AC-03: Dark Mode Token Overrides

**Covers:** REQ-UI-001-03

```gherkin
Given the user enables dark mode (body has .dark class)
When the page renders
Then --color-bg-page resolves to a dark surface value (not #F8F9FC)
And --color-bg-card resolves to a dark surface value (not #FFFFFF)
And --shadow-card uses appropriate opacity for dark backgrounds
And all text on card surfaces meets WCAG 2.1 AA contrast (4.5:1 minimum)
```

**Verification:** Toggle dark mode in browser; inspect computed styles; run contrast checker.

---

## AC-04: No Nextra Theme Interference

**Covers:** REQ-UI-001-04

```gherkin
Given the Pencil design tokens and component classes are applied
When I navigate the site
Then the Nextra sidebar renders with its default styling
And the Nextra search bar renders with its default styling
And the Nextra breadcrumb navigation renders with its default styling
And the Nextra table of contents renders with its default styling
And no Nextra-generated CSS class is overridden by our styles
```

**Verification:** Visual comparison of sidebar, search, and navigation before and after changes.

---

## AC-05: ConceptCard Visual Update

**Covers:** REQ-UI-001-05, REQ-UI-001-06, REQ-UI-001-08

```gherkin
Given I render a ConceptCard with variant "default"
When the card appears on the page
Then the card has a 4px left accent bar colored #3498db
And the card has a 1px border on top, right, and bottom sides
And the card has box-shadow matching --shadow-card
And the card has padding of 1.5rem
And the card background is --color-bg-card (#FFFFFF)
And the icon displays inside a 32px circular background with 15% opacity of the variant color

Given I render a ConceptCard with variant "highlight"
Then the left accent bar is colored #2ecc71
And the icon circle background uses #2ecc71 at 15% opacity

Given I render a ConceptCard with variant "warning"
Then the left accent bar is colored #e67e22
And the icon circle background uses #e67e22 at 15% opacity
```

**Verification:** Visual inspection across all three variants; measure padding and border in DevTools.

---

## AC-06: ConceptCard Hover Interaction

**Covers:** REQ-UI-001-07

```gherkin
Given a ConceptCard is rendered on the page
When the user hovers the mouse over the card
Then the card shadow transitions to --shadow-card-hover
And the card applies a translateY(-2px) transform
And the transition completes smoothly within --transition-lift duration (300ms)

When the user moves the mouse away from the card
Then the card returns to --shadow-card and translateY(0)
And the transition completes smoothly
```

**Verification:** Manual hover test in browser; verify no jank or flickering.

---

## AC-07: Inline Styles Removed

**Covers:** REQ-UI-001-09, REQ-UI-001-13, REQ-UI-001-17

```gherkin
Given the implementation is complete
When I inspect ConceptCard.tsx source code
Then the component uses className attributes (not style objects) for all visual properties
And the component does not contain any React inline style objects for layout, color, or spacing

When I inspect Exercise.tsx source code
Then the component uses className attributes for all visual properties

When I inspect CompetencyQuestion.tsx source code
Then the component uses className attributes for all visual properties
```

**Verification:** Code review; grep for `style={{` in all three component files should return zero matches (except potentially for dynamic animation state values managed by React state).

---

## AC-08: Exercise Header Strip and Badge

**Covers:** REQ-UI-001-10, REQ-UI-001-11

```gherkin
Given I render an Exercise with difficulty "basic"
When the component appears on the page
Then an 8px tall green (#2ecc71) strip is visible at the top of the card
And the difficulty badge displays with border-radius: 100px (pill shape)
And the badge background is #2ecc71 with white text

Given I render an Exercise with difficulty "challenge"
When the component appears on the page
Then the header strip is orange (#e67e22)
And the badge background is #e67e22 with white text
```

**Verification:** Visual inspection of both variants; measure border-radius in DevTools.

---

## AC-09: Exercise Solution Animation

**Covers:** REQ-UI-001-12

```gherkin
Given I render an Exercise with a solution provided
And the solution is initially hidden

When the user clicks the solution toggle button
Then the solution section expands with a smooth animation
And the animation uses max-height and opacity transitions
And the animation duration is approximately 300ms
And the solution content is fully visible after animation completes

When the user clicks the toggle button again
Then the solution section collapses with the reverse animation
And the content becomes fully hidden after animation completes
```

**Verification:** Click toggle button; observe animation smoothness; inspect CSS transitions in DevTools.

---

## AC-10: CompetencyQuestion Progress Indicator

**Covers:** REQ-UI-001-14

```gherkin
Given I render a CompetencyQuestion with questionNumber=3 and totalQuestions=10
When the component appears on the page
Then a progress indicator showing "3 / 10" is visible above the question text

Given I render a CompetencyQuestion without questionNumber and totalQuestions props
When the component appears on the page
Then no progress indicator is rendered
And the component displays identically to its pre-enhancement behavior
```

**Verification:** Render with and without optional props; verify display and absence.

---

## AC-11: CompetencyQuestion Option Hover

**Covers:** REQ-UI-001-15

```gherkin
Given a CompetencyQuestion is rendered with 4 options
And no answer has been revealed

When the user hovers over an unselected option button
Then the option background transitions to #f0ebf5
And the option border shows a subtle color change
And the transition is smooth (approximately 200ms)

When the user moves the mouse away
Then the option returns to its default background
```

**Verification:** Manual hover test on each option; inspect transition in DevTools.

---

## AC-12: CompetencyQuestion Answer Feedback Animation

**Covers:** REQ-UI-001-16

```gherkin
Given the user has selected option B (index 1)
And the correct answer is option C (index 2)

When the user clicks the "reveal answer" button
Then option C background transitions to #d5f5e3 (correct green) over 200ms
And option B background transitions to #fadbd8 (incorrect red) over 200ms
And the transitions are smooth (not instant)
And the explanation panel appears below the options
```

**Verification:** Click reveal; observe that colors animate rather than snap; time with DevTools.

---

## AC-13: CompetencyQuestion Progress Bar (Optional)

**Covers:** REQ-UI-001-18

```gherkin
Given the progress bar feature is implemented
And a CompetencyQuestion has questionNumber=3 and totalQuestions=10

When the component renders
Then a horizontal progress bar appears below the "3 / 10" indicator
And the bar is filled to 30% (3/10)
And the bar uses the quiz color (#9b59b6) for the filled portion
```

**Verification:** Visual inspection; calculate expected fill percentage.

---

## Quality Gates

### Build Verification

```gherkin
Given all four files have been modified
When I run npx tsc --noEmit
Then TypeScript compilation succeeds with zero errors

When I run npm run build
Then the Next.js production build succeeds with zero errors
And no console warnings related to CSS or styling appear
```

### Cross-Browser Verification

```gherkin
Given the implementation is deployed to a local development server
When I view the site in Chrome (latest), Firefox (latest), and Safari (latest)
Then all component styles render identically across browsers
And all hover interactions function in all browsers
And all CSS transitions animate smoothly in all browsers
```

### Accessibility Verification

```gherkin
Given the new surface and accent colors are applied
When I measure contrast ratios for text on card backgrounds
Then all text-on-background combinations meet WCAG 2.1 AA (4.5:1 for normal text, 3:1 for large text)

When I navigate using keyboard only
Then all interactive elements (buttons, options) are reachable via Tab
And focus states are clearly visible
And solution toggle and answer reveal are activatable via Enter/Space
```

### Regression Verification

```gherkin
Given I navigate to Phase 1 through Phase 8 exercise pages
When each page renders
Then all ConceptCard instances display with the new design
And all Exercise instances display with header strips and pill badges
And all CompetencyQuestion instances display with accent bars
And no content is visually broken, overlapped, or misaligned
And Korean typography (word-break: keep-all) still applies correctly
```

---

## Definition of Done Checklist

- [ ] All design tokens added to `:root` and `.dark` in globals.css
- [ ] Existing tokens verified unchanged
- [ ] ConceptCard: left accent bar, shadow, hover lift, icon circle
- [ ] Exercise: header strip, pill badge, animated solution reveal
- [ ] CompetencyQuestion: accent bar, hover states, animated feedback, optional progress indicator
- [ ] All inline styles replaced with CSS classes in all 3 component files
- [ ] TypeScript compilation passes (`npx tsc --noEmit`)
- [ ] Production build passes (`npm run build`)
- [ ] Visual QA in Chrome, Firefox, Safari
- [ ] Dark mode renders correctly
- [ ] WCAG 2.1 AA contrast verified
- [ ] No Nextra theme conflicts
- [ ] All Phase 1-8 MDX pages render without regression
