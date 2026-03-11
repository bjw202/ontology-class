'use client'

import { useEffect, useRef, useState } from 'react'

interface MermaidDiagramProps {
  chart: string
  caption?: string
}

// 동시 렌더링 방지를 위한 직렬화 큐
let renderQueue = Promise.resolve()
let renderCounter = 0

export function MermaidDiagram({ chart, caption }: MermaidDiagramProps) {
  const [svg, setSvg] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  // useRef로 cancelled 상태 관리 - 큐 콜백에서도 최신값 참조 가능
  const cancelledRef = useRef(false)

  useEffect(() => {
    cancelledRef.current = false
    setIsLoading(true)
    setError(null)

    // 모든 렌더링을 순차적으로 처리하여 동시 실행 방지
    renderQueue = renderQueue.then(async () => {
      if (cancelledRef.current) return

      // 매 렌더마다 고유 ID 생성 (컴포넌트 재마운트/차트 변경 시에도 충돌 없음)
      const id = `mermaid-${++renderCounter}-${Date.now()}`

      try {
        const mermaid = (await import('mermaid')).default

        if (cancelledRef.current) return

        const isDark = document.documentElement.classList.contains('dark')
        mermaid.initialize({
          startOnLoad: false,
          theme: isDark ? 'dark' : 'default',
          securityLevel: 'loose',
        })

        if (cancelledRef.current) return

        await mermaid.parse(chart)

        if (cancelledRef.current) return

        const { svg: renderedSvg } = await mermaid.render(id, chart)

        if (!cancelledRef.current) {
          setSvg(renderedSvg)
          setIsLoading(false)
        }
      } catch (err) {
        if (!cancelledRef.current) {
          setError(err instanceof Error ? err.message : '다이어그램 렌더링 오류')
          setIsLoading(false)
        }
      } finally {
        // Mermaid가 body에 생성한 임시 요소 정리
        try {
          const el = document.getElementById(id)
          if (el) el.remove()
          const wrapper = document.getElementById(`d${id}`)
          if (wrapper) wrapper.remove()
          // 오류 SVG 잔재 정리
          document.querySelectorAll('svg[aria-roledescription="error"]').forEach(el => {
            const next = el.nextElementSibling
            el.remove()
            if (next && next.tagName === 'STYLE') next.remove()
          })
        } catch (_) {
          // DOM 정리 실패는 무시
        }
      }
    })

    return () => {
      cancelledRef.current = true
    }
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
