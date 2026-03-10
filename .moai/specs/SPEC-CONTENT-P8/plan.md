---
id: SPEC-CONTENT-P8
version: "1.0.0"
status: draft
created: "2026-03-10"
updated: "2026-03-10"
author: jw
priority: high
---

# Implementation Plan: SPEC-CONTENT-P8 -- Phase 8 MDX Content Generation

## Overview

This plan details the implementation approach for generating 8 complete MDX content files for Phase 8 ("Limits and Alternatives") of the Ontology Fundamentals Learning Platform. Phase 8 is the final phase of the course. The work is pure content authoring -- no infrastructure, components, or configuration changes.

The session 07-exercises.mdx carries additional weight as the course conclusion, requiring comprehensive review across all 8 phases and a satisfying wrap-up experience for learners.

---

## Prerequisites

- SPEC-INFRA-001 fully implemented (skeleton MDX files exist, Nextra site builds)
- `content/phase-8/` directory with 8 skeleton MDX files and `_meta.js`
- MermaidDiagram component functional and globally available
- `bun run dev` starts successfully
- Phases 1-7 content complete (for accurate back-references)

---

## Implementation Strategy

### Approach: Sequential Content Generation

Content sessions are generated sequentially because each session builds analytical depth for the next:

1. **00-introduction.mdx** first (provides Phase 8 framing and course completion context)
2. **01-cost-reality.mdx** second (establishes the "why limitations matter" foundation with concrete costs)
3. **02-mapping-problems.mdx** third (builds on cost awareness with technical challenges)
4. **03-vector-embeddings.mdx** fourth (introduces the primary alternative technology)
5. **04-comparison.mdx** fifth (broadens comparison to all alternatives using embedding context from 03)
6. **05-decision-tree.mdx** sixth (synthesizes all comparisons into a decision framework)
7. **06-when-not-to-use.mdx** seventh (applies the decision tree to concrete scenarios)
8. **07-exercises.mdx** last (tests Phase 8 learning and concludes the entire course)

### Content Quality Checklist (per session)

Before marking any session complete, verify:
- [ ] At least 3 "왜 필요한가?" blockquotes present
- [ ] At least 2 "연결 포인트" callouts present (back-references to Phases 1-7)
- [ ] At least 1 "흔한 오해" section present
- [ ] Exactly 1 Mermaid diagram labeled "이번 세션 전체 그림"
- [ ] Mermaid syntax is safe (no apostrophes, no `+` in stateDiagram-v2)
- [ ] All Korean content, English terms defined on first use
- [ ] No JSX imports in MDX
- [ ] Each concept explanation is 300-500 words
- [ ] Real-world analogies included (manufacturing, healthcare, e-commerce, fintech)
- [ ] "Situation -> reality check -> alternative -> decision criterion" narrative arc followed
- [ ] YAML frontmatter with title, description, difficulty: "intermediate"

---

## Milestone 1: Introduction and Cost Foundation (Priority High)

### Task 1.1: Generate 00-introduction.mdx

**File:** `content/phase-8/00-introduction.mdx`

**Content outline:**

1. **Title block:**
   - Frontmatter: title "Phase 8 소개: 한계와 대안", description about Phase 8 overview, difficulty intermediate
   - H1: "Phase 8: 한계와 대안"

2. **Learning objective section:**
   - State the core learning goal: "온톨로지를 맹목적으로 쓰지 않고, 적재적소에 선택할 수 있는 판단력을 갖는다"
   - Phase 7 connection: "응용을 알았다면, 언제 쓰지 말아야 하는지도 알아야 진짜 실력이다"
   - Emphasize: knowing when NOT to use a tool is as important as knowing how to use it

3. **"왜 필요한가?" blockquotes (3+):**
   - Why understanding limitations makes you a better practitioner
   - Why this is the difference between a beginner and an expert
   - Why the final phase is about judgment, not just knowledge

4. **Roadmap Mermaid diagram:**
   - `graph TD` showing Phase 8's 7 content sessions
   - Arrows showing conceptual flow from cost -> mapping -> embeddings -> comparison -> decision tree -> when-not-to-use -> exercises
   - Korean labels for each node

5. **Session overview:**
   - Session 1: Real-world construction and maintenance costs
   - Session 2: Ontology mapping challenges (the "turtles" problem)
   - Session 3: Vector embeddings as the primary alternative/complement
   - Session 4: Comprehensive technology comparison
   - Session 5: Decision tree for technology selection (centerpiece)
   - Session 6: Concrete scenarios where ontology is overkill
   - Session 7: Exercises + comprehensive course conclusion

6. **Competency questions preview:**
   - List the 3 course comprehensive questions learners should be able to answer
   - Frame as: "이 질문에 자신 있게 답할 수 있다면, 당신은 온톨로지의 전체 그림을 이해한 것입니다"

7. **"흔한 오해" section:**
   - Misconception: "이 Phase는 온톨로지를 부정하는 내용이다"
   - Reality: Phase 8 does not negate ontology -- it completes your understanding by adding judgment to knowledge

8. **"연결 포인트" callouts (2+):**
   - Phase 1: "Phase 1에서 '왜 온톨로지가 필요한가?'를 배웠습니다. 이제 '왜 온톨로지가 필요하지 않은가?'를 배워 완전한 판단력을 갖춥니다"
   - Phase 7: "Phase 7의 응용 사례를 기억하세요. 그 사례들이 언제 적합하고 언제 과한지를 이 Phase에서 판별합니다"

### Task 1.2: Generate 01-cost-reality.mdx

**File:** `content/phase-8/01-cost-reality.mdx`

**Content outline:**

1. **Frontmatter:** title "온톨로지 구축의 현실적 비용", description about real-world costs, difficulty intermediate

2. **Learning objectives (3 bullets):**
   - Assess the human resource costs of ontology construction
   - Understand why maintenance is harder than initial construction
   - Evaluate performance trade-offs in large-scale ontology reasoning

3. **"왜 필요한가?" opening blockquote:**
   - Why cost awareness prevents failed ontology projects: many organizations start with enthusiasm but abandon ontology projects when costs become unsustainable

4. **Mermaid diagram -- "이번 세션 전체 그림":**
   - `graph LR` showing cost factors: domain expert collaboration -> construction cost -> maintenance cost -> performance cost
   - Each node with Korean cost descriptions

5. **Human resource cost section (300-500 words):**
   - "왜 필요한가?" blockquote: why understanding collaboration challenges matters
   - Domain expert + ontology engineer collaboration model
   - Communication gap: domain experts lack formal logic, engineers lack domain depth
   - Korean market context: scarcity of qualified ontology engineers
   - Concrete cost indicator: months of expert collaboration for a medium-complexity ontology

6. **Maintenance cost section (300-500 words):**
   - "왜 필요한가?" blockquote: why ongoing cost often exceeds initial cost
   - Domain knowledge evolution requires axiom updates
   - Medical ontology example: new diseases, updated treatment protocols
   - Manufacturing ontology example: new production lines, regulatory changes
   - The "living document" burden: ontology is never finished
   - "연결 포인트 -> Phase 5": design methodology determines maintainability

7. **Performance cost section (300-500 words):**
   - Large-scale ontology reasoning performance degradation
   - SNOMED CT full reasoning impracticality
   - OWL profile trade-offs: EL (classification), QL (query answering), RL (rules)
   - "연결 포인트 -> Phase 3": reasoning mechanisms covered there have computational costs

8. **Pre-assessment principle (200-300 words):**
   - Decision framework: can you sustain the maintenance cost?
   - Cost-benefit evaluation template for ontology projects

9. **"흔한 오해" section:**
   - Misconception: "오픈소스 도구를 쓰면 온톨로지 구축 비용이 거의 들지 않는다"
   - Reality: Tools are free, but the human expertise cost dominates. Protege is free; the years of training to use it effectively are not.

10. **Summary and next session preview**

---

## Milestone 2: Technical Challenges (Priority High)

### Task 2.1: Generate 02-mapping-problems.mdx

**File:** `content/phase-8/02-mapping-problems.mdx`

**Content outline:**

1. **Frontmatter:** title "온톨로지 매핑 문제", description about ontology mapping challenges, difficulty intermediate

2. **Learning objectives (3 bullets):**
   - Understand the ontology mapping problem and why it arises
   - Evaluate automated mapping tools and their accuracy limitations
   - Recognize the "turtles all the way down" recursion problem

3. **"왜 필요한가?" opening blockquote:**
   - Why mapping is unavoidable in multi-ontology environments and why it creates new problems

4. **Mermaid diagram -- "이번 세션 전체 그림":**
   - `graph TD` showing two ontologies with concept nodes connected by uncertain mapping arrows
   - A meta-ontology layer above with recursive arrow indicating the "turtles" problem

5. **Ontology mapping concept (300-500 words):**
   - Define ontology mapping with concrete examples
   - Healthcare context: ICD, SNOMED CT, MeSH interoperability
   - Korean healthcare: 건강보험심사평가원 bridging classification systems
   - "왜 필요한가?" blockquote about real-world integration necessity

6. **Automated mapping tools (300-400 words):**
   - LogMap and AgreementMakerLight description
   - How they work: string matching, structural analysis, semantic anchoring
   - Accuracy ceiling: automated tools miss nuanced domain distinctions
   - Human review bottleneck: every automated mapping requires expert validation
   - "연결 포인트 -> Phase 4": SPARQL and OWL tools from Phase 4 are used in these systems

7. **"Turtles all the way down" problem (300-500 words):**
   - "왜 필요한가?" blockquote: why understanding this recursion matters
   - Mapping requires a bridging ontology -> bridging ontology needs alignment -> infinite regress
   - Theoretical limitation, not just engineering difficulty
   - Analogy: translating between languages needs a translator -- who validates the translator?
   - "연결 포인트 -> Phase 2": the axioms and properties from Phase 2 define what mapping must preserve

8. **Standard ontology reuse principle (200-300 words):**
   - Reusing standard ontologies from the start prevents post-hoc mapping
   - "연결 포인트 -> Phase 6": standard ontologies (FOAF, Schema.org, Gene Ontology, SNOMED CT) exist precisely for this reason
   - Practical guidance: "design with standards first, customize later"

9. **"흔한 오해" section:**
   - Misconception: "온톨로지 매핑은 자동화 도구로 완전히 해결할 수 있다"
   - Reality: Automated tools provide candidates, but domain experts must validate every mapping. Full automation is an unsolved research problem.

10. **Summary and next session preview**

---

## Milestone 3: Alternatives and Comparison (Priority High)

### Task 3.1: Generate 03-vector-embeddings.mdx

**File:** `content/phase-8/03-vector-embeddings.mdx`

**Content outline:**

1. **Frontmatter:** title "벡터 임베딩과의 비교", description about comparison with vector embeddings, difficulty intermediate

2. **Learning objectives (3 bullets):**
   - Compare ontology and vector embedding approaches across 5 dimensions
   - Identify scenarios where each approach excels
   - Understand the Neurosymbolic AI research direction combining both

3. **"왜 필요한가?" opening blockquote:**
   - Why understanding the embedding alternative is critical in the LLM era

4. **Mermaid diagram -- "이번 세션 전체 그림":**
   - `graph LR` showing parallel paths: ontology (explicit rules -> logical reasoning -> derived facts) and embedding (training data -> vector space -> similarity), converging at "Neurosymbolic AI"

5. **Comparison table (presented as markdown):**
   - 5 dimensions: meaning representation, reasoning capability, construction cost, explainability, adding new concepts
   - Clear Korean descriptions for each cell
   - "왜 필요한가?" blockquote before the table: why systematic comparison beats gut feeling

6. **Ontology strengths detail (300-500 words):**
   - Explicit, auditable knowledge
   - Logical reasoning derives new facts
   - Full explainability: every inference traceable to axioms
   - Stable under incremental changes
   - "연결 포인트 -> Phase 3": reasoning capability is the core differentiator

7. **Vector embedding strengths detail (300-500 words):**
   - "왜 필요한가?" blockquote: why embeddings have become dominant in modern AI
   - Automatic learning from large corpora
   - Nuanced semantic similarity beyond formal logic
   - Scales to millions of concepts
   - Handles ambiguity through distributional semantics
   - LLM integration: embeddings are the native language of neural networks
   - "연결 포인트 -> Phase 7": the Graph RAG pattern from Phase 7 combines both approaches

8. **Complementary relationship (200-300 words):**
   - NOT competitors but complementary
   - Neurosymbolic AI definition and research direction
   - Example workflow: embeddings for discovery, ontology for validation
   - Graph Neural Networks on ontology structures as a frontier

9. **"흔한 오해" section:**
   - Misconception: "LLM 시대에 온톨로지는 더 이상 필요 없다"
   - Reality: LLMs generate text but cannot guarantee logical consistency. Ontology provides the formal backbone that LLMs lack. The combination is more powerful than either alone.

10. **Summary and next session preview**

### Task 3.2: Generate 04-comparison.mdx

**File:** `content/phase-8/04-comparison.mdx`

**Content outline:**

1. **Frontmatter:** title "비교 분석: 온톨로지 vs 대안 기술", description about technology comparison, difficulty intermediate

2. **Learning objectives (3 bullets):**
   - Compare ontology with Property Graph (Neo4j) for different use cases
   - Distinguish when relational DB suffices vs. when ontology is needed
   - Choose between OWL, RDFS, and SKOS based on requirement complexity

3. **"왜 필요한가?" opening blockquote:**
   - Why knowing all alternatives prevents over-engineering with ontology

4. **Mermaid diagram -- "이번 세션 전체 그림":**
   - `graph TD` showing 5 technologies (OWL, Property Graph, RDBMS, SKOS, RDFS) with strengths and ideal use case annotations

5. **Ontology vs Property Graph (300-500 words):**
   - "왜 필요한가?" blockquote: graph databases are often confused with ontologies
   - Property Graph: optimized for traversal and analytics (shortest path, cycle detection, PageRank)
   - Ontology: optimized for logical inference and consistency checking
   - OWA vs CWA distinction
   - Korean fintech context: Neo4j for fraud detection as graph analytics example
   - "연결 포인트 -> Phase 3": reasoning vs. traversal is the key distinction from Phase 3

6. **Ontology vs Relational Database (300-400 words):**
   - When data fits tables and relationships are simple -> RDBMS wins
   - Ontology adds value for flexible schemas and relationship reasoning
   - Example: inventory (RDBMS) vs. drug interactions (ontology)
   - "왜 필요한가?" blockquote: most business data still lives in relational databases

7. **Ontology vs SKOS/RDFS (300-400 words):**
   - "왜 필요한가?" blockquote: lightweight alternatives avoid OWL overhead
   - SKOS for taxonomies, thesauri, controlled vocabularies
   - RDFS for lightweight class/property hierarchies
   - Decision criterion: "Do you need axioms and reasoning? If no, SKOS or RDFS suffices"
   - "연결 포인트 -> Phase 4": RDF/RDFS/OWL ecosystem context from Phase 4

8. **Comprehensive comparison table:**
   - Rows: OWL Ontology, Property Graph, Relational DB, SKOS, RDFS
   - Columns: Reasoning, Graph Analytics, Schema Flexibility, Learning Curve, Community Size, Construction Cost

9. **"흔한 오해" section:**
   - Misconception: "Knowledge Graph와 Ontology는 같은 것이다"
   - Reality: Knowledge Graphs use ontology as a schema layer but may be implemented with Property Graphs, RDF stores, or even relational databases. The ontology is the schema; the Knowledge Graph is the data.

10. **Summary and next session preview**

---

## Milestone 4: Decision Framework (Priority High)

### Task 4.1: Generate 05-decision-tree.mdx

**File:** `content/phase-8/05-decision-tree.mdx`

**Content outline:**

1. **Frontmatter:** title "온톨로지 선택 의사결정 트리", description about technology decision framework, difficulty intermediate

2. **Learning objectives (3 bullets):**
   - Apply a structured decision tree to evaluate technology choices
   - Identify the key discriminating question: "Is reasoning required?"
   - Map common real-world scenarios to appropriate technology choices

3. **"왜 필요한가?" opening blockquote:**
   - Why a systematic decision framework prevents both over-engineering and under-engineering

4. **Mermaid flowchart -- "이번 세션 전체 그림" (CENTERPIECE):**
   - `flowchart TD` with decision diamonds and outcome rectangles
   - Root: "추론이 필요한가?"
   - No branch: "그래프 탐색/분석이 주목적인가?" -> Yes: Property Graph -> No: "계층 구조만 필요한가?" -> Yes: RDFS/SKOS -> No: 관계형 DB/JSON
   - Yes branch: "도메인 표준 온톨로지가 있는가?" -> Yes: 재사용 + 확장 (OWL DL) -> No: 직접 설계 (OWL DL)
   - All labels in Korean, clean visual hierarchy
   - This is the MOST IMPORTANT diagram in Phase 8

5. **Decision node explanations (400-600 words total):**
   - "추론이 필요한가?": Define reasoning (deriving new facts, consistency checking, automatic classification)
   - "그래프 탐색 vs 추론": shortest path, cycle detection, PageRank = analytics, not reasoning
   - "계층 구조만?": if only parent-child "is-a" relationships, full OWL unnecessary
   - "표준 온톨로지 있는가?": reuse is always preferable (Phase 6 connection)
   - "직접 설계": apply methodology from Phase 5

6. **Real-world application examples (300-400 words):**
   - Manufacturing quality control: reasoning needed -> ISA-95 exists -> reuse + extend
   - E-commerce product catalog: no reasoning -> hierarchy -> SKOS
   - Social network analysis: no reasoning -> graph traversal -> Neo4j
   - Medical diagnosis support: reasoning needed -> SNOMED CT exists -> reuse + extend
   - "왜 필요한가?" blockquote: why applying the tree to real cases cements understanding

7. **"연결 포인트" callouts:**
   - Phase 5: "의사결정 트리에서 '직접 설계'에 도달하면, Phase 5의 설계 방법론이 가이드가 됩니다"
   - Phase 6: "재사용 + 확장 경로에서는 Phase 6에서 배운 표준 온톨로지가 출발점입니다"

8. **"흔한 오해" section:**
   - Misconception: "추론이 필요할 것 같으면 무조건 OWL을 쓰면 된다"
   - Reality: "Reasoning might be useful" is not the same as "reasoning is required." Ask: "Will the system need to derive facts that are not explicitly stated?" If the answer is not a clear yes, simpler alternatives may suffice.

9. **Summary and next session preview**

### Task 4.2: Generate 06-when-not-to-use.mdx

**File:** `content/phase-8/06-when-not-to-use.mdx`

**Content outline:**

1. **Frontmatter:** title "언제 온톨로지가 과한가?", description about when ontology is overkill, difficulty intermediate

2. **Learning objectives (3 bullets):**
   - Identify 4 concrete scenarios where ontology is overkill
   - Match each scenario to the appropriate simpler technology
   - Apply the "simplest tool that solves the problem" principle

3. **"왜 필요한가?" opening blockquote:**
   - Why recognizing overkill saves time, money, and frustration

4. **Mermaid diagram -- "이번 세션 전체 그림":**
   - `graph LR` showing four scenarios (SEO, graph analytics, tabular data, simple taxonomy) each pointing to their appropriate solution (JSON-LD, Neo4j, RDBMS, SKOS)

5. **Scenario 1: JSON-LD for SEO (300-400 words):**
   - "왜 필요한가?" blockquote: web developers often hear "you need structured data" and jump to ontology
   - JSON-LD with Schema.org is sufficient for search engine structured data
   - No axioms, no reasoning, no design methodology needed
   - Korean e-commerce example: adding product structured data
   - "연결 포인트 -> Phase 6": Schema.org covered there is exactly what you need

6. **Scenario 2: Property Graph for graph analytics (300-400 words):**
   - "왜 필요한가?" blockquote: graph analysis does not require ontology reasoning
   - Fraud detection, recommendation engines, social network analysis
   - Neo4j handles traversal queries with native graph processing
   - Korean banking context: graph-based fraud detection
   - "연결 포인트 -> Phase 7": some Phase 7 applications used Knowledge Graphs, but the graph layer can be a Property Graph

7. **Scenario 3: Relational DB for tabular data (300-400 words):**
   - "왜 필요한가?" blockquote: the vast majority of business data fits tables
   - Well-defined schemas with ACID transactions
   - Inventory, accounts, transactions
   - Korean SME context: basic inventory management does not need ontology
   - Ontology adds no value when relationships are simple and stable

8. **Scenario 4: RDFS/SKOS for simple classification (300-400 words):**
   - "왜 필요한가?" blockquote: many "ontology" projects are actually just classification tasks
   - SKOS handles broader/narrower relationships efficiently
   - RDFS provides lightweight hierarchy
   - Korean government context: document classification systems
   - "연결 포인트 -> Phase 4": RDFS and SKOS were introduced in Phase 4's standards ecosystem

9. **Summary principle:**
   - "The best tool is the simplest one that solves the problem"
   - Ontology is right ONLY when reasoning over complex relationships is genuinely required

10. **"흔한 오해" section:**
    - Misconception: "온톨로지를 쓰면 항상 더 좋은 결과를 얻을 수 있다"
    - Reality: Ontology adds complexity. When that complexity does not provide reasoning benefits, it becomes pure overhead with maintenance burden and no additional value.

11. **Summary and next session preview**

---

## Milestone 5: Course Conclusion (Priority High)

### Task 5.1: Generate 07-exercises.mdx

**File:** `content/phase-8/07-exercises.mdx`

**Content outline:**

1. **Frontmatter:** title "Phase 8 실습 + 코스 종합 마무리", description about exercises and course conclusion, difficulty intermediate

2. **Complete 8-Phase concept map Mermaid diagram:**
   - `graph TD` connecting ALL 8 Phases
   - Phase 1 (Motivation) -> Phase 2 (Building Blocks) -> Phase 3 (Logic) -> Phase 4 (Standards) -> Phase 5 (Methodology) -> Phase 6 (Standard Ontologies) -> Phase 7 (Applications) -> Phase 8 (Limits)
   - Cross-connections showing Phase 1 <-> Phase 8 (full circle: why use -> when not to use)
   - Korean labels throughout

3. **Phase 8 recap (200-300 words):**
   - Brief summary of sessions 01-06
   - Emphasize the narrative arc: cost awareness -> technical limitations -> alternatives -> decision framework -> practical judgment

4. **Basic exercise (기본 실습):**

   **Exercise 1:** Decision Tree Application
   - Task: Select 3 projects/problems you know and apply the decision tree
   - For each: Is reasoning needed? What technology fits?
   - Structured answer template provided
   - Examples to guide thinking

5. **Challenge exercise (도전 실습):**

   **Exercise 2:** Practical Comparison
   - Task: Take one domain, represent it in both Neo4j and Protege
   - Compare: what can ontology express that Property Graph cannot? What queries are easier in Neo4j?
   - Suggested domains: university courses, movie database, product catalog
   - Guidance on setting up both tools
   - Documentation template for findings

6. **Course comprehensive questions (코스 종합 핵심 질문 3개):**

   **Question 1:** "온톨로지가 반드시 필요한 상황과 다른 기술로 충분한 상황을 구분하는 핵심 기준은 무엇인가?"
   - Guidance: reasoning requirement is the key discriminator
   - Reference: Session 05 decision tree, Session 06 scenarios

   **Question 2:** "온톨로지와 벡터 임베딩의 근본적 차이는 무엇이고, 둘을 함께 쓰면 어떤 이점이 있는가?"
   - Guidance: explicit vs. statistical knowledge, Neurosymbolic AI
   - Reference: Session 03 comparison

   **Question 3:** "8개 Phase를 통해 배운 온톨로지의 전체 여정을 한 문단으로 요약할 수 있는가?"
   - Guidance: synthesize from motivation through building blocks, reasoning, standards, methodology, examples, applications, to limits
   - Reference: all 8 phases

7. **Course completion self-assessment checklist (전체 8 Phase 복습):**
   - Phase 1: "데이터, 정보, 지식의 차이를 실무 사례로 설명할 수 있다"
   - Phase 2: "클래스, 인스턴스, 속성, 공리의 관계를 설명할 수 있다"
   - Phase 3: "Description Logic 기반 추론이 어떻게 작동하는지 설명할 수 있다"
   - Phase 4: "RDF, RDFS, OWL, SPARQL의 역할과 관계를 설명할 수 있다"
   - Phase 5: "온톨로지 설계 방법론의 주요 단계를 적용할 수 있다"
   - Phase 6: "FOAF, Schema.org, Gene Ontology, SNOMED CT의 특징과 용도를 비교할 수 있다"
   - Phase 7: "Knowledge Graph, 제조업, LLM 시대의 온톨로지 활용 사례를 설명할 수 있다"
   - Phase 8: "온톨로지가 적합하지 않은 상황을 판별하고 대안을 제시할 수 있다"

8. **Recommended resources (추천 참고 자료):**

   **Beginner (입문):**
   - "Ontology Engineering" by Keet (introductory textbook)
   - Protege official tutorials
   - W3C OWL 2 Primer

   **Intermediate (중급):**
   - "Foundations of Semantic Web Technologies" by Hitzler et al.
   - OWL 2 specification documents
   - SPARQL 1.1 specification

   **LLM Integration (LLM 연계):**
   - Graph RAG research papers and tutorials
   - Neurosymbolic AI survey papers
   - Knowledge Graph + LLM integration patterns

   **Practice Environments (실습 환경):**
   - Protege desktop (download link guidance)
   - WebVOWL for visualization
   - Neo4j Sandbox for graph database experimentation
   - Public SPARQL endpoints (DBpedia, Wikidata)

9. **Course completion message:**
   - "왜 필요한가?" blockquote: why completing all 8 phases matters for real-world application
   - Congratulatory message acknowledging the journey from Phase 1 to Phase 8
   - Encouragement to apply concepts to learner's own domain
   - "The mark of true understanding is not knowing ontology, but knowing when and how to use it"
   - Call to revisit earlier phases as reference material whenever needed

10. **"연결 포인트" callouts:**
    - Phase 1: "Phase 1에서 시작한 '왜 필요한가?'의 답을 이제 완전하게 갖추었습니다"
    - Phase 5: "자신만의 온톨로지 프로젝트를 시작할 때, Phase 5의 설계 방법론으로 돌아가세요"

11. **"흔한 오해" section:**
    - Misconception: "코스를 마치면 온톨로지 전문가가 된다"
    - Reality: This course provides the foundational understanding and decision framework. True expertise comes from applying these concepts repeatedly in real projects. Keep practicing, keep building, keep questioning.

---

## Build Verification

After all 8 files are generated:

1. Run `bun run build` (or `npm run build`) -- zero errors expected
2. Run `bun run dev` and navigate to each Phase 8 page -- all content renders
3. Verify all Mermaid diagrams render without syntax errors, paying special attention to:
   - 05-decision-tree.mdx flowchart (most complex diagram)
   - 07-exercises.mdx 8-Phase concept map (largest diagram)
4. Verify no MDX parsing errors in browser console
5. Verify sidebar navigation shows all 8 Phase 8 sessions with Korean labels
6. Verify back-references to earlier phases are correct (Phase numbers 1-7)

---

## Risk Assessment

### Risk 1: Mermaid Flowchart Complexity

**Probability:** Medium-High
**Impact:** The decision tree in 05-decision-tree.mdx is the most complex Mermaid diagram in the entire course. Syntax errors or visual overflow are likely.
**Mitigation:** Use `flowchart TD` (not `graph TD`) for proper diamond decision shapes. Keep node labels concise. Test with safe characters only. Use the exact pattern from S-005 as a template.

### Risk 2: 8-Phase Concept Map Size

**Probability:** Medium
**Impact:** The comprehensive concept map in 07-exercises.mdx connecting all 8 phases may be too large to render clearly.
**Mitigation:** Use high-level phase names (not individual sessions). Limit cross-connections to the most important relationships (Phase 1 <-> Phase 8, sequential flow). Keep the diagram to 15-20 nodes maximum.

### Risk 3: Comparison Accuracy

**Probability:** Low-Medium
**Impact:** Inaccurate characterization of Neo4j, SKOS, or vector embeddings could undermine educational credibility.
**Mitigation:** Stick to well-established distinctions (reasoning vs. analytics, CWA vs. OWA, explicit vs. statistical). Avoid claims about specific performance numbers unless sourced.

### Risk 4: Course Conclusion Tone

**Probability:** Low
**Impact:** An overly academic or flat conclusion could diminish the learning experience.
**Mitigation:** Use encouraging, warm-but-professional Korean tone. Acknowledge the learner's effort explicitly. End with a forward-looking call to action, not a dry summary.

### Risk 5: Cross-Reference Accuracy

**Probability:** Low
**Impact:** Incorrect back-references to earlier phases would confuse learners.
**Mitigation:** Only reference specific phase numbers and topics that are confirmed in the curriculum. Do not reference specific session filenames from other phases -- use generic phase descriptions.

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

Each file is generated independently and can be verified independently. The sequential order is preferred for conceptual consistency, but each file stands alone as a complete educational session.

---

## Dependencies

| Dependency | Type | Status |
|-----------|------|--------|
| SPEC-INFRA-001 | Must be completed first | Required |
| SPEC-CONTENT-P1 through P7 | Content reference for back-references | Required |
| `content/phase-8/_meta.js` | Must exist with correct entries | Required (from SPEC-INFRA-001) |
| MermaidDiagram component | Must be functional | Required (from SPEC-INFRA-001) |
| Curriculum document (`my-docs/edu-content.md`) | Content source | Reference |
