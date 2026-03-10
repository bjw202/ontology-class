---
id: SPEC-CONTENT-P2
version: "1.0.0"
status: draft
created: "2026-03-10"
updated: "2026-03-10"
author: jw
priority: high
---

# Implementation Plan: SPEC-CONTENT-P2 -- Phase 2 MDX Content Generation

## Overview

This plan details the implementation approach for generating 7 complete MDX content files for Phase 2 ("Ontology Building Blocks") of the Ontology Fundamentals Learning Platform. The work is pure content authoring -- no infrastructure, components, or configuration changes.

Phase 2 is the first "hands-on knowledge" phase after Phase 1's motivation foundation. Learners transition from "why ontology?" to "what is ontology made of?" This plan ensures each session builds conceptually on the previous one while maintaining independent readability.

---

## Prerequisites

- SPEC-INFRA-001 fully implemented (skeleton MDX files exist, Nextra site builds)
- SPEC-CONTENT-P1 completed (Phase 1 content exists and provides the conceptual foundation)
- `content/phase-2/` directory with 7 skeleton MDX files and `_meta.js`
- MermaidDiagram component functional and globally available
- `bun run dev` starts successfully

---

## Implementation Strategy

### Approach: Sequential Content Generation

Content sessions are generated sequentially because each session builds on the previous:

1. **00-introduction.mdx** first (provides roadmap, Phase 1 bridge, and framing)
2. **01-classes.mdx** second (introduces the most fundamental building block)
3. **02-instances.mdx** third (builds on classes -- instances are "members" of classes)
4. **03-properties.mdx** fourth (connects classes and instances via relationships and attributes)
5. **04-axioms.mdx** fifth (adds rules and constraints on top of classes, instances, and properties)
6. **05-hierarchy.mdx** sixth (organizes classes into hierarchies and compares with alternatives)
7. **06-exercises.mdx** last (synthesizes and tests all prior sessions)

### Content Quality Checklist (per session)

Before marking any session complete, verify:
- [ ] At least 3 "왜 필요한가?" blockquotes present
- [ ] At least 2 "연결 포인트" callouts present (referencing Phase 3, 4, 5, or beyond)
- [ ] At least 1 "흔한 오해" section present
- [ ] Exactly 1 Mermaid diagram labeled "이번 세션 전체 그림"
- [ ] Mermaid syntax is safe (no apostrophes, no `+` in stateDiagram-v2, double-quoted Korean labels)
- [ ] All Korean content, English terms defined on first use
- [ ] No JSX imports in MDX
- [ ] Each concept explanation is 300-500 words
- [ ] Real-world analogies included (manufacturing, healthcare, e-commerce, technology)
- [ ] "Problem first, solution second" narrative arc followed
- [ ] YAML frontmatter with title, description, difficulty fields
- [ ] Phase 1 concepts referenced where relevant (bridge continuity)

---

## Milestone 1: Introduction and Phase 1 Bridge (Priority High)

### Task 1.1: Generate 00-introduction.mdx

**File:** `content/phase-2/00-introduction.mdx`

**Content outline:**

1. **Title block:**
   - Frontmatter: title "Phase 2 소개: 온톨로지의 구성 요소", description about Phase 2 building blocks overview, difficulty beginner
   - H1: "Phase 2: 온톨로지의 구성 요소"

2. **Learning objective section:**
   - State the core learning goal: "온톨로지를 구성하는 기본 재료를 읽고 쓸 수 있다"
   - Explicitly state Phase 1 connection: "Phase 1에서 살펴본 의사소통 실패의 원인은 '개념'과 '관계'가 명시되지 않아서다. Phase 2에서는 바로 그 명시화 방법을 배운다"

3. **"왜 필요한가?" blockquotes (3+):**
   - Why we need to learn building blocks before using them
   - Why the order matters (classes -> instances -> properties -> axioms -> hierarchy)
   - Why this knowledge is essential for any real ontology work

4. **Phase 1 bridge section ("Phase 1에서 여기까지"):**
   - Recall: we learned WHY ontology is needed (interoperability, knowledge formalization)
   - Recall: Gruber told us ontology is "an explicit specification of a shared conceptualization"
   - Now: Phase 2 teaches the MATERIALS for creating that specification
   - Analogy: Phase 1 was "why we need buildings," Phase 2 is "what buildings are made of (bricks, beams, cement)"

5. **Roadmap Mermaid diagram:**
   - `graph TD` showing Phase 2's 6 content sessions
   - Arrows showing conceptual build-up: classes -> instances -> properties -> axioms -> hierarchy -> exercises
   - Korean labels for each node with brief description

6. **Session overview:**
   - Session 1: Classes -- conceptual categories
   - Session 2: Instances -- real-world objects
   - Session 3: Properties -- relationships and attributes
   - Session 4: Axioms -- rules and constraints
   - Session 5: Hierarchy -- organization and comparison
   - Session 6: Comprehensive exercises

7. **Competency questions preview:**
   - List the 4 questions learners should be able to answer after Phase 2
   - Frame as a challenge: "이 질문에 자신 있게 답할 수 있다면 Phase 3로 넘어가세요"

8. **"흔한 오해" section:**
   - Misconception: "온톨로지 구성 요소는 프로그래밍의 클래스와 같다"
   - Reality: While there are similarities, ontology classes represent conceptual categories with open-world semantics, not code templates. In OOP, a class defines behavior; in ontology, a class defines meaning.

9. **"연결 포인트" callouts (2+):**
   - Phase 3: After learning the building blocks, you will learn the LOGIC that powers them (Description Logic, reasoning)
   - Phase 4: These building blocks are written in formal languages (RDF, OWL) that you will learn in Phase 4

---

## Milestone 2: Core Concepts -- Classes and Instances (Priority High)

### Task 2.1: Generate 01-classes.mdx

**File:** `content/phase-2/01-classes.mdx`

**Content outline:**

1. **Frontmatter:** title "클래스(Class): 개념의 범주", description about ontology classes and categories, difficulty beginner

2. **Learning objectives (3 bullets):**
   - Understand what a class is in ontology and how it differs from a real-world object
   - Recognize the importance of class boundary definition in ontology design
   - Distinguish between classes and instances with concrete examples

3. **"왜 필요한가?" opening blockquote:**
   - Why we need categories: imagine a library without any categorization system -- you would have to examine every single book to find what you need

4. **Mermaid diagram -- "이번 세션 전체 그림":**
   - `classDiagram` showing example ontology class hierarchy
   - 동물(Animal) with subclasses 포유류(Mammal), 조류(Bird)
   - 스마트폰(Smartphone) as separate class
   - Some example properties on classes
   - Korean labels throughout

5. **Core concept: What is a class? (300-500 words):**
   - Class is a set of objects sharing common characteristics
   - "왜 필요한가?" blockquote: why we need conceptual categories
   - Concrete examples: 동물, 스마트폰, 레이저 공정
   - Emphasize: a class is a CONCEPT, not a physical thing

6. **Class vs Instance distinction (300-400 words):**
   - iPhone 15 is NOT a class -- it is an instance
   - The boundary is not always obvious: "갤럭시 S25" could be a class (all Galaxy S25 phones) or an instance (of the class "Phone Model")
   - Preview: instances are covered in detail in Session 02

7. **Design impact: Getting classes right (300-500 words):**
   - "왜 필요한가?" blockquote: why class design is the foundation of good ontology
   - If classes are poorly defined, the entire ontology becomes unstable
   - Manufacturing example: Is "inspection" a class of activities? Or a property of production steps?
   - The art of ontology design is deciding what deserves to be a class

8. **"흔한 오해" section:**
   - "클래스와 인스턴스의 구분은 항상 명확하다"
   - Reality: The same concept can be a class or instance depending on your modeling perspective

9. **"연결 포인트" callouts:**
   - Phase 3: "클래스가 Description Logic에서 어떻게 표현되는지 (클래스 표현식, class expression) Phase 3에서 배웁니다"
   - Phase 5: "무엇을 클래스로 만들어야 하는지 체계적으로 결정하는 방법 (METHONTOLOGY, Competency Questions)을 Phase 5에서 배웁니다"

10. **Summary and next session preview:**
    - Key takeaway: classes are conceptual categories, not physical objects
    - Next: instances -- the concrete members of these categories

### Task 2.2: Generate 02-instances.mdx

**File:** `content/phase-2/02-instances.mdx`

**Content outline:**

1. **Frontmatter:** title "인스턴스(Individual): 실세계 대상", description about ontology instances and individuals, difficulty beginner

2. **Learning objectives (3 bullets):**
   - Understand what an instance is and how it relates to a class
   - Recognize the key difference between ontology instances and DB rows (multiple class membership)
   - Apply the class-instance distinction to your own domain

3. **"왜 필요한가?" opening blockquote:**
   - Connecting from previous session: classes define categories, but without concrete members, categories are empty abstractions

4. **Mermaid diagram -- "이번 세션 전체 그림":**
   - `graph LR` showing class-to-instance relationships
   - 스마트폰(Class) connected to iPhone 15, Galaxy S25 (Instances)
   - Each instance with property values (화면크기, 제조사)
   - Multiple class membership shown: one instance connected to two classes

5. **Instance definition and examples (300-500 words):**
   - "왜 필요한가?" blockquote: why we need to represent specific things, not just categories
   - iPhone 15 is an instance of 스마트폰
   - Instances carry specific property values: 화면크기 = 6.1 inches
   - Manufacturing: "3번 라인 레이저 커팅기" is an instance of "레이저 장비" class

6. **Class as mold, instance as product analogy (300-400 words):**
   - "왜 필요한가?" blockquote before this section
   - The "틀(mold) vs 틀로 찍은 것(stamped product)" analogy
   - DB comparison: table = class, row = instance
   - The CRITICAL difference: in ontology, one instance can belong to MULTIPLE classes

7. **Multiple class membership -- the key differentiator (300-400 words):**
   - In RDB: one row belongs to one table (structural limitation)
   - In ontology: "김철수" can be Person AND Employee AND Parent AND Customer
   - "Hybrid car" belongs to both ElectricVehicle and InternalCombustionVehicle
   - Manufacturing: A specific machine can be both "CNC Machine" and "Inspection Equipment"
   - This flexibility is what makes ontology powerful for real-world modeling

8. **"흔한 오해" section:**
   - "인스턴스는 DB의 행(row)과 같다"
   - Reality: multiple class membership, inferred typing through reasoning, semantic meaning beyond column values

9. **"연결 포인트" callouts:**
   - Phase 4: "인스턴스가 RDF에서 어떻게 표현되는지 (주어-술어-목적어 트리플) Phase 4에서 배웁니다"
   - Phase 3: "추론기(Reasoner)가 인스턴스가 추가 클래스에 속한다는 것을 자동으로 발견하는 과정을 Phase 3에서 배웁니다"

10. **Summary and next session preview:**
    - Key takeaway: instances are concrete members of classes, with the unique power of multiple class membership
    - Next: properties -- how to connect instances and describe their attributes

---

## Milestone 3: Relationships and Attributes (Priority High)

### Task 3.1: Generate 03-properties.mdx

**File:** `content/phase-2/03-properties.mdx`

**Content outline:**

1. **Frontmatter:** title "속성(Property): 객체 속성 vs 데이터 속성", description about object and data properties in ontology, difficulty beginner

2. **Learning objectives (3 bullets):**
   - Distinguish between object properties (concept-to-concept) and data properties (concept-to-value)
   - Understand how properties create the edges and labels of a knowledge graph
   - Recognize inverse properties and property direction (domain -> range)

3. **"왜 필요한가?" opening blockquote:**
   - Connecting from previous sessions: we have classes and instances, but without relationships between them, they are isolated islands with no connections

4. **Mermaid diagram -- "이번 세션 전체 그림":**
   - `graph TD` showing:
   - Two concept nodes connected by an Object Property edge (with arrow direction and label)
   - One concept node annotated with Data Properties (literal values as terminal nodes)
   - Clear visual distinction: "Object Property = edge, Data Property = label"

5. **Object Property section (400-500 words):**
   - "왜 필요한가?" blockquote: why we need to connect concepts to each other
   - Connects concept to concept, has direction (domain -> range)
   - Examples with detail:
     - 제조공정 --사용하는재료--> 알루미늄
     - 직원 --소속된--> 부서
   - Inverse: 부서 --구성원을포함--> 직원
   - Object properties create the EDGES of a knowledge graph
   - Phase 1 reference: this is how we solve the interoperability problem -- explicitly defining relationships

6. **Data Property section (300-400 words):**
   - "왜 필요한가?" blockquote: why concepts need concrete measured values
   - Attaches a literal value to a concept
   - Datatype notation: "6.1"^^xsd:float, "김철수"^^xsd:string, "2020-03-15"^^xsd:date
   - Examples:
     - 스마트폰 --화면크기--> "6.1"^^xsd:float
     - 직원 --이름--> "김철수"^^xsd:string
   - Data properties add LABELS to nodes in the graph

7. **Graph visualization insight (200-300 words):**
   - "왜 필요한가?" blockquote: why the distinction matters for graph structure
   - Object properties = roads on a map (connecting cities)
   - Data properties = city names and population numbers (describing individual locations)
   - Together they create a rich, queryable knowledge structure

8. **"흔한 오해" section:**
   - "객체 속성과 데이터 속성의 구분이 왜 필요한가? 그냥 속성이면 되지 않나?"
   - Reality: The distinction enables different reasoning. Object properties support transitivity, symmetry, inverse. Data properties support range constraints and datatype validation.

9. **"연결 포인트" callouts:**
   - Phase 4: "속성이 RDF/OWL에서 어떤 구문으로 표현되는지 (rdf:Property, owl:ObjectProperty, owl:DatatypeProperty) Phase 4에서 배웁니다"
   - Phase 5: "속성 설계 시 객체 속성으로 할지 데이터 속성으로 할지 결정하는 방법론을 Phase 5에서 배웁니다"

10. **Summary and next session preview:**
    - Key takeaway: object properties connect concepts (edges), data properties attach values (labels)
    - Next: axioms -- the rules that constrain and empower these properties

---

## Milestone 4: Constraints and Reasoning Foundation (Priority High)

### Task 4.1: Generate 04-axioms.mdx

**File:** `content/phase-2/04-axioms.mdx`

**Content outline:**

1. **Frontmatter:** title "공리(Axiom): 제약과 규칙", description about axioms as constraints and rules in ontology, difficulty beginner

2. **Learning objectives (3 bullets):**
   - Understand the three key axiom types: existential restriction, functional property, inverse property
   - Recognize how axioms enable automated reasoning (the key differentiator from Phase 1)
   - Apply axiom concepts to real-world domain examples

3. **"왜 필요한가?" opening blockquote:**
   - Connecting from previous sessions: we have classes, instances, and properties -- but without rules, an ontology is just a classification table. Axioms are what give ontology its POWER.

4. **Mermaid diagram -- "이번 세션 전체 그림":**
   - `graph TD` showing:
   - A mini-ontology with classes and instances
   - Axiom constraints as annotations/decorations on the relationships
   - Three axiom types clearly labeled in Korean
   - "추론 가능" (reasoning enabled) outcome node

5. **Existential Restriction section (300-400 words):**
   - "왜 필요한가?" blockquote: why completeness constraints matter for data quality
   - "모든 스마트폰은 반드시 제조사를 가진다"
   - If a Smartphone instance has no manufacturer -> axiom violation detected
   - Manufacturing: "모든 제품은 반드시 품질 검사 기록을 가져야 한다"
   - Practical impact: automatically catches missing data

6. **Functional Property section (300-400 words):**
   - "왜 필요한가?" blockquote: why uniqueness constraints prevent data errors
   - "사람은 동시에 두 개의 주민등록번호를 가질 수 없다"
   - Examples: 생년월일(functional) vs 전화번호(non-functional)
   - Manufacturing: 제품번호(serial number) is functional -- each product has exactly one

7. **Inverse Property section (200-300 words):**
   - "A가 B의 부모이면 B는 A의 자녀다"
   - 가르치다(teaches) <-> 배우다(taughtBy)
   - 공급하다(supplies) <-> 공급받다(suppliedBy)
   - Enables bi-directional queries without storing redundant data

8. **Core insight: Why axioms matter (300-500 words):**
   - "왜 필요한가?" blockquote: axioms are what make ontology MORE than taxonomy
   - Without axioms: just a classification table (fancy spreadsheet)
   - With axioms: a reasoner can detect inconsistencies, infer new facts, validate completeness
   - Phase 1 callback: THIS is the "reasoning" that Phase 1 identified as ontology's key differentiator
   - Real-world impact: automated data quality checking in hospitals, supply chains, manufacturing

9. **"흔한 오해" section:**
   - "공리는 너무 어렵고 실무에서는 안 쓴다"
   - Reality: Even simple axioms like "every product must have a category" prevent data quality issues costing companies millions

10. **"연결 포인트" callouts:**
    - Phase 3: "공리가 Description Logic에서 어떻게 표현되고 추론기가 어떻게 사용하는지 Phase 3에서 상세히 배웁니다"
    - Phase 4: "공리를 OWL 구문으로 작성하는 방법 (owl:Restriction, owl:FunctionalProperty 등)을 Phase 4에서 배웁니다"

11. **Summary and next session preview:**
    - Key takeaway: axioms give ontology its reasoning power; without them, it is just taxonomy
    - Next: hierarchy -- how to organize classes into meaningful structures

---

## Milestone 5: Organization and Comparison (Priority High)

### Task 5.1: Generate 05-hierarchy.mdx

**File:** `content/phase-2/05-hierarchy.mdx`

**Content outline:**

1. **Frontmatter:** title "계층 구조와 상속", description about class hierarchy, inheritance, and ontology vs DB vs KG comparison, difficulty beginner

2. **Learning objectives (3 bullets):**
   - Understand class hierarchy and property inheritance in ontology
   - Distinguish between SubClassOf and rdf:type relationships
   - Compare ontology with relational databases and knowledge graphs

3. **"왜 필요한가?" opening blockquote:**
   - Why we need hierarchy: flat lists of classes are unusable at scale. Hierarchy provides organization, inheritance, and generalization.

4. **Mermaid diagram -- "이번 세션 전체 그림":**
   - `graph TD` showing multi-level hierarchy:
   - 포유류(Mammal) -> 개(Dog) -> 진돗개(Jindo Dog) with SubClassOf arrows
   - An instance "바둑이" connected to 진돗개 with rdf:type arrow
   - Visually distinguish SubClassOf (class-class) from rdf:type (instance-class)
   - Side panel or note showing comparison keywords

5. **Class hierarchy and inheritance (300-500 words):**
   - "왜 필요한가?" blockquote: why we need hierarchical organization
   - 포유류 -> 개 -> 진돗개: subclasses inherit parent properties
   - Property inheritance example: if 포유류 has 체온조절, 개 automatically has it
   - Manufacturing: 제조장비 -> CNC머신 -> 5축CNC

6. **SubClassOf vs rdf:type -- critical distinction (300-400 words):**
   - "왜 필요한가?" blockquote: why this is the most common beginner mistake
   - SubClassOf: class-to-class (진돗개 SubClassOf 개)
   - rdf:type: instance-to-class (바둑이 rdf:type 진돗개)
   - Analogy: SubClassOf = "sub-category of", rdf:type = "belongs to this category"
   - Consequence of confusion: logical inconsistency that breaks reasoning

7. **Hierarchy depth guidance (200-300 words):**
   - Too deep (10+ levels): maintenance nightmare
   - Recommended: 4-5 levels maximum
   - Each level should add meaningful semantic distinction
   - Over-classification trap: not every real-world distinction needs its own class

8. **Comparison table: Ontology vs DB vs Knowledge Graph:**
   - Full table as defined in R-013
   - Brief explanation of each row
   - Emphasize: they solve different problems, often used together

9. **"흔한 오해" section:**
   - "온톨로지는 데이터베이스의 상위 버전이다"
   - Reality: They solve different problems. DB for storage/retrieval, ontology for meaning/reasoning. Often used together.

10. **"연결 포인트" callouts:**
    - Phase 3: "추론기가 계층 구조를 이용해 자동 분류(automatic classification)를 수행하는 과정을 Phase 3에서 배웁니다"
    - Phase 7: "구글 지식 그래프(Google Knowledge Graph), DBpedia 등이 이 구조적 패턴을 실제로 어떻게 활용하는지 Phase 7에서 배웁니다"

11. **Summary and next session preview:**
    - Key takeaway: hierarchy organizes classes; SubClassOf and rdf:type serve different purposes; ontology complements databases
    - Next: comprehensive exercises to cement all Phase 2 concepts

---

## Milestone 6: Exercises and Assessment (Priority High)

### Task 6.1: Generate 06-exercises.mdx

**File:** `content/phase-2/06-exercises.mdx`

**Content outline:**

1. **Frontmatter:** title "Phase 2 종합 실습 + 핵심 질문", description about comprehensive exercises for Phase 2, difficulty beginner

2. **Phase 2 concept map Mermaid diagram:**
   - `graph TD` connecting all Phase 2 concepts
   - Classes -> Instances -> Properties (Object + Data) -> Axioms -> Hierarchy
   - Show how they build on each other
   - Korean labels throughout

3. **Phase 2 recap (200-300 words):**
   - Brief summary of sessions 01-05
   - Emphasize the building-block progression

4. **Basic exercises (기본 실습):**

   **Exercise 1:** Domain Modeling
   - Task: Choose a domain, identify 5 classes, 3 instances, 3 object properties, 2 data properties
   - Guidance hints: think about your workplace, hobby, or daily life
   - Table template provided for organizing elements
   - Example: Coffee shop domain with classes (음료, 직원, 매장, 원두, 장비)

   **Exercise 2:** Class vs Instance Classification
   - 10 items list for classification
   - Items span diverse domains with some intentionally ambiguous
   - Answer key with explanations, noting perspective-dependent items

5. **Challenge exercises (도전 실습):**

   **Exercise 3:** is-a vs has-a Distinction
   - Provide 2 is-a (SubClassOf) examples and 2 has-a (Object Property) examples from Exercise 1 domain
   - Explain the difference clearly
   - Common mistake alert: "A laptop HAS a battery" (has-a) vs "A laptop IS an electronic device" (is-a)

   **Exercise 4:** Axiom Design
   - For 2 classes from Exercise 1, write 1 existential restriction and 1 functional property
   - Natural language format: "모든 [X]는 반드시 [Y]를 가진다", "각 [X]는 최대 하나의 [Y]를 가진다"

6. **Competency questions with guidance (4 questions):**
   - Question 1: Class/Instance boundary ambiguity with guidance pointing to Session 01
   - Question 2: Object property vs data property criteria with guidance pointing to Session 03
   - Question 3: What ontology becomes without axioms with guidance pointing to Session 04
   - Question 4: SubClassOf vs rdf:type confusion consequences with guidance pointing to Session 05

7. **Self-assessment checklist (5 items)**

8. **"연결 포인트" callouts:**
   - Phase 3: "이제 구성 요소를 알았으니, 이것을 움직이게 하는 '논리'를 배울 시간입니다. Description Logic과 추론의 세계로!"
   - Phase 5: "Exercise 1에서 한 도메인 모델링이 바로 온톨로지 설계의 첫걸음입니다. Phase 5에서 체계적인 방법론을 배웁니다"

9. **"흔한 오해" section:**
   - Misconception: "구성 요소를 외우면 온톨로지를 만들 수 있다"
   - Reality: Knowing the building blocks is necessary but not sufficient. Design methodology (Phase 5) and formal logic (Phase 3) are equally important.

---

## Build Verification

After all 7 files are generated:

1. Run `bun run build` (or `npm run build`) -- zero errors expected
2. Run `bun run dev` and navigate to each Phase 2 page -- all content renders
3. Verify all Mermaid diagrams render without syntax errors
4. Verify no MDX parsing errors in browser console
5. Verify sidebar navigation shows all 7 Phase 2 sessions with Korean labels
6. Verify Phase 1 bridge references are present in introduction and at least 2 other sessions

---

## Risk Assessment

### Risk 1: Mermaid classDiagram Syntax Issues

**Probability:** Medium
**Impact:** classDiagram has different syntax rules than graph/flowchart and may cause rendering errors
**Mitigation:** Use well-tested classDiagram patterns. If classDiagram causes issues, fall back to `graph TD` with visual hierarchy representation. Test the diagram type in isolation before embedding in content.

### Risk 2: Concept Accuracy in Class/Instance/Property Explanations

**Probability:** Low
**Impact:** Incorrect explanations would undermine educational credibility and confuse learners
**Mitigation:** Follow established OWL/W3C definitions for all concepts. Cross-reference with standard ontology textbooks. Ensure Class/Instance distinction follows Description Logic semantics.

### Risk 3: Cross-Reference Errors to Phase 1

**Probability:** Low
**Impact:** Broken or inaccurate Phase 1 references could confuse learners about continuity
**Mitigation:** Verify Phase 1 content exists before referencing specific concepts. Use generic Phase 1 references rather than specific sentence quotes. Focus on conceptual bridges rather than file-level links.

### Risk 4: Comparison Table Accuracy (DB vs Ontology vs KG)

**Probability:** Medium
**Impact:** A factually incorrect comparison table would be the most scrutinized element in Phase 2
**Mitigation:** Base comparison on well-established differences documented in semantic web literature. Have each comparison point verifiable against W3C specs or standard textbooks. Mark edge cases with caveats.

### Risk 5: Content Depth Imbalance Across Sessions

**Probability:** Medium
**Impact:** Some sessions may be too thin while others are too dense, creating uneven learning experience
**Mitigation:** Follow the word count targets per session (1,500-2,500 words for main sessions). Use the detailed outlines in this plan. Each concept section should have at least 3 substantial paragraphs.

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

Each file is generated independently and can be verified independently. If one session has issues, it does not block others (though conceptual dependencies mean sequential generation is preferred for quality).

---

## Dependencies

| Dependency | Type | Status |
|-----------|------|--------|
| SPEC-INFRA-001 | Must be completed first | Required |
| SPEC-CONTENT-P1 | Phase 1 content must exist for bridge references | Required |
| `content/phase-2/_meta.js` | Must exist with correct entries | Required (from SPEC-INFRA-001) |
| MermaidDiagram component | Must be functional | Required (from SPEC-INFRA-001) |
| Curriculum document (`my-docs/edu-content.md`) | Content source | Reference |
