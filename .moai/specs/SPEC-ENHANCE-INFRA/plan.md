---
id: SPEC-ENHANCE-INFRA
type: plan
version: "1.0.0"
created: "2026-03-10"
updated: "2026-03-10"
---

# SPEC-ENHANCE-INFRA: 구현 계획

## 구현 개요

이 SPEC은 **새 파일 1개 생성 + 기존 파일 1개 수정**으로 구성된 경량 작업이다. 다른 ENHANCE SPEC과 파일 충돌이 없으므로 병행 실행 가능하다.

---

## 마일스톤

### Primary Goal: 내비게이션 등록 및 파일 생성

**작업 1: `content/reference/_meta.js` 수정**

- 기존 항목 목록의 **첫 번째 위치**에 `'tool-setup': '도구 설정 가이드'` 추가
- 기존 항목(glossary, faq, misconceptions, resources, bibliography)은 변경하지 않음
- 변경 후 Nextra 개발 서버에서 내비게이션 반영 확인

**작업 2: `content/reference/tool-setup.mdx` 생성**

REQ-INFRA-001 ~ REQ-INFRA-004를 하나의 파일로 통합 작성:

1. **문서 상단**: frontmatter + 버전 정보 안내 + Phase별 도구 매핑 테이블 (REQ-INFRA-004)
2. **섹션 1 -- Protege + HermiT** (REQ-INFRA-001, 약 50~60줄):
   - OS별 설치 방법 (macOS/Windows/Linux 탭 또는 목록)
   - HermiT 추론기 활성화 메뉴 경로
   - 첫 온톨로지 파일 열기
   - 추론 실행 및 결과 확인
   - 흔한 오류 해결 (Java 버전, macOS Gatekeeper, 메모리)
3. **섹션 2 -- Python + RDFLib** (REQ-INFRA-002, 약 50~60줄):
   - pip/conda 설치, 가상환경 권장
   - 첫 트리플 생성 코드 (완전한 복사-붙여넣기 가능 코드)
   - Turtle 파싱 + SPARQL 쿼리 코드
   - owlrl을 이용한 OWL 추론 코드
4. **섹션 3 -- Apache Jena Fuseki** (REQ-INFRA-003, 약 40~50줄):
   - 다운로드, 압축 해제, 메모리 모드 실행
   - Web UI에서 데이터셋 생성 및 Turtle 업로드
   - SPARQL 엔드포인트 URL 및 쿼리 실행
5. **문서 하단**: 다음 단계 안내 (Phase별 학습 링크)

### Secondary Goal: 기존 Phase 파일과의 연결 확인

- `content/phase-4/06-tools.mdx`가 tool-setup 가이드와 겹치지 않는지 확인
- Phase 4의 도구 "개요"와 reference의 도구 "설정 방법"이 상호보완적인지 검증
- 필요 시 향후 SPEC에서 Phase 파일에 cross-reference 링크 추가 고려 (본 SPEC 범위 외)

---

## 기술 접근법

### 파일 구조 전략

- 3개 도구를 **하나의 MDX 파일**로 통합 (학습자가 한 곳에서 모든 설정을 완료할 수 있도록)
- 각 도구 섹션은 독립적으로 읽을 수 있는 자기 완결적 구조
- 코드 블록은 `python`, `bash`, `sparql`, `turtle` 언어 태그 사용

### 코드 예제 원칙

- 모든 코드는 **복사-붙여넣기 즉시 실행** 가능
- Python 코드는 외부 파일 의존 없이 인라인 데이터로 동작
- SPARQL 쿼리는 Fuseki에서 바로 실행 가능한 형태
- 코드 블록 전후에 "이 코드를 실행하면 다음과 같은 결과를 볼 수 있습니다" 형태의 안내 포함

### 문체 및 톤

- `content/phase-1/01-motivation.mdx`의 존댓말 + 멘토 톤 따름
- 기술 용어는 영어 원문 + 한국어 설명 병기 (예: "추론기(Reasoner)")
- 학습자의 "첫 경험"을 고려한 친절한 안내 (예: "축하합니다! 첫 번째 트리플을 만들었습니다")

---

## 리스크 및 대응

| 리스크 | 심각도 | 대응 방안 |
|--------|--------|----------|
| 도구 버전 업데이트로 설치 방법 변경 | MEDIUM | 문서 상단에 "이 가이드는 YYYY-MM 기준" 명시, 버전 번호 표기 |
| OS별 설치 경험 차이 | LOW | macOS/Windows/Linux 분기 안내, 가장 흔한 OS(macOS) 우선 |
| Nextra _meta.js 항목 순서 영향 | LOW | 기존 항목 순서 유지, tool-setup만 첫 위치에 추가 |
| Java 버전 충돌 (Protege + Fuseki 공통) | MEDIUM | Java 17+ 통일 권장, 버전 확인 명령어(`java -version`) 제공 |

---

## 의존성

- **선행 의존성**: 없음 (완전 독립)
- **병행 가능**: 모든 SPEC-ENHANCE-P* SPEC과 동시 실행 가능
- **후행 영향**: 다른 SPEC의 실습 보강 시 이 가이드로의 링크 추가 가능 (해당 SPEC에서 처리)

---

## 추적성

| 요구사항 | 마일스톤 | 작업 |
|---------|---------|------|
| REQ-INFRA-001 | Primary | 작업 2 -- 섹션 1 (Protege) |
| REQ-INFRA-002 | Primary | 작업 2 -- 섹션 2 (RDFLib) |
| REQ-INFRA-003 | Primary | 작업 2 -- 섹션 3 (Fuseki) |
| REQ-INFRA-004 | Primary | 작업 2 -- 문서 상단 매핑 테이블 |
