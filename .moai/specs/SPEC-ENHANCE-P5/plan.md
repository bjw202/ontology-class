---
id: SPEC-ENHANCE-P5
type: plan
version: "1.0.0"
status: draft
created: "2026-03-10"
updated: "2026-03-10"
---

# SPEC-ENHANCE-P5: Implementation Plan

## 구현 전략 개요

Phase 5(설계 방법론)의 4개 파일을 보강한다. 핵심 산출물은 REQ-P5-001의 **완전한 온톨로지 설계 워크스루**이며, 이는 전체 보강 시리즈에서 가장 영향력 있는 단일 작업이다.

모든 보강은 additive(추가적) 변경만 수행하며, 기존 컨텐츠를 삭제하거나 재구조화하지 않는다.

---

## 마일스톤

### Primary Goal: REQ-P5-001 완전한 설계 워크스루

**대상 파일**: `content/phase-5/02-competency-questions.mdx`
**보강 패턴**: Pattern D (Walkthrough)
**예상 추가 분량**: 100~120줄

**구현 접근법**:
1. 기존 파일의 "CQ를 SPARQL로 변환하기" 섹션과 "연결 포인트" 섹션 사이의 삽입 지점 확인
2. "종합 워크스루: 도서관 온톨로지를 처음부터 끝까지 설계하기" 섹션 작성
   - 시작: 문제 정의 (도서관 대출 시스템 목적)
   - 단계 1: CQ 5개 작성 + 근거
   - 단계 2: CQ에서 클래스 추출 (명사 추출 -> 후보 -> 정규화)
   - 단계 3: Turtle 형식 속성/공리 정의 (도메인, 범위, 카디널리티)
   - 단계 4: SPARQL 5개 쿼리 + 디버깅 가이드
   - 종료: CQ 충족 여부 점검
3. Mermaid 다이어그램: 워크스루 전체 흐름도 (문제 정의 -> CQ -> 클래스 -> 속성 -> SPARQL)
4. "왜 필요한가?" blockquote와 "연결 포인트" callout 포함

**교차 참조 확인**:
- 기존 CQ 예시(CQ1~CQ8)와 워크스루의 CQ가 일관성 유지
- Turtle 스키마가 기존 "CQ에서 클래스와 속성 도출하기" 섹션의 클래스/속성과 일치
- SPARQL 패턴이 기존 SPARQL 예시와 동일한 PREFIX 사용

**위험 요소**: 가장 긴 보강 섹션(100~120줄)이므로 인지 부하 관리 필요. 단계별 소제목과 시각적 구분(코드 블록, 표)으로 스캔 가능성(Scannability) 확보.

---

### Secondary Goal: REQ-P5-003 안티패턴 Before/After

**대상 파일**: `content/phase-5/05-anti-patterns.mdx`
**보강 패턴**: Pattern C (Before/After)
**예상 추가 분량**: 80~100줄 (3개 삽입 지점에 분산)

**구현 접근법**:
1. 안티패턴 1(과도한 클래스화)의 "수정 전략" 뒤에 Turtle Before/After 삽입
   - Before: `RedCar`, `BlueCar` 등 클래스 정의
   - After: `Car` + `hasColor` 속성 정의
   - 비교 포인트: 트리플 수, 쿼리 복잡도, 확장 비용
2. 안티패턴 3(프로세스의 개체화)의 "다른 예시: 고용 관계" 뒤에 삽입
   - Before: 단순 `hasLoanStatus` 속성
   - After: `LoanEvent` N-항 관계 패턴
   - 비교 포인트: "누가, 언제" 질문에 답변 가능 여부
3. 안티패턴 4(거짓 역방향)의 "수정 전략" 뒤에 삽입
   - Before: 중복 속성 정의
   - After: `owl:inverseOf` 활용
   - 비교 포인트: 데이터 일관성, 쿼리 명확성

**교차 참조 확인**:
- Turtle 예제가 기존 텍스트 설명과 일치하는지 확인
- 각 "간소화된 예시" 주석 포함

---

### Secondary Goal: REQ-P5-002 Middle-out 실전 시나리오

**대상 파일**: `content/phase-5/03-design-strategies.mdx`
**보강 패턴**: Pattern D (Walkthrough)
**예상 추가 분량**: 70~90줄

**구현 접근법**:
1. "전략 3: 중간 접근(Middle-out)" 섹션의 "단점" 뒤, "7가지 설계 원칙" 섹션 전에 삽입
2. "온라인 서점" 도메인으로 세 전략 비교 시나리오 작성
   - Top-down 실패: 추상화 과잉, CQ 미충족
   - Bottom-up 실패: 파편화, 통합 불가
   - Middle-out 성공: CQ 기반, 균형 잡힌 확장
3. 비교 결과표 작성 (CQ 충족률, 설계 시간, 확장 용이성)

**교차 참조 확인**:
- Middle-out의 장단점 설명이 기존 본문과 일관성 유지
- REQ-P5-001의 워크스루에서 사용한 Middle-out 접근과 상호 참조 가능

---

### Optional Goal: REQ-P5-004 재사용 충돌 감지

**대상 파일**: `content/phase-5/04-ontology-reuse.mdx`
**보강 패턴**: Pattern D (Walkthrough)
**예상 추가 분량**: 60~80줄

**구현 접근법**:
1. owl:imports 관련 섹션 뒤, "상위 온톨로지" 섹션 전에 삽입
2. FOAF + Dublin Core 동시 import 시 충돌 시나리오 작성
3. 충돌 유형 3가지 설명 (이름, 공리, 범위)
4. HermiT 추론기 결과 해석 방법 (텍스트 설명)
5. 해결 전략 2~3가지 간략 소개

**교차 참조 확인**:
- Phase 3 추론기 개념과의 연결 포인트
- 기존 owl:imports 설명과 일관성

---

## 기술적 접근

### 코드 예제 작성 원칙

1. **Turtle 스키마**: 개념 전달 우선, 실행 가능성은 부차적. `@prefix` 선언 포함, 5~10개 트리플 규모
2. **SPARQL 쿼리**: `PREFIX` 선언 포함, `SELECT-WHERE` 패턴 중심. 복잡한 서브쿼리 지양
3. **간소화 주석**: 모든 코드 블록에 "이것은 개념 이해를 위한 간소화된 예시입니다" 포함

### Mermaid 다이어그램 원칙

1. edu-skill.md 안전 구문 가이드 엄격 준수
2. 아포스트로피(`'`) 사용 금지
3. 특수 문자 라벨은 `["큰따옴표"]` 형식 사용
4. 노드 10개 이내로 제한하여 가독성 확보

### 문체 원칙

1. 한국어 존댓말 + 친근한 멘토 톤
2. 기술 용어는 영어 + 한국어 병기 (예: "역량 질문(Competency Questions, CQ)")
3. `content/phase-1/01-motivation.mdx` 톤 벤치마크

---

## 리스크 관리

| 리스크 | 심각도 | 완화 방안 |
|--------|--------|----------|
| REQ-P5-001 분량 초과 (120줄 제한) | MEDIUM | 단계별 소제목으로 분리, 코드 블록은 최소 필수 트리플만 포함 |
| 기존 CQ 예시와 워크스루 CQ 불일치 | LOW | 기존 CQ1~CQ8에서 5개를 선별하여 그대로 사용 |
| Turtle/SPARQL 구문 오류 | LOW | 개념 전달 우선 원칙으로, 구문 정확성보다 교육적 명확성 중시 |
| 컨텐츠 드리프트 (Phase 5 범위 초과) | LOW | Phase 4까지 소개된 개념만 사용, Phase 5 본문 개념만 활용 |
| Mermaid 렌더링 오류 | MEDIUM | 안전 구문 가이드 엄격 준수, 특수문자 회피 |

---

## 의존성

- **선행 조건**: SPEC-ENHANCE-P7 (Phase 7 보강)이 먼저 완료될 필요 없음. 독립적 작업 가능.
- **후행 작업**: 구현 완료 후 `/moai:3-sync`로 문서화 동기화
- **교차 참조**: REQ-P5-001의 워크스루는 향후 Phase 7 산업 사례(SPEC-ENHANCE-P7)에서 참조될 수 있음
