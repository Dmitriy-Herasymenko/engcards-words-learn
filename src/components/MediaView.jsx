export default function MediaView({ series, onOpenEpisode }) {
  return (
    <section className="view-section">
      {series.map(s => (
        <div key={s.id} className="media-series-block">
          <div className="media-series-header">
            <span className="media-level-badge">{s.level}</span>
            <h2 className="media-series-title">{s.title}</h2>
            <p className="media-series-desc">{s.description}</p>
          </div>
          <div className="media-episodes-list">
            {s.episodes.map(ep => (
              <button
                key={ep.id}
                className="media-ep-card"
                onClick={() => onOpenEpisode(ep, s.title)}
              >
                <span className="media-ep-num">EP {ep.number}</span>
                <span className="media-ep-title">{ep.title}</span>
                <span className="media-ep-arrow">▶</span>
              </button>
            ))}
          </div>
        </div>
      ))}
    </section>
  )
}
