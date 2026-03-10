---
id: SPEC-CONTENT-P3
version: "1.0.0"
status: draft
created: "2026-03-10"
updated: "2026-03-10"
author: jw
priority: high
---

# Acceptance Criteria: SPEC-CONTENT-P3 -- Phase 3 MDX Content Generation

## Overview

These acceptance criteria define the quality gates for Phase 3 content generation. Every criterion uses the Given-When-Then format. All criteria must pass for the SPEC to be considered complete.

---

## AC-001: Complete File Set

**GIVEN** the `content/phase-3/` directory,
**WHEN** all content generation tasks are complete,
**THEN** exactly 7 MDX files exist with fully written educational content (not skeleton placeholders):
- `00-introduction.mdx`
- `01-description-logic.mdx`
- `02-owa-cwa.mdx`
- `03-reasoning-types.mdx`
- `04-reasoners.mdx`
- `05-complexity.mdx`
- `06-exercises.mdx`

**Verification method:** `ls content/phase-3/*.mdx | wc -l` returns 7. Each file contains more than 100 lines of content (not skeleton headers only).

---

## AC-002: Korean Content with English Technical Terms

**GIVEN** any Phase 3 MDX session file,
**WHEN** the content is reviewed,
**THEN** all explanatory text is written in Korean, and every English technical term is introduced on first use with a Korean definition in parentheses.

**Verification method:** Search for key terms. Each of the following must appear with Korean definition on first use:
- Description Logic (기술 논리)
- First-Order Logic (1차 논리)
- Decidability (결정 가능성)
- Open World Assumption (열린 세계 가정)
- Closed World Assumption (닫힌 세계 가정)
- Consistency Checking (일관성 검사)
- Classification (분류 추론)
- Realization (인스턴스 실현)
- Property Inference (속성값 추론)
- Reasoner (추론기)
- Completeness (완전성)
- Soundness (건전성)
- Transitive Property (전이적 속성)

**Negative check:** No block of 3+ consecutive sentences in English (code blocks and quotes excluded).

---

## AC-003: "왜 필요한가?" Blockquotes

**GIVEN** any Phase 3 MDX session file (00 through 06),
**WHEN** the blockquotes are counted,
**THEN** at least 3 instances of `> **왜 필요한가?**` appear in each file.

**Verification method:** For each file, run: `grep -c '왜 필요한가?' content/phase-3/XX-*.mdx` and confirm count >= 3.

---

## AC-004: Mermaid Diagrams

**GIVEN** any Phase 3 MDX session file,
**WHEN** the Mermaid diagrams are inspected,
**THEN** exactly 1 Mermaid code block exists per file, and the section heading preceding it contains "이번 세션 전체 그림".

### AC-004.1: Mermaid Safe Syntax

**GIVEN** any Mermaid code block in Phase 3 content,
**WHEN** the syntax is inspected,
**THEN** the diagram contains:
- No apostrophes (`'`) in node labels
- No `+` operator (if `stateDiagram-v2`)
- Double-quoted labels `["text"]` for labels with Korean characters

### AC-004.2: Correct Diagram Types

**GIVEN** all 7 Phase 3 MDX files,
**WHEN** the Mermaid diagram types are reviewed,
**THEN** the diagram types match:

| File | Expected Diagram Type |
|------|----------------------|
| 00-introduction.mdx | `graph TD` |
| 01-description-logic.mdx | `sequenceDiagram` |
| 02-owa-cwa.mdx | `stateDiagram-v2` |
| 03-reasoning-types.mdx | `graph TD` |
| 04-reasoners.mdx | `graph LR` |
| 05-complexity.mdx | `graph LR` |
| 06-exercises.mdx | `graph TD` |

### AC-004.3: Mermaid Render Verification

**GIVEN** the site running in development mode (`bun run dev`),
**WHEN** each Phase 3 page is loaded in a browser,
**THEN** each Mermaid diagram renders visually as a diagram (not as raw text or an error message).

---

## AC-005: No JSX Imports

**GIVEN** any Phase 3 MDX file,
**WHEN** the file is searched for import statements,
**THEN** zero `import` statements are found.

**Verification method:** `grep -c '^import' content/phase-3/*.mdx` returns 0 for every file.

---

## AC-006: "연결 포인트" Forward References

**GIVEN** any Phase 3 MDX session file (00 through 06),
**WHEN** the callouts are counted,
**THEN** at least 2 instances of `> **연결 포인트` appear in each file, and each references a valid phase (Phase 2 through Phase 8).

**Verification method:** `grep -c '연결 포인트' content/phase-3/XX-*.mdx` >= 2 per file. Each referenced phase number is between 2 and 8.

---

## AC-007: "흔한 오해" Misconception Sections

**GIVEN** any Phase 3 MDX session file (00 through 06),
**WHEN** the misconception sections are counted,
**THEN** at least 1 instance of `> **흔한 오해**` followed by `> **실제로는**` appears in each file.

**Verification method:** `grep -c '흔한 오해' content/phase-3/XX-*.mdx` >= 1 per file.

---

## AC-008: Session 00 -- Introduction Content

**GIVEN** the file `content/phase-3/00-introduction.mdx`,
**WHEN** the content is reviewed,
**THEN** it contains:
- Phase 3 learning objective: "온톨로지가 단순 분류표가 아니라 '추론 엔진'임을 이해한다"
- Phase 2 connection: "구성 요소를 알았다면, 이제 그것들이 어떻게 '생각'을 만들어내는지를 봐야 한다"
- Brief overview of all 6 content sessions (01-06)
- The 4 competency questions as a preview list
- A `graph TD` Mermaid diagram showing Phase 3 session roadmap
- At least 3 "왜 필요한가?" blockquotes
- At least 2 "연결 포인트" callouts (referencing Phase 4 and Phase 5)
- At least 1 "흔한 오해" section

---

## AC-009: Session 01 -- Description Logic

**GIVEN** the file `content/phase-3/01-description-logic.mdx`,
**WHEN** the content is rendered,
**THEN** it contains:
- Explanation of DL as a decidable subset of First-Order Logic (FOL)
- The key insight: "클래스를 충분히 정의하면, 무엇이 그 클래스에 속하는지 기계가 스스로 판단한다"
- The mammal/whale example: heart + milk production -> whale inferred as mammal
- At least 1 manufacturing analogy (e.g., precision part auto-classification)
- At least 1 healthcare analogy (e.g., patient auto-classification based on symptoms)
- Comparison between DB approach (store and retrieve) vs DL approach (define and derive)
- A `sequenceDiagram` Mermaid diagram showing the reasoning process
- At least 300 words for each major concept section (DL definition, key insight, DL vs DB)
- Definition of 기술 논리(Description Logic), 1차 논리(First-Order Logic), 결정 가능성(Decidability) on first use

---

## AC-010: Session 02 -- OWA vs CWA

**GIVEN** the file `content/phase-3/02-owa-cwa.mdx`,
**WHEN** the content is rendered,
**THEN** it contains:
- CWA definition: "기록되지 않은 것은 거짓이다" with database/SQL example
- OWA definition: "기록되지 않은 것은 알 수 없다" with web/semantic web example
- Korean-specific context (주민등록 시스템 or equivalent for CWA)
- Design implications: spouse field example showing different DB vs ontology interpretation
- Common beginner trap: applying CWA-style constraints in OWA ontology
- Comparison table with rows for: Absence of info, Constraint validation, Use case, Example systems
- A `stateDiagram-v2` Mermaid diagram showing OWA vs CWA paths
- The `stateDiagram-v2` diagram contains NO apostrophes and NO `+` operator
- At least 300 words for each section (CWA, OWA, design implications)

---

## AC-011: Session 03 -- Reasoning Types

**GIVEN** the file `content/phase-3/03-reasoning-types.mdx`,
**WHEN** the content is rendered,
**THEN** it contains all 4 reasoning types with dedicated sections:

### AC-011.1: Consistency Checking
- "독신자 = 결혼하지 않은 사람" + "결혼한 독신자" contradiction example
- At least 1 domain analogy (manufacturing QC or regulation audit)

### AC-011.2: Classification / Subsumption
- Whale -> Mammal automatic inference example
- Explanation that this is about class-to-class hierarchy

### AC-011.3: Instance Realization
- Instance auto-classified based on properties
- Clear distinction from Classification: "class-to-class vs instance-to-class"

### AC-011.4: Property Inference
- Transitive property example: ancestor chain (A -> B -> C => A -> C)
- At least 1 additional property type example (inverse or symmetric)
- Drug interaction symmetric property example (healthcare analogy)

### AC-011.5: Diagram
- A `graph TD` Mermaid diagram with "Reasoning Engine" center and 4 branches

---

## AC-012: Session 04 -- Reasoners and OWL Expressiveness

**GIVEN** the file `content/phase-3/04-reasoners.mdx`,
**WHEN** the content is rendered,
**THEN** it contains:
- Three major reasoners named: HermiT, Pellet, FaCT++
- Brief characteristics of each reasoner
- Soundness(건전성) and Completeness(완전성) definitions with analogy
- OWL expressiveness hierarchy: OWL Lite -> OWL DL -> OWL Full
- OWL DL as "sweet spot" explanation
- OWL Full described as undecidable/reasoning not guaranteed
- A `graph LR` Mermaid diagram showing OWL ontology -> Reasoner -> Inferred facts

---

## AC-013: Session 05 -- Complexity and Profiles

**GIVEN** the file `content/phase-3/05-complexity.mdx`,
**WHEN** the content is rendered,
**THEN** it contains:
- Expressiveness vs performance trade-off explanation
- All 3 OWL 2 profiles described with use cases:
  - OWL 2 EL: large hierarchies, SNOMED CT / Gene Ontology
  - OWL 2 QL: query optimization, SQL rewritable
  - OWL 2 RL: rule-based reasoning
- Ontology size categories (< 1K, 1K-100K, 100K+) with profile recommendations
- SNOMED CT reference (350K+ concepts, EL profile)
- A `graph LR` Mermaid diagram showing the EL -> QL -> RL -> DL expressiveness spectrum

---

## AC-014: Session 06 -- Exercises and Competency Questions

**GIVEN** the file `content/phase-3/06-exercises.mdx`,
**WHEN** the content is rendered,
**THEN** it contains:

### Basic Exercises (기본 실습):
- Exercise 1: Protege installation + 5-class animal ontology + HermiT reasoner run with step-by-step guidance
- Exercise 2: OWA vs CWA thought experiment with provided data table and contrasting answers

### Challenge Exercises (도전 실습):
- Exercise 3: Bachelor contradiction detection in Protege ("독신자 = 결혼하지 않은 사람" + married bachelor instance)
- Exercise 4: CWA/OWA difference experiment design (SQL vs OWL comparison)

### Competency Questions (핵심 질문):
All 4 Phase 3 competency questions from the curriculum are present with guidance:
1. "OWA와 CWA의 차이를 실제 예시로 설명하라. 온톨로지 설계에 어떤 영향을 주는가?" with guidance pointing to Session 02
2. "'분류(Classification)'와 '실현(Realization)'의 차이는 무엇인가?" with guidance pointing to Session 03
3. "추론기가 없는 온톨로지는 어떤 능력을 잃는가?" with guidance pointing to Sessions 03 and 04
4. "OWL DL이 OWL Full보다 제한적인 이유는 무엇인가?" with guidance pointing to Sessions 04 and 05

### Self-Assessment Checklist:
At least 5 self-assessment items in Korean

### Concept Map:
A `graph TD` Mermaid diagram connecting all Phase 3 concepts (DL, OWA/CWA, reasoning types, reasoners, complexity, profiles)

---

## AC-015: YAML Frontmatter

**GIVEN** any Phase 3 MDX file,
**WHEN** the frontmatter is inspected,
**THEN** it contains all required fields:
- `title`: Korean session title (string)
- `description`: Korean description for search (string, 50-100 characters)
- `difficulty`: "intermediate" (string)

**Verification method:** Check each file starts with `---` followed by YAML block containing title, description, and difficulty fields (difficulty = "intermediate"), closed by `---`.

---

## AC-016: Content Depth

**GIVEN** any content session file (01 through 05),
**WHEN** the word count of each major concept section is measured,
**THEN** each major concept section contains at least 300 Korean words (measured approximately by character count / 2 for Korean or by visual inspection of paragraph density).

**Guidance:** Each section should have at least 3 substantial paragraphs with real-world examples and analogies. Sections with only 1-2 sentences fail this criterion.

---

## AC-017: Narrative Arc

**GIVEN** any content session file (01 through 05),
**WHEN** the content structure is reviewed,
**THEN** each major concept follows the "problem first, solution second" narrative arc:
1. The limitation or problem is described BEFORE the concept is introduced
2. The concept is presented as a response to the problem
3. Practical impact is explained with domain-relevant examples

**Verification method:** For each major concept heading, confirm that a problem statement or "왜 필요한가?" blockquote appears before or at the start of the explanation, not after.

---

## AC-018: Build Success

**GIVEN** all 7 Phase 3 MDX files are generated,
**WHEN** `bun run build` (or `npm run build`) is executed,
**THEN** the build completes with:
- Zero MDX parsing errors
- Zero Mermaid syntax errors
- Zero TypeScript errors
- All Phase 3 pages accessible in the built output

---

## AC-019: Navigation Integrity

**GIVEN** the site running in development mode,
**WHEN** the Phase 3 sidebar navigation is used,
**THEN** all 7 session links in the sidebar correctly navigate to the corresponding content page, and each page displays the full educational content (not skeleton placeholders).

---

## AC-020: Real-World Analogies

**GIVEN** content sessions 01 through 05,
**WHEN** the analogies and examples are counted,
**THEN** at least 2 real-world analogies from Korean-relevant industries appear in each session. Industries include:
- Manufacturing (smart factory, QC systems, part classification, production lines)
- Healthcare (EMR, drug interactions, patient classification, medical ontologies)
- E-commerce (product categories, recommendation systems, search integration)

---

## AC-021: Academic Accuracy

**GIVEN** all Phase 3 content,
**WHEN** the technical claims are reviewed,
**THEN**:
- Description Logic is correctly described as a decidable subset of FOL
- OWA/CWA definitions are technically accurate
- HermiT, Pellet, FaCT++ capabilities are correctly characterized
- OWL Lite/DL/Full hierarchy matches W3C specification
- OWL 2 EL/QL/RL profile descriptions match W3C OWL 2 Profiles document
- SNOMED CT's use of OWL 2 EL is factually correct
- Soundness and completeness definitions are logically accurate
- No fabricated references or statistics appear in any Phase 3 content

---

## AC-022: No Formal Logic Notation Without Translation

**GIVEN** all Phase 3 content,
**WHEN** any mathematical or formal logic notation appears,
**THEN** it is immediately followed by a plain-language Korean translation.

**Verification method:** Search for formal notation symbols. Any occurrence must have adjacent Korean explanation.

---

## AC-023: Difficulty Level Appropriate

**GIVEN** all Phase 3 content,
**WHEN** the overall difficulty is assessed,
**THEN**:
- All frontmatter `difficulty` fields are set to "intermediate" (not "beginner")
- Content builds on Phase 2 vocabulary (classes, instances, properties, axioms) without re-explaining them
- New concepts (DL, OWA, reasoning) are explained from first principles with multiple analogies
- The content does NOT assume prior knowledge of formal logic, mathematics, or computer science theory

---

## AC-024: Phase Connection Coherence

**GIVEN** all Phase 3 content,
**WHEN** the forward and backward references are reviewed,
**THEN**:
- At least 3 back-references to Phase 2 concepts (classes, properties, axioms) exist across all sessions
- At least 5 forward references to Phase 4 (OWL language) exist across all sessions
- At least 2 forward references to Phase 5 (design methodology) exist across all sessions
- At least 1 forward reference to Phase 6 or Phase 7 (applications) exists
- No references to nonexistent phases or sessions

---

## Quality Gate Summary

| ID | Criterion | Priority | Verification |
|----|-----------|----------|-------------|
| AC-001 | 7 complete MDX files | MUST | File count + line count |
| AC-002 | Korean content, English terms defined | MUST | Manual review |
| AC-003 | 3+ "왜 필요한가?" per file | MUST | grep count |
| AC-004 | 1 Mermaid diagram per file, safe syntax, correct types | MUST | grep + render test |
| AC-005 | Zero JSX imports | MUST | grep check |
| AC-006 | 2+ "연결 포인트" per file | MUST | grep count |
| AC-007 | 1+ "흔한 오해" per file | MUST | grep count |
| AC-008 | Session 00 required content | MUST | Manual review |
| AC-009 | Session 01 DL content | MUST | Manual review |
| AC-010 | Session 02 OWA/CWA content | MUST | Manual review |
| AC-011 | Session 03 four reasoning types | MUST | Manual review |
| AC-012 | Session 04 reasoners and OWL | MUST | Manual review |
| AC-013 | Session 05 complexity and profiles | MUST | Manual review |
| AC-014 | Session 06 exercises and questions | MUST | Manual review |
| AC-015 | YAML frontmatter complete (difficulty: intermediate) | MUST | YAML validation |
| AC-016 | 300+ words per concept section | SHOULD | Approximate count |
| AC-017 | Problem-first narrative arc | SHOULD | Structural review |
| AC-018 | Build success (zero errors) | MUST | Build command |
| AC-019 | Navigation integrity | MUST | Browser navigation test |
| AC-020 | 2+ Korean industry analogies per session | SHOULD | Manual review |
| AC-021 | Academic accuracy | MUST | Technical review |
| AC-022 | No formal notation without translation | MUST | Manual review |
| AC-023 | Difficulty level appropriate (intermediate) | MUST | Frontmatter + content review |
| AC-024 | Phase connection coherence | SHOULD | Cross-reference check |

---

## Definition of Done

Phase 3 content generation is DONE when:

1. All 24 acceptance criteria above are verified (MUST criteria pass, SHOULD criteria are best-effort)
2. `bun run build` completes with zero errors
3. All 7 Phase 3 pages render correctly in a browser with:
   - Full Korean educational content (not skeleton placeholders)
   - Mermaid diagrams rendering as visual diagrams (especially the `stateDiagram-v2` in session 02)
   - No console errors related to MDX parsing
4. The 4 Phase 3 competency questions from the curriculum appear in `06-exercises.mdx` with guidance
5. Content follows the narrative arc established in `my-docs/edu-content.md`
6. Each session includes at minimum: 3 "왜 필요한가?" blockquotes, 2 "연결 포인트" callouts, 1 "흔한 오해" section, 1 Mermaid diagram
7. The OWA/CWA session (02) provides thorough treatment with comparison table, multiple examples, and explicit beginner trap warnings
8. The reasoning types session (03) covers all 4 types with dedicated sections and domain analogies
