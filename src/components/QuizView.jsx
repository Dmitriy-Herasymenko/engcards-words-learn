import { useState } from 'react'
import TheoryBlock from './TheoryBlock'
import QuizGame from './QuizGame'
import { PASS_THRESHOLD } from '../utils/progress'

export default function QuizView({ quizData, theory, group, quizzes, activeKey, progress, stageProgress, onNavQuiz, onBackToGroup, onQuizComplete, onStageComplete }) {
  const items = group?.items ?? []
  const pos = items.indexOf(activeKey)
  const prevKey = pos > 0 ? items[pos - 1] : null
  const rawNextKey = pos >= 0 && pos < items.length - 1 ? items[pos + 1] : null
  const currentPassed = (progress?.[activeKey] || 0) >= PASS_THRESHOLD
  const nextKey = rawNextKey && currentPassed ? rawNextKey : null
  const nextLocked = rawNextKey && !currentPassed
  const [showHint, setShowHint] = useState(false)

  return (
    <section className="view-section">
      {group && (
        <div className="quiz-switcher">
          <button
            className="quiz-switcher-btn"
            disabled={!prevKey}
            onClick={() => prevKey && onNavQuiz(prevKey)}
          >
            ◀ {prevKey ? quizzes[prevKey].short : ''}
          </button>
          <button className="quiz-switcher-back" onClick={onBackToGroup}>
            ⤴ До вибору: {group.title}
          </button>
          <button
            className="quiz-switcher-btn"
            disabled={!nextKey}
            title={nextLocked ? `Спочатку пройди цей тренажер на ${PASS_THRESHOLD}%+` : undefined}
            onClick={() => nextKey && onNavQuiz(nextKey)}
          >
            {nextLocked ? `🔒 ${quizzes[rawNextKey].short}` : nextKey ? `${quizzes[nextKey].short} ▶` : ''}
          </button>
        </div>
      )}
      <button className="hint-toggle-btn" onClick={() => setShowHint(s => !s)}>
        {showHint ? '🙈 Сховати підказку' : '💡 Підглянути підказку'}
      </button>
      {showHint && <TheoryBlock type={theory} />}
      <QuizGame
        data={quizData}
        quizKey={activeKey}
        onComplete={pct => onQuizComplete?.(activeKey, pct)}
        initialStageStats={stageProgress}
        onStageComplete={onStageComplete}
      />
    </section>
  )
}
