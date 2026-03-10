---
id: SPEC-CONTENT-P5
version: "1.0.0"
status: draft
created: "2026-03-10"
updated: "2026-03-10"
author: jw
priority: high
---

# Implementation Plan: SPEC-CONTENT-P5 -- Phase 5 MDX Content Generation

## Overview

This plan details the implementation approach for generating 8 complete MDX content files for Phase 5 ("Ontology Design Methodology") of the Ontology Fundamentals Learning Platform. The work is pure content authoring -- no infrastructure, components, or configuration changes.

---

## Prerequisites

- SPEC-INFRA-001 fully implemented (skeleton MDX files exist, Nextra site builds)
- `content/phase-5/` directory with 8 skeleton MDX files and `_meta.js`
- MermaidDiagram component functional and globally available
- `bun run dev` starts successfully
- Phase 1-4 content completed or in progress (Phase 5 references Phase 4 language concepts)

---

## Implementation Strategy

### Approach: Sequential Content Generation

Content sessions are generated sequentially because each session builds conceptual foundations for the next:

1. **00-introduction.mdx** first (provides roadmap and framing for the entire phase)
2. **01-methontology.mdx** second (establishes the process framework that all other sessions reference)
3. **02-competency-questions.mdx** third (teaches the scope definition technique used before any design)
4. **03-top-down-design.mdx** fourth (builds on CQ-defined scope to explore design directions)
5. **04-bottom-up-design.mdx** fifth (extends design strategies with reuse -- assumes understanding of design approaches)
6. **05-anti-patterns.mdx** sixth (identifies mistakes in the design techniques taught in 01-04)
7. **06-quality-criteria.mdx** seventh (evaluates the quality of designs made using techniques from 01-05)
8. **07-exercises.mdx** last (synthesizes and tests all prior sessions)

### Content Quality Checklist (per session)

Before marking any session complete, verify:
- [ ] At least 3 "왜 필요한가?" blockquotes present
- [ ] At least 2 "연결 포인트" callouts present (referencing Phase 6 and/or Phase 7)
- [ ] At least 1 "흔한 오해" section present
- [ ] Exactly 1 Mermaid diagram labeled "이번 세션 전체 그림"
- [ ] Mermaid syntax is safe (no apostrophes, no `+` in stateDiagram-v2)
- [ ] All Korean content, English terms defined on first use
- [ ] No JSX imports in MDX
- [ ] Each concept explanation is 300-500 words
- [ ] Real-world analogies included (manufacturing, healthcare, e-commerce)
- [ ] "Problem first, solution second" narrative arc followed
- [ ] YAML frontmatter with title, description, difficulty ("intermediate") fields

---

## Milestone 1: Overview and Process Framework (Priority High)

### Task 1.1: Generate 00-introduction.mdx

**File:** `content/phase-5/00-introduction.mdx`

**Content outline:**

1. **Title block:**
   - Frontmatter: title "Phase 5 개요: 설계 프로세스 전체 흐름", description about Phase 5 overview, difficulty intermediate
   - H1: "Phase 5: 온톨로지 설계 방법론"

2. **Learning objective section:**
   - State the core learning goal: "스스로 작은 도메인 온톨로지를 체계적으로 설계할 수 있다"
   - Connect from Phase 4: "언어를 알았으니 이제 무엇을 어떻게 써야 할지 -- 설계 방법론이 필요하다"
   - Explain the analogy: knowing grammar (Phase 4) vs. knowing how to write a good essay (Phase 5)

3. **"왜 필요한가?" blockquotes (3+):**
   - Why methodology matters: "OWL 문법을 안다고 좋은 온톨로지가 만들어지지 않는다"
   - Why systematic design saves time: ad-hoc design leads to rework
   - Why this Phase is the bridge between theory and practice

4. **Roadmap Mermaid diagram:**
   - `graph TD` showing Phase 5's 7 content sessions
   - Flow: Process Overview -> CQ Scope -> Design Strategies -> Reuse -> Anti-patterns -> Quality -> Exercises
   - Korean labels for each node
   - Grouping: sessions 01-02 as "기초 프레임워크", 03-04 as "설계 전략", 05-06 as "품질 관리"

5. **Session overview:**
   - Session 1: METHONTOLOGY and Ontology 101 process overview
   - Session 2: Competency Questions for scope definition
   - Session 3: Top-down, bottom-up, and middle-out design strategies
   - Session 4: Existing ontology reuse strategies
   - Session 5: Common anti-patterns and design mistakes
   - Session 6: Quality evaluation criteria
   - Session 7: Exercises and self-assessment

6. **Competency questions preview:**
   - List the 4 questions learners should be able to answer after Phase 5
   - Frame as a challenge: "이 질문에 자신 있게 답할 수 있다면 Phase 6으로 넘어가세요"

7. **"흔한 오해" section:**
   - Misconception: "온톨로지 설계에 정답이 하나 있다"
   - Reality: The same domain can have multiple valid ontologies depending on purpose, scope, and perspective. Methodology helps make informed decisions, not prescribe a single answer.

8. **"연결 포인트" callouts (2+):**
   - Phase 6: "이 Phase에서 배운 방법론이 실제 표준 온톨로지(FOAF, Schema.org, SNOMED CT)에 어떻게 적용되었는지 Phase 6에서 분석합니다"
   - Phase 7: "설계 방법론은 실전에서 어떻게 활용되는가 -- Knowledge Graph 구축과 제조업 적용 사례를 Phase 7에서 확인합니다"

### Task 1.2: Generate 01-methontology.mdx

**File:** `content/phase-5/01-methontology.mdx`

**Content outline:**

1. **Frontmatter:** title "온톨로지 개발 프로세스 개요", description about ontology development methodologies, difficulty intermediate

2. **Learning objectives (3 bullets):**
   - Explain the key ideas of METHONTOLOGY and Ontology 101 methodologies
   - Describe the common development flow shared across methodologies
   - Understand why ontology development is iterative, not linear

3. **"왜 필요한가?" opening blockquote:**
   - Why having a process matters: "프로세스 없이 설계하면 — 어디서 시작하고, 어디서 끝내야 하는지 모른다"

4. **Mermaid diagram -- "이번 세션 전체 그림":**
   - `graph LR` showing common development cycle
   - Nodes: Scope -> Search Existing -> Enumerate Classes -> Hierarchy -> Properties -> Constraints -> Instances -> Validate
   - Iteration arrow from Validate back to Scope
   - Korean labels

5. **METHONTOLOGY section (300-500 words):**
   - "왜 필요한가?" blockquote: Why a formal engineering process was needed for ontology development
   - Origin and attribution: Fernandez-Lopez, Gomez-Perez, Juristo (1997), inspired by IEEE 1074
   - Key phases: planning, conceptualization, formalization, implementation, maintenance
   - Contribution: Established ontology development as engineering, not art
   - When to use: Large-scale projects with teams
   - Korean context: Large Korean companies (삼성, LG) building enterprise ontologies would benefit from this approach

6. **Ontology 101 section (300-500 words):**
   - "왜 필요한가?" blockquote: Why a simpler, practical guide was needed for beginners and small teams
   - Noy & McGuinness (2001), Stanford Knowledge Systems Lab
   - 7 practical steps
   - When to use: Individual or small-team projects, learning purposes
   - Connection: This is the guide we will most closely follow in exercises

7. **Common development flow synthesis (300-500 words):**
   - Despite different origins, both methodologies share a common skeleton
   - Step-by-step walkthrough of the 8 common steps
   - Each step with a 1-2 sentence description and practical guidance
   - Emphasis on the shared pattern

8. **Iterative nature (200-300 words):**
   - Real development is not linear
   - Agile development analogy
   - "Getting it perfect on the first pass" is the most common beginner mistake
   - Ontology versioning: expect v0.1, v0.2, etc.

9. **"흔한 오해" section:**
   - Misconception: "방법론을 따르면 자동으로 좋은 온톨로지가 나온다"
   - Reality: Methodology provides structure and reduces errors, but domain expertise and iterative refinement are still essential. A bad chef with a great recipe still makes bad food.

10. **"연결 포인트" callouts:**
    - Phase 6: "METHONTOLOGY의 실제 적용 -- Gene Ontology가 어떤 프로세스로 개발되었는지 Phase 6에서 볼 수 있습니다"
    - Phase 7: "실무에서의 반복 개발 -- Knowledge Graph 프로젝트에서 온톨로지를 어떻게 점진적으로 발전시키는지 Phase 7에서 다룹니다"

11. **Summary and next session preview**

---

## Milestone 2: Scope Definition (Priority High)

### Task 2.1: Generate 02-competency-questions.mdx

**File:** `content/phase-5/02-competency-questions.mdx`

**Content outline:**

1. **Frontmatter:** title "범위 정의: Competency Questions", description about CQ-based scope definition, difficulty intermediate

2. **Learning objectives (3 bullets):**
   - Define Competency Questions and explain their role in ontology design
   - Write effective CQs that control ontology scope
   - Evaluate CQ quality: specific, answerable, scoped, SPARQL-verifiable

3. **"왜 필요한가?" opening blockquote:**
   - Why scope definition is the most critical first step: "범위를 먼저 정하지 않으면 — 무한히 커지는 온톨로지를 만들게 된다"

4. **Mermaid diagram -- "이번 세션 전체 그림":**
   - `graph TD` showing CQ derivation flow
   - Domain Analysis -> CQ Drafting -> CQ Refinement -> Scope Definition -> Design Guidance
   - Korean labels

5. **What are CQs? (300-500 words):**
   - "왜 필요한가?" blockquote about defining what the ontology can answer before building it
   - Gruninger & Fox (1995) attribution
   - Core analogy: CQs are to ontology what user stories are to software, what test cases are to TDD
   - CQ defines both scope AND success criteria

6. **Smartphone parts ontology CQ examples (300-400 words):**
   - 3 concrete CQ examples with Korean manufacturing context
   - For each CQ: show what classes, properties, and relationships it implies
   - Visual breakdown: CQ -> required concepts mapping

7. **CQ quality criteria (200-300 words):**
   - Good vs. bad CQ comparison table
   - SPARQL-verifiability as the litmus test
   - Refinement process

8. **CQ-driven scope control (300-400 words):**
   - "왜 필요한가?" blockquote about preventing scope creep
   - "Does concept X help answer any CQ?" exclusion test
   - TDD analogy deepened: write tests (CQs) first, then build to pass them

9. **"흔한 오해" section:**
   - Misconception: "CQ는 설계 초반에만 쓰고 이후에는 필요 없다"
   - Reality: CQs serve as continuous validation throughout development. After building your ontology, you should verify that SPARQL queries for each CQ return correct results.

10. **"연결 포인트" callouts:**
    - Phase 6: "실제 표준 온톨로지들이 어떤 질문에 답하도록 설계되었는지 — Schema.org의 CQ를 역추적해 봅니다"
    - Phase 7: "Knowledge Graph 프로젝트에서 CQ가 비즈니스 요구사항과 어떻게 연결되는지 Phase 7에서 확인합니다"

11. **Summary and next session preview**

---

## Milestone 3: Design Strategies (Priority High)

### Task 3.1: Generate 03-top-down-design.mdx

**File:** `content/phase-5/03-top-down-design.mdx`

**Content outline:**

1. **Frontmatter:** title "상향식 vs 하향식 vs 중간 방식 설계", description about three design approaches, difficulty intermediate

2. **Learning objectives (3 bullets):**
   - Compare top-down, bottom-up, and middle-out design approaches
   - Identify when each approach is most appropriate
   - Understand why middle-out is recommended for practical ontology design

3. **"왜 필요한가?" opening blockquote:**
   - Why the starting point of design matters: "어디서 시작하느냐에 따라 설계의 일관성과 효율이 완전히 달라진다"

4. **Mermaid diagram -- "이번 세션 전체 그림":**
   - `graph TD` showing three-column visual comparison
   - Top-down: large box at top, arrows pointing down to smaller boxes
   - Bottom-up: small boxes at bottom, arrows pointing up to larger box
   - Middle-out: medium box in center, arrows pointing both directions

5. **Top-down (하향식) design (300-500 words):**
   - "왜 필요한가?" blockquote about starting with the big picture
   - Detailed example with Product hierarchy in manufacturing domain
   - Advantage: Clear overall structure from the start
   - Disadvantage: Abstract early stages, hard to validate without data
   - When to use: Well-established domain categories
   - Analogy: Architectural blueprint -> room details -> furniture placement

6. **Bottom-up (상향식) design (300-500 words):**
   - Example with specific product instances grouping upward
   - Advantage: Grounded in real data
   - Disadvantage: Inconsistent abstractions, depends on who is grouping
   - When to use: Lots of concrete data, no clear hierarchy
   - Analogy: Sorting physical items into boxes, then labeling

7. **Middle-out (중간 방식) design (300-500 words):**
   - "왜 필요한가?" blockquote about stability and agreement
   - Example: Start with "Smartphone" as core concept
   - Why it is recommended: core concepts have highest agreement, least rework
   - Ontology 101 endorsement
   - Korean manufacturing example: "PCB(인쇄회로기판)" as a core concept in electronics manufacturing ontology

8. **Comparison synthesis (200-300 words):**
   - Comparison table: approach, starting point, advantage, disadvantage, when to use
   - Real projects mix all three
   - Practical guidance for choosing

9. **"흔한 오해" section:**
   - Misconception: "반드시 하나의 접근법만 사용해야 한다"
   - Reality: Most successful ontology projects combine approaches. Start middle-out for the core, extend top-down for upper-level categories, and bottom-up for leaf-level classes grounded in data.

10. **"연결 포인트" callouts:**
    - Phase 6: "FOAF는 상향식으로 시작해서 커뮤니티 합의를 통해 확장된 사례입니다. Phase 6에서 실제 설계 과정을 분석합니다"
    - Phase 7: "제조업 온톨로지 설계에서 어떤 접근법이 실제로 사용되는지 Phase 7에서 확인합니다"

11. **Summary and next session preview**

### Task 3.2: Generate 04-bottom-up-design.mdx

**File:** `content/phase-5/04-bottom-up-design.mdx`

**Content outline:**

1. **Frontmatter:** title "기존 온톨로지 재사용 전략", description about ontology reuse strategies, difficulty intermediate

2. **Learning objectives (3 bullets):**
   - Identify major ontology repositories and how to search them
   - Explain the difference between owl:imports, owl:equivalentClass, and owl:sameAs
   - Apply consistency verification after importing external ontologies

3. **"왜 필요한가?" opening blockquote:**
   - Why reuse: "바퀴를 다시 발명하지 말 것 -- 이미 잘 만들어진 온톨로지가 있다면 활용하라"

4. **Mermaid diagram -- "이번 세션 전체 그림":**
   - `graph LR` showing reuse workflow
   - Identify Need -> Search Repositories -> Evaluate Candidate -> Import/Map -> Verify Consistency
   - Korean labels

5. **Reuse principle (200-300 words):**
   - "왜 필요한가?" blockquote about quality, interoperability, and community trust
   - The cost of building from scratch
   - Reuse as a core engineering principle

6. **Ontology repositories (300-400 words):**
   - BioPortal: 700+ biomedical ontologies, maintained by NCBO at Stanford
   - LOV: Web-oriented vocabularies, SPARQL endpoints available
   - OBO Foundry: Strict quality standards for biological ontologies
   - Evaluation criteria: community adoption, maintenance, license, quality
   - Practical search tips

7. **owl:imports (300-400 words):**
   - "왜 필요한가?" blockquote about leveraging existing work
   - Mechanism and syntax
   - Use case and example
   - Caution: imports everything, including all axioms
   - Programming analogy: import * vs. import specific module

8. **Concept mapping (300-400 words):**
   - owl:equivalentClass for class-level alignment
   - owl:sameAs for individual-level alignment
   - Critical distinction between the two
   - Caution: owl:sameAs overuse and inference explosion

9. **Consistency verification (200-300 words):**
   - "왜 필요한가?" blockquote about preventing imported axiom conflicts
   - Reasoner verification (HermiT, Pellet)
   - Common conflict types
   - Best practice workflow

10. **"흔한 오해" section:**
    - Misconception: "유명한 온톨로지를 import하면 항상 좋다"
    - Reality: Importing a large ontology adds ALL its axioms and complexity. Sometimes a lightweight mapping (equivalentClass) is better than full import. Evaluate the cost vs. benefit before importing.

11. **"연결 포인트" callouts:**
    - Phase 6: "BioPortal에서 찾을 수 있는 대표적 온톨로지 -- Gene Ontology와 SNOMED CT의 재사용 전략을 Phase 6에서 분석합니다"
    - Phase 7: "Knowledge Graph 구축 시 Schema.org를 재사용하는 실제 패턴을 Phase 7에서 다룹니다"

12. **Summary and next session preview**

---

## Milestone 4: Quality Assurance (Priority High)

### Task 4.1: Generate 05-anti-patterns.mdx

**File:** `content/phase-5/05-anti-patterns.mdx`

**Content outline:**

1. **Frontmatter:** title "흔한 설계 실수와 안티패턴", description about common ontology design mistakes, difficulty intermediate

2. **Learning objectives (3 bullets):**
   - Identify 4 common anti-patterns in ontology design
   - Explain why each anti-pattern causes problems and how to fix it
   - Apply an anti-pattern checklist to review existing ontology designs

3. **"왜 필요한가?" opening blockquote:**
   - Why studying mistakes: "좋은 설계를 배우는 것만큼, 나쁜 설계를 알아보는 눈이 중요하다"

4. **Mermaid diagram -- "이번 세션 전체 그림":**
   - `graph TD` showing 4 anti-pattern categories branching from root
   - Root: "설계 실수"
   - Branches: "너무 깊은 계층", "관계의 클래스화", "이름 공간 혼용", "인스턴스-클래스 혼용"
   - Each with severity indicator (impact Korean text)

5. **Anti-pattern 1: Too deep hierarchy (300-400 words):**
   - "왜 필요한가?" blockquote about maintainability and reasoning performance
   - 8-level hierarchy example in manufacturing
   - Impact: reasoning slowdown, maintenance nightmare
   - Fix: flatten, eliminate single-child levels
   - Rule of thumb: "5단계 이하로 유지"

6. **Anti-pattern 2: Reifying relationships as classes (300-400 words):**
   - "왜 필요한가?" blockquote about unnecessary complexity
   - "EmploymentRelation" class example
   - When reification IS appropriate: n-ary relationships with attributes
   - When it is NOT appropriate: simple binary relationships
   - Fix: Use object property directly; reserve reification for genuine need

7. **Anti-pattern 3: Namespace confusion (300-400 words):**
   - Mixed URI example with three different patterns
   - Impact: broken imports, fragmented ontology
   - Fix: Plan URI strategy before starting; use consistent base URI
   - Best practice pattern: `http://example.org/ontology/{version}#`

8. **Anti-pattern 4: Instance-class confusion (300-400 words):**
   - "왜 필요한가?" blockquote about reasoning predictability
   - Seoul as both class and instance example
   - OWL 2 punning explanation (allowed but dangerous)
   - Impact: unexpected reasoning results
   - Fix: Clear separation of modeling levels; use metaclasses explicitly

9. **"흔한 오해" section:**
   - Misconception: "안티패턴은 초보자만 만드는 실수다"
   - Reality: Even experienced ontology engineers create anti-patterns, especially under time pressure. The difference is that experienced engineers use checklists and peer review to catch them early.

10. **"연결 포인트" callouts:**
    - Phase 6: "Gene Ontology와 SNOMED CT가 안티패턴을 어떻게 방지하는 거버넌스 체계를 갖고 있는지 Phase 6에서 확인합니다"
    - Phase 7: "실무 프로젝트에서 가장 자주 발견되는 안티패턴과 그 해결 사례를 Phase 7에서 다룹니다"

11. **Summary and next session preview**

### Task 4.2: Generate 06-quality-criteria.mdx

**File:** `content/phase-5/06-quality-criteria.mdx`

**Content outline:**

1. **Frontmatter:** title "온톨로지 품질 평가 기준", description about quality evaluation criteria, difficulty intermediate

2. **Learning objectives (3 bullets):**
   - Evaluate an ontology against 5 quality criteria: accuracy, completeness, consistency, conciseness, extensibility
   - Distinguish between automated and manual quality checks
   - Apply quality criteria as a systematic evaluation framework

3. **"왜 필요한가?" opening blockquote:**
   - Why quality evaluation: "만들었다고 끝이 아니다 -- 좋은 온톨로지인지 판단할 수 있는 기준이 필요하다"

4. **Mermaid diagram -- "이번 세션 전체 그림":**
   - `graph TD` with 5 quality dimensions connected to central node
   - Central: "온톨로지 품질"
   - 5 branches: Accuracy, Completeness, Consistency, Conciseness, Extensibility
   - Korean labels with brief descriptions

5. **Accuracy (정확성) (300-400 words):**
   - "왜 필요한가?" blockquote about domain correctness
   - Foldable phone screen count example
   - Evaluation: domain expert review
   - Connection to CQs: correct CQ answers imply accuracy

6. **Completeness (완전성) (300-400 words):**
   - SPARQL-based CQ verification method
   - Tradeoff: completeness vs. scope -- prioritize CQs
   - Missing "substitutePart" property example
   - Practical approach: iterative completeness improvement

7. **Consistency (일관성) (300-400 words):**
   - "왜 필요한가?" blockquote about logical soundness
   - Automated checking with reasoners (HermiT, Pellet, ELK)
   - Disjoint class violation example (MobileDevice + StationaryDevice + Laptop)
   - Ex falso quodlibet: why inconsistency makes the entire ontology useless
   - This is the ONLY quality criterion fully automatable

8. **Conciseness (간결성) (200-300 words):**
   - Duplicate class definitions example (CellPhone/MobilePhone)
   - Impact: maintenance burden
   - Fix: merge or use owl:equivalentClass

9. **Extensibility (확장성) (200-300 words):**
   - "왜 필요한가?" blockquote about future-proofing
   - Open-Closed Principle analogy from software engineering
   - Good vs. bad extensibility indicators
   - Evaluation method: try adding a new concept, check if existing queries break

10. **"흔한 오해" section:**
    - Misconception: "추론기가 오류를 보고하지 않으면 온톨로지 품질이 좋은 것이다"
    - Reality: A reasoner only checks consistency (logical contradictions). It cannot check accuracy (whether axioms correctly reflect domain knowledge), completeness (whether all CQs are answerable), or extensibility. Consistency is necessary but not sufficient.

11. **"연결 포인트" callouts:**
    - Phase 6: "OBO Foundry가 적용하는 엄격한 품질 기준을 Phase 6에서 분석합니다"
    - Phase 7: "실무 프로젝트에서 온톨로지 품질을 어떻게 지속적으로 관리하는지 Phase 7에서 다룹니다"

12. **Summary and next session preview**

---

## Milestone 5: Exercises and Assessment (Priority High)

### Task 5.1: Generate 07-exercises.mdx

**File:** `content/phase-5/07-exercises.mdx`

**Content outline:**

1. **Frontmatter:** title "Phase 5 실습 + 핵심 질문", description about comprehensive exercises, difficulty intermediate

2. **Phase 5 concept map Mermaid diagram:**
   - `graph TD` connecting all Phase 5 concepts
   - Methodology -> CQ -> Design Strategies -> Reuse -> Anti-patterns -> Quality
   - Korean labels throughout
   - Shows the workflow: learn process -> define scope -> choose strategy -> build with reuse -> avoid mistakes -> evaluate quality

3. **Phase 5 recap (200-300 words):**
   - Brief summary of sessions 01-06
   - Emphasize the narrative arc: process -> scope -> design -> reuse -> mistakes to avoid -> quality check

4. **Basic exercise (기본 실습):**

   **Exercise 1:** Write 5 Competency Questions for Your Domain
   - Clear task description
   - Domain suggestion: choose from your own work (manufacturing, healthcare, e-commerce, or any domain)
   - Guidance: Start with "what" and "which" questions
   - Example format using smartphone parts domain:
     - "이 부품의 공급업체 목록은?"
     - "이 제품에 사용되는 모든 부품은?"
     - "불량률이 가장 높은 공정은?"
     - "A 부품의 대체 부품 중 가격이 더 낮은 것은?"
     - "이 부품이 사용되는 모든 제품 라인은?"
   - Self-evaluation: Check each CQ implies at least one class and one property
   - Difficulty: moderate

5. **Challenge exercises (도전 실습):**

   **Exercise 2:** Design a Minimal Ontology in Protege
   - Task: Using the 5 CQs from Exercise 1, design a minimal ontology
   - Step-by-step guidance:
     1. From each CQ, extract implied classes (nouns)
     2. From each CQ, extract implied properties (verbs, relationships)
     3. Define class hierarchy (is-a relationships)
     4. Add at least 3 instances for testing
     5. Write a SPARQL query for each CQ
     6. Verify each query returns correct results
   - Protege usage tips
   - SPARQL reference back to Phase 4

   **Exercise 3:** Anti-pattern Checklist Review
   - Task: Review the ontology from Exercise 2 against 4 anti-patterns
   - Checklist:
     - [ ] Hierarchy depth <= 5 levels?
     - [ ] No unnecessary reified relationships?
     - [ ] Consistent namespace across all entities?
     - [ ] Clear separation between classes and instances?
   - Document findings: For each anti-pattern found, describe the problem and proposed fix
   - Reflection question: "Which anti-pattern was hardest to avoid, and why?"

6. **Competency questions with guidance (4 questions):**

   Question 1: "Competency Question이 명확할수록 온톨로지 설계 품질이 올라가는 이유는?"
   - Guidance: Think about scope control (narrower CQs = more focused design), design guidance (CQs imply required concepts), and validation criteria (CQs as test cases)
   - Reference: Session 02

   Question 2: "하향식, 상향식, 중간 방식 중 실무에서 권장되는 접근법과 그 이유는?"
   - Guidance: Think about which starting point has highest agreement, least rework, and most stability
   - Reference: Session 03, specifically middle-out section

   Question 3: "기존 온톨로지를 재사용할 때 반드시 확인해야 할 것은 무엇인가?"
   - Guidance: Think about axiom conflicts, consistency verification with reasoners, and the difference between import and mapping
   - Reference: Session 04, consistency verification section

   Question 4: "온톨로지의 일관성(Consistency)을 자동으로 검사할 수 있는 방법은?"
   - Guidance: Think about reasoners (HermiT, Pellet, ELK), what "inconsistent" means, and the difference between consistency and other quality criteria
   - Reference: Session 06, consistency section

7. **Self-assessment checklist (6 items):**
   - "I can explain at least 2 ontology development methodologies"
   - "I can write Competency Questions that define ontology scope"
   - "I can compare top-down, bottom-up, and middle-out design approaches"
   - "I can identify and apply ontology reuse strategies"
   - "I can recognize 4 common anti-patterns in ontology design"
   - "I can evaluate an ontology against 5 quality criteria"

8. **"연결 포인트" callouts:**
   - Phase 6: "이제 설계 방법론을 알았으니, 실제로 이 방법론을 적용해 만들어진 표준 온톨로지들을 Phase 6에서 분석합니다"
   - Phase 7: "Exercises에서 만든 작은 온톨로지가 실전에서 어떻게 확장되는지 Phase 7에서 확인합니다"

9. **"흔한 오해" section:**
   - Misconception: "설계 방법론을 완벽히 이해한 후에야 실습을 시작할 수 있다"
   - Reality: 방법론은 실습을 통해 체화된다. 작은 도메인부터 직접 설계해보는 것이 가장 효과적인 학습법이다.

---

## Build Verification

After all 8 files are generated:

1. Run `bun run build` (or `npm run build`) -- zero errors expected
2. Run `bun run dev` and navigate to each Phase 5 page -- all content renders
3. Verify all Mermaid diagrams render without syntax errors
4. Verify no MDX parsing errors in browser console
5. Verify sidebar navigation shows all 8 Phase 5 sessions with Korean labels

---

## Risk Assessment

### Risk 1: Mermaid Syntax Errors

**Probability:** Medium
**Impact:** Diagrams show error messages instead of visuals
**Mitigation:** Follow S-005 Mermaid syntax constraints strictly. Use only safe diagram types. Quote all Korean text labels. Test each diagram type before generating content.

### Risk 2: Content Depth Insufficiency

**Probability:** Low
**Impact:** Content is too shallow for the 300-500 word requirement per concept
**Mitigation:** Use the detailed content outlines in this plan. Each concept section includes specific examples, analogies, and narrative structure. Implementation agent should follow the outline point by point.

### Risk 3: Academic Inaccuracy

**Probability:** Low
**Impact:** Incorrect attribution or methodology description could undermine educational credibility
**Mitigation:** METHONTOLOGY (Fernandez-Lopez et al., 1997), Ontology 101 (Noy & McGuinness, 2001), CQ methodology (Gruninger & Fox, 1995) are well-established citations. All methodology descriptions should be verified against original sources.

### Risk 4: Inconsistency with Phase 4 Content

**Probability:** Low
**Impact:** Phase 5 references Phase 4 concepts (OWL, SPARQL, Protege) that may not have been implemented yet
**Mitigation:** Phase 5 references should be self-contained enough that readers understand the connection even if Phase 4 is not yet complete. Avoid deep references to specific Phase 4 session content.

### Risk 5: Anti-pattern Examples Too Abstract

**Probability:** Medium
**Impact:** Learners cannot connect anti-patterns to their own work
**Mitigation:** Every anti-pattern uses a concrete example from manufacturing or e-commerce domains relevant to Korean industry context. Include specific class/property names, not generic descriptions.

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
| `content/phase-5/_meta.js` | Must exist with correct entries | Required (from SPEC-INFRA-001) |
| MermaidDiagram component | Must be functional | Required (from SPEC-INFRA-001) |
| Phase 1-4 content | Conceptual foundation | Reference (soft dependency) |
| Curriculum document (edu-content.md) | Content source | Reference |
