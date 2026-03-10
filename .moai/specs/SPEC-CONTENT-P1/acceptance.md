---
id: SPEC-CONTENT-P1
version: "1.0.0"
status: draft
created: "2026-03-10"
updated: "2026-03-10"
author: jw
priority: high
---

# Acceptance Criteria: SPEC-CONTENT-P1 -- Phase 1 MDX Content Generation

## Overview

These acceptance criteria define the quality gates for Phase 1 content generation. Every criterion uses the Given-When-Then format. All criteria must pass for the SPEC to be considered complete.

---

## AC-001: Complete File Set

**GIVEN** the `content/phase-1/` directory,
**WHEN** all content generation tasks are complete,
**THEN** exactly 6 MDX files exist with fully written educational content (not skeleton placeholders):
- `00-introduction.mdx`
- `01-motivation.mdx`
- `02-interoperability.mdx`
- `03-gruber-definition.mdx`
- `04-benefits.mdx`
- `05-exercises.mdx`

**Verification method:** `ls content/phase-1/*.mdx | wc -l` returns 6. Each file contains more than 100 lines of content (not skeleton headers only).

---

## AC-002: Korean Content with English Technical Terms

**GIVEN** any Phase 1 MDX session file,
**WHEN** the content is reviewed,
**THEN** all explanatory text is written in Korean, and every English technical term is introduced on first use with a Korean definition in parentheses.

**Verification method:** Search for key terms. Each of the following must appear with Korean definition on first use:
- Ontology (온톨로지)
- Interoperability (상호운용성)
- Specification (명세)
- Conceptualization (개념화)
- Taxonomy (택소노미)
- Reasoning (추론)

**Negative check:** No block of 3+ consecutive sentences in English (code blocks and quotes excluded).

---

## AC-003: "왜 필요한가?" Blockquotes

**GIVEN** any Phase 1 MDX session file (00 through 05),
**WHEN** the blockquotes are counted,
**THEN** at least 3 instances of `> **왜 필요한가?**` appear in each file.

**Verification method:** For each file, run: `grep -c '왜 필요한가?' content/phase-1/XX-*.mdx` and confirm count >= 3.

---

## AC-004: Mermaid Diagrams

**GIVEN** any Phase 1 MDX session file,
**WHEN** the Mermaid diagrams are inspected,
**THEN** exactly 1 Mermaid code block exists per file, and the section heading preceding it contains "이번 세션 전체 그림".

### AC-004.1: Mermaid Safe Syntax

**GIVEN** any Mermaid code block in Phase 1 content,
**WHEN** the syntax is inspected,
**THEN** the diagram contains:
- No apostrophes (`'`) in node labels
- No `+` operator (if `stateDiagram-v2`)
- Double-quoted labels `["text"]` for labels with Korean characters

### AC-004.2: Correct Diagram Types

**GIVEN** all 6 Phase 1 MDX files,
**WHEN** the Mermaid diagram types are reviewed,
**THEN** the diagram types match:

| File | Expected Diagram Type |
|------|----------------------|
| 00-introduction.mdx | `graph TD` |
| 01-motivation.mdx | `graph LR` |
| 02-interoperability.mdx | `sequenceDiagram` |
| 03-gruber-definition.mdx | `graph TD` |
| 04-benefits.mdx | `graph LR` |
| 05-exercises.mdx | `graph TD` |

### AC-004.3: Mermaid Render Verification

**GIVEN** the site running in development mode (`bun run dev`),
**WHEN** each Phase 1 page is loaded in a browser,
**THEN** each Mermaid diagram renders visually as a diagram (not as raw text or an error message).

---

## AC-005: No JSX Imports

**GIVEN** any Phase 1 MDX file,
**WHEN** the file is searched for import statements,
**THEN** zero `import` statements are found.

**Verification method:** `grep -c '^import' content/phase-1/*.mdx` returns 0 for every file.

---

## AC-006: "연결 포인트" Forward References

**GIVEN** any Phase 1 MDX session file (00 through 05),
**WHEN** the callouts are counted,
**THEN** at least 2 instances of `> **연결 포인트` appear in each file, and each references a valid future phase (Phase 2 through Phase 8).

**Verification method:** `grep -c '연결 포인트' content/phase-1/XX-*.mdx` >= 2 per file. Each referenced phase number is between 2 and 8.

---

## AC-007: "흔한 오해" Misconception Sections

**GIVEN** any Phase 1 MDX session file (00 through 05),
**WHEN** the misconception sections are counted,
**THEN** at least 1 instance of `> **흔한 오해**` followed by `> **실제로는**` appears in each file.

**Verification method:** `grep -c '흔한 오해' content/phase-1/XX-*.mdx` >= 1 per file.

---

## AC-008: Session 00 -- Introduction Content

**GIVEN** the file `content/phase-1/00-introduction.mdx`,
**WHEN** the content is reviewed,
**THEN** it contains:
- Phase 1 learning objective: "이게 왜 존재하는지"를 이해한다
- Brief overview of all 5 content sessions (01-05)
- The 3 competency questions as a preview list
- The guiding principle: "동기 없이 개념부터 외우면 오래 못 간다"
- A `graph TD` Mermaid diagram showing Phase 1 session roadmap
- At least 3 "왜 필요한가?" blockquotes
- At least 2 "연결 포인트" callouts
- At least 1 "흔한 오해" section

---

## AC-009: Session 01 -- Data/Information/Knowledge

**GIVEN** the file `content/phase-1/01-motivation.mdx`,
**WHEN** the content is rendered,
**THEN** it contains:
- The 38.5 degrees temperature example showing data -> information -> knowledge progression
- A manufacturing analogy (motor temperature or similar Korean industry example)
- An e-commerce analogy (product recommendation or similar)
- Explanation of why computers handle data but need help with knowledge
- Introduction of ontology as the bridge for machine-processable knowledge
- A `graph LR` Mermaid diagram showing the data -> information -> knowledge progression
- At least 300 words for each major concept section

---

## AC-010: Session 02 -- Interoperability Failures

**GIVEN** the file `content/phase-1/02-interoperability.mdx`,
**WHEN** the content is rendered,
**THEN** it contains:
- Hospital EMR example (Hospital A inpatients only vs. Hospital B includes outpatients)
- E-commerce category hierarchy mismatch example
- The "사과" (apple/Apple/apology) ambiguity example
- Definition of 상호운용성(Interoperability) with three levels (syntactic, semantic, pragmatic)
- A `sequenceDiagram` Mermaid diagram showing system communication failure
- Korean-specific context (Korean healthcare system or Korean e-commerce platforms referenced)

---

## AC-011: Session 03 -- Gruber's Definition

**GIVEN** the file `content/phase-1/03-gruber-definition.mdx`,
**WHEN** the content is rendered,
**THEN** it contains:
- Gruber's 1993 original English quote: "An ontology is an explicit specification of a conceptualization"
- Correct attribution (Thomas R. Gruber, 1993)
- All 4 components explained individually with concrete examples:
  - Explicit (명시적): with "good customer" multi-department example or equivalent
  - Specification (명세): with formal vs. natural language comparison
  - Conceptualization (개념화): with map analogy (subway map vs. road map)
  - Shared (공유된): with individual classification vs. community standard comparison
- Synthesis section explaining how all 4 work together
- A `graph TD` Mermaid diagram showing 4 components connected to "Ontology" center
- The insight: "공유가 없으면 개인 메모, 명시적이 없으면 자연어 문서"

---

## AC-012: Session 04 -- Prior Approaches and Limitations

**GIVEN** the file `content/phase-1/04-benefits.mdx`,
**WHEN** the content is rendered,
**THEN** it contains:
- Database Schema Unification: description, when it works, limitations, manufacturing example
- Natural Language Documents: description, when it works, limitations, ISO standard example
- Taxonomy: description, when it works, limitations, Dewey Decimal or equivalent example
- What ontology adds beyond each approach (specifically: reasoning capability)
- A comparison table with rows for each approach + ontology and columns for key capabilities
- A `graph LR` Mermaid diagram showing approaches hitting limitations and ontology bridging them
- Each approach section is at least 300 words

---

## AC-013: Session 05 -- Exercises and Competency Questions

**GIVEN** the file `content/phase-1/05-exercises.mdx`,
**WHEN** the content is rendered,
**THEN** it contains:

### Basic Exercises (기본 실습):
- Exercise 1: Domain term ambiguity discovery task with guidance
- Exercise 2: Data/information/knowledge classification task with a provided item list and answer key
- Exercise 3: Interoperability problem identification task with guided questions

### Challenge Exercises (도전 실습):
- Exercise 4: Context addition for machine understanding (building on Exercise 1)
- Exercise 5: Gruber definition application to learner's domain

### Competency Questions (핵심 질문):
All 3 Phase 1 competency questions from the curriculum are present with guidance:
1. "데이터베이스가 이미 있는데 온톨로지가 왜 추가로 필요한가?" with guidance pointing to Session 04
2. "'공유된 개념화의 명시적 명세'에서 '공유'가 빠지면 어떤 문제가 생기는가?" with guidance pointing to Session 03
3. "상호운용성 문제를 온톨로지 없이 해결하려면 어떤 비용이 드는가?" with guidance pointing to Sessions 02 and 04

### Self-Assessment Checklist:
At least 4 self-assessment items in Korean

### Concept Map:
A `graph TD` Mermaid diagram connecting all Phase 1 concepts

---

## AC-014: YAML Frontmatter

**GIVEN** any Phase 1 MDX file,
**WHEN** the frontmatter is inspected,
**THEN** it contains all required fields:
- `title`: Korean session title (string)
- `description`: Korean description for search (string, 50-100 characters)
- `difficulty`: "beginner" (string)

**Verification method:** Check each file starts with `---` followed by YAML block containing title, description, and difficulty fields, closed by `---`.

---

## AC-015: Content Depth

**GIVEN** any content session file (01 through 04),
**WHEN** the word count of each major concept section is measured,
**THEN** each major concept section contains at least 300 Korean words (measured approximately by character count / 2 for Korean or by visual inspection of paragraph density).

**Guidance:** Each section should have at least 3 substantial paragraphs with real-world examples and analogies. Sections with only 1-2 sentences fail this criterion.

---

## AC-016: Narrative Arc

**GIVEN** any content session file (01 through 04),
**WHEN** the content structure is reviewed,
**THEN** each major concept follows the "problem first, solution second" narrative arc:
1. The limitation or problem is described BEFORE the concept is introduced
2. The concept is presented as a response to the problem
3. Practical impact is explained with domain-relevant examples

**Verification method:** For each major concept heading, confirm that a problem statement or "왜 필요한가?" blockquote appears before or at the start of the explanation, not after.

---

## AC-017: Build Success

**GIVEN** all 6 Phase 1 MDX files are generated,
**WHEN** `bun run build` (or `npm run build`) is executed,
**THEN** the build completes with:
- Zero MDX parsing errors
- Zero Mermaid syntax errors
- Zero TypeScript errors
- All Phase 1 pages accessible in the built output

---

## AC-018: Navigation Integrity

**GIVEN** the site running in development mode,
**WHEN** the Phase 1 sidebar navigation is used,
**THEN** all 6 session links in the sidebar correctly navigate to the corresponding content page, and each page displays the full educational content (not skeleton placeholders).

---

## AC-019: Real-World Analogies

**GIVEN** content sessions 01 through 04,
**WHEN** the analogies and examples are counted,
**THEN** at least 2 real-world analogies from Korean-relevant industries appear in each session. Industries include:
- Manufacturing (smart factory, production lines, quality control)
- Healthcare (EMR, insurance claims, patient records)
- E-commerce (product categories, search integration, recommendations)

---

## AC-020: Academic Attribution

**GIVEN** session 03-gruber-definition.mdx,
**WHEN** the academic citations are reviewed,
**THEN**:
- Gruber (1993) is correctly cited for the original definition
- The "shared" extension is attributed to Borst (1997) or Studer et al. (1998)
- No fabricated references or statistics appear in any Phase 1 content

---

## Quality Gate Summary

| ID | Criterion | Priority | Verification |
|----|-----------|----------|-------------|
| AC-001 | 6 complete MDX files | MUST | File count + line count |
| AC-002 | Korean content, English terms defined | MUST | Manual review |
| AC-003 | 3+ "왜 필요한가?" per file | MUST | grep count |
| AC-004 | 1 Mermaid diagram per file, safe syntax | MUST | grep + render test |
| AC-005 | Zero JSX imports | MUST | grep check |
| AC-006 | 2+ "연결 포인트" per file | MUST | grep count |
| AC-007 | 1+ "흔한 오해" per file | MUST | grep count |
| AC-008 | Session 00 required content | MUST | Manual review |
| AC-009 | Session 01 required content | MUST | Manual review |
| AC-010 | Session 02 required content | MUST | Manual review |
| AC-011 | Session 03 required content | MUST | Manual review |
| AC-012 | Session 04 required content | MUST | Manual review |
| AC-013 | Session 05 exercises and questions | MUST | Manual review |
| AC-014 | YAML frontmatter complete | MUST | YAML validation |
| AC-015 | 300+ words per concept section | SHOULD | Approximate count |
| AC-016 | Problem-first narrative arc | SHOULD | Structural review |
| AC-017 | Build success (zero errors) | MUST | Build command |
| AC-018 | Navigation integrity | MUST | Browser navigation test |
| AC-019 | 2+ Korean industry analogies per session | SHOULD | Manual review |
| AC-020 | Correct academic attribution | MUST | Citation check |

---

## Definition of Done

Phase 1 content generation is DONE when:

1. All 20 acceptance criteria above are verified (MUST criteria pass, SHOULD criteria are best-effort)
2. `bun run build` completes with zero errors
3. All 6 Phase 1 pages render correctly in a browser with:
   - Full Korean educational content (not skeleton placeholders)
   - Mermaid diagrams rendering as visual diagrams
   - No console errors related to MDX parsing
4. The 3 Phase 1 competency questions from the curriculum appear in `05-exercises.mdx` with guidance
5. Content follows the narrative arc established in `my-docs/edu-content.md`
