---
id: SPEC-CONTENT-P8
version: "1.0.0"
status: draft
created: "2026-03-10"
updated: "2026-03-10"
author: jw
priority: high
---

# Acceptance Criteria: SPEC-CONTENT-P8 -- Phase 8 MDX Content Generation

## Overview

These acceptance criteria define the quality gates for Phase 8 content generation. Every criterion uses the Given-When-Then format. All criteria must pass for the SPEC to be considered complete.

Phase 8 has heightened quality requirements for two special elements:
- **05-decision-tree.mdx**: Contains the centerpiece Mermaid flowchart of the course
- **07-exercises.mdx**: Serves as the comprehensive course conclusion across all 8 phases

---

## AC-001: Complete File Set

**GIVEN** the `content/phase-8/` directory,
**WHEN** all content generation tasks are complete,
**THEN** exactly 8 MDX files exist with fully written educational content (not skeleton placeholders):
- `00-introduction.mdx`
- `01-cost-reality.mdx`
- `02-mapping-problems.mdx`
- `03-vector-embeddings.mdx`
- `04-comparison.mdx`
- `05-decision-tree.mdx`
- `06-when-not-to-use.mdx`
- `07-exercises.mdx`

**Verification method:** `ls content/phase-8/*.mdx | wc -l` returns 8. Each file contains more than 80 lines of content (not skeleton headers only).

---

## AC-002: Korean Content with English Technical Terms

**GIVEN** any Phase 8 MDX session file,
**WHEN** the content is reviewed,
**THEN** all explanatory text is written in Korean, and every English technical term is introduced on first use with a Korean definition in parentheses.

**Verification method:** Search for key terms. Each of the following must appear with Korean definition on first use:
- Vector Embedding (벡터 임베딩)
- Property Graph (속성 그래프)
- Neurosymbolic AI (뉴로심볼릭 AI)
- Ontology Mapping (온톨로지 매핑)
- Open World Assumption (열린 세계 가정)
- Closed World Assumption (닫힌 세계 가정)
- SKOS (Simple Knowledge Organization System)

**Negative check:** No block of 3+ consecutive sentences in English (code blocks and quotes excluded).

---

## AC-003: "왜 필요한가?" Blockquotes

**GIVEN** any Phase 8 MDX session file (00 through 07),
**WHEN** the blockquotes are counted,
**THEN** at least 3 instances of `> **왜 필요한가?**` appear in each file.

**Verification method:** For each file, run: `grep -c '왜 필요한가?' content/phase-8/XX-*.mdx` and confirm count >= 3.

---

## AC-004: Mermaid Diagrams

**GIVEN** any Phase 8 MDX session file,
**WHEN** the Mermaid diagrams are inspected,
**THEN** exactly 1 Mermaid code block exists per file, and the section heading preceding it contains "이번 세션 전체 그림".

### AC-004.1: Mermaid Safe Syntax

**GIVEN** any Mermaid code block in Phase 8 content,
**WHEN** the syntax is inspected,
**THEN** the diagram contains:
- No apostrophes (`'`) in node labels
- No `+` operator (if `stateDiagram-v2`)
- Double-quoted labels `["text"]` for labels with Korean characters

### AC-004.2: Correct Diagram Types

**GIVEN** all 8 Phase 8 MDX files,
**WHEN** the Mermaid diagram types are reviewed,
**THEN** the diagram types match:

| File | Expected Diagram Type |
|------|----------------------|
| 00-introduction.mdx | `graph TD` |
| 01-cost-reality.mdx | `graph LR` |
| 02-mapping-problems.mdx | `graph TD` |
| 03-vector-embeddings.mdx | `graph LR` |
| 04-comparison.mdx | `graph TD` |
| 05-decision-tree.mdx | `flowchart TD` |
| 06-when-not-to-use.mdx | `graph LR` |
| 07-exercises.mdx | `graph TD` |

### AC-004.3: Mermaid Render Verification

**GIVEN** the site running in development mode (`bun run dev`),
**WHEN** each Phase 8 page is loaded in a browser,
**THEN** each Mermaid diagram renders visually as a diagram (not as raw text or an error message).

### AC-004.4: Decision Tree Flowchart Quality

**GIVEN** the file `content/phase-8/05-decision-tree.mdx`,
**WHEN** the Mermaid flowchart is reviewed,
**THEN** the diagram:
- Uses `flowchart TD` (not `graph TD`)
- Contains decision diamond shapes for yes/no questions using `{"text"}` syntax
- Contains rectangle shapes for outcome recommendations using `["text"]` syntax
- Has edge labels for Yes/No paths
- Covers ALL decision paths from the curriculum decision tree:
  - Root: "추론이 필요한가?"
  - No -> "그래프 탐색/분석이 주목적인가?" -> Yes: Property Graph / No: "계층 구조만 필요한가?" -> Yes: RDFS/SKOS / No: 관계형 DB/JSON
  - Yes -> "도메인 표준 온톨로지가 있는가?" -> Yes: 재사용 + 확장 / No: 직접 설계
- Has all node labels in Korean
- Renders as a clean, readable flowchart without visual overlap

---

## AC-005: No JSX Imports

**GIVEN** any Phase 8 MDX file,
**WHEN** the file is searched for import statements,
**THEN** zero `import` statements are found.

**Verification method:** `grep -c '^import' content/phase-8/*.mdx` returns 0 for every file.

---

## AC-006: "연결 포인트" Back-References

**GIVEN** any Phase 8 MDX session file (00 through 07),
**WHEN** the callouts are counted,
**THEN** at least 2 instances of `> **연결 포인트` appear in each file, and each references a valid earlier phase (Phase 1 through Phase 7).

**Verification method:** `grep -c '연결 포인트' content/phase-8/XX-*.mdx` >= 2 per file. Each referenced phase number is between 1 and 7 (back-references only, since Phase 8 is the final phase).

---

## AC-007: "흔한 오해" Misconception Sections

**GIVEN** any Phase 8 MDX session file (00 through 07),
**WHEN** the misconception sections are counted,
**THEN** at least 1 instance of `> **흔한 오해**` followed by `> **실제로는**` appears in each file.

**Verification method:** `grep -c '흔한 오해' content/phase-8/XX-*.mdx` >= 1 per file.

---

## AC-008: Session 00 -- Introduction Content

**GIVEN** the file `content/phase-8/00-introduction.mdx`,
**WHEN** the content is reviewed,
**THEN** it contains:
- Phase 8 learning objective: "온톨로지를 맹목적으로 쓰지 않고, 적재적소에 선택할 수 있는 판단력을 갖는다"
- Phase 7 connection statement: "응용을 알았다면, 언제 쓰지 말아야 하는지도 알아야 진짜 실력이다"
- Brief overview of all 7 content sessions (01-07)
- The 3 course comprehensive questions as a preview list
- A `graph TD` Mermaid diagram showing Phase 8 session roadmap
- At least 3 "왜 필요한가?" blockquotes
- At least 2 "연결 포인트" callouts (back-references)
- At least 1 "흔한 오해" section

---

## AC-009: Session 01 -- Cost Reality

**GIVEN** the file `content/phase-8/01-cost-reality.mdx`,
**WHEN** the content is rendered,
**THEN** it contains:
- Human resource cost section: domain expert + ontology engineer collaboration challenges
- Maintenance cost section: explanation that maintenance exceeds initial construction difficulty
- Performance cost section: large-scale reasoning degradation, SNOMED CT impracticality for real-time reasoning
- OWL profiles (EL, QL, RL) mentioned as pragmatic compromises
- Pre-assessment principle: "Before concluding you need an ontology, assess maintenance sustainability"
- A `graph LR` Mermaid diagram showing cost factor flow
- Each major section at least 300 words

---

## AC-010: Session 02 -- Mapping Problems

**GIVEN** the file `content/phase-8/02-mapping-problems.mdx`,
**WHEN** the content is rendered,
**THEN** it contains:
- Ontology mapping definition with real-world healthcare context
- Automated mapping tools mentioned: LogMap and AgreementMakerLight
- Description of how automated mapping tools work (string matching, structural analysis)
- Accuracy limitations of automated tools explained
- The "turtles all the way down" recursion problem (mapping requires meta-ontology, which requires alignment, ad infinitum)
- Standard ontology reuse principle as the solution
- Reference to Phase 6 standard ontologies as prevention
- A `graph TD` Mermaid diagram showing mapping complexity and recursion

---

## AC-011: Session 03 -- Vector Embeddings Comparison

**GIVEN** the file `content/phase-8/03-vector-embeddings.mdx`,
**WHEN** the content is rendered,
**THEN** it contains:
- A comparison table with at least 5 dimensions:
  - Meaning representation (explicit rules vs. statistical distributions)
  - Reasoning capability (logical reasoning vs. similarity computation)
  - Construction cost (high manual vs. low automatic)
  - Explainability (high vs. low)
  - Adding new concepts (manual vs. retraining)
- Ontology strengths section (300+ words) covering reasoning and explainability
- Vector embedding strengths section (300+ words) covering automatic learning and scalability
- Complementary relationship section mentioning Neurosymbolic AI
- Statement: ontology and embeddings are complementary, not competitors
- A `graph LR` Mermaid diagram showing parallel paths converging at Neurosymbolic AI

---

## AC-012: Session 04 -- Comprehensive Comparison

**GIVEN** the file `content/phase-8/04-comparison.mdx`,
**WHEN** the content is rendered,
**THEN** it contains:
- Ontology vs Property Graph (Neo4j) comparison (300+ words):
  - Property Graph strengths: traversal, analytics (shortest path, cycle detection)
  - OWA vs CWA distinction
- Ontology vs Relational Database comparison (300+ words):
  - When tabular data is sufficient
  - When reasoning adds value
- Ontology vs SKOS/RDFS comparison (300+ words):
  - SKOS for taxonomies and controlled vocabularies
  - RDFS for lightweight hierarchies
  - Decision criterion: axioms and reasoning needed?
- Comprehensive comparison table with rows for OWL, Property Graph, RDBMS, SKOS, RDFS
- A `graph TD` Mermaid diagram showing technologies with strengths

---

## AC-013: Session 05 -- Decision Tree (Centerpiece)

**GIVEN** the file `content/phase-8/05-decision-tree.mdx`,
**WHEN** the content is rendered,
**THEN** it contains:

### AC-013.1: Decision Tree Logic
The complete decision tree covering:
- Root question: "추론이 필요한가?"
- No-reasoning path: graph traversal -> Property Graph; hierarchy only -> RDFS/SKOS; neither -> RDBMS/JSON
- Reasoning path: standard exists -> reuse + extend (OWL DL); no standard -> build from scratch (OWL DL)

### AC-013.2: Mermaid Flowchart
- `flowchart TD` diagram implementing the complete decision tree
- Decision diamonds and outcome rectangles
- Korean labels on all nodes
- Edge labels for Yes/No

### AC-013.3: Node Explanations
Explanatory text for each decision node:
- What qualifies as "reasoning" (deriving facts, consistency checking, classification)
- Difference between graph traversal and reasoning
- When hierarchy-only suffices
- How to assess if a standard ontology exists

### AC-013.4: Real-World Examples
At least 4 real-world examples mapped through the decision tree:
- One choosing Property Graph
- One choosing SKOS/RDFS
- One choosing ontology reuse + extend
- One choosing ontology build from scratch OR relational DB

---

## AC-014: Session 06 -- When Not to Use Ontology

**GIVEN** the file `content/phase-8/06-when-not-to-use.mdx`,
**WHEN** the content is rendered,
**THEN** it contains exactly 4 concrete scenarios:

### Scenario 1: JSON-LD for SEO
- JSON-LD with Schema.org identified as sufficient
- No need for OWL, reasoning, or design methodology
- E-commerce structured data example

### Scenario 2: Property Graph for Graph Analytics
- Neo4j or similar graph DB identified as appropriate
- Fraud detection, recommendation, social network analysis context
- OWL reasoning described as unnecessary overhead

### Scenario 3: Relational DB for Structured Tabular Data
- RDBMS identified as simpler and faster for stable schemas
- Inventory, accounts, transactions as examples
- Ontology described as adding no value for simple relationships

### Scenario 4: RDFS/SKOS for Simple Classification
- SKOS for broader/narrower relationships
- RDFS for lightweight hierarchy
- Government document classification or similar example

### Summary Principle
The statement: "The best tool is the simplest one that solves the problem" or Korean equivalent.

A `graph LR` Mermaid diagram showing four scenarios pointing to appropriate solutions.

---

## AC-015: Session 07 -- Exercises and Course Conclusion

**GIVEN** the file `content/phase-8/07-exercises.mdx`,
**WHEN** the content is rendered,
**THEN** it contains:

### Basic Exercise (기본 실습):
- Exercise 1: Decision tree application to 3 familiar projects/problems
- Structured answer template provided
- Clear task description with guidance

### Challenge Exercise (도전 실습):
- Exercise 2: Practical comparison using Neo4j and Protege on the same domain
- Guidance on comparing expressiveness and query capabilities
- Suggested domains provided

### Course Comprehensive Questions (코스 종합 핵심 질문 3개):
All 3 course comprehensive questions present with guidance:
1. "온톨로지가 반드시 필요한 상황과 다른 기술로 충분한 상황을 구분하는 핵심 기준은 무엇인가?" with guidance referencing the decision tree
2. "온톨로지와 벡터 임베딩의 근본적 차이는 무엇이고, 둘을 함께 쓰면 어떤 이점이 있는가?" with guidance referencing session 03
3. "8개 Phase를 통해 배운 온톨로지의 전체 여정을 한 문단으로 요약할 수 있는가?" with guidance spanning all 8 phases

### Course Completion Self-Assessment Checklist:
- At least 8 self-assessment items, one per phase minimum
- Each item specifies a measurable competency in Korean
- Items accurately represent each phase's core learning outcome

### 8-Phase Concept Map:
A `graph TD` Mermaid diagram connecting all 8 phases of the course with Korean labels

### Recommended Resources:
At least 4 categories of recommended resources:
- Beginner (입문)
- Intermediate (중급)
- LLM integration (LLM 연계)
- Practice environments (실습 환경)

### Course Completion Message:
- Congratulatory and encouraging tone
- Acknowledgment of learner's effort
- Call to practical application
- Invitation to revisit phases as reference

---

## AC-016: YAML Frontmatter

**GIVEN** any Phase 8 MDX file,
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
**THEN** each major concept follows the "situation -> reality check -> alternative -> decision criterion" narrative arc:
1. A situation where ontology seems appropriate is described
2. The reality check (cost, complexity, limitation) is presented
3. A simpler or more appropriate alternative is introduced
4. A clear decision criterion is provided for choosing between them

**Verification method:** For each major concept heading, confirm that the narrative progresses from situation through reality check to alternative, not jumping directly to conclusions.

---

## AC-019: Build Success

**GIVEN** all 8 Phase 8 MDX files are generated,
**WHEN** `bun run build` (or `npm run build`) is executed,
**THEN** the build completes with:
- Zero MDX parsing errors
- Zero Mermaid syntax errors
- Zero TypeScript errors
- All Phase 8 pages accessible in the built output

---

## AC-020: Navigation Integrity

**GIVEN** the site running in development mode,
**WHEN** the Phase 8 sidebar navigation is used,
**THEN** all 8 session links in the sidebar correctly navigate to the corresponding content page, and each page displays the full educational content (not skeleton placeholders).

---

## AC-021: Back-Reference Accuracy

**GIVEN** all "연결 포인트" callouts in Phase 8 content,
**WHEN** the referenced phase numbers are reviewed,
**THEN** every referenced phase number is between 1 and 7 (no forward references, since Phase 8 is the final phase), and the content topic attributed to each phase is accurate:
- Phase 1 references relate to motivation, data/information/knowledge, or Gruber's definition
- Phase 2 references relate to building blocks (classes, instances, properties, axioms)
- Phase 3 references relate to reasoning, Description Logic
- Phase 4 references relate to RDF, RDFS, OWL, SPARQL standards
- Phase 5 references relate to design methodology (METHONTOLOGY, competency questions)
- Phase 6 references relate to standard ontologies (FOAF, Schema.org, Gene Ontology, SNOMED CT)
- Phase 7 references relate to applications (Knowledge Graphs, manufacturing, LLM era)

---

## AC-022: Technical Accuracy

**GIVEN** all Phase 8 content files,
**WHEN** technical claims are reviewed,
**THEN**:
- Vector embedding comparison accurately describes both ontology and embedding capabilities
- Property Graph (Neo4j) is correctly characterized as optimized for traversal/analytics, not logical reasoning
- OWL profiles (EL, QL, RL) are correctly described as expressiveness/performance trade-offs
- SKOS is correctly identified as a W3C standard for taxonomy/thesaurus representation
- RDFS is correctly distinguished from OWL as a lighter-weight schema language
- LogMap and AgreementMakerLight are correctly identified as ontology matching/mapping tools
- Neurosymbolic AI is presented as an active research direction, not a production-ready technology
- OWA (Open World Assumption) and CWA (Closed World Assumption) are correctly distinguished
- SNOMED CT reasoning performance limitations are accurately described

---

## AC-023: Course Conclusion Completeness

**GIVEN** the file `content/phase-8/07-exercises.mdx`,
**WHEN** the course conclusion elements are reviewed,
**THEN** the session provides:
- A satisfying emotional conclusion (not just dry summary)
- All 8 phases referenced in the self-assessment checklist
- At least 4 categories of recommended resources
- A concept map connecting all 8 phases
- Encouragement for practical application
- A sense of accomplishment for completing the course

---

## AC-024: Real-World Analogies and Korean Context

**GIVEN** content sessions 01 through 06,
**WHEN** the analogies and examples are counted,
**THEN** at least 2 real-world analogies or examples from Korean-relevant contexts appear in each session. Contexts include:
- Manufacturing (smart factory, production lines, quality control, ISA-95)
- Healthcare (EMR, SNOMED CT, 건강보험심사평가원, insurance claims)
- E-commerce (product catalogs, structured data, search integration)
- Fintech (fraud detection, Neo4j graph analytics)
- Government (document classification, standards)

---

## Quality Gate Summary

| ID | Criterion | Priority | Verification |
|----|-----------|----------|-------------|
| AC-001 | 8 complete MDX files | MUST | File count + line count |
| AC-002 | Korean content, English terms defined | MUST | Manual review |
| AC-003 | 3+ "왜 필요한가?" per file | MUST | grep count |
| AC-004 | 1 Mermaid diagram per file, safe syntax, correct types | MUST | grep + render test |
| AC-005 | Zero JSX imports | MUST | grep check |
| AC-006 | 2+ "연결 포인트" per file (back-references) | MUST | grep count |
| AC-007 | 1+ "흔한 오해" per file | MUST | grep count |
| AC-008 | Session 00 required content | MUST | Manual review |
| AC-009 | Session 01 cost reality content | MUST | Manual review |
| AC-010 | Session 02 mapping problems content | MUST | Manual review |
| AC-011 | Session 03 vector embeddings comparison | MUST | Manual review |
| AC-012 | Session 04 comprehensive comparison | MUST | Manual review |
| AC-013 | Session 05 decision tree (centerpiece) | MUST | Flowchart validation |
| AC-014 | Session 06 when-not-to-use scenarios | MUST | Manual review |
| AC-015 | Session 07 exercises + course conclusion | MUST | Manual review |
| AC-016 | YAML frontmatter complete (difficulty: intermediate) | MUST | YAML validation |
| AC-017 | 300+ words per concept section | SHOULD | Approximate count |
| AC-018 | Situation-reality-alternative narrative arc | SHOULD | Structural review |
| AC-019 | Build success (zero errors) | MUST | Build command |
| AC-020 | Navigation integrity | MUST | Browser navigation test |
| AC-021 | Back-reference accuracy (Phase 1-7 only) | MUST | Cross-reference check |
| AC-022 | Technical accuracy | MUST | Expert review |
| AC-023 | Course conclusion completeness | MUST | Checklist review |
| AC-024 | 2+ Korean context examples per session | SHOULD | Manual review |

---

## Definition of Done

Phase 8 content generation is DONE when:

1. All 24 acceptance criteria above are verified (MUST criteria pass, SHOULD criteria are best-effort)
2. `bun run build` completes with zero errors
3. All 8 Phase 8 pages render correctly in a browser with:
   - Full Korean educational content (not skeleton placeholders)
   - Mermaid diagrams rendering as visual diagrams
   - No console errors related to MDX parsing
4. The decision tree flowchart in 05-decision-tree.mdx renders as a clean, readable flowchart with proper decision diamonds
5. The 3 course comprehensive questions appear in 07-exercises.mdx with guidance
6. The 8-Phase self-assessment checklist in 07-exercises.mdx covers all phases
7. The recommended resources section contains at least 4 categories
8. The course completion message achieves a satisfying, encouraging tone
9. All back-references accurately point to Phases 1-7 with correct topic attributions
10. Content follows the curriculum defined in the edu-content document
