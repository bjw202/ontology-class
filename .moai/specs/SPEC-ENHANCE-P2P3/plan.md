---
id: SPEC-ENHANCE-P2P3
type: plan
version: "1.0.0"
created: "2026-03-10"
updated: "2026-03-10"
author: jw
---

# SPEC-ENHANCE-P2P3 Implementation Plan

## 구현 전략

### 접근 방식

이 SPEC은 4개 MDX 파일에 대한 additive 보강이다. 각 파일은 독립적으로 보강할 수 있으나, REQ-P2P3-002(추론기 내부 동작)가 REQ-P2P3-001(공리 추론 체인)에 개념적 기반을 제공하므로 추론기 설명을 먼저 작성한다.

### 기술 접근

- **삽입 방식**: 기존 MDX 파일의 특정 위치에 새 섹션을 Edit 도구로 삽입
- **다이어그램**: Mermaid flowchart/graph 유형 사용 (edu-skill.md 안전 구문 준수)
- **코드 예시**: DL 표기, Turtle 형식, 선택적으로 RDFLib Python 코드
- **품질 체크**: 각 파일 보강 후 Nextra 빌드로 렌더링 확인

---

## 마일스톤

### Primary Goal: 추론기 내부 동작 설명 (REQ-P2P3-002)

**대상 파일**: `content/phase-3/01-description-logic.mdx`
**Gap**: Gap 2 (CRITICAL) -- 추론기 동작 블랙박스

**작업 항목**:

1. 기존 파일의 "TBox와 ABox" 섹션 뒤 삽입 위치 확인
2. "추론기는 어떻게 동작하는가?" 새 섹션 작성
   - 탐정 비유 도입부 (2~3줄)
   - 테이블로 알고리즘 5단계 직관적 설명 (각 단계 5~8줄)
   - 보수(Complement)와 모순 탐지 설명 (10줄)
   - 추론 실패 시나리오: Unsatisfiable class, Inconsistency (15줄)
   - Protege 추론 결과 해석법 (10줄)
3. Mermaid flowchart 작성: 추론 과정 시각화
4. "왜 필요한가?" blockquote + "연결 포인트" callout 포함 확인
5. 분량 확인: 80~110줄 범위 내

**완료 기준**: spec.md REQ-P2P3-002의 5개 상세 요구사항 모두 충족

---

### Primary Goal: 공리 추론 체인 시연 (REQ-P2P3-001)

**대상 파일**: `content/phase-2/03-axioms.mdx`
**Gap**: Gap 2 (CRITICAL) -- 공리의 추론 메커니즘 미시연

**작업 항목**:

1. 기존 "추론 시나리오" 하위 섹션의 마지막 코드 블록 뒤 삽입 위치 확인
2. "추론 과정 들여다보기: Bachelor 예제" 새 하위 섹션 작성
   - 예제 설정: Bachelor 동치클래스 + John의 ABox 사실 (10줄)
   - 단계 1: TBox/ABox 구분 (10줄)
   - 단계 2: 추론기의 각 조건 체크 과정 (15줄)
   - 단계 3: OWA 영향 설명 -- CWA vs OWA 결과 대비 (15줄)
   - "이 단계가 없으면?" 부정 시나리오 (10줄)
3. Mermaid flowchart 작성: TBox 공리 -> ABox 대조 -> 조건 체크 -> 결론
4. Phase 3 OWA 개념으로의 전방 연결 포인트 추가
5. 분량 확인: 70~100줄 범위 내

**완료 기준**: spec.md REQ-P2P3-001의 6개 상세 요구사항 모두 충족

---

### Secondary Goal: OWA Protege 실험 워크스루 (REQ-P2P3-003)

**대상 파일**: `content/phase-3/02-owa-cwa.mdx`
**Gap**: Anti-Pattern 4 + Gap 2

**작업 항목**:

1. "영향 3: 추론 결과의 차이" 뒤 삽입 위치 확인
2. "직접 실험: OWA에서 disjointWith의 역할" 새 하위 섹션 작성
   - 실험 시작 상태 설정 (10줄)
   - OWA 하 추론기 응답 + 학습자 예상과의 차이 (15줄)
   - disjointWith 추가 후 변화 (15줄)
   - CWA 대비 설명 (10줄)
   - RDFLib Python 코드 또는 Protege UI 단계 (15줄)
3. "왜 필요한가?" blockquote 포함
4. 분량 확인: 60~90줄 범위 내

**완료 기준**: spec.md REQ-P2P3-003의 5개 상세 요구사항 모두 충족

---

### Secondary Goal: OWL 2 프로파일 트레이드오프 (REQ-P2P3-004)

**대상 파일**: `content/phase-3/05-owl2-profiles.mdx`
**Gap**: Gap 8 (MAJOR) -- 프로파일 트레이드오프 불충분

**작업 항목**:

1. "세 프로파일 비교" 표 뒤 삽입 위치 확인
2. "프로파일별 트레이드오프 실전 가이드" 새 섹션 작성
   - "무엇을 포기하는가" 구체화 표 (20줄)
   - 프로파일별 적합 시나리오 (각 3~4줄, 총 15줄)
   - "내 프로젝트에 어떤 프로파일이 맞는가?" 판단 기준 표 (20줄)
   - "이것을 알면 할 수 있는 것" 최소 실행 시나리오 (15줄)
3. 기존 "어떤 프로파일을 선택할까?" 섹션과의 중복 방지 확인
4. 분량 확인: 70~100줄 범위 내

**완료 기준**: spec.md REQ-P2P3-004의 4개 상세 요구사항 모두 충족

---

## 리스크 및 대응

| 리스크 | 심각도 | 완화 방안 |
|--------|--------|----------|
| 추론기 설명이 지나치게 형식적 (REQ-P2P3-002) | HIGH | 형식 수학 최소화, 비유 중심 설명, 작성 후 초급자 시점 재검토 |
| 공리 추론 체인에서 OWA 설명이 Phase 3 내용과 중복 | MEDIUM | Phase 2에서는 "맛보기"만 제공, "자세한 내용은 Phase 3에서" 전방 연결 |
| Protege 실험이 버전별로 UI 차이 | LOW | 일반적 개념 흐름 위주 설명, 특정 버전 UI 의존 최소화 |
| 프로파일 트레이드오프가 기존 "선택 결정 체계"와 중복 | MEDIUM | 기존은 "언제 선택?" 중심, 보강은 "무엇을 잃는가?" 중심으로 차별화 |
| Mermaid 구문 오류 | MEDIUM | edu-skill.md 안전 구문 엄격 준수, 렌더링 테스트 |

---

## 아키텍처 영향

이 SPEC은 기존 MDX 컨텐츠에 대한 additive 보강이므로 아키텍처 변경이 없다:
- 새 파일 생성 없음
- 컴포넌트 추가 없음
- 빌드 설정 변경 없음
- 기존 4개 MDX 파일에 섹션 삽입만 수행

---

## 구현 순서 요약

| 순서 | 요구사항 | 파일 | 우선순위 | 의존성 |
|------|---------|------|---------|--------|
| 1 | REQ-P2P3-002 | phase-3/01-description-logic.mdx | Primary | 없음 |
| 2 | REQ-P2P3-001 | phase-2/03-axioms.mdx | Primary | REQ-P2P3-002 참조 |
| 3 | REQ-P2P3-003 | phase-3/02-owa-cwa.mdx | Secondary | 독립적 |
| 4 | REQ-P2P3-004 | phase-3/05-owl2-profiles.mdx | Secondary | 독립적 |
