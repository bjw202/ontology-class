# 단일 HTML 파일로 내보내기: Nextra 문서의 완전한 가이드

## 1. 배경: 이 프로젝트의 기술 스택

### Next.js 15 + Nextra 4.0 + Mermaid 11

이 프로젝트는 세 가지 주요 기술으로 구성되어 있습니다:

- **Next.js 15**: React 기반의 풀스택 프레임워크. SSR(서버 사이드 렌더링)과 클라이언트 컴포넌트를 지원합니다.
- **Nextra 4.0**: Next.js 위에서 동작하는 문서 프레임워크. MDX 파일(Markdown + React)을 자동으로 웹 페이지로 변환해줍니다.
- **Mermaid 11**: 다이어그램 렌더링 라이브러리. 플로우차트, 시퀀스 다이어그램, 클래스 다이어그램 등을 텍스트로 작성하면 SVG로 자동 변환합니다.

### Nextra가 뭔가?

Nextra는 **문서 사이트를 쉽게 만들기 위한 프레임워크**입니다:

```
MDX 파일들 (content/)
    ↓
Nextra가 자동으로 변환
    ↓
완성된 웹사이트 (HTML, CSS, JavaScript)
```

개발자는 마크다운을 작성하면, Nextra가 자동으로 네비게이션, 사이드바, 검색 기능을 추가합니다.

### 왜 단일 HTML이 필요한가?

일반적으로 Nextra 사이트를 배포하려면:
- Vercel 같은 서버가 필요 (Nextra는 동적 기능 사용)
- 또는 정적 HTML을 생성한 후 호스팅

**하지만 때로는 다음과 같은 상황이 발생합니다:**

- 오프라인 환경에서 문서를 공유하고 싶음
- 서버 없이 단순 HTML 파일 하나로 배포하고 싶음
- 이메일이나 USB로 문서를 전달하고 싶음

이런 경우, **모든 HTML 페이지를 하나의 파일로 합치고, 모든 CSS와 JavaScript를 내장**하면 됩니다. 이것이 "단일 HTML 내보내기"입니다.

---

## 2. 왜 Mermaid가 안 렌더링됐나? (핵심 문제)

### Next.js의 렌더링 라이프사이클

Next.js의 작동 방식을 이해해야 이 문제를 해결할 수 있습니다:

1. **서버에서 HTML 생성**: Next.js는 서버에서 React를 실행하여 HTML 문자열을 만듭니다.
2. **브라우저에 전송**: 완성된 HTML을 클라이언트(브라우저)에 전송합니다.
3. **하이드레이션(Hydration)**: 브라우저는 React를 다시 실행하여 이벤트 핸들러 등을 추가합니다.

### `useEffect`는 언제 실행되나?

```
서버에서 React 실행 → HTML 생성 → 브라우저 전송 → 브라우저에서 React 실행 (하이드레이션) → useEffect 실행
```

**핵심: `useEffect`는 브라우저에서만 실행됩니다. 서버에서는 절대 실행되지 않습니다.**

### MermaidDiagram 컴포넌트의 구조

이 프로젝트의 `MermaidDiagram` 컴포넌트는 다음과 같이 동작합니다:

```javascript
'use client'  // 클라이언트 컴포넌트

export function MermaidDiagram({ chart }: { chart: string }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 1. 브라우저에서만 실행됨
    // 2. Mermaid.js를 동적으로 로드
    // 3. 다이어그램을 SVG로 렌더링
    setIsLoading(false);
  }, [chart]);

  if (isLoading) {
    return <div>다이어그램 로딩 중...</div>;
  }

  return <pre className="mermaid">{chart}</pre>;
}
```

### 정적 내보내기 시 발생하는 문제

**정적 HTML 생성 과정:**

1. Next.js가 서버에서 React를 실행
2. `useEffect`는 서버에서 실행되지 않음
3. `isLoading = true` 상태로 HTML이 생성됨
4. 최종 HTML에는 **"다이어그램 로딩 중..."** 텍스트만 포함됨

**단일 HTML 파일에서 발생하는 추가 문제:**

1. 브라우저가 파일을 열 때 React 런타임이 필요함
2. 하지만 단일 HTML에는 React 런타임이 없음
3. 하이드레이션이 일어나지 않음
4. `useEffect`도 실행되지 않음
5. **결과: 영원히 "다이어그램 로딩 중..." 상태**

### 시각적 비교

| 상황 | 과정 | 결과 |
|------|------|------|
| 일반 Next.js 앱 | 서버 → "로딩중..." HTML → 브라우저 → React 하이드레이션 → useEffect 실행 → 실제 다이어그램 | ✅ 다이어그램 표시됨 |
| 단일 HTML 파일 | 서버 → "로딩중..." HTML → 브라우저 → React 없음 → 끝 | ❌ 영원히 로딩중 |
| 우리의 해결책 | 서버 → "로딩중..." HTML → 번들러 스크립트 → Mermaid 다이어그램 소스로 교체 → Mermaid CDN | ✅ 브라우저에서 직접 렌더링 |

---

## 3. 해결 방법의 전체 흐름

### 2단계 프로세스

```
단계 1: npm run build:export
  ↓
Next.js가 정적 HTML 파일 생성 (/out 폴더)
  ↓
단계 2: npm run bundle:single
  ↓
번들러 스크립트가 모든 HTML을 하나로 병합
  ↓
최종 산물: dist/documentation.html (모든 페이지가 포함된 단일 파일)
```

### 번들러 스크립트가 하는 일

`scripts/static-export-bundle.js` 파일이 다음을 수행합니다:

**1단계: CSS 수집**
- `out/_next/static/css/` 폴더의 모든 CSS 파일 읽기
- 이 CSS가 Nextra의 실제 스타일 (색상, 레이아웃, 반응형 디자인)

**2단계: 각 페이지에서 내용 추출**
- Next.js가 만든 HTML 파일에서 `<article>` 태그만 잘라냄
- 헤더, 사이드바, 푸터는 필요 없으므로 제거

**3단계: Mermaid 다이어그램 추출**
- 원본 MDX 파일에서 `<MermaidDiagram chart={...}>` 패턴 찾기
- 다이어그램 소스 코드 추출

**4단계: 다이어그램 교체**
- HTML의 "다이어그램 로딩 중..." div를 찾기
- `<pre class="mermaid">실제 다이어그램 소스</pre>` 로 교체
- Mermaid CDN이 이 `<pre>` 태그를 인식하고 SVG로 변환

**5단계: 사이드바 네비게이션 생성**
- 모든 페이지 목록 수집
- 클릭 가능한 네비게이션 링크 생성
- 현재 페이지 강조 표시

**6단계: 모든 섹션을 하나의 HTML로 조립**
- CSS 스타일을 `<style>` 태그로 인라인 추가
- 모든 페이지 내용을 `<section>` 으로 감싸기
- Mermaid CDN 스크립트 주입
- 사이드바 네비게이션 추가
- 클릭하면 화면을 해당 섹션으로 스크롤하는 JavaScript 추가

---

## 4. 각 파일 설명

### next.config.mjs 수정 내용

**원래 역할**: Next.js 빌드 설정 파일. 프레임워크의 동작을 커스터마이징합니다.

**추가한 것:**
```javascript
// NEXT_STATIC_EXPORT 환경변수가 있을 때만 활성화
if (process.env.NEXT_STATIC_EXPORT === '1') {
  config.output = 'export';
  config.images = { unoptimized: true };
}
```

**`output: 'export'` 가 하는 일**
- 모든 페이지를 정적 HTML 파일로 생성
- 서버 없이도 HTML을 브라우저에서 열 수 있음
- 동적 라우팅(URL 변수)이 불가능해짐

**`images: { unoptimized: true }` 가 필요한 이유**
- Next.js는 보통 이미지를 최적화하기 위해 서버 API 사용
- 정적 export 모드에서는 서버가 없으므로 최적화 불가능
- 따라서 `unoptimized: true` 로 설정하면 원본 이미지 그대로 사용

**왜 환경변수로 조건부 처리?**
- 일반 개발 (`npm run dev`): 서버가 필요하므로 export 비활성화
- 프로덕션 배포 (`npm run build`): 서버 있으므로 export 비활성화
- 정적 내보내기 (`npm run build:export`): export 활성화

### package.json 추가된 스크립트

**`build:export`**: 정적 HTML 생성
```
NEXT_STATIC_EXPORT=1 next build
```
- 환경변수를 설정하고 Next.js 빌드 실행
- `/out` 폴더에 정적 HTML 파일들 생성
- 각 페이지가 별도의 HTML 파일로 생성됨

**`bundle:single`**: 단일 HTML로 병합
```
node scripts/static-export-bundle.js
```
- 번들러 스크립트 실행
- `/out`에서 모든 HTML을 하나로 합치기
- `dist/documentation.html` 생성

**`build:single-full`**: 전체 과정 한 번에 실행
```
npm run build:export && npm run bundle:single
```
- 두 개의 스크립트를 순서대로 실행
- 편의상 제공하는 스크립트

### scripts/static-export-bundle.js 주요 함수

**`readNextCSS()`**
- `out/_next/static/css/` 폴더의 모든 CSS 파일 읽기
- 파일 내용을 하나의 큰 문자열로 합치기
- 이 CSS가 Nextra의 실제 스타일 (색상, 타이포그래피, 레이아웃 등)

**`extractArticleContent(html)`**
- Next.js가 만든 HTML 파일에서 `<article>` 태그 찾기
- `<article>` 내부의 내용만 추출
- 헤더, 사이드바, 푸터, 메타데이터는 제거

**`extractMermaidCharts(mdxContent)`**
- MDX 원본 파일에서 다이어그램 찾기
- `<MermaidDiagram chart={` 패턴 인식
- 다이어그램 소스 코드 추출
- 예: `graph TD; A --> B;` 형태의 텍스트

**`replaceMermaidPlaceholders(html, charts)`**
- HTML에서 "로딩 중..." div 찾기
- `<pre class="mermaid">실제 다이어그램 소스</pre>` 로 교체
- Mermaid CDN이 나중에 이 `<pre>` 를 SVG로 변환

**최종 HTML 조립**
```
1. <style> 태그에 CSS 인라인
2. <aside> 사이드바 네비게이션 추가
3. <main> 태그에 모든 섹션 추가
4. <script> 태그에 Mermaid CDN 주입
5. <script> 태그에 네비게이션 JavaScript 추가
```

---

## 5. 파일 경로 매핑 (주의할 점)

이 부분이 조금 헷갈릴 수 있습니다. Nextra는 파일 시스템 기반 라우팅을 사용합니다:

| 원본 MDX 파일 | 생성되는 HTML | 설명 |
|-------------|------------|------|
| `content/phase-1/01-motivation.mdx` | `out/phase-1/01-motivation.html` | 직관적 |
| `content/phase-1/index.mdx` | `out/phase-1.html` | 주의! `phase-1/index.html` 아님 |
| `content/index.mdx` | `out/index.html` | 홈페이지 |

**왜 이렇게 될까?**

Next.js 라우팅 규칙:
- 폴더 아래의 `index.js` 는 폴더 경로로 매핑
- 따라서 `phase-1/index.html` 은 자동으로 `phase-1.html` 로 변환

**번들러 스크립트가 알아야 할 규칙:**
- 파일을 읽을 때 이 매핑을 고려해야 함
- `out/phase-1.html` 과 `out/phase-1/index.html` 이 같은 내용이 아님
- 순서가 중요: `out/phase-1.html` 을 먼저 확인하고 없으면 `out/phase-1/index.html` 찾기

---

## 6. Mermaid CDN 방식으로 브라우저에서 렌더링되는 원리

### 최종 HTML의 구조

완성된 `dist/documentation.html` 에는 다음과 같은 구조가 있습니다:

```html
<html>
  <head>
    <style>
      /* 모든 Nextra CSS가 여기 인라인됨 */
      body { ... }
      .sidebar { ... }
      article { ... }
    </style>
  </head>
  <body>
    <aside class="sidebar">
      <!-- 네비게이션 메뉴 -->
      <a href="#phase-1">Phase 1</a>
      <a href="#phase-2">Phase 2</a>
    </aside>

    <main>
      <section id="phase-1">
        <h1>Phase 1</h1>
        <article>
          <!-- 페이지 내용 -->
          <pre class="mermaid">
            graph TD;
            A --> B;
            B --> C;
          </pre>
        </article>
      </section>
    </main>

    <script src="https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.min.js"></script>
    <script>
      mermaid.initialize({ startOnLoad: true });
      mermaid.contentLoaded();
    </script>
  </body>
</html>
```

### 브라우저에서의 렌더링 과정

1. **브라우저가 HTML 파일 열기**
   - 단순 정적 파일이므로 JavaScript 없이 열림
   - CSS 적용됨
   - `<pre class="mermaid">` 태그들이 보임

2. **Mermaid CDN 스크립트 로드**
   - `<script>` 태그가 Mermaid.js 라이브러리 다운로드
   - 자동으로 초기화됨

3. **Mermaid가 `<pre>` 태그 발견**
   - `class="mermaid"` 인 `<pre>` 태그 검색
   - 안의 텍스트 (`graph TD; A --> B;`) 파싱

4. **SVG로 변환 및 렌더링**
   - Mermaid.js가 텍스트를 SVG로 변환
   - `<pre>` 태그를 SVG로 교체
   - 브라우저가 SVG 표시

### React가 없어도 작동하는 이유

Mermaid.js는 **독립적인 라이브러리**입니다:
- React에 의존하지 않음
- DOM API만 사용
- `<pre>` 태그의 텍스트를 읽고 SVG 생성

따라서:
- React 없음 = 상관없음
- Mermaid CDN이 있으면 = 다이어그램 렌더링 됨

---

## 요약

단일 HTML 내보내기의 핵심:

1. **문제**: Next.js 정적 export + useEffect = Mermaid 미렌더링
2. **원인**: React 하이드레이션 없음 = useEffect 미실행
3. **해결책**:
   - 서버에서 "로딩 중..." HTML 생성
   - 번들러가 다이어그램 소스로 교체
   - Mermaid CDN이 브라우저에서 직접 렌더링
4. **결과**: React 없이도 완전한 HTML 파일 하나로 배포 가능

이 접근법은 다음을 가능하게 합니다:
- 🖥️ 오프라인 배포
- 💾 단일 파일 공유
- ⚡ 서버 없이 작동
- 📱 모든 다이어그램이 완벽하게 렌더링됨
