'use client'

import { useEffect, useRef, useState } from 'react'

// 동시 렌더링 방지를 위한 전역 직렬화 큐
let renderQueue = Promise.resolve()
let renderCounter = 0

function useIsVisible(ref: React.RefObject<Element | null>) {
  const [isIntersecting, setIsIntersecting] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        observer.disconnect()
        setIsIntersecting(true)
      }
    })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [ref])
  return isIntersecting
}

function renderMermaid(
  chart: string,
  cancelledRef: React.MutableRefObject<boolean>,
  setSvg: (svg: string) => void
) {
  const id = `mermaid-remark-${++renderCounter}-${Date.now()}`
  renderQueue = renderQueue.then(async () => {
    if (cancelledRef.current) return
    try {
      const htmlElement = document.documentElement
      const isDarkTheme =
        htmlElement.classList.contains('dark') ||
        htmlElement.attributes.getNamedItem('data-theme')?.value === 'dark'
      const { default: mermaid } = await import('mermaid')
      mermaid.initialize({
        startOnLoad: false,
        securityLevel: 'loose',
        fontFamily: 'inherit',
        themeCSS: 'margin: 1.5rem auto 0;',
        theme: isDarkTheme ? 'dark' : 'default',
      })
      if (cancelledRef.current) return
      // containerRef를 전달하지 않음 - Mermaid의 container.firstChild race condition 방지
      const { svg: renderedSvg } = await mermaid.render(id, chart.replaceAll('\\n', '\n'))
      if (!cancelledRef.current) {
        setSvg(renderedSvg)
      }
    } catch (error) {
      console.error('Error while rendering mermaid', error)
    } finally {
      try {
        const el = document.getElementById(id)
        if (el) el.remove()
        const wrapper = document.getElementById(`d${id}`)
        if (wrapper) wrapper.remove()
      } catch (_) {
        // DOM 정리 실패는 무시
      }
    }
  })
}

export function Mermaid({ chart }: { chart: string }) {
  const [svg, setSvg] = useState('')
  const containerRef = useRef<HTMLDivElement>(null)
  const isVisible = useIsVisible(containerRef)
  const cancelledRef = useRef(false)

  // 처음 보이거나 chart 변경 시 렌더링
  useEffect(() => {
    if (!isVisible) return
    cancelledRef.current = false
    renderMermaid(chart, cancelledRef, setSvg)
    return () => {
      cancelledRef.current = true
    }
  }, [chart, isVisible])

  // 다크모드 전환 감지
  useEffect(() => {
    if (!isVisible) return
    const htmlElement = document.documentElement
    const observer = new MutationObserver(() => {
      cancelledRef.current = false
      renderMermaid(chart, cancelledRef, setSvg)
    })
    observer.observe(htmlElement, { attributes: true, attributeFilter: ['class', 'data-theme'] })
    return () => {
      observer.disconnect()
      cancelledRef.current = true
    }
  }, [chart, isVisible])

  return <div ref={containerRef} dangerouslySetInnerHTML={{ __html: svg }} />
}
