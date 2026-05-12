import { useState } from 'react'

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5)
}

function Results({ questions, mistakes, onRetry }) {
  const correct = questions.length - mistakes.length
  const pct = Math.round((correct / questions.length) * 100)

  return (
    <div className="quiz-container">
      <div className="quiz-results-header">
        <div className="quiz-score">{pct}%</div>
        <div className="quiz-score-label">
          {correct} з {questions.length} правильно
        </div>
      </div>

      {mistakes.length === 0 ? (
        <div className="quiz-perfect">🎉 Жодної помилки! Ідеальний результат!</div>
      ) : (
        <>
          <div className="quiz-mistakes-title">Помилки ({mistakes.length}):</div>
          <ul className="quiz-mistakes-list">
            {mistakes.map((m, i) => (
              <li key={i} className="quiz-mistake-item">
                <div className="quiz-mistake-q">{m.question}</div>
                <div className="quiz-mistake-row">
                  <span className="quiz-mistake-wrong">✗ {m.yourAnswer}</span>
                  <span className="quiz-mistake-correct">✓ {m.answer}</span>
                </div>
                {m.rule && <div className="quiz-mistake-rule">📖 {m.rule}</div>}
              </li>
            ))}
          </ul>
        </>
      )}

      <button className="quiz-retry-btn" onClick={onRetry}>
        🔄 Пройти ще раз
      </button>
    </div>
  )
}

export default function QuizGame({ data }) {
  const [questions, setQuestions] = useState(() => shuffle(data))
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const [mistakes, setMistakes] = useState([])
  const [wrongAttempted, setWrongAttempted] = useState(false)
  const [done, setDone] = useState(false)

  const q = questions[index]

  function answer(opt) {
    if (selected?.correct) return

    if (opt === q.answer) {
      setSelected({ opt, correct: true })
      setTimeout(() => {
        setSelected(null)
        setWrongAttempted(false)
        if (index + 1 < questions.length) {
          setIndex(i => i + 1)
        } else {
          setDone(true)
        }
      }, 900)
    } else {
      setSelected({ opt, correct: false })
      if (!wrongAttempted) {
        setWrongAttempted(true)
        setMistakes(prev => [...prev, { ...q, yourAnswer: opt }])
      }
    }
  }

  function retry() {
    setQuestions(shuffle(data))
    setIndex(0)
    setSelected(null)
    setMistakes([])
    setWrongAttempted(false)
    setDone(false)
  }

  function btnClass(opt) {
    if (!selected) return 'option-btn'
    if (selected.correct && opt === q.answer) return 'option-btn correct'
    if (!selected.correct && opt === selected.opt) return 'option-btn wrong'
    return 'option-btn'
  }

  if (done) {
    return <Results questions={questions} mistakes={mistakes} onRetry={retry} />
  }

  return (
    <div className="quiz-container">
      <div className="feedback">
        <span>Питання {index + 1} з {questions.length}</span>
      </div>
      <div className="quiz-q">{q.question}</div>
      <div className="options-grid">
        {q.options.map(opt => (
          <button key={opt} className={btnClass(opt)} onClick={() => answer(opt)}>
            {opt}
          </button>
        ))}
      </div>
      {selected && (
        <div className="feedback" style={{ marginTop: '15px' }}>
          {selected.correct
            ? <>
                ✨ Правильно!
                {(q.rule || q.hint) && (
                  <span style={{ display: 'block', fontSize: '13px', color: '#94a3b8', marginTop: '4px' }}>
                    {q.rule ? `📖 ${q.rule}` : `💬 ${q.hint}`}
                  </span>
                )}
              </>
            : '❌ Спробуй ще раз'
          }
        </div>
      )}
    </div>
  )
}
