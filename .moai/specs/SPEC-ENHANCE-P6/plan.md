# Plan: SPEC-ENHANCE-P6 Implementation

## 구현 순서

| 순서 | 요구사항 | 파일 | 패턴 | 우선순위 |
|------|---------|------|------|---------|
| 1 | REQ-P6-002 (OWL 2 EL Deep-Dive) | content/phase-6/04-gene-ontology.mdx | Pattern A | CRITICAL |
| 2 | REQ-P6-003 (트리→DAG 메커니즘) | content/phase-6/04-gene-ontology.mdx | Pattern A | MAJOR |
| 3 | REQ-P6-001 (RDFS Decision Narrative) | content/phase-6/03-schema-org.mdx | Pattern B | CRITICAL |
| 4 | REQ-P6-004 (동일 도메인 5개 비교) | content/phase-6/06-comparative.mdx | Pattern B | MAJOR |

---

## 각 파일 작업 지침

### 1. content/phase-6/04-gene-ontology.mdx (REQ-P6-002, REQ-P6-003)

**REQ-P6-002: OWL 2 프로파일 성능 비교 Deep-Dive**

- **삽입 위치**: 기존 "GO가 OWL 2 EL을 선택한 이유" 서브섹션의 3개 항목(규모, 필요한 표현력, 분류기 활용) 뒤, "GO 활용 사례" 섹션 전
- **예상 추가**: 40~60줄
- **작성 내용**:
  1. `> **왜 필요한가?**` blockquote로 시작: 40,000개 이상의 용어를 가진 온톨로지에서 추론 가능성이 곧 실용성을 결정하는 이유 설명
  2. OWL 2 프로파일 비교표 (5행 x 4열):
     - OWL 2 Full: 표현력 제한 없음, 추론 결정 불가능(undecidable), GO에서 실행 불가
     - OWL 2 DL: 높은 표현력, 최악의 경우 2NEXPTIME, GO 규모에서 수 시간~수 일 소요
     - OWL 2 EL: 교차/존재 제한, 다항 시간(PTIME), GO에 적합 -- 실제 선택
     - OWL 2 QL: 쿼리 최적화, 복잡한 계층 미지원, GO 부적합
     - OWL 2 RL: 규칙 기반, 존재 제한 미지원, GO 부적합
  3. EL이 포기한 것: NOT(보수, complement) 구조 포기 → "~이 아닌 유전자 기능"을 정의할 수 없음 → 하지만 GO에서 이런 정의가 필요한 경우가 극히 드묾
  4. ELK 분류기 활용: 새 GO 용어 추가 시 is_a/part_of 관계를 기반으로 ELK가 계층 내 올바른 위치를 자동으로 추론하는 과정 간략 서술

- **참고**: Phase 3의 OWL 2 프로파일 개념(05-owl2-profiles.mdx)에서 소개된 용어를 사용하되, Phase 3에서 다루지 않은 복잡도 이론 상세는 직관적 비유로 대체

**REQ-P6-003: 트리에서 DAG로의 전환 메커니즘**

- **삽입 위치**: 기존 "관계 유형" 서브섹션(is_a, part_of 설명) 뒤, "GO 용어 (GO Terms)" 섹션 전
- **예상 추가**: 40~60줄
- **작성 내용**:
  1. 문제 진술: 일반 분류 체계(도서관 분류, 생물 분류)가 트리인 이유 간략 설명 → 왜 생물학적 지식은 트리에 맞지 않는가
  2. 구체 사례: `nuclear envelope`를 트리에 배치하면 "핵막" 또는 "세포질의 일부" 중 하나만 선택 → 검색 시 다른 경로의 결과를 놓침
  3. `regulates` 관계 추가 설명: `is_a`와 `part_of` 외에 `regulates`(조절) 관계가 DAG에서만 자연스럽게 표현 가능한 이유
  4. 트리만 사용했을 때의 구체적 실패: "미토콘드리아에서 일어나는 대사 과정" 검색 시 트리 구조가 놓치는 GO 용어들
  5. `> **연결 포인트:**` callout: Phase 3에서 배운 OWL의 다중 상속(multiple inheritance)이 GO의 DAG 구조를 가능하게 한다는 연결

---

### 2. content/phase-6/03-schema-org.mdx (REQ-P6-001)

**REQ-P6-001: Schema.org RDFS 선택 Decision Narrative**

- **삽입 위치**: "약점" 서브섹션의 "형식적 엄밀성 부족" 설명(~268번째 줄 근처) 뒤, "연결 포인트: Schema.org와 OWL의 관계" blockquote(~270번째 줄) 전
- **예상 추가**: 60~90줄
- **작성 내용**:
  1. `> **왜 필요한가?**` blockquote: 형식 언어 선택이 온톨로지의 운명(채택 vs 방치)을 결정하는 이유
  2. 대안 비교표 (4행):
     - RDFS: 타입 계층 + 도메인/레인지 정도, 추론 불필요, 웹 개발자 친화적
     - OWL-Lite: 간단한 제약 + 카디널리티, 약간의 추론 필요, 진입 장벽 중간
     - OWL-DL: 완전한 형식 의미론, 추론기 필수, 웹 개발자 사용 불가
     - OWL-Full: 제한 없음, 결정 불가능, 실용적이지 않음
  3. 동일 예제 비교: `Person`이 `knows`를 통해 다른 `Person`과 연결되는 예제를 RDFS와 OWL-DL 두 가지로 간략 표현 → 복잡도 차이 시각화
  4. 핵심 실패 모드: "만약 Schema.org가 OWL-DL을 선택했다면?" -- 웹 개발자 100만 명이 마크업을 작성할 수 없었을 것, 검색 엔진이 추론 엔진을 내장해야 했을 것
  5. 결론: RDFS의 "약점"(형식적 엄밀성 부족)이 실은 의도적 설계 결정이라는 역설

- **문체 주의**: 기존 03-schema-org.mdx의 톤(존댓말 + 설명적)을 유지. 이미 존재하는 "연결 포인트: Schema.org와 OWL의 관계" blockquote와 내용 중복을 피하고, 해당 blockquote가 자연스러운 결론 역할을 하도록 배치

---

### 3. content/phase-6/06-comparative.mdx (REQ-P6-004)

**REQ-P6-004: 동일 도메인 5개 온톨로지 비교**

- **삽입 위치**: "5개 온톨로지 종합 비교표" 섹션 뒤, "각 온톨로지의 성공 요인" 섹션 전
- **예상 추가**: 70~100줄
- **작성 내용**:
  1. 새 섹션 제목: `## 하나의 개념, 다섯 가지 시선: "사람"을 어떻게 표현하는가?`
  2. `> **왜 필요한가?**` blockquote: 추상적 비교표만으로는 온톨로지 간 차이를 체감할 수 없음. 하나의 구체적 개념으로 비교해야 설계 철학의 차이가 드러남
  3. 비교 대상 정보: "홍길동"이라는 가상 인물 -- 이름, 소속(KAIST), 직업(연구원), 이메일, 다른 사람과의 관계(동료)
  4. 5개 온톨로지 표현 비교표:
     - FOAF: `foaf:Person`, `foaf:name`, `foaf:knows`, `foaf:mbox` -- 소셜 관계 중심
     - Dublin Core: `dcterms:creator` -- 사람 자체가 아닌 "자원의 기여자" 역할로만 등장
     - Schema.org: `schema:Person`, `schema:name`, `schema:jobTitle`, `schema:affiliation`, `schema:sameAs` -- 웹 검색 최적화
     - Gene Ontology: 표현 불가 -- GO는 유전자/단백질 기능 어휘이므로 "사람"은 범위 밖. 다만 GO Annotation에서 연구자 정보가 메타데이터로 기록됨
     - SNOMED CT: 환자 또는 의료진 역할로 표현 -- `Person (person)` 개념이 존재하나 임상 맥락(진단의 대상, 시술의 주체)에서만 의미를 가짐
  5. Mermaid 다이어그램: 5개 온톨로지에서 "사람" 관련 핵심 클래스/속성을 비교하는 그래프 (각 온톨로지를 subgraph로 구분)
  6. 핵심 인사이트 단락: "같은 '홍길동'이지만, FOAF에서는 그가 누구를 아는지가 중요하고, Dublin Core에서는 그가 어떤 문서를 만들었는지가 중요하며, Schema.org에서는 검색 엔진이 그를 어떻게 찾는지가 중요합니다." → 이것이 `owl:equivalentClass`와 `skos:exactMatch`가 필요한 근본적 이유
  7. `> **연결 포인트:**` callout: Phase 6 마지막 비교 분석의 "온톨로지 간의 매핑(Mapping)" 내용과 연결

---

## 품질 체크리스트

### 구조 검증

- [ ] 각 보강 섹션이 기존 흐름의 자연스러운 확장인지 확인
- [ ] 삽입 위치가 정확한지 확인 (기존 섹션의 제목과 내용 기준)
- [ ] 기존 내용이 삭제되거나 변경되지 않았는지 확인

### 컨텐츠 품질

- [ ] 각 파일에 `> **왜 필요한가?**` blockquote가 최소 1개 포함
- [ ] 각 파일에 `> **연결 포인트:**` callout이 최소 1개 포함
- [ ] Decision Narrative (REQ-P6-001, REQ-P6-004)에 최소 3개 대안 비교가 포함
- [ ] Mechanism Deep-Dive (REQ-P6-002, REQ-P6-003)에 "빼면 무엇이 깨지는지" 설명 포함
- [ ] 모든 기술 용어에 한국어 정의 병기 (예: "다항 시간(polynomial time)")

### 분량 검증

- [ ] 04-gene-ontology.mdx 추가 분량: 80~120줄 범위
- [ ] 03-schema-org.mdx 추가 분량: 60~90줄 범위
- [ ] 06-comparative.mdx 추가 분량: 70~100줄 범위

### 기술적 정확성

- [ ] OWL 2 프로파일 복잡도 표기가 정확한지 확인 (EL=PTIME, DL=2NEXPTIME)
- [ ] Mermaid 다이어그램에 아포스트로피 미사용 확인
- [ ] Mermaid 다이어그램에 특수 문자 라벨은 큰따옴표 사용 확인
- [ ] Turtle/RDF 코드 예제가 구문적으로 유효한지 확인

### 문체 검증

- [ ] 존댓말 + 친근한 멘토 톤 유지 확인
- [ ] phase-1/01-motivation.mdx의 톤과 일관성 확인
- [ ] 간소화된 예제에 "개념 이해를 위한 간소화된 예시" 주석 포함 확인

### 의존성 검증

- [ ] Phase 1~5에서 소개된 개념만 사용했는지 확인
- [ ] Phase 6 기존 본문에서 다룬 범위 내 개념만 신규 사용했는지 확인
- [ ] 타 Phase 연결 포인트가 실제 존재하는 내용을 참조하는지 확인
