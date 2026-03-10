---
id: SPEC-CONTENT-P5
version: "1.0.0"
status: draft
created: "2026-03-10"
updated: "2026-03-10"
author: jw
priority: high
---

# Acceptance Criteria: SPEC-CONTENT-P5 -- Phase 5 MDX Content Generation

## Overview

These acceptance criteria define the quality gates for Phase 5 content generation. Every criterion uses the Given-When-Then format. All criteria must pass for the SPEC to be considered complete.

---

## AC-001: Complete File Set

**GIVEN** the `content/phase-5/` directory,
**WHEN** all content generation tasks are complete,
**THEN** exactly 8 MDX files exist with fully written educational content (not skeleton placeholders):
- `00-introduction.mdx`
- `01-methontology.mdx`
- `02-competency-questions.mdx`
- `03-top-down-design.mdx`
- `04-bottom-up-design.mdx`
- `05-anti-patterns.mdx`
- `06-quality-criteria.mdx`
- `07-exercises.mdx`

**Verification method:** `ls content/phase-5/*.mdx | wc -l` returns 8. Each file contains more than 100 lines of content (not skeleton headers only).

---

## AC-002: Korean Content with English Technical Terms

**GIVEN** any Phase 5 MDX session file,
**WHEN** the content is reviewed,
**THEN** all explanatory text is written in Korean, and every English technical term is introduced on first use with a Korean definition in parentheses.

**Verification method:** Search for key terms. Each of the following must appear with Korean definition on first use:
- METHONTOLOGY (메소톨로지)
- Competency Question (역량 질문)
- Top-down Design (하향식 설계)
- Bottom-up Design (상향식 설계)
- Middle-out Design (중간 방식)
- Anti-pattern (안티패턴)
- Consistency (일관성)
- Accuracy (정확성)
- Completeness (완전성)
- Conciseness (간결성)
- Extensibility (확장성)
- owl:imports
- owl:equivalentClass
- owl:sameAs

**Negative check:** No block of 3+ consecutive sentences in English (code blocks, OWL syntax examples, and academic quotes excluded).

---

## AC-003: "왜 필요한가?" Blockquotes

**GIVEN** any Phase 5 MDX session file (00 through 07),
**WHEN** the blockquotes are counted,
**THEN** at least 3 instances of `> **왜 필요한가?**` appear in each file.

**Verification method:** For each file, run: `grep -c '왜 필요한가?' content/phase-5/XX-*.mdx` and confirm count >= 3.

---

## AC-004: Mermaid Diagrams

**GIVEN** any Phase 5 MDX session file,
**WHEN** the Mermaid diagrams are inspected,
**THEN** exactly 1 Mermaid code block exists per file, and the section heading preceding it contains "이번 세션 전체 그림".

### AC-004.1: Mermaid Safe Syntax

**GIVEN** any Mermaid code block in Phase 5 content,
**WHEN** the syntax is inspected,
**THEN** the diagram contains:
- No apostrophes (`'`) in node labels
- No `+` operator (if `stateDiagram-v2`)
- Double-quoted labels `["text"]` for labels with Korean characters

### AC-004.2: Correct Diagram Types

**GIVEN** all 8 Phase 5 MDX files,
**WHEN** the Mermaid diagram types are reviewed,
**THEN** the diagram types match:

| File | Expected Diagram Type |
|------|----------------------|
| 00-introduction.mdx | `graph TD` |
| 01-methontology.mdx | `graph LR` |
| 02-competency-questions.mdx | `graph TD` |
| 03-top-down-design.mdx | `graph TD` |
| 04-bottom-up-design.mdx | `graph LR` |
| 05-anti-patterns.mdx | `graph TD` |
| 06-quality-criteria.mdx | `graph TD` |
| 07-exercises.mdx | `graph TD` |

### AC-004.3: Mermaid Render Verification

**GIVEN** the site running in development mode (`bun run dev`),
**WHEN** each Phase 5 page is loaded in a browser,
**THEN** each Mermaid diagram renders visually as a diagram (not as raw text or an error message).

---

## AC-005: No JSX Imports

**GIVEN** any Phase 5 MDX file,
**WHEN** the file is searched for import statements,
**THEN** zero `import` statements are found.

**Verification method:** `grep -c '^import' content/phase-5/*.mdx` returns 0 for every file.

---

## AC-006: "연결 포인트" Forward References

**GIVEN** any Phase 5 MDX session file (00 through 07),
**WHEN** the callouts are counted,
**THEN** at least 2 instances of `> **연결 포인트` appear in each file, and each references a valid future phase (Phase 6 or Phase 7) or a valid backward reference to Phases 1-4.

**Verification method:** `grep -c '연결 포인트' content/phase-5/XX-*.mdx` >= 2 per file. Each referenced phase number is between 1 and 8.

---

## AC-007: "흔한 오해" Misconception Sections

**GIVEN** any Phase 5 MDX session file (00 through 07),
**WHEN** the misconception sections are counted,
**THEN** at least 1 instance of `> **흔한 오해**` followed by `> **실제로는**` appears in each file.

**Verification method:** `grep -c '흔한 오해' content/phase-5/XX-*.mdx` >= 1 per file.

---

## AC-008: Session 00 -- Introduction Content

**GIVEN** the file `content/phase-5/00-introduction.mdx`,
**WHEN** the content is reviewed,
**THEN** it contains:
- Phase 5 learning objective: "스스로 작은 도메인 온톨로지를 체계적으로 설계할 수 있다"
- Phase 4 connection: reference to "언어를 알았으니 이제 무엇을 어떻게 써야 할지"
- Brief overview of all 7 content sessions (01-07)
- The 4 competency questions as a preview list
- A `graph TD` Mermaid diagram showing Phase 5 session roadmap
- At least 3 "왜 필요한가?" blockquotes
- At least 2 "연결 포인트" callouts
- At least 1 "흔한 오해" section

---

## AC-009: Session 01 -- METHONTOLOGY and Process Overview

**GIVEN** the file `content/phase-5/01-methontology.mdx`,
**WHEN** the content is rendered,
**THEN** it contains:
- METHONTOLOGY overview with correct attribution (Fernandez-Lopez, Gomez-Perez, Juristo, 1997)
- Ontology 101 overview with correct attribution (Noy & McGuinness, 2001, Stanford)
- Common development flow synthesis: scope, search, enumerate, hierarchy, properties, constraints, instances, validate
- Emphasis on iterative (not waterfall) nature of ontology development
- A `graph LR` Mermaid diagram showing the development lifecycle with iteration arrow
- At least 300 words for each methodology description section
- At least 3 "왜 필요한가?" blockquotes
- At least 2 "연결 포인트" callouts referencing Phase 6 and/or Phase 7
- At least 1 "흔한 오해" section

---

## AC-010: Session 02 -- Competency Questions

**GIVEN** the file `content/phase-5/02-competency-questions.mdx`,
**WHEN** the content is rendered,
**THEN** it contains:
- Clear definition of Competency Questions with attribution to Gruninger & Fox (1995)
- At least 3 concrete CQ examples from the smartphone parts manufacturing domain:
  - "이 부품을 사용하는 모든 제품을 찾아라"
  - "이 공정에서 발생할 수 있는 불량 유형은 무엇인가"
  - "A 부품과 동일한 스펙을 가진 대체 부품은 무엇인가"
- Analysis showing how CQs imply classes, properties, and relationships
- CQ quality criteria: specific, answerable, scoped, SPARQL-verifiable
- CQ-driven scope control explanation with the exclusion test
- The TDD (Test-Driven Development) analogy for CQ methodology
- A `graph TD` Mermaid diagram showing CQ derivation flow
- At least 3 "왜 필요한가?" blockquotes
- At least 2 "연결 포인트" callouts

---

## AC-011: Session 03 -- Design Strategies

**GIVEN** the file `content/phase-5/03-top-down-design.mdx`,
**WHEN** the content is rendered,
**THEN** it contains:
- Top-down (하향식) design description with advantages, disadvantages, and use cases
- Bottom-up (상향식) design description with advantages, disadvantages, and use cases
- Middle-out (중간 방식) design description with recommendation for practical use
- Each approach with at least one concrete example from manufacturing or Korean industry context
- A comparison synthesis section explaining when to use each approach
- Note that real projects often mix approaches
- A `graph TD` Mermaid diagram showing three-column comparison of the approaches
- At least 300 words for each of the three approach descriptions
- At least 3 "왜 필요한가?" blockquotes
- At least 2 "연결 포인트" callouts

---

## AC-012: Session 04 -- Ontology Reuse

**GIVEN** the file `content/phase-5/04-bottom-up-design.mdx`,
**WHEN** the content is rendered,
**THEN** it contains:
- The "do not reinvent the wheel" principle explanation
- Description of 3 ontology repositories: BioPortal, LOV, OBO Foundry
- owl:imports mechanism explanation with syntax and use cases
- owl:equivalentClass and owl:sameAs mapping explanation with clear distinction between the two
- Caution about owl:sameAs overuse (inference explosion)
- Consistency verification requirement after importing (reasoner check)
- A `graph LR` Mermaid diagram showing the reuse workflow
- At least 3 "왜 필요한가?" blockquotes
- At least 2 "연결 포인트" callouts
- At least 1 "흔한 오해" section

---

## AC-013: Session 05 -- Anti-Patterns

**GIVEN** the file `content/phase-5/05-anti-patterns.mdx`,
**WHEN** the content is rendered,
**THEN** it contains all 4 anti-patterns with concrete examples:
1. **Too deep hierarchy:** 5+ level hierarchy problem, manufacturing example, reasoner performance impact
2. **Reifying relationships as classes:** "고용 관계" or equivalent example, when reification IS appropriate vs. not
3. **Namespace confusion:** Mixed URI example, impact on imports, best practice URI pattern
4. **Instance-class confusion:** "서울(Seoul)" or equivalent example, OWL 2 punning explanation

Each anti-pattern section includes:
- Problem description
- Impact explanation
- Concrete example
- Solution or fix
- At least 300 words

Additional requirements:
- A `graph TD` Mermaid diagram showing 4 anti-pattern categories
- At least 3 "왜 필요한가?" blockquotes
- At least 2 "연결 포인트" callouts
- At least 1 "흔한 오해" section

---

## AC-014: Session 06 -- Quality Criteria

**GIVEN** the file `content/phase-5/06-quality-criteria.mdx`,
**WHEN** the content is rendered,
**THEN** it contains all 5 quality criteria:
1. **Accuracy (정확성):** Domain correctness, expert review method, CQ connection
2. **Completeness (완전성):** CQ-answerable, SPARQL verification method, prioritization approach
3. **Consistency (일관성):** Logical contradiction-free, automated reasoner checking, ex falso quodlibet explanation
4. **Conciseness (간결성):** No redundancy, duplicate class example, merge strategy
5. **Extensibility (확장성):** New concept addition without restructuring, Open-Closed Principle analogy

Additional requirements:
- Explanation that consistency is the ONLY fully automatable quality criterion
- Reasoner examples: HermiT, Pellet, ELK mentioned
- A `graph TD` Mermaid diagram showing 5 quality dimensions
- At least 300 words for each of the first 3 criteria (Accuracy, Completeness, Consistency)
- At least 200 words for the last 2 criteria (Conciseness, Extensibility)
- At least 3 "왜 필요한가?" blockquotes
- At least 2 "연결 포인트" callouts
- At least 1 "흔한 오해" section

---

## AC-015: Session 07 -- Exercises and Competency Questions

**GIVEN** the file `content/phase-5/07-exercises.mdx`,
**WHEN** the content is rendered,
**THEN** it contains:

### Basic Exercise (기본 실습):
- Exercise 1: Write 5 CQs for your own domain with guidance, example format, and self-evaluation criteria

### Challenge Exercises (도전 실습):
- Exercise 2: Design a minimal ontology in Protege using Exercise 1 CQs, with step-by-step guidance including SPARQL query verification
- Exercise 3: Anti-pattern checklist review of the ontology from Exercise 2, with specific checklist items for all 4 anti-patterns

### Competency Questions (핵심 질문):
All 4 Phase 5 competency questions from the curriculum are present with guidance:
1. "Competency Question이 명확할수록 온톨로지 설계 품질이 올라가는 이유는?" with guidance pointing to Session 02
2. "하향식, 상향식, 중간 방식 중 실무에서 권장되는 접근법과 그 이유는?" with guidance pointing to Session 03
3. "기존 온톨로지를 재사용할 때 반드시 확인해야 할 것은 무엇인가?" with guidance pointing to Session 04
4. "온톨로지의 일관성(Consistency)을 자동으로 검사할 수 있는 방법은?" with guidance pointing to Session 06

### Self-Assessment Checklist:
At least 6 self-assessment items in Korean

### Concept Map:
A `graph TD` Mermaid diagram connecting all Phase 5 concepts

---

## AC-016: YAML Frontmatter

**GIVEN** any Phase 5 MDX file,
**WHEN** the frontmatter is inspected,
**THEN** it contains all required fields:
- `title`: Korean session title (string)
- `description`: Korean description for search (string, 50-100 characters)
- `difficulty`: "intermediate" (string)

**Verification method:** Check each file starts with `---` followed by YAML block containing title, description, and difficulty fields, closed by `---`.

---

## AC-017: Content Depth

**GIVEN** any content session file (01 through 06),
**WHEN** the word count of each major concept section is measured,
**THEN** each major concept section contains at least 300 Korean words (measured approximately by character count / 2 for Korean or by visual inspection of paragraph density).

**Guidance:** Each section should have at least 3 substantial paragraphs with real-world examples and analogies. Sections with only 1-2 sentences fail this criterion.

---

## AC-018: Narrative Arc

**GIVEN** any content session file (01 through 06),
**WHEN** the content structure is reviewed,
**THEN** each major concept follows the "problem first, solution second" narrative arc:
1. The limitation or problem is described BEFORE the concept/technique is introduced
2. The concept is presented as a response to the problem
3. Practical impact is explained with domain-relevant examples

**Verification method:** For each major concept heading, confirm that a problem statement or "왜 필요한가?" blockquote appears before or at the start of the explanation, not after.

---

## AC-019: Build Success

**GIVEN** all 8 Phase 5 MDX files are generated,
**WHEN** `bun run build` (or `npm run build`) is executed,
**THEN** the build completes with:
- Zero MDX parsing errors
- Zero Mermaid syntax errors
- Zero TypeScript errors
- All Phase 5 pages accessible in the built output

---

## AC-020: Navigation Integrity

**GIVEN** the site running in development mode,
**WHEN** the Phase 5 sidebar navigation is used,
**THEN** all 8 session links in the sidebar correctly navigate to the corresponding content page, and each page displays the full educational content (not skeleton placeholders).

---

## AC-021: Real-World Analogies

**GIVEN** content sessions 01 through 06,
**WHEN** the analogies and examples are counted,
**THEN** at least 2 real-world analogies from Korean-relevant industries appear in each session. Industries include:
- Manufacturing (smart factory, electronics production, quality control, PCB manufacturing)
- Healthcare (EMR, medical ontologies, SNOMED CT context)
- E-commerce (product categorization, search integration)

---

## AC-022: Academic Attribution

**GIVEN** Phase 5 content files,
**WHEN** the academic citations are reviewed,
**THEN**:
- METHONTOLOGY is attributed to Fernandez-Lopez, Gomez-Perez, and Juristo (1997)
- Ontology 101 is attributed to Noy & McGuinness (2001), Stanford
- CQ methodology is attributed to Gruninger & Fox (1995)
- BioPortal is described as maintained by NCBO (National Center for Biomedical Ontology)
- OWL 2 constructs (owl:imports, owl:equivalentClass, owl:sameAs) are described accurately per W3C specification
- No fabricated references or statistics appear in any Phase 5 content

---

## AC-023: Difficulty Level Consistency

**GIVEN** all 8 Phase 5 MDX files,
**WHEN** the frontmatter difficulty field is inspected,
**THEN** all files have `difficulty: "intermediate"` (not "beginner").

**GIVEN** all Phase 5 content,
**WHEN** the conceptual prerequisites are reviewed,
**THEN** the content assumes learners understand:
- Basic OWL syntax (from Phase 4)
- Class hierarchies and property types (from Phase 2)
- Reasoning concepts (from Phase 3)
- SPARQL basics (from Phase 4)

No Phase 5 session re-teaches these Phase 1-4 concepts from scratch; instead, they are referenced as prerequisites.

---

## AC-024: Phase Continuity

**GIVEN** any Phase 5 session that references Phase 4 concepts,
**WHEN** the backward reference is reviewed,
**THEN** the reference accurately describes a concept that was actually taught in Phase 4 (RDF, RDFS, OWL, SPARQL, serialization, tools/Protege).

**GIVEN** any Phase 5 session that references Phase 6 or Phase 7,
**WHEN** the forward reference is reviewed,
**THEN** the reference accurately describes content planned for those phases:
- Phase 6: FOAF, Dublin Core, Schema.org, Gene Ontology, SNOMED CT
- Phase 7: Semantic Web, Knowledge Graphs, Manufacturing, LLM era

---

## Quality Gate Summary

| ID | Criterion | Priority | Verification |
|----|-----------|----------|-------------|
| AC-001 | 8 complete MDX files | MUST | File count + line count |
| AC-002 | Korean content, English terms defined | MUST | Manual review |
| AC-003 | 3+ "왜 필요한가?" per file | MUST | grep count |
| AC-004 | 1 Mermaid diagram per file, safe syntax | MUST | grep + render test |
| AC-005 | Zero JSX imports | MUST | grep check |
| AC-006 | 2+ "연결 포인트" per file | MUST | grep count |
| AC-007 | 1+ "흔한 오해" per file | MUST | grep count |
| AC-008 | Session 00 required content | MUST | Manual review |
| AC-009 | Session 01 required content (METHONTOLOGY + Ontology 101) | MUST | Manual review |
| AC-010 | Session 02 required content (CQs) | MUST | Manual review |
| AC-011 | Session 03 required content (3 design strategies) | MUST | Manual review |
| AC-012 | Session 04 required content (reuse strategies) | MUST | Manual review |
| AC-013 | Session 05 required content (4 anti-patterns) | MUST | Manual review |
| AC-014 | Session 06 required content (5 quality criteria) | MUST | Manual review |
| AC-015 | Session 07 exercises and 4 competency questions | MUST | Manual review |
| AC-016 | YAML frontmatter complete (difficulty: intermediate) | MUST | YAML validation |
| AC-017 | 300+ words per concept section | SHOULD | Approximate count |
| AC-018 | Problem-first narrative arc | SHOULD | Structural review |
| AC-019 | Build success (zero errors) | MUST | Build command |
| AC-020 | Navigation integrity | MUST | Browser navigation test |
| AC-021 | 2+ Korean industry analogies per session | SHOULD | Manual review |
| AC-022 | Correct academic attribution | MUST | Citation check |
| AC-023 | Difficulty level "intermediate" consistency | MUST | Frontmatter check |
| AC-024 | Phase continuity (accurate cross-references) | MUST | Manual review |

---

## Definition of Done

Phase 5 content generation is DONE when:

1. All 24 acceptance criteria above are verified (MUST criteria pass, SHOULD criteria are best-effort)
2. `bun run build` completes with zero errors
3. All 8 Phase 5 pages render correctly in a browser with:
   - Full Korean educational content (not skeleton placeholders)
   - Mermaid diagrams rendering as visual diagrams
   - No console errors related to MDX parsing
4. The 4 Phase 5 competency questions from the curriculum appear in `07-exercises.mdx` with guidance
5. Content follows the narrative arc established in the educational content plan
6. All academic attributions are correct (METHONTOLOGY, Ontology 101, CQ methodology)
7. Anti-pattern examples and quality criteria descriptions are technically accurate
8. The 3 exercises (1 basic + 2 challenge) provide actionable hands-on practice
