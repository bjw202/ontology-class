---
id: SPEC-ENHANCE-P5
type: acceptance
version: "1.0.0"
status: draft
created: "2026-03-10"
updated: "2026-03-10"
---

# SPEC-ENHANCE-P5: Acceptance Criteria

## REQ-P5-001: 완전한 온톨로지 설계 워크스루 [CRITICAL]

### AC-001: 워크스루 구조 완전성

**Given** `content/phase-5/02-competency-questions.mdx` 파일이 보강된 상태일 때
**When** "종합 워크스루" 섹션의 내용을 확인하면
**Then** 다음 5단계가 모두 순서대로 포함되어 있어야 한다:
  1. 문제 정의 (도서관 대출 시스템 목적 명시)
  2. CQ 작성 (최소 5개, 각 CQ의 필요 근거 포함)
  3. CQ에서 클래스 추출 (명사 추출 -> 후보 -> 정규화 과정)
  4. 속성/공리 정의 (Turtle 형식, 5개 이상 속성)
  5. SPARQL 검증 (5개 CQ 각각에 대응하는 SPARQL 쿼리)

### AC-002: CQ 품질

**Given** 워크스루의 "단계 1: CQ 작성"을 확인할 때
**When** 작성된 CQ를 평가하면
**Then** 각 CQ는 다음을 충족해야 한다:
  - 구체적이고 단일 관심사를 가짐
  - SPARQL로 표현 가능
  - 각 CQ에 "왜 이 질문이 필요한지" 1~2문장 근거 포함

### AC-003: Turtle 스키마 완전성

**Given** 워크스루의 "단계 3: 속성/공리 정의"를 확인할 때
**When** Turtle 코드 블록을 검증하면
**Then** 다음을 충족해야 한다:
  - `@prefix` 선언 포함
  - 최소 4개 클래스 정의 (Book, Person, LoanRecord, Topic 등)
  - 최소 5개 속성 정의 (도메인/범위 명시)
  - 최소 1개 OWL 제약(Restriction) 포함 (예: `owl:minCardinality`)
  - "간소화된 예시" 주석 포함

### AC-004: SPARQL 검증 완전성

**Given** 워크스루의 "단계 4: SPARQL로 검증"을 확인할 때
**When** SPARQL 쿼리들을 검증하면
**Then** 다음을 충족해야 한다:
  - 5개 CQ 각각에 대응하는 SPARQL 쿼리 존재
  - 각 쿼리에 `PREFIX` 선언 포함
  - 각 쿼리에 "어떤 트리플 패턴을 매칭하는지" 설명 포함
  - 최소 1개 쿼리에 "빈 결과 반환 시 무엇이 빠진 것인지" 디버깅 가이드 포함

### AC-005: 종료 검증

**Given** 워크스루의 마지막 섹션을 확인할 때
**When** 종료 검증 내용을 확인하면
**Then** 다음을 충족해야 한다:
  - 5개 CQ 모두 SPARQL로 답변 가능함을 명시적으로 확인
  - 원래 목적(도서 대출 관리, 주제별 검색, 인기 도서 파악) 달성 여부 되돌아봄

### AC-006: 삽입 위치 정확성

**Given** 보강이 완료된 `02-competency-questions.mdx` 파일에서
**When** 워크스루 섹션의 위치를 확인하면
**Then** "CQ를 SPARQL로 변환하기" 섹션 뒤, "연결 포인트" 섹션 전에 위치해야 한다.

---

## REQ-P5-002: Middle-out 전략 실전 시나리오 [MAJOR]

### AC-007: 세 전략 비교 완전성

**Given** `content/phase-5/03-design-strategies.mdx` 파일이 보강된 상태일 때
**When** "실전 비교" 섹션을 확인하면
**Then** 다음 세 시나리오가 모두 포함되어야 한다:
  1. Top-down 시도 + 실패 이유 (추상화 과잉, CQ 미충족)
  2. Bottom-up 시도 + 실패 이유 (파편화, 통합 불가)
  3. Middle-out 성공 과정 (CQ 기반 핵심 개념 출발, 균형 확장)

### AC-008: 비교 결과표

**Given** "실전 비교" 섹션의 마지막을 확인할 때
**When** 비교표를 검증하면
**Then** 최소 3개 기준(CQ 충족률, 설계 효율, 확장 용이성)으로 세 전략을 비교하는 표가 있어야 한다.

### AC-009: 삽입 위치 정확성

**Given** 보강이 완료된 `03-design-strategies.mdx` 파일에서
**When** 실전 비교 섹션의 위치를 확인하면
**Then** "전략 3: 중간 접근(Middle-out)" 섹션의 "단점" 뒤, "7가지 설계 원칙" 섹션 전에 위치해야 한다.

---

## REQ-P5-003: 온톨로지 안티패턴 Before/After [MAJOR]

### AC-010: 안티패턴 1 Before/After

**Given** `content/phase-5/05-anti-patterns.mdx` 파일이 보강된 상태일 때
**When** 안티패턴 1(과도한 클래스화) 섹션의 Before/After를 확인하면
**Then** 다음을 충족해야 한다:
  - Before: Turtle 코드 블록으로 잘못된 설계 (클래스 폭발) 시연
  - After: Turtle 코드 블록으로 올바른 설계 (속성 기반) 시연
  - "왜 After가 더 나은가?" 비교 포인트 최소 2개
  - "간소화된 예시" 주석 포함

### AC-011: 안티패턴 3 Before/After

**Given** 안티패턴 3(프로세스의 개체화) 섹션의 Before/After를 확인하면
**Then** 다음을 충족해야 한다:
  - Before: Turtle 코드 블록으로 단순 속성 표현
  - After: Turtle 코드 블록으로 N-항 관계(LoanEvent) 표현
  - "왜 After가 더 나은가?" — "누가, 언제" 질문 답변 가능성 비교
  - "간소화된 예시" 주석 포함

### AC-012: 안티패턴 4 Before/After

**Given** 안티패턴 4(거짓 역방향) 섹션의 Before/After를 확인하면
**Then** 다음을 충족해야 한다:
  - Before: Turtle 코드 블록으로 중복 역방향 속성 정의
  - After: Turtle 코드 블록으로 `owl:inverseOf` 활용
  - "왜 After가 더 나은가?" 비교 포인트 최소 2개
  - "간소화된 예시" 주석 포함

### AC-013: 삽입 위치 정확성

**Given** 보강이 완료된 `05-anti-patterns.mdx` 파일에서
**When** 각 Before/After 블록의 위치를 확인하면
**Then** 다음 위치에 있어야 한다:
  - 안티패턴 1: "수정 전략" 뒤
  - 안티패턴 3: "다른 예시: 고용 관계" 뒤
  - 안티패턴 4: "수정 전략" 뒤

---

## REQ-P5-004: 온톨로지 재사용 충돌 감지 워크스루 [MAJOR]

### AC-014: 충돌 시나리오 완전성

**Given** `content/phase-5/04-ontology-reuse.mdx` 파일이 보강된 상태일 때
**When** "재사용 시 발생하는 충돌" 섹션을 확인하면
**Then** 다음을 충족해야 한다:
  - 시나리오 설정: FOAF + Dublin Core 동시 import 상황 명시
  - 최소 2가지 충돌 유형 설명 (이름 충돌, 공리 충돌, 범위 불일치 중)
  - 각 충돌 유형에 구체적 예시 포함

### AC-015: 감지 방법 설명

**Given** 충돌 감지 방법 섹션을 확인할 때
**When** 내용을 검증하면
**Then** 다음을 충족해야 한다:
  - HermiT 추론기 실행 시 불일치가 나타나는 형태 설명
  - "unsatisfiable class"의 의미 설명
  - Phase 3 추론 개념과의 연결 포인트 callout 포함

### AC-016: 해결 전략

**Given** 해결 전략 섹션을 확인할 때
**When** 내용을 검증하면
**Then** 최소 2가지 해결 접근법이 간략히 소개되어야 한다.

### AC-017: 삽입 위치 정확성

**Given** 보강이 완료된 `04-ontology-reuse.mdx` 파일에서
**When** 충돌 감지 섹션의 위치를 확인하면
**Then** owl:imports 관련 섹션 뒤, "상위 온톨로지" 섹션 전에 위치해야 한다.

---

## 공통 품질 기준 (Cross-cutting Quality Gates)

### QG-001: Additive 변경 원칙

**Given** 모든 보강 파일에 대해
**When** git diff로 변경 사항을 확인하면
**Then** 기존 내용의 삭제(deletion)나 수정(modification)이 없어야 하며, 오직 새로운 내용 추가(addition)만 있어야 한다.

### QG-002: 분량 제한

**Given** 각 보강 파일에 대해
**When** 추가된 줄 수를 확인하면
**Then** 파일당 추가 분량이 60~120줄 범위 내에 있어야 한다.

### QG-003: 한국어 문체 일관성

**Given** 모든 보강 내용에 대해
**When** 문체를 확인하면
**Then** 존댓말 + 친근한 멘토 톤이 유지되어야 하며, `content/phase-1/01-motivation.mdx`의 톤과 일관성이 있어야 한다.

### QG-004: "왜 필요한가?" 및 "연결 포인트" 포함

**Given** 각 보강 파일에 대해
**When** blockquote/callout을 확인하면
**Then** 파일당 최소 1개의 "왜 필요한가?" blockquote와 1개의 "연결 포인트" callout이 있어야 한다.

### QG-005: Mermaid 안전 구문

**Given** Mermaid 다이어그램이 포함된 모든 보강 내용에 대해
**When** 구문을 검증하면
**Then** 아포스트로피(`'`) 미사용, 특수 문자 라벨 `["큰따옴표"]` 형식, `stateDiagram-v2` `+` 연산자 미사용을 충족해야 한다.

### QG-006: 코드 예제 주석

**Given** 모든 Turtle/SPARQL 코드 블록에 대해
**When** 간소화된 예제를 확인하면
**Then** "이것은 개념 이해를 위한 간소화된 예시입니다" 주석이 포함되어야 한다.

### QG-007: 개념 범위 준수

**Given** 모든 보강 내용에 대해
**When** 사용된 온톨로지 개념을 확인하면
**Then** Phase 1~4에서 소개된 개념과 Phase 5 본문에서 다룬 범위 내의 개념만 사용되어야 한다.

---

## Definition of Done

모든 acceptance criteria(AC-001 ~ AC-017)와 quality gate(QG-001 ~ QG-007)를 통과하면 SPEC-ENHANCE-P5의 구현이 완료된 것으로 간주한다.

**검증 방법**:
1. 각 파일의 보강 내용이 지정된 삽입 위치에 정확히 위치하는지 확인
2. git diff로 기존 내용 무변경 확인 (additive only)
3. 추가된 줄 수가 60~120줄 범위 내인지 확인
4. Mermaid 다이어그램 렌더링 정상 확인 (개발 서버에서 확인)
5. 모든 Turtle/SPARQL 코드 블록에 간소화 주석 포함 확인
6. 한국어 문체 일관성 확인
