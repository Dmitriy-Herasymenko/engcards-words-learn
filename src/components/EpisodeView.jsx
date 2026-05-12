import { useState, useMemo } from 'react'
import QuizGame from './QuizGame'

function tokenize(text) {
  return text.match(/[a-zA-Z''-]+|[^a-zA-Z]+/g) || []
}

function DialogueLine({ lineIdx, line, vocabulary, savedWords, activeTooltip, onWordClick, onAddWord }) {
  const tokens = useMemo(() => tokenize(line.text), [line.text])

  if (line.type === 'stage') {
    return <div className="dialogue-stage">[{line.text}]</div>
  }

  if (line.type === 'commentary') {
    return (
      <div className="dialogue-commentary">
        <span className="dialogue-speaker">COMMENTARY</span>
        <span>{line.text}</span>
      </div>
    )
  }

  return (
    <div className="dialogue-line">
      {line.speaker && <span className="dialogue-speaker">{line.speaker}</span>}
      <span className="dialogue-text">
        {tokens.map((tok, tokIdx) => {
          if (!/^[a-zA-Z]/.test(tok)) return <span key={tokIdx}>{tok}</span>

          const normalized = tok.toLowerCase().replace(/[^a-z]/g, '')
          const entry = vocabulary.find(v => v.word.toLowerCase() === normalized)
          if (!entry) return <span key={tokIdx}>{tok}</span>

          const isActive = activeTooltip?.lineIdx === lineIdx && activeTooltip?.tokIdx === tokIdx
          const isSaved = savedWords.some(w => w.wordEng === entry.word)

          return (
            <span
              key={tokIdx}
              className={`vocab-word${isSaved ? ' is-saved' : ''}`}
              onClick={e => { e.stopPropagation(); onWordClick(lineIdx, tokIdx) }}
            >
              {tok}
              {isActive && (
                <span className="vocab-tooltip">
                  <span className="vocab-tooltip-text">{entry.translation}</span>
                  {isSaved
                    ? <span className="vocab-in-dict">✓ у словнику</span>
                    : <button
                        className="vocab-add-btn"
                        onClick={e => { e.stopPropagation(); onAddWord(entry) }}
                      >+ у словник</button>
                  }
                </span>
              )}
            </span>
          )
        })}
      </span>
    </div>
  )
}

export default function EpisodeView({ episode, savedWords, onAddWord }) {
  const [tab, setTab] = useState('text')
  const [activeTooltip, setActiveTooltip] = useState(null)

  function handleWordClick(lineIdx, tokIdx) {
    setActiveTooltip(prev =>
      prev?.lineIdx === lineIdx && prev?.tokIdx === tokIdx ? null : { lineIdx, tokIdx }
    )
  }

  return (
    <section className="view-section episode-view">
      <div className="episode-tabs">
        <button
          className={`episode-tab-btn${tab === 'text' ? ' active' : ''}`}
          onClick={() => setTab('text')}
        >📖 Текст</button>
        <button
          className={`episode-tab-btn${tab === 'quiz' ? ' active' : ''}`}
          onClick={() => setTab('quiz')}
        >📝 Квіз</button>
      </div>

      {tab === 'text' && (
        <>
          <div className="episode-hint">
            Натисніть на <span className="vocab-word-demo">підкреслене слово</span> — побачите переклад і зможете додати до словника.
          </div>
          <div className="episode-dialogue" onClick={() => setActiveTooltip(null)}>
            {episode.dialogue.map((line, lineIdx) => (
              <DialogueLine
                key={lineIdx}
                lineIdx={lineIdx}
                line={line}
                vocabulary={episode.vocabulary}
                savedWords={savedWords}
                activeTooltip={activeTooltip}
                onWordClick={handleWordClick}
                onAddWord={onAddWord}
              />
            ))}
          </div>
        </>
      )}

      {tab === 'quiz' && (
        <QuizGame key="ep1-quiz" data={episode.quiz} />
      )}
    </section>
  )
}
