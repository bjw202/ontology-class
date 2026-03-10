---
id: SPEC-INFRA-001
type: plan
version: "1.0.0"
status: draft
created: "2026-03-10"
updated: "2026-03-10"
author: jw
priority: high
---

# Implementation Plan: SPEC-INFRA-001

## Overview

This plan decomposes the infrastructure setup into 7 logical implementation tasks, ordered by dependency. Each task is self-contained and produces verifiable output. No time estimates are provided per MoAI policy; tasks are ordered by dependency and priority.

---

## Task Dependency Graph

```
Task 1 (Project Init)
  |
  v
Task 2 (App Router) ---> Task 5 (Components)
  |                          |
  v                          v
Task 3 (Content _meta.js) --> Task 4 (Skeleton MDX)
                                |
                                v
                          Task 6 (Styles)
                                |
                                v
                          Task 7 (Build Verification)
```

---

## Task 1: Project Initialization [Primary Goal]

**Objective:** Create foundational configuration files enabling the Nextra 4.x project to install dependencies and recognize the project structure.

**Deliverables:**

### 1.1 package.json

```json
{
  "name": "ontology-learning-site",
  "version": "1.0.0",
  "private": true,
  "description": "Comprehensive ontology learning platform for Korean beginners",
  "scripts": {
    "dev": "next --turbopack",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "format": "prettier --write ."
  },
  "dependencies": {
    "next": "^15",
    "nextra": "^4",
    "nextra-theme-docs": "^4",
    "react": "^19",
    "react-dom": "^19",
    "mermaid": "^11.12.2"
  },
  "devDependencies": {
    "@types/react": "^19",
    "@types/node": "^20",
    "typescript": "^5",
    "prettier": "^3",
    "eslint": "^8",
    "eslint-config-next": "^15"
  }
}
```

### 1.2 tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### 1.3 next.config.mjs

```javascript
import nextra from 'nextra'

const withNextra = nextra({
  // Nextra options
})

export default withNextra({
  reactStrictMode: true,
})
```

### 1.4 mdx-components.tsx (root level)

```typescript
import { useMDXComponents as getThemeComponents } from 'nextra-theme-docs'
import { Exercise } from '@/components/Exercise'
import { MermaidDiagram } from '@/components/MermaidDiagram'
import { ConceptCard } from '@/components/ConceptCard'
import { CompetencyQuestion } from '@/components/CompetencyQuestion'

const themeComponents = getThemeComponents()

export function useMDXComponents(components) {
  return {
    ...themeComponents,
    Exercise,
    MermaidDiagram,
    ConceptCard,
    CompetencyQuestion,
    ...components
  }
}
```

### 1.5 Additional Config Files

- `.gitignore` - Standard Next.js gitignore (node_modules, .next, out, .env.local)
- `.env.example` - Template with `NEXT_PUBLIC_SITE_URL` and `NEXT_PUBLIC_MERMAID_THEME`
- `.prettierrc` - Prettier configuration with appropriate settings

**Verification:** `bun install` completes without errors.

**References:** R-001, R-001.1, R-001.2, R-001.3, R-001.4

---

## Task 2: App Router Setup [Primary Goal]

**Objective:** Create the three App Router files that form Nextra's rendering pipeline.

**Deliverables:**

### 2.1 app/layout.tsx

Root layout integrating Nextra's theme components with Korean language configuration.

Key implementation details:
- Import `Layout`, `Navbar`, `Footer` from `nextra-theme-docs`
- Import `Head` from `nextra/components`
- Import `getPageMap` from `nextra/page-map`
- Import `nextra-theme-docs/style.css`
- Import `@/styles/globals.css`
- Set `<html lang="ko" dir="ltr" suppressHydrationWarning>`
- Configure Korean metadata: title template `'%s - 온톨로지 기초 학습'`
- Navbar logo: `온톨로지 기초 학습`
- Footer: Copyright with MIT license
- Pass `pageMap={await getPageMap()}` to Layout

### 2.2 app/page.tsx

Home page component rendering a Korean welcome page with:
- Site title and description
- Overview of the 8-phase curriculum
- Quick navigation cards to each phase
- Brief description of what learners will achieve

### 2.3 app/[[...mdxPath]]/page.tsx

Catch-all route for all MDX content pages:
- Export `generateStaticParams` using `generateStaticParamsFor('mdxPath')` from `nextra/pages`
- Export default async function using `importPage(params.mdxPath)` from `nextra/pages`
- Use `Wrapper` from `getMDXComponents().wrapper`
- Pass `toc` and `metadata` to Wrapper

**Verification:** `bun run dev` starts without errors; navigating to `http://localhost:3000` shows the home page.

**References:** R-002, R-002.1, R-002.2, R-002.3

---

## Task 3: Content Directory Structure with _meta.js [Primary Goal]

**Objective:** Create all content directories and _meta.js navigation files for the complete 8-phase curriculum plus reference and about sections.

**Deliverables:**

### 3.1 Directory Creation

Create the following directories:
```
content/
content/phase-1/
content/phase-2/
content/phase-3/
content/phase-4/
content/phase-5/
content/phase-6/
content/phase-7/
content/phase-8/
content/reference/
content/about/
```

### 3.2 Root _meta.js

`content/_meta.js` with Korean labels for all 11 navigation entries (home, 8 phases, reference, about). See S-005 in spec.md for exact structure.

### 3.3 Phase _meta.js Files (8 files)

Each phase _meta.js defines ordered entries matching the MDX files in that phase:

**Phase 1** (6 entries): 00-introduction through 05-exercises
**Phase 2** (7 entries): 00-introduction through 06-exercises
**Phase 3** (7 entries): 00-introduction through 06-exercises
**Phase 4** (8 entries): 00-introduction through 07-exercises
**Phase 5** (8 entries): 00-introduction through 07-exercises
**Phase 6** (8 entries): 00-introduction through 07-exercises
**Phase 7** (8 entries): 00-introduction through 07-exercises
**Phase 8** (8 entries): 00-introduction through 07-exercises

Korean display titles for each entry must match the curriculum content:

**Phase 1 _meta.js:**
- 00-introduction: "소개"
- 01-motivation: "동기와 문제 제기"
- 02-interoperability: "상호운용성 문제"
- 03-gruber-definition: "Gruber의 정의"
- 04-benefits: "온톨로지의 이점"
- 05-exercises: "실습"

**Phase 2 _meta.js:**
- 00-introduction: "소개"
- 01-classes: "클래스(Class)와 개념"
- 02-instances: "인스턴스(Instance)와 개체"
- 03-properties: "속성(Property)과 관계"
- 04-axioms: "공리(Axiom)와 제약조건"
- 05-hierarchy: "클래스 계층구조와 상속"
- 06-exercises: "실습"

**Phase 3 _meta.js:**
- 00-introduction: "소개"
- 01-description-logic: "기술 논리(Description Logic) 입문"
- 02-owa-cwa: "개방 세계 vs 폐쇄 세계 가정"
- 03-reasoning-types: "추론의 종류"
- 04-reasoners: "추론기(Reasoner) 도구"
- 05-complexity: "계산 복잡도"
- 06-exercises: "실습"

**Phase 4 _meta.js:**
- 00-introduction: "소개"
- 01-rdf: "RDF (자원 기술 프레임워크)"
- 02-rdfs: "RDFS (RDF 스키마)"
- 03-owl: "OWL (웹 온톨로지 언어)"
- 04-sparql: "SPARQL 쿼리 언어"
- 05-serialization: "직렬화 형식"
- 06-tools-software: "도구와 소프트웨어"
- 07-exercises: "실습"

**Phase 5 _meta.js:**
- 00-introduction: "소개"
- 01-methontology: "METHONTOLOGY 프레임워크"
- 02-competency-questions: "역량 질문(Competency Questions)"
- 03-top-down-design: "하향식 설계"
- 04-bottom-up-design: "상향식 설계"
- 05-anti-patterns: "안티패턴"
- 06-quality-criteria: "품질 기준과 평가"
- 07-exercises: "실습"

**Phase 6 _meta.js:**
- 00-introduction: "소개"
- 01-foaf: "FOAF (Friend of a Friend)"
- 02-dublin-core: "Dublin Core 메타데이터"
- 03-schema-org: "Schema.org"
- 04-gene-ontology: "유전자 온톨로지(Gene Ontology)"
- 05-snomed-ct: "SNOMED CT 의료 온톨로지"
- 06-analysis: "비교 분석"
- 07-exercises: "실습"

**Phase 7 _meta.js:**
- 00-introduction: "소개"
- 01-semantic-web: "시맨틱 웹"
- 02-knowledge-graphs: "지식 그래프(Knowledge Graphs)"
- 03-search-recommendation: "검색과 추천 시스템"
- 04-nlp-ontology: "자연어처리(NLP)와 온톨로지"
- 05-llm-graph-rag: "LLM 시대: Graph RAG"
- 06-manufacturing: "제조업과 Industry 4.0"
- 07-exercises: "실습"

**Phase 8 _meta.js:**
- 00-introduction: "소개"
- 01-cost-reality: "온톨로지 비용의 현실"
- 02-mapping-problems: "매핑과 통합 문제"
- 03-vector-embeddings: "벡터 임베딩 대안"
- 04-comparison: "온톨로지 vs 임베딩 비교"
- 05-decision-tree: "의사결정 트리"
- 06-when-not-to-use: "온톨로지를 쓰지 말아야 할 때"
- 07-exercises: "실습"

### 3.4 Reference _meta.js

```javascript
export default {
  glossary: '용어 사전',
  faq: '자주 묻는 질문',
  misconceptions: '흔한 오해 모음',
  resources: '외부 자료',
  bibliography: '참고 문헌'
}
```

### 3.5 About _meta.js

```javascript
export default {
  index: '소개',
  curriculum: '커리큘럼 설계 철학',
  contributors: '기여자'
}
```

**Verification:** All _meta.js files exist and export valid JavaScript objects with Korean string values.

**References:** R-003, R-003.1, R-003.2, R-003.3, R-003.4, R-004

---

## Task 4: Skeleton MDX Files [Secondary Goal]

**Objective:** Create 69 skeleton MDX files with proper frontmatter, Korean section headers, and placeholder content.

**Deliverables:**

### 4.1 Home Page (content/index.mdx)

Korean welcome page with:
- Site title and subtitle
- Brief curriculum overview
- Navigation links to all 8 phases
- "Getting started" guidance

### 4.2 Phase Session Files (61 files)

Each session file follows this skeleton template:

```mdx
---
title: "[Korean Title]"
description: "[Korean description of session content]"
difficulty: "beginner"
---

# [N]회차: [Korean Title]

## 학습 목표

- (SPEC-CONTENT-P[N]에서 추가 예정)

## 이번 세션 전체 그림

> 다이어그램은 SPEC-CONTENT-P[N]에서 추가됩니다.

## 핵심 개념

### [Concept Name]

> **왜 필요한가?** (SPEC-CONTENT-P[N]에서 추가 예정)

> 연결 포인트: (SPEC-CONTENT-P[N]에서 추가 예정)

## 흔한 오해

- (SPEC-CONTENT-P[N]에서 추가 예정)

## 실습

### 기본 실습

(SPEC-CONTENT-P[N]에서 추가 예정)

### 도전 실습

(SPEC-CONTENT-P[N]에서 추가 예정)

## 요약

(SPEC-CONTENT-P[N]에서 추가 예정)
```

Session-specific adjustments:
- `00-introduction.mdx` files: Phase overview format (학습 개요, 이번 단계에서 배울 내용, 사전 지식)
- Exercise files (`0X-exercises.mdx`): Exercise collection format (기본 실습 목록, 도전 실습 목록, 자기 평가 질문)
- Difficulty field varies: `beginner` for phases 1-2, `intermediate` for 3-6, `advanced` for 7-8

### 4.3 Reference Files (5 files)

- `glossary.mdx` - Korean glossary skeleton with table structure (English Term | Korean Translation | Definition)
- `faq.mdx` - FAQ skeleton with question/answer format
- `misconceptions.mdx` - Misconceptions collection skeleton
- `resources.mdx` - External resources skeleton organized by category
- `bibliography.mdx` - Academic references skeleton

### 4.4 About Files (3 files)

- `index.mdx` - About this site
- `curriculum.mdx` - Curriculum design philosophy
- `contributors.mdx` - Contributors and acknowledgments

**Verification:** All 69 MDX files exist with valid frontmatter and Korean section headers. No import statements present.

**References:** R-005, R-005.1, R-005.2, R-005.3, R-005.4, R-006, R-009

---

## Task 5: Custom React Components [Secondary Goal]

**Objective:** Create 4 custom React components for MDX content enhancement.

**Deliverables:**

### 5.1 components/Exercise.tsx

- `'use client'` directive for interactive toggle
- Props: `difficulty` (basic | challenge), `title`, `children`, `solution`
- Visual label: "기본 실습" or "도전 실습" with distinct styling
- Collapsible solution section with "정답 보기" / "정답 숨기기" toggle button
- Accessible: keyboard navigable, ARIA labels
- Responsive layout

### 5.2 components/MermaidDiagram.tsx

- `'use client'` directive
- Dynamic import of `mermaid` library (no SSR)
- Props: `chart` (string), `caption` (optional string)
- Loading state: "다이어그램 로딩 중..." placeholder
- Error state: Graceful error message display
- Theme detection: Read Nextra dark mode state, apply Mermaid `dark`/`default` theme
- Re-render on theme change via `useEffect` dependency
- Unique ID generation per instance to prevent DOM conflicts

### 5.3 components/ConceptCard.tsx

- No `'use client'` needed (can be server component)
- Props: `title`, `description`, `icon` (optional emoji/string), `variant` (default | highlight | warning)
- Card layout with rounded corners, subtle shadow
- Variant styles: different border-left colors
- Responsive: full width on mobile, card grid on desktop

### 5.4 components/CompetencyQuestion.tsx

- `'use client'` directive for interactive answer reveal
- Props: `question`, `options` (string[]), `answer` (number index), `explanation`
- Multiple choice display with labeled options (A, B, C, D)
- "정답 확인" button to reveal answer
- Visual feedback: green for correct, red for incorrect on selection
- Explanation display after answer reveal
- Accessible: proper form labels, keyboard navigation

**Verification:** All 4 components compile with zero TypeScript errors and render correctly in MDX context.

**References:** R-007, R-008, R-010, R-010.1, R-010.2, R-010.3, R-010.4

---

## Task 6: Styles Setup [Secondary Goal]

**Objective:** Configure global CSS with Korean font support and CSS custom properties.

**Deliverables:**

### 6.1 styles/globals.css

```css
/* Korean font import via Google Fonts or next/font */
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&display=swap');

:root {
  --font-korean: 'Noto Sans KR', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --content-max-width: 800px;
  --sidebar-width: 280px;
}

body {
  font-family: var(--font-korean);
}

/* Additional Korean typography optimizations */
/* Responsive font sizes */
/* Component-specific overrides if needed */
/* Dark mode custom property overrides */
```

Note: Consider using `next/font/google` for Noto Sans KR as an optimization (automatic font optimization, no layout shift). This would be configured in `app/layout.tsx` instead of CSS `@import`.

### 6.2 Font Strategy Decision

Two options available:

**Option A (CSS @import):** Simple, works immediately, but causes FOUT (Flash of Unstyled Text).

**Option B (next/font - Recommended):** Import `Noto_Sans_KR` from `next/font/google` in `app/layout.tsx`, apply via className on `<body>`. Zero layout shift, self-hosted font files.

Recommendation: Use Option B (next/font) for production quality.

**Verification:** Korean text renders correctly in both light and dark modes with proper font weight support.

**References:** R-011, R-011.1, R-011.2, R-011.3, R-011.4, R-011.5

---

## Task 7: Build Verification [Final Goal]

**Objective:** Verify the complete infrastructure builds and runs without errors.

**Deliverables:**

### 7.1 Dependency Installation Test

```bash
bun install  # or npm install
```
Expected: Zero errors, all dependencies resolved.

### 7.2 Development Server Test

```bash
bun run dev  # or npm run dev
```
Expected: Server starts on localhost:3000 without errors.

### 7.3 Build Test

```bash
bun run build  # or npm run build
```
Expected: Zero TypeScript errors, zero ESLint errors, build completes successfully.

### 7.4 Navigation Verification

Manual verification checklist:
- [ ] Home page loads with Korean content
- [ ] All 8 phase sections appear in sidebar with Korean labels
- [ ] Clicking any phase navigates to its introduction page
- [ ] Reference and About sections appear in navigation
- [ ] Dark mode toggle works
- [ ] Search functionality is available
- [ ] Mermaid placeholder renders without errors (actual diagrams in content SPECs)

### 7.5 File Completeness Audit

Verify counts:
- [ ] 11 _meta.js files (1 root + 8 phases + 1 reference + 1 about)
- [ ] 69 MDX files (1 home + 61 phase sessions + 5 reference + 3 about - 1 overlap = 69)
- [ ] 4 custom components
- [ ] 3 app router files (layout + page + catch-all)
- [ ] 4 config files (package.json + next.config.mjs + tsconfig.json + mdx-components.tsx)

**References:** R-012, R-012.1, R-012.2, R-012.3, R-012.4

---

## Risks and Mitigation

### Risk 1: Nextra 4.x API Changes

**Description:** Nextra 4.x is relatively new and API patterns may differ from documentation.
**Probability:** Medium
**Impact:** High - could block entire setup
**Mitigation:** Verify exact import paths against published npm package. Use `nextra/pages` for `importPage` and `generateStaticParamsFor`. Use `nextra/page-map` for `getPageMap`. Use `nextra/components` for `Head`. Use `nextra-theme-docs` for `Layout`, `Navbar`, `Footer`. Fall back to Nextra GitHub examples if documentation is incomplete.

### Risk 2: Mermaid SSR Compatibility

**Description:** Mermaid requires browser DOM APIs and cannot render server-side.
**Probability:** High (known issue)
**Impact:** Medium - affects diagram component only
**Mitigation:** Use `'use client'` directive and dynamic import with `ssr: false`. Implement loading placeholder. Test with Next.js App Router SSR/CSR boundary.

### Risk 3: Korean Font Loading Performance

**Description:** Noto Sans KR font files are large (CJK character set) and may cause slow initial load.
**Probability:** Medium
**Impact:** Medium - affects perceived performance
**Mitigation:** Use `next/font/google` with subset selection. Implement `font-display: swap`. Consider using `woff2` format only. Lazy load heavier font weights (300, 700) if not immediately needed.

### Risk 4: Large Number of Static Pages

**Description:** 69 MDX files may cause slow build times during `next build`.
**Probability:** Low (skeleton content is minimal)
**Impact:** Low during infrastructure phase (increases with content)
**Mitigation:** Use Turbopack for development. Monitor build times as content is added.

---

## Architecture Notes

### Content-Infrastructure Separation

This SPEC establishes a clear separation:
- **SPEC-INFRA-001 (this SPEC):** All technical infrastructure, configuration, components, and skeleton files
- **SPEC-CONTENT-P[N] (future SPECs):** Actual educational content filling the skeleton MDX files

This separation ensures:
1. Infrastructure can be verified independently
2. Content generation can proceed in parallel across phases
3. Content changes do not require infrastructure changes
4. Multiple content contributors can work simultaneously

### Component Registration Strategy

Components are registered globally via `mdx-components.tsx`, eliminating the need for imports in MDX files. This approach:
- Prevents import errors in MDX authoring
- Ensures consistent component versions across all pages
- Simplifies content contributor workflow
- Aligns with project requirement C-002 (no JSX imports in MDX)

### Navigation Architecture

Nextra's `_meta.js`-based navigation provides:
- Automatic sidebar generation from file structure
- Korean labels for all navigation items
- Ordered entries matching curriculum progression
- Breadcrumb navigation for learner orientation
- Built-in search via FlexSearch
