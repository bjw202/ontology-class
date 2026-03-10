# SPEC-UI-001: Pencil Design System Integration

## Metadata

| Field       | Value                                  |
| ----------- | -------------------------------------- |
| SPEC ID     | SPEC-UI-001                            |
| Title       | Pencil Design System Integration       |
| Created     | 2026-03-10                             |
| Status      | Planned                                |
| Priority    | High                                   |
| Assigned    | expert-frontend                        |
| Related     | SPEC-INFRA-001                         |
| Lifecycle   | spec-anchored                          |

---

## Environment

**Platform:** Nextra 4.x documentation site (Next.js 15, React 19, TypeScript 5.x)

**Current State:**
- Four custom components (`ConceptCard`, `Exercise`, `CompetencyQuestion`, `MermaidDiagram`) use inline styles exclusively
- `styles/globals.css` defines a minimal set of CSS custom properties (5 colors, 1 border-radius, spacing scale, font sizes)
- No component-level CSS classes exist; every visual property is hardcoded per-component
- The existing color palette (`--color-primary: #3498db`, `--color-success: #2ecc71`, `--color-warning: #e67e22`, `--color-danger: #e74c3c`) is functional but lacks elevation, surface, and feedback tokens
- No dark mode tokens beyond a single `--color-primary` override in `.dark`
- Components lack hover states, transitions, and interactive feedback
- No box-shadow or elevation system exists

**Design Source:** Pencil mockup file `ontology-design.pen` provides the target visual language

**Constraints:**
- Nextra 4.x manages its own theme and sidebar styles; modifications must not conflict with Nextra internals
- All Korean typography optimizations (`word-break: keep-all`, Noto Sans KR font) must be preserved
- Components are consumed in MDX files across 8 curriculum phases; interface signatures (props) must remain backward-compatible
- WCAG 2.1 AA color contrast compliance is required per product.md accessibility targets
- No CSS-in-JS libraries are permitted; use CSS custom properties and CSS modules or plain CSS classes

---

## Assumptions

| # | Assumption                                                                         | Confidence | Risk if Wrong                                       |
|---|------------------------------------------------------------------------------------|------------|-----------------------------------------------------|
| 1 | The Pencil mockup `ontology-design.pen` accurately represents the approved design  | High       | Rework required after stakeholder review             |
| 2 | Existing MDX content does not override component styles with inline `style` props   | Medium     | Some MDX pages may need manual style cleanup         |
| 3 | Nextra 4.x theme CSS does not use the same custom property names as our tokens      | High       | Namespace collision requiring token renaming         |
| 4 | Current component prop interfaces are stable and backward-compatible changes suffice| High       | Breaking changes would require MDX content migration |
| 5 | No Tailwind CSS is required; plain CSS custom properties are sufficient             | High       | Increased verbosity but no functional risk           |

---

## Requirements

### Module 1: Design Token System (globals.css)

**REQ-UI-001-01** (Ubiquitous)
The design token system **shall** define CSS custom properties for surface colors (`--color-bg-page: #F8F9FC`, `--color-bg-card: #FFFFFF`, `--color-bg-sidebar: #FFFFFF`), elevation (`--shadow-card`, `--shadow-card-hover`), and transition timing (`--transition-base`) in the `:root` scope.

**REQ-UI-001-02** (Ubiquitous)
The design token system **shall** preserve all existing custom properties (`--color-primary`, `--color-success`, `--color-warning`, `--color-danger`, `--border-radius`, spacing scale, font sizes) without modifying their values.

**REQ-UI-001-03** (State-Driven)
**While** the user has dark mode enabled (`.dark` class), the design token system **shall** provide dark-mode overrides for all newly added surface and elevation tokens.

**REQ-UI-001-04** (Unwanted)
The design token system **shall not** introduce any CSS that overrides Nextra's built-in sidebar, navigation, or search styling.

### Module 2: ConceptCard Enhancement

**REQ-UI-001-05** (Ubiquitous)
The ConceptCard component **shall** replace the current 2px full border with a 4px-wide left accent bar colored by variant and a subtler 1px solid border on remaining sides.

**REQ-UI-001-06** (Ubiquitous)
The ConceptCard component **shall** apply the `--shadow-card` elevation token and increase internal padding to 1.5rem.

**REQ-UI-001-07** (Event-Driven)
**When** the user hovers over a ConceptCard, the component **shall** apply a lift effect by transitioning to `--shadow-card-hover` elevation and a subtle translateY(-2px) transform.

**REQ-UI-001-08** (Ubiquitous)
The ConceptCard icon **shall** be displayed inside a colored circular background (32px diameter) tinted by the variant color at 15% opacity.

**REQ-UI-001-09** (Ubiquitous)
The ConceptCard component **shall** migrate from inline styles to CSS classes defined in `styles/globals.css` (or a dedicated component CSS file), while preserving the three variant options (`default`, `highlight`, `warning`).

### Module 3: Exercise Enhancement

**REQ-UI-001-10** (Ubiquitous)
The Exercise component **shall** display a colored header strip at the top of the card (8px tall, colored by difficulty) replacing the current uniform border.

**REQ-UI-001-11** (Ubiquitous)
The Exercise difficulty badge **shall** use fully-rounded corners (`border-radius: 100px`) with increased horizontal padding for a pill shape.

**REQ-UI-001-12** (Event-Driven)
**When** the user clicks the solution toggle button, the solution section **shall** expand with a CSS transition animation (max-height + opacity, 300ms ease) instead of an instant show/hide.

**REQ-UI-001-13** (Ubiquitous)
The Exercise component **shall** apply the `--shadow-card` elevation token and use CSS classes instead of inline styles.

### Module 4: CompetencyQuestion Enhancement

**REQ-UI-001-14** (Ubiquitous)
The CompetencyQuestion component **shall** display a question progress indicator showing "N / M" format (current question number and total) when `questionNumber` and `totalQuestions` props are provided.

**REQ-UI-001-15** (Event-Driven)
**When** the user hovers over an unselected option button, the button **shall** display a highlighted background state (`#f0ebf5`) and a subtle border color change.

**REQ-UI-001-16** (Event-Driven)
**When** the answer is revealed, correct and incorrect options **shall** display feedback with a 200ms background-color transition instead of an instant color swap.

**REQ-UI-001-17** (Ubiquitous)
The CompetencyQuestion component **shall** apply the `--shadow-card` elevation token, use CSS classes, and display a colored left accent bar (4px, `#9b59b6`) consistent with the ConceptCard accent pattern.

**REQ-UI-001-18** (Optional)
**Where** a progress bar feature is implemented, the CompetencyQuestion component **shall** display a horizontal progress bar below the question indicator showing percentage completion across a question set.

---

## Specifications

### Technical Approach

1. **CSS Custom Properties Extension**: Add new tokens to `styles/globals.css` `:root` block and `.dark` block. No new CSS files are required for tokens.

2. **Component CSS Migration**: Move inline styles to CSS classes. Options:
   - Add component classes to `styles/globals.css` (simplest, recommended for this project size)
   - Create `styles/components.css` if separation is preferred (file already exists in structure.md)

3. **Backward Compatibility**: All existing component props remain unchanged. New optional props (`questionNumber`, `totalQuestions` for CompetencyQuestion) are additive only.

4. **Animation Strategy**: Use CSS transitions on `max-height`, `opacity`, `transform`, and `background-color`. No JavaScript animation libraries required.

### File Impact Analysis

| File                          | Change Type | Scope   |
| ----------------------------- | ----------- | ------- |
| `styles/globals.css`          | Modify      | Tokens + component classes |
| `components/ConceptCard.tsx`  | Modify      | Replace inline styles with CSS classes, add hover/accent |
| `components/Exercise.tsx`     | Modify      | Replace inline styles, add header strip, animate solution |
| `components/CompetencyQuestion.tsx` | Modify | Replace inline styles, add progress indicator, animate feedback |

### Design Tokens (New)

```css
/* Surface tokens */
--color-bg-page: #F8F9FC;
--color-bg-card: #FFFFFF;
--color-bg-sidebar: #FFFFFF;

/* Elevation tokens */
--shadow-card: 0 2px 12px rgba(26, 25, 24, 0.08);
--shadow-card-hover: 0 4px 20px rgba(26, 25, 24, 0.12);

/* Transition tokens */
--transition-base: 200ms ease;
--transition-lift: 300ms ease;

/* Component-specific tokens */
--color-quiz: #9b59b6;
--color-quiz-bg: #f9f4fd;
```

### Traceability

| Requirement     | Plan Reference   | Acceptance Reference |
| --------------- | ---------------- | -------------------- |
| REQ-UI-001-01   | Milestone 1      | AC-01                |
| REQ-UI-001-02   | Milestone 1      | AC-02                |
| REQ-UI-001-03   | Milestone 1      | AC-03                |
| REQ-UI-001-04   | Milestone 1      | AC-04                |
| REQ-UI-001-05   | Milestone 2      | AC-05                |
| REQ-UI-001-06   | Milestone 2      | AC-05                |
| REQ-UI-001-07   | Milestone 2      | AC-06                |
| REQ-UI-001-08   | Milestone 2      | AC-05                |
| REQ-UI-001-09   | Milestone 2      | AC-07                |
| REQ-UI-001-10   | Milestone 3      | AC-08                |
| REQ-UI-001-11   | Milestone 3      | AC-08                |
| REQ-UI-001-12   | Milestone 3      | AC-09                |
| REQ-UI-001-13   | Milestone 3      | AC-07                |
| REQ-UI-001-14   | Milestone 4      | AC-10                |
| REQ-UI-001-15   | Milestone 4      | AC-11                |
| REQ-UI-001-16   | Milestone 4      | AC-12                |
| REQ-UI-001-17   | Milestone 4      | AC-07                |
| REQ-UI-001-18   | Milestone 4      | AC-13                |

---

## Expert Consultation Recommendations

**Frontend Expert (expert-frontend):** Recommended for implementation of CSS architecture decisions, animation performance, and Nextra theme compatibility verification.

**UI/UX Expert (design-uiux):** Recommended for WCAG 2.1 AA contrast validation of new surface tokens and dark mode overrides, particularly for the accent bar colors against card backgrounds.
