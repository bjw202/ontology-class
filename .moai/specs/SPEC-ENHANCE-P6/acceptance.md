# Acceptance Criteria: SPEC-ENHANCE-P6

## AC-001: Schema.org Decision Narrative (REQ-P6-001)

**WHEN** 학습자가 `03-schema-org.mdx`를 읽을 때,
**THEN** "설계 결정: 왜 OWL이 아닌 RDFS인가?" 섹션이 존재해야 한다
**AND** 최소 3개의 대안(OWL-Lite, OWL-DL, OWL-Full)이 RDFS와 비교되어야 한다
**AND** 거부된 각 대안의 구체적 실패 모드가 명시되어야 한다
**AND** 동일한 예제(Person/knows)가 RDFS와 OWL-DL로 각각 표현되어 복잡도 차이가 보여야 한다
**AND** `> **왜 필요한가?**` blockquote가 포함되어야 한다
**AND** 기존 "연결 포인트: Schema.org와 OWL의 관계" blockquote와 내용이 중복되지 않아야 한다

**검증 방법**:
- 파일 내 "설계 결정" 또는 "왜 OWL이 아닌" 제목의 섹션 존재 확인
- 대안 비교표에 4개 이상의 행(RDFS, OWL-Lite, OWL-DL, OWL-Full) 존재 확인
- "실패 모드" 또는 "만약 ~를 선택했다면" 형태의 반사실적 분석 존재 확인
- 추가 분량이 60~90줄 범위인지 확인

---

## AC-002: Gene Ontology OWL 2 EL Deep-Dive (REQ-P6-002)

**WHEN** 학습자가 `04-gene-ontology.mdx`의 OWL 2 EL 섹션을 읽을 때,
**THEN** OWL 2 프로파일 간 성능 비교표가 존재해야 한다
**AND** 비교표에 최소 4개 프로파일(Full, DL, EL, QL 또는 RL)이 포함되어야 한다
**AND** 각 프로파일의 추론 복잡도가 명시되어야 한다
**AND** EL이 NOT 구조를 포기한 트레이드오프가 설명되어야 한다
**AND** GO에서 NOT 표현이 드문 이유가 제시되어야 한다
**AND** ELK 분류기 활용 과정이 간략히 서술되어야 한다
**AND** `> **왜 필요한가?**` blockquote가 포함되어야 한다

**검증 방법**:
- OWL 2 프로파일 비교표 존재 확인 (최소 4행 x 3열)
- "다항 시간(polynomial time)" 또는 "PTIME" 용어 존재 확인
- "NOT" 또는 "보수(complement)" 관련 트레이드오프 설명 존재 확인
- "ELK" 분류기 언급 및 동작 설명 존재 확인
- 삽입 위치가 기존 "GO가 OWL 2 EL을 선택한 이유" 뒤인지 확인

---

## AC-003: 트리에서 DAG로의 전환 메커니즘 (REQ-P6-003)

**WHEN** 학습자가 `04-gene-ontology.mdx`의 DAG 구조 관련 섹션을 읽을 때,
**THEN** 트리 구조의 구체적 한계를 보여주는 사례가 존재해야 한다
**AND** 동일 사례가 DAG에서 어떻게 해결되는지 보여야 한다
**AND** `is_a`, `part_of`, `regulates` 세 가지 관계 타입이 비교 설명되어야 한다
**AND** 트리만 사용했을 때 검색에서 놓치는 결과의 구체적 예시가 있어야 한다
**AND** `> **연결 포인트:**` callout이 Phase 3의 OWL 다중 상속과 연결되어야 한다

**검증 방법**:
- "nuclear envelope" 또는 유사한 다중 부모 사례가 트리/DAG 양쪽으로 설명되는지 확인
- `regulates` 관계에 대한 설명이 `is_a`, `part_of`와 함께 존재하는지 확인
- 트리 구조에서 놓치는 검색 결과의 구체적 예시 존재 확인
- "연결 포인트" callout에서 Phase 3 또는 OWL 다중 상속 언급 확인
- 삽입 위치가 기존 "관계 유형" 서브섹션 뒤인지 확인

---

## AC-004: 동일 도메인 5개 온톨로지 비교 (REQ-P6-004)

**WHEN** 학습자가 `06-comparative.mdx`를 읽을 때,
**THEN** "사람" 개념을 5개 온톨로지로 표현하는 비교 섹션이 존재해야 한다
**AND** FOAF, Dublin Core, Schema.org, Gene Ontology, SNOMED CT 5개 모두가 포함되어야 한다
**AND** Gene Ontology에서 "사람"을 직접 표현할 수 없다는 점이 명시되어야 한다
**AND** 동일한 정보(이름, 소속, 관계 등)를 각 온톨로지에서 어떻게 표현하거나 표현 불가능한지 비교표가 있어야 한다
**AND** Mermaid 다이어그램이 5개 온톨로지의 "사람" 관련 구조를 시각화해야 한다
**AND** `> **왜 필요한가?**` blockquote가 포함되어야 한다
**AND** 온톨로지 매핑의 필요성에 대한 인사이트가 포함되어야 한다

**검증 방법**:
- "사람" 또는 "Person" 비교 섹션 존재 확인
- 5개 온톨로지 모두가 비교표에 포함되는지 확인
- GO에서 "사람" 표현 불가 또는 "범위 밖" 언급 확인
- Mermaid 다이어그램에 아포스트로피 미사용 확인
- Mermaid 다이어그램이 5개 온톨로지 구조를 포함하는지 확인
- `owl:equivalentClass` 또는 `skos:exactMatch` 또는 "매핑" 언급 확인
- 추가 분량이 70~100줄 범위인지 확인

---

## AC-GLOBAL: 전체 품질 기준

**WHEN** SPEC-ENHANCE-P6의 모든 보강이 완료될 때,
**THEN** 다음 전체 품질 기준을 만족해야 한다:

### 구조적 기준

- [ ] 기존 내용이 삭제되거나 변경되지 않음 (Additive 변경만 수행)
- [ ] 3개 파일 모두 정상 렌더링 확인 (MDX 구문 오류 없음)
- [ ] 각 파일의 보강 분량이 60~120줄 범위 내

### 컨텐츠 품질 기준

- [ ] 모든 파일에 `> **왜 필요한가?**` blockquote 1개 이상 포함
- [ ] 모든 파일에 `> **연결 포인트:**` callout 1개 이상 포함
- [ ] Decision Narrative 패턴 적용 파일(03-schema-org, 06-comparative)에 최소 3개 대안 비교
- [ ] Mechanism Deep-Dive 패턴 적용 파일(04-gene-ontology)에 "빼면 깨지는 것" 설명 포함

### 기술적 기준

- [ ] Mermaid 다이어그램에 아포스트로피(`'`) 미사용
- [ ] 모든 기술 용어에 한국어 정의 병기
- [ ] Phase 1~5 및 Phase 6 기존 본문 범위 내 개념만 사용
- [ ] 간소화된 예제에 "개념 이해를 위한 간소화된 예시" 주석 포함

### 문체 기준

- [ ] 존댓말 + 친근한 멘토 톤 유지
- [ ] phase-1/01-motivation.mdx의 문체와 일관성 유지
- [ ] 기존 파일의 서술 스타일과 자연스럽게 연결
