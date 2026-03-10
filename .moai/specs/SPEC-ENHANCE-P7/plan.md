---
id: SPEC-ENHANCE-P7
type: plan
version: "1.0.0"
created: "2026-03-10"
updated: "2026-03-10"
---

# SPEC-ENHANCE-P7 구현 계획

## 마일스톤

### 1차 목표 (Primary Goal): 06-industry-applications.mdx 보강

산업 사례 파일에 3개 요구사항(REQ-001, REQ-004, REQ-005)을 보강한다. 이 파일이 Phase 7에서 가장 많은 보강이 필요하고, 가시적 효과가 가장 크다.

**작업 항목**:

1. REQ-001: 현대자동차 용접 결함 Before/After 시나리오 삽입
   - Before 시나리오: 수동 조사 과정 4단계 서술
   - 시스템 간 용어 불일치 표 작성
   - After 시나리오: Turtle 스키마 + SPARQL 쿼리 작성
   - "무엇이 바뀌었는가?" 요약

2. REQ-004: POSCO 철강 공정 온톨로지 스키마 구체화
   - Turtle 형식 온톨로지 스키마 (5~7개 클래스)
   - OWL 데이터 제약 예시
   - Phase 3 추론과의 연결 포인트 callout

3. REQ-005: 삼성전자 예측 품질 관리 워크스루
   - 3단계 공정 인과관계 트리플 예시
   - Phase 2 객체 속성과의 연결 포인트 callout

**완료 기준**: 06-industry-applications.mdx에 90~120줄 추가, Nextra 빌드 성공, Mermaid 렌더링 정상

### 2차 목표 (Secondary Goal): 02-knowledge-graphs.mdx 보강

지식 그래프 파일에 2개 요구사항(REQ-002, REQ-006)을 보강한다.

**작업 항목**:

1. REQ-002: 구글 KG 엔티티 해소 메커니즘 딥다이브
   - 4단계 해소 과정 워크스루
   - Mermaid flowchart 다이어그램
   - 각 단계 "없으면 무엇이 깨지는지" 설명

2. REQ-006: 엔티티 링킹 보충 설명
   - 정의, 왜 어려운지, 온톨로지 역할
   - Graph RAG 파이프라인과의 전방 연결

**완료 기준**: 02-knowledge-graphs.mdx에 70~100줄 추가, Nextra 빌드 성공

### 3차 목표 (Tertiary Goal): 03-search-recommendation.mdx 보강

검색/추천 파일에 1개 요구사항(REQ-003)을 보강한다.

**작업 항목**:

1. REQ-003: 의료 문헌 검색 Before/After 시나리오
   - Before: 키워드 "당뇨" 검색의 누락 문서 구체 열거
   - MeSH 온톨로지 일부 Turtle 시연
   - After: 쿼리 확장 단계별 과정
   - 재현율 비교 개념 설명

**완료 기준**: 03-search-recommendation.mdx에 50~70줄 추가, Nextra 빌드 성공

### 최종 목표 (Final Goal): 통합 검증

모든 보강 내용의 통합 검증을 수행한다.

**작업 항목**:

1. 전체 Nextra 빌드 검증 (에러 없음)
2. 모든 Mermaid 다이어그램 렌더링 확인
3. 파일 간 "연결 포인트" callout의 정확성 확인
4. 한국어 문체 일관성 검토

---

## 기술 접근법

### Turtle 스키마 작성 원칙

- 교육 목적에 맞게 간소화 (5~8개 클래스)
- 모든 URI는 `ex:` 네임스페이스 사용 (간결성)
- 각 클래스와 속성에 `rdfs:label`로 한국어 이름 부여
- 실무 정확성보다 개념 전달 명확성 우선
- "간소화된 예시" 주석 반드시 포함

### SPARQL 쿼리 작성 원칙

- Phase 4에서 배운 기본 SPARQL 문법만 사용
- SELECT 쿼리 중심 (UPDATE, CONSTRUCT 등 고급 문법 지양)
- 쿼리 결과의 의미를 자연어로 병기
- 2~3단계 패턴 매칭까지만 (과도한 복잡도 방지)

### Before/After 시나리오 작성 원칙

- Before: 구체적 상황, 구체적 행위자, 구체적 시간/비용
- After: 동일한 상황에서 기술 적용 효과
- 비교표 또는 요약 박스로 차이점 명시화
- 학습자가 "왜 이것이 필요한지"를 체감하도록 유도

### Mermaid 다이어그램 작성 원칙

- `graph TD` 또는 `graph LR`만 사용 (안전한 타입)
- 노드 라벨은 한국어 + 영어 병기 (예: `["엔티티 추출\\nEntity Extraction"]`)
- 아포스트로피(`'`) 절대 사용 금지
- 라벨에 특수 문자 필요시 `["큰따옴표"]` 사용
- 노드 수 10개 이내 (가독성)

---

## 리스크 및 대응

| 리스크 | 심각도 | 대응 방안 |
|--------|--------|----------|
| Mermaid 구문 오류로 빌드 실패 | MEDIUM | edu-skill.md 안전 구문 가이드 엄격 준수, 삽입 후 빌드 검증 |
| 보강 내용이 기존 흐름을 방해 | LOW-MEDIUM | 각 보강 섹션을 자기 완결적으로 작성, 기존 내용 참조는 있되 의존은 최소화 |
| 한국어 문체 불일치 | LOW | phase-1/01-motivation.mdx와 phase-7/05-llm-graph-rag.mdx를 문체 벤치마크로 활용 |
| Turtle/SPARQL 예제가 과도하게 복잡 | MEDIUM | "교육 목적 간소화" 주석 포함, 클래스 수 5~8개로 제한 |
| 컨텐츠 드리프트 (후속 Phase와 불일치) | LOW | Phase 6까지 소개된 개념만 사용, Phase 8 개념 미사용 |

---

## 의존성

- **선행 SPEC**: 없음 (Phase 7 기존 컨텐츠가 이미 존재)
- **후행 SPEC**: SPEC-ENHANCE-P6 (Phase 6 보강 시 Phase 7과의 연결 포인트 확인 필요)
- **참조 문서**: `.moai/specs/SPEC-ENHANCE-001/research.md` (연구 문서)
- **품질 벤치마크**: `content/phase-7/05-llm-graph-rag.mdx`
- **문체 벤치마크**: `content/phase-1/01-motivation.mdx`
