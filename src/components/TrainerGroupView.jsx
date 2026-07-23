import KidsExplainer from './KidsExplainer'
import { PASS_THRESHOLD } from '../utils/progress'

export default function TrainerGroupView({ group, groupKey, quizzes, progress, onStartQuiz }) {
  if (!group) return null

  const items = group.items
  const firstUnpassed = items.findIndex(k => (progress[k] || 0) < PASS_THRESHOLD)
  const activeIdx = firstUnpassed === -1 ? items.length : firstUnpassed

  return (
    <section className="view-section">
      {activeIdx < items.length && (
        <KidsExplainer
          quizKey={items[activeIdx]}
          onStart={() => onStartQuiz(items[activeIdx])}
        />
      )}
      <div className="media-series-block">
        <div className="media-series-header">
          <span className="media-level-badge">{group.items.length} тренажери</span>
          <h2 className="media-series-title">{group.title}</h2>
          <p className="media-series-desc">{group.desc}</p>
        </div>
        <div className="media-episodes-list">
          {items.map((key, i) => {
            const quiz = quizzes[key]
            const pct = progress[key] || 0
            const passed = pct >= PASS_THRESHOLD
            const locked = i > activeIdx
            return (
              <button
                key={key}
                className={`media-ep-card${locked ? ' locked' : ''}`}
                onClick={() => !locked && onStartQuiz(key)}
                disabled={locked}
              >
                <span className="media-ep-title">
                  {quiz.short}{passed ? ' ✓' : ''}
                  <span className="media-ep-desc">
                    {quiz.desc}{pct > 0 ? ` · ${pct}%` : ''}
                  </span>
                </span>
                <span className="media-ep-arrow">{locked ? '🔒' : '▶'}</span>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
