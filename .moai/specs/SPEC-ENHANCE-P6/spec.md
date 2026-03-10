---
id: SPEC-ENHANCE-P6
version: "1.0.0"
status: draft
created: "2026-03-10"
updated: "2026-03-10"
author: jw
priority: high
tags: [enhance, phase-6, content, decision-narrative, mechanism-deep-dive]
---

# SPEC-ENHANCE-P6: Phase 6 표준 온톨로지(Standard Ontologies) 교육 컨텐츠 보강

## 개요

Phase 6(표준 온톨로지)의 교육 컨텐츠를 보강하여, 현재 "사실 나열(WHAT)" 중심의 내용을 "설계 판단의 근거(WHY THIS)" 중심으로 전환한다. 각 표준 온톨로지가 왜 특정 설계 선택을 했는지에 대한 Decision Narrative와 Mechanism Deep-Dive를 추가하여, 학습자가 온톨로지 설계 결정을 독립적으로 분석하고 평가할 수 있는 수준으로 끌어올린다.

연구 문서(research.md)에서 Phase 6은 **7.5/10 점**으로 평가되었으며, 핵심 문제는 다음과 같다:
- **Gap 10 (MAJOR)**: 각 표준 온톨로지의 "왜 이렇게 설계했나?" 미분석 -- FOAF, Schema.org, GO, SNOMED CT의 사실 나열은 충분하나 설계 판단의 이유가 없음
- **Anti-Pattern 1**: "결과 선언, 메커니즘 부재" -- Phase 6 표준 온톨로지 분석에서 집중 발생

**범위 경계**: 이 SPEC은 기존 컨텐츠에 대한 additive(추가적) 보강만 수행한다. 기존 내용을 삭제하거나 재구조화하지 않는다. 각 보강 섹션은 기존 흐름을 깨뜨리지 않는 자기 완결적 삽입이다.

**품질 벤치마크**: `content/phase-7/05-llm-graph-rag.mdx`의 패턴(7단계 파이프라인, 수도 코드, 역할 분석, 실패 모드 분석)과 `content/phase-8/05-decision-tree.mdx`의 패턴(의사결정 노드별 정/부 예시)을 참조 수준으로 삼는다.

---

## 환경 (Environment)

### 컨텐츠 플랫폼

- **프레임워크**: Nextra 4.x + Next.js 15 App Router
- **컨텐츠 형식**: MDX 파일, `content/phase-6/` 디렉토리
- **컨텐츠 언어**: 한국어 (설명), 영어 (기술 용어 + 한국어 정의 병기)
- **다이어그램 엔진**: Mermaid 11.12.2 (MermaidDiagram 컴포넌트 사용)
- **대상 독자**: 온톨로지 기초~중급 학습자 (Phase 1~5 학습 완료 전제)

### 컨텐츠 품질 표준

| 요소 | 최소 수량 | 형식 |
|------|----------|------|
| "왜 필요한가?" blockquote | 보강 파일당 1개 이상 | `> **왜 필요한가?** [설명]` |
| "연결 포인트" callout | 보강 파일당 1개 이상 | `> **연결 포인트:** [연결 설명]` |
| Mermaid 다이어그램 | 보강 섹션당 필요시 | MermaidDiagram 컴포넌트 사용 |
| 코드/쿼리 예제 | 설계 비교 섹션에 필요시 | ```turtle``` 또는 ```sparql``` 코드 블록 |

### 보강 패턴 (research.md에서 정의)

- **Pattern B (Decision Narrative)**: 가용한 대안 진술 → 각 대안이 실제로 어떻게 보이는지 → 거부된 대안의 구체적 실패 모드 → 선택된 접근이 왜 그 실패를 회피하는지
- **Pattern A (Mechanism Deep-Dive)**: 문제 진술 → 각 내부 단계 "왜 필요한가?" → 빼면 무엇이 깨지는지

---

## 전제 조건 (Assumptions)

### A-001: Phase 6 기존 컨텐츠 안정성

Phase 6의 기존 MDX 파일이 모두 존재하고 정상 렌더링된다. 보강은 기존 섹션 사이에 새 섹션을 삽입하는 방식으로만 수행한다.

### A-002: Mermaid 안전 구문 준수

모든 Mermaid 다이어그램은 edu-skill.md의 안전 구문 가이드를 준수한다:
- 노드 라벨에 아포스트로피(`'`) 사용 금지
- `stateDiagram-v2`에서 `+` 연산자 사용 금지
- 특수 문자가 있는 라벨은 `["큰따옴표 라벨"]` 사용

### A-003: JSX Import 금지

MDX 파일에 `import` 문을 포함하지 않는다. 모든 컴포넌트(MermaidDiagram 등)는 전역적으로 사용 가능하다.

### A-004: Phase 5까지의 개념만 사용

보강 내용에서 사용하는 모든 온톨로지 개념은 Phase 1~5에서 이미 소개된 것이어야 한다. Phase 6 내에서 새로 소개되는 개념은 해당 파일의 기존 본문에서 다룬 범위 내에서만 사용한다.

### A-005: Additive 변경 원칙

기존 내용의 삭제, 재배치, 재작성을 금지한다. 모든 변경은 새로운 섹션 추가 또는 기존 섹션 내 단락 추가 형태로만 수행한다.

---

## 요구사항 (Requirements)

### REQ-P6-001: Schema.org의 RDFS 선택 Decision Narrative [CRITICAL]

**WHEN** 학습자가 `03-schema-org.mdx`의 Schema.org 구조 또는 약점 섹션을 읽을 때,
**THEN** 시스템은 Schema.org가 왜 OWL이 아닌 RDFS 수준의 형식성을 선택했는지에 대한 Decision Narrative를 제공해야 한다.

**상세 요구사항**:

1. **대안 진술**: Schema.org 설계 시 고려할 수 있었던 형식 언어 대안을 명시
   - 대안 1: RDF Schema (RDFS) -- 실제 선택
   - 대안 2: OWL-Lite -- 중간 수준의 형식성
   - 대안 3: OWL-DL -- 완전한 형식적 추론 지원
   - 대안 4: OWL-Full -- 제한 없는 표현력

2. **각 대안의 실제 모습**: 동일한 Schema.org 예제(예: `Person` 타입과 `knows` 속성)를 각 대안으로 표현했을 때 어떻게 보이는지 간략 비교

3. **거부된 대안의 실패 모드**:
   - OWL-DL/Full을 선택했을 경우: 800개 이상의 타입에 대해 웹 개발자가 마크업 작성 불가, 추론 엔진 필요로 인한 검색 엔진 통합 불가
   - OWL-Lite를 선택했을 경우: 여전히 웹 개발자에게 진입 장벽이 높고, JSON-LD와의 호환성 문제

4. **RDFS 선택이 실패를 회피하는 이유**: Schema.org의 핵심 목표(웹 규모 채택, 검색 엔진 통합)와 RDFS의 단순성이 어떻게 부합하는지

5. **"왜 필요한가?" blockquote** 포함: 형식 언어 선택이 온톨로지 채택에 미치는 영향

**삽입 위치**: `03-schema-org.mdx`의 "Schema.org의 장점과 약점" 섹션 내, "약점" 서브섹션의 "형식적 엄밀성 부족" 설명 뒤, "연결 포인트: Schema.org와 OWL의 관계" blockquote 전

### REQ-P6-002: Gene Ontology OWL 2 EL 선택 Deep-Dive [CRITICAL]

**WHEN** 학습자가 `04-gene-ontology.mdx`의 "OWL 2 EL 프로파일 사용 이유" 섹션을 읽을 때,
**THEN** 시스템은 OWL 2 프로파일 간 성능 비교와 GO가 EL을 선택한 구체적 메커니즘을 제공해야 한다.

**상세 요구사항**:

1. **문제 진술**: 40,000개 이상의 GO 용어와 수백만 개의 어노테이션에 대해 추론을 실행해야 하는 상황에서, OWL 2 프로파일 선택이 왜 중요한지

2. **OWL 2 프로파일별 성능 비교 표**:
   - OWL 2 Full: 표현력 최대, 추론 결정 불가능(undecidable), GO 규모에서 실행 불가
   - OWL 2 DL: 표현력 높음, 최악 시간 복잡도 2NEXPTIME, GO 규모에서 비실용적
   - OWL 2 EL: 교차/존재 제한 지원, 다항 시간(polynomial time) 추론, GO에 적합
   - OWL 2 QL: 쿼리 응답 최적화, 복잡한 계층 표현 부족, GO 부적합
   - OWL 2 RL: 규칙 기반, 존재 제한 미지원, GO 부적합

3. **EL 선택의 핵심 트레이드오프**: NOT(보수, complement) 구조를 포기하는 대가로 다항 시간 추론을 얻음. GO에서 "~이 아닌 것"을 표현할 필요가 적은 이유

4. **ELK 분류기 활용 예시**: 새 GO 용어 추가 시 ELK가 자동으로 올바른 위치를 찾아주는 과정을 간략히 서술

5. **"왜 필요한가?" blockquote**: 대규모 온톨로지에서 추론 가능성(tractability)이 왜 표현력보다 중요한지

**삽입 위치**: `04-gene-ontology.mdx`의 "GO가 OWL 2 EL을 선택한 이유" 서브섹션 뒤, "GO 활용 사례" 섹션 전

### REQ-P6-003: GO의 트리에서 DAG로의 전환 메커니즘 [MAJOR]

**WHEN** 학습자가 `04-gene-ontology.mdx`의 DAG 구조 섹션을 읽을 때,
**THEN** 시스템은 일반적인 트리 구조 대신 DAG를 선택한 설계 결정의 메커니즘을 제공해야 한다.

**상세 요구사항**:

1. **문제 진술**: 일반적인 분류 체계(taxonomy)가 트리 구조인 이유와, 생물학적 지식이 트리에 맞지 않는 구체적 사례

2. **트리 vs DAG 비교**:
   - 트리에서 `nuclear envelope`를 배치하려면: "핵막" 또는 "세포질의 일부" 중 하나만 선택해야 함 → 정보 손실
   - DAG에서: 두 부모 모두에 연결 가능 → 생물학적 현실 반영

3. **관계 타입 워크스루**:
   - `is_a` (종류이다): 하위 개념의 모든 특성이 상위 개념에도 적용
   - `part_of` (일부이다): 물리적/기능적 구성 관계
   - `regulates` (조절한다): 하나의 과정이 다른 과정을 제어

4. **트리만 사용했을 때 깨지는 것**: 구체적 검색 시나리오에서 트리 구조가 놓치는 결과를 보여줌

5. **"연결 포인트" callout**: Phase 3에서 배운 OWL 클래스 계층 구조와 다중 상속의 관계

**삽입 위치**: `04-gene-ontology.mdx`의 "관계 유형" 서브섹션 뒤, "GO 용어 (GO Terms)" 섹션 전

### REQ-P6-004: 동일 도메인 5개 온톨로지 비교 -- "사람" 개념 [MAJOR]

**WHEN** 학습자가 `06-comparative.mdx`의 종합 비교표를 읽을 때,
**THEN** 시스템은 하나의 구체적 도메인("사람" 개념)을 5개 온톨로지가 각각 어떻게 표현하는지 비교를 제공해야 한다.

**상세 요구사항**:

1. **"사람" 개념을 5개 접근법으로 표현**:
   - FOAF: `foaf:Person` -- 소셜 관계 중심 (knows, interest, homepage)
   - Dublin Core: `dcterms:creator` / `dcterms:contributor` -- 자원의 기여자 역할로만 기술
   - Schema.org: `schema:Person` -- 웹 검색 최적화 속성 (jobTitle, affiliation, sameAs)
   - Gene Ontology: 직접 표현 불가 -- GO는 유전자/단백질 기능 어휘이므로 "사람"은 범위 밖
   - SNOMED CT: 환자/의료진 역할 -- 임상 맥락에서의 사람 (clinical finding의 주체)

2. **비교 표**: 동일한 정보(이름, 소속, 관계, 식별자)를 각 온톨로지에서 어떻게 표현하는지 또는 표현 불가능한지를 표로 비교

3. **핵심 인사이트**: "같은 현실 세계 개념도 온톨로지의 목적에 따라 완전히 다르게 모델링된다" -- 이것이 온톨로지 선택이 중요한 이유

4. **Mermaid 다이어그램**: 5개 온톨로지의 "사람" 관련 클래스/속성을 비교하는 시각화

5. **"왜 필요한가?" blockquote**: 동일 개념의 다중 표현을 이해하는 것이 온톨로지 통합(매핑)에서 왜 필수적인지

**삽입 위치**: `06-comparative.mdx`의 "5개 온톨로지 종합 비교표" 섹션 뒤, "각 온톨로지의 성공 요인" 섹션 전

---

## 제약사항 (Constraints)

### C-001: Additive 변경만 허용

기존 내용을 삭제하거나 재구조화하지 않는다. 모든 변경은 새 섹션 삽입 또는 기존 섹션 내 단락 추가로만 수행한다.

### C-002: 파일당 추가 분량 제한

각 파일의 보강 분량은 **60~120줄**을 목표로 한다. 이를 초과하면 인지 부하가 증가하여 교육 효과가 감소한다.

### C-003: 개념 범위 제한

보강 내용에서 Phase 7 이후의 개념이나 Phase 6 본문에서 다루지 않은 고급 개념을 도입하지 않는다.

### C-004: Mermaid 다이어그램 안전 구문

모든 Mermaid 다이어그램은 edu-skill.md의 안전 구문 가이드를 엄격히 준수한다.

### C-005: 한국어 문체 일관성

`content/phase-1/01-motivation.mdx`와 `content/phase-7/05-llm-graph-rag.mdx`의 톤을 벤치마크로 사용한다. 존댓말 + 친근한 멘토 톤을 유지한다.

### C-006: 코드 예제의 교육적 적합성

Turtle 스키마와 RDF 예제는 실제 실행 가능한 수준의 정확성보다 **개념 전달의 명확성**을 우선한다. 간소화된 예제에는 "이것은 개념 이해를 위한 간소화된 예시입니다" 주석을 포함한다.

---

## 기술 명세 (Specifications)

### 파일 영향 분석

| 파일 | 보강 내용 | 패턴 | 예상 추가 줄 수 |
|------|----------|------|----------------|
| `content/phase-6/04-gene-ontology.mdx` | REQ-P6-002 (OWL 2 EL Deep-Dive), REQ-P6-003 (트리→DAG 메커니즘) | Pattern A (Mechanism Deep-Dive) | 80~120줄 |
| `content/phase-6/03-schema-org.mdx` | REQ-P6-001 (RDFS 선택 Decision Narrative) | Pattern B (Decision Narrative) | 60~90줄 |
| `content/phase-6/06-comparative.mdx` | REQ-P6-004 (동일 도메인 5개 온톨로지 비교) | Pattern B (Decision Narrative) | 70~100줄 |

**총 예상 추가 분량**: 210~310줄 (3개 파일)

### 구현 접근법

#### 1. 04-gene-ontology.mdx 보강 전략

**REQ-P6-002 (OWL 2 EL Deep-Dive)**:
- 기존 "GO가 OWL 2 EL을 선택한 이유" 서브섹션(3개 항목) 뒤에 삽입
- 구조:
  ```
  ### OWL 2 프로파일 성능 비교: GO 규모에서의 현실

  > **왜 필요한가?** [추론 가능성이 온톨로지 실용성을 결정하는 이유]

  **프로파일별 비교표**
  | 프로파일 | 표현력 | 추론 복잡도 | GO 40,000+ 용어 적합성 |
  ...

  **EL이 포기한 것과 그 대가**
  - NOT 구조 포기 → 다항 시간 추론 획득
  - GO에서 "~이 아닌 것" 표현이 드문 이유

  **ELK 분류기가 하는 일**
  - 새 용어 추가 시 자동 배치 과정 간략 서술
  ```

**REQ-P6-003 (트리→DAG 메커니즘)**:
- 기존 "관계 유형" 서브섹션 뒤에 삽입
- 구조:
  ```
  ### 왜 트리가 아닌 DAG인가?

  **트리 구조의 한계: nuclear envelope 문제**
  - 트리에서의 강제 선택 → 정보 손실 시연
  - DAG에서의 해결 → 다중 부모 활용

  **관계 타입이 의미하는 것**
  - is_a vs part_of vs regulates 비교
  - 각 관계가 빠지면 무엇이 깨지는지

  > **연결 포인트:** Phase 3 OWL 클래스 계층 구조와 다중 상속
  ```

#### 2. 03-schema-org.mdx 보강 전략

**REQ-P6-001 (RDFS 선택 Decision Narrative)**:
- "형식적 엄밀성 부족" 설명 뒤, "연결 포인트: Schema.org와 OWL의 관계" blockquote 전에 삽입
- 구조:
  ```
  ### 설계 결정: 왜 OWL이 아닌 RDFS인가?

  > **왜 필요한가?** [형식 언어 선택이 채택률에 미치는 영향]

  **고려된 대안들**
  | 대안 | 특징 | Schema.org에서의 실패 모드 |
  ...

  **각 대안이 실제로 어떻게 보이는지**
  - 동일한 Person/knows 예제의 RDFS vs OWL-DL 비교

  **RDFS가 Schema.org를 구한 이유**
  - 웹 규모 채택 + 검색 엔진 통합이라는 핵심 목표와의 정합성
  ```

#### 3. 06-comparative.mdx 보강 전략

**REQ-P6-004 (동일 도메인 5개 온톨로지 비교)**:
- "5개 온톨로지 종합 비교표" 섹션 뒤에 새 하위 섹션 삽입
- 구조:
  ```
  ## 하나의 개념, 다섯 가지 시선: "사람"을 어떻게 표현하는가?

  > **왜 필요한가?** [동일 개념의 다중 표현이 온톨로지 매핑에 필수적인 이유]

  **5개 온톨로지의 "사람" 표현 비교표**
  | 정보 항목 | FOAF | Dublin Core | Schema.org | GO | SNOMED CT |
  ...

  **Mermaid 다이어그램**: 각 온톨로지에서 "사람" 관련 클래스 구조 비교

  **핵심 인사이트**
  - 같은 현실 개념도 온톨로지 목적에 따라 완전히 다르게 모델링됨
  - 이것이 owl:equivalentClass와 skos:exactMatch가 필요한 이유
  ```

### 구현 순서

| 순서 | 요구사항 | 파일 | 의존성 |
|------|---------|------|--------|
| 1 | REQ-P6-002 | 04-gene-ontology.mdx | 없음 (CRITICAL, 가장 기술적 깊이) |
| 2 | REQ-P6-003 | 04-gene-ontology.mdx | REQ-P6-002와 동일 파일 (순차 작업) |
| 3 | REQ-P6-001 | 03-schema-org.mdx | 없음 (CRITICAL, 독립적) |
| 4 | REQ-P6-004 | 06-comparative.mdx | 없음 (MAJOR, 독립적) |

**이유**: `04-gene-ontology.mdx`에 2개 요구사항이 집중되므로 먼저 완료하여 파일 잠금을 해제하고, 이후 나머지 2개 파일을 병렬 또는 순차적으로 보강한다. REQ-P6-002는 프로파일 성능 비교라는 가장 기술적 깊이가 필요한 작업이므로 최우선 실행한다.

---

## 추적성 (Traceability)

| 요구사항 | Gap (research.md) | 보강 패턴 | 대상 파일 |
|---------|-------------------|----------|----------|
| REQ-P6-001 | Gap 10 (MAJOR) | Pattern B (Decision Narrative) | 03-schema-org.mdx |
| REQ-P6-002 | Gap 10 (MAJOR) + Gap 8 (MAJOR) | Pattern A (Mechanism Deep-Dive) | 04-gene-ontology.mdx |
| REQ-P6-003 | Gap 10 (MAJOR) | Pattern A (Mechanism Deep-Dive) | 04-gene-ontology.mdx |
| REQ-P6-004 | Gap 10 (MAJOR) + Anti-Pattern 1 | Pattern B (Decision Narrative) | 06-comparative.mdx |
