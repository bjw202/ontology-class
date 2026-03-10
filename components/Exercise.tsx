'use client'
import { useState, type ReactNode } from 'react'

interface ExerciseProps {
  difficulty: 'basic' | 'challenge'
  title: string
  children: ReactNode
  solution?: ReactNode
}

export function Exercise({ difficulty, title, children, solution }: ExerciseProps) {
  const [showSolution, setShowSolution] = useState(false)
  const label = difficulty === 'challenge' ? '도전 실습' : '기본 실습'

  return (
    <div className={`exercise exercise--${difficulty}`}>
      <div className="exercise__header-strip" />
      <div className="exercise__body">
        <div className="exercise__title-row">
          <span className="exercise__badge">{label}</span>
          <strong className="exercise__title">{title}</strong>
        </div>
        <div>{children}</div>
        {solution && (
          <div style={{ marginTop: '1rem' }}>
            <button
              onClick={() => setShowSolution(!showSolution)}
              className={`exercise__toggle-btn ${showSolution ? 'exercise__toggle-btn--hide' : 'exercise__toggle-btn--show'}`}
            >
              {showSolution ? '정답 숨기기' : '정답 보기'}
            </button>
            <div className={`exercise__solution-wrapper ${showSolution ? 'exercise__solution-wrapper--visible' : ''}`}>
              <div className="exercise__solution-content">
                {solution}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
