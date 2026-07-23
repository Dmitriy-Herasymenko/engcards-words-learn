import { useState, useMemo } from 'react'

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5)
}

function buildQuestions(words) {
  return shuffle(words).map(w => {
    const distractors = shuffle(words.filter(x => x.en !== w.en)).slice(0, 2).map(x => x.ua)
    return { en: w.en, answer: w.ua, options: shuffle([w.ua, ...distractors]) }
  })
}

export default function VocabQuiz({ words, onDone }) {
  const questions = useMemo(() => buildQuestions(words), [words])
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const [correctCount, setCorrectCount] = useState(0)

  const q = questions[index]

  function answer(opt) {
    if (selected) return
    setSelected(opt)
    if (opt === q.answer) setCorrectCount(c => c + 1)
    setTimeout(() => {
      setSelected(null)
      if (index + 1 < questions.length) {
        setIndex(i => i + 1)
      } else {
        onDone()
      }
    }, 700)
  }

  function btnClass(opt) {
    if (!selected) return 'option-btn'
    if (opt === q.answer) return 'option-btn correct'
    if (opt === selected) return 'option-btn wrong'
    return 'option-btn'
  }

  return (
    <div className="quiz-container">
      <div className="quiz-stage-label">Квіз слів · {index + 1} з {questions.length}</div>
      <div className="quiz-q">Як перекладається «{q.en}»?</div>
      <div className="options-grid">
        {q.options.map(opt => (
          <button key={opt} className={btnClass(opt)} onClick={() => answer(opt)}>
            {opt}
          </button>
        ))}
      </div>
      <div className="feedback" style={{ marginTop: 15 }}>
        Правильно: {correctCount} з {index + (selected ? 1 : 0)}
      </div>
    </div>
  )
}
