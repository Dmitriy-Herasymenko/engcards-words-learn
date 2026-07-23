import { KIDS_EXPLAINERS } from '../data/kidsExplainers'

export default function KidsExplainer({ quizKey, onStart }) {
  const data = KIDS_EXPLAINERS[quizKey]
  if (!data) return null

  return (
    <div className="kids-explainer">
      <h3 className="kids-explainer-title">{data.title}</h3>
      <p className="kids-explainer-intro">{data.intro}</p>
      <div className="kids-cards">
        {data.cards.map((c, i) => (
          <div className="kids-card" key={i}>
            <div className="kids-card-emoji">{c.emoji}</div>
            <div className="kids-card-body">
              <div className="kids-card-title">{c.title}</div>
              <div className="kids-card-text">{c.text}</div>
              <div className="kids-card-example">{c.example}</div>
            </div>
          </div>
        ))}
      </div>
      {onStart && (
        <button className="kids-start-btn" onClick={onStart}>
          ✅ Я зрозумів! Почати тренажер
        </button>
      )}
    </div>
  )
}
