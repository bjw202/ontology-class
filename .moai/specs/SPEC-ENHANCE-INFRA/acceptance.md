---
id: SPEC-ENHANCE-INFRA
type: acceptance
version: "1.0.0"
created: "2026-03-10"
updated: "2026-03-10"
---

# SPEC-ENHANCE-INFRA: 인수 기준

## 인수 기준 개요

도구 설정 가이드는 학습자가 **독립적으로** 온톨로지 실습 환경을 구축할 수 있도록 하는 것이 핵심 목표이다. 각 도구 섹션은 별도로 테스트 가능해야 한다.

---

## AC-001: Protege + HermiT 설치 가이드 (REQ-INFRA-001)

### Scenario 1: macOS에서 Protege 설치 및 추론 실행

```gherkin
Given 학습자가 macOS 환경에서 Java 17+이 설치되어 있고
  And tool-setup.mdx의 Protege 섹션을 읽고 있을 때
When 학습자가 안내된 단계를 순서대로 따라 하면
Then Protege가 정상 실행되고
  And HermiT 추론기를 활성화할 수 있고
  And 예제 온톨로지 파일을 열어 추론을 실행할 수 있다
```

### Scenario 2: 흔한 설치 오류 해결

```gherkin
Given 학습자가 Java 버전 충돌 또는 macOS Gatekeeper 차단을 경험했을 때
When 학습자가 "문제 해결" 섹션을 참고하면
Then 해당 오류의 원인과 해결 방법이 명시되어 있고
  And 해결 명령어가 복사-붙여넣기 가능한 형태로 제공된다
```

### 검증 방법

- [ ] Protege 설치 단계가 OS별(macOS/Windows/Linux)로 분기되어 있는가
- [ ] HermiT 활성화 메뉴 경로가 정확히 명시되어 있는가
- [ ] 첫 온톨로지 파일 열기 방법이 포함되어 있는가
- [ ] 흔한 오류 3가지 이상과 해결 방법이 포함되어 있는가
- [ ] Java 17+ 사전 요구사항이 안내되어 있는가

---

## AC-002: Python + RDFLib 환경 설정 (REQ-INFRA-002)

### Scenario 1: 첫 트리플 생성

```gherkin
Given 학습자가 Python 3.11+과 pip이 설치된 환경에서
  And tool-setup.mdx의 RDFLib 섹션을 읽고 있을 때
When 학습자가 pip install 명령어를 실행하고
  And "첫 트리플 생성" 코드를 복사하여 Python에서 실행하면
Then 트리플이 정상적으로 생성되고 출력된다
```

### Scenario 2: Turtle 파싱 및 SPARQL 쿼리

```gherkin
Given 학습자가 RDFLib이 설치된 환경에서
When "Turtle 파싱 + SPARQL" 코드를 복사하여 실행하면
Then Turtle 데이터가 파싱되고
  And SPARQL SELECT 쿼리 결과가 출력된다
```

### Scenario 3: OWL 추론 실행

```gherkin
Given 학습자가 RDFLib과 owlrl이 설치된 환경에서
When "OWL 추론" 코드를 복사하여 실행하면
Then 추론 전/후 트리플 수 차이를 확인할 수 있다
```

### 검증 방법

- [ ] pip/conda 설치 명령어가 완전한 형태로 제공되는가
- [ ] 가상환경 설정 방법이 포함되어 있는가
- [ ] 첫 트리플 생성 코드가 10줄 이내이고 외부 파일 의존 없이 동작하는가
- [ ] SPARQL 쿼리 코드가 10줄 이내이고 복사-붙여넣기로 실행 가능한가
- [ ] owlrl 추론 예제가 포함되어 있는가

---

## AC-003: Apache Jena Fuseki 설정 (REQ-INFRA-003)

### Scenario 1: Fuseki 실행 및 SPARQL 쿼리

```gherkin
Given 학습자가 Java 17+이 설치된 환경에서
  And tool-setup.mdx의 Fuseki 섹션을 읽고 있을 때
When 학습자가 안내된 단계를 따라 Fuseki를 실행하고
  And Web UI에서 데이터셋을 생성하고 Turtle 파일을 업로드하면
Then SPARQL 엔드포인트에서 쿼리를 실행하고 결과를 확인할 수 있다
```

### 검증 방법

- [ ] 다운로드 URL 또는 다운로드 방법이 명시되어 있는가
- [ ] 메모리 모드 실행 명령어가 복사-붙여넣기 가능한가
- [ ] Web UI URL(`http://localhost:3030`)이 안내되어 있는가
- [ ] 데이터셋 생성 및 Turtle 업로드 방법이 설명되어 있는가
- [ ] SPARQL 쿼리 예제가 포함되어 있는가

---

## AC-004: Phase별 도구 매핑 (REQ-INFRA-004)

### Scenario 1: Phase별 도구 확인

```gherkin
Given 학습자가 특정 Phase의 실습을 시작하려 할 때
When tool-setup.mdx의 "이 가이드 활용법" 섹션을 확인하면
Then 해당 Phase에서 필요한 도구가 명확히 표시된 매핑 테이블이 있고
  And 각 도구 설정 섹션으로의 내부 링크(앵커)가 제공된다
```

### 검증 방법

- [ ] Phase 2~7의 도구 매핑 테이블이 포함되어 있는가
- [ ] 각 Phase에서 사용하는 주요 도구가 정확히 매핑되어 있는가
- [ ] 테이블에서 각 도구 섹션으로의 내부 링크가 동작하는가

---

## AC-005: 문서 품질 기준

### 검증 방법 (공통)

- [ ] `content/reference/_meta.js`에 `'tool-setup'` 항목이 추가되었는가
- [ ] `content/reference/tool-setup.mdx` 파일이 생성되었는가
- [ ] MDX frontmatter에 title, description, difficulty가 포함되어 있는가
- [ ] 문서 상단에 버전 정보 및 업데이트 시점이 명시되어 있는가
- [ ] 한국어 존댓말 + 멘토 톤이 일관적으로 유지되는가
- [ ] 기술 용어에 영어 원문이 병기되어 있는가 (예: "추론기(Reasoner)")
- [ ] Mermaid 다이어그램이 안전 구문을 준수하는가
- [ ] 전체 문서 길이가 150~200줄 범위인가
- [ ] 각 섹션이 독립적으로 읽을 수 있는 자기 완결적 구조인가
- [ ] import 문이 포함되어 있지 않은가 (JSX import 금지 규칙 준수)

---

## Definition of Done

- [ ] `content/reference/_meta.js` 수정 완료 (tool-setup 항목 추가)
- [ ] `content/reference/tool-setup.mdx` 생성 완료
- [ ] AC-001 ~ AC-005의 모든 검증 항목 통과
- [ ] Nextra 개발 서버에서 페이지 정상 렌더링 확인
- [ ] Mermaid 다이어그램 정상 렌더링 확인
- [ ] 코드 블록의 언어 태그(python, bash, sparql, turtle) 정확성 확인
