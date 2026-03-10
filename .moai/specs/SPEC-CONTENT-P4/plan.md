---
id: SPEC-CONTENT-P4
version: "1.0.0"
status: draft
created: "2026-03-10"
updated: "2026-03-10"
author: jw
priority: high
---

# Implementation Plan: SPEC-CONTENT-P4 -- Phase 4 MDX Content Generation

## Overview

This plan details the implementation approach for generating 8 complete MDX content files for Phase 4 ("Standards and Language Ecosystem") of the Ontology Fundamentals Learning Platform. The work is pure content authoring -- no infrastructure, components, or configuration changes.

Phase 4 is the first "hands-on syntax" phase where learners encounter actual code (Turtle, SPARQL, JSON-LD). Content must balance conceptual explanation with practical code examples.

---

## Prerequisites

- SPEC-INFRA-001 fully implemented (Nextra site builds, skeleton structure exists)
- `content/phase-4/` directory with `_meta.js` navigation configured
- MermaidDiagram component functional and globally available
- `bun run dev` starts successfully
- Phases 1-3 content conceptually complete (learners have prior knowledge foundation)

---

## Implementation Strategy

### Approach: Layer-Progressive Content Generation

Content sessions are generated following the standards stack progression, as each layer builds on the previous:

1. **00-introduction.mdx** first (provides the layer-cake roadmap and framing)
2. **01-rdf.mdx** second (establishes the triple foundation -- everything else depends on this)
3. **02-rdfs.mdx** third (adds hierarchy to RDF -- requires understanding of triples)
4. **03-owl.mdx** fourth (full ontology language -- requires understanding of RDFS limitations)
5. **04-sparql.mdx** fifth (querying -- requires understanding of RDF graph structure)
6. **05-serialization.mdx** sixth (format comparison -- requires understanding of what RDF represents)
7. **06-tools-software.mdx** seventh (tools -- requires understanding of what the tools process)
8. **07-exercises.mdx** last (synthesizes and tests all prior sessions)

### Shared Example Domain

To maintain consistency across sessions, all code examples use a shared domain:

**Primary domain:** Consumer electronics (smartphones, manufacturers)
- Subject: Samsung, Apple, iPhone, Galaxy devices
- Properties: manufacturer, founded year, product category, price range
- Korean context: familiar to all Korean learners

**Secondary domain:** Manufacturing (for Korean industry relevance)
- Subject: factories, production lines, equipment
- Properties: location, product type, capacity

This ensures that Turtle examples in session 01 can be directly queried by SPARQL in session 04, and all serialization formats in session 05 represent the same triple set.

### Content Quality Checklist (per session)

Before marking any session complete, verify:
- [ ] At least 3 "왜 필요한가?" blockquotes present
- [ ] At least 2 "연결 포인트" callouts present
- [ ] At least 1 "흔한 오해" section present
- [ ] Exactly 1 Mermaid diagram labeled "이번 세션 전체 그림"
- [ ] Mermaid syntax is safe (no apostrophes, no `+` in stateDiagram-v2)
- [ ] All Korean content, English terms defined on first use
- [ ] No JSX imports in MDX
- [ ] Each concept explanation is 300-500 words
- [ ] Code examples have proper syntax highlighting (turtle, sparql, json, xml, python)
- [ ] Code examples include Korean comments
- [ ] "Problem first, solution second" narrative arc followed
- [ ] YAML frontmatter with title, description, difficulty: "intermediate"

---

## Milestone 1: Foundation and RDF Layer (Priority High)

### Task 1.1: Generate 00-introduction.mdx

**File:** `content/phase-4/00-introduction.mdx`

**Content outline:**

1. **Title block:**
   - Frontmatter: title "Phase 4 개요: 표준과 언어 생태계", description about standards overview, difficulty intermediate
   - H1: "Phase 4: 표준과 언어 생태계"

2. **Learning objective section:**
   - State core goal: "온톨로지 관련 표준 스택을 보고 무엇이 무엇인지 구분하고 선택할 수 있다"
   - Phase 3 connection: "추론이 가능하다는 것을 알았다면, 이제 그것을 실제로 표현하는 언어를 배워야 한다"
   - Explain the "Semantic Web Layer Cake" concept -- standards are layered, each building on the previous

3. **"왜 필요한가?" blockquotes (3+):**
   - Why concrete standards matter after understanding theory
   - Why the layer structure matters (you cannot skip layers)
   - Why tool knowledge is essential for practical ontology work

4. **Layer stack Mermaid diagram:**
   - `graph TD` showing: RDF (foundation) -> RDFS (hierarchy) -> OWL (full reasoning)
   - SPARQL as a cross-cutting query layer
   - Serialization formats as the "file format" layer
   - Korean labels for each layer with one-line descriptions

5. **Session overview:**
   - Session 1: RDF -- the triple foundation
   - Session 2: RDFS -- adding hierarchy
   - Session 3: OWL -- the full ontology language
   - Session 4: SPARQL -- querying ontologies
   - Session 5: Serialization formats -- same data, different files
   - Session 6: Tools and software
   - Session 7: Exercises and competency questions

6. **Competency questions preview:**
   - List the 4 questions learners should be able to answer after Phase 4
   - Frame as challenge: "이 질문에 자신 있게 답할 수 있다면 Phase 5로 넘어가세요"

7. **"흔한 오해" section:**
   - Misconception: "RDF, RDFS, OWL은 서로 다른 독립적인 기술이다"
   - Reality: They are layers of the same stack. RDF is the foundation, RDFS adds vocabulary for hierarchy, OWL adds full reasoning. Each layer imports and extends the previous.

8. **"연결 포인트" callouts (2+):**
   - Phase 5: "표준 언어를 알았으니, 이제 이 도구로 실제 온톨로지를 설계하는 방법론을 배웁니다"
   - Phase 7: "여기서 배우는 표준이 실제로 Knowledge Graph, Semantic Web, LLM 통합에서 어떻게 쓰이는지 확인합니다"

### Task 1.2: Generate 01-rdf.mdx

**File:** `content/phase-4/01-rdf.mdx`

**Content outline:**

1. **Frontmatter:** title "RDF: 지식 표현의 기본 단위", description about RDF triples and knowledge graphs, difficulty intermediate

2. **Learning objectives (3 bullets):**
   - Understand the Subject-Predicate-Object triple structure
   - Explain the role of URIs in global identification
   - Recognize how triples form a knowledge graph (directed graph)

3. **"왜 필요한가?" opening blockquote:**
   - Why a universal knowledge representation format matters (callback to Phase 1 interoperability)

4. **Mermaid diagram -- "이번 세션 전체 그림":**
   - `graph LR` showing RDF triples as a graph
   - Nodes: iPhone15, Apple, "1976", 스마트폰
   - Edges labeled with predicates: 제조사, 설립연도, 카테고리
   - Korean annotations

5. **Triple concept (400-500 words):**
   - Subject-Predicate-Object explanation with analogy to Korean sentence structure (주어-술어-목적어)
   - Detailed examples with electronics and manufacturing domains
   - Difference between object resources (URI) and literal values (strings, numbers, dates)
   - "왜 필요한가?" blockquote before discussing why triples are the minimal meaningful unit

6. **URI concept (300-400 words):**
   - Global identifier for every entity
   - Namespace prefixes for readability
   - Why global uniqueness enables interoperability (Phase 1 callback)
   - Example: `http://example.org/electronics/iPhone15`

7. **Graph structure (300-400 words):**
   - Triples form a directed labeled graph
   - Multiple triples about same subject create rich descriptions
   - "왜 필요한가?" blockquote about why graphs are better than tables for knowledge
   - Contrast with tabular database representation

8. **RDF limitations (200-300 words):**
   - No reasoning capability in RDF alone
   - Cannot express class hierarchies
   - Needs RDFS/OWL for richer semantics
   - This limitation is why the layer cake exists

9. **Turtle syntax examples:**
   - Complete 8-10 triple example in Turtle format
   - Annotated with Korean comments on each line
   - Show prefix declarations and semicolon shorthand

10. **"흔한 오해" section:**
    - Misconception: "RDF는 XML의 일종이다"
    - Reality: RDF is a data model (graph of triples). RDF/XML is just one serialization format. Turtle, JSON-LD, N-Triples are equally valid representations of RDF.

11. **"연결 포인트" callouts:**
    - Phase 5: "RDF 트리플로 작성한 데이터가 온톨로지 설계의 실제 산출물이 됩니다"
    - Phase 7: "Knowledge Graph는 바로 이 RDF 트리플의 대규모 집합입니다"

12. **Summary and next session preview**

---

## Milestone 2: Hierarchy and Reasoning Layers (Priority High)

### Task 2.1: Generate 02-rdfs.mdx

**File:** `content/phase-4/02-rdfs.mdx`

**Content outline:**

1. **Frontmatter:** title "RDFS: 계층 구조를 추가하다", description about RDFS hierarchy extension, difficulty intermediate

2. **Learning objectives (3 bullets):**
   - Use rdfs:subClassOf and rdfs:subPropertyOf for class/property hierarchies
   - Apply rdfs:domain and rdfs:range for property constraints
   - Distinguish when RDFS is sufficient vs. when OWL is needed

3. **"왜 필요한가?" opening blockquote:**
   - With RDF we can state facts but cannot express "Dog IS-A Animal" -- hierarchy requires something more

4. **Mermaid diagram -- "이번 세션 전체 그림":**
   - `graph TD` showing a class hierarchy: 동물 -> 포유류 -> 개, 고양이 with domain/range annotations

5. **RDFS vocabulary (400-500 words):**
   - `rdfs:subClassOf` with Turtle code example
   - `rdfs:subPropertyOf` with Turtle code example
   - `rdfs:domain` and `rdfs:range` with Turtle code example
   - "왜 필요한가?" blockquote about why hierarchy is the first thing you need beyond flat triples
   - Manufacturing hierarchy example: 장비 -> 기계 -> CNC 기계

6. **Inheritance reasoning (300-400 words):**
   - If Dog subClassOf Animal, then all instances of Dog are also instances of Animal
   - This is RDFS's reasoning: type inheritance through subClassOf chains
   - "왜 필요한가?" blockquote about why automatic inheritance saves manual annotation

7. **RDFS limitations (300-400 words):**
   - Cannot express disjointness (Dog and Cat cannot be the same individual)
   - Cannot express cardinality (a person has exactly 2 parents)
   - Cannot express equivalence (같은 것임을 명시)
   - When RDFS is enough: simple classification, library systems, basic product catalogs

8. **RDFS vs. OWL decision guide (200-300 words):**
   - Simple taxonomy? RDFS
   - Need formal reasoning? OWL
   - Need constraints? OWL
   - Brief decision table

9. **"흔한 오해" section:**
   - Misconception: "RDFS는 너무 단순해서 실무에서 쓸 일이 없다"
   - Reality: Schema.org -- the vocabulary used by Google, Bing, and most search engines -- is essentially RDFS-level. Many practical systems use RDFS successfully for classification.

10. **"연결 포인트" callouts:**
    - Phase 6: "Schema.org는 사실상 RDFS 수준의 어휘입니다. Phase 6에서 자세히 다룹니다"
    - Phase 3 (backward): "Phase 3에서 배운 추론 능력이 RDFS에서는 제한적으로만 지원됩니다. 완전한 추론은 OWL에서 가능합니다"

11. **Summary and next session preview**

### Task 2.2: Generate 03-owl.mdx

**File:** `content/phase-4/03-owl.mdx`

**Content outline:**

1. **Frontmatter:** title "OWL: 본격적인 온톨로지 언어", description about OWL ontology language, difficulty intermediate

2. **Learning objectives (3 bullets):**
   - Distinguish OWL Lite, OWL DL, and OWL Full by their reasoning guarantees
   - Understand OWL 2 profiles (EL, QL, RL) and their use cases
   - Apply selection criteria: when to use RDFS, OWL DL, Schema.org, or OWL 2 profiles

3. **"왜 필요한가?" opening blockquote:**
   - RDFS gives hierarchy but cannot guarantee reasoning. For industrial, medical, or research ontologies, guaranteed reasoning is non-negotiable.

4. **Mermaid diagram -- "이번 세션 전체 그림":**
   - `graph TD` showing OWL layer stack
   - Vertical: OWL Lite (bottom) -> OWL DL (middle) -> OWL Full (top) with expressivity increasing upward
   - Side branch: OWL 2 EL, OWL 2 QL, OWL 2 RL branching from OWL 2 DL
   - Korean annotations: "결정 가능", "추론 보장", "제약 없음"

5. **OWL overview (300-400 words):**
   - W3C standard based on Description Logic (Phase 3 callback)
   - Formal semantics enabling machine reasoning
   - The reason RDFS alone is not sufficient for "real" ontologies

6. **OWL Lite (300-400 words):**
   - Simple hierarchies and basic constraints
   - Low reasoning computational cost
   - "왜 필요한가?" blockquote: when you need just a bit more than RDFS
   - Practical use case and limitations

7. **OWL DL (400-500 words):**
   - Complete reasoning guaranteed (decidable)
   - Most widely used in practice
   - "왜 필요한가?" blockquote: why decidability matters for production systems
   - Example: SNOMED CT medical ontology uses OWL DL
   - Key OWL DL constructs: disjointness, cardinality, equivalence, someValuesFrom, allValuesFrom
   - Turtle/OWL syntax examples with Korean annotations

8. **OWL Full (200-300 words):**
   - Maximum expressivity, no restrictions
   - Reasoning completeness not guaranteed (undecidable in general)
   - When to use: theoretical research where expressivity outweighs reasoning guarantees
   - Why most practitioners avoid it

9. **OWL 2 profiles (400-500 words):**
   - OWL 2 EL: Efficient classification for large ontologies (SNOMED CT scale)
   - OWL 2 QL: Efficient query answering, maps to relational databases
   - OWL 2 RL: Rule-based reasoning, implementable with existing rule engines
   - Comparison table: Profile | Strength | Weakness | Use Case
   - "왜 필요한가?" blockquote: why one-size-fits-all OWL is not practical for all workloads

10. **Selection criteria decision table:**
    - Need full reasoning? -> OWL DL
    - Simple hierarchy only? -> RDFS
    - Web visibility? -> Schema.org
    - Very large taxonomy? -> OWL 2 EL
    - Query-heavy application? -> OWL 2 QL
    - Rule-based system? -> OWL 2 RL

11. **"흔한 오해" section:**
    - Misconception: "OWL Full이 가장 좋은 버전이니 항상 OWL Full을 쓰면 된다"
    - Reality: OWL Full cannot guarantee reasoning termination. In practice, OWL DL is preferred because it guarantees that any valid query will produce a result in finite time.

12. **"연결 포인트" callouts:**
    - Phase 3 (backward): "Phase 3에서 배운 기술 논리(DL)가 바로 OWL DL의 이론적 기반입니다"
    - Phase 6: "SNOMED CT(의료)와 Gene Ontology(생물학)가 실제로 OWL을 어떻게 사용하는지 Phase 6에서 확인합니다"

13. **Summary and next session preview**

---

## Milestone 3: Query Language and Serialization (Priority High)

### Task 3.1: Generate 04-sparql.mdx

**File:** `content/phase-4/04-sparql.mdx`

**Content outline:**

1. **Frontmatter:** title "SPARQL: 온톨로지에 질문하는 방법", description about SPARQL query language, difficulty intermediate

2. **Learning objectives (3 bullets):**
   - Write basic SPARQL SELECT queries with triple patterns
   - Understand the 4 SPARQL query types (SELECT, CONSTRUCT, ASK, DESCRIBE)
   - Execute queries against public SPARQL endpoints (DBpedia, Wikidata)

3. **"왜 필요한가?" opening blockquote:**
   - "SPARQL을 모르면 온톨로지를 '읽기 전용'으로밖에 쓸 수 없다" -- without SPARQL, you can build ontologies but cannot ask them questions

4. **Mermaid diagram -- "이번 세션 전체 그림":**
   - `graph LR` showing: User["사용자"] -> Query["SPARQL 질의"] -> Engine["패턴 매칭"] -> Graph["RDF 그래프"] -> Results["결과 집합"]

5. **SPARQL as SQL for RDF (400-500 words):**
   - "왜 필요한가?" blockquote about why querying is the practical payoff of all the standards learned
   - Triple pattern matching concept
   - Basic SELECT structure with Korean-annotated SPARQL example
   - SQL comparison: SELECT FROM WHERE -> SELECT WHERE { triple patterns }
   - Variable binding with `?x` notation

6. **SPARQL query types (300-400 words):**
   - SELECT: return bindings (most common)
   - CONSTRUCT: return a new RDF graph
   - ASK: yes/no answer
   - DESCRIBE: resource description
   - Each with a concise SPARQL code example and Korean annotation

7. **SPARQL 1.1 features (300-400 words):**
   - "왜 필요한가?" blockquote about why basic SELECT is not enough for real-world queries
   - Aggregation: COUNT, GROUP BY examples
   - FILTER and OPTIONAL patterns
   - Subqueries
   - SPARQL Update (INSERT DATA, DELETE DATA) for write operations
   - Each with code example

8. **SPARQL Endpoints (300-400 words):**
   - Concept: public URL for sending SPARQL queries
   - DBpedia: structured Wikipedia data
   - Wikidata Query Service: https://query.wikidata.org
   - How to use: HTTP request or web interface
   - "왜 필요한가?" blockquote about why endpoints make the Semantic Web practical

9. **Practical SPARQL examples (3 queries):**
   - Query 1: Find all smartphones by Apple (basic)
   - Query 2: Count products by manufacturer (aggregation)
   - Query 3: Find all subclasses of a class using RDFS reasoning
   - Each with full SPARQL code, Korean comments, and expected result description

10. **"흔한 오해" section:**
    - Misconception: "SPARQL은 SQL과 완전히 같다"
    - Reality: SPARQL queries against a graph (triples), not tables (rows/columns). SPARQL has no JOIN -- instead, it uses shared variables across triple patterns. This is a fundamentally different paradigm.

11. **"연결 포인트" callouts:**
    - Phase 7: "Knowledge Graph 시스템에서 SPARQL은 핵심 질의 인터페이스입니다"
    - Phase 5: "온톨로지 설계 시 Competency Question을 SPARQL로 검증합니다"

12. **Summary and next session preview**

### Task 3.2: Generate 05-serialization.mdx

**File:** `content/phase-4/05-serialization.mdx`

**Content outline:**

1. **Frontmatter:** title "직렬화 포맷 비교", description about RDF serialization formats, difficulty intermediate

2. **Learning objectives (3 bullets):**
   - Compare 4 RDF serialization formats (Turtle, JSON-LD, RDF/XML, N-Triples)
   - Choose the appropriate format for a given use case
   - Read and write the same triple set in multiple formats

3. **"왜 필요한가?" opening blockquote:**
   - You will encounter different file formats in the wild. Understanding that they all represent the same information prevents confusion.

4. **Mermaid diagram -- "이번 세션 전체 그림":**
   - `graph LR` showing: RDF_Graph["RDF 그래프"] --> Turtle[".ttl"] & JSONLD["JSON-LD"] & RDFXML["RDF/XML"] & NT["N-Triples"]
   - All 4 nodes converge to center: Same["동일한 정보"]

5. **Core insight section (200-300 words):**
   - "왜 필요한가?" blockquote: same graph, different notation
   - Photo format analogy: JPEG, PNG, TIFF are different file formats for the same image
   - Choice depends on use case, not information content

6. **Shared example triple set:**
   - Define exactly 5 triples about Samsung and Apple products
   - These same 5 triples will be shown in all 4 formats
   - List the triples in natural language first

7. **Turtle section (300-400 words):**
   - Full annotated example with the 5 shared triples
   - Explain prefix, semicolon, comma shortcuts
   - Korean inline comments
   - Why it is best for learning: human-readable, concise
   - "왜 필요한가?" blockquote: why starting with Turtle is the best learning strategy

8. **JSON-LD section (300-400 words):**
   - Full annotated example with the same 5 triples
   - Explain @context, @type, @id
   - Why web developers prefer it: fits JSON ecosystem
   - Schema.org recommendation
   - "왜 필요한가?" blockquote: why JSON-LD bridges the gap between web development and Semantic Web

9. **RDF/XML section (200-300 words):**
   - Full annotated example with the same 5 triples
   - Explain rdf:Description, rdf:about, nested elements
   - Why it still exists: legacy, some tools default to it
   - Why it is hard to read for humans

10. **N-Triples section (200-300 words):**
    - Full annotated example with the same 5 triples
    - One triple per line, full URIs, no shortcuts
    - Why it is best for large-scale processing: simple parsing, streaming
    - Use case: bulk data loading into triplestores

11. **Comparison table:**
    - Rows: Turtle, JSON-LD, RDF/XML, N-Triples
    - Columns: 가독성 (readability), 기계 처리 (machine processing), 파일 크기 (file size), 주요 용도 (primary use), 학습 추천 (learning recommendation)

12. **"흔한 오해" section:**
    - Misconception: "Turtle이 가장 좋은 포맷이니 항상 Turtle만 쓰면 된다"
    - Reality: Each format has its sweet spot. JSON-LD for web integration, N-Triples for big data processing, RDF/XML for legacy system compatibility. Choose based on your use case.

13. **"연결 포인트" callouts:**
    - Phase 6: "Schema.org는 JSON-LD 형식을 권장합니다. Phase 6에서 실제 사용 사례를 봅니다"
    - Phase 7: "Knowledge Graph 시스템은 주로 Turtle(개발)과 N-Triples(대용량 로딩)를 사용합니다"

14. **Summary and next session preview**

---

## Milestone 4: Tools and Practice (Priority High)

### Task 4.1: Generate 06-tools-software.mdx

**File:** `content/phase-4/06-tools-software.mdx`

**Content outline:**

1. **Frontmatter:** title "주요 도구 소개", description about ontology tools and software, difficulty intermediate

2. **Learning objectives (3 bullets):**
   - Identify the purpose of each major ontology tool category (editor, library, database)
   - Understand the recommended learning path for ontology tools
   - Know when to use which tool for different tasks

3. **"왜 필요한가?" opening blockquote:**
   - Standards are useless without tools to work with them. This session maps the tool landscape.

4. **Mermaid diagram -- "이번 세션 전체 그림":**
   - `graph TD` showing learning path: Protege["1단계: Protege"] --> RDFLib["2단계: RDFLib"] --> Triplestore["3단계: 트리플스토어"]
   - Category labels: 에디터, 라이브러리, 데이터베이스

5. **Protege section (300-400 words):**
   - "왜 필요한가?" blockquote: visual understanding first, code later
   - Stanford free/open-source ontology editor
   - GUI-based class hierarchy creation
   - Built-in reasoner integration (HermiT, Pellet)
   - Visualization capabilities
   - Recommended as Step 1 in learning path: see ontology structure visually

6. **Apache Jena section (200-300 words):**
   - Java-based RDF/OWL framework
   - Components: Jena API, ARQ (SPARQL), TDB (storage), Fuseki (SPARQL server)
   - Use case: enterprise Java applications
   - When to choose: production systems with Java stack

7. **RDFLib section (300-400 words):**
   - "왜 필요한가?" blockquote: Python is the most accessible programming language for Korean learners
   - Python-based RDF library
   - Parse, create, query RDF with Python scripts
   - Code example: load Turtle file + run SPARQL query (Python code with Korean comments)
   - Recommended as Step 2: programmatic ontology access

8. **Triplestores section (300-400 words):**
   - "왜 필요한가?" blockquote: production ontology systems need persistent storage and SPARQL endpoints
   - GraphDB: commercial, good free tier, excellent reasoning support
   - Stardog: enterprise knowledge graph platform
   - Blazegraph: open-source, powers Wikidata
   - Apache Jena Fuseki: free SPARQL server bundled with Jena
   - Brief feature comparison
   - Recommended as Step 3: production deployment

9. **Learning path rationale (200-300 words):**
   - Step 1 Protege: visual understanding, no code required, immediate feedback
   - Step 2 RDFLib: scripting, automation, data pipeline integration
   - Step 3 Triplestore: persistent storage, SPARQL endpoints, production readiness
   - Why this order: visual -> programmatic -> production

10. **"흔한 오해" section:**
    - Misconception: "Protege만 알면 온톨로지를 다 할 수 있다"
    - Reality: Protege is excellent for design but production systems need programmatic access (RDFLib/Jena) and persistent storage (triplestores). Each tool serves a different phase of the ontology lifecycle.

11. **"연결 포인트" callouts:**
    - Phase 5: "Phase 5에서 METHONTOLOGY를 배울 때 Protege를 실제로 사용하게 됩니다"
    - Phase 7: "실제 Knowledge Graph 시스템은 트리플스토어 위에서 구축됩니다"

12. **Summary and next session preview**

### Task 4.2: Generate 07-exercises.mdx

**File:** `content/phase-4/07-exercises.mdx`

**Content outline:**

1. **Frontmatter:** title "Phase 4 실습 + 핵심 질문", description about Phase 4 exercises, difficulty intermediate

2. **Phase 4 concept map Mermaid diagram:**
   - `graph TD` connecting all Phase 4 concepts
   - RDF -> RDFS -> OWL (layer stack)
   - SPARQL connected to RDF Graph
   - Serialization formats connected to RDF
   - Tools connected to their respective layers
   - Korean labels throughout

3. **Phase 4 recap (200-300 words):**
   - Brief summary of sessions 01-06
   - Emphasize the layer-cake narrative: each standard builds on the previous

4. **Basic exercises (기본 실습):**

   **Exercise 1: Turtle Triple Writing**
   - Task: Write 10 triples in Turtle format from your own domain
   - Guidance: Use at least 3 different predicates, include URI objects and literals
   - Provide prefix template and 3-4 example triples as starting point
   - Include common predicate suggestions: rdf:type, rdfs:subClassOf, rdfs:label, custom domain properties

   **Exercise 2: RDFLib + SPARQL Practice**
   - Task: Load Turtle file from Exercise 1 using RDFLib, execute 3 SPARQL queries
   - Provide complete Python code template with:
     - `from rdflib import Graph` and setup
     - Query 1 template: find all instances of a type
     - Query 2 template: find properties of an instance
     - Query 3 template: count by type
   - Korean comments in code
   - Expected output description for each query

5. **Challenge exercise (도전 실습):**

   **Exercise 3: Wikidata SPARQL Endpoint**
   - Task: Go to https://query.wikidata.org and execute real queries
   - Provide 2 ready-to-run Wikidata queries:
     - Query A: Korean universities with founding years
     - Query B: Programming languages created after 2010
   - Step-by-step instructions with screenshots description
   - Encourage learner to modify queries and explore

6. **Competency questions (핵심 질문) with guidance:**

   - Question 1: Layer explanation -- with references to Sessions 01, 02, 03
   - Question 2: OWL DL preference -- with reference to Session 03
   - Question 3: SPARQL triple pattern meaning -- with reference to Session 04
   - Question 4: JSON-LD preference for web -- with reference to Session 05

7. **Self-assessment checklist (5 items)**

8. **"연결 포인트" callouts:**
   - Phase 5: "이제 표준과 도구를 알았으니, 체계적으로 온톨로지를 설계하는 방법론을 배울 차례입니다"
   - Phase 6: "Exercise 1에서 만든 Turtle 파일이 실제 표준 온톨로지(FOAF, Schema.org)와 어떻게 다른지 Phase 6에서 비교합니다"

9. **"흔한 오해" section:**
   - Misconception: "문법을 외우는 것이 중요하다"
   - Reality: Turtle and SPARQL syntax can always be looked up. What matters is understanding the underlying data model (triples, graphs) and knowing which tool to use when. Focus on concepts, use references for syntax.

---

## Build Verification

After all 8 files are generated:

1. Run `bun run build` (or `npm run build`) -- zero errors expected
2. Run `bun run dev` and navigate to each Phase 4 page -- all content renders
3. Verify all Mermaid diagrams render without syntax errors
4. Verify all code blocks have proper syntax highlighting
5. Verify no MDX parsing errors in browser console
6. Verify sidebar navigation shows all 8 Phase 4 sessions with Korean labels
7. Verify Turtle and SPARQL code examples display correctly with syntax highlighting

---

## Risk Assessment

### Risk 1: Mermaid Syntax Errors

**Probability:** Medium
**Impact:** Diagrams show error messages instead of visuals
**Mitigation:** Follow S-005 Mermaid syntax constraints strictly. Use `["double quoted labels"]` for all Korean text. Avoid apostrophes. Test diagram types match specification.

### Risk 2: Code Example Syntax Errors

**Probability:** Medium (new risk for Phase 4 vs. earlier phases)
**Impact:** Code examples that do not work when copied by learners erode credibility
**Mitigation:** All Turtle examples must have valid prefix declarations. SPARQL examples must use valid syntax. RDFLib Python code must use current API (rdflib 6.x+). JSON-LD must have valid @context.

### Risk 3: Serialization Format Inconsistency

**Probability:** Medium
**Impact:** If the 4 serialization examples in session 05 represent different triples, the comparison loses its educational value
**Mitigation:** Define a fixed set of 5 triples first, then systematically represent them in all 4 formats. Cross-verify that all formats encode the same graph.

### Risk 4: Technical Inaccuracy in OWL/SPARQL

**Probability:** Low
**Impact:** Incorrect descriptions of OWL decidability or SPARQL semantics undermine technical credibility
**Mitigation:** OWL species descriptions follow W3C OWL 2 specification. SPARQL syntax follows W3C SPARQL 1.1 specification. OWL 2 profile descriptions follow W3C OWL 2 Profiles documentation.

### Risk 5: Cross-Reference Errors

**Probability:** Low
**Impact:** Forward references to nonexistent phases confuse learners
**Mitigation:** Only reference Phase 5-8 (which exist in curriculum). Backward references to Phase 1-3 use general phase descriptions.

---

## Technical Approach

### Content Generation Method

The implementation agent receives this plan and generates MDX content by:

1. **Reading** the current skeleton file for each session (if exists)
2. **Writing** the complete MDX content following the outline in this plan
3. **Verifying** each file against the quality checklist
4. **Cross-checking** code examples for consistency (especially serialization session)
5. **Building** the site to confirm zero errors

### Shared Triple Set for Code Examples

All code examples throughout Phase 4 use this base triple set (in natural language):
1. iPhone15 is manufactured by Apple
2. Apple was founded in 1976
3. iPhone15 is categorized as Smartphone
4. Galaxy S25 is manufactured by Samsung Electronics
5. Samsung Electronics Suwon Factory produces Galaxy S25

This set is represented in Turtle in session 01, queried with SPARQL in session 04, and shown in all 4 formats in session 05.

### No New Dependencies

This SPEC requires no new npm packages, no configuration changes, and no component modifications. It is pure content replacement within existing MDX files.

### File-by-File Execution

Each file is generated independently and can be verified independently, though conceptual dependencies mean sequential generation following the layer-cake order is preferred.

---

## Dependencies

| Dependency | Type | Status |
|-----------|------|--------|
| SPEC-INFRA-001 | Must be completed first | Required |
| `content/phase-4/_meta.js` | Must exist with correct entries | Required (from SPEC-INFRA-001) |
| MermaidDiagram component | Must be functional | Required (from SPEC-INFRA-001) |
| SPEC-CONTENT-P1 through P3 | Learner prerequisite (not build dependency) | Reference |
| Curriculum document (`my-docs/edu-content.md`) | Content source | Reference |
