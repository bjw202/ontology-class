---
id: SPEC-CONTENT-P9-001
type: plan
version: "1.0.0"
created: "2026-03-10"
updated: "2026-03-10"
---

# Implementation Plan: SPEC-CONTENT-P9-001

## Technical Approach

### Content Generation Strategy

The implementation follows the established edu-content pattern used across Phases 1-8. Each MDX session file is authored by reading the corresponding source sections from `my-docs/palantir-content.md`, restructuring the material into the pedagogical template (학습 목표, Mermaid overview, concept sections with 왜 필요한가, 연결 포인트, 흔한 오해, 요약), and ensuring Mermaid safe syntax compliance.

### Architecture Design Direction

No architectural changes are required. This SPEC is purely additive content:
- New directory: `content/phase-9/`
- Modified file: `content/_meta.js` (one line addition)
- New files: 10 MDX files + 1 `_meta.js`

The implementation reuses all existing infrastructure: Nextra 4.x routing, MermaidDiagram component, CompetencyQuestion, Exercise, and ConceptCard components.

---

## Milestones

### Primary Goal: BATCH 1 (Pilot -- Foundation Content)

**Files:**
- `content/phase-9/00-introduction.mdx` -- Source: Sec 1 (탄생 배경, 핵심 철학)
- `content/phase-9/01-digital-twin.mdx` -- Source: Sec 2-3 (디지털 트윈, 6단계 운영 루프)
- `content/phase-9/02-core-components.mdx` -- Source: Sec 4 (Object/Link/Action/Function/Interface)

**Tasks:**
1. Read source Sec 1-4 from `my-docs/palantir-content.md`
2. Author `00-introduction.mdx` following S-006 template
   - Cover: 데이터 사일로 문제, Palantir 철학, Decision Data 개념
   - Include 3+ 왜 필요한가, 2+ 연결 포인트 (Phase 2 RDF/OWL, Phase 6 표준 온톨로지), 1 흔한 오해
3. Author `01-digital-twin.mdx`
   - Cover: 디지털 트윈 정의, 6단계 운영 루프, 닫힌 루프 개념
   - Include Mermaid diagram of 6-step operational loop
   - 연결 포인트: Phase 5 (설계 방법론), Phase 7 (실전 적용)
4. Author `02-core-components.mdx`
   - Cover: Object Type, Link Type, Action Type, Function, Interface
   - Include Mermaid diagram showing component relationships
   - 연결 포인트: Phase 2 (RDF triple -> Object/Link), Phase 3 (논리적 기초)
5. Validate all 3 files render without errors in `npm run dev`
6. Verify Mermaid diagrams render correctly
7. Verify edu-content quality checklist (blockquotes, callouts, sections)

**Validation:**
- Each file renders in Next.js dev server
- Mermaid diagrams display without parse errors
- Quality checklist passes for each file

### Secondary Goal: BATCH 2 (Comparative and Architectural Content)

**Files:**
- `content/phase-9/03-owl-comparison.mdx` -- Source: Sec 5
- `content/phase-9/04-architecture.mdx` -- Source: Sec 6-7
- `content/phase-9/05-aip-llm.mdx` -- Source: Sec 9-11

**Tasks:**
1. Read source Sec 5-7, 9-11 from `my-docs/palantir-content.md`
2. Author `03-owl-comparison.mdx`
   - Cover: OWA vs governance model, expressivity vs practicality trade-off
   - Include comparison table (OWL concept -> Palantir equivalent)
   - 연결 포인트: Phase 3 (논리적 기초 -- OWA), Phase 4 (표준과 언어 -- OWL)
3. Author `04-architecture.mdx`
   - Cover: 3-layer architecture, read/write paths, granular security policies
   - Include Mermaid diagram of Foundry+AIP architecture
   - 연결 포인트: Phase 8 (한계와 대안 -- 확장성 문제)
4. Author `05-aip-llm.mdx`
   - Cover: AIP Logic, Agent Studio, tool 3 categories, Graph RAG comparison
   - Include Mermaid diagram of AIP workflow
   - 연결 포인트: Phase 7 (실전 적용 -- LLM+Graph RAG)
5. Validate all 3 files

**Validation:**
- Same criteria as BATCH 1
- OWL comparison accurately maps academic to enterprise concepts
- Cross-references to Phase 7 Graph RAG are valid links

### Final Goal: BATCH 3 (Applied Content, Exercises, Navigation)

**Files:**
- `content/phase-9/06-industry-patterns.mdx` -- Source: Sec 8, 10, 12-13
- `content/phase-9/07-exercises.mdx` -- Source: Sec 14
- `content/phase-9/index.mdx` -- Phase overview
- `content/phase-9/_meta.js` -- Phase navigation
- `content/_meta.js` -- Site-level navigation update

**Tasks:**
1. Read source Sec 8, 10, 12-14 from `my-docs/palantir-content.md`
2. Author `06-industry-patterns.mdx`
   - Cover: 제조/의료/군사 사례, 5가지 설계 원칙, Action Pattern
   - Include Mermaid diagram of design principle hierarchy
   - 연결 포인트: Phase 6 (주요 표준 온톨로지 -- 도메인별 적용)
3. Author `07-exercises.mdx`
   - Include CompetencyQuestion components from source Sec 14 questions
   - Include 3 Exercise components with project-level tasks
   - Follow S-007 structure
4. Author `index.mdx`
   - Phase overview with MermaidDiagram showing session roadmap
   - 학습 목표 for the entire phase
   - Session table with titles and key concepts
   - Follow pattern from `content/phase-8/index.mdx`
5. Create `content/phase-9/_meta.js` per S-004
6. Update `content/_meta.js` -- insert phase-9 entry between phase-8 and reference
7. Full integration validation:
   - Navigate to phase-9 in sidebar
   - Verify ordering (phase-8 -> phase-9 -> reference)
   - Click through all 9 session files
   - Verify all cross-phase links resolve

**Validation:**
- Navigation shows phase-9 in correct position
- All 9 session files + index render without errors
- All Mermaid diagrams display correctly
- Exercise components function properly
- Cross-references to Phase 7 and Phase 8 are clickable valid links

---

## Risks and Mitigation

### Risk 1: Mermaid Diagram Parsing Failures

**Likelihood:** Medium
**Impact:** Content renders but diagram shows error
**Mitigation:** Follow established safe syntax rules. Test each diagram individually in dev server before finalizing session file. Avoid apostrophes, special characters, and `+` in stateDiagram-v2.

### Risk 2: Source Material Gaps

**Likelihood:** Low
**Impact:** Missing concepts in session content
**Mitigation:** Source material is comprehensive (1,120 lines, 14 sections). Map all source sections to session files before authoring. Flag any gaps during BATCH 1 pilot.

### Risk 3: Cross-Phase Link Breakage

**Likelihood:** Low
**Impact:** Broken navigation from phase-9 content to other phases
**Mitigation:** Use relative paths consistent with existing cross-phase references. Verify links in dev server after each batch.

### Risk 4: Content Length Inconsistency

**Likelihood:** Medium
**Impact:** Some sessions significantly longer or shorter than others
**Mitigation:** Target 200-600 lines per session. Source sections with heavy content (Sec 6-7 combined, Sec 9-11 combined) are distributed across fewer session files to balance length.

---

## Expert Consultation Recommendations

This SPEC is primarily a content authoring task and does not require backend, frontend infrastructure, or DevOps changes. However, the following consultations may add value:

- **expert-frontend:** If any Mermaid diagrams require advanced layout or if ConceptCard/CompetencyQuestion components need enhancement for the Palantir-specific content patterns.
- **design-uiux:** If the phase-9 content introduces visual patterns (e.g., architecture diagrams, comparison tables) that benefit from design review.

These are optional and can be deferred unless issues arise during implementation.
