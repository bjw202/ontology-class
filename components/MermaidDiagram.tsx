'use client'

import { useEffect, useRef, useState } from 'react'

interface MermaidDiagramProps {
  chart: string
  caption?: string
}

let idCounter = 0

export function MermaidDiagram({ chart, caption }: MermaidDiagramProps) {
  const [svg, setSvg] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const idRef = useRef<string>(`mermaid-${++idCounter}`)

  useEffect(() => {
    let cancelled = false

    async function renderDiagram() {
      try {
        setIsLoading(true)
        setError(null)

        const mermaid = (await import('mermaid')).default
        const isDark = document.documentElement.classList.contains('dark')

        mermaid.initialize({
          startOnLoad: false,
          theme: isDark ? 'dark' : 'default',
          securityLevel: 'loose',
        })

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
