---
id: SPEC-ENHANCE-P7
version: "1.0.0"
status: draft
created: "2026-03-10"
updated: "2026-03-10"
author: jw
priority: high
tags: [enhance, phase-7, content, before-after, walkthrough, mechanism]
---

# SPEC-ENHANCE-P7: Phase 7 응용(Applications) 교육 컨텐츠 보강

## 개요

Phase 7(응용/Applications)의 교육 컨텐츠를 보강하여, 현재 "결과 서술(WHAT)" 중심의 내용을 "구현 경로(HOW)"와 "선택 근거(WHY THIS)" 중심으로 전환한다. 산업 사례에 Before/After 시나리오, SPARQL 쿼리 예제, 메커니즘 딥다이브를 추가하여 학습자가 유사 시스템을 독립적으로 설계할 수 있는 수준으로 끌어올린다.

연구 문서(research.md)에서 Phase 7은 **7/10 점**으로 평가되었으며, 핵심 문제는 다음과 같다:
- **Gap 3 (CRITICAL)**: 산업 사례(현대/삼성/POSCO)가 결과만 서술하고 온톨로지 스키마, SPARQL 쿼리, 구현 단계가 없음
- **Gap 6 (MAJOR)**: Graph RAG 구현 전제 지식(엔티티 링킹, 서브그래프 점수 매기기)이 미제공
- **Anti-Pattern 1**: "결과 선언, 메커니즘 부재" 가 Phase 7 산업 사례에 집중 발생

**범위 경계**: 이 SPEC은 기존 컨텐츠에 대한 additive(추가적) 보강만 수행한다. 기존 내용을 삭제하거나 재구조화하지 않는다. 각 보강 섹션은 기존 흐름을 깨뜨리지 않는 자기 완결적 삽입이다.

**품질 벤치마크**: `content/phase-7/05-llm-graph-rag.mdx`의 패턴(7단계 파이프라인, 수도 코드, 역할 분석, 실패 모드 분석)을 참조 수준으로 삼는다.

---

## 환경 (Environment)

### 컨텐츠 플랫폼

- **프레임워크**: Nextra 4.x + Next.js 15 App Router
- **컨텐츠 형식**: MDX 파일, `content/phase-7/` 디렉토리
- **컨텐츠 언어**: 한국어 (설명), 영어 (기술 용어 + 한국어 정의 병기)
- **다이어그램 엔진**: Mermaid 11.12.2 (MermaidDiagram 컴포넌트 사용)
- **대상 독자**: 온톨로지 기초~중급 학습자 (Phase 1~6 학습 완료 전제)

### 컨텐츠 품질 표준

| 요소 | 최소 수량 | 형식 |
|------|----------|------|
| "왜 필요한가?" blockquote | 보강 파일당 1개 이상 | `> **왜 필요한가?** [설명]` |
| "연결 포인트" callout | 보강 파일당 1개 이상 | `> **연결 포인트:** [연결 설명]` |
| Mermaid 다이어그램 | 보강 섹션당 필요시 | MermaidDiagram 컴포넌트 사용 |
| 코드/쿼리 예제 | 구현 경로 섹션에 필수 | ```sparql``` 또는 ```turtle``` 코드 블록 |

### 보강 패턴 (research.md에서 정의)

- **Pattern C (Before/After)**: 기술 없는 시나리오(실패) → 기술 도입 → 동일 시나리오(성공)
- **Pattern D (Walkthrough)**: 시작 → 각 단계별 결정/근거 → 종료 + 검증
- **Pattern A (Mechanism Deep-Dive)**: 문제 진술 → 각 내부 단계 "왜 필요한가?" → 빼면 무엇이 깨지는지

---

## 전제 조건 (Assumptions)

### A-001: Phase 7 기존 컨텐츠 안정성

Phase 7의 기존 6개 MDX 파일이 모두 존재하고 정상 렌더링된다. 보강은 기존 섹션 사이에 새 섹션을 삽입하는 방식으로만 수행한다.

### A-002: Mermaid 안전 구문 준수

모든 Mermaid 다이어그램은 edu-skill.md의 안전 구문 가이드를 준수한다:
- 노드 라벨에 아포스트로피(`'`) 사용 금지
- `stateDiagram-v2`에서 `+` 연산자 사용 금지
- 특수 문자가 있는 라벨은 `["큰따옴표 라벨"]` 사용

### A-003: JSX Import 금지

MDX 파일에 `import` 문을 포함하지 않는다. 모든 컴포넌트(MermaidDiagram 등)는 전역적으로 사용 가능하다.

### A-004: Phase 6까지의 개념만 사용

보강 내용에서 사용하는 모든 온톨로지 개념은 Phase 1~6에서 이미 소개된 것이어야 한다. Phase 7 내에서 새로 소개되는 개념은 해당 파일의 기존 본문에서 다룬 범위 내에서만 사용한다.

### A-005: Additive 변경 원칙

기존 내용의 삭제, 재배치, 재작성을 금지한다. 모든 변경은 새로운 섹션 추가 또는 기존 섹션 내 단락 추가 형태로만 수행한다.

---

## 요구사항 (Requirements)

### REQ-001: 현대자동차 용접 결함 Before/After 시나리오 [CRITICAL]

**WHEN** 학습자가 `06-industry-applications.mdx`의 현대자동차 섹션을 읽을 때,
**THEN** 시스템은 용접 결함 추적의 Before(온톨로지 없음)/After(온톨로지 있음) 구체적 시나리오를 제공해야 한다.

**상세 요구사항**:

1. **Before 시나리오** (온톨로지 없는 상황):
   - 도장 공정에서 표면 결함이 발견된 구체적 상황 서술
   - 수동 조사 과정: 담당자가 MES 로그, 로봇 파라미터 DB, 도료 관리 시스템을 개별 조회
   - 시스템 간 용어 불일치 문제 시연 (예: "WELD_QUALITY_01" vs "용접품질등급A" vs "WQ-Grade-1")
   - 추적에 소요되는 시간과 인적 비용 명시

2. **After 시나리오** (온톨로지 도입 후):
   - 동일한 결함 상황에서 온톨로지 기반 SPARQL 쿼리로 원인 추적
   - 간소화된 온톨로지 스키마 예시 (Turtle 형식, 5~8개 클래스)
   - 실제 SPARQL 쿼리 예제 (결함 → 용접 로봇 → 파라미터 → 환경 조건 추적)
   - 추적 시간 단축 효과 명시

3. **무엇이 바뀌었고 왜 작동하는지** 명시적 설명

**삽입 위치**: `06-industry-applications.mdx`의 "현대자동차: 생산 공정 지식 그래프" 섹션 내, "실제 활용 시나리오:" 단락 뒤

### REQ-002: 구글 지식 그래프 엔티티 해소 메커니즘 [MAJOR]

**WHEN** 학습자가 `02-knowledge-graphs.mdx`의 구글 지식 그래프 섹션을 읽을 때,
**THEN** 시스템은 "Paris"와 같은 모호한 검색어에 대한 엔티티 해소(Entity Disambiguation) 메커니즘을 단계별로 설명해야 한다.

**상세 요구사항**:

1. **문제 진술**: "Paris"를 검색하면 프랑스 수도, 파리스 힐튼, 트로이의 파리스 등 여러 엔티티가 존재
2. **해소 메커니즘 단계별 워크스루** (Pattern A: Mechanism Deep-Dive):
   - 단계 1: 후보 엔티티 식별 (온톨로지의 클래스 타입으로 분류)
   - 단계 2: 문맥 신호 수집 (검색 이력, 지역, 공동 검색어)
   - 단계 3: 그래프 구조 활용 (각 엔티티의 연결 밀도, 인기도 점수)
   - 단계 4: 최종 엔티티 선택 및 지식 패널 생성
3. **각 단계에서 온톨로지가 없으면 무엇이 깨지는지** 설명
4. Mermaid 다이어그램: 엔티티 해소 과정의 흐름도

**삽입 위치**: `02-knowledge-graphs.mdx`의 "지식 패널(Knowledge Panel)" 섹션 뒤, "구글 지식 그래프의 데이터 소스" 섹션 전

### REQ-003: 온톨로지 없는 검색 실패 시나리오 [MAJOR]

**WHEN** 학습자가 `03-search-recommendation.mdx`의 키워드 검색 한계 섹션을 읽을 때,
**THEN** 시스템은 구체적인 검색 실패 시나리오를 Before/After 패턴으로 제공해야 한다.

**상세 요구사항**:

1. **Before 시나리오** (키워드 검색만 사용):
   - 의료 문헌 검색에서 "당뇨" 검색 시 놓치는 문서 유형 구체 열거
   - 실제 검색 결과 수 비교 (키워드 vs 온톨로지 기반)
   - 놓친 문서가 임상 판단에 미치는 영향

2. **After 시나리오** (온톨로지 기반 쿼리 확장):
   - MeSH 온톨로지의 "당뇨" 관련 계층 구조 일부를 Turtle 형식으로 시연
   - 쿼리 확장 과정을 단계별로 보여줌 (원래 쿼리 → 동의어 추가 → 하위 개념 추가 → 관련 개념 추가)
   - 확장된 쿼리가 추가로 찾아낸 문서 유형 명시

3. **정량적 비교**: 키워드 검색 vs 온톨로지 확장 검색의 재현율(Recall) 차이를 개념적으로 설명

**삽입 위치**: `03-search-recommendation.mdx`의 "키워드 기반 검색의 한계" 섹션 내, 기존 한계 설명 뒤

### REQ-004: POSCO 철강 공정 온톨로지 스키마 보강 [HIGH]

**WHEN** 학습자가 `06-industry-applications.mdx`의 POSCO 섹션을 읽을 때,
**THEN** 시스템은 철강 공정 이상 감지에 사용되는 온톨로지 스키마의 구체적 예시를 제공해야 한다.

**상세 요구사항**:

1. 철강 공정 온톨로지의 핵심 클래스와 속성을 Turtle 형식으로 예시 (5~7개 클래스)
2. "정상 범위"를 OWL 데이터 제약(Data Restriction)으로 표현하는 예시
3. 센서값이 정상 범위를 벗어날 때 추론기가 이상을 탐지하는 과정을 간략히 설명
4. Phase 3에서 배운 추론(Reasoning) 개념과의 명시적 연결

**삽입 위치**: `06-industry-applications.mdx`의 POSCO "철강 공정 온톨로지" 섹션 내, "주요 개념:" 목록 뒤

### REQ-005: 삼성전자 반도체 품질 예측 워크스루 보강 [HIGH]

**WHEN** 학습자가 `06-industry-applications.mdx`의 삼성전자 섹션을 읽을 때,
**THEN** 시스템은 예측 품질 관리에서 온톨로지가 구체적으로 어떤 역할을 하는지 워크스루로 제공해야 한다.

**상세 요구사항**:

1. 간소화된 반도체 공정 온톨로지 스키마 (노광 → 식각 → 증착 공정 3단계)
2. 공정 파라미터 → 결함 패턴 → 수율 영향의 인과관계를 트리플로 표현
3. "이전 공정 결과가 다음 공정 품질에 영향을 미친다"는 관계를 온톨로지로 어떻게 표현하는지 시연
4. Phase 2에서 배운 객체 속성(Object Property)과의 연결 포인트

**삽입 위치**: `06-industry-applications.mdx`의 삼성전자 "예측 품질 관리" 섹션 내, "온톨로지 역할:" 목록 뒤

### REQ-006: Graph RAG 전제 지식 보충 [HIGH]

**WHEN** 학습자가 `02-knowledge-graphs.mdx`의 지식 그래프 구축 방법 섹션을 읽을 때,
**THEN** 시스템은 엔티티 링킹(Entity Linking)의 기본 개념을 간략히 보충해야 한다.

**상세 요구사항**:

1. 엔티티 링킹의 정의: 텍스트의 멘션(mention)을 지식 그래프의 특정 엔티티에 연결하는 과정
2. 엔티티 링킹이 왜 어려운지 (동명이인, 약칭, 별명 문제) 간단한 예시
3. 온톨로지가 엔티티 링킹에서 하는 역할: 후보 엔티티의 타입 정보로 모호성 해소
4. Phase 7의 05-llm-graph-rag.mdx에서 다루는 Graph RAG 파이프라인 단계 1~2와의 연결

**삽입 위치**: `02-knowledge-graphs.mdx`의 "방법 2: 정보 추출(Information Extraction)" 섹션 내, "핵심 기술:" 목록 뒤

---

## 제약사항 (Constraints)

### C-001: Additive 변경만 허용

기존 내용을 삭제하거나 재구조화하지 않는다. 모든 변경은 새 섹션 삽입 또는 기존 섹션 내 단락 추가로만 수행한다.

### C-002: 파일당 추가 분량 제한

각 파일의 보강 분량은 **60~120줄**을 목표로 한다. 이를 초과하면 인지 부하가 증가하여 교육 효과가 감소한다.

### C-003: 개념 범위 제한

보강 내용에서 Phase 8 이후의 개념이나 Phase 7 본문에서 다루지 않은 고급 개념을 도입하지 않는다.

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
| `content/phase-7/06-industry-applications.mdx` | REQ-001 (현대 Before/After), REQ-004 (POSCO 스키마), REQ-005 (삼성 워크스루) | Pattern C + D | 90~120줄 |
| `content/phase-7/02-knowledge-graphs.mdx` | REQ-002 (Google KG 엔티티 해소), REQ-006 (엔티티 링킹 보충) | Pattern A + 보충 | 70~100줄 |
| `content/phase-7/03-search-recommendation.mdx` | REQ-003 (검색 실패 Before/After) | Pattern C | 50~70줄 |

**총 예상 추가 분량**: 210~290줄 (3개 파일)

### 구현 접근법

#### 1. 06-industry-applications.mdx 보강 전략

**REQ-001 (현대자동차 Before/After)**:
- 기존 "실제 활용 시나리오:" 단락 다음에 삽입
- 구조:
  ```
  ### 구체적 시나리오: 도장 결함의 원인 추적

  **[온톨로지 없는 상황]**
  - 수동 조사 과정 서술 (3~4단계)
  - 시스템 간 용어 불일치 예시 표
  - 소요 시간/비용 명시

  **[온톨로지 도입 후]**
  - 간소화된 제조 온톨로지 스키마 (Turtle)
  - SPARQL 쿼리 예제
  - 결과 설명
  - 시간 단축 효과

  **무엇이 바뀌었는가?**
  - 핵심 차이 3가지 요약
  ```

**REQ-004 (POSCO 스키마)**:
- 기존 "주요 개념:" 목록 뒤에 삽입
- Turtle 형식 온톨로지 스키마 + OWL 데이터 제약 예시
- Phase 3 추론 개념과의 "연결 포인트" callout 포함

**REQ-005 (삼성 워크스루)**:
- 기존 "온톨로지 역할:" 목록 뒤에 삽입
- 3단계 공정의 인과관계 트리플 예시
- Phase 2 객체 속성과의 "연결 포인트" callout 포함

#### 2. 02-knowledge-graphs.mdx 보강 전략

**REQ-002 (엔티티 해소 메커니즘)**:
- "지식 패널" 섹션 뒤에 새 하위 섹션 삽입
- Mermaid flowchart로 4단계 해소 과정 시각화
- 각 단계에서 "이 단계가 없으면?" 부정 시나리오 포함

**REQ-006 (엔티티 링킹 보충)**:
- "정보 추출" 섹션의 "핵심 기술:" 목록 뒤에 삽입
- 짧은 보충 단락 (15~20줄)
- 05-llm-graph-rag.mdx 파이프라인 단계 1~2와의 전방 연결

#### 3. 03-search-recommendation.mdx 보강 전략

**REQ-003 (검색 실패 Before/After)**:
- "키워드 기반 검색의 한계" 섹션의 기존 한계 설명 뒤에 삽입
- MeSH 온톨로지 계층 일부를 Turtle로 시연
- 쿼리 확장 단계별 과정 시각화 (텍스트 또는 Mermaid)

### 구현 순서

| 순서 | 요구사항 | 파일 | 의존성 |
|------|---------|------|--------|
| 1 | REQ-001 | 06-industry-applications.mdx | 없음 (독립적, 가장 높은 가시성) |
| 2 | REQ-004 | 06-industry-applications.mdx | REQ-001과 동일 파일 (순차 작업) |
| 3 | REQ-005 | 06-industry-applications.mdx | REQ-001, REQ-004와 동일 파일 |
| 4 | REQ-002 | 02-knowledge-graphs.mdx | 없음 (독립적) |
| 5 | REQ-006 | 02-knowledge-graphs.mdx | REQ-002와 동일 파일 |
| 6 | REQ-003 | 03-search-recommendation.mdx | 없음 (독립적) |

**이유**: `06-industry-applications.mdx`에 3개 요구사항이 집중되므로 먼저 완료하여 파일 잠금을 해제하고, 이후 나머지 2개 파일을 병렬 또는 순차적으로 보강한다.

---

## 추적성 (Traceability)

| 요구사항 | Gap (research.md) | 보강 패턴 | 대상 파일 |
|---------|-------------------|----------|----------|
| REQ-001 | Gap 3 (CRITICAL) | Pattern C (Before/After) | 06-industry-applications.mdx |
| REQ-002 | Anti-Pattern 1 | Pattern A (Mechanism Deep-Dive) | 02-knowledge-graphs.mdx |
| REQ-003 | Anti-Pattern 1 | Pattern C (Before/After) | 03-search-recommendation.mdx |
| REQ-004 | Gap 3 (CRITICAL) | Pattern D (Walkthrough) | 06-industry-applications.mdx |
| REQ-005 | Gap 3 (CRITICAL) | Pattern D (Walkthrough) | 06-industry-applications.mdx |
| REQ-006 | Gap 6 (MAJOR) | 보충 설명 | 02-knowledge-graphs.mdx |
