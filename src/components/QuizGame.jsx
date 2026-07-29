import { useState, useEffect, useMemo } from 'react'
import { PASS_THRESHOLD } from '../utils/progress'
import ClickableText from './ClickableText'

const STAGE_SPLIT_THRESHOLD = 40
const STAGE_COUNT = 3

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5)
}

function chunkStages(data, n) {
  const size = Math.ceil(data.length / n)
  const chunks = []
  for (let i = 0; i < data.length; i += size) chunks.push(data.slice(i, i + size))
  return chunks
}

function Results({ questions, mistakes, onRetry, stageLabel, onNextStage, onBackToStages }) {
  const correct = questions.length - mistakes.length
  const pct = Math.round((correct / questions.length) * 100)

  return (
    <div className="quiz-container">
      {stageLabel && <div className="quiz-stage-label">{stageLabel}</div>}
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

      {stageLabel && pct < PASS_THRESHOLD && (
        <div className="quiz-stage-fail-note">
          Потрібно {PASS_THRESHOLD}%+, щоб відкрити наступний етап — спробуй ще раз 💪
        </div>
      )}

      <div className="quiz-results-actions">
        <button className="quiz-retry-btn" onClick={onRetry}>
          🔄 Пройти ще раз
        </button>
        {onNextStage && (
          <button className="quiz-retry-btn quiz-next-stage-btn" onClick={onNextStage}>
            Наступний етап ▶
          </button>
        )}
        {onBackToStages && (
          <button className="quiz-retry-btn quiz-back-stages-btn" onClick={onBackToStages}>
            ⤴ До етапів
          </button>
        )}
      </div>
    </div>
  )
}

function QuizStage({ questions: sourceQuestions, stageLabel, onFinishStage, onNextStage, onBackToStages }) {
  const [questions, setQuestions] = useState(() => shuffle(sourceQuestions))
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const [mistakes, setMistakes] = useState([])
  const [wrongAttempted, setWrongAttempted] = useState(false)
  const [done, setDone] = useState(false)

  const q = questions[index]

  useEffect(() => {
    if (done) {
      const pct = Math.round(((questions.length - mistakes.length) / questions.length) * 100)
      onFinishStage?.(pct)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done])

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
    setQuestions(shuffle(sourceQuestions))
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
    const pct = Math.round(((questions.length - mistakes.length) / questions.length) * 100)
    return (
      <Results
        questions={questions}
        mistakes={mistakes}
        onRetry={retry}
        stageLabel={stageLabel}
        onNextStage={pct >= PASS_THRESHOLD ? onNextStage : null}
        onBackToStages={onBackToStages}
      />
    )
  }

  return (
    <div className="quiz-container">
      {stageLabel && <div className="quiz-stage-label">{stageLabel}</div>}
      <div className="feedback">
        <span>Питання {index + 1} з {questions.length}</span>
      </div>
      <div className="quiz-q"><ClickableText text={q.question} /></div>
      <div className="quiz-hint-note">💡 Натисни на підкреслене слово, щоб побачити переклад</div>
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
                  <span style={{ display: 'block', fontSize: '13px', color: 'var(--ink-55)', marginTop: '4px' }}>
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

export default function QuizGame({ data, onComplete, initialStageStats, onStageComplete }) {
  const stages = useMemo(
    () => (data.length > STAGE_SPLIT_THRESHOLD ? chunkStages(data, STAGE_COUNT) : [data]),
    [data]
  )
  const multiStage = stages.length > 1

  const [stageIdx, setStageIdx] = useState(multiStage ? null : 0)
  const [stageStats, setStageStats] = useState(() => initialStageStats || {})

  function openStage(i) {
    setStageIdx(i)
  }

  function finishStage(pct) {
    if (!multiStage) {
      onComplete?.(pct)
      return
    }
    const next = { ...stageStats, [stageIdx]: Math.max(stageStats[stageIdx] || 0, pct) }
    setStageStats(next)
    onStageComplete?.(stageIdx, pct)
    const allPassed = stages.every((_, i) => (next[i] || 0) >= PASS_THRESHOLD)
    if (allPassed) {
      const overall = Math.round(
        stages.reduce((s, _, i) => s + (next[i] || 0), 0) / stages.length
      )
      onComplete?.(overall)
    }
  }

  if (multiStage && stageIdx === null) {
    return (
      <div className="quiz-container quiz-stage-picker">
        <div className="quiz-q">Обери етап</div>
        <div className="feedback" style={{ marginBottom: 4 }}>
          У цьому тренажері {data.length} питань — ми розбили їх на {stages.length} етапи, щоб проходити було зручніше
        </div>
        <div className="quiz-stage-list">
          {stages.map((s, i) => {
            const locked = i > 0 && (stageStats[i - 1] || 0) < PASS_THRESHOLD
            return (
              <button
                key={i}
                className={`quiz-stage-btn${locked ? ' locked' : ''}`}
                disabled={locked}
                onClick={() => !locked && openStage(i)}
              >
                <span className="quiz-stage-name">{locked ? `🔒 Етап ${i + 1}` : `Етап ${i + 1}`}</span>
                <span className="quiz-stage-count">{s.length} питань</span>
                {stageStats[i] != null && (
                  <span className={`quiz-stage-score${stageStats[i] >= PASS_THRESHOLD ? ' good' : ''}`}>
                    {stageStats[i]}%
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <QuizStage
      key={stageIdx}
      questions={stages[stageIdx]}
      stageLabel={multiStage ? `Етап ${stageIdx + 1} з ${stages.length}` : null}
      onFinishStage={finishStage}
      onNextStage={multiStage && stageIdx < stages.length - 1 ? () => openStage(stageIdx + 1) : null}
      onBackToStages={multiStage ? () => setStageIdx(null) : null}
    />
  )
}
