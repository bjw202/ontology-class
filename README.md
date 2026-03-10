# 온톨로지 기초 학습 플랫폼 (Ontology Fundamentals Learning Platform)

[![React](https://img.shields.io/badge/React-19-61DAFB.svg?style=flat&logo=react&logoColor=white)](https://reactjs.org/)
[![Next.js](https://img.shields.io/badge/Next.js-15-000000.svg?style=flat&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6.svg?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Nextra](https://img.shields.io/badge/Nextra-4.x-00D084.svg?style=flat&logo=nextra&logoColor=white)](https://nextra.site/)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=flat)](LICENSE)

## 📋 프로젝트 개요

**한국어**: 온톨로지 기초 학습 플랫폼은 온톨로지의 기초부터 고급 개념까지 단계별로 학습할 수 있는 교육 웹사이트입니다. 8단계 커리큘럼을 통해 온톨로지의 동기 부여, 기본 구성 요소, 논리적 기초, 표준, 설계 방법론, 주요 온톨로지, 실제 응용 프로그램, 한계/대안까지 체계적으로 배울 수 있습니다.

**English**: The Ontology Fundamentals Learning Platform is an educational website for learning ontology fundamentals to advanced concepts through a step-by-step curriculum. It offers an 8-phase course covering motivation, building blocks, logical foundations, standards, design methodology, major ontologies, real-world applications, and limits/alternatives.

### 🎯 주요 기능

- **8단계 체계적 커리큘럼**: 기초부터 고급까지 단계별 학습 경로 제공
- **한국어 주도**: 한국어로 작성된 교육 콘텐츠로 접근성 향상
- **상호작용 다이어그램**: Mermaid 다이어그램을 통한 시각적 학습 지원
- **반응형 디자인**: 모든 기기에서 최적의 사용자 경험 제공
- **검색 기능**: 내장된 검색 시스템으로 원하는 콘텐츠 빠르게 찾기
- **학습 경로 추적**: 각 단계별 학습 진도 확인 가능

### 💻 기술 스택

| 기술 | 버전 | 설명 |
|------|------|------|
| **Next.js** | 15.x | React 기반 프레임워크 |
| **React** | 19.x | UI 라이브러리 |
| **TypeScript** | 5.x | 정적 타입 지원 |
| **Nextra** | 4.x | 정적 사이트 생성기 |
| **Mermaid** | 11.12.2 | 다이어그램 생성 라이브러리 |
| **Tailwind CSS** | 3.x | CSS 프레임워크 |

---

## 🚀 빠른 시작

### 사전 요구사항

- Node.js 18.0 이상
- npm 9.0 이상
- Git

### 설치 및 실행

1. **저장소 복제**
   ```bash
   git clone https://github.com/your-username/ontology-learning-platform.git
   cd ontology-learning-platform
   ```

2. **의존성 설치**
   ```bash
   npm install
   ```

3. **개발 서버 실행**
   ```bash
   npm run dev
   ```

4. **브라우저에서 확인**
   ```
   http://localhost:3000
   ```

### 빌드 및 배포

```bash
# 프로덕션 빌드
npm run build

# 로컬에서 배포 결과 확인
npm run start
```

---

## 📁 프로젝트 구조

```
ontology-class/
├── .moai/                 # MoAI 프로젝트 설정
│   ├── config/           # 설정 파일
│   ├── project/          # 프로젝트 문서
│   └── specs/            # 사양 문서
├── src/                  # 소스 코드
│   ├── app/             # Next.js 15 App Router
│   ├── components/      # 공통 컴포넌트
│   ├── lib/             # 유틸리티 함수
│   └── styles/          # 전역 스타일
├── .nextra/             # Nextra 설정
├── public/              # 정적 자산
├── pages/               # Nextra 페이지 디렉토리
│   ├── index.mdx        # 메인 페이지
│   ├── about.mdx        # 프로젝트 소개
│   ├── phase-1/         # 1단계: 온톨로지 동기 부여
│   ├── phase-2/         # 2단계: 기본 구성 요소
│   ├── phase-3/         # 3단계: 논리적 기초
│   ├── phase-4/         # 4단계: 표준
│   ├── phase-5/         # 5단계: 설계 방법론
│   ├── phase-6/         # 6단계: 주요 온톨로지
│   ├── phase-7/         # 7단계: 실제 응용 프로그램
│   ├── phase-8/         # 8단계: 한계/대안
│   └── reference/       # 참고 자료
├── theme.config.tsx     # Nextra 테마 설정
├── next.config.js       # Next.js 설정
└── package.json         # 프로젝트 메타데이터
```

---

## 📚 컨텐츠 개요

### 8단계 학습 커리큘럼

| 단계 | 제목 | 설명 |
|-----|------|------|
| **1단계** | 온톨로지 동기 부여 | 온톨로지의 필요성과 기본 개념 소개 |
| **2단계** | 기본 구성 요소 | 클래스, 속성, 관계 등 기본 요소 설명 |
| **3단계** | 논리적 기초 | 1차 논리, 설계 원칙, 형식화 방법 |
| **4단계** | 표준 | OWL, RDF, RDFS 등 표준 명세 |
| **5단계** | 설계 방법론 | 온톨로지 설계 원칙과 최적화 방법 |
| **6단계** | 주요 온톨로지 | WordNet, SUMO 등 주요 온톨로지 분석 |
| **7단계** | 실제 응용 프로그램 | 의료, 교육, 기업 등 실제 적용 사례 |
| **8단계** | 한계와 대안 | 현재 한계와 미래 발전 방향 |

### 페이지 구조

- **`/`** - 메인 랜딩 페이지
- **`/about`** - 프로젝트 정보 및 목적
- **`/phase-1`** ~ **`/phase-8`** - 각 단계별 학습 콘텐츠
- **`/reference`** - 참고 자료 및 추가 자원

---

## 🤝 기여 가이드라인

### 개발 환경 설정

1. 저장소 포크 및 로컀 클론
2. 새 기능 브랜치 생성 (`git checkout -b feature/amazing-feature`)
3. 변경 사항 커밋 (`git commit -m 'feat: Add amazing feature'`)
4. 푸시 및 풀 리퀘스트 생성

### 커밋 메시지 규칙

- **feat**: 새 기능 추가
- **fix**: 버그 수정
- **docs**: 문서 변경
- **style**: 코드 서식 변경
- **refactor**: 리팩토링
- **test**: 테스트 관련
- **chore**: 빌드 또는 도구 변경

### 코드 컨벤션

- TypeScript 엄격 모드 사용
- ESLint 및 Prettier 설정 따르기
- 컴포넌트는 PascalCase 사용
- 파일명은 kebab-case 사용

---

## 📄 라이선스

MIT 라이선스 - 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

## 📞 연락처

- 프로젝트 관리자: jw
- 이메일: [jw@example.com](mailto:jw@example.com)
- GitHub: [your-username](https://github.com/your-username)

## 🙏 인정

이 프로젝트는 온톨로지 학습을 위한 한국어 교육 콘텐츠 부족 문제를 해결하기 위해 개발되었습니다. 관련 자료와 참고문헌은 프로젝트 문서 내에서 자세히 확인할 수 있습니다.

---

### 📈 프로젝트 상태

개발 진행도: `🟢 활발 개발 중`
다음 릴리스: `v1.0.0` (2024년 4월)