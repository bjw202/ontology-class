---
id: SPEC-CONTENT-P2
version: "1.0.0"
status: draft
created: "2026-03-10"
updated: "2026-03-10"
author: jw
priority: high
---

# Acceptance Criteria: SPEC-CONTENT-P2 -- Phase 2 MDX Content Generation

## Overview

These acceptance criteria define the quality gates for Phase 2 content generation. Every criterion uses the Given-When-Then format. All criteria must pass for the SPEC to be considered complete.

---

## AC-001: Complete File Set

**GIVEN** the `content/phase-2/` directory,
**WHEN** all content generation tasks are complete,
**THEN** exactly 7 MDX files exist with fully written educational content (not skeleton placeholders):
- `00-introduction.mdx`
- `01-classes.mdx`
- `02-instances.mdx`
- `03-properties.mdx`
- `04-axioms.mdx`
- `05-hierarchy.mdx`
- `06-exercises.mdx`

**Verification method:** `ls content/phase-2/*.mdx | wc -l` returns 7. Each file contains more than 100 lines of content (not skeleton headers only).

---

## AC-002: Korean Content with English Technical Terms

**GIVEN** any Phase 2 MDX session file,
**WHEN** the content is reviewed,
**THEN** all explanatory text is written in Korean, and every English technical term is introduced on first use with a Korean definition in parentheses.

**Verification method:** Search for key terms. Each of the following must appear with Korean definition on first use:
- Class (클래스)
- Individual/Instance (인스턴스)
- Object Property (객체 속성)
- Data Property (데이터 속성)
- Axiom (공리)
- Existential Restriction (존재 제약)
- Functional Property (기능적 속성)
- Inverse Property (역속성)
- SubClassOf
- rdf:type
- Literal (리터럴)
- Knowledge Graph (지식 그래프)

**Negative check:** No block of 3+ consecutive sentences in English (code blocks, quotes, and comparison table headers excluded).

---

## AC-003: "왜 필요한가?" Blockquotes

**GIVEN** any Phase 2 MDX session file (00 through 06),
**WHEN** the blockquotes are counted,
**THEN** at least 3 instances of `> **왜 필요한가?**` appear in each file.

**Verification method:** For each file, run: `grep -c '왜 필요한가?' content/phase-2/XX-*.mdx` and confirm count >= 3.

---

## AC-004: Mermaid Diagrams

**GIVEN** any Phase 2 MDX session file,
**WHEN** the Mermaid diagrams are inspected,
**THEN** exactly 1 Mermaid code block exists per file, and the section heading preceding it contains "이번 세션 전체 그림".

### AC-004.1: Mermaid Safe Syntax

**GIVEN** any Mermaid code block in Phase 2 content,
**WHEN** the syntax is inspected,
**THEN** the diagram contains:
- No apostrophes (`'`) in node labels
- No `+` operator (if `stateDiagram-v2`)
- Double-quoted labels `["text"]` for labels with Korean characters or special characters

### AC-004.2: Correct Diagram Types

**GIVEN** all 7 Phase 2 MDX files,
**WHEN** the Mermaid diagram types are reviewed,
**THEN** the diagram types match:

| File | Expected Diagram Type |
|------|----------------------|
| 00-introduction.mdx | `graph TD` |
| 01-classes.mdx | `classDiagram` |
| 02-instances.mdx | `graph LR` |
| 03-properties.mdx | `graph TD` |
| 04-axioms.mdx | `graph TD` |
| 05-hierarchy.mdx | `graph TD` |
| 06-exercises.mdx | `graph TD` |

**Fallback:** If `classDiagram` causes rendering issues in Nextra, it is acceptable to replace with `graph TD` showing the same conceptual hierarchy. The diagram type in AC-004.2 is a recommendation, not a hard requirement, for `classDiagram` specifically.

### AC-004.3: Mermaid Render Verification

**GIVEN** the site running in development mode (`bun run dev`),
**WHEN** each Phase 2 page is loaded in a browser,
**THEN** each Mermaid diagram renders visually as a diagram (not as raw text or an error message).

---

## AC-005: No JSX Imports

**GIVEN** any Phase 2 MDX file,
**WHEN** the file is searched for import statements,
**THEN** zero `import` statements are found.

**Verification method:** `grep -c '^import' content/phase-2/*.mdx` returns 0 for every file.

---

## AC-006: "연결 포인트" Forward References

**GIVEN** any Phase 2 MDX session file (00 through 06),
**WHEN** the callouts are counted,
**THEN** at least 2 instances of `> **연결 포인트` appear in each file, and each references a valid future phase (Phase 3 through Phase 8).

**Verification method:** `grep -c '연결 포인트' content/phase-2/XX-*.mdx` >= 2 per file. Each referenced phase number is between 3 and 8.

---

## AC-007: "흔한 오해" Misconception Sections

**GIVEN** any Phase 2 MDX session file (00 through 06),
**WHEN** the misconception sections are counted,
**THEN** at least 1 instance of `> **흔한 오해**` followed by `> **실제로는**` appears in each file.

**Verification method:** `grep -c '흔한 오해' content/phase-2/XX-*.mdx` >= 1 per file.

---

## AC-008: Session 00 -- Introduction Content

**GIVEN** the file `content/phase-2/00-introduction.mdx`,
**WHEN** the content is reviewed,
**THEN** it contains:
- Phase 2 learning objective: "온톨로지를 구성하는 기본 재료를 읽고 쓸 수 있다"
- Explicit Phase 1 connection section explaining that Phase 1's communication failures were caused by undefined concepts and relationships
- Brief overview of all 6 content sessions (01-06)
- The 4 competency questions as a preview list
- A `graph TD` Mermaid diagram showing Phase 2 session roadmap
- At least 3 "왜 필요한가?" blockquotes
- At least 2 "연결 포인트" callouts referencing Phase 3 or later
- At least 1 "흔한 오해" section

---

## AC-009: Session 01 -- Classes

**GIVEN** the file `content/phase-2/01-classes.mdx`,
**WHEN** the content is rendered,
**THEN** it contains:
- Definition of class as a set of objects sharing common characteristics
- Concrete examples: 동물(Animal), 스마트폰(Smartphone), 레이저 공정(Laser Process) or equivalent Korean-relevant examples
- Emphasis that a class is a conceptual category, not a physical object
- iPhone 15 identified as NOT a class but an instance (preview of Session 02)
- Discussion of why class boundary design is critical for ontology quality
- A `classDiagram` Mermaid diagram (or `graph TD` fallback) showing example class hierarchy
- At least 300 words for each major concept section

---

## AC-010: Session 02 -- Instances

**GIVEN** the file `content/phase-2/02-instances.mdx`,
**WHEN** the content is rendered,
**THEN** it contains:
- Definition of instance as a concrete member of a class
- The class-as-mold, instance-as-product analogy (틀 vs 틀로 찍은 것)
- DB comparison (table = class, row = instance) with CRITICAL distinction stated
- Multiple class membership explanation with concrete examples:
  - "김철수" as Person AND Employee AND Parent AND Customer (or equivalent)
  - Manufacturing or technology dual-classification example
- A `graph LR` Mermaid diagram showing class-to-instance relationships with property values
- Explanation of how multiple class membership differs from relational databases

---

## AC-011: Session 03 -- Properties

**GIVEN** the file `content/phase-2/03-properties.mdx`,
**WHEN** the content is rendered,
**THEN** it contains:
- Object Property (객체 속성) section with:
  - Definition: connects concept to concept with direction
  - At least 2 examples (e.g., 제조공정 --사용하는재료--> 알루미늄, 직원 --소속된--> 부서)
  - Inverse property mention (e.g., 부서 --구성원을포함--> 직원)
  - Statement that object properties create "edges" of the knowledge graph
- Data Property (데이터 속성) section with:
  - Definition: attaches literal value to concept
  - Datatype notation examples (xsd:float, xsd:string, xsd:date)
  - At least 2 examples with datatype annotations
  - Statement that data properties add "labels" to nodes
- Graph visualization insight section explaining the structural difference
- A `graph TD` Mermaid diagram showing object properties as edges and data properties as labels

---

## AC-012: Session 04 -- Axioms

**GIVEN** the file `content/phase-2/04-axioms.mdx`,
**WHEN** the content is rendered,
**THEN** it contains:
- Existential Restriction (존재 제약) section with:
  - "모든 스마트폰은 반드시 제조사를 가진다" example (or equivalent)
  - Practical impact explanation (catches missing data)
- Functional Property (기능적 속성) section with:
  - "사람은 동시에 두 개의 주민등록번호를 가질 수 없다" example (or equivalent)
  - Distinction between functional and non-functional properties
- Inverse Property (역속성) section with:
  - "A가 B의 부모이면 B는 A의 자녀다" example (or equivalent)
  - Bi-directional reasoning benefit
- Core insight section explaining that axioms enable REASONING:
  - Without axioms: ontology is just taxonomy
  - With axioms: detection of inconsistencies, inference of new facts, completeness validation
  - Explicit callback to Phase 1's identification of reasoning as ontology's key differentiator
- A `graph TD` Mermaid diagram showing axiom types as constraints on a mini-ontology

---

## AC-013: Session 05 -- Hierarchy

**GIVEN** the file `content/phase-2/05-hierarchy.mdx`,
**WHEN** the content is rendered,
**THEN** it contains:
- Class hierarchy with inheritance example: at least 3-level hierarchy (e.g., 포유류 -> 개 -> 진돗개)
- Property inheritance explanation: subclass inherits parent properties
- SubClassOf vs rdf:type distinction:
  - SubClassOf: class-to-class relationship
  - rdf:type: instance-to-class relationship
  - Explanation of why confusing them causes problems
- Hierarchy depth recommendation (4-5 levels maximum)
- Comparison table with these columns (or equivalent): Relational DB, Ontology, Knowledge Graph
  - Table must include at least 5 comparison dimensions
  - Must cover: core unit, relationships, schema flexibility, reasoning capability, multiple typing
- A `graph TD` Mermaid diagram showing hierarchy with SubClassOf and rdf:type arrows distinguished

---

## AC-014: Session 06 -- Exercises and Competency Questions

**GIVEN** the file `content/phase-2/06-exercises.mdx`,
**WHEN** the content is rendered,
**THEN** it contains:

### Basic Exercises (기본 실습):
- Exercise 1: Domain modeling task -- identify 5 classes, 3 instances, 3 object properties, 2 data properties from a chosen domain
- Exercise 2: Class vs instance classification task with provided item list and answer key

### Challenge Exercises (도전 실습):
- Exercise 3: is-a (SubClassOf) vs has-a (Object Property) distinction with 2 examples each
- Exercise 4: Axiom design -- write 1 existential restriction and 1 functional property in natural language

### Competency Questions (핵심 질문):
All 4 Phase 2 competency questions from the SPEC are present with guidance:
1. "클래스와 인스턴스의 경계가 모호한 예시를 들고, 어떻게 결정하는지 설명하시오" with guidance pointing to Session 01
2. "객체 속성과 데이터 속성을 구분하는 기준은 무엇인가?" with guidance pointing to Session 03
3. "공리가 없으면 온톨로지는 무엇이 되는가?" with guidance pointing to Session 04
4. "SubClassOf와 rdf:type을 혼동하면 어떤 문제가 생기는가?" with guidance pointing to Session 05

### Self-Assessment Checklist:
At least 5 self-assessment items in Korean

### Concept Map:
A `graph TD` Mermaid diagram connecting all Phase 2 concepts (classes, instances, properties, axioms, hierarchy)

---

## AC-015: YAML Frontmatter

**GIVEN** any Phase 2 MDX file,
**WHEN** the frontmatter is inspected,
**THEN** it contains all required fields:
- `title`: Korean session title (string)
- `description`: Korean description for search (string, 50-100 characters)
- `difficulty`: "beginner" (string)

**Verification method:** Check each file starts with `---` followed by YAML block containing title, description, and difficulty fields, closed by `---`.

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

**GIVEN** all 7 Phase 2 MDX files are generated,
**WHEN** `bun run build` (or `npm run build`) is executed,
**THEN** the build completes with:
- Zero MDX parsing errors
- Zero Mermaid syntax errors
- Zero TypeScript errors
- All Phase 2 pages accessible in the built output

---

## AC-019: Navigation Integrity

**GIVEN** the site running in development mode,
**WHEN** the Phase 2 sidebar navigation is used,
**THEN** all 7 session links in the sidebar correctly navigate to the corresponding content page, and each page displays the full educational content (not skeleton placeholders).

---

## AC-020: Real-World Analogies

**GIVEN** content sessions 01 through 05,
**WHEN** the analogies and examples are counted,
**THEN** at least 2 real-world analogies from Korean-relevant industries appear in each session. Industries include:
- Manufacturing (smart factory, production lines, CNC machines, quality control)
- Healthcare (patient records, medical classification, insurance)
- E-commerce (product categories, search integration, recommendations)
- Technology (smartphones, software systems, devices)

---

## AC-021: Phase 1 Bridge

**GIVEN** all Phase 2 MDX files,
**WHEN** Phase 1 references are searched,
**THEN**:
- The introduction (00-introduction.mdx) contains an explicit section bridging Phase 1 to Phase 2
- At least 2 additional sessions (among 01-06) reference Phase 1 concepts
- References are accurate (e.g., Phase 1 covered interoperability, Gruber's definition, reasoning as key differentiator)

**Verification method:** Search for "Phase 1" across all Phase 2 files. At least 3 files must contain Phase 1 references.

---

## AC-022: Comparison Table Accuracy

**GIVEN** the file `content/phase-2/05-hierarchy.mdx`,
**WHEN** the comparison table is reviewed,
**THEN**:
- The table compares at least 3 paradigms: Relational Database, Ontology, and Knowledge Graph
- At least 5 comparison dimensions are covered
- Each cell contains factually accurate information
- The table does not claim ontology "replaces" databases (they complement each other)
- Multiple typing (one instance belonging to multiple classes) is correctly attributed to ontology and KG but not RDB

---

## AC-023: Conceptual Accuracy

**GIVEN** all Phase 2 content sessions,
**WHEN** reviewed for technical correctness,
**THEN**:
- Class/Instance distinction follows OWL/Description Logic semantics
- Object Property connects individuals to individuals (or classes in general axioms)
- Data Property connects individuals to literal values
- Axiom examples represent real OWL capabilities (existential restriction, functional property, inverse property)
- SubClassOf is correctly defined as class-to-class subsumption
- rdf:type is correctly defined as instance-to-class membership
- The comparison table features are factually correct per W3C standards

---

## AC-024: Exercises Completeness

**GIVEN** the file `content/phase-2/06-exercises.mdx`,
**WHEN** the exercises are reviewed,
**THEN**:
- At least 2 basic exercises (기본 실습) with clear task descriptions and guidance
- At least 2 challenge exercises (도전 실습) that build on basic exercises
- Exercise 1 requires identifying classes, instances, object properties, and data properties
- At least 1 exercise explicitly addresses is-a vs has-a distinction
- At least 1 exercise requires writing axiom constraints in natural language
- Answer keys or example formats are provided for basic exercises

---

## Quality Gate Summary

| ID | Criterion | Priority | Verification |
|----|-----------|----------|-------------|
| AC-001 | 7 complete MDX files | MUST | File count + line count |
| AC-002 | Korean content, English terms defined | MUST | Manual review |
| AC-003 | 3+ "왜 필요한가?" per file | MUST | grep count |
| AC-004 | 1 Mermaid diagram per file, safe syntax | MUST | grep + render test |
| AC-005 | Zero JSX imports | MUST | grep check |
| AC-006 | 2+ "연결 포인트" per file (Phase 3-8) | MUST | grep count |
| AC-007 | 1+ "흔한 오해" per file | MUST | grep count |
| AC-008 | Session 00 required content | MUST | Manual review |
| AC-009 | Session 01 classes content | MUST | Manual review |
| AC-010 | Session 02 instances content | MUST | Manual review |
| AC-011 | Session 03 properties content | MUST | Manual review |
| AC-012 | Session 04 axioms content | MUST | Manual review |
| AC-013 | Session 05 hierarchy content | MUST | Manual review |
| AC-014 | Session 06 exercises and questions | MUST | Manual review |
| AC-015 | YAML frontmatter complete | MUST | YAML validation |
| AC-016 | 300+ words per concept section | SHOULD | Approximate count |
| AC-017 | Problem-first narrative arc | SHOULD | Structural review |
| AC-018 | Build success (zero errors) | MUST | Build command |
| AC-019 | Navigation integrity | MUST | Browser navigation test |
| AC-020 | 2+ Korean industry analogies per session | SHOULD | Manual review |
| AC-021 | Phase 1 bridge in 3+ files | MUST | grep for "Phase 1" |
| AC-022 | Comparison table accuracy | MUST | Manual review |
| AC-023 | Conceptual accuracy (OWL/W3C) | MUST | Expert review |
| AC-024 | Exercises completeness | MUST | Manual review |

---

## Definition of Done

Phase 2 content generation is DONE when:

1. All 24 acceptance criteria above are verified (MUST criteria pass, SHOULD criteria are best-effort)
2. `bun run build` completes with zero errors
3. All 7 Phase 2 pages render correctly in a browser with:
   - Full Korean educational content (not skeleton placeholders)
   - Mermaid diagrams rendering as visual diagrams
   - No console errors related to MDX parsing
4. The 4 Phase 2 competency questions appear in `06-exercises.mdx` with guidance
5. The Phase 1 bridge is clearly established in the introduction and at least 2 other sessions
6. The comparison table (DB vs Ontology vs Knowledge Graph) is present in `05-hierarchy.mdx`
7. Content follows the building-block progression: classes -> instances -> properties -> axioms -> hierarchy
8. Content follows the narrative arc established in `my-docs/edu-content.md` Phase 2 section
