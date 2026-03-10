---
id: SPEC-ENHANCE-P5
version: "1.0.0"
status: draft
created: "2026-03-10"
updated: "2026-03-10"
author: jw
priority: critical
tags: [enhance, phase-5, content, walkthrough, before-after, design-methodology]
---

# SPEC-ENHANCE-P5: Phase 5 설계 방법론(Design Methodology) 교육 컨텐츠 보강

## 개요

Phase 5(설계 방법론)의 교육 컨텐츠를 보강하여, 현재 개별 기법 서술 중심의 내용을 "처음부터 끝까지 이어지는 완전한 설계 워크스루" 중심으로 전환한다. 이는 연구 문서(research.md) 전체에서 **가장 영향력 있는 단일 작업**으로 평가되었다.

연구 문서에서 Phase 5는 **7/10 점**으로, 전체 Phase 중 **가장 낮은 점수**를 받았다. 핵심 문제는 다음과 같다:
- **Gap 1 (CRITICAL)**: 처음부터 끝까지의 온톨로지 설계 예제 부재. 학습자는 각 조각은 알지만 조립할 수 없음. "문제 정의 -> CQ 작성 -> 클래스 설계 -> 속성/공리 -> SPARQL 검증"까지 이어지는 완전한 워크스루가 없음.
- **Gap 7 (MAJOR)**: METHONTOLOGY 3~8단계 나열만 하고 실습 없음
- **Gap 9 (MAJOR)**: 온톨로지 재사용 시 충돌 감지 방법 미시연

**범위 경계**: 이 SPEC은 기존 컨텐츠에 대한 additive(추가적) 보강만 수행한다. 기존 내용을 삭제하거나 재구조화하지 않는다. 각 보강 섹션은 기존 흐름을 깨뜨리지 않는 자기 완결적 삽입이다.

**품질 벤치마크**: `content/phase-7/05-llm-graph-rag.mdx`의 패턴(7단계 파이프라인, 수도 코드, 역할 분석, 실패 모드 분석)을 참조 수준으로 삼는다.

---

## 환경 (Environment)

### 컨텐츠 플랫폼

- **프레임워크**: Nextra 4.x + Next.js 15 App Router
- **컨텐츠 형식**: MDX 파일, `content/phase-5/` 디렉토리
- **컨텐츠 언어**: 한국어 (설명), 영어 (기술 용어 + 한국어 정의 병기)
- **다이어그램 엔진**: Mermaid 11.12.2 (MermaidDiagram 컴포넌트 사용)
- **대상 독자**: 온톨로지 기초~중급 학습자 (Phase 1~4 학습 완료 전제)

### 컨텐츠 품질 표준

| 요소 | 최소 수량 | 형식 |
|------|----------|------|
| "왜 필요한가?" blockquote | 보강 파일당 1개 이상 | `> **왜 필요한가?** [설명]` |
| "연결 포인트" callout | 보강 파일당 1개 이상 | `> **연결 포인트:** [연결 설명]` |
| Mermaid 다이어그램 | 보강 섹션당 필요시 | MermaidDiagram 컴포넌트 사용 |
| 코드/쿼리 예제 | 구현 경로 섹션에 필수 | ```sparql``` 또는 ```turtle``` 코드 블록 |

### 보강 패턴 (research.md에서 정의)

- **Pattern D (Walkthrough)**: 시작 상태 정의 -> 각 단계별 결정/근거 -> 종료 상태와 원래 질문에 대한 답변 검증
- **Pattern C (Before/After)**: 기술 없는 시나리오(실패) -> 기술 도입 -> 동일 시나리오(성공) -> 무엇이 바뀌었고 왜 작동하는지

---

## 전제 조건 (Assumptions)

### A-001: Phase 5 기존 컨텐츠 안정성

Phase 5의 기존 6개 MDX 파일이 모두 존재하고 정상 렌더링된다. 보강은 기존 섹션 사이에 새 섹션을 삽입하는 방식으로만 수행한다.

### A-002: Mermaid 안전 구문 준수

모든 Mermaid 다이어그램은 edu-skill.md의 안전 구문 가이드를 준수한다:
- 노드 라벨에 아포스트로피(`'`) 사용 금지
- `stateDiagram-v2`에서 `+` 연산자 사용 금지
- 특수 문자가 있는 라벨은 `["큰따옴표 라벨"]` 사용

### A-003: JSX Import 금지

MDX 파일에 `import` 문을 포함하지 않는다. 모든 컴포넌트(MermaidDiagram 등)는 전역적으로 사용 가능하다.

### A-004: Phase 4까지의 개념만 사용

보강 내용에서 사용하는 모든 온톨로지 개념은 Phase 1~4에서 이미 소개된 것이어야 한다. Phase 5 내에서 새로 소개되는 개념은 해당 파일의 기존 본문에서 다룬 범위 내에서만 사용한다.

### A-005: Additive 변경 원칙

기존 내용의 삭제, 재배치, 재작성을 금지한다. 모든 변경은 새로운 섹션 추가 또는 기존 섹션 내 단락 추가 형태로만 수행한다.

---

## 요구사항 (Requirements)

### REQ-P5-001: 완전한 온톨로지 설계 워크스루 [CRITICAL]

**WHEN** 학습자가 `02-competency-questions.mdx`의 "CQ를 SPARQL로 변환하기" 섹션까지 학습을 마쳤을 때,
**THEN** 시스템은 하나의 도메인에서 "문제 정의 -> CQ 작성 -> 클래스 식별 -> 속성/공리 정의 -> SPARQL 검증"까지 이어지는 완전한 워크스루를 제공해야 한다.

**상세 요구사항**:

1. **도메인 설정**: 대학 도서관 도서 대출 시스템
   - 기존 02-competency-questions.mdx에서 이미 도서관 도메인 예시를 사용하므로, 학습자에게 친숙한 도메인을 그대로 확장
   - 시작 상태 명시: "도서관에서 도서 대출/반납을 관리하고, 주제별 검색과 인기 도서 파악을 지원하는 온톨로지를 설계한다"

2. **단계 1 — CQ 작성** (최소 5개 Competency Question):
   - CQ1: 특정 저자가 쓴 모든 책을 찾을 수 있는가?
   - CQ2: 현재 대출 가능한 책 목록은?
   - CQ3: 특정 주제에 관한 책 중 현재 대출 가능한 것은?
   - CQ4: 특정 학생이 지난 1년 동안 대출한 책은?
   - CQ5: 5회 이상 대출된 인기 도서 목록은?
   - 각 CQ에서 "왜 이 질문이 필요한지" 짧은 근거 포함

3. **단계 2 — CQ에서 클래스 추출**:
   - 5개 CQ에서 명사를 체계적으로 추출하여 클래스 후보 도출
   - 클래스 후보: Book, Person(Author), Student, Topic, LoanRecord, LoanStatus
   - 중복 제거와 정규화 과정 시연 (예: "저자"와 "학생"을 Person의 하위 클래스로 할지, 별도 클래스로 할지 결정 과정)

4. **단계 3 — 속성/공리 정의**:
   - 클래스 간 관계를 Turtle 형식으로 표현 (5~8개 속성)
   - 도메인(Domain)과 범위(Range) 명시
   - 최소 1개의 OWL 제약(Restriction) 예시: 예를 들어, 모든 Book은 최소 1명의 Author를 가져야 한다 (`owl:minCardinality 1`)
   - Phase 2에서 배운 공리 개념과의 연결 포인트 포함

5. **단계 4 — SPARQL로 CQ 검증**:
   - 5개 CQ 각각에 대응하는 SPARQL 쿼리 작성
   - 각 쿼리가 "어떤 트리플 패턴을 매칭하는지" 설명
   - 쿼리 결과가 CQ에 대한 답변이 되는지 검증
   - 1개 이상의 쿼리에서 "이 쿼리가 빈 결과를 반환하면, 온톨로지에 무엇이 빠진 것인지" 디버깅 가이드 포함

6. **종료 상태 검증**: 5개 CQ 모두 SPARQL로 답변 가능함을 확인하고, 원래 목적("도서 대출 관리, 주제별 검색, 인기 도서 파악")이 달성되었는지 되돌아봄

**삽입 위치**: `02-competency-questions.mdx`의 "CQ를 SPARQL로 변환하기" 섹션 뒤, "연결 포인트" 섹션 전

### REQ-P5-002: Middle-out 전략 실전 시나리오 [MAJOR]

**WHEN** 학습자가 `03-design-strategies.mdx`의 "전략 3: 중간 접근(Middle-out)" 섹션까지 학습을 마쳤을 때,
**THEN** 시스템은 세 가지 전략(Top-down, Bottom-up, Middle-out)의 실제 적용 결과를 동일 도메인으로 비교하는 시나리오를 제공해야 한다.

**상세 요구사항**:

1. **시나리오 도메인**: "온라인 서점" 온톨로지 설계 (도서관과 유사하지만 상거래 요소 추가)

2. **Top-down만 시도했을 때 실패 시나리오**:
   - "Thing -> CommercialEntity -> Product -> Book" 식으로 시작
   - 지나치게 추상적인 최상위 개념에 시간 소비
   - "CommercialEntity가 올바른 상위 개념인가?" 논쟁에 빠짐
   - 결과: 상위 3계층은 있으나 실제 CQ에 필요한 속성(가격, 재고, 구매 이력)이 빠짐

3. **Bottom-up만 시도했을 때 실패 시나리오**:
   - 구체적 데이터부터 시작: "소설", "교재", "만화", "전자책"
   - 개별 클래스는 풍부하지만, "소설"과 "전자책 소설"의 관계가 불명확
   - 파편화된 구조: 비슷한 속성을 가진 클래스들이 연결되지 않음
   - 결과: 통합 검색이 불가능한 사일로 구조

4. **Middle-out으로 성공하는 과정**:
   - CQ에서 핵심 개념 식별: Book, Customer, Order, Category
   - 이 핵심 개념들 간의 관계 먼저 정의
   - 필요에 따라 상위(Product -> Book)와 하위(Book -> eBook, PrintBook)로 확장
   - 결과: CQ를 모두 충족하는 균형 잡힌 구조

5. **비교표**: 세 접근법의 결과를 "CQ 충족률", "설계 시간", "확장 용이성" 기준으로 비교

**삽입 위치**: `03-design-strategies.mdx`의 "전략 3: 중간 접근(Middle-out)" 섹션의 "장점"/"단점" 뒤, "7가지 설계 원칙" 섹션 전

### REQ-P5-003: 온톨로지 안티패턴 Before/After [MAJOR]

**WHEN** 학습자가 `05-anti-patterns.mdx`의 각 안티패턴 섹션을 읽을 때,
**THEN** 시스템은 각 안티패턴에 대해 Turtle 형식의 Before(잘못된 설계)/After(올바른 설계) 코드 예시와 "왜 After가 더 나은가" 설명을 제공해야 한다.

**상세 요구사항**:

1. **안티패턴 1: 과도한 클래스화(Overclassification) Before/After**:
   - Before: `RedCar`, `BlueCar`, `ElectricRedCar` 등을 Turtle 클래스로 정의
   - After: `Car` 클래스 + `hasColor`, `hasFuelType` 속성으로 Turtle 재설계
   - 비교: 트리플 수, SPARQL 쿼리 복잡도, 새로운 색상 추가 시 변경량

2. **안티패턴 3: 프로세스의 개체화(Reification Abuse) Before/After**:
   - Before: `Book hasLoanStatus "대출 중"` 단순 속성으로 Turtle 표현
   - After: `LoanEvent` 클래스 도입, N-항 관계 패턴으로 Turtle 재설계
   - 비교: "누가, 언제 대출했는가?" 질문에 답할 수 있는지 여부

3. **안티패턴 4: 거짓 역방향(False Inverses) Before/After**:
   - Before: `hasAuthor`와 `isAuthorOf`를 둘 다 명시적으로 정의한 Turtle
   - After: `hasAuthor`만 정의하고 `owl:inverseOf`로 역방향 처리하는 Turtle
   - 비교: 데이터 일관성 유지 부담, SPARQL 쿼리 시 혼란 감소

4. 각 Before/After 블록에는 `> 이것은 개념 이해를 위한 간소화된 예시입니다` 주석 포함

**삽입 위치**: `05-anti-patterns.mdx`의 각 해당 안티패턴 섹션 내:
- 안티패턴 1의 "수정 전략" 뒤
- 안티패턴 3의 "다른 예시: 고용 관계" 뒤
- 안티패턴 4의 "수정 전략" 뒤

### REQ-P5-004: 온톨로지 재사용 충돌 감지 워크스루 [MAJOR]

**WHEN** 학습자가 `04-ontology-reuse.mdx`의 `owl:imports` 섹션을 학습한 뒤,
**THEN** 시스템은 두 온톨로지를 import했을 때 발생하는 공리 충돌과 이를 감지하는 과정을 워크스루로 제공해야 한다.

**상세 요구사항**:

1. **시나리오 설정**: 도서관 온톨로지가 FOAF와 Dublin Core를 동시에 import
   - FOAF의 `foaf:Person`과 Dublin Core의 `dc:creator`가 동일 개체를 다르게 표현하는 상황

2. **충돌 유형 설명**:
   - 이름 충돌: 같은 URI가 다른 의미로 사용되는 경우
   - 공리 충돌: 두 온톨로지의 제약이 서로 모순되는 경우
   - 범위 불일치: `rdfs:range`가 달라서 통합 시 추론 오류 발생

3. **감지 방법**:
   - Protege에서 HermiT 추론기를 실행했을 때 불일치(Inconsistency)가 어떤 형태로 나타나는지 텍스트로 설명
   - 추론기가 보고하는 "unsatisfiable class"의 의미와 해석 방법
   - Phase 3에서 배운 추론(Reasoning) 개념과의 연결 포인트

4. **해결 전략**: 충돌 발생 시 일반적인 해결 접근법 2~3가지 간략히 소개

**삽입 위치**: `04-ontology-reuse.mdx`의 `owl:imports` 관련 섹션 뒤, "상위 온톨로지" 섹션 전

---

## 제약사항 (Constraints)

### C-001: Additive 변경만 허용

기존 내용을 삭제하거나 재구조화하지 않는다. 모든 변경은 새 섹션 삽입 또는 기존 섹션 내 단락 추가로만 수행한다.

### C-002: 파일당 추가 분량 제한

각 파일의 보강 분량은 **60~120줄**을 목표로 한다. 이를 초과하면 인지 부하가 증가하여 교육 효과가 감소한다.

### C-003: 개념 범위 제한

보강 내용에서 Phase 6 이후의 개념이나 Phase 5 본문에서 다루지 않은 고급 개념을 도입하지 않는다.

### C-004: Mermaid 다이어그램 안전 구문

모든 Mermaid 다이어그램은 edu-skill.md의 안전 구문 가이드를 엄격히 준수한다.

### C-005: 한국어 문체 일관성

`content/phase-1/01-motivation.mdx`와 `content/phase-7/05-llm-graph-rag.mdx`의 톤을 벤치마크로 사용한다. 존댓말 + 친근한 멘토 톤을 유지한다.

### C-006: 코드 예제의 교육적 적합성

SPARQL 쿼리와 Turtle 스키마 예제는 실제 실행 가능한 수준의 정확성보다 **개념 전달의 명확성**을 우선한다. 간소화된 예제에는 "이것은 개념 이해를 위한 간소화된 예시입니다" 주석을 포함한다.

---

## 기술 명세 (Specifications)

### 파일 영향 분석

| 파일 | 보강 내용 | 패턴 | 예상 추가 줄 수 |
|------|----------|------|----------------|
| `content/phase-5/02-competency-questions.mdx` | REQ-P5-001 (완전한 설계 워크스루) | Pattern D (Walkthrough) | 100~120줄 |
| `content/phase-5/03-design-strategies.mdx` | REQ-P5-002 (Middle-out 실전 시나리오) | Pattern D (Walkthrough) | 70~90줄 |
| `content/phase-5/05-anti-patterns.mdx` | REQ-P5-003 (안티패턴 Before/After) | Pattern C (Before/After) | 80~100줄 |
| `content/phase-5/04-ontology-reuse.mdx` | REQ-P5-004 (재사용 충돌 감지) | Pattern D (Walkthrough) | 60~80줄 |

**총 예상 추가 분량**: 310~390줄 (4개 파일)

### 구현 접근법

#### 1. 02-competency-questions.mdx 보강 전략

**REQ-P5-001 (완전한 설계 워크스루)**:
- 기존 "CQ를 SPARQL로 변환하기" 섹션 뒤에 삽입
- 이것이 이 SPEC 전체에서, 그리고 전체 보강 시리즈에서 **가장 핵심적인 단일 산출물**이다
- 구조:
  ```
  ## 종합 워크스루: 도서관 온톨로지를 처음부터 끝까지 설계하기

  > **왜 필요한가?** 지금까지 CQ 작성법, 클래스 도출법, SPARQL 변환법을 각각 배웠습니다.
  > 하지만 실제 설계에서는 이 모든 단계가 하나의 흐름으로 이어져야 합니다.

  ### 시작: 문제 정의
  [도서관 대출 시스템 요구사항]

  ### 단계 1: CQ 작성
  [5개 CQ + 각 CQ의 필요 근거]

  ### 단계 2: CQ에서 클래스 추출
  [명사 추출 -> 후보 -> 정규화 -> 최종 클래스 목록]

  ### 단계 3: 속성과 공리 정의
  [Turtle 형식 스키마]

  ### 단계 4: SPARQL로 검증
  [5개 SPARQL 쿼리 + 디버깅 가이드]

  ### 종료 검증: 원래 목적 달성 확인
  [CQ 충족 여부 점검표]

  > **연결 포인트:** 이 워크스루에서 사용한 Middle-out 접근은
  > 다음 세션(03-설계 전략)에서 더 자세히 배웁니다.
  ```

#### 2. 03-design-strategies.mdx 보강 전략

**REQ-P5-002 (Middle-out 실전 시나리오)**:
- "중간 접근(Middle-out)" 섹션의 "단점" 뒤에 삽입
- 구조:
  ```
  ### 실전 비교: 같은 도메인에 세 가지 전략 적용하기

  **[Top-down 시도]**
  - 추상적 계층 구성 과정
  - 발생하는 문제점

  **[Bottom-up 시도]**
  - 구체적 데이터부터 출발
  - 발생하는 파편화 문제

  **[Middle-out 성공]**
  - CQ 기반 핵심 개념 출발
  - 균형 잡힌 확장 과정

  **비교 결과표**
  | 기준 | Top-down | Bottom-up | Middle-out |
  ```

#### 3. 05-anti-patterns.mdx 보강 전략

**REQ-P5-003 (안티패턴 Before/After)**:
- 각 안티패턴의 "수정 전략" 뒤에 삽입
- 3개 안티패턴 각각에 대해:
  ```
  #### Turtle로 보는 Before/After

  **Before** (잘못된 설계):
  [Turtle 코드 블록]

  **After** (올바른 설계):
  [Turtle 코드 블록]

  **왜 After가 더 나은가?**
  [구체적 비교 포인트 3가지]
  ```

#### 4. 04-ontology-reuse.mdx 보강 전략

**REQ-P5-004 (재사용 충돌 감지)**:
- owl:imports 관련 섹션 뒤에 삽입
- 구조:
  ```
  ### 재사용 시 발생하는 충돌과 감지

  **시나리오: FOAF + Dublin Core 동시 import**
  [충돌 상황 설명]

  **충돌 유형 3가지**
  [각 유형 설명 + 예시]

  **추론기로 충돌 감지하기**
  [HermiT 실행 결과 해석]

  **해결 전략**
  [2~3가지 접근법]

  > **연결 포인트:** Phase 3에서 배운 추론기의 역할이
  > 여기서 품질 보증 도구로 활용됩니다.
  ```

### 구현 순서

| 순서 | 요구사항 | 파일 | 의존성 |
|------|---------|------|--------|
| 1 | REQ-P5-001 | 02-competency-questions.mdx | 없음 (독립적, 가장 높은 영향도 — CRITICAL) |
| 2 | REQ-P5-003 | 05-anti-patterns.mdx | 없음 (독립적, 각 안티패턴 섹션 내 삽입) |
| 3 | REQ-P5-002 | 03-design-strategies.mdx | 없음 (독립적) |
| 4 | REQ-P5-004 | 04-ontology-reuse.mdx | 없음 (독립적, 가장 짧은 보강) |

**이유**: REQ-P5-001이 전체 보강 시리즈에서 가장 핵심적인 산출물이므로 최우선 구현한다. 나머지 3개는 모두 독립적이며 어떤 순서로든 구현 가능하다.

---

## 추적성 (Traceability)

| 요구사항 | Gap (research.md) | 보강 패턴 | 대상 파일 |
|---------|-------------------|----------|----------|
| REQ-P5-001 | Gap 1 (CRITICAL) | Pattern D (Walkthrough) | 02-competency-questions.mdx |
| REQ-P5-002 | Gap 7 (MAJOR) | Pattern D (Walkthrough) | 03-design-strategies.mdx |
| REQ-P5-003 | Anti-Pattern 4 (흔한 오해 패턴 약함) | Pattern C (Before/After) | 05-anti-patterns.mdx |
| REQ-P5-004 | Gap 9 (MAJOR) | Pattern D (Walkthrough) | 04-ontology-reuse.mdx |
