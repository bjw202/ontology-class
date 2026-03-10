---
id: SPEC-CONTENT-P3
version: "1.0.0"
status: draft
created: "2026-03-10"
updated: "2026-03-10"
author: jw
priority: high
---

# Implementation Plan: SPEC-CONTENT-P3 -- Phase 3 MDX Content Generation

## Overview

This plan details the implementation approach for generating 7 complete MDX content files for Phase 3 ("The Logical Foundations of Ontology") of the Ontology Fundamentals Learning Platform. The work is pure content authoring -- no infrastructure, components, or configuration changes.

Phase 3 is the first phase with a significant conceptual difficulty increase. The implementation approach prioritizes clarity over brevity, multiple analogies per concept, and explicit treatment of common confusion points (especially OWA/CWA).

---

## Prerequisites

- SPEC-INFRA-001 fully implemented (skeleton MDX files exist, Nextra site builds)
- `content/phase-3/` directory with 7 skeleton MDX files and `_meta.js`
- MermaidDiagram component functional and globally available
- `bun run dev` starts successfully
- Phase 1 and Phase 2 content complete (for conceptual continuity, not build dependency)

---

## Implementation Strategy

### Approach: Sequential Content Generation

Content sessions are generated sequentially because each session builds conceptual foundations for the next:

1. **00-introduction.mdx** first (provides roadmap and conceptual framing)
2. **01-description-logic.mdx** second (establishes the mathematical foundation)
3. **02-owa-cwa.mdx** third (builds on DL to explain the key assumption difference)
4. **03-reasoning-types.mdx** fourth (uses DL and OWA context to explain 4 reasoning types)
5. **04-reasoners.mdx** fifth (introduces the software tools that perform reasoning)
6. **05-complexity.mdx** sixth (explains performance trade-offs that affect design choices)
7. **06-exercises.mdx** last (synthesizes and tests all prior sessions)

### Content Quality Checklist (per session)

Before marking any session complete, verify:
- [ ] At least 3 "왜 필요한가?" blockquotes present
- [ ] At least 2 "연결 포인트" callouts present (referencing Phase 4, 5, or back to Phase 2)
- [ ] At least 1 "흔한 오해" section present
- [ ] Exactly 1 Mermaid diagram labeled "이번 세션 전체 그림"
- [ ] Mermaid syntax is safe (no apostrophes, no `+` in stateDiagram-v2)
- [ ] All Korean content, English terms defined on first use
- [ ] No JSX imports in MDX
- [ ] Each concept explanation is 300-500 words
- [ ] Real-world analogies included (manufacturing, healthcare, e-commerce)
- [ ] "Problem first, solution second" narrative arc followed
- [ ] YAML frontmatter with title, description, difficulty fields (difficulty: "intermediate")
- [ ] No formal logic notation without immediate Korean plain-language translation

---

## Milestone 1: Introduction and Foundation (Priority High)

### Task 1.1: Generate 00-introduction.mdx

**File:** `content/phase-3/00-introduction.mdx`

**Content outline:**

1. **Title block:**
   - Frontmatter: title "Phase 3 소개: 온톨로지는 어떻게 생각하는가?", description about Phase 3 overview, difficulty intermediate
   - H1: "Phase 3: 온톨로지의 논리적 기반"

2. **Learning objective section:**
   - Core learning goal: "온톨로지가 단순 분류표가 아니라 '추론 엔진'임을 이해한다"
   - Phase 2 connection: "구성 요소를 알았다면, 이제 그것들이 어떻게 '생각'을 만들어내는지를 봐야 한다"
   - Analogy: Phase 2 gave you LEGO blocks; Phase 3 teaches you the instruction manual that lets a machine build with them

3. **"왜 필요한가?" blockquotes (3+):**
   - Why understanding the reasoning mechanism matters before learning OWL syntax
   - Why Phase 3 is the conceptual "leap" that separates ontology from mere taxonomy
   - Why this Phase matters for practical work: without reasoning, ontology is just an expensive dictionary

4. **Roadmap Mermaid diagram:**
   - `graph TD` showing Phase 3's 6 content sessions
   - Arrows showing conceptual flow: DL -> OWA/CWA -> Reasoning Types -> Reasoners -> Complexity -> Exercises
   - Korean labels for each node

5. **Session overview:**
   - Session 1: Description Logic -- the mathematical engine
   - Session 2: OWA vs CWA -- the world assumptions that change everything
   - Session 3: Reasoning types -- what machines can infer
   - Session 4: Reasoners -- the software that runs the engine
   - Session 5: Complexity -- the cost of expressiveness
   - Session 6: Exercises and self-assessment

6. **Competency questions preview:**
   - List the 4 questions learners should be able to answer after Phase 3
   - Frame as a challenge: "이 질문에 자신 있게 답할 수 있다면 Phase 4로 넘어가세요"

7. **"흔한 오해" section:**
   - Misconception: "온톨로지의 추론은 AI의 딥러닝과 같은 것이다"
   - Reality: Ontology reasoning is based on formal logic (deduction), not statistical learning (induction). It is deterministic and provably correct, whereas ML is probabilistic.

8. **"연결 포인트" callouts (2+):**
   - Phase 4: After understanding HOW reasoning works, you will learn the language (OWL) that encodes these logical structures
   - Phase 5: The reasoning capabilities you learn here directly impact ontology design methodology choices

---

## Milestone 2: Mathematical Foundation (Priority High)

### Task 2.1: Generate 01-description-logic.mdx

**File:** `content/phase-3/01-description-logic.mdx`

**Content outline:**

1. **Frontmatter:** title "기술 논리(DL)의 직관적 이해", description about Description Logic foundations, difficulty intermediate

2. **Learning objectives (3 bullets):**
   - Understand Description Logic as a decidable subset of First-Order Logic
   - Grasp the key insight: "sufficient class definition enables automatic classification by machines"
   - Recognize why this fundamentally differentiates ontology from databases

3. **"왜 필요한가?" opening blockquote:**
   - Why understanding the mathematical basis matters: it explains WHY ontology can reason and databases cannot

4. **Mermaid diagram -- "이번 세션 전체 그림":**
   - `sequenceDiagram` showing the reasoning process:
     - User defines class with conditions
     - User inputs instance data
     - Reasoner evaluates definitions against instances
     - Returns inferred classification result
   - Korean labels, no apostrophes

5. **What is Description Logic (300-500 words):**
   - FOL too powerful and undecidable -> DL as decidable subset
   - Calculator vs supercomputer analogy
   - Korean terms defined on first use
   - "왜 필요한가?" blockquote before explanation

6. **The key insight: machines judge class membership (300-500 words):**
   - Mammal example (heart + milk -> mammal, whale inferred)
   - Manufacturing analogy (precision + heat resistance -> premium part)
   - Healthcare analogy (fever + cough + PCR positive -> confirmed case)
   - "왜 필요한가?" blockquote before the manufacturing example

7. **How DL differs from databases (300-500 words):**
   - DB: store and retrieve. Ontology: define and derive
   - Concrete SQL vs DL comparison
   - The paradigm shift explained
   - "왜 필요한가?" blockquote

8. **"흔한 오해" section:**
   - Misconception: "기술 논리를 이해하려면 수학 전공이 필요하다"
   - Reality: The intuition behind DL can be grasped by anyone. The formal math is for logicians; practitioners need only understand the principle of "sufficient definition enables automatic classification."

9. **"연결 포인트" callouts (2+):**
   - Phase 4: "기술 논리의 개념이 OWL 언어에서 어떤 문법으로 표현되는지 Phase 4에서 배웁니다"
   - Phase 2 (back): "Phase 2에서 배운 클래스, 속성, 공리가 바로 기술 논리의 구성 요소입니다"

10. **Summary and next session preview**

---

## Milestone 3: World Assumptions (Priority High)

### Task 3.1: Generate 02-owa-cwa.mdx

**File:** `content/phase-3/02-owa-cwa.mdx`

**Content outline:**

1. **Frontmatter:** title "열린 세계 가정(OWA) vs 닫힌 세계 가정(CWA)", description about Open vs Closed World Assumptions, difficulty intermediate

2. **Learning objectives (3 bullets):**
   - Distinguish OWA and CWA with concrete examples
   - Understand why ontologies use OWA and databases use CWA
   - Recognize the design implications of OWA for ontology constraint modeling

3. **"왜 필요한가?" opening blockquote:**
   - This is the single most confusing concept for ontology beginners. Understanding it prevents the most common design mistakes.

4. **Mermaid diagram -- "이번 세션 전체 그림":**
   - `stateDiagram-v2` showing:
     - RecordExists -> KnownTrue
     - NoRecord -> AssumedFalse (CWA path)
     - NoRecord -> Unknown (OWA path)
   - Korean labels, NO apostrophes, NO `+` operator

5. **CWA section (300-500 words):**
   - SQL analogy, resident registration system
   - "왜 필요한가?" blockquote

6. **OWA section (300-500 words):**
   - Web incompleteness analogy, semantic web vision
   - "왜 필요한가?" blockquote

7. **Design implications (300-500 words):**
   - Spouse field example (DB vs ontology interpretation)
   - How to handle negation explicitly
   - Common beginner trap: CWA-style constraints in OWA world
   - "왜 필요한가?" blockquote

8. **Comparison table (CWA vs OWA):**
   - Absence of info, Constraint validation, Use case, Example systems

9. **"흔한 오해" section:**
   - Misconception: "OWA는 불편하기만 한 제약이다. CWA가 더 실용적이다"
   - Reality: OWA reflects the reality of distributed, incomplete knowledge. It is not a limitation but a design choice for open domains. In closed, controlled systems, CWA (databases) is indeed appropriate -- the key is knowing which assumption fits your domain.

10. **"연결 포인트" callouts (2+):**
    - Phase 4: "OWL에서 OWA를 적용한 제약 조건을 어떻게 작성하는지 Phase 4에서 배웁니다"
    - Phase 5: "온톨로지 설계 시 OWA를 고려한 패턴과 안티패턴을 Phase 5에서 다룹니다"

11. **Summary and next session preview**

---

## Milestone 4: Reasoning Mechanisms (Priority High)

### Task 4.1: Generate 03-reasoning-types.mdx

**File:** `content/phase-3/03-reasoning-types.mdx`

**Content outline:**

1. **Frontmatter:** title "추론의 종류", description about ontology reasoning types, difficulty intermediate

2. **Learning objectives (3 bullets):**
   - Name and explain the 4 major types of ontology reasoning
   - Distinguish classification (class-to-class) from realization (instance-to-class)
   - Understand how transitive, inverse, and symmetric properties generate inferred facts

3. **"왜 필요한가?" opening blockquote:**
   - Reasoning is what separates ontology from every other knowledge representation approach. Without reasoning, ontology is just an expensive taxonomy.

4. **Mermaid diagram -- "이번 세션 전체 그림":**
   - `graph TD` with "Reasoning Engine" center node and 4 branches:
     - Consistency Checking -> finds contradictions
     - Classification -> builds hierarchy
     - Realization -> classifies instances
     - Property Inference -> derives new facts
   - Korean labels

5. **Consistency Checking (300-500 words):**
   - Bachelor contradiction example
   - Manufacturing QC analogy
   - Korean regulation audit analogy
   - "왜 필요한가?" blockquote

6. **Classification / Subsumption (300-500 words):**
   - Whale -> Mammal automatic inference
   - E-commerce self-organizing categories
   - "왜 필요한가?" blockquote

7. **Instance Realization (300-500 words):**
   - Animal instance auto-classified based on properties
   - Difference from Classification clearly stated
   - Manufacturing component auto-categorization
   - "왜 필요한가?" blockquote

8. **Property Inference (300-500 words):**
   - Transitive: ancestor chain
   - Inverse: teaches/taughtBy
   - Symmetric: sibling
   - Drug interaction symmetric example (healthcare)
   - Why one declaration generates multiple facts

9. **"흔한 오해" section:**
   - Misconception: "추론은 느리고 비실용적이다"
   - Reality: Modern reasoners handle ontologies with hundreds of thousands of concepts in seconds. Performance is a design choice (OWL profile selection), not an inherent limitation.

10. **"연결 포인트" callouts (2+):**
    - Phase 4: "이 추론들을 OWL에서 어떤 구문으로 표현하는지 Phase 4에서 배웁니다"
    - Phase 7: "추론 기능이 지식 그래프와 Graph RAG 시스템에서 어떻게 활용되는지 Phase 7에서 다룹니다"

11. **Summary and next session preview**

---

## Milestone 5: Reasoner Tools (Priority High)

### Task 5.1: Generate 04-reasoners.mdx

**File:** `content/phase-3/04-reasoners.mdx`

**Content outline:**

1. **Frontmatter:** title "추론기의 역할과 OWL 표현력", description about reasoner tools and OWL expressiveness, difficulty intermediate

2. **Learning objectives (3 bullets):**
   - Name 3 major reasoners and their characteristics
   - Understand completeness and soundness guarantees
   - Distinguish OWL Lite, OWL DL, and OWL Full by reasoning capability

3. **"왜 필요한가?" opening blockquote:**
   - Understanding reasoners is essential because the reasoner you choose constrains what your ontology can express and how fast it performs.

4. **Mermaid diagram -- "이번 세션 전체 그림":**
   - `graph LR` showing: OWL Ontology -> Reasoner (HermiT / Pellet / FaCT++) -> Inferred Facts
   - Annotations for soundness and completeness
   - Korean labels

5. **What reasoners do (300-500 words):**
   - Software engines taking OWL input, producing inferences
   - HermiT, Pellet, FaCT++ brief profiles
   - Integration with Protege
   - "왜 필요한가?" blockquote

6. **Completeness and Soundness (300-500 words):**
   - Sound judge / complete detective analogy
   - Why both properties matter
   - What happens when one is missing
   - "왜 필요한가?" blockquote

7. **OWL expressiveness levels (300-500 words):**
   - OWL Lite, OWL DL, OWL Full hierarchy
   - Why OWL DL is the sweet spot
   - Arithmetic / algebra / unsolvable equations analogy
   - "왜 필요한가?" blockquote

8. **Reasoner performance affects design (200-300 words):**
   - Use only constructs you need
   - Preview of OWL 2 profiles in next session

9. **"흔한 오해" section:**
   - Misconception: "추론기는 다 똑같다. 아무거나 쓰면 된다"
   - Reality: Each reasoner has different strengths. HermiT excels at OWL 2 DL, Pellet supports SWRL rules, FaCT++ offers C++ speed. The choice affects both capability and performance.

10. **"연결 포인트" callouts (2+):**
    - Phase 4: "OWL Lite, DL, Full의 구체적인 문법 차이를 Phase 4에서 배웁니다"
    - Phase 6: "실제 온톨로지(SNOMED CT 등)가 어떤 추론기와 OWL 하위언어를 사용하는지 Phase 6에서 분석합니다"

11. **Summary and next session preview**

---

## Milestone 6: Complexity and Profiles (Priority High)

### Task 6.1: Generate 05-complexity.mdx

**File:** `content/phase-3/05-complexity.mdx`

**Content outline:**

1. **Frontmatter:** title "계산 복잡도와 프로파일 선택", description about computational complexity and OWL 2 profiles, difficulty intermediate

2. **Learning objectives (3 bullets):**
   - Understand the expressiveness vs performance trade-off
   - Name and distinguish OWL 2 EL, QL, and RL profiles
   - Make informed profile selection decisions based on use case

3. **"왜 필요한가?" opening blockquote:**
   - Choosing the wrong OWL profile can mean the difference between a system that responds in milliseconds and one that never finishes computing.

4. **Mermaid diagram -- "이번 세션 전체 그림":**
   - `graph LR` showing expressiveness spectrum: EL -> QL -> RL -> DL (full)
   - Performance arrows: fast -> medium -> medium -> slower
   - Korean labels

5. **Why complexity matters (300-500 words):**
   - Small vs large ontology reasoning time
   - SNOMED CT scale example
   - "1 second vs heat death of the universe" illustration
   - "왜 필요한가?" blockquote

6. **OWL 2 Profiles (400-500 words):**
   - EL: large hierarchies, polynomial, SNOMED CT / Gene Ontology
   - QL: query optimization, SQL rewritable, enterprise data integration
   - RL: rule-based, business rules, policy enforcement
   - Each with: strengths, limitations, real-world use cases
   - "왜 필요한가?" blockquote before profiles

7. **Trade-off visualization (300-400 words):**
   - When to use OWL DL vs profiles
   - Decision guide based on ontology size and requirements
   - "왜 필요한가?" blockquote

8. **Size and performance relationship (200-300 words):**
   - < 1K classes: any sublanguage
   - 1K-100K: profile selection matters
   - 100K+: profile mandatory
   - SNOMED CT reference (350K+ concepts, EL profile)

9. **"흔한 오해" section:**
   - Misconception: "항상 가장 표현력 높은 OWL DL을 쓰면 된다"
   - Reality: Expressiveness you do not use is a performance cost you pay for nothing. Choose the profile that matches your actual needs.

10. **"연결 포인트" callouts (2+):**
    - Phase 6: "SNOMED CT가 왜 OWL 2 EL을 선택했는지 Phase 6에서 구체적으로 분석합니다"
    - Phase 5: "온톨로지 설계 시 프로파일 선택이 설계 패턴에 미치는 영향을 Phase 5에서 다룹니다"

11. **Summary and next session preview**

---

## Milestone 7: Exercises and Assessment (Priority High)

### Task 7.1: Generate 06-exercises.mdx

**File:** `content/phase-3/06-exercises.mdx`

**Content outline:**

1. **Frontmatter:** title "Phase 3 종합 실습과 핵심 질문", description about comprehensive exercises and competency questions, difficulty intermediate

2. **Phase 3 concept map Mermaid diagram:**
   - `graph TD` connecting all Phase 3 concepts:
     - Description Logic -> enables -> Reasoning
     - OWA/CWA -> constrains -> Reasoning design
     - Reasoning -> types: Consistency, Classification, Realization, Property Inference
     - Reasoners -> execute -> Reasoning
     - Complexity -> limits -> Reasoners
     - OWL Profiles -> optimize -> Complexity
   - Korean labels throughout

3. **Phase 3 recap (200-300 words):**
   - Brief summary of sessions 01-05
   - Narrative arc: mathematical foundation -> world assumptions -> reasoning capabilities -> tools -> trade-offs

4. **Basic exercises (기본 실습):**

   **Exercise 1:** Protege + HermiT Reasoner First Run
   - Install Protege (link and brief instructions)
   - Create 5-class animal ontology (Animal, Mammal, Bird, Whale, Penguin)
   - Define necessary/sufficient conditions for Mammal and Bird
   - Run HermiT reasoner
   - Observe Whale auto-classified under Mammal, Penguin under Bird
   - Step-by-step with screenshots guidance

   **Exercise 2:** OWA vs CWA Thought Experiment
   - Provided data table about employees
   - "Does Park work in Engineering?" -- answer from CWA and OWA perspectives
   - Explanation of why answers differ
   - Design implications discussion

5. **Challenge exercises (도전 실습):**

   **Exercise 3:** Bachelor Contradiction Detection
   - Define "Bachelor = Person AND NOT married" in Protege
   - Create contradictory instance (married bachelor)
   - Run reasoner and document inconsistency report
   - Explanation of what the reasoner detected and why

   **Exercise 4:** CWA/OWA Difference Experiment
   - Design experiment comparing SQL query behavior (missing data = false) with OWL reasoner behavior (missing data = unknown)
   - Write expected results and explain reasoning
   - Connect to real-world implications

6. **Competency questions with guidance:**
   - Question 1: OWA vs CWA with real example + design impact (Reference: Session 02)
   - Question 2: Classification vs Realization difference (Reference: Session 03)
   - Question 3: Ontology without reasoner loses what? (Reference: Sessions 03, 04)
   - Question 4: Why OWL DL is more limited than OWL Full (Reference: Sessions 04, 05)

7. **Self-assessment checklist (5 items)**

8. **"연결 포인트" callouts:**
   - Phase 4: "추론의 원리를 이해했으니, 이제 추론을 가능하게 하는 언어(RDF, RDFS, OWL)를 배울 시간입니다"
   - Phase 5: "실습에서 경험한 온톨로지 설계 패턴이 Phase 5의 설계 방법론과 직접 연결됩니다"

9. **"흔한 오해" section:**
   - Misconception: "추론 개념을 이론적으로 이해하면 충분하다"
   - Reality: Ontology reasoning must be experienced hands-on. Running a reasoner and seeing automatic classification happen is the moment when the abstract concepts become concrete.

---

## Build Verification

After all 7 files are generated:

1. Run `bun run build` (or `npm run build`) -- zero errors expected
2. Run `bun run dev` and navigate to each Phase 3 page -- all content renders
3. Verify all Mermaid diagrams render without syntax errors (pay special attention to `stateDiagram-v2` in session 02)
4. Verify no MDX parsing errors in browser console
5. Verify sidebar navigation shows all 7 Phase 3 sessions with Korean labels
6. Verify "intermediate" difficulty tag is correct in frontmatter

---

## Risk Assessment

### Risk 1: Mermaid stateDiagram-v2 Syntax Issues

**Probability:** Medium-High
**Impact:** Diagram shows error instead of visual in session 02
**Mitigation:** Follow S-005 constraints strictly. Use simple state names without special characters. Test with the exact safe pattern from the spec. Avoid `+` operator entirely. If stateDiagram-v2 proves problematic, fallback to `graph TD` with state-like nodes.

### Risk 2: Oversimplification of Description Logic

**Probability:** Medium
**Impact:** Content becomes too shallow for the "intermediate" difficulty level, or inaccurate for knowledgeable readers
**Mitigation:** Follow the calibration rule S-008: always provide the intuitive analogy FIRST, then the accurate technical explanation. Include a "deeper dive" footnote or callout for readers who want formal details, without requiring it for basic understanding.

### Risk 3: OWA/CWA Confusion Not Addressed Sufficiently

**Probability:** Medium
**Impact:** Learners remain confused about the most critical Phase 3 concept
**Mitigation:** Dedicate extra space to session 02. Use multiple examples from different domains. Include the comparison table. Provide explicit "common trap" scenarios. The exercise session includes a dedicated OWA/CWA thought experiment.

### Risk 4: Content Depth Insufficiency for Reasoning Types

**Probability:** Low
**Impact:** Session 03 covers 4 reasoning types superficially
**Mitigation:** Each reasoning type gets its own dedicated section (300-500 words each). Each includes a concrete example and a domain analogy. Total session word count is 2,000-3,000 words -- the longest in Phase 3.

### Risk 5: Academic Inaccuracy in OWL Profile Descriptions

**Probability:** Low
**Impact:** Incorrect characterization of OWL 2 EL/QL/RL capabilities
**Mitigation:** Descriptions follow W3C OWL 2 Profiles specification. SNOMED CT's use of EL profile is well-documented. Cross-reference with authoritative sources during writing.

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
| SPEC-CONTENT-P1 | Conceptual prerequisite (Phase 1 content) | Reference |
| SPEC-CONTENT-P2 (if exists) | Conceptual prerequisite (Phase 2 content) | Reference |
| `content/phase-3/_meta.js` | Must exist with correct entries | Required (from SPEC-INFRA-001) |
| MermaidDiagram component | Must be functional | Required (from SPEC-INFRA-001) |
| Curriculum document (`my-docs/edu-content.md`) | Content source | Reference |
