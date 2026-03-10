---
id: SPEC-ENHANCE-INFRA
version: "1.0.0"
status: draft
created: "2026-03-10"
updated: "2026-03-10"
author: jw
priority: high
tags: [enhance, infrastructure, tools, protege, rdflib, fuseki, setup-guide, reference]
---

# SPEC-ENHANCE-INFRA: 도구 설정 가이드 인프라 보강

## 개요

이 SPEC은 전체 보강 시리즈에서 **유일하게 새 파일을 생성**한다 (나머지 SPEC은 기존 파일에 additive 변경). `content/reference/tool-setup.mdx` 파일을 새로 만들어 Protege, RDFLib, Apache Jena Fuseki의 설치 및 기본 설정 가이드를 제공한다.

연구 문서(research.md)에서 식별된 핵심 문제:
- **Gap 4 (MAJOR)**: Phase 3~7 전체에서 도구 설정 가이드가 완전 부재. Protege + HermiT, RDFLib, Jena Fuseki의 설치/설정 문서가 없어 **모든 실습이 차단**됨
- **Anti-Pattern 3**: "도구 언급만, 사용법 부재" -- Protege, RDFLib, Jena Fuseki, AmiGO가 언급만 되고 설정/사용 가이드 없음

**범위 경계**: 이 SPEC은 additive 원칙에 부합한다 (새 파일 생성은 기존 컨텐츠를 변경하지 않음). 도구 설정 페이지는 자기 완결적(self-contained)이어야 하며, 학습자가 다른 Phase를 읽지 않고도 독립적으로 도구를 세팅할 수 있어야 한다.

**실행 시점**: 이 SPEC은 다른 SPEC과 **병행(parallel)** 실행 가능하다. 순서 의존성 없음.

**품질 벤치마크**: `content/phase-4/06-tools.mdx`는 도구 *개요*를 제공하지만 설치/설정 *방법*은 다루지 않는다. 이 SPEC은 그 빈 공간을 메운다.

---

## 환경 (Environment)

### 컨텐츠 플랫폼

- **프레임워크**: Nextra 4.x + Next.js 15 App Router
- **컨텐츠 형식**: MDX 파일, `content/reference/` 디렉토리 (기존 reference 섹션에 추가)
- **컨텐츠 언어**: 한국어 (설명), 영어 (기술 용어 + 한국어 정의 병기)
- **다이어그램 엔진**: Mermaid 11.12.2 (MermaidDiagram 컴포넌트 사용)
- **대상 독자**: Phase 2 이상을 시작하는 학습자 (도구 설정은 Phase 2부터 필요)

### 기존 내비게이션 구조

- `content/_meta.js`: `reference: '참고자료'` 항목 이미 존재
- `content/reference/_meta.js`: glossary, faq, misconceptions, resources, bibliography 항목 존재
- **새 항목 추가 필요**: `content/reference/_meta.js`에 `'tool-setup': '도구 설정 가이드'` 추가

### 도구 참조 현황

`content/phase-4/06-tools.mdx`에서 Protege, RDFLib, Apache Jena/Fuseki를 개요 수준으로 소개하고 있으나, 설치 명령어, 설정 방법, 실행 확인 단계는 없음. 총 14개 파일에서 54회 도구 언급이 있으나 설정 방법 제공은 0건.

---

## 전제 조건 (Assumptions)

### A-001: Nextra 4.x에서 reference 섹션 추가 가능

`content/reference/_meta.js`에 새 항목을 추가하면 내비게이션에 자동 반영된다. 별도 라우팅 설정 변경 불필요.

### A-002: 다중 OS 지원 필요

macOS, Windows, Linux 사용자 모두를 대상으로 한다. 각 도구의 설치 명령어는 OS별로 분기하여 제공한다.

### A-003: Mermaid 안전 구문 준수

모든 Mermaid 다이어그램은 edu-skill.md의 안전 구문 가이드를 준수한다:
- 노드 라벨에 아포스트로피(`'`) 사용 금지
- `stateDiagram-v2`에서 `+` 연산자 사용 금지
- 특수 문자가 있는 라벨은 `["큰따옴표 라벨"]` 사용

### A-004: 최신 안정 버전 기준

문서화 대상 버전:
- Protege 5.6.x (최신 안정 릴리스)
- Python 3.11+ (LTS 급)
- RDFLib 7.x (최신 안정 릴리스)
- owlrl 7.x (OWL 추론 라이브러리)
- Apache Jena Fuseki 4.x (최신 안정 릴리스)
- Java 17+ (Protege/Fuseki 공통 요구)

### A-005: Additive 원칙 부합

새 파일 생성은 기존 컨텐츠를 변경하지 않으므로 additive 원칙에 완전히 부합한다. `_meta.js` 수정은 기존 항목을 변경하지 않고 새 항목만 추가한다.

---

## 요구사항 (Requirements)

### REQ-INFRA-001: Protege + HermiT 설치 및 기본 설정 [CRITICAL]

**WHEN** 학습자가 도구 설정 가이드의 Protege 섹션을 읽을 때,
**THEN** 시스템은 Protege 설치부터 첫 추론 실행까지의 완전한 가이드를 제공해야 한다.

**상세 요구사항**:

1. **설치 방법** (OS별 분기):
   - macOS: `.dmg` 다운로드 및 설치
   - Windows: `.zip` 다운로드 및 압축 해제, `run.bat` 실행
   - Linux: `.tar.gz` 다운로드 및 압축 해제, `run.sh` 실행
   - Java 17+ 사전 설치 필요 안내

2. **HermiT 추론기 활성화 방법**:
   - 메뉴 경로: Reasoner > HermiT 선택
   - 추론 시작: Reasoner > Start Reasoner (또는 Ctrl+R)
   - 추론 결과 확인: 추론된 계층 구조 확인 방법

3. **첫 온톨로지 파일(.owl) 열기**:
   - File > Open으로 `.owl` 또는 `.ttl` 파일 열기
   - 예제 파일 위치 안내 (Protege 내장 pizza.owl 등)

4. **흔한 설치 오류와 해결**:
   - Java 버전 충돌 (Java 8 vs 17)
   - macOS Gatekeeper 차단 해제
   - 메모리 부족 시 `run.bat`/`run.sh`의 JVM 힙 사이즈 조정

### REQ-INFRA-002: Python + RDFLib 환경 설정 [CRITICAL]

**WHEN** 학습자가 도구 설정 가이드의 RDFLib 섹션을 읽을 때,
**THEN** 시스템은 Python 환경 설정부터 첫 SPARQL 쿼리 실행까지의 완전한 가이드를 제공해야 한다.

**상세 요구사항**:

1. **환경 설정**:
   - `pip install rdflib` 또는 `conda install -c conda-forge rdflib`
   - 가상환경 사용 권장 (`python -m venv ontology-env`)

2. **첫 번째 트리플 추가/조회** (10줄 이내 코드):
   - `Graph()` 생성, 네임스페이스 바인딩, 트리플 추가, 출력
   - 복사-붙여넣기로 즉시 실행 가능한 완전한 코드

3. **Turtle 파일 파싱 + SPARQL 쿼리 실행** (10줄 이내 코드):
   - `.ttl` 파일 파싱 후 SPARQL SELECT 쿼리 실행
   - 결과 출력 방법

4. **RDFLib + owlrl 조합 OWL 추론**:
   - `pip install owlrl`
   - owlrl로 OWL RL 추론 실행 방법 (간략 코드 예시)
   - 추론 전/후 트리플 수 비교로 결과 확인

### REQ-INFRA-003: Apache Jena Fuseki SPARQL 엔드포인트 설정 [MAJOR]

**WHEN** 학습자가 도구 설정 가이드의 Fuseki 섹션을 읽을 때,
**THEN** 시스템은 Fuseki 다운로드부터 SPARQL 쿼리 실행까지의 완전한 가이드를 제공해야 한다.

**상세 요구사항**:

1. **다운로드 및 실행**:
   - Apache Jena 다운로드 페이지에서 `apache-jena-fuseki-4.x.x.tar.gz` 다운로드
   - 압축 해제 후 `fuseki-server --update --mem /ds` 로 메모리 모드 실행
   - Java 17+ 사전 설치 필요 안내

2. **데이터셋 생성 및 Turtle 파일 업로드**:
   - Fuseki Web UI (`http://localhost:3030`)에서 데이터셋 생성
   - Turtle 파일 업로드 방법 (Web UI 사용)

3. **SPARQL 엔드포인트 URL 확인 및 쿼리 실행**:
   - 쿼리 엔드포인트: `http://localhost:3030/ds/sparql`
   - Fuseki Web UI에서 SPARQL 쿼리 실행하는 방법
   - 간단한 SELECT 쿼리 예제

### REQ-INFRA-004: Phase별 도구 연결 가이드 [HIGH]

**WHEN** 학습자가 도구 설정 가이드를 읽을 때,
**THEN** 시스템은 각 Phase에서 어떤 도구를 사용하는지 매핑 테이블을 제공해야 한다.

**상세 요구사항**:

1. **Phase-도구 매핑 테이블**:
   - Phase 2~3: Protege (시각적 편집, 클래스/속성 정의, 추론)
   - Phase 4: Protege + RDFLib (직렬화 형식 비교, 코드 기반 처리)
   - Phase 5: Protege (온톨로지 설계, 검증, 품질 평가)
   - Phase 6~7: RDFLib + Fuseki (데이터 처리, SPARQL 쿼리, 산업 응용)

2. **각 Phase 실습에서 도구 설정 가이드로의 내부 링크 안내**:
   - "이 Phase의 실습을 시작하기 전에 [도구 설정 가이드](/reference/tool-setup)에서 [도구명]을 먼저 설정하세요" 형태의 안내문 제안

---

## 제약사항 (Constraints)

### C-001: 무료/오픈소스 도구만 포함

모든 도구는 무료이거나 오픈소스여야 한다. 상용 도구(TopBraid Composer, Stardog 등)는 본 가이드에 포함하지 않는다.

### C-002: 복사-붙여넣기 가능한 완전한 명령어

설치 명령어와 코드 예제는 학습자가 터미널/에디터에 복사-붙여넣기하여 즉시 실행 가능한 형태로 제공한다. 중략(`...`)이나 placeholder 없이 완전한 형태여야 한다.

### C-003: 섹션당 15분 이내 완료 가능 분량

각 도구 설정 섹션(Protege, RDFLib, Fuseki)은 학습자가 15분 이내에 읽고 따라 할 수 있는 분량으로 제한한다.

### C-004: Mermaid 안전 구문 준수

모든 Mermaid 다이어그램은 edu-skill.md의 안전 구문 가이드를 엄격히 준수한다.

### C-005: 한국어 문체 일관성

`content/phase-1/01-motivation.mdx`와 `content/phase-7/05-llm-graph-rag.mdx`의 톤을 벤치마크로 사용한다. 존댓말 + 친근한 멘토 톤 유지.

### C-006: 버전 명시 의무화

모든 도구의 버전을 명시한다. 버전 변경 시 업데이트가 필요하다는 안내를 문서 상단에 포함한다.

---

## 기술 명세 (Specifications)

### 파일 영향 분석

| 파일 | 작업 유형 | 내용 |
|------|----------|------|
| `content/reference/tool-setup.mdx` | **신규 생성** | Protege, RDFLib, Fuseki 설정 가이드 (150~200줄) |
| `content/reference/_meta.js` | **수정** (항목 추가) | `'tool-setup': '도구 설정 가이드'` 항목 추가 |

**총 예상 작업량**: 신규 1개 파일 (150~200줄) + 기존 1개 파일 수정 (1줄 추가)

### 구현 접근법

#### 1. `content/reference/tool-setup.mdx` 구조

```
---
title: 도구 설정 가이드
description: 온톨로지 학습에 필요한 핵심 도구(Protege, RDFLib, Fuseki) 설치 및 설정
difficulty: beginner
---

# 도구 설정 가이드

> 버전 정보 안내 (업데이트 시점 명시)

## 이 가이드 활용법
- Phase별 필요 도구 매핑 테이블 (REQ-INFRA-004)

## 1. Protege + HermiT 추론기 (REQ-INFRA-001)
### 설치
### HermiT 활성화
### 첫 온톨로지 열기
### 문제 해결

## 2. Python + RDFLib (REQ-INFRA-002)
### 환경 설정
### 첫 트리플 생성
### Turtle 파일 파싱 + SPARQL
### OWL 추론 (owlrl)

## 3. Apache Jena Fuseki (REQ-INFRA-003)
### 설치 및 실행
### 데이터 업로드
### SPARQL 쿼리 실행

## 다음 단계
- 각 Phase 학습 안내 링크
```

#### 2. `content/reference/_meta.js` 수정

기존 항목 유지, `'tool-setup': '도구 설정 가이드'` 를 첫 번째 항목으로 추가하여 가장 먼저 보이도록 배치.

### 구현 순서

| 순서 | 작업 | 파일 | 의존성 |
|------|------|------|--------|
| 1 | `_meta.js`에 tool-setup 항목 추가 | `content/reference/_meta.js` | 없음 |
| 2 | `tool-setup.mdx` 작성 (REQ-INFRA-001~004 통합) | `content/reference/tool-setup.mdx` | 순서 1 완료 |

---

## 추적성 (Traceability)

| 요구사항 | Gap (research.md) | Anti-Pattern | 대상 파일 |
|---------|-------------------|-------------|----------|
| REQ-INFRA-001 | Gap 4 (MAJOR) | Anti-Pattern 3 | tool-setup.mdx (신규) |
| REQ-INFRA-002 | Gap 4 (MAJOR) | Anti-Pattern 3 | tool-setup.mdx (신규) |
| REQ-INFRA-003 | Gap 4 (MAJOR) | Anti-Pattern 3 | tool-setup.mdx (신규) |
| REQ-INFRA-004 | Gap 4 (MAJOR) | Anti-Pattern 3 | tool-setup.mdx (신규) |
