import { useState } from 'react'

export default function FlashcardView({ words, savedWords, onToggleSave }) {
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [showExample, setShowExample] = useState(false)

  function goTo(next) {
    setIndex(next)
    setFlipped(false)
    setShowExample(false)
  }

  function speak(wordEng) {
    window.speechSynthesis.cancel()
    const u = new SpeechSynthesisUtterance(wordEng)
    u.lang = 'en-US'
    window.speechSynthesis.speak(u)
  }

  const isFinished = index >= words.length
  const word = words[index]
  const isSaved = word ? savedWords.some(w => w.id === word.id) : false

  if (isFinished) {
    return (
      <section className="view-section">
        <div className="card-container">
          <div className="card flipped">
            <div className="card-front" />
            <div className="card-back">Вітаємо! 🎉 Всі слова пройдено!</div>
          </div>
        </div>
        <div className="buttons">
          <button onClick={() => goTo(index - 1)}>Попереднє</button>
          <button disabled>Наступне</button>
        </div>
      </section>
    )
  }

  return (
    <section className="view-section">
      <div className="card-container">
        <div
          className={`card${flipped ? ' flipped' : ''}`}
          onClick={() => setFlipped(f => !f)}
        >
          <div className="card-front">
            <button
              className={`fav-btn${isSaved ? ' active' : ''}`}
              onClick={e => { e.stopPropagation(); onToggleSave(word) }}
            >★</button>
            <div className="word-text">{word.wordEng}</div>
            <div className="word-transc">{word.transcription}</div>
            <button
              className="example-btn"
              onClick={e => { e.stopPropagation(); setShowExample(s => !s) }}
            >
              {showExample ? 'Hide' : 'Context'}
            </button>
            {showExample && <div className="example-text">{word.example}</div>}
            <button
              className="speak-btn"
              onClick={e => { e.stopPropagation(); speak(word.wordEng) }}
            >🔊</button>
          </div>
          <div className="card-back">{word.wordUA}</div>
        </div>
      </div>
      <div className="buttons">
        <button disabled={index === 0} onClick={() => goTo(index - 1)}>Попереднє</button>
        <button onClick={() => goTo(index + 1)}>Наступне</button>
      </div>
    </section>
  )
}
