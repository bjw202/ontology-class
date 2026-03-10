---
id: SPEC-CONTENT-P7
version: "1.0.0"
status: draft
created: "2026-03-10"
updated: "2026-03-10"
author: jw
priority: high
---

# Implementation Plan: SPEC-CONTENT-P7 -- Phase 7 MDX Content Generation

## Overview

This plan details the implementation approach for generating 8 complete MDX content files for Phase 7 ("Ontology Applications") of the Ontology Fundamentals Learning Platform. The work is pure content authoring -- no infrastructure, components, or configuration changes.

Phase 7 is the application-focused phase where learners see how ontology knowledge from Phases 1-6 is applied across diverse real-world domains. The session on LLM/Graph RAG (05) is the most critical and must be treated with special depth and enthusiasm.

---

## Prerequisites

- SPEC-INFRA-001 fully implemented (skeleton MDX files exist, Nextra site builds)
- `content/phase-7/` directory with 8 skeleton MDX files and `_meta.js`
- MermaidDiagram component functional and globally available
- `bun run dev` starts successfully
- Phases 1-6 content referenced for cross-reference accuracy

---

## Implementation Strategy

### Approach: Sequential Content Generation with LLM Session Priority

Content sessions are generated sequentially because each session builds conceptual foundations for the next. However, Session 05 (LLM/Graph RAG) receives priority attention due to its importance:

1. **00-introduction.mdx** first (provides roadmap and framing)
2. **01-semantic-web.mdx** second (establishes web-scale data foundation)
3. **02-knowledge-graphs.mdx** third (builds on Linked Data, introduces KG composition)
4. **03-search-recommendation.mdx** fourth (practical application of KG concepts from 02)
5. **04-nlp-ontology.mdx** fifth (bridges unstructured text to structured knowledge)
6. **05-llm-graph-rag.mdx** sixth -- THE KEY SESSION (builds on all previous sessions, most current topic)
7. **06-manufacturing.mdx** seventh (domain-specific application with Korean emphasis)
8. **07-exercises.mdx** last (synthesizes and tests all prior sessions)

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
- [ ] Real-world analogies included (manufacturing, healthcare, e-commerce, AI/ML)
- [ ] "Problem first, solution second" narrative arc followed
- [ ] YAML frontmatter with title, description, difficulty fields
- [ ] Difficulty set to "intermediate" (not beginner)

### Session 05 Enhanced Quality Checklist (additional)

- [ ] Word count reaches 2,500-3,500 words
- [ ] At least 2 "흔한 오해" sections (including "ontology is outdated" misconception)
- [ ] Engaging, forward-looking tone throughout
- [ ] Concrete pseudocode examples in markdown code blocks
- [ ] Addresses the "ontology is outdated in AI era" narrative directly

---

## Milestone 1: Introduction and Semantic Web Foundation (Priority High)

### Task 1.1: Generate 00-introduction.mdx

**File:** `content/phase-7/00-introduction.mdx`

**Content outline:**

1. **Title block:**
   - Frontmatter: title "Phase 7 소개: 온톨로지의 응용", description, difficulty intermediate
   - H1: "Phase 7: 온톨로지의 응용"

2. **Learning objective section:**
   - State the core learning goal: "자신의 문제에 온톨로지를 적용할 수 있는 판단력을 갖는다"
   - Connection from Phase 6: "사례를 분석했으니, 이제 응용 패턴을 추상화한다"
   - Explain why applications matter: theory without application is incomplete understanding

3. **"왜 필요한가?" blockquotes (3+):**
   - Why seeing applications matters after learning theory
   - Why ontology applications are more relevant now than ever (AI era)
   - Why understanding diverse application domains builds transferable judgment

4. **Application domain map Mermaid diagram:**
   - `graph TD` showing Phase 7's 6 content sessions
   - Central node "온톨로지 응용" branching to: Semantic Web, Knowledge Graphs, Search/Recommendation, NLP, LLM/Graph RAG, Manufacturing
   - Show conceptual flow between sessions

5. **Session overview:**
   - Session 1: Semantic Web and Linked Data
   - Session 2: Knowledge Graphs (Google KG, Wikidata, DBpedia)
   - Session 3: Search and Recommendation Systems
   - Session 4: NLP and Ontology Integration
   - Session 5: LLM Era Ontology -- Graph RAG (highlighted as the key session)
   - Session 6: Manufacturing/Industry Domain Applications

6. **Competency questions preview:**
   - List the 4 questions learners should be able to answer after Phase 7
   - Frame as a challenge

7. **"흔한 오해" section:**
   - Misconception: "온톨로지 응용은 학술 연구에만 쓰인다"
   - Reality: Google, Amazon, Samsung, and every major tech company uses ontology-based systems in production

8. **"연결 포인트" callouts (2+):**
   - Phase 6: "Phase 6에서 분석한 Schema.org, SNOMED CT 등의 사례가 이번 Phase의 응용 패턴으로 일반화됩니다"
   - Phase 8: "모든 응용에는 한계가 있습니다. Phase 8에서 온톨로지의 한계와 대안을 다룹니다"

### Task 1.2: Generate 01-semantic-web.mdx

**File:** `content/phase-7/01-semantic-web.mdx`

**Content outline:**

1. **Frontmatter:** title "시맨틱 웹과 Linked Data", description, difficulty intermediate

2. **Learning objectives (3 bullets):**
   - Explain Tim Berners-Lee's Semantic Web vision and its current realization status
   - State and apply the 4 Linked Data principles
   - Assess which parts of the Semantic Web vision are already realized in everyday technology

3. **"왜 필요한가?" opening blockquote:**
   - Phase 4 taught the languages (RDF, OWL). Now understand the grand vision these languages were created to serve.

4. **Mermaid diagram -- "이번 세션 전체 그림":**
   - `graph LR` showing simplified Semantic Web layer architecture
   - URI/IRI -> RDF -> RDFS -> OWL -> SPARQL
   - Practical examples annotated at each layer (Schema.org, Wikidata)

5. **Tim Berners-Lee's vision (300-500 words):**
   - The 2001 Scientific American article vision
   - Web of Documents -> Web of Data
   - "왜 필요한가?" blockquote about why machines need to understand data, not just display it
   - Current relevance: this vision directly led to what we now call the Knowledge Graph

6. **Linked Data 4 principles (300-500 words):**
   - Each principle explained with concrete URI examples
   - Korean context: KISTI open data, Korean government data portals
   - How following these principles enables data discovery and integration

7. **LOD Cloud (200-300 words):**
   - Scale and growth of the Linked Open Data cloud
   - Key datasets and their interconnections
   - How LOD makes cross-domain queries possible

8. **Partial realization insight (200-300 words):**
   - Full Semantic Web remains incomplete
   - But Schema.org (billions of web pages), Wikidata (100M+ items) are already in production
   - "왜 필요한가?" blockquote about why partial success still transforms how we interact with data

9. **"흔한 오해" section:**
   - Misconception: "시맨틱 웹은 실패한 프로젝트다"
   - Reality: The full vision was ambitious, but its partial implementations power Google search, voice assistants, and Wikipedia -- technologies billions of people use daily

10. **"연결 포인트" callouts:**
    - Phase 4: "Phase 4에서 배운 RDF, OWL, SPARQL이 시맨틱 웹의 핵심 기반 기술입니다"
    - Phase 8: "시맨틱 웹이 완전히 실현되지 못한 이유와 그 한계를 Phase 8에서 분석합니다"

11. **Summary and next session preview**

---

## Milestone 2: Knowledge Graphs and Practical Applications (Priority High)

### Task 2.1: Generate 02-knowledge-graphs.mdx

**File:** `content/phase-7/02-knowledge-graphs.mdx`

**Content outline:**

1. **Frontmatter:** title "지식 그래프", description, difficulty intermediate

2. **Learning objectives (3 bullets):**
   - Explain the composition principle of Knowledge Graphs (ontology + instances + reasoning)
   - Describe how Google KG, Wikidata, and DBpedia work and their differences
   - Recognize the enterprise Knowledge Graph trend and its Korean industry applications

3. **"왜 필요한가?" opening blockquote:**
   - Ontology provides the schema; Knowledge Graph is ontology at scale with real data

4. **Mermaid diagram -- "이번 세션 전체 그림":**
   - `graph TD` showing KG composition: Ontology (Schema) + Instance Data (Facts) + Reasoning Rules
   - Branching to concrete examples: Google KG, Wikidata, DBpedia, Enterprise KG

5. **Google Knowledge Graph (300-400 words):**
   - What appears in Google search right panel
   - How structured data enables the Knowledge Panel
   - Korean Naver Knowledge context
   - "왜 필요한가?" blockquote about why Google invests in structured knowledge despite having LLMs

6. **Wikidata (300-400 words):**
   - Community-maintained structured data
   - SPARQL queryability
   - Properties (P-codes) and items (Q-codes) structure
   - Example query concept

7. **DBpedia (200-300 words):**
   - Automatic RDF extraction from Wikipedia
   - Historical significance: bootstrapped the LOD cloud
   - Comparison with Wikidata

8. **Knowledge Graph composition principle (300-400 words):**
   - Three layers explained with connections to Phase 2 (building blocks) and Phase 3 (reasoning)
   - How layers work together in practice
   - "왜 필요한가?" blockquote about why understanding composition matters for building your own KG

9. **Enterprise Knowledge Graphs (200-300 words):**
   - Internal organizational KGs
   - Korean enterprise context: Samsung SDS, LG CNS, POSCO
   - Use cases: employee expertise, product knowledge, customer relationships

10. **"흔한 오해" section:**
    - Misconception: "지식 그래프는 단순한 그래프 데이터베이스일 뿐이다"
    - Reality: A KG is a graph database + ontology schema + reasoning capability. Without the ontology, it is just a property graph with no semantic understanding.

11. **"연결 포인트" callouts:**
    - Phase 2: "Phase 2에서 배운 클래스, 속성, 관계가 지식 그래프의 온톨로지 계층을 구성합니다"
    - Phase 3: "Phase 3에서 배운 추론 규칙이 지식 그래프에서 새로운 사실을 도출하는 핵심입니다"

12. **Summary and next session preview**

### Task 2.2: Generate 03-search-recommendation.mdx

**File:** `content/phase-7/03-search-recommendation.mdx`

**Content outline:**

1. **Frontmatter:** title "검색 및 추천 시스템", description, difficulty intermediate

2. **Learning objectives (3 bullets):**
   - Explain how ontology enables semantic search beyond keyword matching
   - Describe how ontology-based recommendation systems work and their advantages
   - Recognize the connection between Phase 1 interoperability problems and search/recommendation solutions

3. **"왜 필요한가?" opening blockquote:**
   - Every time you search and miss results, or get irrelevant recommendations, the root cause is the gap between keywords and meaning

4. **Mermaid diagram -- "이번 세션 전체 그림":**
   - `graph LR` dual flow: keyword search (limited) vs. ontology-expanded search (comprehensive)

5. **Keyword search limitations (200-300 words):**
   - Exact matching misses synonyms, hypernyms, related concepts
   - Concrete Korean examples

6. **Ontology-based expanded search (300-500 words):**
   - Mechanism: query term -> ontology concept -> expansion via relationships
   - Korean e-commerce example (노트북/랩탑/울트라북)
   - "왜 필요한가?" blockquote about why semantic expansion matters for user experience

7. **Ontology-based recommendation (300-500 words):**
   - Property-based matching via ontology
   - Beyond collaborative filtering: explainability
   - Korean retail context
   - "왜 필요한가?" blockquote about why explainable recommendations build user trust

8. **Bridging keywords to meaning (200-300 words):**
   - Connection back to Phase 1 interoperability problem
   - Ontology as the semantic bridge

9. **"흔한 오해" section:**
    - Misconception: "딥러닝 기반 검색이 온톨로지 기반 검색을 완전히 대체했다"
    - Reality: Deep learning improves relevance ranking, but ontology provides the semantic structure that deep learning cannot learn from data alone (especially for domain-specific terminology and relationships)

10. **"연결 포인트" callouts:**
    - Phase 1: "Phase 1에서 배운 상호운용성 문제가 바로 검색 시스템에서 '키워드와 의미의 차이'로 나타납니다"
    - Phase 3: "Phase 3에서 배운 추론이 검색 확장의 핵심 메커니즘입니다 -- is-a 관계를 따라 상위/하위 개념으로 확장"

11. **Summary and next session preview**

---

## Milestone 3: NLP Integration (Priority High)

### Task 3.1: Generate 04-nlp-ontology.mdx

**File:** `content/phase-7/04-nlp-ontology.mdx`

**Content outline:**

1. **Frontmatter:** title "NLP와 온톨로지의 결합", description, difficulty intermediate

2. **Learning objectives (3 bullets):**
   - Describe the NER-to-ontology pipeline for converting text to structured knowledge
   - Explain how Relation Extraction produces triples from natural language
   - Recognize how ontology-based text classification leverages class hierarchies

3. **"왜 필요한가?" opening blockquote:**
   - Most of the world's knowledge exists in unstructured text. NLP + ontology is the pipeline that makes it machine-processable.

4. **Mermaid diagram -- "이번 세션 전체 그림":**
   - `graph LR` showing NLP-Ontology pipeline: Raw Text -> NER -> Entity Linking -> Relation Extraction -> Triple Generation -> Ontology Population

5. **NER + Ontology (300-400 words):**
   - Entity extraction and disambiguation via ontology linking
   - Korean example: "삼성전자가 반도체 공장을 평택에 건설했다"
   - "왜 필요한가?" blockquote about disambiguation necessity
   - Korean language specifics that affect NER

6. **Relation Extraction (300-400 words):**
   - Extracting triples from natural text
   - Korean example with same sentence
   - Connection to Phase 4 Triple structure
   - "왜 필요한가?" blockquote about why automated triple extraction scales knowledge graph construction

7. **Ontology-based text classification (200-300 words):**
   - Using class hierarchies as label taxonomies
   - Korean news classification example
   - Multi-granularity advantage

8. **Complete NLP-Ontology pipeline (200-300 words):**
   - End-to-end flow summary
   - Connection to Phase 3 reasoning: populated ontology becomes valuable through reasoning
   - "왜 필요한가?" blockquote about the complete pipeline transforming unstructured data into reasoned knowledge

9. **"흔한 오해" section:**
   - Misconception: "LLM이 NER과 관계 추출을 자동으로 하니까 온톨로지는 필요 없다"
   - Reality: LLMs can extract entities and relations, but without an ontology schema, the extracted information has no structure for reasoning, validation, or integration with other knowledge bases

10. **"연결 포인트" callouts:**
    - Phase 4: "Phase 4에서 배운 Triple(Subject-Predicate-Object) 구조가 관계 추출의 출력 형식입니다"
    - Phase 5: "Phase 5에서 배운 설계 방법론이 NLP 파이프라인의 대상 온톨로지를 만드는 방법입니다"

11. **Summary and next session preview (emphasize: next session is THE session of Phase 7)**

---

## Milestone 4: LLM Era -- The Key Session (Priority Critical)

### Task 4.1: Generate 05-llm-graph-rag.mdx

**File:** `content/phase-7/05-llm-graph-rag.mdx`

This is the most important session of Phase 7. It must be especially detailed (2,500-3,500 words), engaging, and convey the excitement of ontology's re-emergence in the AI era.

**Content outline:**

1. **Frontmatter:** title "LLM 시대의 온톨로지: Graph RAG", description, difficulty intermediate

2. **Learning objectives (3 bullets):**
   - Explain why ontology is more relevant, not less, in the LLM era
   - Describe the Graph RAG architecture and its advantages over standard vector RAG
   - Design a basic Graph RAG scenario for a domain of their choice

3. **"왜 필요한가?" opening blockquote:**
   - Strong, engaging opening: the biggest misconception in AI today is that ontology is outdated. This session shows why the opposite is true.

4. **Mermaid diagram -- "이번 세션 전체 그림":**
   - `graph TD` showing full Graph RAG architecture
   - User Question -> (SPARQL branch to KG) + (vector search branch to Doc DB) -> Merged Context -> LLM -> Verified Answer (with ontology fact-check loop)

5. **The false narrative (200-300 words):**
   - "Ontology is outdated" claim presented
   - Set up the tension the session resolves
   - "왜 필요한가?" blockquote: why debunking this myth matters for your career and your projects

6. **RAG + Ontology hybrid (400-500 words):**
   - Standard RAG explained and its vector-only limitation
   - Instagram/Meta CEO example for multi-hop reasoning
   - How ontology provides relational chains vector search cannot
   - Korean manufacturing example: tracing defect to root process parameter
   - Pseudocode example in markdown code block

7. **LLM output structuring (300-400 words):**
   - Converting LLM text to triples via ontology schema
   - Korean example with Samsung semiconductor revenue
   - Why structured output enables validation and storage
   - "왜 필요한가?" blockquote about unstructured LLM output being useful but unreliable without structure

8. **Hallucination detection via ontology (300-400 words):**
   - The hallucination problem: plausible but wrong
   - Ontology verification: compare against existing KG
   - Seoul/Japan capital example
   - Consistency checking with ontology axioms
   - Why this matters in regulated industries
   - "왜 필요한가?" blockquote about regulated industries needing verifiable facts

9. **Graph RAG architecture (400-500 words):**
   - Full architecture detailed
   - Dual retrieval: SPARQL + vector search
   - Why Graph RAG outperforms: relational reasoning, multi-hop answers, verifiable facts
   - Medical example: drug side effects for multi-condition patients
   - Tools and frameworks: LangChain + Neo4j, LlamaIndex, Microsoft GraphRAG
   - Korean context: healthcare KGs, patent KGs

10. **The re-emergence narrative (200-300 words):**
    - Ontology complements LLMs, does not compete
    - LLMs handle soft language tasks, ontology handles hard logic tasks
    - Together: more reliable, explainable, verifiable AI systems

11. **"흔한 오해" sections (2 required):**
    - Misconception 1: "온톨로지는 AI 시대에 구식이다"
    - Reality: Ontology addresses exactly the weaknesses LLMs have -- hallucination, logical reasoning, relationship traversal, explainability. It is re-emerging as a critical AI infrastructure component.
    - Misconception 2: "벡터 검색만으로 충분하다"
    - Reality: Vector search captures semantic similarity but cannot follow logical relationships. For questions requiring multi-hop reasoning or relational chains, ontology-based structured queries are essential.

12. **"연결 포인트" callouts:**
    - Phase 3: "Phase 3에서 배운 추론(Reasoning)이 Graph RAG에서 지식 그래프 순회의 핵심 메커니즘입니다"
    - Phase 8: "Graph RAG도 만능이 아닙니다. 지식 그래프 구축 비용, 유지보수 부담 등의 한계를 Phase 8에서 다룹니다"

13. **Summary and next session preview**

---

## Milestone 5: Manufacturing Applications (Priority High)

### Task 5.1: Generate 06-manufacturing.mdx

**File:** `content/phase-7/06-manufacturing.mdx`

**Content outline:**

1. **Frontmatter:** title "제조/산업 도메인 응용", description, difficulty intermediate

2. **Learning objectives (3 bullets):**
   - Describe major industry ontology standards (ISO 15926, IFC)
   - Explain how ontology enables AI explainability in manufacturing processes
   - Apply ontology concepts to Korean manufacturing scenarios

3. **"왜 필요한가?" opening blockquote:**
   - Manufacturing is where ontology solves one of AI's biggest practical problems: explaining why an automated system made a specific decision

4. **Mermaid diagram -- "이번 세션 전체 그림":**
   - `graph TD` showing manufacturing ontology ecosystem
   - Process Parameters -> Ontology Layer -> Quality Results
   - Branches to ISO 15926, IFC, Korean manufacturing use cases

5. **ISO 15926 (200-300 words):**
   - Oil/gas plant lifecycle data integration standard
   - Why decades of engineering data needs a shared ontology
   - Korean petrochemical industry context
   - "왜 필요한가?" blockquote about lifecycle data integration

6. **IFC -- Building/Construction BIM (200-300 words):**
   - Industry Foundation Classes for BIM
   - How IFC uses ontology principles
   - Korean smart construction initiatives

7. **Manufacturing process ontology (400-500 words):**
   - Process parameter to quality result modeling
   - Equipment failure pattern knowledge
   - AI explainability in process automation
   - Laser processing example from curriculum
   - Korean manufacturing context: POSCO, Samsung semiconductor, Hyundai Motor
   - "왜 필요한가?" blockquote about why black box AI is unacceptable in quality-critical manufacturing

8. **Ontology as AI explainability tool (300-400 words):**
   - The black box problem in ML/DL
   - Ontology provides reasoning chains: input -> decision -> outcome
   - Regulatory compliance: quality certification requirements
   - "왜 필요한가?" blockquote about regulatory and safety requirements
   - Korean quality standards context

9. **"흔한 오해" section:**
   - Misconception: "제조 분야에서는 센서 데이터와 ML만으로 충분하다"
   - Reality: Sensor data and ML provide predictions, but ontology provides the "why" -- essential for quality audits, regulatory compliance, and continuous improvement

10. **"연결 포인트" callouts:**
    - Phase 3: "Phase 3에서 배운 추론이 제조 공정에서 '왜 이 파라미터를 선택했는지'를 설명하는 기반입니다"
    - Phase 6: "Phase 6에서 분석한 실제 사례들이 제조 도메인에서도 동일한 설계 원칙으로 적용됩니다"

11. **Summary and next session preview**

---

## Milestone 6: Exercises and Assessment (Priority High)

### Task 6.1: Generate 07-exercises.mdx

**File:** `content/phase-7/07-exercises.mdx`

**Content outline:**

1. **Frontmatter:** title "Phase 7 종합 실습", description, difficulty intermediate

2. **Phase 7 concept map Mermaid diagram:**
   - `graph TD` connecting all Phase 7 application domains to "Ontology Core"
   - Show relationships between domains (NLP feeds KG, KG powers Graph RAG, etc.)

3. **Phase 7 recap (200-300 words):**
   - Brief summary of sessions 01-06
   - Emphasize the common thread: ontology provides structured, machine-readable, reasoning-capable knowledge across all domains

4. **Basic exercise -- Wikidata SPARQL queries:**

   10 pre-written, syntactically valid SPARQL queries for Wikidata:
   - Each with Korean explanation of what it does
   - Each with line-by-line annotation
   - Each with expected output description
   - Queries cover diverse domains to show KG breadth
   - Guidance on modifying queries for personal exploration

5. **Challenge exercises:**

   Exercise 2: Graph RAG scenario design
   - Domain description template
   - Entity and relationship template (10+ triples)
   - Sample questions requiring multi-hop reasoning
   - Comparison with vector RAG limitations
   - Example scenario (laser manufacturing QC)

   Exercise 3: LangChain + Neo4j conceptual prototype
   - Small ontology definition template
   - Sample instance data
   - 5 natural language questions requiring KG
   - Query flow description template
   - Tool references with getting-started guidance

6. **Competency questions with guidance (4 questions):**
   - Each with guidance and session references

7. **Self-assessment checklist (7 items)**

8. **"왜 필요한가?" blockquotes (3+):**
   - Why hands-on practice matters
   - Why designing your own scenario builds real skill
   - Why SPARQL competency is a practical asset

9. **"연결 포인트" callouts:**
   - Phase 8: "온톨로지의 응용을 이해했다면, 이제 한계와 대안을 알아야 합니다. Phase 8에서 온톨로지를 맹목적으로 쓰지 않는 판단력을 기릅니다"
   - Phase 5: "실습 2와 3에서 설계한 온톨로지는 Phase 5에서 배운 방법론(Competency Questions, METHONTOLOGY)을 적용한 결과입니다"

10. **"흔한 오해" section:**
    - Misconception: "SPARQL은 너무 복잡해서 실무에서 쓸 수 없다"
    - Reality: Basic SPARQL queries are no harder than SQL. Wikidata Query Service even provides visual query builders. The key is starting simple and building up.

---

## Build Verification

After all 8 files are generated:

1. Run `bun run build` (or `npm run build`) -- zero errors expected
2. Run `bun run dev` and navigate to each Phase 7 page -- all content renders
3. Verify all Mermaid diagrams render without syntax errors
4. Verify no MDX parsing errors in browser console
5. Verify sidebar navigation shows all 8 Phase 7 sessions with Korean labels
6. Verify SPARQL code blocks render correctly in exercises session

---

## Risk Assessment

### Risk 1: Mermaid Syntax Errors

**Probability:** Medium
**Impact:** Diagrams show error messages instead of visuals
**Mitigation:** Follow S-005 Mermaid syntax constraints strictly. Use only safe diagram types. Quote all Korean text labels. The Graph RAG architecture diagram (Session 05) is the most complex and requires careful attention.

### Risk 2: SPARQL Query Syntax Errors

**Probability:** Medium
**Impact:** Exercise queries fail when students try them on Wikidata
**Mitigation:** Each SPARQL query should use standard Wikidata prefixes (wd:, wdt:, rdfs:) and reference well-known properties. Avoid queries that depend on rapidly changing data. Test query patterns against known Wikidata structure.

### Risk 3: Graph RAG Content Outdatedness

**Probability:** Low
**Impact:** Session 05 describes outdated tools or approaches
**Mitigation:** Reference established frameworks (LangChain, LlamaIndex, Neo4j) that have stable APIs. Describe concepts rather than specific API calls. Note that the field is evolving rapidly and tools may change.

### Risk 4: Korean Manufacturing Example Inaccuracy

**Probability:** Low
**Impact:** Examples feel unrealistic to Korean manufacturing professionals
**Mitigation:** Use well-known Korean companies (Samsung, POSCO, Hyundai) in general terms. Reference real industry initiatives (smart factory, Industry 4.0) without fabricating specific statistics. Use the laser processing example from the curriculum.

### Risk 5: Content Depth Insufficiency for Session 05

**Probability:** Low
**Impact:** The most important session feels superficial
**Mitigation:** Session 05 has an elevated word count target (2,500-3,500 words) and requires enhanced quality checklist items. The content outline provides detailed structure for each section.

### Risk 6: Cross-Reference Errors

**Probability:** Low
**Impact:** References to concepts from Phase 1-6 that were not actually covered
**Mitigation:** Only reference content that is confirmed in the curriculum document (edu-content.md). Use general phase descriptions rather than specific session filenames from other phases.

---

## Technical Approach

### Content Generation Method

The implementation agent receives this plan and generates MDX content by:

1. **Reading** the current skeleton file for each session
2. **Writing** the complete MDX content following the outline in this plan
3. **Verifying** each file against the quality checklist
4. **Building** the site to confirm zero errors

### No New Dependencies

This SPEC requires no new npm packages, no configuration changes, and no component modifications. It is pure content replacement within existing MDX files.

### File-by-File Execution

Each file is generated independently and can be verified independently. If one session has issues, it does not block others (though conceptual dependencies mean sequential generation is preferred).

---

## Dependencies

| Dependency | Type | Status |
|-----------|------|--------|
| SPEC-INFRA-001 | Must be completed first | Required |
| `content/phase-7/_meta.js` | Must exist with correct entries | Required (from SPEC-INFRA-001) |
| MermaidDiagram component | Must be functional | Required (from SPEC-INFRA-001) |
| Curriculum document (`my-docs/edu-content.md`) | Content source | Reference |
| Phases 1-6 content | For cross-reference accuracy | Reference |
| SPEC-CONTENT-P1 through SPEC-CONTENT-P6 | Earlier phase content | Reference (for cross-reference validation) |
