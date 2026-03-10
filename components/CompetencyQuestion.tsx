'use client'
import { useState } from 'react'

interface CompetencyQuestionProps {
  question: string
  options: string[]
  answer: number
  explanation: string
  questionNumber?: number
  totalQuestions?: number
}

export function CompetencyQuestion({ question, options, answer, explanation, questionNumber, totalQuestions }: CompetencyQuestionProps) {
  const [selected, setSelected] = useState<number | null>(null)
  const [revealed, setRevealed] = useState(false)
  const isCorrect = selected === answer

  const getOptionClass = (index: number) => {
    let cls = 'competency-question__option'
    if (revealed) {
      if (index === answer) cls += ' competency-question__option--correct'
      else if (index === selected && selected !== answer) cls += ' competency-question__option--incorrect'
    } else if (index === selected) {
      cls += ' competency-question__option--selected'
    }
    return cls
  }

  return (
    <div className="competency-question">
      {questionNumber && totalQuestions && (
        <div className="competency-question__progress">{questionNumber} / {totalQuestions}</div>
      )}
      <p className="competency-question__question">💡 {question}</p>
      <div className="competency-question__options">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => !revealed && setSelected(index)}
            disabled={revealed}
            className={getOptionClass(index)}
          >
            {String.fromCharCode(65 + index)}. {option}
          </button>
        ))}
      </div>
      <button
        onClick={() => setRevealed(true)}
        disabled={revealed}
        className="competency-question__submit-btn"
      >
        정답 확인
      </button>
      {revealed && (
        <div className="competency-question__feedback">
          <p className={`competency-question__feedback-result competency-question__feedback-result--${isCorrect ? 'correct' : 'incorrect'}`}>
            {isCorrect ? '✓ 정답입니다!' : '✗ 오답입니다.'}
          </p>
          <p className="competency-question__explanation">{explanation}</p>
        </div>
      )}
    </div>
  )
}
