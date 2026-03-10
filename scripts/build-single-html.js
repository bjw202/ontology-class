#!/usr/bin/env node

/**
 * Single HTML Builder
 * 모든 MDX 콘텐츠를 단일 HTML 파일로 빌드합니다
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')
const contentDir = path.join(rootDir, 'content')

// 간단한 Markdown to HTML 변환기
function markdownToHTML(markdown) {
  let html = markdown

  // 코드 블록 처리
  html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (match, lang, code) => {
    const className = lang ? `language-${lang}` : ''
    return `<pre><code class="${className}">${escapeHTML(code.trim())}</code></pre>`
  })

  // 인라인 코드
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>')

  // 헤딩
  html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>')
  html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>')
  html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>')

  // 굵게
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')

  // 기울임
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>')

  // 링크
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')

  // 순서 없는 리스트
  html = html.replace(/^- (.+)$/gm, '<li>$1</li>')
  html = html.replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>')

  // 순서 있는 리스트
  html = html.replace(/^\d+\. (.+)$/gm, '<li>$1</li>')

  // 인용구
  html = html.replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>')

  // 수평선
  html = html.replace(/^---$/gm, '<hr>')

  // 단락
  html = html.replace(/^(?!<[a-z]).+$/gm, (match) => {
    if (match.trim() && !match.startsWith('<')) {
      return `<p>${match}</p>`
    }
    return match
  })

  return html
}

function escapeHTML(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  }
  return text.replace(/[&<>"']/g, m => map[m])
}

// MDX 프론트매터 제거
function removeFrontmatter(content) {
  return content.replace(/^---\n[\s\S]*?\n---\n/, '')
}

// 콘텐츠 구조 스캔
function scanContentStructure() {
  const structure = {
    index: { title: '홈', file: 'index.mdx' },
    phase1: { title: '1단계: 왜 온톨로지가 필요한가?', files: [] },
    phase2: { title: '2단계: 구성 요소', files: [] },
    phase3: { title: '3단계: 논리적 기초', files: [] },
    phase4: { title: '4단계: 표준과 언어 생태계', files: [] },
    phase5: { title: '5단계: 설계 방법론', files: [] },
    phase6: { title: '6단계: 주요 표준 온톨로지', files: [] },
    phase7: { title: '7단계: 실전 적용', files: [] },
    phase8: { title: '8단계: 한계와 대안', files: [] },
    reference: { title: '참고자료', files: [] }
  }

  // 각 단계의 파일 스캔
  for (let i = 1; i <= 8; i++) {
    const phaseDir = path.join(contentDir, `phase-${i}`)
    if (fs.existsSync(phaseDir)) {
      const files = fs.readdirSync(phaseDir)
        .filter(f => f.endsWith('.mdx'))
        .sort()
      structure[`phase${i}`].files = files
    }
  }

  // 참고자료
  const refDir = path.join(contentDir, 'reference')
  if (fs.existsSync(refDir)) {
    const files = fs.readdirSync(refDir)
      .filter(f => f.endsWith('.mdx'))
      .sort()
    structure.reference.files = files
  }

  return structure
}

// 단일 파일 생성
async function buildSingleHTML() {
  console.log('단일 HTML 파일 빌드를 시작합니다...')

  const structure = scanContentStructure()

  let navHTML = '<nav class="sidebar"><div class="nav-content">'
  let contentHTML = '<div class="main-content">'

  // 메인 페이지
  const indexFile = path.join(contentDir, 'index.mdx')
  if (fs.existsSync(indexFile)) {
    const content = fs.readFileSync(indexFile, 'utf-8')
    const withoutFM = removeFrontmatter(content)
    const html = markdownToHTML(withoutFM)
    navHTML += `<a href="#home" class="nav-link">홈</a>`
    contentHTML += `<section id="home">${html}</section>`
  }

  // 각 단계 처리
  for (let i = 1; i <= 8; i++) {
    const phaseKey = `phase${i}`
    const phase = structure[phaseKey]

    navHTML += `<div class="nav-group">`
    navHTML += `<div class="nav-group-title">${phase.title}</div>`

    for (const file of phase.files) {
      const filePath = path.join(contentDir, `phase-${i}`, file)
      const content = fs.readFileSync(filePath, 'utf-8')
      const withoutFM = removeFrontmatter(content)

      // 제목 추출
      const titleMatch = withoutFM.match(/^#\s+(.+)$/m)
      const title = titleMatch ? titleMatch[1] : file.replace('.mdx', '')
      const sectionId = `phase-${i}-${file.replace('.mdx', '')}`

      const html = markdownToHTML(withoutFM)

      navHTML += `<a href="#${sectionId}" class="nav-link nav-link-sub">${title}</a>`
      contentHTML += `<section id="${sectionId}" class="content-section"><h1>${phase.title}</h1>${html}</section>`
    }

    navHTML += `</div>`
  }

  navHTML += '</div></nav>'
  contentHTML += '</div>'

  // HTML 템플릿
  const htmlTemplate = `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>온톨로지 기초 학습 플랫폼</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
    .container { display: flex; min-height: 100vh; }
    .sidebar { width: 280px; background: #f5f5f5; border-right: 1px solid #ddd; position: fixed; height: 100vh; overflow-y: auto; padding: 20px; }
    .nav-content { display: flex; flex-direction: column; gap: 8px; }
    .nav-group { margin-top: 16px; }
    .nav-group-title { font-weight: bold; color: #666; margin-bottom: 8px; font-size: 14px; }
    .nav-link { display: block; padding: 8px 12px; text-decoration: none; color: #333; border-radius: 6px; transition: background 0.2s; }
    .nav-link:hover { background: #e0e0e0; }
    .nav-link-sub { padding-left: 24px; font-size: 14px; }
    .main-content { margin-left: 280px; padding: 40px; max-width: 800px; }
    .content-section { margin-bottom: 60px; padding-bottom: 40px; border-bottom: 1px solid #eee; }
    h1 { font-size: 2em; margin: 0 0 20px; color: #222; }
    h2 { font-size: 1.5em; margin: 30px 0 15px; color: #333; }
    h3 { font-size: 1.2em; margin: 20px 0 10px; color: #444; }
    p { margin: 15px 0; }
    pre { background: #f4f4f4; padding: 16px; border-radius: 8px; overflow-x: auto; margin: 15px 0; }
    code { background: #f4f4f4; padding: 2px 6px; border-radius: 4px; font-family: 'Consolas', 'Monaco', monospace; font-size: 0.9em; }
    pre code { background: none; padding: 0; }
    blockquote { border-left: 4px solid #ddd; padding-left: 16px; margin: 15px 0; color: #666; }
    ul, ol { margin: 15px 0; padding-left: 24px; }
    li { margin: 8px 0; }
    a { color: #0066cc; text-decoration: none; }
    a:hover { text-decoration: underline; }
    table { width: 100%; border-collapse: collapse; margin: 15px 0; }
    th, td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
    th { background: #f5f5f5; font-weight: bold; }
    hr { margin: 30px 0; border: none; border-top: 1px solid #ddd; }
    @media (max-width: 768px) {
      .sidebar { display: none; }
      .main-content { margin-left: 0; padding: 20px; }
    }
  </style>
</head>
<body>
  <div class="container">
    ${navHTML}
    ${contentHTML}
  </div>
  <script>
    // 부드러운 스크롤
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  </script>
</body>
</html>`

  const outputPath = path.join(rootDir, 'out', 'ontology-single.html')
  fs.mkdirSync(path.dirname(outputPath), { recursive: true })
  fs.writeFileSync(outputPath, htmlTemplate, 'utf-8')

  console.log(`✅ 단일 HTML 파일이 생성되었습니다: ${outputPath}`)
  console.log(`파일 크기: ${(fs.statSync(outputPath).size / 1024).toFixed(2)} KB`)
}

// 실행
buildSingleHTML().catch(console.error)
