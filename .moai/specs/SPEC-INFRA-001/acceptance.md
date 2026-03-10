---
id: SPEC-INFRA-001
type: acceptance
version: "1.0.0"
status: draft
created: "2026-03-10"
updated: "2026-03-10"
author: jw
priority: high
---

# Acceptance Criteria: SPEC-INFRA-001

## Overview

This document defines the acceptance criteria for the Nextra 4.x Ontology Education Site Infrastructure. All criteria use the Given-When-Then format and must pass before the SPEC is considered complete.

---

## AC-001: Project Initialization

### AC-001.1: Dependency Installation

```gherkin
GIVEN a fresh clone of the repository
WHEN `bun install` (or `npm install`) is executed
THEN all dependencies install successfully with zero errors
AND the node_modules directory contains nextra, nextra-theme-docs, next, react, react-dom, and mermaid packages
```

### AC-001.2: Package Configuration

```gherkin
GIVEN the package.json file exists
WHEN the file is inspected
THEN it declares the following production dependencies:
  | Package           | Version  |
  | next              | ^15      |
  | nextra            | ^4       |
  | nextra-theme-docs | ^4       |
  | react             | ^19      |
  | react-dom         | ^19      |
  | mermaid           | ^11.12.2 |
AND it declares the following dev dependencies:
  | Package           | Version  |
  | @types/react      | ^19      |
  | @types/node       | ^20      |
  | typescript        | ^5       |
  | prettier          | ^3       |
  | eslint            | ^8       |
  | eslint-config-next| ^15      |
AND it contains dev, build, start, and lint scripts
```

### AC-001.3: TypeScript Configuration

```gherkin
GIVEN tsconfig.json exists at the project root
WHEN the file is inspected
THEN strict mode is set to true
AND the target is ES2020 or later
AND jsx is set to "preserve"
AND path alias "@/*" maps to "./*"
AND moduleResolution is "bundler"
```

### AC-001.4: Next.js Configuration

```gherkin
GIVEN next.config.mjs exists at the project root
WHEN the file is inspected
THEN it imports nextra from 'nextra'
AND it wraps the Next.js config with the nextra() function
AND reactStrictMode is true
```

### AC-001.5: MDX Components Registration

```gherkin
GIVEN mdx-components.tsx exists at the project root
WHEN the file is inspected
THEN it imports useMDXComponents from 'nextra-theme-docs'
AND it imports Exercise, MermaidDiagram, ConceptCard, and CompetencyQuestion components
AND it exports a useMDXComponents function that merges theme and custom components
```

---

## AC-002: App Router Setup

### AC-002.1: Root Layout

```gherkin
GIVEN app/layout.tsx exists
WHEN the file is inspected
THEN it imports Layout, Navbar, Footer from 'nextra-theme-docs'
AND it imports Head from 'nextra/components'
AND it imports getPageMap from 'nextra/page-map'
AND it imports 'nextra-theme-docs/style.css'
AND the html element has lang="ko" attribute
AND the Layout component receives pageMap={await getPageMap()}
AND the navbar displays "온톨로지 기초 학습" as logo text
AND metadata.title.default is "온톨로지 기초 학습"
```

### AC-002.2: Home Page

```gherkin
GIVEN app/page.tsx exists
WHEN the page loads at http://localhost:3000
THEN the page displays Korean welcome content
AND the page includes navigation or links to the 8 curriculum phases
AND the page renders without any runtime errors
```

### AC-002.3: Catch-All MDX Route

```gherkin
GIVEN app/[[...mdxPath]]/page.tsx exists
WHEN the file is inspected
THEN it imports generateStaticParamsFor and importPage from 'nextra/pages'
AND it exports generateStaticParams using generateStaticParamsFor('mdxPath')
AND the default export is an async function that calls importPage with params.mdxPath
AND it uses the Wrapper component from getMDXComponents().wrapper
```

---

## AC-003: Content Directory Navigation

### AC-003.1: Root Navigation

```gherkin
GIVEN content/_meta.js exists
WHEN the file is inspected
THEN it exports a default object with the following keys in order:
  | Key       | Korean Label                        |
  | index     | (Home page entry)                   |
  | phase-1   | 1단계: 왜 온톨로지가 필요한가?      |
  | phase-2   | 2단계: 구성 요소                    |
  | phase-3   | 3단계: 논리적 기초                  |
  | phase-4   | 4단계: 표준과 언어 생태계           |
  | phase-5   | 5단계: 설계 방법론                  |
  | phase-6   | 6단계: 주요 표준 온톨로지           |
  | phase-7   | 7단계: 실전 적용                    |
  | phase-8   | 8단계: 한계와 대안                  |
  | reference | 참고자료                            |
  | about     | 소개                                |
```

### AC-003.2: Phase Navigation Files

```gherkin
GIVEN all 8 phase directories contain _meta.js files
WHEN each _meta.js is inspected
THEN Phase 1 _meta.js has 6 entries (00-introduction through 05-exercises)
AND Phase 2 _meta.js has 7 entries (00-introduction through 06-exercises)
AND Phase 3 _meta.js has 7 entries (00-introduction through 06-exercises)
AND Phase 4 _meta.js has 8 entries (00-introduction through 07-exercises)
AND Phase 5 _meta.js has 8 entries (00-introduction through 07-exercises)
AND Phase 6 _meta.js has 8 entries (00-introduction through 07-exercises)
AND Phase 7 _meta.js has 8 entries (00-introduction through 07-exercises)
AND Phase 8 _meta.js has 8 entries (00-introduction through 07-exercises)
AND all entry values are Korean language strings
AND each entry key corresponds to an existing MDX file in that directory
```

### AC-003.3: Reference and About Navigation

```gherkin
GIVEN content/reference/_meta.js exists
WHEN the file is inspected
THEN it contains entries for glossary, faq, misconceptions, resources, and bibliography
AND all values are Korean labels

GIVEN content/about/_meta.js exists
WHEN the file is inspected
THEN it contains entries for index, curriculum, and contributors
AND all values are Korean labels
```

### AC-003.4: Sidebar Rendering

```gherkin
GIVEN the development server is running
WHEN a user navigates to any phase page
THEN the sidebar displays all 8 phases with Korean labels
AND the current phase is expanded showing its subsections
AND the reference and about sections appear in the sidebar
AND clicking any sidebar item navigates to the correct page
```

---

## AC-004: Skeleton MDX Files

### AC-004.1: File Completeness

```gherkin
GIVEN the content directory is fully scaffolded
WHEN all MDX files are counted
THEN there are exactly 69 MDX files total:
  | Location          | Count |
  | content/ root     | 1     |
  | content/phase-1/  | 6     |
  | content/phase-2/  | 7     |
  | content/phase-3/  | 7     |
  | content/phase-4/  | 8     |
  | content/phase-5/  | 8     |
  | content/phase-6/  | 8     |
  | content/phase-7/  | 8     |
  | content/phase-8/  | 8     |
  | content/reference/ | 5    |
  | content/about/    | 3     |
```

### AC-004.2: Frontmatter Validation

```gherkin
GIVEN any skeleton MDX file in the content directory
WHEN the file's frontmatter is inspected
THEN it contains a "title" field with a Korean string value
AND it contains a "description" field with a Korean string value
AND it contains a "difficulty" field with one of: "beginner", "intermediate", "advanced"
```

### AC-004.3: Session Template Structure

```gherkin
GIVEN any session MDX file (not introduction or exercises)
WHEN the file content is inspected
THEN it contains a top-level heading with Korean session title (format: "[N]회차: [Title]")
AND it contains a "## 학습 목표" section
AND it contains a "## 이번 세션 전체 그림" section (diagram placeholder)
AND it contains a "## 핵심 개념" section
AND it contains a "## 흔한 오해" section
AND it contains a "## 실습" section with "### 기본 실습" and "### 도전 실습" subsections
AND it contains a "## 요약" section
AND the file does NOT contain any import statements
```

### AC-004.4: Introduction File Structure

```gherkin
GIVEN any 00-introduction.mdx file
WHEN the file content is inspected
THEN it contains a phase-level overview heading
AND it contains a "학습 개요" or equivalent overview section
AND it contains a "이번 단계에서 배울 내용" section listing what the phase covers
AND it does NOT contain any import statements
```

### AC-004.5: Exercise File Structure

```gherkin
GIVEN any exercises MDX file (05-exercises.mdx, 06-exercises.mdx, or 07-exercises.mdx)
WHEN the file content is inspected
THEN it contains sections for "기본 실습" (basic exercises)
AND it contains sections for "도전 실습" (challenge exercises)
AND it contains a self-assessment or competency question section
AND it does NOT contain any import statements
```

### AC-004.6: No JSX Imports

```gherkin
GIVEN all 69 MDX files in the content directory
WHEN each file is searched for import statements
THEN zero files contain "import" statements for React components
AND callout/alert content uses blockquote ">" syntax
```

---

## AC-005: Custom React Components

### AC-005.1: Exercise Component

```gherkin
GIVEN components/Exercise.tsx exists
WHEN the component is inspected
THEN it has 'use client' directive at the top
AND it accepts props: difficulty ('basic' | 'challenge'), title (string), children (ReactNode), solution (optional ReactNode)
AND it displays "기본 실습" label when difficulty is "basic"
AND it displays "도전 실습" label when difficulty is "challenge"
AND it has a collapsible solution section toggled by a "정답 보기" / "정답 숨기기" button
AND it compiles without TypeScript errors
```

### AC-005.2: MermaidDiagram Component

```gherkin
GIVEN components/MermaidDiagram.tsx exists
WHEN the component is inspected
THEN it has 'use client' directive at the top
AND it dynamically imports mermaid (not a static import at the top level)
AND it accepts props: chart (string), caption (optional string)

GIVEN a page with a MermaidDiagram component
WHEN the page loads
THEN "다이어그램 로딩 중..." placeholder is displayed initially
AND after Mermaid initializes, the diagram SVG replaces the placeholder
AND no server-side rendering errors occur

GIVEN an invalid Mermaid syntax in the chart prop
WHEN the component attempts to render
THEN an error message is displayed instead of crashing the page
```

### AC-005.3: ConceptCard Component

```gherkin
GIVEN components/ConceptCard.tsx exists
WHEN the component is inspected
THEN it accepts props: title (string), description (string), icon (optional string), variant ('default' | 'highlight' | 'warning')
AND it renders a card with title and description
AND different variant values produce visually distinct styles
AND it compiles without TypeScript errors
```

### AC-005.4: CompetencyQuestion Component

```gherkin
GIVEN components/CompetencyQuestion.tsx exists
WHEN the component is inspected
THEN it has 'use client' directive at the top
AND it accepts props: question (string), options (string[]), answer (number), explanation (string)
AND it displays the question text and multiple choice options

GIVEN a CompetencyQuestion is rendered
WHEN the user clicks "정답 확인"
THEN the correct answer is highlighted
AND the explanation text is displayed
AND the user's selection (if any) shows correct/incorrect visual feedback
```

---

## AC-006: No Component Imports in MDX

```gherkin
GIVEN mdx-components.tsx registers Exercise, MermaidDiagram, ConceptCard, and CompetencyQuestion
WHEN an MDX file uses <Exercise difficulty="basic" title="Test">Content</Exercise>
THEN the component renders correctly without any import statement in the MDX file

GIVEN an MDX file with a blockquote callout (> **Note:** text)
WHEN the page renders
THEN the blockquote displays as a styled callout element
```

---

## AC-007: Styles and Korean Font

### AC-007.1: Korean Font Rendering

```gherkin
GIVEN the site loads in a browser
WHEN any page with Korean text is displayed
THEN the Korean text renders using Noto Sans KR (or configured Korean font)
AND all Hangul characters display correctly
AND font weights 300, 400, 500, and 700 are available
AND the font-family fallback chain includes system sans-serif fonts
```

### AC-007.2: Dark Mode Support

```gherkin
GIVEN the site is loaded with light theme
WHEN the user toggles to dark mode
THEN all text remains readable with proper contrast
AND background colors change to dark theme values
AND Mermaid diagrams (when rendered) switch to dark theme
AND custom components adapt to dark theme
```

### AC-007.3: Responsive Design

```gherkin
GIVEN the site is loaded on a mobile device (viewport width < 768px)
WHEN any page is displayed
THEN Korean text is readable without horizontal scrolling
AND the sidebar collapses to a hamburger menu
AND components (Exercise, ConceptCard, CompetencyQuestion) are full-width
AND navigation is accessible via the mobile menu
```

---

## AC-008: Build Verification

### AC-008.1: Development Server

```gherkin
GIVEN all project files are in place and dependencies are installed
WHEN `bun dev` (or `npm run dev`) is executed
THEN the development server starts without errors
AND the site is accessible at http://localhost:3000
AND the home page displays Korean welcome content
AND navigating to /phase-1/00-introduction renders the Phase 1 introduction
```

### AC-008.2: Production Build

```gherkin
GIVEN all project files are in place and dependencies are installed
WHEN `bun run build` (or `npm run build`) is executed
THEN the build completes successfully
AND zero TypeScript compilation errors are reported
AND zero ESLint errors are reported
AND all 69 MDX pages are included in the build output
```

### AC-008.3: Navigation Completeness

```gherkin
GIVEN the development server is running
WHEN the sidebar navigation is inspected
THEN all 8 phases appear with correct Korean labels
AND the reference section appears with Korean label "참고자료"
AND the about section appears with Korean label "소개"
AND every _meta.js entry has a corresponding accessible page
AND no 404 errors occur when navigating through all sidebar links
```

### AC-008.4: Search Functionality

```gherkin
GIVEN the site has been built or is running in development mode
WHEN the user clicks the search bar
AND types a Korean term (e.g., "온톨로지")
THEN search results appear showing matching pages
AND clicking a search result navigates to the correct page
```

---

## Quality Gates

### QG-001: TypeScript Compliance

```gherkin
GIVEN the complete project source code
WHEN `npx tsc --noEmit` is executed
THEN zero type errors are reported
AND all component props have explicit TypeScript interfaces
AND no `any` type is used without justification
```

### QG-002: File Structure Compliance

```gherkin
GIVEN the project directory
WHEN the file structure is audited
THEN the following directories exist:
  - app/ (with layout.tsx, page.tsx, [[...mdxPath]]/page.tsx)
  - content/ (with _meta.js and index.mdx)
  - content/phase-1/ through content/phase-8/ (each with _meta.js and MDX files)
  - content/reference/ (with _meta.js and 5 MDX files)
  - content/about/ (with _meta.js and 3 MDX files)
  - components/ (with 4 .tsx files)
  - styles/ (with globals.css)
AND the total _meta.js count is 11
AND the total MDX file count is 69
AND the total component count is 4
```

### QG-003: Content Language Compliance

```gherkin
GIVEN all _meta.js files
WHEN their display labels are inspected
THEN all user-facing labels are in Korean
AND English technical terms appear with Korean context where relevant

GIVEN all MDX skeleton files
WHEN their section headers are inspected
THEN all headers use Korean text matching the session template
AND English terms in headers include Korean translations in parentheses
```

---

## Definition of Done

The SPEC-INFRA-001 is considered DONE when:

1. All 8 acceptance criteria groups (AC-001 through AC-008) pass
2. All 3 quality gates (QG-001 through QG-003) pass
3. `bun install && bun run build` completes with zero errors
4. `bun dev` serves the site with functional Korean navigation
5. No import statements exist in any MDX file
6. All 69 MDX files contain proper Korean frontmatter and section headers
7. All 4 custom components compile without TypeScript errors
8. Korean text renders correctly with proper font in both light and dark modes
