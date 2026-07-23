import { PASS_THRESHOLD } from '../utils/progress'

export default function ProgressView({ groups, quizzes, progress }) {
  const allKeys = Object.values(groups).flatMap(g => g.items)
  const passedCount = allKeys.filter(k => (progress[k] || 0) >= PASS_THRESHOLD).length
  const overallPct = allKeys.length
    ? Math.round(allKeys.reduce((s, k) => s + (progress[k] || 0), 0) / allKeys.length)
    : 0

  return (
    <section className="view-section">
      <div className="progress-summary">
        <div className="progress-summary-pct">{overallPct}%</div>
        <div className="progress-summary-label">
          {passedCount} з {allKeys.length} тренажерів пройдено на {PASS_THRESHOLD}%+
        </div>
      </div>

      {Object.entries(groups).map(([groupKey, group]) => (
        <div className="progress-group" key={groupKey}>
          <div className="progress-group-title">{group.title}</div>
          <div className="progress-list">
            {group.items.map(key => {
              const quiz = quizzes[key]
              const pct = progress[key] || 0
              const passed = pct >= PASS_THRESHOLD
              return (
                <div className="progress-row" key={key}>
                  <div className="progress-row-top">
                    <span className="progress-row-name">{quiz.short}{passed ? ' ✓' : ''}</span>
                    <span className={`progress-row-pct${passed ? ' good' : ''}`}>{pct}%</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-bar-fill" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </section>
  )
}
