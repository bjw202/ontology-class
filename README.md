# 온톨로지 기초 학습 플랫폼 (Ontology Fundamentals Learning Platform)

[![React](https://img.shields.io/badge/React-19-61DAFB.svg?style=flat&logo=react&logoColor=white)](https://reactjs.org/)
[![Next.js](https://img.shields.io/badge/Next.js-15-000000.svg?style=flat&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6.svg?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Nextra](https://img.shields.io/badge/Nextra-4.x-00D084.svg?style=flat)](https://nextra.site/)
[![Mermaid](https://img.shields.io/badge/Mermaid-11.12-FF3670.svg?style=flat)](https://mermaid.js.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=flat)](LICENSE)

## 📋 프로젝트 개요

온톨로지 기초부터 엔터프라이즈 수준의 활용 사례까지 단계별로 학습할 수 있는 한국어 교육 웹사이트입니다. 9단계 커리큘럼을 통해 온톨로지의 이론적 기초, 표준 언어 생태계, 설계 방법론, 그리고 Palantir의 엔터프라이즈 온톨로지 적용 사례까지 체계적으로 학습할 수 있습니다.

**English**: An educational web platform for learning ontology fundamentals through a 9-phase Korean curriculum — from motivation and logical foundations to enterprise applications with Palantir's ontology stack.

### 🎯 주요 기능

- **9단계 체계적 커리큘럼**: 기초 개념부터 엔터프라이즈 적용 사례까지
- **한국어 콘텐츠**: 온톨로지 전 영역을 한국어로 학습
- **Mermaid 다이어그램**: race condition 없는 안정적인 다이어그램 렌더링
- **단일 HTML 내보내기**: 서버 없이 배포 가능한 단일 HTML 파일 생성
- **반응형 디자인**: 모든 기기에서 최적 경험 제공
- **Nextra 검색**: 내장 전문 검색 기능

### 💻 기술 스택

| 기술 | 버전 | 역할 |
|------|------|------|
| **Next.js** | 15.x | React 기반 풀스택 프레임워크 |
| **React** | 19.x | UI 라이브러리 |
| **TypeScript** | 5.x | 정적 타입 |
| **Nextra** | 4.x | MDX 기반 문서 프레임워크 |
| **Mermaid** | 11.12.2 | 다이어그램 생성 (직렬화 큐 적용) |
| **Tailwind CSS** | 3.x | 유틸리티 CSS |

---

## 🚀 빠른 시작

### 사전 요구사항

- Node.js 18.0 이상
- npm 9.0 이상

### 설치 및 실행

```bash
# 저장소 복제
git clone https://github.com/bjw202/ontology-class.git
cd ontology-class

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

브라우저에서 `http://localhost:3000` 접속

### 빌드

```bash
# 프로덕션 빌드 (Vercel / 서버 배포)
npm run build
npm run start

# 단일 HTML 파일로 내보내기 (오프라인 배포)
npm run build:single-full
# → out/ontology-single.html 생성
```

---

## 📁 프로젝트 구조

```
ontology-class/
├── content/                  # MDX 콘텐츠 (Nextra 자동 라우팅)
│   ├── _meta.js              # 사이드바 순서·제목 설정
│   ├── index.mdx             # 홈 페이지
│   ├── phase-1/              # 1단계: 왜 온톨로지가 필요한가?
│   ├── phase-2/              # 2단계: 구성 요소
│   ├── phase-3/              # 3단계: 논리적 기초
│   ├── phase-4/              # 4단계: 표준과 언어 생태계
│   ├── phase-5/              # 5단계: 설계 방법론
│   ├── phase-6/              # 6단계: 주요 표준 온톨로지
│   ├── phase-7/              # 7단계: 실전 적용
│   ├── phase-8/              # 8단계: 한계와 대안
│   ├── phase-9/              # 9단계: 엔터프라이즈 온톨로지 (Palantir)
│   ├── reference/            # 참고자료
│   └── about/                # 소개
├── components/               # 커스텀 React 컴포넌트
│   ├── MermaidDiagram.tsx    # Mermaid 다이어그램 (직렬화 큐 적용)
│   ├── mermaid-remark.tsx    # remark-mermaid 커스텀 렌더러
│   ├── Exercise.tsx          # 실습 컴포넌트
│   ├── ConceptCard.tsx       # 개념 카드 컴포넌트
│   └── CompetencyQuestion.tsx # 역량 문제 컴포넌트
├── scripts/
│   ├── static-export-bundle.js  # 단일 HTML 번들러
│   └── build-single-html.js     # 기존 단순 빌더 (레거시)
├── my-docs/                  # 개발 참고 문서
│   └── single-html-export.md # 단일 HTML 내보내기 원리 설명
├── next.config.mjs           # Next.js 설정 (정적 export 조건부 지원)
├── mdx-components.tsx        # MDX 전역 컴포넌트 등록
└── package.json              # 스크립트 및 의존성
```

---

## 📚 커리큘럼

### 9단계 학습 과정

| 단계 | 제목 | 핵심 내용 |
|-----|------|----------|
| **1단계** | 왜 온톨로지가 필요한가? | 동기 부여, 상호운용성 문제, Gruber의 정의 |
| **2단계** | 구성 요소 | 클래스, 인스턴스, 속성, 공리, 계층 구조 |
| **3단계** | 논리적 기초 | 기술 논리(DL), OWA vs CWA, 추론 유형, OWL 2 |
| **4단계** | 표준과 언어 생태계 | RDF, RDFS, OWL, SPARQL, 직렬화 형식, 도구 |
| **5단계** | 설계 방법론 | METHONTOLOGY, CQ 기반 설계, 재사용, 안티패턴 |
| **6단계** | 주요 표준 온톨로지 | FOAF, Dublin Core, Schema.org, GO, SNOMED, FHIR |
| **7단계** | 실전 적용 | 시맨틱 웹, 지식 그래프, NLP, LLM+GraphRAG |
| **8단계** | 한계와 대안 | 현실적 비용, 벡터 임베딩과의 비교, 기술 선택 트리 |
| **9단계** | 엔터프라이즈 온톨로지 | Palantir Foundry 사례, Digital Twin, AIP+LLM 통합 |

---

## ⚙️ 스크립트 참고

```bash
npm run dev              # 개발 서버 (localhost:3000)
npm run build            # 프로덕션 빌드 (서버 배포용)
npm run build:export     # Next.js 정적 export (→ /out 폴더)
npm run bundle:single    # /out 폴더를 단일 HTML로 번들링
npm run build:single-full  # build:export + bundle:single 한 번에
```

### 단일 HTML 내보내기 상세

서버 없이 오프라인으로 배포하거나 단일 파일로 공유할 때 사용합니다.

```bash
npm run build:single-full
# 출력: out/ontology-single.html
```

**작동 원리:**
1. `NEXT_STATIC_EXPORT=1 next build` → Nextra CSS + 완성된 HTML 페이지들 생성
2. 번들러 스크립트가 각 페이지 `<article>` 추출
3. MDX 원본에서 Mermaid 다이어그램 소스 파싱 → `<pre class="mermaid">` 블록으로 주입
4. Mermaid CDN + 해시 기반 네비게이션 스크립트 추가
5. 단일 `.html` 파일로 조립

> 자세한 원리는 [`my-docs/single-html-export.md`](my-docs/single-html-export.md) 참고

---

## 🤝 기여 가이드라인

1. 저장소 포크 및 로컬 클론
2. 기능 브랜치 생성: `git checkout -b feat/새기능`
3. MDX 파일 수정 또는 컴포넌트 추가
4. 커밋: `git commit -m 'feat: 새 기능 설명'`
5. 푸시 및 Pull Request 생성

### 커밋 메시지 규칙

| 타입 | 용도 |
|------|------|
| `feat` | 새 기능 |
| `fix` | 버그 수정 |
| `docs` | 문서 변경 |
| `refactor` | 리팩토링 |
| `chore` | 빌드·도구 변경 |

### 코드 컨벤션

- TypeScript strict mode 사용
- 컴포넌트: PascalCase / 파일명: kebab-case
- 코드 주석: 한국어

---

## 📄 라이선스

MIT License — 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

---

### 📈 프로젝트 상태

| 항목 | 상태 |
|------|------|
| 개발 | 🟢 활발 진행 중 |
| 커리큘럼 | 9단계 완성 |
| 단일 HTML 내보내기 | ✅ 지원 |
| 다국어 지원 | 한국어 (주), English (설명) |
