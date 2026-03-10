---
id: SPEC-CONTENT-P7
version: "1.0.0"
status: draft
created: "2026-03-10"
updated: "2026-03-10"
author: jw
priority: high
---

# Acceptance Criteria: SPEC-CONTENT-P7 -- Phase 7 MDX Content Generation

## Overview

These acceptance criteria define the quality gates for Phase 7 content generation. Every criterion uses the Given-When-Then format. All criteria must pass for the SPEC to be considered complete.

---

## AC-001: Complete File Set

**GIVEN** the `content/phase-7/` directory,
**WHEN** all content generation tasks are complete,
**THEN** exactly 8 MDX files exist with fully written educational content (not skeleton placeholders):
- `00-introduction.mdx`
- `01-semantic-web.mdx`
- `02-knowledge-graphs.mdx`
- `03-search-recommendation.mdx`
- `04-nlp-ontology.mdx`
- `05-llm-graph-rag.mdx`
- `06-manufacturing.mdx`
- `07-exercises.mdx`

**Verification method:** `ls content/phase-7/*.mdx | wc -l` returns 8. Each file contains more than 100 lines of content (not skeleton headers only).

---

## AC-002: Korean Content with English Technical Terms

**GIVEN** any Phase 7 MDX session file,
**WHEN** the content is reviewed,
**THEN** all explanatory text is written in Korean, and every English technical term is introduced on first use with a Korean definition in parentheses.

**Verification method:** Search for key terms. Each of the following must appear with Korean definition on first use:
- Semantic Web (시맨틱 웹)
- Linked Data (링크드 데이터)
- Knowledge Graph (지식 그래프)
- Named Entity Recognition / NER (개체명 인식)
- Relation Extraction (관계 추출)
- Graph RAG (그래프 RAG)
- Retrieval-Augmented Generation / RAG (검색 증강 생성)
- Hallucination (할루시네이션)
- Enterprise Knowledge Graph (엔터프라이즈 지식 그래프)
- SPARQL (RDF 데이터 질의 언어)
- BIM (Building Information Modeling)

**Negative check:** No block of 3+ consecutive sentences in English (code blocks, SPARQL queries, and technical quotes excluded).

---

## AC-003: "왜 필요한가?" Blockquotes

**GIVEN** any Phase 7 MDX session file (00 through 07),
**WHEN** the blockquotes are counted,
**THEN** at least 3 instances of `> **왜 필요한가?**` appear in each file.

**Verification method:** For each file, run: `grep -c '왜 필요한가?' content/phase-7/XX-*.mdx` and confirm count >= 3.

---

## AC-004: Mermaid Diagrams

**GIVEN** any Phase 7 MDX session file,
**WHEN** the Mermaid diagrams are inspected,
**THEN** exactly 1 Mermaid code block exists per file, and the section heading preceding it contains "이번 세션 전체 그림".

### AC-004.1: Mermaid Safe Syntax

**GIVEN** any Mermaid code block in Phase 7 content,
**WHEN** the syntax is inspected,
**THEN** the diagram contains:
- No apostrophes (`'`) in node labels
- No `+` operator (if `stateDiagram-v2`)
- Double-quoted labels `["text"]` for labels with Korean characters

### AC-004.2: Correct Diagram Types

**GIVEN** all 8 Phase 7 MDX files,
**WHEN** the Mermaid diagram types are reviewed,
**THEN** the diagram types match:

| File | Expected Diagram Type |
|------|----------------------|
| 00-introduction.mdx | `graph TD` |
| 01-semantic-web.mdx | `graph LR` |
| 02-knowledge-graphs.mdx | `graph TD` |
| 03-search-recommendation.mdx | `graph LR` |
| 04-nlp-ontology.mdx | `graph LR` |
| 05-llm-graph-rag.mdx | `graph TD` |
| 06-manufacturing.mdx | `graph TD` |
| 07-exercises.mdx | `graph TD` |

### AC-004.3: Mermaid Render Verification

**GIVEN** the site running in development mode (`bun run dev`),
**WHEN** each Phase 7 page is loaded in a browser,
**THEN** each Mermaid diagram renders visually as a diagram (not as raw text or an error message).

---

## AC-005: No JSX Imports

**GIVEN** any Phase 7 MDX file,
**WHEN** the file is searched for import statements,
**THEN** zero `import` statements are found.

**Verification method:** `grep -c '^import' content/phase-7/*.mdx` returns 0 for every file.

---

## AC-006: "연결 포인트" Forward/Backward References

**GIVEN** any Phase 7 MDX session file (00 through 07),
**WHEN** the callouts are counted,
**THEN** at least 2 instances of `> **연결 포인트` appear in each file, and each references a valid phase (Phase 1 through Phase 8).

**Verification method:** `grep -c '연결 포인트' content/phase-7/XX-*.mdx` >= 2 per file. Each referenced phase number is between 1 and 8.

**Phase 7 reference direction check:**
- References to Phase 1-6: backward references to previously covered content (allowed and encouraged)
- References to Phase 8: forward references to limitations and alternatives (allowed and encouraged)
- References to Phase 7 internal sessions: via relative links (allowed for exercises session)

---

## AC-007: "흔한 오해" Misconception Sections

**GIVEN** any Phase 7 MDX session file (00 through 07),
**WHEN** the misconception sections are counted,
**THEN** at least 1 instance of `> **흔한 오해**` followed by `> **실제로는**` appears in each file.

**Verification method:** `grep -c '흔한 오해' content/phase-7/XX-*.mdx` >= 1 per file.

### AC-007.1: Session 05 Enhanced Misconception Coverage

**GIVEN** the file `content/phase-7/05-llm-graph-rag.mdx`,
**WHEN** the misconception sections are counted,
**THEN** at least 2 instances of `> **흔한 오해**` appear, including the critical misconception "온톨로지는 AI 시대에 구식이다".

**Verification method:** `grep -c '흔한 오해' content/phase-7/05-llm-graph-rag.mdx` >= 2. grep confirms "구식" or "outdated" related content is present.

---

## AC-008: Session 00 -- Introduction Content

**GIVEN** the file `content/phase-7/00-introduction.mdx`,
**WHEN** the content is reviewed,
**THEN** it contains:
- Phase 7 learning objective: "자신의 문제에 온톨로지를 적용할 수 있는 판단력을 갖는다"
- Connection from Phase 6: "사례를 분석했으니, 이제 응용 패턴을 추상화한다"
- Brief overview of all 6 content sessions (01-06) with application domain descriptions
- The 4 competency questions as a preview list
- A `graph TD` Mermaid diagram showing Phase 7 application domain map
- At least 3 "왜 필요한가?" blockquotes
- At least 2 "연결 포인트" callouts
- At least 1 "흔한 오해" section

---

## AC-009: Session 01 -- Semantic Web and Linked Data

**GIVEN** the file `content/phase-7/01-semantic-web.mdx`,
**WHEN** the content is rendered,
**THEN** it contains:
- Tim Berners-Lee's Semantic Web vision explained (2001 Scientific American article referenced)
- Linked Data 4 principles stated and explained with concrete URI examples
- LOD (Linked Open Data) cloud description with scale indication
- Partial realization insight: Schema.org and Wikidata as successful implementations
- Korean context reference (KISTI or Korean data portals)
- A `graph LR` Mermaid diagram showing simplified Semantic Web layer architecture
- At least 300 words for each major concept section

---

## AC-010: Session 02 -- Knowledge Graphs

**GIVEN** the file `content/phase-7/02-knowledge-graphs.mdx`,
**WHEN** the content is rendered,
**THEN** it contains:
- Google Knowledge Graph description (search right panel, Knowledge Panel)
- Wikidata description with SPARQL queryability and P-code/Q-code structure
- DBpedia description with comparison to Wikidata
- Knowledge Graph composition principle: Ontology (schema) + Instance Data (facts) + Reasoning Rules
- Enterprise Knowledge Graph trend with Korean company references (Samsung SDS, LG CNS, POSCO, or similar)
- A `graph TD` Mermaid diagram showing KG composition with concrete examples
- Connection to Phase 2 (building blocks) and Phase 3 (reasoning) explicitly stated

---

## AC-011: Session 03 -- Search and Recommendation Systems

**GIVEN** the file `content/phase-7/03-search-recommendation.mdx`,
**WHEN** the content is rendered,
**THEN** it contains:
- Keyword search limitations explained with concrete examples
- Ontology-based expanded search mechanism described (query term -> ontology concept -> expansion via relationships)
- Korean e-commerce search example (노트북/랩탑/울트라북 or similar)
- Ontology-based recommendation system described with property-based matching
- Explainability advantage over collaborative filtering stated
- Connection to Phase 1 interoperability problem established
- A `graph LR` Mermaid diagram showing keyword search vs. ontology-expanded search dual flow

---

## AC-012: Session 04 -- NLP and Ontology

**GIVEN** the file `content/phase-7/04-nlp-ontology.mdx`,
**WHEN** the content is rendered,
**THEN** it contains:
- NER + ontology linking described with Korean example sentence
- Entity disambiguation explained (삼성 = Samsung Electronics vs. Samsung Life etc.)
- Relation Extraction described with triple output examples
- Korean language-specific NLP challenges mentioned (SOV structure, particles)
- Ontology-based text classification described with class hierarchy usage
- Complete NLP-Ontology pipeline summarized
- Connection to Phase 4 (Triple structure) explicitly stated
- A `graph LR` Mermaid diagram showing the NLP-Ontology pipeline

---

## AC-013: Session 05 -- LLM and Graph RAG (THE KEY SESSION)

**GIVEN** the file `content/phase-7/05-llm-graph-rag.mdx`,
**WHEN** the content is rendered,
**THEN** it contains:

### AC-013.1: Core Content Blocks (all required)
- The "ontology is outdated" false narrative addressed directly
- RAG + Ontology hybrid explained with multi-hop reasoning example
- LLM output structuring via ontology schema described with Korean example
- Hallucination detection via ontology knowledge graph described with concrete example
- Graph RAG architecture detailed with dual retrieval (SPARQL + vector) explanation
- Re-emergence narrative: ontology complements LLMs, does not compete

### AC-013.2: Enhanced Quality
- Word count reaches at least 2,500 words (approximately)
- At least 2 "흔한 오해" sections present
- At least 3 "왜 필요한가?" blockquotes present
- Engaging, forward-looking tone throughout (no dry academic listing)
- At least one pseudocode or architecture example in markdown code block

### AC-013.3: Technical Accuracy
- Standard RAG architecture correctly described (vector search -> chunks -> LLM)
- Graph RAG correctly described as dual retrieval (structured + unstructured)
- Hallucination detection correctly described as fact verification against KG
- Tool references are current and accurate (LangChain, LlamaIndex, Neo4j, Microsoft GraphRAG)

### AC-013.4: Practical Examples
- Multi-hop reasoning example provided (e.g., CEO of parent company scenario)
- Korean manufacturing example provided (defect tracing through process ontology)
- Medical/healthcare example provided (drug interactions for multi-condition patients)

---

## AC-014: Session 06 -- Manufacturing/Industry Applications

**GIVEN** the file `content/phase-7/06-manufacturing.mdx`,
**WHEN** the content is rendered,
**THEN** it contains:
- ISO 15926 described (oil/gas plant lifecycle data integration)
- IFC described (Building Information Modeling standard)
- Manufacturing process ontology applications described:
  - Process parameter to quality result modeling
  - Equipment failure pattern knowledge
  - AI explainability in process automation
- Laser processing example from curriculum included
- Korean manufacturing context present:
  - At least 3 Korean company/initiative references (Samsung, POSCO, Hyundai, smart factory, etc.)
  - Korean regulatory or quality standard context mentioned
- Ontology as AI explainability tool section present
- A `graph TD` Mermaid diagram showing manufacturing ontology ecosystem
- Connection to Phase 3 (reasoning provides explainability) explicitly stated

---

## AC-015: Session 07 -- Exercises and Competency Questions

**GIVEN** the file `content/phase-7/07-exercises.mdx`,
**WHEN** the content is rendered,
**THEN** it contains:

### Basic Exercises (기본 실습):
- Exercise 1: Exactly 10 SPARQL queries for Wikidata with:
  - Complete SPARQL code in code blocks
  - Korean explanation for each query
  - Line-by-line annotation (at least for first 3 queries)
  - Expected output description

### Challenge Exercises (도전 실습):
- Exercise 2: Graph RAG application scenario design task with:
  - Design template provided (domain, entities, relationships, sample questions)
  - Example scenario provided (laser manufacturing or similar)
- Exercise 3: LangChain + Neo4j KG QA prototype conceptual design with:
  - Ontology definition template (5-10 classes, 10-15 properties)
  - Tool references (LangChain, Neo4j, LlamaIndex)

### Competency Questions (핵심 질문):
All 4 Phase 7 competency questions from the curriculum are present with guidance:
1. "지식 그래프와 온톨로지의 관계를 설명하라." with guidance pointing to Session 02
2. "LLM의 어떤 약점을 온톨로지가 보완할 수 있는가?" with guidance pointing to Session 05
3. "자신의 업무 도메인에서 온톨로지를 적용할 수 있는 구체적 시나리오를 하나 설계하라." with guidance pointing to all sessions
4. "Graph RAG가 단순 벡터 RAG보다 유리한 경우는 어떤 때인가?" with guidance pointing to Session 05

### Self-Assessment Checklist:
At least 7 self-assessment items in Korean covering all Phase 7 application domains

### Concept Map:
A `graph TD` Mermaid diagram connecting all Phase 7 application domains to ontology core

---

## AC-016: YAML Frontmatter

**GIVEN** any Phase 7 MDX file,
**WHEN** the frontmatter is inspected,
**THEN** it contains all required fields:
- `title`: Korean session title (string)
- `description`: Korean description for search (string, 50-100 characters)
- `difficulty`: "intermediate" (string -- NOT "beginner")

**Verification method:** Check each file starts with `---` followed by YAML block containing title, description, and difficulty fields, closed by `---`.

---

## AC-017: Content Depth

**GIVEN** any content session file (01 through 06),
**WHEN** the word count of each major concept section is measured,
**THEN** each major concept section contains at least 300 Korean words (measured approximately by character count / 2 for Korean or by visual inspection of paragraph density).

**Guidance:** Each section should have at least 3 substantial paragraphs with real-world examples and analogies. Sections with only 1-2 sentences fail this criterion.

### AC-017.1: Session 05 Enhanced Word Count

**GIVEN** the file `content/phase-7/05-llm-graph-rag.mdx`,
**WHEN** the total word count is estimated,
**THEN** the session contains approximately 2,500-3,500 Korean words (significantly more than other sessions).

---

## AC-018: Narrative Arc

**GIVEN** any content session file (01 through 06),
**WHEN** the content structure is reviewed,
**THEN** each major concept follows the "problem first, solution second" narrative arc:
1. The limitation or problem is described BEFORE the concept is introduced
2. The concept is presented as a response to the problem
3. Practical impact is explained with domain-relevant examples

**Verification method:** For each major concept heading, confirm that a problem statement or "왜 필요한가?" blockquote appears before or at the start of the explanation, not after.

---

## AC-019: Build Success

**GIVEN** all 8 Phase 7 MDX files are generated,
**WHEN** `bun run build` (or `npm run build`) is executed,
**THEN** the build completes with:
- Zero MDX parsing errors
- Zero Mermaid syntax errors
- Zero TypeScript errors
- All Phase 7 pages accessible in the built output

---

## AC-020: Navigation Integrity

**GIVEN** the site running in development mode,
**WHEN** the Phase 7 sidebar navigation is used,
**THEN** all 8 session links in the sidebar correctly navigate to the corresponding content page, and each page displays the full educational content (not skeleton placeholders).

---

## AC-021: Real-World Analogies and Korean Context

**GIVEN** content sessions 01 through 06,
**WHEN** the analogies and examples are counted,
**THEN** at least 2 real-world examples from Korean-relevant contexts appear in each session. Contexts include:
- Manufacturing (smart factory, semiconductor, laser processing, POSCO, Samsung)
- Healthcare (Korean medical system, EMR integration)
- E-commerce (Korean shopping platforms, product search)
- Technology (Korean tech companies, AI/ML applications)
- Government/Academic (KISTI, Korean government data portals)

---

## AC-022: SPARQL Query Validity

**GIVEN** the 10 SPARQL queries in `content/phase-7/07-exercises.mdx`,
**WHEN** the queries are reviewed,
**THEN**:
- All queries use standard Wikidata prefixes (wd:, wdt:, rdfs:, etc.)
- All queries reference known Wikidata properties and items
- All queries are syntactically valid SPARQL (well-formed SELECT, WHERE, OPTIONAL clauses)
- At least 5 different query patterns are used (SELECT, FILTER, ORDER BY, GROUP BY, OPTIONAL, etc.)
- Each query has Korean explanation and expected output description

---

## AC-023: Academic Attribution

**GIVEN** all Phase 7 content files,
**WHEN** the academic and factual claims are reviewed,
**THEN**:
- Tim Berners-Lee's Semantic Web vision is correctly attributed (2001 Scientific American article)
- Linked Data 4 principles are accurately stated
- Knowledge Graph descriptions (Google, Wikidata, DBpedia) are factually correct
- ISO 15926 and IFC standards are accurately described
- No fabricated statistics or references appear in any Phase 7 content

---

## AC-024: Cross-Reference Accuracy

**GIVEN** all Phase 7 content files,
**WHEN** cross-references to other phases are reviewed,
**THEN**:
- All backward references (to Phase 1-6) accurately describe content from those phases:
  - Phase 1: motivation, interoperability, Gruber definition
  - Phase 2: classes, properties, relationships (building blocks)
  - Phase 3: reasoning and inference
  - Phase 4: RDF, OWL, SPARQL, Triple structure
  - Phase 5: design methodology (METHONTOLOGY, Competency Questions)
  - Phase 6: real-world cases (Schema.org, SNOMED CT, Gene Ontology)
- All forward references (to Phase 8) accurately preview Phase 8 content: limitations and alternatives
- No references to non-existent phases or sessions

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
| AC-007 | 1+ "흔한 오해" per file (2+ for Session 05) | MUST | grep count |
| AC-008 | Session 00 required content | MUST | Manual review |
| AC-009 | Session 01 required content | MUST | Manual review |
| AC-010 | Session 02 required content | MUST | Manual review |
| AC-011 | Session 03 required content | MUST | Manual review |
| AC-012 | Session 04 required content | MUST | Manual review |
| AC-013 | Session 05 required content (enhanced) | MUST | Manual review + word count |
| AC-014 | Session 06 required content (Korean mfg) | MUST | Manual review |
| AC-015 | Session 07 exercises and questions | MUST | Manual review |
| AC-016 | YAML frontmatter complete (intermediate) | MUST | YAML validation |
| AC-017 | 300+ words per concept section (2500+ for 05) | SHOULD | Approximate count |
| AC-018 | Problem-first narrative arc | SHOULD | Structural review |
| AC-019 | Build success (zero errors) | MUST | Build command |
| AC-020 | Navigation integrity | MUST | Browser navigation test |
| AC-021 | 2+ Korean context examples per session | SHOULD | Manual review |
| AC-022 | SPARQL query validity | MUST | Syntax review |
| AC-023 | Correct academic attribution | MUST | Citation check |
| AC-024 | Cross-reference accuracy | MUST | Reference check |

---

## Definition of Done

Phase 7 content generation is DONE when:

1. All 24 acceptance criteria above are verified (MUST criteria pass, SHOULD criteria are best-effort)
2. `bun run build` completes with zero errors
3. All 8 Phase 7 pages render correctly in a browser with:
   - Full Korean educational content (not skeleton placeholders)
   - Mermaid diagrams rendering as visual diagrams
   - SPARQL code blocks rendering in monospace with syntax highlighting
   - No console errors related to MDX parsing
4. The 4 Phase 7 competency questions from the curriculum appear in `07-exercises.mdx` with guidance
5. Session 05 (LLM/Graph RAG) meets enhanced quality requirements (2,500+ words, 2+ misconceptions, engaging tone)
6. Content follows the narrative arc established in `my-docs/edu-content.md`
7. All cross-references to Phases 1-6 and Phase 8 are accurate
