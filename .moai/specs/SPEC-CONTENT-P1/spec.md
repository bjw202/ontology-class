---
id: SPEC-CONTENT-P1
version: "1.0.0"
status: draft
created: "2026-03-10"
updated: "2026-03-10"
author: jw
priority: high
---

# SPEC-CONTENT-P1: Phase 1 MDX Content Generation -- "Why Do We Need Ontology?"

## Overview

This SPEC defines the complete MDX content generation for Phase 1 of the Ontology Fundamentals Learning Platform. Phase 1 covers the foundational motivation for ontology: why it exists, what problems it solves, and how it is formally defined. The content targets Korean-speaking beginners with no prior ontology knowledge and must be detailed, principle-oriented, and easy to understand.

This SPEC produces 6 MDX files that replace the skeleton files created by SPEC-INFRA-001. Each file is a fully written educational session with Korean explanations, English technical terms, Mermaid diagrams, callouts, and exercises.

**Scope boundary:** This SPEC covers content authoring only. Infrastructure, components, styling, and build configuration are handled by SPEC-INFRA-001.

---

## Environment

### Content Platform

- **Framework:** Nextra 4.x with Next.js 15 App Router (established by SPEC-INFRA-001)
- **Content Format:** MDX files in `content/phase-1/` directory
- **Content Language:** Korean (all explanations), English (technical terms with Korean definition on first use)
- **Diagram Engine:** Mermaid 11.12.2 (client-side rendering via MermaidDiagram component)
- **Target Audience:** Korean-speaking beginners (25-50 years old) from manufacturing, AI, and knowledge management domains

### Content Quality Standards (per session)

| Element | Minimum Count | Format |
|---------|---------------|--------|
| "왜 필요한가?" blockquotes | 3 per session | `> **왜 필요한가?** [explanation]` |
| "연결 포인트" callouts | 2 per session | `> **연결 포인트 -> Phase [N]**: [connection]` |
| "흔한 오해" section | 1 per session | `> **흔한 오해**: "[misconception]"` / `> **실제로는**: [correction]` |
| Mermaid diagram | 1 per session | labeled "이번 세션 전체 그림" |
| Concept explanation depth | 300-500 words each | Principle-oriented, with analogies |

### Narrative Arc (mandatory per concept)

Every major concept follows this structure:
1. **Problem first**: Describe the limitation of the previous approach
2. **Concept introduction**: Present the new concept as the solution
3. **Why this matters**: Explain practical impact with real-world examples
4. **Connection forward**: Link to where this concept leads in later phases

---

## Assumptions

### A-001: Infrastructure Ready

SPEC-INFRA-001 has been implemented. The `content/phase-1/` directory exists with skeleton MDX files, `_meta.js` navigation is configured, the MermaidDiagram component is functional, and `mdx-components.tsx` makes custom components available globally.

### A-002: No JSX Imports

Per SPEC-INFRA-001 constraint C-002, MDX files must not contain `import` statements. All components are globally available. Callouts and special formatting use blockquote `>` syntax exclusively.

### A-003: Mermaid Safe Syntax

Mermaid diagrams must follow safe syntax rules:
- No apostrophes in node labels
- No `+` operator in `stateDiagram-v2`
- Use `["double quoted labels"]` for labels with special characters
- Allowed types: `graph TD`, `graph LR`, `sequenceDiagram`, `stateDiagram-v2`, `erDiagram`, `classDiagram`

### A-004: Skeleton File Replacement

Each generated MDX file replaces the corresponding skeleton file in `content/phase-1/`. The YAML frontmatter structure (`title`, `description`, `difficulty`) established by SPEC-INFRA-001 is preserved, but content sections are fully written.

### A-005: Audience Knowledge Level

Readers have zero prior ontology knowledge. They may have background in programming (Python, basic data structures) or domain expertise (manufacturing, healthcare, e-commerce). All ontology concepts must be explained from first principles with concrete analogies.

### A-006: Curriculum Source

All Phase 1 content follows the curriculum defined in `my-docs/edu-content.md`, specifically the "Phase 1 -- Why Do We Need Ontology?" section covering sessions 1-1 through 1-4 plus exercises and competency questions.

---

## Requirements

### R-001: Complete Phase 1 Content Set [UBIQUITOUS]

The system shall provide 6 fully written MDX files for Phase 1 that replace the skeleton content from SPEC-INFRA-001.

**Files:**
| File | Session Title (Korean) | Topic |
|------|----------------------|-------|
| `00-introduction.mdx` | Phase 1 소개: 온톨로지의 세계로 | Phase 1 overview, learning objectives, roadmap |
| `01-motivation.mdx` | 데이터, 정보, 지식의 차이 | Data vs. Information vs. Knowledge distinction |
| `02-interoperability.mdx` | 시스템 간 의사소통 실패 사례 | Interoperability failures and why they happen |
| `03-gruber-definition.mdx` | "공유된 개념화의 명시적 명세" 해체 | Gruber's 1993 definition decomposed into 4 components |
| `04-benefits.mdx` | 온톨로지 없이 해결하려 했던 방법과 한계 | Prior approaches and their limitations |
| `05-exercises.mdx` | Phase 1 종합 실습 | Exercises and competency questions |

### R-002: Korean Content with English Technical Terms [UBIQUITOUS]

Each session shall present all explanations in Korean. English technical terms shall be introduced in parentheses on first use with a Korean definition, then may be used freely afterward.

**First-use format example:**
- "상호운용성(Interoperability) -- 서로 다른 시스템이 데이터를 교환하고 올바르게 해석하는 능력"
- "명세(Specification) -- 형식 언어를 사용해 기계가 읽을 수 있도록 작성한 문서"

### R-003: "왜 필요한가?" Motivation Blockquotes [EVENT-DRIVEN]

**When** a learner reads any session, **the system shall** present at least 3 "왜 필요한가?" blockquotes that explain the motivation for each concept before introducing the solution.

**Format:**
```markdown
> **왜 필요한가?** [explanation of why this concept matters in practical terms]
```

**Placement rule:** Each "왜 필요한가?" blockquote must appear BEFORE the concept explanation it motivates, not after.

### R-004: Mermaid Big-Picture Diagram [UBIQUITOUS]

Each session shall include exactly one Mermaid diagram labeled "이번 세션 전체 그림" using safe Mermaid syntax.

**Diagram requirements per session:**

| Session | Diagram Type | Content Description |
|---------|-------------|-------------------|
| 00-introduction | `graph TD` | Phase 1 roadmap showing 5 sessions and their connections |
| 01-motivation | `graph LR` | Data -> Information -> Knowledge progression with transformation labels |
| 02-interoperability | `sequenceDiagram` | Two systems attempting data exchange and failing due to semantic mismatch |
| 03-gruber-definition | `graph TD` | 4 components of Gruber's definition connected to the central concept "Ontology" |
| 04-benefits | `graph LR` | Comparison flow: DB Schema, Natural Language, Taxonomy each hitting a limitation wall, with Ontology bridging all |
| 05-exercises | `graph TD` | Complete Phase 1 concept map connecting motivation, interoperability, definition, and benefits |

### R-005: No JSX Imports [UNWANTED]

MDX sessions **shall NOT** use JSX import statements. All custom components (MermaidDiagram, Exercise, ConceptCard, CompetencyQuestion) are globally available via `mdx-components.tsx`. Callouts use blockquote `>` syntax.

### R-006: "연결 포인트" Forward References [UBIQUITOUS]

Each session shall include at least 2 "연결 포인트" callouts connecting the current concept to future phases.

**Format:**
```markdown
> **연결 포인트 -> Phase [N]**: [what the learner will learn in that future phase and how it connects to the current concept]
```

### R-007: "흔한 오해" Misconception Sections [UBIQUITOUS]

Each session shall include at least 1 "흔한 오해" (common misconception) section with the misconception stated, then corrected.

**Format:**
```markdown
> **흔한 오해**: "[commonly held incorrect belief]"
> **실제로는**: [correct explanation with reasoning]
```

### R-008: Session 00-introduction.mdx Content [UBIQUITOUS]

The introduction session shall provide:
- Phase 1 title and subtitle in Korean
- Clear statement of Phase 1 learning objective: "이게 왜 존재하는지를 이해한다"
- Brief overview of each of the 5 content sessions (01-05)
- "이번 Phase를 마치면 답할 수 있는 질문" section listing the 3 competency questions
- A Phase 1 roadmap Mermaid diagram
- Encouragement for beginners: "동기 없이 개념부터 외우면 오래 못 간다"
- At least 3 "왜 필요한가?" blockquotes
- At least 2 "연결 포인트" callouts
- At least 1 "흔한 오해" section

### R-009: Session 01-motivation.mdx Content [UBIQUITOUS]

The motivation session shall cover data, information, and knowledge distinction:

**Required content blocks:**

1. **38.5 example (detailed):**
   - `38.5` as raw data (number with no context)
   - "체온이 38.5도" as information (data + context)
   - "38.5도면 발열이고 진료가 필요하다" as knowledge (information + judgment rule)
   - Explain that computers handle data easily, but struggle with knowledge
   - Explain that ontology is the bridge enabling machines to process knowledge

2. **Manufacturing analogy:**
   - Sensor reading `235` (data) vs. "모터 온도 235도" (information) vs. "235도면 과열이고 라인을 멈춰야 한다" (knowledge)
   - Connect to Korean manufacturing context (smart factory, Industry 4.0)

3. **E-commerce analogy:**
   - Product code `SKU-12345` (data) vs. "삼성 갤럭시 S25" (information) vs. "이 고객의 구매 패턴으로 볼 때 이 제품을 추천해야 한다" (knowledge)

4. **Core insight section:**
   - Why computers can only process data natively
   - What "something more" is needed (the gap that ontology fills)
   - The concept of "formalizing knowledge so machines can reason with it"

5. **Mermaid diagram:**
   - `graph LR` showing Data -> Information -> Knowledge progression
   - Each arrow labeled with what transformation occurs
   - A branching path showing "computer handles easily" for data vs. "needs ontology" for knowledge

### R-010: Session 02-interoperability.mdx Content [UBIQUITOUS]

The interoperability session shall cover system communication failures:

**Required content blocks:**

1. **Hospital EMR example (detailed):**
   - Hospital A's "Patient" means inpatients only
   - Hospital B's "Patient" includes outpatients
   - When merging data: patient counts become incorrect, treatment plans get mixed up
   - Real-world consequence: potential medical errors
   - Expand with additional detail: how insurance claims fail, how research data becomes unreliable

2. **E-commerce category example (detailed):**
   - Shopping mall A has "Electronics > Phones > Smartphones" hierarchy
   - Shopping mall B has "Mobile > Devices > Smart Devices" hierarchy
   - Attempting to integrate search produces duplicate results, missing results, or wrong categorization
   - Connect to Korean e-commerce platforms (Coupang, Naver Shopping analogy)

3. **Ambiguity example -- "사과" (apple/Apple/apology):**
   - Korean word "사과" meaning fruit (apple), company (Apple Inc.), or the act of apology
   - Without context, machines cannot disambiguate
   - This is not just a Korean problem -- English "bank" (river bank vs. financial bank), "crane" (bird vs. machine)
   - How ontology provides the formal context to resolve ambiguity

4. **Interoperability concept introduction:**
   - Define 상호운용성(Interoperability) clearly
   - Explain why it is the central problem ontology addresses
   - Three levels: syntactic (format), semantic (meaning), pragmatic (intent)

5. **Mermaid diagram:**
   - `sequenceDiagram` showing System A and System B exchanging "Patient" data
   - System A sends patient data, System B misinterprets it
   - Annotation showing the semantic gap

### R-011: Session 03-gruber-definition.mdx Content [UBIQUITOUS]

The Gruber definition session shall decompose "An ontology is an explicit specification of a conceptualization" (Gruber, 1993):

**Required content blocks:**

1. **Original quote presentation:**
   - English original: "An ontology is an explicit specification of a conceptualization."
   - Extended version with "shared": "An explicit specification of a shared conceptualization"
   - Attribution to Thomas R. Gruber, 1993

2. **Component 1 -- 명시적(Explicit):**
   - Definition: Eliminating implicit assumptions and documenting them
   - Concrete example: A company's "good customer" -- without explicit definition, each department has different criteria (sales: high purchase, support: few complaints, marketing: social media active)
   - When explicit: All departments agree "good customer = purchased 3+ times in last 12 months AND account active"
   - Analogy: Like a legal contract vs. a verbal agreement

3. **Component 2 -- 명세(Specification):**
   - Definition: Written in formal language that machines can read
   - Concrete example: The difference between a Korean natural language description of a hospital's patient classification vs. the same classification written in OWL
   - Why formality matters: ambiguity elimination, machine processability
   - Analogy: Like a building blueprint vs. a verbal description of a house

4. **Component 3 -- 개념화(Conceptualization):**
   - Definition: An abstract model of some aspect of the world
   - Concrete example: A map is a conceptualization of geography -- it does not include every blade of grass, only relevant features
   - A subway map vs. a road map vs. a satellite photo -- all are conceptualizations of the same city at different abstraction levels
   - Key insight: Every conceptualization involves choices about what to include and exclude

5. **Component 4 -- 공유된(Shared):**
   - Definition: Agreed upon by a community, not by an individual
   - Concrete example: A hospital's internal patient classification vs. HL7 FHIR (community standard)
   - What happens without "shared": each developer creates their own classification, interoperability becomes impossible
   - The insight: "Without 'shared,' it is just personal notes. Without 'explicit,' it is just a natural language document."

6. **Synthesis section:**
   - How all 4 components work together
   - A table comparing: with/without each component, what you get (personal notes, natural language doc, informal standard, formal ontology)

7. **Mermaid diagram:**
   - `graph TD` showing 4 components connecting to "Ontology" center
   - Each component with a brief Korean label explaining its role

### R-012: Session 04-benefits.mdx Content [UBIQUITOUS]

The benefits session shall cover prior approaches to knowledge organization and their limitations:

**Required content blocks:**

1. **Approach 1 -- Database Schema Unification:**
   - What it is: Agree on a single database schema for all systems
   - When it works: Within a single organization, for well-defined domains
   - Limitation: When the domain changes, the schema must be redesigned from scratch
   - Limitation: Cannot express rich relationships between concepts (only foreign keys)
   - Limitation: Schema changes require migration of all existing data
   - Manufacturing example: A factory changes production lines, requiring complete database restructuring

2. **Approach 2 -- Natural Language Documents:**
   - What it is: Write standards and definitions in Korean/English documents
   - When it works: For human communication and reference
   - Limitation: Machines cannot process natural language reliably
   - Limitation: Ambiguity in natural language leads to different interpretations
   - Example: ISO standard document says "equipment should be maintained regularly" -- what does "regularly" mean? Monthly? Weekly?

3. **Approach 3 -- Taxonomy (Classification Systems):**
   - What it is: Hierarchical categorization (like a library classification system)
   - When it works: When you only need parent-child relationships
   - Limitation: Can only express "is-a" relationships (hierarchy)
   - Limitation: Cannot express "has-a", "part-of", "causes", or other rich relationships
   - Example: Dewey Decimal System classifies books but cannot express "this book was written by the same author as that book"

4. **What ontology adds beyond each approach:**
   - Beyond DB schemas: Domain-independent, flexible, extensible
   - Beyond natural language: Machine-processable, unambiguous
   - Beyond taxonomy: Rich relationships, axioms, reasoning capability
   - The key differentiator: REASONING -- the ability to derive new facts from existing knowledge

5. **Comparison table:**
   - Rows: DB Schema, Natural Language, Taxonomy, Ontology
   - Columns: Machine-readable, Expressive relationships, Reasoning capability, Flexibility, Community standard

6. **Mermaid diagram:**
   - `graph LR` showing three approaches each hitting a "limitation wall" and ontology bridging all three

### R-013: Session 05-exercises.mdx Content [UBIQUITOUS]

The exercises session shall include both practice exercises and Phase 1 competency questions:

**Required content blocks:**

1. **Phase 1 recap section:**
   - Brief summary of what was covered in sessions 01-04
   - Visual concept map (Mermaid diagram) connecting all Phase 1 concepts

2. **Basic exercises (기본 실습):**

   Exercise 1: Domain Term Ambiguity Discovery
   - Task: Find 3 examples from your own domain where the same word is used with different meanings
   - Guidance: Think about terms you use daily -- do they mean the same thing to everyone?
   - Example answer format provided
   - Hint: Consider words like "process," "model," "resource," "service"

   Exercise 2: Data-Information-Knowledge Classification
   - Task: Given a list of 10 items, classify each as data, information, or knowledge
   - Provided items covering manufacturing, healthcare, and e-commerce domains
   - Answer key with explanations

   Exercise 3: Interoperability Problem Identification
   - Task: Describe a real situation where two systems or teams used the same term differently
   - Guidance questions to help learners identify the problem
   - Template for structuring the answer

3. **Challenge exercises (도전 실습):**

   Exercise 4: Context Addition for Machine Understanding
   - Task: For each of the 3 ambiguous terms found in Exercise 1, describe in natural language what additional information would help a machine distinguish between the meanings
   - This is the seed exercise for ontology thinking -- learners practice formalizing implicit knowledge

   Exercise 5: Gruber Definition Application
   - Task: Take a concept from your work domain and evaluate it against Gruber's 4 components
   - Is it explicit? Is it specified formally? Is it a conceptualization? Is it shared?
   - Identify which components are missing and what would change if they were added

4. **Competency questions (핵심 질문) -- Phase 1 pass criteria:**

   Question 1: "데이터베이스가 이미 있는데 온톨로지가 왜 추가로 필요한가?"
   - Guidance: Think about what databases cannot do (reasoning, flexibility, rich relationships)
   - Reference: Session 04 comparison table

   Question 2: "'공유된 개념화의 명시적 명세'에서 '공유'가 빠지면 어떤 문제가 생기는가?"
   - Guidance: Think about interoperability -- what happens when each person defines concepts independently?
   - Reference: Session 03 "shared" component analysis

   Question 3: "상호운용성 문제를 온톨로지 없이 해결하려면 어떤 비용이 드는가?"
   - Guidance: Think about the approaches in Session 04 and their limitations
   - Reference: Session 02 failure cases, Session 04 limitation analysis

5. **Self-assessment checklist:**
   - "I can explain the difference between data, information, and knowledge with examples"
   - "I can describe at least 2 real-world interoperability failure scenarios"
   - "I can decompose Gruber's definition into 4 components and explain each"
   - "I can explain why databases, natural language documents, and taxonomies are insufficient"

---

## Specifications

### S-001: MDX Frontmatter Structure

Each MDX file shall have YAML frontmatter:

```yaml
---
title: "[Korean session title]"
description: "[Korean description for search indexing, 50-100 chars]"
difficulty: "beginner"
---
```

### S-002: Session Content Structure Template

Each content session (01-04) follows this structure:

```markdown
---
title: "[Title]"
description: "[Description]"
difficulty: "beginner"
---

# [Session Number]회차: [Korean Title]

## 학습 목표

(3 bullet points describing what the learner will achieve)

> **왜 필요한가?** [Opening motivation before first concept]

## 이번 세션 전체 그림

(Mermaid diagram code block)

## [First Major Concept Heading]

> **왜 필요한가?** [Motivation for this specific concept]

(300-500 word explanation with analogies and examples)

> **연결 포인트 -> Phase [N]**: [Forward reference]

## [Second Major Concept Heading]

> **왜 필요한가?** [Motivation for this specific concept]

(300-500 word explanation with analogies and examples)

## [Additional Concept Headings as needed]

> **연결 포인트 -> Phase [N]**: [Forward reference]

## 흔한 오해

> **흔한 오해**: "[Misconception]"
> **실제로는**: [Correct explanation]

(Additional misconceptions if relevant)

## 요약

(Concise summary of key takeaways, 3-5 bullet points)

## 다음 세션 예고

(Brief preview of what comes next and why it matters)
```

### S-003: Introduction Session Structure (00-introduction.mdx)

```markdown
---
title: "Phase 1 소개: 온톨로지의 세계로"
description: "온톨로지가 왜 필요한지 이해하기 위한 Phase 1 학습 안내"
difficulty: "beginner"
---

# Phase 1: 왜 온톨로지가 필요한가?

## 이 Phase에서 배우는 것

(Phase 1 learning objective and overview)

> **왜 필요한가?** [Why starting with motivation matters]

## 이번 세션 전체 그림

(Phase 1 roadmap Mermaid diagram)

## 세션 구성

(Overview of 5 content sessions with brief descriptions)

## 이번 Phase를 마치면 답할 수 있는 질문

(3 competency questions listed)

## 흔한 오해

> **흔한 오해**: "[Misconception about ontology learning]"
> **실제로는**: [Correction]

> **연결 포인트 -> Phase 2**: [Preview of Phase 2]
> **연결 포인트 -> Phase 7**: [Preview of applications]
```

### S-004: Exercise Session Structure (05-exercises.mdx)

```markdown
---
title: "Phase 1 종합 실습"
description: "Phase 1 핵심 개념을 직접 실습하고 역량을 확인하는 종합 실습"
difficulty: "beginner"
---

# Phase 1 종합 실습

## 이번 세션 전체 그림

(Phase 1 concept map Mermaid diagram)

## Phase 1 핵심 요약

(Brief recap of all Phase 1 sessions)

## 기본 실습

### 실습 1: [Title]
### 실습 2: [Title]
### 실습 3: [Title]

## 도전 실습

### 실습 4: [Title]
### 실습 5: [Title]

## 핵심 질문 (Phase 1 통과 기준)

### 질문 1: [Question]
### 질문 2: [Question]
### 질문 3: [Question]

## 자가 점검 체크리스트

(Self-assessment checklist)

## 다음 Phase 예고

> **연결 포인트 -> Phase 2**: [What comes next]
```

### S-005: Mermaid Syntax Constraints

All Mermaid diagrams must follow these rules:
- No apostrophes (`'`) anywhere in diagram code
- No `+` operator in `stateDiagram-v2`
- Use `["double quoted labels"]` for labels with Korean characters or special characters
- Test every diagram mentally for syntax validity before writing
- Wrap in standard markdown code fences with `mermaid` language identifier

**Example safe pattern:**
```mermaid
graph LR
    A["데이터"] -->|"맥락 추가"| B["정보"]
    B -->|"판단 규칙 추가"| C["지식"]
```

### S-006: Content Depth Requirements

Each major concept explanation (not including callouts, exercises, or summaries) shall be 300-500 words and include:
- At least 1 real-world analogy relevant to Korean industries (manufacturing, healthcare, e-commerce)
- The "problem first, solution second" narrative arc
- Concrete examples, not abstract definitions
- Connection to why this matters for the learner's practical work

### S-007: Technical Term Introduction Pattern

On first use of any English technical term:
```
한국어_용어(English_Term) -- 한국어로 된 간결한 정의
```

After first introduction, either the Korean term or English term may be used freely.

**Phase 1 key terms to introduce:**
- 온톨로지(Ontology)
- 상호운용성(Interoperability)
- 명세(Specification)
- 개념화(Conceptualization)
- 공리(Axiom) -- brief mention only, detailed in Phase 2
- 추론(Reasoning) -- brief mention only, detailed in Phase 3
- 택소노미(Taxonomy)
- 트리플(Triple) -- brief mention only, detailed in Phase 4

---

## Constraints

### C-001: No Implementation Code

This SPEC produces MDX content files only. No TypeScript, JavaScript, CSS, or configuration file changes.

### C-002: Skeleton Replacement

Generated content replaces skeleton files from SPEC-INFRA-001. The file paths must match exactly:
- `content/phase-1/00-introduction.mdx`
- `content/phase-1/01-motivation.mdx`
- `content/phase-1/02-interoperability.mdx`
- `content/phase-1/03-gruber-definition.mdx`
- `content/phase-1/04-benefits.mdx`
- `content/phase-1/05-exercises.mdx`

### C-003: Mermaid Safe Syntax (inherited from SPEC-INFRA-001)

- FORBIDDEN: Apostrophes in Mermaid node labels
- FORBIDDEN: `+` in stateDiagram-v2
- Use `["double quoted labels"]` for labels with special characters
- Safe types: `graph TD`, `graph LR`, `sequenceDiagram`, `stateDiagram-v2`, `erDiagram`

### C-004: No JSX Imports (inherited from SPEC-INFRA-001)

MDX files must not contain `import` statements. All components available via `mdx-components.tsx`.

### C-005: Word Count Target

Total Phase 1 content (all 6 files combined): approximately 8,000-12,000 Korean words. Individual session targets:
- 00-introduction: 800-1,200 words
- 01-motivation: 1,500-2,500 words
- 02-interoperability: 1,500-2,500 words
- 03-gruber-definition: 1,500-2,500 words
- 04-benefits: 1,500-2,500 words
- 05-exercises: 1,500-2,000 words

### C-006: Academic Accuracy

- Gruber's definition must be attributed correctly (Thomas R. Gruber, 1993)
- The extended "shared" component must be attributed to Borst (1997) or Studer et al. (1998)
- No fabricated examples or statistics -- all examples should be plausible and logically correct
- Interoperability examples should reflect real-world patterns even if simplified

### C-007: Consistent Cross-References

- Forward references must only point to phases that exist in the curriculum (Phase 2-8)
- Session-to-session references within Phase 1 must use relative links
- Competency questions in exercises must match the questions listed in the curriculum document

---

## Traceability

| Requirement | Plan Reference | Acceptance Reference |
|-------------|---------------|---------------------|
| R-001 | Plan: Session Overview | AC-001 |
| R-002 | Plan: All Sessions | AC-002 |
| R-003 | Plan: All Sessions | AC-003 |
| R-004 | Plan: Diagram Specs | AC-004 |
| R-005 | Plan: All Sessions | AC-005 |
| R-006 | Plan: All Sessions | AC-006 |
| R-007 | Plan: All Sessions | AC-007 |
| R-008 | Plan: Session 00 | AC-008 |
| R-009 | Plan: Session 01 | AC-009 |
| R-010 | Plan: Session 02 | AC-010 |
| R-011 | Plan: Session 03 | AC-011 |
| R-012 | Plan: Session 04 | AC-012 |
| R-013 | Plan: Session 05 | AC-013 |

---

## Expert Consultation Recommendations

### Frontend Expert (expert-frontend)

This SPEC involves MDX content authoring within a Nextra 4.x site. Consulting expert-frontend is recommended for:
- Verifying Mermaid diagram rendering behavior within Nextra
- Ensuring blockquote callout formatting renders correctly with Nextra theme
- Validating MDX syntax compatibility with Nextra 4.x parser

### Content/Education Domain Expert

If available, consulting a subject matter expert in ontology education would be valuable for:
- Verifying Gruber definition accuracy and attribution
- Reviewing real-world examples for factual correctness
- Ensuring progressive difficulty alignment with the 8-phase curriculum
