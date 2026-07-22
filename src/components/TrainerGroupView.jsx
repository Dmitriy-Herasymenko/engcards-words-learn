export default function TrainerGroupView({ group, quizzes, onStartQuiz }) {
  if (!group) return null

  return (
    <section className="view-section">
      <div className="media-series-block">
        <div className="media-series-header">
          <span className="media-level-badge">{group.items.length} тренажери</span>
          <h2 className="media-series-title">{group.title}</h2>
          <p className="media-series-desc">{group.desc}</p>
        </div>
        <div className="media-episodes-list">
          {group.items.map(key => {
            const quiz = quizzes[key]
            return (
              <button
                key={key}
                className="media-ep-card"
                onClick={() => onStartQuiz(key)}
              >
                <span className="media-ep-title">
                  {quiz.short}
                  <span className="media-ep-desc">{quiz.desc}</span>
                </span>
                <span className="media-ep-arrow">▶</span>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
