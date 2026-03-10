'use client'

import { useEffect, useRef, useState } from 'react'

interface MermaidDiagramProps {
  chart: string
  caption?: string
}

let idCounter = 0
let mermaidInitialized = false

export function MermaidDiagram({ chart, caption }: MermaidDiagramProps) {
  const [svg, setSvg] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const idRef = useRef<string>(`mermaid-diagram-${++idCounter}`)

  useEffect(() => {
    let cancelled = false

    async function renderDiagram() {
      try {
        setIsLoading(true)
        setError(null)

        const mermaid = (await import('mermaid')).default

        if (!mermaidInitialized) {
          const isDark = document.documentElement.classList.contains('dark')
          mermaid.initialize({
            startOnLoad: false,
            theme: isDark ? 'dark' : 'default',
            securityLevel: 'loose',
          })
          mermaidInitialized = true
        }

        // Clean up any existing element with this ID before rendering
        const existing = document.getElementById(idRef.current)
        if (existing) existing.remove()

        // Validate syntax before rendering
        await mermaid.parse(chart)

        const { svg: renderedSvg } = await mermaid.render(idRef.current, chart)
        if (!cancelled) {
          setSvg(renderedSvg)
          setIsLoading(false)
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : '다이어그램 렌더링 오류')
          setIsLoading(false)
        }
      } finally {
        // Clean up any error SVGs Mermaid may have injected into the body
        if (typeof document !== 'undefined') {
          const errorElements = document.querySelectorAll(`#d${idRef.current}, [id^="d${idRef.current}"]`)
          errorElements.forEach(el => el.remove())
          // Also clean up orphaned mermaid error containers
          document.querySelectorAll('svg[aria-roledescription="error"]').forEach(el => {
            const next = el.nextElementSibling
            el.remove()
            if (next && next.tagName === 'STYLE') next.remove()
          })
        }
      }
    }

    renderDiagram()
    return () => { cancelled = true }
  }, [chart])

  if (isLoading) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center', color: '#666', border: '1px dashed #ccc', borderRadius: '8px' }}>
        다이어그램 로딩 중...
      </div>
    )
  }

  if (error) {
    return (
      <div style={{ padding: '1rem', color: '#cc0000', border: '1px solid #cc0000', borderRadius: '8px' }}>
        <strong>다이어그램 오류:</strong> {error}
      </div>
    )
  }

  return (
    <figure style={{ margin: '1.5rem 0' }}>
      <div dangerouslySetInnerHTML={{ __html: svg }} />
      {caption && (
        <figcaption style={{ textAlign: 'center', fontSize: '0.875rem', color: '#666', marginTop: '0.5rem' }}>
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
