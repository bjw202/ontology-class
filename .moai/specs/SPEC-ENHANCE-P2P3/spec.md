---
id: SPEC-ENHANCE-P2P3
version: "1.0.0"
status: draft
created: "2026-03-10"
updated: "2026-03-10"
author: jw
priority: high
tags: [enhance, phase-2, phase-3, content, mechanism-deep-dive, walkthrough, connection-bridge]
---

# SPEC-ENHANCE-P2P3: Phase 2-3 기초/논리 보강 교육 컨텐츠 보강

## 개요

Phase 2(구성 요소)와 Phase 3(논리적 기반)의 교육 컨텐츠를 보강한다. 두 Phase를 하나의 SPEC으로 묶는 이유는, Phase 2의 공리(Axiom) 개념과 Phase 3의 추론기(Reasoner) 동작이 논리적으로 밀접하게 연결되어 있기 때문이다. 공리가 추론의 입력이라면, 추론기 동작은 공리의 출력이다. 이 두 개념을 함께 보강해야 학습자가 "공리 작성 -> 추론기 실행 -> 결과 해석 -> 디버깅"의 전체 흐름을 이해할 수 있다.

연구 문서(research.md)에서의 평가:
- **Phase 2**: 8/10 -- 공리의 추론 메커니즘 미시연
- **Phase 3**: 7.5/10 -- 추론기 내부 동작 블랙박스

핵심 문제:
- **Gap 2 (CRITICAL)**: Phase 3 -- 추론기(Reasoner) 내부 동작 설명 부재. `Bachelor == Adult & Male & ~Married` + 개별 사실들로부터 추론기가 결론에 도달하는 과정(HOW)이 전혀 없음. 학습자가 추론 실패 시 디버깅 불가.
- **Gap 8 (MAJOR)**: Phase 3 -- OWL 2 프로파일(EL/QL/RL) 트레이드오프 분석 불충분. 각 프로파일에서 무엇을 잃는지가 설계 결정에 매핑되지 않음.
- **Anti-Pattern 1**: "결과 선언, 메커니즘 부재" -- Phase 2 공리 섹션에서 추론 결과만 보여주고 과정을 생략.

**범위 경계**: 이 SPEC은 기존 컨텐츠에 대한 additive(추가적) 보강만 수행한다. 기존 내용을 삭제하거나 재구조화하지 않는다. 각 보강 섹션은 기존 흐름을 깨뜨리지 않는 자기 완결적 삽입이다.

**품질 벤치마크**: `content/phase-1/01-motivation.mdx`(MI 사례 내러티브)와 `content/phase-7/05-llm-graph-rag.mdx`(7단계 파이프라인, 실패 모드 분석)의 패턴을 참조 수준으로 삼는다.

---

## 환경 (Environment)

### 컨텐츠 플랫폼

- **프레임워크**: Nextra 4.x + Next.js 15 App Router
- **컨텐츠 형식**: MDX 파일, `content/phase-2/` 및 `content/phase-3/` 디렉토리
- **컨텐츠 언어**: 한국어 (설명), 영어 (기술 용어 + 한국어 정의 병기)
- **다이어그램 엔진**: Mermaid 11.12.2 (MermaidDiagram 컴포넌트 사용)
- **대상 독자**: 온톨로지 입문~중급 학습자 (Phase 1~2 학습 완료 전제, Phase 3 내용은 Phase 2까지 소개된 개념만 사용)

### 컨텐츠 품질 표준

| 요소 | 최소 수량 | 형식 |
|------|----------|------|
| "왜 필요한가?" blockquote | 보강 파일당 1개 이상 | `> **왜 필요한가?** [설명]` |
| "연결 포인트" callout | 보강 파일당 1개 이상 | `> **연결 포인트:** [연결 설명]` |
| Mermaid 다이어그램 | 보강 섹션당 필요시 | MermaidDiagram 컴포넌트 사용 |
| 코드/쿼리 예제 | 메커니즘 설명 섹션에 필수 | ```turtle``` 또는 DL 표기 코드 블록 |

### 보강 패턴 (research.md에서 정의)

- **Pattern A (Mechanism Deep-Dive)**: 문제 진술 -> 각 내부 단계 "왜 필요한가?" -> 빼면 무엇이 깨지는지
- **Pattern D (Walkthrough)**: 시작 -> 각 단계별 결정/근거 -> 종료 + 검증
- **Pattern E (Connection Bridge)**: 이론 명확히 진술 -> "이것을 알면 독립적으로 할 수 있는 것" -> 최소 실행 가능 시나리오 -> 판단 기준

---

## 전제 조건 (Assumptions)

### A-001: Phase 2-3 기존 컨텐츠 안정성

Phase 2의 `03-axioms.mdx`, Phase 3의 `01-description-logic.mdx`, `02-owa-cwa.mdx`, `05-owl2-profiles.mdx`가 모두 존재하고 정상 렌더링된다. 보강은 기존 섹션 사이에 새 섹션을 삽입하는 방식으로만 수행한다.

### A-002: Mermaid 안전 구문 준수

모든 Mermaid 다이어그램은 edu-skill.md의 안전 구문 가이드를 준수한다:
- 노드 라벨에 아포스트로피(`'`) 사용 금지
- `stateDiagram-v2`에서 `+` 연산자 사용 금지
- 특수 문자가 있는 라벨은 `["큰따옴표 라벨"]` 사용

### A-003: JSX Import 금지

MDX 파일에 `import` 문을 포함하지 않는다. 모든 컴포넌트(MermaidDiagram 등)는 전역적으로 사용 가능하다.

### A-004: Phase 2까지의 개념만 사용 (Phase 2 보강 시)

`03-axioms.mdx` 보강에서는 Phase 1~2에서 이미 소개된 개념만 사용한다. Phase 3 보강에서는 Phase 1~3의 해당 파일 이전까지 소개된 개념을 사용한다.

### A-005: Additive 변경 원칙

기존 내용의 삭제, 재배치, 재작성을 금지한다. 모든 변경은 새로운 섹션 추가 또는 기존 섹션 내 단락 추가 형태로만 수행한다.

---

## 요구사항 (Requirements)

### REQ-P2P3-001: 공리 추론 체인 단계별 시연 [CRITICAL]

**WHEN** 학습자가 `03-axioms.mdx`의 "공리가 추론을 가능하게 하는 방법" 섹션을 읽을 때,
**THEN** 시스템은 추론기가 공리로부터 결론을 도출하는 과정을 단계별로 시연해야 한다.

**상세 요구사항**:

1. **예제 설정**: `Bachelor == Adult & Male & ~Married` 동치클래스 공리 + ABox 사실 `Adult(:John)`, `Male(:John)`
2. **단계 1 -- TBox/ABox 구분**:
   - TBox에 정의된 `Bachelor` 동치클래스 공리 식별
   - ABox에서 `:John`에 대해 알려진 사실 목록화
3. **단계 2 -- 추론기의 공리 적용 과정**:
   - 교집합(Intersection) 체크: `Adult(:John)` 확인 -> 통과
   - 교집합(Intersection) 체크: `Male(:John)` 확인 -> 통과
   - 보수(Complement) 체크: `Married(:John)` 사실이 없음 -> OWA에서의 처리 설명
4. **단계 3 -- OWA의 영향**:
   - "Married 정보가 없으므로 CWA에서는 ~Married가 참이지만, OWA에서는 알 수 없다"
   - 따라서 OWA 하에서 `:John`이 `Bachelor`로 추론되지 않는 이유 설명
   - CWA였다면 어떤 결론이 나오는지 대비
5. **"이 단계가 없으면 추론기가 무엇을 놓치는가"** 설명:
   - 교집합 체크를 빼면: 조건 미충족 개체가 클래스에 포함됨
   - 보수 체크를 빼면: 결혼한 사람도 Bachelor로 분류됨
6. Mermaid 다이어그램: 추론 체인의 흐름도 (TBox 공리 -> ABox 사실 대조 -> 결론)

**삽입 위치**: `03-axioms.mdx`의 "공리가 추론을 가능하게 하는 방법" 섹션 내, "추론 시나리오" 하위 섹션의 기존 추론 예제 뒤

---

### REQ-P2P3-002: 추론기 내부 동작 직관적 설명 [CRITICAL]

**WHEN** 학습자가 `01-description-logic.mdx`의 TBox/ABox 섹션을 읽을 때,
**THEN** 시스템은 추론기(HermiT/Pellet)가 내부적으로 하는 일을 초급자도 이해할 수 있도록 직관적으로 설명해야 한다.

**상세 요구사항**:

1. **추론기의 핵심 질문**: "이 온톨로지에 모순이 없는가?" + "이 개체는 어떤 클래스에 속하는가?"
2. **테이블로(Tableaux) 알고리즘의 직관적 설명** (형식 수학 최소화):
   - 비유: "추론기는 탐정처럼 동작한다 -- 모든 가능한 상황을 나열하고, 모순이 나오면 그 가능성을 제거한다"
   - 단계 1: 가정(Assertion)을 모두 나열 (ABox 사실들)
   - 단계 2: TBox 공리에 따라 새로운 사실을 추가 (예: subClassOf에 의한 타입 전파)
   - 단계 3: 모순 탐지 -- disjointWith 위반, 동시에 A이면서 ~A인 경우
   - 단계 4: 분기(Branching) -- 합집합(A | B)이 나오면 각 경우를 나눠서 탐색
   - 단계 5: 모든 분기에서 모순이 나오면 "Unsatisfiable", 하나라도 모순 없으면 "Satisfiable"
3. **보완(Complement) 개념과 모순 탐지**:
   - `Person & ~Person`이 왜 빈 집합인지 간단히 설명
   - disjointWith 공리가 모순 탐지에 어떻게 활용되는지
4. **추론 실패 시나리오**:
   - Unsatisfiable class: "Student이면서 동시에 Professor인 개체를 만들면 어떻게 되는가" (disjointWith가 있을 때)
   - Inconsistency: "온톨로지 자체가 모순인 경우 추론기가 아무 결과도 신뢰할 수 없다"
5. **Protege에서 추론 결과 해석하는 방법**:
   - 추론기 실행 후 노란색 표시 = 추론된 사실
   - 빨간색 표시 = 비일관성/비만족 클래스
   - "Explain" 기능으로 추론 근거 확인

**삽입 위치**: `01-description-logic.mdx`의 "TBox와 ABox: DL 온톨로지의 두 부분" 섹션 뒤, "흔한 오해" 섹션 전

---

### REQ-P2P3-003: OWA/CWA Protege 실험 워크스루 [MAJOR]

**WHEN** 학습자가 `02-owa-cwa.mdx`의 "OWA가 온톨로지 설계에 미치는 실질적 영향" 섹션을 읽을 때,
**THEN** 시스템은 Protege에서 OWA로 인해 예상치 못한 결과가 나오는 구체적 단계별 실험을 제공해야 한다.

**상세 요구사항**:

1. **실험 시작 상태**:
   - 온톨로지: `Person` 클래스, `Male`과 `Female` 두 하위클래스, `disjointWith` 공리 없음
   - 개체: `:John rdf:type :Male`
   - 질문: "John은 Female인가?"
2. **OWA 하에서 추론기의 응답**:
   - 단계별 Protege 조작 또는 RDFLib 코드로 시연
   - 추론기 실행 결과: `:John`이 `Female`이 아니라고 결론 내리지 않음 (정보 부재)
   - 학습자 예상과의 차이 설명: "Male이면 당연히 Female이 아닌 것 아닌가?"
3. **disjointWith 추가 후 변화**:
   - `Male owl:disjointWith Female` 공리 추가
   - 추론기 재실행: 이제 `:John`이 `Female`이 아님을 추론
   - OWA에서 "명시적 선언 없이는 알 수 없다"가 실제로 어떻게 작동하는지 체감
4. **CWA 대비**:
   - 동일한 상황에서 CWA(데이터베이스)였다면: "Male 테이블에 있고 Female 테이블에 없으니 Female이 아니다"
   - OWA와의 핵심 차이 재강조
5. **RDFLib Python 코드 또는 Protege UI 단계 중 택 1**:
   - 학습자가 직접 재현할 수 있는 최소한의 코드/조작 단계 제공

**삽입 위치**: `02-owa-cwa.mdx`의 "OWA가 온톨로지 설계에 미치는 실질적 영향" 섹션 내, "영향 3: 추론 결과의 차이" 뒤

---

### REQ-P2P3-004: OWL 2 프로파일 트레이드오프 연결 다리 [MAJOR]

**WHEN** 학습자가 `05-owl2-profiles.mdx`의 각 프로파일 설명을 읽을 때,
**THEN** 시스템은 각 프로파일이 포기하는 것과 그것이 실제 프로젝트 결정에 미치는 영향을 구체화해야 한다.

**상세 요구사항**:

1. **각 프로파일에서 "무엇을 포기하는가" 구체화**:
   - **EL이 포기하는 것**: 전칭 제한, 합집합, 부정, 수 제한
     - 실제 영향: "모든 자식이 인간이어야 한다"를 표현 불가 -> 바이오 도메인에서는 필요 없음
   - **QL이 포기하는 것**: 역할 체인, 수 제한, Nominals
     - 실제 영향: "조부모" 같은 복합 관계 표현 불가 -> 데이터 통합에서는 단순 매핑이 핵심
   - **RL이 포기하는 것**: 합집합(TBox 우측), 복잡한 Nominals
     - 실제 영향: "학생 또는 교수"라는 클래스 정의 불가 -> 규칙 엔진에서는 if-then 패턴이 핵심

2. **각 프로파일이 적합한 실제 시나리오**:
   - **EL -> 바이오인포매틱스**: SNOMED CT, Gene Ontology -- 수십만 클래스의 빠른 분류가 핵심
   - **QL -> 데이터 통합**: 정부 공공데이터, 기업 데이터 웨어하우스 -- 기존 RDB를 온톨로지로 접근
   - **RL -> 규칙 엔진**: 보험 심사, 제조 품질 규칙 -- 비즈니스 로직을 규칙으로 표현

3. **"내 프로젝트에는 어떤 프로파일이 맞는가?" 판단 기준 표**:
   - 판단 축: (1) 클래스 규모, (2) 데이터 저장소, (3) 추론 유형, (4) 통합 대상
   - 각 축에서 EL/QL/RL/DL 중 적합한 선택을 가리키는 의사결정 표

4. **"이것을 알면 독립적으로 할 수 있는 것"** (Pattern E):
   - 프로파일 선택 후 해당 프로파일의 추론기(ELK, Ontop, Jena Rules)로 첫 온톨로지를 실행하는 최소 시나리오

**삽입 위치**: `05-owl2-profiles.mdx`의 "세 프로파일 비교" 표 뒤, "표현력-효율성 트레이드오프 시각화" 전

---

## 제약사항 (Constraints)

### C-001: Additive 변경만 허용

기존 내용을 삭제하거나 재구조화하지 않는다. 모든 변경은 새 섹션 삽입 또는 기존 섹션 내 단락 추가로만 수행한다.

### C-002: 파일당 추가 분량 제한

각 파일의 보강 분량은 **60~120줄**을 목표로 한다. 이를 초과하면 인지 부하가 증가하여 교육 효과가 감소한다.

### C-003: 개념 범위 제한

- Phase 2 보강(`03-axioms.mdx`)에서는 Phase 1~2까지 소개된 개념만 사용
- Phase 3 보강에서는 Phase 1~3의 해당 파일까지 소개된 개념만 사용
- Phase 4 이후의 개념(SPARQL, RDF 직렬화 형식 등)을 도입하지 않음

### C-004: Mermaid 다이어그램 안전 구문

모든 Mermaid 다이어그램은 edu-skill.md의 안전 구문 가이드를 엄격히 준수한다.

### C-005: 한국어 문체 일관성

`content/phase-1/01-motivation.mdx`와 `content/phase-7/05-llm-graph-rag.mdx`의 톤을 벤치마크로 사용한다. 존댓말 + 친근한 멘토 톤을 유지한다.

### C-006: 초급자 접근성 (REQ-P2P3-002 특별 제약)

추론기 내부 동작 설명(REQ-P2P3-002)은 형식 논리 표기를 최소화하고, 비유와 단계별 예시 중심으로 작성한다. 테이블로 알고리즘의 수학적 정의 대신 "탐정 비유"와 같은 직관적 설명을 우선한다.

---

## 기술 명세 (Specifications)

### 파일 영향 분석

| 파일 | 보강 내용 | 패턴 | 예상 추가 줄 수 |
|------|----------|------|----------------|
| `content/phase-3/01-description-logic.mdx` | REQ-P2P3-002 (추론기 내부 동작) | Pattern A (Mechanism Deep-Dive) | 80~110줄 |
| `content/phase-2/03-axioms.mdx` | REQ-P2P3-001 (공리 추론 체인) | Pattern A (Mechanism Deep-Dive) | 70~100줄 |
| `content/phase-3/02-owa-cwa.mdx` | REQ-P2P3-003 (OWA Protege 실험) | Pattern D (Walkthrough) | 60~90줄 |
| `content/phase-3/05-owl2-profiles.mdx` | REQ-P2P3-004 (프로파일 트레이드오프) | Pattern E (Connection Bridge) | 70~100줄 |

**총 예상 추가 분량**: 280~400줄 (4개 파일)

### 구현 접근법

#### 1. 01-description-logic.mdx 보강 전략 (REQ-P2P3-002)

- TBox/ABox 섹션 뒤에 새 하위 섹션 "추론기는 어떻게 동작하는가?" 삽입
- 탐정 비유로 시작하여 테이블로 알고리즘의 5단계를 자연어로 설명
- Mermaid flowchart로 "가정 나열 -> 규칙 적용 -> 모순 탐지 -> 분기 -> 결론" 시각화
- Protege에서의 추론 결과 해석법을 짧은 안내로 포함
- 형식 수학 최소화: DL 표기는 기존 본문에서 이미 소개된 것만 사용

#### 2. 03-axioms.mdx 보강 전략 (REQ-P2P3-001)

- "공리가 추론을 가능하게 하는 방법" 섹션의 기존 추론 예제 뒤에 삽입
- Bachelor 예제로 TBox/ABox 구분 -> 공리 적용 -> OWA 영향의 3단계 시연
- Mermaid flowchart로 추론 체인 시각화
- "이 단계를 빼면?" 부정 시나리오로 각 단계의 필요성 강조
- Phase 3의 OWA 개념을 미리 살짝 언급하되, 상세 설명은 Phase 3에 위임

#### 3. 02-owa-cwa.mdx 보강 전략 (REQ-P2P3-003)

- "영향 3: 추론 결과의 차이" 뒤에 실험 워크스루 삽입
- Male/Female + disjointWith 예제로 OWA의 실질적 영향 체감
- Protege UI 단계 또는 RDFLib 코드 중 하나를 선택하여 재현 가능한 형태 제공
- 학습자가 "아하!" 하는 순간을 유도: disjointWith 추가 전후의 극적 차이

#### 4. 05-owl2-profiles.mdx 보강 전략 (REQ-P2P3-004)

- "세 프로파일 비교" 표 뒤에 연결 다리 섹션 삽입
- "무엇을 포기하는가" 표 + "어떤 프로젝트에 맞는가" 판단 기준 표
- 각 프로파일별 1~2줄 시나리오로 실제 적용 맥락 연결
- 기존의 "어떤 프로파일을 선택할까?" 섹션과 중복되지 않도록, 구체적 트레이드오프 분석에 집중

### 구현 순서

| 순서 | 요구사항 | 파일 | 의존성 |
|------|---------|------|--------|
| 1 | REQ-P2P3-002 | content/phase-3/01-description-logic.mdx | 없음 (CRITICAL gap 2, 가장 높은 영향) |
| 2 | REQ-P2P3-001 | content/phase-2/03-axioms.mdx | REQ-P2P3-002의 추론기 설명 참조 가능 |
| 3 | REQ-P2P3-003 | content/phase-3/02-owa-cwa.mdx | 독립적 |
| 4 | REQ-P2P3-004 | content/phase-3/05-owl2-profiles.mdx | 독립적 |

**이유**: Gap 2(추론기 내부 동작)가 가장 심각한 학습 장벽이므로 우선 해결한다. Phase 2의 공리 추론 체인은 추론기 설명을 참조할 수 있으므로 2번째로 배치한다. 나머지 두 파일은 독립적이므로 순서 무관하다.

---

## 추적성 (Traceability)

| 요구사항 | Gap (research.md) | 보강 패턴 | 대상 파일 |
|---------|-------------------|----------|----------|
| REQ-P2P3-001 | Gap 2 (CRITICAL) | Pattern A (Mechanism Deep-Dive) | content/phase-2/03-axioms.mdx |
| REQ-P2P3-002 | Gap 2 (CRITICAL) | Pattern A (Mechanism Deep-Dive) | content/phase-3/01-description-logic.mdx |
| REQ-P2P3-003 | Anti-Pattern 4 + Gap 2 | Pattern D (Walkthrough) | content/phase-3/02-owa-cwa.mdx |
| REQ-P2P3-004 | Gap 8 (MAJOR) | Pattern E (Connection Bridge) | content/phase-3/05-owl2-profiles.mdx |
