#!/usr/bin/env node

/**
 * Static Export Single HTML Bundler
 *
 * Next.js static export로 생성된 /out 디렉토리를 단일 HTML로 번들링합니다.
 * Nextra의 실제 CSS를 인라인하여 개발 서버와 동일한 스타일을 유지하고,
 * Mermaid 다이어그램을 CDN 기반으로 재주입하여 올바르게 렌더링합니다.
 *
 * 사용법:
 *   1. npm run build:export    (Next.js static export 빌드)
 *   2. npm run bundle:single   (이 스크립트 실행)
 *
 * 또는 한 번에:
 *   npm run build:single-full
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')
const outDir = path.join(rootDir, 'out')
const contentDir = path.join(rootDir, 'content')

// ─── CSS 로더 ────────────────────────────────────────────────────────────────

function readNextCSS() {
  const cssDir = path.join(outDir, '_next', 'static', 'css')
  if (!fs.existsSync(cssDir)) {
    console.warn('⚠️  Next.js CSS를 찾을 수 없습니다. npm run build:export를 먼저 실행하세요.')
    return null
  }
  const cssFiles = fs.readdirSync(cssDir).filter(f => f.endsWith('.css'))
  if (cssFiles.length === 0) {
    console.warn('⚠️  CSS 파일이 없습니다.')
    return null
  }
  console.log(`✅ CSS 파일 ${cssFiles.length}개 로드`)
  return cssFiles.map(f => fs.readFileSync(path.join(cssDir, f), 'utf-8')).join('\n')
}

// ─── HTML 콘텐츠 추출 ─────────────────────────────────────────────────────────

function extractArticleContent(html) {
  // Nextra 4.x는 <article> 태그로 콘텐츠 영역을 래핑합니다
  const articleMatch = html.match(/<article[^>]*>([\s\S]*?)<\/article>/i)
  if (articleMatch) return articleMatch[0]

  // 대안: <main> 태그
  const mainMatch = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i)
  if (mainMatch) return mainMatch[0]

  // 대안: nextra-content 클래스
  const nextraMatch = html.match(/<div[^>]*class="[^"]*nextra-content[^"]*"[^>]*>([\s\S]*?)<\/div>/i)
  if (nextraMatch) return nextraMatch[0]

  return null
}

function extractPageTitle(html) {
  const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)
  if (h1Match) {
    // HTML 태그 제거하여 순수 텍스트 추출
    return h1Match[1].replace(/<[^>]+>/g, '').trim()
  }
  const titleMatch = html.match(/<title[^>]*>(.*?)<\/title>/i)
  if (titleMatch) return titleMatch[1].trim()
  return ''
}

// ─── MDX에서 Mermaid 다이어그램 추출 ──────────────────────────────────────────

function extractMermaidCharts(mdxContent) {
  const charts = []

  // 패턴 1: <MermaidDiagram chart={`...`} caption="..." />
  // template literal (백틱)으로 감싸진 chart prop 추출
  const templateLiteralRegex = /<MermaidDiagram[\s\S]*?chart=\{`([\s\S]*?)`\}[\s\S]*?(?:caption="([^"]*)")?[\s\S]*?\/>/g
  let match
  while ((match = templateLiteralRegex.exec(mdxContent)) !== null) {
    charts.push({
      source: match[1].trim(),
      caption: match[2] || null,
    })
  }

  // 패턴 2: <MermaidDiagram chart={"..."} /> (쌍따옴표 버전, 드물게 사용)
  const doubleQuoteRegex = /<MermaidDiagram[\s\S]*?chart=\{"([\s\S]*?)"\}[\s\S]*?\/>/g
  while ((match = doubleQuoteRegex.exec(mdxContent)) !== null) {
    charts.push({
      source: match[1].trim(),
      caption: null,
    })
  }

  // 패턴 3: ```mermaid 펜스 코드 블록 (remark-mermaid 플러그인용)
  const fenceRegex = /```mermaid\n([\s\S]*?)```/g
  while ((match = fenceRegex.exec(mdxContent)) !== null) {
    charts.push({
      source: match[1].trim(),
      caption: null,
    })
  }

  return charts
}

// ─── HTML의 Mermaid 로딩 플레이스홀더 교체 ───────────────────────────────────

function replaceMermaidPlaceholders(html, charts) {
  if (charts.length === 0) return html

  let chartIndex = 0

  // "다이어그램 로딩 중..." 로딩 div를 실제 Mermaid 소스로 교체
  // Next.js static export에서 useEffect 컴포넌트의 초기 상태가 이 형태로 렌더링됨
  const loadingPattern = /<div[^>]*style="[^"]*padding:\s*2rem[^"]*"[^>]*>다이어그램 로딩 중\.\.\.<\/div>/g

  html = html.replace(loadingPattern, () => {
    if (chartIndex >= charts.length) return '<div class="mermaid-missing"><!-- diagram missing --></div>'
    const chart = charts[chartIndex++]
    return buildMermaidBlock(chart.source, chart.caption)
  })

  // 위 패턴으로 못 잡은 경우: figure 태그 안의 비어있는 div도 교체 시도
  // (일부 버전에서 다르게 렌더링될 수 있음)
  const emptyFigurePattern = /<figure[^>]*>\s*<div[^>]*>\s*<\/div>\s*(?:<figcaption[^>]*>([\s\S]*?)<\/figcaption>)?\s*<\/figure>/g
  html = html.replace(emptyFigurePattern, (match, figCaption) => {
    if (chartIndex >= charts.length) return match
    const chart = charts[chartIndex++]
    return buildMermaidBlock(chart.source, figCaption || chart.caption)
  })

  return html
}

function buildMermaidBlock(source, caption) {
  const captionHtml = caption
    ? `<figcaption style="text-align:center;font-size:0.875rem;color:#666;margin-top:0.5rem">${escapeHTML(caption)}</figcaption>`
    : ''
  return `<figure style="margin:1.5rem 0"><pre class="mermaid">${escapeHTML(source)}</pre>${captionHtml}</figure>`
}

function escapeHTML(text) {
  if (!text) return ''
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

// ─── 콘텐츠 구조 정의 ─────────────────────────────────────────────────────────

function getContentStructure() {
  return [
    { key: 'home', title: '홈', type: 'single', mdxPath: 'index.mdx', htmlPath: 'index.html' },
    {
      key: 'phase-1', title: '1단계: 왜 온톨로지가 필요한가?', type: 'group',
      phases: scanPhaseFiles('phase-1')
    },
    {
      key: 'phase-2', title: '2단계: 구성 요소', type: 'group',
      phases: scanPhaseFiles('phase-2')
    },
    {
      key: 'phase-3', title: '3단계: 논리적 기초', type: 'group',
      phases: scanPhaseFiles('phase-3')
    },
    {
      key: 'phase-4', title: '4단계: 표준과 언어 생태계', type: 'group',
      phases: scanPhaseFiles('phase-4')
    },
    {
      key: 'phase-5', title: '5단계: 설계 방법론', type: 'group',
      phases: scanPhaseFiles('phase-5')
    },
    {
      key: 'phase-6', title: '6단계: 주요 표준 온톨로지', type: 'group',
      phases: scanPhaseFiles('phase-6')
    },
    {
      key: 'phase-7', title: '7단계: 실전 적용', type: 'group',
      phases: scanPhaseFiles('phase-7')
    },
    {
      key: 'phase-8', title: '8단계: 한계와 대안', type: 'group',
      phases: scanPhaseFiles('phase-8')
    },
    {
      key: 'phase-9', title: '9단계: 엔터프라이즈 온톨로지 — Palantir', type: 'group',
      phases: scanPhaseFiles('phase-9')
    },
    {
      key: 'reference', title: '참고자료', type: 'group',
      phases: scanPhaseFiles('reference')
    },
    {
      key: 'about', title: '소개', type: 'group',
      phases: scanPhaseFiles('about')
    },
  ]
}

function scanPhaseFiles(dirName) {
  const phaseDir = path.join(contentDir, dirName)
  if (!fs.existsSync(phaseDir)) return []

  return fs.readdirSync(phaseDir)
    .filter(f => f.endsWith('.mdx'))
    .sort()
    .map(file => {
      const baseName = file.replace('.mdx', '')
      const isIndex = baseName === 'index'
      return {
        file,
        mdxPath: path.join(dirName, file),
        // Next.js static export 경로 규칙:
        //   index.mdx  → phase-N.html  (디렉토리 index는 상위 레벨 파일)
        //   XX-name.mdx → phase-N/XX-name.html
        htmlPath: isIndex
          ? `${dirName}.html`
          : path.join(dirName, `${baseName}.html`),
        sectionId: isIndex
          ? `${dirName}-index`
          : `${dirName}-${baseName}`,
        isIndex,
      }
    })
}

// ─── 페이지 처리 ─────────────────────────────────────────────────────────────

function processPage(mdxRelPath, htmlRelPath) {
  const mdxFullPath = path.join(contentDir, mdxRelPath)
  const htmlFullPath = path.join(outDir, htmlRelPath)

  // MDX에서 Mermaid 다이어그램 추출
  let charts = []
  if (fs.existsSync(mdxFullPath)) {
    const mdxContent = fs.readFileSync(mdxFullPath, 'utf-8')
    charts = extractMermaidCharts(mdxContent)
  }

  // Next.js 생성 HTML 읽기
  if (!fs.existsSync(htmlFullPath)) {
    console.warn(`  ⚠️  HTML 없음: ${htmlRelPath}`)
    return null
  }

  const rawHtml = fs.readFileSync(htmlFullPath, 'utf-8')
  const title = extractPageTitle(rawHtml)
  let articleHtml = extractArticleContent(rawHtml)

  if (!articleHtml) {
    console.warn(`  ⚠️  article 콘텐츠를 찾을 수 없음: ${htmlRelPath}`)
    return null
  }

  // Mermaid 플레이스홀더를 실제 다이어그램 소스로 교체
  if (charts.length > 0) {
    articleHtml = replaceMermaidPlaceholders(articleHtml, charts)
    console.log(`  🔷 Mermaid 다이어그램 ${charts.length}개 주입`)
  }

  return { title, html: articleHtml }
}

// ─── 네비게이션 빌더 ──────────────────────────────────────────────────────────

function buildNavigation(structure, pageTitles) {
  let nav = '<nav class="sidebar"><div class="nav-content">'

  for (const section of structure) {
    if (section.type === 'single') {
      const title = pageTitles[section.key] || section.title
      nav += `<a href="#${section.key}" class="nav-link nav-home">${title}</a>`
      continue
    }

    nav += `<div class="nav-group">`
    nav += `<div class="nav-group-title">${section.title}</div>`

    for (const page of section.phases || []) {
      const title = pageTitles[page.sectionId] || page.file.replace('.mdx', '').replace(/^\d+-/, '')
      nav += `<a href="#${page.sectionId}" class="nav-link nav-link-sub">${title}</a>`
    }

    nav += `</div>`
  }

  nav += '</div></nav>'
  return nav
}

// ─── 메인 번들러 ──────────────────────────────────────────────────────────────

async function buildSingleHTML() {
  console.log('\n🚀 Static Export Single HTML 번들러 시작...\n')

  // out 디렉토리 확인
  if (!fs.existsSync(outDir)) {
    console.error('❌ /out 디렉토리가 없습니다.')
    console.error('   먼저 실행하세요: npm run build:export')
    process.exit(1)
  }

  // CSS 로드
  const nextCSS = readNextCSS()

  const structure = getContentStructure()
  const pageTitles = {}
  let contentSections = ''

  // 홈 페이지 처리
  const homeHtmlPath = path.join(outDir, 'index.html')
  if (fs.existsSync(homeHtmlPath)) {
    const homeHtml = fs.readFileSync(homeHtmlPath, 'utf-8')
    const homeTitle = extractPageTitle(homeHtml)
    let homeArticle = extractArticleContent(homeHtml)
    if (homeArticle) {
      const homeMdx = path.join(contentDir, 'index.mdx')
      if (fs.existsSync(homeMdx)) {
        const charts = extractMermaidCharts(fs.readFileSync(homeMdx, 'utf-8'))
        if (charts.length > 0) homeArticle = replaceMermaidPlaceholders(homeArticle, charts)
      }
      pageTitles['home'] = homeTitle || '홈'
      contentSections += `<section id="home" class="content-section">${homeArticle}</section>`
      console.log(`✅ 홈: ${homeTitle}`)
    }
  }

  // 각 섹션 처리
  for (const section of structure) {
    if (section.type === 'single') continue

    for (const page of section.phases || []) {
      const result = processPage(page.mdxPath, page.htmlPath)
      if (result) {
        pageTitles[page.sectionId] = result.title
        contentSections += `<section id="${page.sectionId}" class="content-section">${result.html}</section>`
        console.log(`✅ ${page.sectionId}: ${result.title}`)
      }
    }
  }

  // 네비게이션 생성
  const navHTML = buildNavigation(structure, pageTitles)

  // Fallback CSS (Next.js CSS가 없을 경우)
  const fallbackCSS = getFallbackCSS()
  const inlineCSS = nextCSS || fallbackCSS

  // 최종 HTML 조립
  const finalHTML = `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>온톨로지 기초 학습 플랫폼</title>
  ${nextCSS
    ? `<style id="nextra-styles">${inlineCSS}</style>`
    : `<style id="fallback-styles">${fallbackCSS}</style>`
  }
  <style id="bundle-overrides">
    /* 단일 HTML 번들 레이아웃 오버라이드 */
    body { overflow-x: hidden; }
    .bundle-container { display: flex; min-height: 100vh; }
    .sidebar {
      width: 280px;
      min-width: 280px;
      background: #fafafa;
      border-right: 1px solid #e5e7eb;
      position: fixed;
      top: 0;
      left: 0;
      height: 100vh;
      overflow-y: auto;
      padding: 16px 12px;
      z-index: 10;
    }
    .nav-content { display: flex; flex-direction: column; gap: 4px; }
    .nav-home { font-weight: 600; }
    .nav-group { margin-top: 20px; }
    .nav-group-title {
      font-size: 12px;
      font-weight: 600;
      color: #6b7280;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 6px;
      padding: 0 8px;
    }
    .nav-link {
      display: block;
      padding: 6px 8px;
      text-decoration: none;
      color: #374151;
      border-radius: 6px;
      font-size: 14px;
      transition: background 0.15s;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .nav-link:hover { background: #f3f4f6; color: #111827; }
    .nav-link.active { background: #eff6ff; color: #2563eb; font-weight: 500; }
    .nav-link-sub { padding-left: 16px; }
    .bundle-main {
      margin-left: 280px;
      flex: 1;
      padding: 0;
      min-width: 0;
    }
    .content-section {
      display: none;
      padding: 40px 48px;
      max-width: 860px;
    }
    .content-section.active { display: block; }
    .mermaid { background: transparent; }
    .mermaid svg { max-width: 100%; height: auto; }
    @media (max-width: 768px) {
      .sidebar { display: none; }
      .bundle-main { margin-left: 0; }
      .content-section { padding: 24px 20px; }
    }
  </style>
</head>
<body>
  <div class="bundle-container">
    ${navHTML}
    <main class="bundle-main">
      ${contentSections}
    </main>
  </div>

  <!-- Mermaid.js CDN -->
  <script type="module">
    import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs'
    mermaid.initialize({
      startOnLoad: false,
      theme: 'default',
      securityLevel: 'loose',
    })

    // 현재 활성 섹션의 Mermaid 다이어그램만 렌더링
    async function renderMermaidInSection(section) {
      const diagrams = section.querySelectorAll('pre.mermaid')
      for (const pre of diagrams) {
        if (pre.dataset.rendered) continue
        try {
          const chart = pre.textContent
          const id = 'mermaid-' + Math.random().toString(36).slice(2)
          const { svg } = await mermaid.render(id, chart)
          const fig = pre.closest('figure') || pre
          const figcaption = fig.querySelector('figcaption')
          const wrapper = document.createElement('div')
          wrapper.innerHTML = svg
          if (figcaption) {
            fig.insertBefore(wrapper, figcaption)
          } else {
            fig.appendChild ? fig.appendChild(wrapper) : fig.after(wrapper)
          }
          pre.style.display = 'none'
          pre.dataset.rendered = '1'
        } catch (e) {
          console.error('Mermaid 렌더링 오류:', e)
          pre.style.border = '1px solid #f00'
          pre.style.padding = '1rem'
          pre.style.color = '#c00'
        }
      }
    }

    // 섹션 전환 및 URL 해시 처리
    function showSection(id) {
      const all = document.querySelectorAll('.content-section')
      const links = document.querySelectorAll('.nav-link')
      all.forEach(s => s.classList.remove('active'))
      links.forEach(l => l.classList.remove('active'))

      const target = document.getElementById(id)
      const link = document.querySelector('.nav-link[href="#' + id + '"]')

      if (target) {
        target.classList.add('active')
        renderMermaidInSection(target)
      }
      if (link) {
        link.classList.add('active')
        link.scrollIntoView({ block: 'nearest' })
      }
    }

    // 초기 섹션 표시
    const initialHash = location.hash.slice(1) || 'home'
    showSection(initialHash)

    // 네비게이션 클릭 이벤트
    document.querySelectorAll('.nav-link[href^="#"]').forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault()
        const id = link.getAttribute('href').slice(1)
        history.pushState(null, '', '#' + id)
        showSection(id)
        window.scrollTo(0, 0)
      })
    })

    // 브라우저 뒤로가기/앞으로가기 지원
    window.addEventListener('popstate', () => {
      showSection(location.hash.slice(1) || 'home')
    })
  </script>
</body>
</html>`

  const outputPath = path.join(rootDir, 'out', 'ontology-single.html')
  fs.writeFileSync(outputPath, finalHTML, 'utf-8')

  const sizeKB = (fs.statSync(outputPath).size / 1024).toFixed(1)
  console.log(`\n✅ 단일 HTML 생성 완료: ${outputPath}`)
  console.log(`   파일 크기: ${sizeKB} KB`)
  console.log(`   Mermaid: CDN 방식으로 브라우저에서 렌더링됩니다`)
}

// ─── Fallback CSS ─────────────────────────────────────────────────────────────

function getFallbackCSS() {
  return `
    *, *::before, *::after { box-sizing: border-box; }
    body {
      margin: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
      font-size: 16px;
      line-height: 1.7;
      color: #111827;
      background: #fff;
    }
    h1 { font-size: 2.25rem; font-weight: 700; line-height: 1.2; margin: 0 0 1.5rem; color: #111827; }
    h2 { font-size: 1.75rem; font-weight: 600; margin: 2.5rem 0 1rem; color: #1f2937; border-bottom: 1px solid #e5e7eb; padding-bottom: 0.5rem; }
    h3 { font-size: 1.35rem; font-weight: 600; margin: 2rem 0 0.75rem; color: #374151; }
    h4 { font-size: 1.1rem; font-weight: 600; margin: 1.5rem 0 0.5rem; color: #4b5563; }
    p { margin: 1rem 0; color: #374151; }
    strong { font-weight: 600; color: #111827; }
    em { font-style: italic; }
    a { color: #2563eb; text-decoration: none; }
    a:hover { text-decoration: underline; }
    ul, ol { margin: 1rem 0; padding-left: 1.75rem; }
    li { margin: 0.4rem 0; color: #374151; }
    blockquote {
      margin: 1.5rem 0;
      padding: 1rem 1.25rem;
      border-left: 4px solid #2563eb;
      background: #eff6ff;
      border-radius: 0 8px 8px 0;
      color: #1e40af;
    }
    pre {
      margin: 1.5rem 0;
      padding: 1.25rem 1.5rem;
      background: #1e1e2e;
      border-radius: 8px;
      overflow-x: auto;
      font-size: 0.9rem;
      line-height: 1.6;
    }
    pre code { background: transparent; padding: 0; color: #cdd6f4; font-family: 'Fira Code', 'Consolas', monospace; }
    code {
      background: #f3f4f6;
      color: #e11d48;
      padding: 0.2em 0.4em;
      border-radius: 4px;
      font-size: 0.875em;
      font-family: 'Fira Code', 'Consolas', monospace;
    }
    table { width: 100%; border-collapse: collapse; margin: 1.5rem 0; font-size: 0.95rem; }
    th { background: #f9fafb; font-weight: 600; color: #111827; padding: 0.75rem 1rem; text-align: left; border-bottom: 2px solid #e5e7eb; }
    td { padding: 0.75rem 1rem; border-bottom: 1px solid #f3f4f6; color: #374151; }
    tr:hover td { background: #fafafa; }
    hr { margin: 2.5rem 0; border: none; border-top: 1px solid #e5e7eb; }
    figure { margin: 1.5rem 0; }
    figcaption { text-align: center; font-size: 0.875rem; color: #6b7280; margin-top: 0.5rem; }
    img { max-width: 100%; height: auto; border-radius: 8px; }
  `
}

// ─── 실행 ─────────────────────────────────────────────────────────────────────

buildSingleHTML().catch(err => {
  console.error('❌ 번들링 실패:', err)
  process.exit(1)
})
