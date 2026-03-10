---
id: SPEC-CONTENT-P9-001
version: "1.0.0"
status: draft
created: "2026-03-10"
updated: "2026-03-10"
author: jw
priority: P2
lifecycle: spec-first
---

# SPEC-CONTENT-P9-001: Phase 9 MDX Content Generation -- "Enterprise Ontology: Palantir Case Study"

## Overview

This SPEC defines the complete MDX content generation for Phase 9 of the Ontology Fundamentals Learning Platform. Phase 9 extends the curriculum beyond theoretical ontology into enterprise-scale applied ontology, using Palantir Foundry's Ontology as the primary case study. The content bridges academic ontology concepts (Phases 1-8) with industrial practice, showing how ontology principles are adapted for real-world decision support at scale.

This SPEC produces 9 MDX files plus 2 infrastructure files (`_meta.js` files). Each content file is a fully written educational session with Korean explanations, English technical terms, Mermaid diagrams, callouts, and exercises.

**Learning objective:** Understand how enterprise platforms adapt ontology theory into practical, scalable decision systems -- and critically evaluate the trade-offs involved.

**Connection from Phase 8:** After learning ontology's limits and alternatives, learners now see how one enterprise platform addresses those very limitations through engineering trade-offs, closing the loop between theory and practice.

**Connection to Phase 7:** Phase 7 covered LLM+Graph RAG applications; Phase 9 shows how Palantir's AIP layer builds on similar patterns with ontology-grounded AI agents.

**Source material:** `my-docs/palantir-content.md` (1,120 lines, 14 sections) -- comprehensive Korean-language analysis of Palantir's ontology system.

**Scope boundary:** This SPEC covers content authoring and navigation integration only. Infrastructure, components, styling, and build configuration are handled by SPEC-INFRA-001.

---

## Environment

### Content Platform

- **Framework:** Nextra 4.x with Next.js 15 App Router (established by SPEC-INFRA-001)
- **Content Format:** MDX files in `content/phase-9/` directory
- **Content Language:** Korean (all explanations), English (technical terms with Korean definition on first use)
- **Diagram Engine:** Mermaid 11.12.2 (client-side rendering via MermaidDiagram component)
- **Target Audience:** Korean-speaking professionals (manufacturing, AI, knowledge management) who have completed or are familiar with Phases 1-8
- **Custom Components:** MermaidDiagram, CompetencyQuestion, Exercise, ConceptCard

### Content Quality Standards (per session)

| Element | Minimum Count | Format |
|---------|---------------|--------|
| "왜 필요한가?" blockquotes | 3 per session | `> **왜 필요한가?** [explanation]` |
| "연결 포인트" callouts | 2 per session | `> **연결 포인트 -> Phase [N]**: [connection]` |
| "흔한 오해" section | 1 per session | `> **흔한 오해**: "[misconception]"` / `> **실제로는**: [correction]` |
| Mermaid diagram | 1 per session | labeled "이번 세션 전체 그림" |
| Concept explanation depth | 300-500 words each | Principle-oriented, with analogies |

### Mermaid Safe Syntax Rules

- No apostrophes in node labels (use backtick or rephrase)
- No `+` operator in `stateDiagram-v2` (use `note` or `-->` instead)
- No special characters that break Mermaid parser
- All diagrams wrapped in `<MermaidDiagram chart={...} caption="..." />`

### Narrative Arc (mandatory per concept)

Every major concept follows this structure:
1. **Problem first**: Describe the real-world challenge the concept addresses
2. **Palantir approach**: How Palantir's ontology solves it
3. **Ontology theory connection**: Map back to academic concepts from earlier phases
4. **Critical evaluation**: Honest assessment of trade-offs and limitations

---

## Assumptions

### A-001: Infrastructure Ready

The Nextra 4.x platform is operational with all custom components (MermaidDiagram, CompetencyQuestion, Exercise, ConceptCard) available and functional, as established by SPEC-INFRA-001.

### A-002: Source Material Complete

The file `my-docs/palantir-content.md` contains all 14 sections of source material required to produce the 9 content sessions. No additional external research is needed.

### A-003: Phase 1-8 Content Stable

Phases 1-8 are published and stable. Cross-references to these phases (especially Phase 7 for Graph RAG and Phase 8 for alternatives) use existing paths that will not change.

### A-004: Target Audience Background

Learners have professional backgrounds (manufacturing, AI, knowledge management) and may not have completed all 8 phases sequentially. Content should be accessible to someone who has completed at least Phases 1-3 and has general familiarity with ontology concepts.

---

## Requirements

### R-001: Navigation Integration (UBIQUITOUS)

The phase-9 navigation entry SHALL appear in the site sidebar between phase-8 and reference sections at all times.

**Implementation:**
- Update `content/_meta.js` to add `'phase-9': '9단계: 엔터프라이즈 온톨로지 -- Palantir'` between the phase-8 and reference entries.
- Create `content/phase-9/_meta.js` with navigation entries for all 9 session files.

### R-002: Korean Content with English Terms (UBIQUITOUS)

The phase-9 content SHALL be written entirely in Korean with English technical terms. Each English technical term SHALL include a Korean definition on its first use in each session.

**Examples:**
- "디지털 트윈(Digital Twin)은 물리적 세계의 디지털 복제본이다"
- "Object Type은 온톨로지의 핵심 구성 요소로서..."

### R-003: Edu-Content Quality Standards (UBIQUITOUS)

Each session file SHALL include at minimum:
- 3 "왜 필요한가?" blockquotes
- 2 "연결 포인트" callouts linking to other phases
- 1 "흔한 오해" section with misconception and correction
- 1 "이번 세션 전체 그림" Mermaid diagram

### R-004: Mermaid Safe Syntax (UBIQUITOUS)

All Mermaid diagrams SHALL follow safe syntax rules: no apostrophes in labels, no `+` in stateDiagram-v2, and no characters that break the Mermaid parser.

### R-005: Sidebar Navigation Display (EVENT-DRIVEN)

**When** a user navigates to phase-9, the system **shall** display the Palantir ontology content with proper Nextra sidebar navigation showing all 9 session entries.

### R-006: Phase-9 Sidebar Position (STATE-DRIVEN)

**While** the site is running, the phase-9 navigation **shall** appear between phase-8 and reference in the sidebar, maintaining correct ordering.

### R-007: Mermaid Error Prevention (UNWANTED)

**If** a Mermaid diagram contains forbidden characters (apostrophes, special operators), **then** the system **shall** prevent rendering errors by using safe alternative syntax.

### R-008: Phase-7 Concept Building (OPTIONAL)

**Where** the user has completed phase-7 (LLM+Graph RAG), the content **should** reference and build upon those concepts, particularly in the AIP and Graph RAG comparison sessions.

### R-009: Source Material Fidelity (UBIQUITOUS)

The content SHALL accurately represent the source material from `my-docs/palantir-content.md`. Technical claims, architectural descriptions, and comparative analyses SHALL be faithful to the source without distortion.

### R-010: Cross-Phase Link Validity (UBIQUITOUS)

All cross-references to other phases SHALL use valid relative links that resolve correctly within the Nextra routing structure.

---

## Specifications

### S-001: Directory and File Structure

```
content/phase-9/
  _meta.js
  index.mdx
  00-introduction.mdx
  01-digital-twin.mdx
  02-core-components.mdx
  03-owl-comparison.mdx
  04-architecture.mdx
  05-aip-llm.mdx
  06-industry-patterns.mdx
  07-exercises.mdx
```

### S-002: Content Mapping (Source to Session)

| File | Title | Source Sections | Key Concepts |
|------|-------|----------------|--------------|
| `index.mdx` | 개요 | -- | Phase overview, session list, learning roadmap |
| `00-introduction.mdx` | 소개 -- 왜 팔란티어 온톨로지인가? | Sec 1 (탄생 배경, 핵심 철학) | 데이터 사일로, 결정 중심 철학, Decision Data |
| `01-digital-twin.mdx` | 디지털 트윈과 운영 루프 | Sec 2-3 (정의, 6단계 메커니즘) | 디지털 트윈, 6단계 운영 루프, 닫힌 루프 |
| `02-core-components.mdx` | 핵심 구성 요소 | Sec 4 (Object/Link/Action/Function/Interface) | Object Type, Action Type, Function, Interface |
| `03-owl-comparison.mdx` | OWL vs Palantir 비교 | Sec 5 (개념 재매핑) | OWA vs 거버넌스, 표현력 vs 실용성 트레이드오프 |
| `04-architecture.mdx` | 아키텍처와 보안 | Sec 6-7 (Foundry+AIP, 보안 모델) | 3층 구조, 읽기/쓰기 경로, Granular Policy |
| `05-aip-llm.mdx` | AIP -- 온톨로지 위의 AI | Sec 9-11 (AIP, Graph RAG 비교) | AIP Logic, Agent Studio, tool 3범주 |
| `06-industry-patterns.mdx` | 산업별 사례와 설계 원칙 | Sec 8,10,12-13 (제조/의료/군사, 설계 원칙) | 5가지 설계 원칙, Action Pattern |
| `07-exercises.mdx` | 실습 | Sec 14 (질문+과제) | 이해도 확인, 심화 과제 3개 |

### S-003: Navigation Entry (`content/_meta.js`)

Add between phase-8 and reference:
```javascript
'phase-9': '9단계: 엔터프라이즈 온톨로지 -- Palantir'
```

### S-004: Phase Navigation (`content/phase-9/_meta.js`)

```javascript
export default {
  index: '개요',
  '00-introduction': '소개',
  '01-digital-twin': '디지털 트윈과 운영 루프',
  '02-core-components': '핵심 구성 요소',
  '03-owl-comparison': 'OWL vs Palantir 비교',
  '04-architecture': '아키텍처와 보안',
  '05-aip-llm': 'AIP -- 온톨로지 위의 AI',
  '06-industry-patterns': '산업별 사례와 설계 원칙',
  '07-exercises': '실습'
}
```

### S-005: MDX Frontmatter Template

Each session file SHALL use this frontmatter pattern:
```yaml
---
title: [Korean title]
description: [Korean description, 1-2 sentences]
difficulty: advanced
---
```

### S-006: Session Content Structure Template

Each session (except index.mdx and 07-exercises.mdx) SHALL follow this structure:

1. **H1 title** with session number and Korean title
2. **Opening quote** -- relevant to session topic
3. **Introductory paragraph** -- context and purpose
4. **학습 목표** section -- numbered list of learning objectives
5. **이번 세션 전체 그림** -- MermaidDiagram overview
6. **Main content sections** -- each concept following the narrative arc:
   - 왜 필요한가? blockquotes (min 3 per session)
   - Concept explanation (300-500 words each)
   - 연결 포인트 callouts (min 2 per session)
7. **흔한 오해** section -- at least 1 misconception/correction pair
8. **요약** section -- bullet-point summary of key takeaways

### S-007: Exercise Session Structure (`07-exercises.mdx`)

The exercise session SHALL include:
1. **이해도 확인 문제** -- CompetencyQuestion components with multiple-choice questions from source Sec 14
2. **심화 과제** -- 3 Exercise components with project-level tasks:
   - Task 1: 온톨로지 설계 (Object/Link/Action 모델링)
   - Task 2: OWL-to-Palantir 매핑 비교
   - Task 3: AIP 워크플로우 설계
3. **다음 단계** -- guidance for continued learning

### S-008: Batch Implementation Strategy

| Batch | Files | Rationale |
|-------|-------|-----------|
| BATCH 1 (pilot) | `00-introduction.mdx`, `01-digital-twin.mdx`, `02-core-components.mdx` | Foundation concepts, validate template and quality patterns |
| BATCH 2 | `03-owl-comparison.mdx`, `04-architecture.mdx`, `05-aip-llm.mdx` | Comparative and architectural content, builds on BATCH 1 |
| BATCH 3 | `06-industry-patterns.mdx`, `07-exercises.mdx`, `index.mdx`, `_meta.js` files | Applied content, exercises, navigation integration |

---

## Constraints

### C-001: No Infrastructure Changes

This SPEC covers content authoring and navigation `_meta.js` updates only. No changes to components, styling, build configuration, or platform infrastructure.

### C-002: Mermaid Compatibility

All Mermaid diagrams must render without errors in the existing MermaidDiagram component (Mermaid 11.12.2, client-side rendering).

### C-003: Content Length Per Session

Each session file should be between 200-600 lines of MDX to maintain consistent reading experience across phases.

### C-004: Source Attribution

Content is derived from `my-docs/palantir-content.md`. The educational adaptation should maintain factual accuracy while restructuring for pedagogical flow.

---

## Dependencies

### D-001: SPEC-INFRA-001

Platform infrastructure, custom components (MermaidDiagram, CompetencyQuestion, Exercise, ConceptCard), and base styling.

### D-002: Phase 7 Content (SPEC-CONTENT-P7)

Cross-references to Graph RAG concepts, LLM integration patterns.

### D-003: Phase 8 Content (SPEC-CONTENT-P8)

Cross-references to ontology limitations, alternative technologies, decision criteria.

### D-004: Source Material

`my-docs/palantir-content.md` -- 1,120 lines, 14 sections covering Palantir ontology system.

---

## Traceability

| Requirement | Acceptance Criteria | Plan Milestone |
|------------|-------------------|----------------|
| R-001 | AC-002 | BATCH 3 |
| R-002 | AC-003 | All Batches |
| R-003 | AC-003 | All Batches |
| R-004 | AC-004 | All Batches |
| R-005 | AC-002 | BATCH 3 |
| R-006 | AC-002 | BATCH 3 |
| R-007 | AC-004 | All Batches |
| R-008 | AC-006 | BATCH 2 |
| R-009 | AC-005 | All Batches |
| R-010 | AC-006 | All Batches |
