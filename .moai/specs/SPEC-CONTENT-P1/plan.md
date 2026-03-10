---
id: SPEC-CONTENT-P1
version: "1.0.0"
status: draft
created: "2026-03-10"
updated: "2026-03-10"
author: jw
priority: high
---

# Implementation Plan: SPEC-CONTENT-P1 -- Phase 1 MDX Content Generation

## Overview

This plan details the implementation approach for generating 6 complete MDX content files for Phase 1 ("Why Do We Need Ontology?") of the Ontology Fundamentals Learning Platform. The work is pure content authoring -- no infrastructure, components, or configuration changes.

---

## Prerequisites

- SPEC-INFRA-001 fully implemented (skeleton MDX files exist, Nextra site builds)
- `content/phase-1/` directory with 6 skeleton MDX files and `_meta.js`
- MermaidDiagram component functional and globally available
- `bun run dev` starts successfully

---

## Implementation Strategy

### Approach: Sequential Content Generation

Content sessions are generated sequentially because each session builds conceptual foundations for the next:

1. **00-introduction.mdx** first (provides roadmap and framing)
2. **01-motivation.mdx** second (establishes data/information/knowledge foundation)
3. **02-interoperability.mdx** third (builds on "knowledge needs formalization" from 01)
4. **03-gruber-definition.mdx** fourth (formalizes what ontology IS based on problems from 01-02)
5. **04-benefits.mdx** fifth (contrasts prior approaches using concepts from 01-03)
6. **05-exercises.mdx** last (synthesizes and tests all prior sessions)

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
- [ ] Real-world analogies included (manufacturing, healthcare, e-commerce)
- [ ] "Problem first, solution second" narrative arc followed
- [ ] YAML frontmatter with title, description, difficulty fields

---

## Milestone 1: Introduction and Foundation (Priority High)

### Task 1.1: Generate 00-introduction.mdx

**File:** `content/phase-1/00-introduction.mdx`

**Content outline:**

1. **Title block:**
   - Frontmatter: title "Phase 1 소개: 온톨로지의 세계로", description about Phase 1 overview, difficulty beginner
   - H1: "Phase 1: 왜 온톨로지가 필요한가?"

2. **Learning objective section:**
   - State the core learning goal: "이게 왜 존재하는지를 이해한다"
   - Explain why starting with motivation matters (not memorizing definitions)
   - Include the curriculum's guiding principle: "동기 없이 개념부터 외우면 오래 못 간다"

3. **"왜 필요한가?" blockquotes (3+):**
   - Why we start with motivation before concepts
   - Why ontology matters for modern data-driven work
   - Why this Phase is the foundation for everything else

4. **Roadmap Mermaid diagram:**
   - `graph TD` showing Phase 1's 5 content sessions
   - Arrows showing conceptual flow from motivation -> interoperability -> definition -> benefits -> exercises
   - Korean labels for each node

5. **Session overview:**
   - Session 1: Data/Information/Knowledge distinction
   - Session 2: Interoperability failures
   - Session 3: Gruber's definition decomposed
   - Session 4: Prior approaches and their limitations
   - Session 5: Exercises and self-assessment

6. **Competency questions preview:**
   - List the 3 questions learners should be able to answer after Phase 1
   - Frame as a challenge: "이 질문에 자신 있게 답할 수 있다면 Phase 2로 넘어가세요"

7. **"흔한 오해" section:**
   - Misconception: "온톨로지는 너무 학문적이라 실무와 관련없다"
   - Reality: Google, Amazon, hospitals all use ontology-based systems daily

8. **"연결 포인트" callouts (2+):**
   - Phase 2: After understanding WHY, you will learn the building blocks (classes, instances, properties)
   - Phase 7: The motivation you learn here directly connects to modern applications (Knowledge Graphs, LLM era)

### Task 1.2: Generate 01-motivation.mdx

**File:** `content/phase-1/01-motivation.mdx`

**Content outline:**

1. **Frontmatter:** title "데이터, 정보, 지식의 차이", description about data/information/knowledge, difficulty beginner

2. **Learning objectives (3 bullets):**
   - Distinguish data, information, and knowledge with concrete examples
   - Understand why computers handle data easily but struggle with knowledge
   - Recognize the gap that ontology fills between information and machine-processable knowledge

3. **"왜 필요한가?" opening blockquote:**
   - Why understanding this distinction matters before learning about ontology

4. **Mermaid diagram -- "이번 세션 전체 그림":**
   - `graph LR` showing Data -> Information -> Knowledge progression
   - Annotations on each arrow: "맥락 추가" and "판단 규칙 추가"
   - Branch showing computer capability: data (easy), information (moderate), knowledge (needs help)

5. **Core concept: 38.5 example (300-500 words):**
   - Full narrative with the temperature example
   - Step-by-step escalation from raw number to actionable knowledge
   - "왜 필요한가?" blockquote before introducing why this matters for machines

6. **Manufacturing analogy (300-400 words):**
   - Motor temperature 235 degrees example
   - Smart factory context relevant to Korean manufacturing
   - Explain how ontology enables the "knowledge layer" in automated systems

7. **E-commerce analogy (200-300 words):**
   - SKU code to product recommendation chain
   - Korean e-commerce context

8. **Core insight: The gap ontology fills (300-500 words):**
   - "왜 필요한가?" blockquote before this section
   - Detailed explanation of why machines need formalized knowledge
   - Introduce ontology as "the something more" that bridges the gap
   - Preview: ontology provides a way to write down knowledge so machines can reason with it

9. **"흔한 오해" section:**
   - Misconception: "AI가 이미 지식을 이해하지 않나? ChatGPT도 지식을 다루는데?"
   - Reality: LLMs process patterns in text, not structured knowledge. They can generate plausible-sounding answers but cannot reason logically about relationships.

10. **"연결 포인트" callouts:**
    - Phase 2: "데이터와 지식의 차이를 알았다면, 이제 지식을 구조화하는 재료(클래스, 인스턴스, 속성)를 배웁니다"
    - Phase 3: "기계가 지식을 '처리'한다는 것이 구체적으로 무엇인지 -- 추론(Reasoning) -- 을 Phase 3에서 다룹니다"

11. **Summary and next session preview**

---

## Milestone 2: Problem Cases (Priority High)

### Task 2.1: Generate 02-interoperability.mdx

**File:** `content/phase-1/02-interoperability.mdx`

**Content outline:**

1. **Frontmatter:** title "시스템 간 의사소통 실패 사례", description about interoperability failures, difficulty beginner

2. **Learning objectives (3 bullets):**
   - Identify real-world cases where different systems fail to communicate
   - Understand the concept of interoperability and its three levels
   - Recognize why ontology emerged as a solution to semantic interoperability problems

3. **"왜 필요한가?" opening blockquote:**
   - Connecting from previous session: now that we know knowledge needs to be formalized, what happens when systems do not share the same understanding?

4. **Mermaid diagram -- "이번 세션 전체 그림":**
   - `sequenceDiagram` with participants System A and System B
   - Show data exchange where "Patient" means different things
   - Note annotation showing semantic gap
   - Resolution note showing "Ontology defines shared meaning"

5. **Hospital EMR example (400-500 words):**
   - Full narrative with Hospital A (inpatients only) and Hospital B (includes outpatients)
   - Detail the cascading failures: wrong patient counts, insurance claim errors, research data reliability
   - "왜 필요한가?" blockquote explaining why this is not just a tech problem but a patient safety issue
   - Korean healthcare context (건강보험심사평가원, 전자의무기록 interoperability)

6. **E-commerce category example (300-400 words):**
   - Two shopping malls with different hierarchies
   - Search integration failures
   - Korean e-commerce context (쿠팡, 네이버 쇼핑 platform integration challenges)

7. **Ambiguity example -- "사과" (300-400 words):**
   - Fruit, Apple Inc., apology
   - Extend to English examples (bank, crane)
   - How context resolves ambiguity for humans but not machines
   - "왜 필요한가?" blockquote about why formal context is essential

8. **Interoperability concept (300-400 words):**
   - Define 상호운용성(Interoperability)
   - Three levels: syntactic (format compatibility), semantic (meaning alignment), pragmatic (intent matching)
   - Ontology addresses the semantic level specifically

9. **"흔한 오해" section:**
   - Misconception: "데이터 포맷만 통일하면 상호운용성 문제가 해결된다"
   - Reality: Syntactic compatibility (same file format) does not solve semantic mismatch. JSON files can have identical structures but completely different meanings.

10. **"연결 포인트" callouts:**
    - Phase 4: "이 문제를 해결하기 위해 만들어진 표준 언어(RDF, OWL)를 Phase 4에서 배웁니다"
    - Phase 6: "실제로 의료 분야에서 이 문제를 해결한 SNOMED CT와 HL7 FHIR을 Phase 6에서 분석합니다"

11. **Summary and next session preview**

---

## Milestone 3: Formal Definition (Priority High)

### Task 3.1: Generate 03-gruber-definition.mdx

**File:** `content/phase-1/03-gruber-definition.mdx`

**Content outline:**

1. **Frontmatter:** title "'공유된 개념화의 명시적 명세' 해체", description about Gruber's ontology definition, difficulty beginner

2. **Learning objectives (3 bullets):**
   - Cite and explain Gruber's 1993 definition of ontology
   - Decompose the definition into 4 components and explain each with concrete examples
   - Understand what is lost when any single component is removed

3. **"왜 필요한가?" opening blockquote:**
   - Why a formal definition matters: without clear definition, "ontology" becomes a buzzword with no substance

4. **Mermaid diagram -- "이번 세션 전체 그림":**
   - `graph TD` with "Ontology" at center
   - 4 branches: Explicit, Specification, Conceptualization, Shared
   - Each branch has a brief Korean description
   - Sub-nodes showing "without this: [consequence]"

5. **Original quote and context (200-300 words):**
   - Present Gruber 1993 original English quote
   - Present extended version with "shared" (Borst 1997 / Studer et al. 1998)
   - Brief context about who Gruber is and why this definition became canonical

6. **Component 1 -- Explicit (300-500 words):**
   - "왜 필요한가?" blockquote before explanation
   - "Good customer" multi-department example
   - Legal contract vs. verbal agreement analogy
   - What happens without explicitness: ambiguity, inconsistency, hidden assumptions

7. **Component 2 -- Specification (300-500 words):**
   - "왜 필요한가?" blockquote before explanation
   - Natural language hospital classification vs. OWL representation
   - Blueprint vs. verbal description analogy
   - What happens without formal specification: machines cannot process it

8. **Component 3 -- Conceptualization (300-500 words):**
   - Map analogy: subway map vs. road map vs. satellite photo
   - Every conceptualization involves abstraction choices
   - What happens without conceptualization: trying to model everything, ending up with nothing useful

9. **Component 4 -- Shared (300-500 words):**
   - "왜 필요한가?" blockquote before explanation
   - Hospital internal classification vs. HL7 FHIR community standard
   - The "without shared = personal notes" insight
   - What happens without sharing: each developer creates their own classification

10. **Synthesis table:**
    - 4x4 table: with/without each component, what you get
    - Examples: personal notes, natural language doc, individual database schema, true ontology

11. **"흔한 오해" section:**
    - Misconception: "온톨로지는 그냥 용어 사전(glossary)이다"
    - Reality: A glossary defines terms but lacks formal logic, reasoning capability, and relationships between concepts

12. **"연결 포인트" callouts:**
    - Phase 2: "'명세'를 실제로 작성하는 재료인 클래스, 속성, 공리를 Phase 2에서 배웁니다"
    - Phase 5: "'공유된 개념화'를 실제로 설계하는 방법론(METHONTOLOGY, Competency Questions)을 Phase 5에서 배웁니다"

13. **Summary and next session preview**

---

## Milestone 4: Comparative Analysis (Priority High)

### Task 4.1: Generate 04-benefits.mdx

**File:** `content/phase-1/04-benefits.mdx`

**Content outline:**

1. **Frontmatter:** title "온톨로지 없이 해결하려 했던 방법과 한계", description about prior approaches and limitations, difficulty beginner

2. **Learning objectives (3 bullets):**
   - Evaluate 3 approaches to knowledge organization that preceded ontology
   - Identify the specific limitations of each approach
   - Understand what ontology adds that these approaches cannot provide

3. **"왜 필요한가?" opening blockquote:**
   - Why learning about failed approaches matters: understanding limitations clarifies what makes ontology different

4. **Mermaid diagram -- "이번 세션 전체 그림":**
   - `graph LR` showing three approaches (DB Schema, Natural Language, Taxonomy)
   - Each hitting a "limitation wall" node
   - Ontology node bridging all three with annotations showing what it adds

5. **Approach 1: Database Schema Unification (400-500 words):**
   - "왜 필요한가?" blockquote before this section
   - What it is, when it works
   - Manufacturing example: production line change requiring complete DB restructuring
   - Limitations: rigid, domain-coupled, cannot express rich relationships
   - What ontology adds: domain-independent, flexible schema evolution

6. **Approach 2: Natural Language Documents (300-400 words):**
   - ISO standard ambiguity example ("regularly maintained")
   - Limitations: machine-unreadable, ambiguous, interpretation-dependent
   - What ontology adds: formal language enabling machine processing

7. **Approach 3: Taxonomy (300-400 words):**
   - "왜 필요한가?" blockquote before this section
   - Dewey Decimal System example
   - Limitations: hierarchy-only, cannot express diverse relationship types
   - What ontology adds: rich relationships, axioms, reasoning

8. **Comprehensive comparison table:**
   - Rows: DB Schema, Natural Language, Taxonomy, Ontology
   - Columns: Machine-Readable, Rich Relationships, Reasoning, Flexibility, Community Standard
   - Each cell with brief Korean explanation

9. **The key differentiator: Reasoning (200-300 words):**
   - "왜 필요한가?" blockquote
   - Reasoning is what separates ontology from all other approaches
   - Brief preview of what reasoning enables (detailed in Phase 3)

10. **"흔한 오해" section:**
    - Misconception: "온톨로지는 데이터베이스를 대체하는 것이다"
    - Reality: Ontology complements databases by adding a semantic layer. They often work together, not as replacements.

11. **"연결 포인트" callouts:**
    - Phase 3: "추론(Reasoning)이 구체적으로 어떻게 작동하는지 Phase 3에서 배웁니다"
    - Phase 8: "온톨로지도 만능이 아닙니다. 언제 다른 방법이 더 적합한지 Phase 8에서 다룹니다"

12. **Summary and next session preview**

---

## Milestone 5: Exercises and Assessment (Priority High)

### Task 5.1: Generate 05-exercises.mdx

**File:** `content/phase-1/05-exercises.mdx`

**Content outline:**

1. **Frontmatter:** title "Phase 1 종합 실습", description about comprehensive exercises, difficulty beginner

2. **Phase 1 concept map Mermaid diagram:**
   - `graph TD` connecting all Phase 1 concepts
   - Data/Info/Knowledge -> Interoperability Problem -> Gruber Definition -> Prior Approaches -> Ontology Need
   - Korean labels throughout

3. **Phase 1 recap (200-300 words):**
   - Brief summary of sessions 01-04
   - Emphasize the narrative arc: problem -> definition -> why this is the solution

4. **Basic exercises (기본 실습):**

   **Exercise 1:** Domain Term Ambiguity Discovery
   - Clear task description
   - Guidance hints (think about terms like "process", "model", "resource")
   - Example answer format template
   - Difficulty: easy

   **Exercise 2:** Data-Information-Knowledge Classification
   - 10 items list for classification
   - Items span manufacturing, healthcare, e-commerce
   - Answer key with brief explanations for each

   **Exercise 3:** Interoperability Problem Identification
   - Task: describe a real-world situation
   - Guided questions template
   - Answer structure template

5. **Challenge exercises (도전 실습):**

   **Exercise 4:** Context Addition for Machine Understanding
   - Build on Exercise 1 results
   - Write natural language descriptions of what additional context machines need
   - This is the "seed" of ontology thinking

   **Exercise 5:** Gruber Definition Application
   - Apply 4 components to a concept from learner's domain
   - Evaluate which components are present/missing
   - Identify what changes if missing components are added

6. **Competency questions with guidance:**
   - Question 1: DB vs. Ontology with guidance and session references
   - Question 2: "Shared" component removal consequences with guidance
   - Question 3: Cost of non-ontology interoperability with guidance

7. **Self-assessment checklist (4 items)**

8. **"연결 포인트" callouts:**
   - Phase 2: "이제 '왜'를 알았으니, '무엇으로'를 배울 시간입니다"
   - Phase 5: "Exercise 1과 4에서 한 작업이 바로 온톨로지 설계의 첫 단계입니다. Phase 5에서 체계적인 방법론을 배웁니다"

9. **"흔한 오해" section:**
   - Misconception: "실습 없이 개념만 읽으면 충분하다"
   - Reality: Ontology is a practical skill. Like learning to code, you must practice formulating concepts yourself.

---

## Build Verification

After all 6 files are generated:

1. Run `bun run build` (or `npm run build`) -- zero errors expected
2. Run `bun run dev` and navigate to each Phase 1 page -- all content renders
3. Verify all Mermaid diagrams render without syntax errors
4. Verify no MDX parsing errors in browser console
5. Verify sidebar navigation shows all 6 Phase 1 sessions with Korean labels

---

## Risk Assessment

### Risk 1: Mermaid Syntax Errors

**Probability:** Medium
**Impact:** Build may not fail, but diagrams will show error messages instead of visuals
**Mitigation:** Follow S-005 Mermaid syntax constraints strictly. Use only safe diagram types. Quote all Korean text labels. Test each diagram type before generating content.

### Risk 2: Content Depth Insufficiency

**Probability:** Low
**Impact:** Content is too shallow for the 300-500 word requirement per concept
**Mitigation:** Use the detailed content outlines in this plan. Each concept section includes specific examples, analogies, and narrative structure. Implementation agent should follow the outline point by point.

### Risk 3: Cross-Reference Errors

**Probability:** Low
**Impact:** Forward references to nonexistent phases would confuse learners
**Mitigation:** Only reference Phase 2-8, which are defined in the curriculum. Use generic phase descriptions rather than specific session filenames from other phases.

### Risk 4: Academic Inaccuracy

**Probability:** Low
**Impact:** Incorrect attribution or definition could undermine educational credibility
**Mitigation:** Gruber (1993) citation is well-established. Extended "shared" definition attributed to Borst (1997) / Studer et al. (1998). All examples are based on common patterns in the ontology education literature.

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
| `content/phase-1/_meta.js` | Must exist with correct entries | Required (from SPEC-INFRA-001) |
| MermaidDiagram component | Must be functional | Required (from SPEC-INFRA-001) |
| Curriculum document (`my-docs/edu-content.md`) | Content source | Reference |
