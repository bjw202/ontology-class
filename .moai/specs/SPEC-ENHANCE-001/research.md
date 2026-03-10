# Research Document: 온톨로지 교육 컨텐츠 보강

> Team Plan Research — 3 parallel agents (researcher, analyst, architect)
> Date: 2026-03-10

---

## 1. 핵심 진단

### 근본 원인: "결과 서술" vs "메커니즘 설명"

현재 컨텐츠의 기본 패턴:
```
무엇이 존재한다 → 기능을 나열한다 → 코드/예제를 보여준다
```

부족한 패턴:
```
왜 이 문제가 존재하는가 → 어떤 접근을 시도했는가 → 내부적으로 어떻게 작동하는가 → 이것을 빼면 무엇이 깨지는가
```

### 전체 품질 점수

| Phase | 주제 | 점수 | 핵심 이슈 |
|-------|------|------|----------|
| Phase 1 | 왜 필요한가? | 8.5/10 | 참조 수준 (MI 사례 우수) |
| Phase 2 | 구성 요소 | 8/10 | 공리의 추론 메커니즘 미시연 |
| Phase 3 | 논리적 기반 | 7.5/10 | 추론기 내부 동작 블랙박스 |
| Phase 4 | 표준/언어 | 8/10 | RDF→RDFS→OWL 층위 비교 부재 |
| Phase 5 | 설계 방법론 | 7/10 | 처음부터 끝까지 완전한 예제 없음 |
| Phase 6 | 표준 온톨로지 | 7.5/10 | 설계 선택의 "왜?" 부재 |
| Phase 7 | 응용 | 7/10 | 산업 사례가 결과만 서술, 구현 경로 없음 |
| Phase 8 | 한계/대안 | 8/10 | 01, 05 우수 / 나머지 개선 필요 |

---

## 2. Top 10 학습자 자율성 차단 요소 (심각도순)

### CRITICAL (학습자가 독립적으로 개념 이해/응용 불가)

**Gap 1: Phase 5 — 처음부터 끝까지의 온톨로지 설계 예제 부재**
- 설계 방법론의 개별 기법은 가르치지만, 하나의 도메인에서 "문제 정의 → CQ 작성 → 클래스 설계 → 속성/공리 → SPARQL 검증"까지 이어지는 완전한 워크스루가 없음
- 학습자는 각 조각은 알지만 조립할 수 없음

**Gap 2: Phase 3 — 추론기(Reasoner) 내부 동작 설명 부재**
- `Bachelor ≡ Adult ⊓ Male ⊓ ¬Married` + `Adult(:John), Male(:John)` → John은 Bachelor (추론됨)
- 하지만 추론기가 이 결론에 HOW 도달하는지 (테이블로 알고리즘이든 직관적 설명이든) 전혀 없음
- 학습자가 추론 실패 시 디버깅 불가

**Gap 3: Phase 7 — 산업 사례가 결과만 서술, 구현 경로 없음**
- 현대/삼성/POSCO 사례: "온톨로지로 부품 추적성 실현" → 하지만 온톨로지 스키마, SPARQL 쿼리, 구현 단계가 없음
- 학습자가 유사 시스템 설계 불가

### MAJOR (학습자가 개념은 이해하나 응용 불가)

**Gap 4: Phase 3-7 — 도구 설정 가이드 완전 부재**
- Protege + HermiT, RDFLib, Jena Fuseki — 설치/설정 문서 없음
- 도구를 못 세팅하면 모든 실습 불가 → 전체 실습 차단

**Gap 5: Phase 4 — RDF/RDFS/OWL 층위를 동일 데이터로 시연하지 않음**
- 같은 Triple 세트를 RDF, RDFS, OWL로 각각 해석했을 때 무엇이 달라지는지 보여주지 않음
- "층을 쌓는다"고 말하지만 증명하지 않음

**Gap 6: Phase 7 — Graph RAG 구현 전제 지식 미제공**
- 엔티티 링킹, 서브그래프 점수 매기기, 컨텍스트 생성 — 도전 실습에서 요구하지만 본문에서 미설명

**Gap 7: Phase 5 — METHONTOLOGY 3~8단계 나열만 하고 실습 없음**
- 계층 정의, 속성 정의, 제약 정의, 검증 — 각각 주요 주제이나 이름만 언급

**Gap 8: Phase 3 — OWL 2 프로파일(EL/QL/RL) 트레이드오프 분석 불충분**
- 각 프로파일에서 무엇을 잃는지가 설계 결정에 매핑되지 않음

**Gap 9: Phase 5 — 온톨로지 재사용 시 충돌 감지 방법 미시연**
- "공리 충돌 검증해야 한다" → 하지만 충돌이 Protege에서 어떻게 보이는지 미설명

**Gap 10: Phase 6 — 각 표준 온톨로지의 "왜 이렇게 설계했나?" 미분석**
- FOAF, Schema.org, GO, SNOMED CT — 사실 나열은 충분하나 설계 판단의 이유가 없음

---

## 3. 반복 패턴 (Anti-Pattern)

### Anti-Pattern 1: "결과 선언, 메커니즘 부재"
- 가장 빈번한 문제. "온톨로지를 통해 X를 달성한다" → 하지만 어떻게?
- Phase 7 산업사례, Phase 6 표준 온톨로지 분석에서 집중 발생

### Anti-Pattern 2: "실습이 본문을 초과"
- 도전 실습이 본문에서 가르치지 않은 지식을 요구
- Phase 3 도전2 (SNOMED CT 프로파일), Phase 5 설계 실습, Phase 7 약물 안전 시스템

### Anti-Pattern 3: "도구 언급만, 사용법 부재"
- Protege, RDFLib, Jena Fuseki, AmiGO — 언급만 되고 설정/사용 가이드 없음

### Anti-Pattern 4: "흔한 오해" 섹션의 약한 패턴
- 현재: 오해 진술 → 부정 → 올바른 답 진술
- 부족: 왜 지적인 사람들이 이 오해를 하는가? 어떤 현실의 측면이 부분적으로 맞는가? 어떤 엣지 케이스가 오류를 드러내는가?

---

## 4. 우수 파일 (참조 기준)

| 파일 | 왜 우수한가 |
|------|-----------|
| `phase-1/01-motivation.mdx` | MI 사례 내러티브, Symbol Grounding Problem 설명, 3개 오해 정정 |
| `phase-7/05-llm-graph-rag.mdx` | 7단계 파이프라인, 수도 코드, 역할 분석, 실패 모드 분석 |
| `phase-8/01-real-costs.mdx` | 구체적 숫자 기반 비용 분석, CYC 실패 사례, ROI 계산법 |
| `phase-8/05-decision-tree.mdx` | 의사결정 노드별 정/부 예시, "잘못 선택하면 어떻게 되는가" |

이 파일들이 공유하는 패턴: **문제 → 시도 → 메커니즘 → 실패 시나리오 → 결론**

---

## 5. 보강 패턴 카탈로그

### Pattern A: "메커니즘 딥다이브" (Mechanism Deep-Dive)
```
1. 이 메커니즘이 필요한 문제를 진술
2. 각 내부 단계를 "왜 이 단계가 필요한가?"와 함께 워크스루
3. 이 단계를 빼면 무엇이 깨지는지 보여줌
```
- 적용 대상: Phase 3 추론 과정, Phase 6 GO의 OWL 2 EL 선택 이유

### Pattern B: "의사결정 내러티브" (Decision Narrative)
```
1. 가용한 대안들을 진술
2. 각 대안이 실제로 어떻게 보이는지 보여줌
3. 거부된 대안의 구체적 실패 모드 설명
4. 선택된 접근이 왜 그 실패를 회피하는지 설명
```
- 적용 대상: Phase 6 Schema.org의 RDFS 선택, Phase 5 설계 전략

### Pattern C: "Before/After"
```
1. 기술 없는 구체적 시나리오 서술 (실패 보여줌)
2. 실패 시점의 실제 데이터/프로세스 보여줌
3. 기술 도입
4. 동일 시나리오를 기술 있는 상태로 보여줌 (해결)
5. 무엇이 바뀌었고 왜 작동하는지 명시
```
- 적용 대상: Phase 7 산업사례, Phase 2 속성/공리

### Pattern D: "워크스루" (Walkthrough)
```
1. 시작 상태 정의
2. 각 단계를 순서대로 진행
3. 각 단계에서: 어떤 결정이 이루어지고, 왜 그 결정인지, 다른 선택은 왜 문제인지
4. 종료 상태와 원래 질문에 대한 답변 검증
```
- 적용 대상: Phase 5 CQ→설계→검증, Phase 7 공급망

### Pattern E: "연결 다리" (Connection Bridge)
```
1. 이론/메커니즘 명확히 진술 (기존 내용)
2. "이것을 알면 독립적으로 할 수 있는 것" 섹션 추가
3. 학습자가 직접 실행 가능한 최소 시나리오 제공
4. "신호" — 언제 이것을 적용하고 언제 하지 않는지 판단 기준 명시
```
- 적용 대상: Phase 3 OWA/CWA, Phase 4 직렬화/도구, Phase 8 기술 비교

---

## 6. SPEC 배치 계획

### 구현 순서 및 배치

| SPEC ID | 대상 Phase | 파일 수 | 핵심 패턴 | 우선순위 |
|---------|-----------|--------|----------|---------|
| SPEC-ENHANCE-P7 | Phase 7 응용 | 3-4 files | Before/After, Walkthrough | 1순위 |
| SPEC-ENHANCE-P6 | Phase 6 표준 온톨로지 | 3 files | Decision Narrative, Deep-Dive | 2순위 |
| SPEC-ENHANCE-P5 | Phase 5 설계 방법론 | 3 files | Walkthrough (end-to-end) | 3순위 |
| SPEC-ENHANCE-P2P3 | Phase 2-3 기초/논리 | 4-5 files | Before/After, Deep-Dive | 4순위 |
| SPEC-ENHANCE-P4P8 | Phase 4, 8 나머지 | 3-4 files | Connection Bridge | 5순위 |
| SPEC-ENHANCE-INFRA | 도구 설정 가이드 | 1 new file | Setup guide reference page | 병행 |

### 상세 배치

**SPEC-ENHANCE-P7 (1순위 — 가장 가시적 효과)**
- `content/phase-7/06-industry-applications.mdx`: 현대 용접 결함 Before/After + SPARQL 쿼리
- `content/phase-7/02-knowledge-graphs.mdx`: Google KG의 "Paris" 엔티티 해소 메커니즘
- `content/phase-7/03-search-recommendation.mdx`: 온톨로지 없는 검색 실패 시나리오

**SPEC-ENHANCE-P6 (2순위 — 독립적 온톨로지 분석 능력)**
- `content/phase-6/03-schema-org.mdx`: "왜 OWL 아니고 RDFS?" Decision Narrative
- `content/phase-6/04-gene-ontology.mdx`: OWL 2 EL 성능 비교, 트리→DAG 필요성
- `content/phase-6/06-comparative.mdx`: 하나의 도메인으로 5개 온톨로지 접근법 비교

**SPEC-ENHANCE-P5 (3순위 — 핵심 역량)**
- `content/phase-5/02-competency-questions.mdx`: 도메인→CQ→클래스→SPARQL 전체 워크스루
- `content/phase-5/03-design-strategies.mdx`: Middle-out 실전 시나리오
- `content/phase-5/05-anti-patterns.mdx`: 각 안티패턴의 Before/After

**SPEC-ENHANCE-P2P3 (4순위 — 기초 강화)**
- `content/phase-2/03-axioms.mdx`: 추론 체인 단계별 시연
- `content/phase-3/01-description-logic.mdx`: 추론기 동작 직관적 설명
- `content/phase-3/02-owa-cwa.mdx`: Protege 실험 워크스루
- `content/phase-3/05-owl2-profiles.mdx`: 프로파일별 트레이드오프 구체화

**SPEC-ENHANCE-P4P8 (5순위 — 마무리)**
- `content/phase-4/01-rdf.mdx`: 동일 Triple의 RDF/RDFS/OWL 3계층 시연
- `content/phase-8/02-mapping-problems.mdx`: 매핑 도구 시연
- `content/phase-8/04-technology-comparison.mdx`: Connection Bridge 추가

**SPEC-ENHANCE-INFRA (병행)**
- 새 파일: `content/reference/tool-setup.mdx` — Protege, RDFLib, Jena Fuseki 설정 가이드

---

## 7. 총 규모 추정

- 유의미한 보강 필요 파일: 15~18개
- 경미한 보완 필요 파일: 8~10개
- 변경 불필요 (참조 수준): 4개
- 파일당 추가 분량: 약 60~120줄 (워크스루 섹션, Before/After 시나리오)
- 필요 SPEC 수: 5~6개 배치 + 1개 인프라

---

## 8. 리스크 평가

| 리스크 | 심각도 | 완화 방안 |
|--------|--------|----------|
| 컨텐츠 드리프트 (보강이 후속 Phase와 불일치) | MEDIUM | 각 보강은 해당 Phase까지 소개된 개념만 사용 |
| 깊이 과잉 (인지 부하 증가) | LOW-MEDIUM | 핵심 개념에만 딥다이브, 입문 개념은 Before/After만 |
| 한국어 문체 불일치 | LOW | phase-1/01-motivation.mdx의 톤을 벤치마크로 사용 |
| Mermaid 구문 오류 | MEDIUM | edu-skill.md의 안전 구문 가이드 엄격 준수 |
| 범위 확대 (SPEC creep) | LOW | 기존 내용 삭제/재구조화 금지, 추가(additive) 변경만 허용 |

---

## 9. 결론

이 교육 플랫폼은 구조적으로 잘 설계되어 있고 개념 설명의 기본기가 탄탄합니다. 핵심 문제는 **"무엇(WHAT)"에서 "어떻게(HOW)"와 "왜 이것이지(WHY THIS)"로의 전환이 부족**한 것입니다.

5개 보강 패턴(메커니즘 딥다이브, 의사결정 내러티브, Before/After, 워크스루, 연결 다리)을 체계적으로 적용하면, 학습자가 혼자서도 기술의 의미를 알고 응용할 수 있는 수준으로 끌어올릴 수 있습니다.

가장 효과적인 시작점은 Phase 7 산업 사례(가시성 높음)이고, 가장 영향력 있는 작업은 Phase 5 전체 워크스루 추가입니다.
