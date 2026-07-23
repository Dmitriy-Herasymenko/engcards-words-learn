import { groupPct, groupPassed, PASS_THRESHOLD } from '../utils/progress'

export default function RoadmapView({ levelOrder, groups, progress, quizzes, onOpenGroup, lockedNotice }) {
  return (
    <section className="view-section">
      <div className="roadmap">
        {lockedNotice && <div className="roadmap-notice">🔒 {lockedNotice}</div>}

        {levelOrder.map((key, idx) => {
          const group = groups[key]
          const pct = groupPct(key, groups, progress)
          const passed = groupPassed(key, groups, progress)
          const unlocked = idx === 0 || groupPassed(levelOrder[idx - 1], groups, progress)

          return (
            <div key={key} className="roadmap-row">
              <div className="roadmap-line">
                <span className={`roadmap-node${passed ? ' done' : ''}${unlocked ? '' : ' locked'}`}>
                  {passed ? '✓' : idx + 1}
                </span>
                {idx < levelOrder.length - 1 && <span className="roadmap-connector" />}
              </div>

              <button
                className={`roadmap-card${unlocked ? '' : ' locked'}`}
                onClick={() => unlocked && onOpenGroup(key)}
                disabled={!unlocked}
              >
                <div className="roadmap-card-top">
                  <span className="roadmap-level-label">Рівень {idx + 1}</span>
                  {!unlocked && <span className="roadmap-lock">🔒</span>}
                </div>
                <h3 className="roadmap-title">{group.title}</h3>
                <p className="roadmap-desc">{group.desc}</p>

                <div className="roadmap-progress-bar">
                  <div className="roadmap-progress-fill" style={{ width: `${pct}%` }} />
                </div>
                <div className="roadmap-progress-label">
                  {unlocked
                    ? `${pct}% пройдено ${passed ? '· рівень відкрито ✓' : `· потрібно ${PASS_THRESHOLD}%+ у кожному тренажері`}`
                    : `Заблоковано — пройди «${groups[levelOrder[idx - 1]].title}» на ${PASS_THRESHOLD}%+`}
                </div>

                {unlocked && (
                  <div className="roadmap-chips">
                    {group.items.map(k => {
                      const p = progress[k] || 0
                      return (
                        <span key={k} className={`roadmap-chip${p >= PASS_THRESHOLD ? ' done' : ''}`}>
                          {quizzes[k].short} {p > 0 ? `${p}%` : ''}
                        </span>
                      )
                    })}
                  </div>
                )}
              </button>
            </div>
          )
        })}
      </div>
    </section>
  )
}
