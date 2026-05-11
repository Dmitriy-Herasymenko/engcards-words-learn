import { useState } from 'react'

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5)
}

export default function QuizGame({ data }) {
  const [questions] = useState(() => shuffle(data))
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const [done, setDone] = useState(false)

  const q = questions[index]

  function answer(opt) {
    if (selected?.correct) return

    if (opt === q.answer) {
      setSelected({ opt, correct: true })
      setTimeout(() => {
        setSelected(null)
        if (index + 1 < questions.length) {
          setIndex(i => i + 1)
        } else {
          setDone(true)
        }
      }, 900)
    } else {
      setSelected({ opt, correct: false })
    }
  }

  function btnClass(opt) {
    if (!selected) return 'option-btn'
    if (selected.correct && opt === q.answer) return 'option-btn correct'
    if (!selected.correct && opt === selected.opt) return 'option-btn wrong'
    return 'option-btn'
  }

  if (done) {
    return (
      <div className="quiz-container">
        <div style={{ fontSize: '28px', textAlign: 'center', padding: '20px 0' }}>
          🎉 Тренування завершено!
        </div>
      </div>
    )
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
                {q.rule && (
                  <span style={{ display: 'block', fontSize: '13px', color: '#94a3b8', marginTop: '4px' }}>
                    📖 {q.rule}
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
