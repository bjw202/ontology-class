---
id: SPEC-CONTENT-P9-001
type: acceptance
version: "1.0.0"
created: "2026-03-10"
updated: "2026-03-10"
---

# Acceptance Criteria: SPEC-CONTENT-P9-001

## AC-001: All MDX Files Render Without Errors

**Given** the Next.js dev server is running (`npm run dev`)
**When** each of the 9 MDX files in `content/phase-9/` is loaded in the browser
**Then** all files render without build errors, hydration errors, or MDX parsing failures

### Verification Steps:
1. Run `npm run dev`
2. Navigate to each phase-9 URL:
   - `/phase-9` (index)
   - `/phase-9/00-introduction`
   - `/phase-9/01-digital-twin`
   - `/phase-9/02-core-components`
   - `/phase-9/03-owl-comparison`
   - `/phase-9/04-architecture`
   - `/phase-9/05-aip-llm`
   - `/phase-9/06-industry-patterns`
   - `/phase-9/07-exercises`
3. Check browser console for errors
4. Verify no 404 or 500 responses

---

## AC-002: Navigation Shows Phase-9 Between Phase-8 and Reference

**Given** the site is running and a user views any page
**When** the user looks at the sidebar navigation
**Then** "9단계: 엔터프라이즈 온톨로지 -- Palantir" appears between "8단계: 한계와 대안" and "참고자료"

### Verification Steps:
1. Open the site in a browser
2. Verify sidebar ordering:
   - ...
   - 8단계: 한계와 대안
   - 9단계: 엔터프라이즈 온톨로지 -- Palantir
   - 참고자료
   - 소개
3. Click "9단계" in sidebar -- verify it navigates to phase-9 index
4. Verify phase-9 sub-navigation shows all 9 session entries

---

## AC-003: Each Content Session Passes Edu-Content Quality Checklist

**Given** a completed session MDX file (excluding index.mdx and 07-exercises.mdx)
**When** the file is reviewed against edu-content quality standards
**Then** the file contains all required elements

### Quality Checklist Per Session:

| Element | Requirement | Verification |
|---------|-------------|-------------|
| Korean content | All explanations in Korean | Manual review |
| English technical terms | English terms with Korean definition on first use | Manual review |
| 왜 필요한가? blockquotes | >= 3 per session | Count `> **왜 필요한가?**` occurrences |
| 연결 포인트 callouts | >= 2 per session | Count `> **연결 포인트` occurrences |
| 흔한 오해 section | >= 1 per session | Check for "흔한 오해" heading or blockquote |
| 이번 세션 전체 그림 | 1 MermaidDiagram per session | Check for `<MermaidDiagram` component |
| 학습 목표 section | Present in each session | Check for "학습 목표" heading |
| 요약 section | Present in each session | Check for "요약" heading |
| Frontmatter | title, description, difficulty fields | Check YAML frontmatter |

### Automated Verification (Grep-based):
```bash
# For each session file (00-06):
grep -c '왜 필요한가' content/phase-9/0X-*.mdx  # >= 3
grep -c '연결 포인트' content/phase-9/0X-*.mdx   # >= 2
grep -c '흔한 오해' content/phase-9/0X-*.mdx     # >= 1
grep -c 'MermaidDiagram' content/phase-9/0X-*.mdx # >= 1
grep -c '학습 목표' content/phase-9/0X-*.mdx     # >= 1
grep -c '요약' content/phase-9/0X-*.mdx          # >= 1
```

---

## AC-004: Mermaid Diagrams Render Correctly

**Given** a session file containing `<MermaidDiagram>` components
**When** the page is loaded in the browser
**Then** all Mermaid diagrams render as visible SVG graphics without parse errors

### Verification Steps:
1. For each session page, verify:
   - No "Syntax error" text in diagram area
   - No blank/empty diagram containers
   - Diagram content matches the described chart type (flowchart, stateDiagram, etc.)
2. Check browser console for Mermaid-related errors
3. Verify no forbidden characters in diagram source:
   - No apostrophes in node labels
   - No `+` in stateDiagram-v2
   - No unescaped special characters

### Automated Pre-Check:
```bash
# Check for apostrophes in Mermaid chart strings
grep -n "chart={\`" content/phase-9/*.mdx | grep "'"
# Should return empty (no matches)
```

---

## AC-005: Content Accurately Represents Source Material

**Given** the source file `my-docs/palantir-content.md`
**When** the phase-9 content is compared against the source
**Then** all key concepts, technical claims, and architectural descriptions are faithfully represented

### Verification Matrix:

| Session | Source Sections | Key Claims to Verify |
|---------|----------------|---------------------|
| 00-introduction | Sec 1 | Palantir ontology philosophy, Decision Data concept |
| 01-digital-twin | Sec 2-3 | 6-step operational loop mechanism, closed-loop definition |
| 02-core-components | Sec 4 | 5 component types (Object, Link, Action, Function, Interface) |
| 03-owl-comparison | Sec 5 | OWA vs governance trade-off, concept remapping table |
| 04-architecture | Sec 6-7 | 3-layer architecture, read/write paths, security model |
| 05-aip-llm | Sec 9-11 | AIP Logic, Agent Studio, 3 tool categories, Graph RAG comparison |
| 06-industry-patterns | Sec 8,10,12-13 | 5 design principles, manufacturing/medical/military cases |
| 07-exercises | Sec 14 | Questions and 3 project-level exercises |

### Verification Method:
- Manual comparison of session content against corresponding source sections
- Spot-check 3 technical claims per session against source text
- Verify no fabricated claims or unsupported generalizations

---

## AC-006: Cross-References to Phase-7 and Phase-8 Are Valid Links

**Given** phase-9 content contains links to other phases
**When** a user clicks a cross-reference link
**Then** the link navigates to the correct page without 404 errors

### Expected Cross-References:

| From Session | Link Target | Reason |
|-------------|-------------|--------|
| 00-introduction | Phase 2, Phase 6 | RDF/OWL foundation, standard ontologies |
| 01-digital-twin | Phase 5, Phase 7 | Design methodology, practical application |
| 02-core-components | Phase 2, Phase 3 | RDF triples, logical foundations |
| 03-owl-comparison | Phase 3, Phase 4 | OWA/logic, OWL standards |
| 04-architecture | Phase 8 | Scalability limitations |
| 05-aip-llm | Phase 7 | LLM + Graph RAG |
| 06-industry-patterns | Phase 6 | Domain-specific standard ontologies |

### Verification Steps:
1. Grep for all link patterns in phase-9 files: `[text](/phase-X/...)`
2. Verify each linked path exists as a valid route
3. Click-test links in the browser

---

## AC-007: Exercise Components Function Properly

**Given** the `07-exercises.mdx` file contains CompetencyQuestion and Exercise components
**When** a user interacts with the exercise page
**Then** CompetencyQuestion components display questions with selectable answers, and Exercise components display task descriptions

### Verification Steps:
1. Navigate to `/phase-9/07-exercises`
2. Verify CompetencyQuestion components:
   - Questions display with multiple-choice options
   - Selection interaction works (if interactive)
3. Verify Exercise components:
   - 3 exercises with clear task descriptions
   - Each exercise has deliverable expectations

---

## Definition of Done

All of the following must be true:

- [ ] AC-001: All 9 MDX files render without errors
- [ ] AC-002: Phase-9 navigation appears in correct sidebar position
- [ ] AC-003: All 7 content sessions (00-06) pass edu-content quality checklist
- [ ] AC-004: All Mermaid diagrams render correctly
- [ ] AC-005: Content accurately represents source material
- [ ] AC-006: All cross-phase links are valid
- [ ] AC-007: Exercise components function properly
- [ ] `npm run build` completes without errors
- [ ] No console errors or warnings related to phase-9 content
