---
id: SPEC-CONTENT-P4
version: "1.0.0"
status: draft
created: "2026-03-10"
updated: "2026-03-10"
author: jw
priority: high
---

# Acceptance Criteria: SPEC-CONTENT-P4 -- Phase 4 MDX Content Generation

## Overview

These acceptance criteria define the quality gates for Phase 4 content generation. Every criterion uses the Given-When-Then format. All criteria must pass for the SPEC to be considered complete.

---

## AC-001: Complete File Set

**GIVEN** the `content/phase-4/` directory,
**WHEN** all content generation tasks are complete,
**THEN** exactly 8 MDX files exist with fully written educational content (not skeleton placeholders):
- `00-introduction.mdx`
- `01-rdf.mdx`
- `02-rdfs.mdx`
- `03-owl.mdx`
- `04-sparql.mdx`
- `05-serialization.mdx`
- `06-tools-software.mdx`
- `07-exercises.mdx`

**Verification method:** `ls content/phase-4/*.mdx | wc -l` returns 8. Each file contains more than 100 lines of content (not skeleton headers only).

---

## AC-002: Korean Content with English Technical Terms

**GIVEN** any Phase 4 MDX session file,
**WHEN** the content is reviewed,
**THEN** all explanatory text is written in Korean, and every English technical term is introduced on first use with a Korean definition in parentheses.

**Verification method:** Search for key terms. Each of the following must appear with Korean definition on first use:
- Triple (트리플)
- URI (Uniform Resource Identifier)
- Subject (주어), Predicate (술어), Object (목적어)
- Knowledge Graph (지식 그래프)
- Serialization (직렬화)
- Triplestore (트리플스토어)
- SPARQL Endpoint (SPARQL 엔드포인트)
- Description Logic (기술 논리)
- Profile (프로파일) -- in OWL 2 context

**Negative check:** No block of 3+ consecutive sentences in English (code blocks and quotes excluded).

---

## AC-003: "왜 필요한가?" Blockquotes

**GIVEN** any Phase 4 MDX session file (00 through 07),
**WHEN** the blockquotes are counted,
**THEN** at least 3 instances of `> **왜 필요한가?**` appear in each file.

**Verification method:** For each file, run: `grep -c '왜 필요한가?' content/phase-4/XX-*.mdx` and confirm count >= 3.

---

## AC-004: Mermaid Diagrams

**GIVEN** any Phase 4 MDX session file,
**WHEN** the Mermaid diagrams are inspected,
**THEN** exactly 1 Mermaid code block exists per file, and the section heading preceding it contains "이번 세션 전체 그림".

### AC-004.1: Mermaid Safe Syntax

**GIVEN** any Mermaid code block in Phase 4 content,
**WHEN** the syntax is inspected,
**THEN** the diagram contains:
- No apostrophes (`'`) in node labels
- No `+` operator (if `stateDiagram-v2`)
- Double-quoted labels `["text"]` for labels with Korean characters

### AC-004.2: Correct Diagram Types

**GIVEN** all 8 Phase 4 MDX files,
**WHEN** the Mermaid diagram types are reviewed,
**THEN** the diagram types match:

| File | Expected Diagram Type |
|------|----------------------|
| 00-introduction.mdx | `graph TD` |
| 01-rdf.mdx | `graph LR` |
| 02-rdfs.mdx | `graph TD` |
| 03-owl.mdx | `graph TD` |
| 04-sparql.mdx | `graph LR` |
| 05-serialization.mdx | `graph LR` |
| 06-tools-software.mdx | `graph TD` |
| 07-exercises.mdx | `graph TD` |

### AC-004.3: Mermaid Render Verification

**GIVEN** the site running in development mode (`bun run dev`),
**WHEN** each Phase 4 page is loaded in a browser,
**THEN** each Mermaid diagram renders visually as a diagram (not as raw text or an error message).

---

## AC-005: No JSX Imports

**GIVEN** any Phase 4 MDX file,
**WHEN** the file is searched for import statements,
**THEN** zero `import` statements are found.

**Verification method:** `grep -c '^import' content/phase-4/*.mdx` returns 0 for every file.

---

## AC-006: "연결 포인트" Forward References

**GIVEN** any Phase 4 MDX session file (00 through 07),
**WHEN** the callouts are counted,
**THEN** at least 2 instances of `> **연결 포인트` appear in each file, and each references a valid phase (Phase 1 through Phase 8).

**Verification method:** `grep -c '연결 포인트' content/phase-4/XX-*.mdx` >= 2 per file. Each referenced phase number is between 1 and 8.

---

## AC-007: "흔한 오해" Misconception Sections

**GIVEN** any Phase 4 MDX session file (00 through 07),
**WHEN** the misconception sections are counted,
**THEN** at least 1 instance of `> **흔한 오해**` followed by `> **실제로는**` appears in each file.

**Verification method:** `grep -c '흔한 오해' content/phase-4/XX-*.mdx` >= 1 per file.

---

## AC-008: Session 00 -- Introduction Content

**GIVEN** the file `content/phase-4/00-introduction.mdx`,
**WHEN** the content is reviewed,
**THEN** it contains:
- Phase 4 learning objective: "온톨로지 관련 표준 스택을 보고 무엇이 무엇인지 구분하고 선택할 수 있다"
- Phase 3 connection: reference to reasoning knowledge from Phase 3
- Brief overview of all 7 content sessions (01-07)
- The 4 competency questions as a preview list
- A `graph TD` Mermaid diagram showing the RDF->RDFS->OWL layer stack
- At least 3 "왜 필요한가?" blockquotes
- At least 2 "연결 포인트" callouts
- At least 1 "흔한 오해" section

---

## AC-009: Session 01 -- RDF Triples

**GIVEN** the file `content/phase-4/01-rdf.mdx`,
**WHEN** the content is rendered,
**THEN** it contains:
- Subject-Predicate-Object triple structure explanation with examples
- Examples including `<iPhone15> <제조사> <Apple>` and `<Apple> <설립연도> "1976"` (or equivalent)
- URI concept explanation with namespace prefixes
- Graph structure explanation (triples form a directed graph)
- RDF limitations (no reasoning capability alone)
- At least one Turtle code block with annotated Korean comments
- A `graph LR` Mermaid diagram visualizing RDF triples as a graph
- At least 300 words for each major concept section

---

## AC-010: Session 02 -- RDFS Hierarchy

**GIVEN** the file `content/phase-4/02-rdfs.mdx`,
**WHEN** the content is rendered,
**THEN** it contains:
- `rdfs:subClassOf` explanation with Turtle code example
- `rdfs:subPropertyOf` explanation
- `rdfs:domain` and `rdfs:range` explanation with examples
- Class hierarchy example (e.g., Animal -> Mammal -> Dog or equivalent)
- RDFS limitations compared to OWL (no disjointness, no cardinality)
- Decision guide: when RDFS is sufficient vs. when OWL is needed
- A `graph TD` Mermaid diagram showing RDFS hierarchy
- Turtle code blocks with Korean annotations

---

## AC-011: Session 03 -- OWL

**GIVEN** the file `content/phase-4/03-owl.mdx`,
**WHEN** the content is rendered,
**THEN** it contains:
- OWL overview as W3C standard based on Description Logic
- OWL Lite description with reasoning cost note
- OWL DL description: complete reasoning, decidable, most used in practice
- OWL Full description: maximum expressivity, no reasoning guarantee
- OWL 2 profiles (EL, QL, RL) with use cases for each
- Selection criteria decision table or guide
- OWL syntax examples in Turtle with Korean annotations
- A `graph TD` Mermaid diagram showing OWL layer stack with OWL 2 profiles branching
- The statement that OWL DL is preferred in practice due to decidability

---

## AC-012: Session 04 -- SPARQL

**GIVEN** the file `content/phase-4/04-sparql.mdx`,
**WHEN** the content is rendered,
**THEN** it contains:
- Basic SPARQL SELECT query structure with triple pattern matching
- The example: `SELECT ?x WHERE { ?x rdf:type :스마트폰 . ?x :제조사 :Apple }`
- All 4 SPARQL query types described (SELECT, CONSTRUCT, ASK, DESCRIBE)
- SPARQL 1.1 features: aggregation, FILTER, OPTIONAL, subqueries, SPARQL Update
- SPARQL Endpoint concept with DBpedia and Wikidata (https://query.wikidata.org) mentioned
- At least 3 complete SPARQL code blocks with Korean annotations
- A `graph LR` Mermaid diagram showing query flow
- The statement: "SPARQL을 모르면 온톨로지를 '읽기 전용'으로밖에 쓸 수 없다"

---

## AC-013: Session 05 -- Serialization Formats

**GIVEN** the file `content/phase-4/05-serialization.mdx`,
**WHEN** the content is rendered,
**THEN** it contains:
- Core insight: "형식은 다르지만 표현하는 정보는 동일하다"
- Turtle (.ttl) description with code example
- JSON-LD description with code example including `@context`
- RDF/XML description with code example
- N-Triples description with code example
- All 4 code examples represent the SAME set of triples (verifiable by manual comparison)
- Comparison table with rows for each format and columns for readability, machine processing, file size, use case
- A `graph LR` Mermaid diagram showing formats converging to same information
- Recommendation: start learning with Turtle

---

## AC-014: Session 06 -- Tools and Software

**GIVEN** the file `content/phase-4/06-tools-software.mdx`,
**WHEN** the content is rendered,
**THEN** it contains:
- Protege description: free, Stanford, GUI, built-in reasoner, visualization
- Apache Jena description: Java-based, components (API, ARQ, TDB, Fuseki)
- RDFLib description: Python-based, with a Python code example
- Triplestores description: GraphDB, Stardog, Blazegraph mentioned
- Recommended learning path: Protege -> RDFLib -> Triplestore with rationale
- A `graph TD` Mermaid diagram showing the learning path
- At least one Python code block (RDFLib example) with Korean comments

---

## AC-015: Session 07 -- Exercises and Competency Questions

**GIVEN** the file `content/phase-4/07-exercises.mdx`,
**WHEN** the content is rendered,
**THEN** it contains:

### Basic Exercises (기본 실습):
- Exercise 1: Turtle triple writing task (10 triples from learner's domain) with guidance and template
- Exercise 2: RDFLib + SPARQL practice with Python code template and 3 queries

### Challenge Exercise (도전 실습):
- Exercise 3: Wikidata SPARQL Endpoint (https://query.wikidata.org) with 2 ready-to-run queries and step-by-step instructions

### Competency Questions (핵심 질문):
All 4 Phase 4 competency questions from the curriculum are present with guidance:
1. "RDF, RDFS, OWL의 관계를 '층을 쌓는' 방식으로 설명하라." with guidance pointing to Sessions 01-03
2. "OWL DL과 OWL Full 중 실무에서 OWL DL을 선호하는 이유는 무엇인가?" with guidance pointing to Session 03
3. "SPARQL에서 `?x rdf:type :스마트폰`은 무엇을 의미하는가?" with guidance pointing to Session 04
4. "JSON-LD가 웹 개발자들에게 선호되는 이유는 무엇인가?" with guidance pointing to Session 05

### Self-Assessment Checklist:
At least 5 self-assessment items in Korean

### Concept Map:
A `graph TD` Mermaid diagram connecting all Phase 4 concepts

---

## AC-016: YAML Frontmatter

**GIVEN** any Phase 4 MDX file,
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

**Guidance:** Each section should have at least 3 substantial paragraphs with code examples and analogies. Sections with only 1-2 sentences fail this criterion.

---

## AC-018: Narrative Arc

**GIVEN** any content session file (01 through 06),
**WHEN** the content structure is reviewed,
**THEN** each major concept follows the "problem first, solution second" narrative arc:
1. The limitation or problem is described BEFORE the standard/language is introduced
2. The standard/language is presented as a response to the problem
3. Practical impact is explained with code examples

**Verification method:** For each major concept heading, confirm that a problem statement or "왜 필요한가?" blockquote appears before or at the start of the explanation, not after.

---

## AC-019: Build Success

**GIVEN** all 8 Phase 4 MDX files are generated,
**WHEN** `bun run build` (or `npm run build`) is executed,
**THEN** the build completes with:
- Zero MDX parsing errors
- Zero Mermaid syntax errors
- Zero TypeScript errors
- All Phase 4 pages accessible in the built output

---

## AC-020: Navigation Integrity

**GIVEN** the site running in development mode,
**WHEN** the Phase 4 sidebar navigation is used,
**THEN** all 8 session links in the sidebar correctly navigate to the corresponding content page, and each page displays the full educational content (not skeleton placeholders).

---

## AC-021: Code Example Syntax Validity

**GIVEN** all Turtle code blocks across Phase 4,
**WHEN** the syntax is reviewed,
**THEN**:
- All Turtle examples include valid `@prefix` declarations
- Subject-Predicate-Object structure is syntactically correct
- Semicolons (`;`) correctly denote same-subject shortcuts
- Commas (`,`) correctly denote same-predicate shortcuts
- String literals are properly quoted
- URI references use angle brackets or prefixed names correctly

**GIVEN** all SPARQL code blocks across Phase 4,
**WHEN** the syntax is reviewed,
**THEN**:
- All SPARQL queries include valid `PREFIX` declarations
- SELECT/CONSTRUCT/ASK/DESCRIBE keywords are correctly used
- WHERE clauses contain valid triple patterns
- Variables use `?` prefix consistently
- Aggregation functions (COUNT, GROUP BY) use correct syntax

**GIVEN** all JSON-LD code blocks in session 05,
**WHEN** the syntax is reviewed,
**THEN**:
- Valid JSON syntax (parseable)
- `@context` declaration present
- `@type` and `@id` used correctly

---

## AC-022: Serialization Format Consistency

**GIVEN** the file `content/phase-4/05-serialization.mdx`,
**WHEN** the 4 serialization format examples (Turtle, JSON-LD, RDF/XML, N-Triples) are compared,
**THEN** all 4 examples represent the SAME set of RDF triples (same subjects, predicates, and objects).

**Verification method:** Extract subjects and predicates from each format and confirm they match. A domain expert or automated tool can verify graph isomorphism.

---

## AC-023: RDFLib Python Code Validity

**GIVEN** any Python code block in Phase 4 (sessions 06 and 07),
**WHEN** the code is reviewed,
**THEN**:
- Import statements are correct for rdflib 6.x+ (`from rdflib import Graph, Namespace, URIRef, Literal`)
- `Graph()` usage follows current API
- SPARQL queries embedded in Python use valid syntax
- Korean comments explain each significant code section
- Code is self-contained and would execute if copied into a Python file (assuming rdflib is installed)

---

## AC-024: Academic and Technical Accuracy

**GIVEN** session 03-owl.mdx,
**WHEN** the OWL species descriptions are reviewed,
**THEN**:
- OWL DL is described as decidable with complete reasoning
- OWL Full is described as undecidable (reasoning not guaranteed to terminate)
- OWL Lite is described as a subset of OWL DL
- OWL 2 profiles (EL, QL, RL) are correctly characterized per W3C specification

**GIVEN** session 04-sparql.mdx,
**WHEN** the SPARQL descriptions are reviewed,
**THEN**:
- SPARQL is described as a W3C standard
- SPARQL 1.1 features are accurately described
- The Wikidata SPARQL Endpoint URL is https://query.wikidata.org (verified)

---

## AC-025: Phase Continuity

**GIVEN** session 00-introduction.mdx,
**WHEN** the Phase 3 connection is reviewed,
**THEN** it explicitly references Phase 3 concepts (reasoning, description logic) and explains why Phase 4 follows logically: "you know reasoning is possible, now learn the languages that make it real."

**GIVEN** any backward reference to Phases 1-3,
**WHEN** the reference is checked,
**THEN** it accurately reflects content from those phases (e.g., interoperability from Phase 1, building blocks from Phase 2, reasoning from Phase 3).

---

## AC-026: Wikidata Exercise Validity

**GIVEN** the Wikidata SPARQL queries in session 07-exercises.mdx,
**WHEN** the queries are reviewed,
**THEN**:
- Queries use valid Wikidata property identifiers (e.g., `wdt:P31` for "instance of", `wdt:P17` for "country")
- The endpoint URL is https://query.wikidata.org
- Query structure follows SPARQL 1.1 syntax
- Queries are designed to return meaningful results when executed against Wikidata

---

## Quality Gate Summary

| ID | Criterion | Priority | Verification |
|----|-----------|----------|-------------|
| AC-001 | 8 complete MDX files | MUST | File count + line count |
| AC-002 | Korean content, English terms defined | MUST | Manual review |
| AC-003 | 3+ "왜 필요한가?" per file | MUST | grep count |
| AC-004 | 1 Mermaid diagram per file, safe syntax, correct types | MUST | grep + render test |
| AC-005 | Zero JSX imports | MUST | grep check |
| AC-006 | 2+ "연결 포인트" per file | MUST | grep count |
| AC-007 | 1+ "흔한 오해" per file | MUST | grep count |
| AC-008 | Session 00 required content | MUST | Manual review |
| AC-009 | Session 01 RDF content | MUST | Manual review |
| AC-010 | Session 02 RDFS content | MUST | Manual review |
| AC-011 | Session 03 OWL content | MUST | Manual review |
| AC-012 | Session 04 SPARQL content | MUST | Manual review |
| AC-013 | Session 05 serialization content | MUST | Manual review |
| AC-014 | Session 06 tools content | MUST | Manual review |
| AC-015 | Session 07 exercises and questions | MUST | Manual review |
| AC-016 | YAML frontmatter complete (difficulty: intermediate) | MUST | YAML validation |
| AC-017 | 300+ words per concept section | SHOULD | Approximate count |
| AC-018 | Problem-first narrative arc | SHOULD | Structural review |
| AC-019 | Build success (zero errors) | MUST | Build command |
| AC-020 | Navigation integrity | MUST | Browser navigation test |
| AC-021 | Code example syntax validity (Turtle, SPARQL, JSON-LD) | MUST | Syntax review |
| AC-022 | Serialization format consistency (same triples) | MUST | Cross-comparison |
| AC-023 | RDFLib Python code validity | MUST | Code review |
| AC-024 | Academic/technical accuracy (OWL, SPARQL) | MUST | Expert review |
| AC-025 | Phase continuity (Phase 3 connection) | MUST | Manual review |
| AC-026 | Wikidata exercise validity | SHOULD | Query execution test |

---

## Definition of Done

Phase 4 content generation is DONE when:

1. All 26 acceptance criteria above are verified (MUST criteria pass, SHOULD criteria are best-effort)
2. `bun run build` completes with zero errors
3. All 8 Phase 4 pages render correctly in a browser with:
   - Full Korean educational content (not skeleton placeholders)
   - Mermaid diagrams rendering as visual diagrams
   - Code blocks displaying with proper syntax highlighting
   - No console errors related to MDX parsing
4. The 4 Phase 4 competency questions from the curriculum appear in `07-exercises.mdx` with guidance
5. All code examples (Turtle, SPARQL, JSON-LD, RDF/XML, N-Triples, Python) use correct syntax
6. The 4 serialization format examples in session 05 represent the same triple set
7. Content follows the layer-cake progression established in the curriculum (`my-docs/edu-content.md`)
