import { useState } from 'react'

export default function VocabFlashcards({ words, onDone }) {
  const [i, setI] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const w = words[i]
  const isLast = i === words.length - 1

  function next() {
    if (isLast) {
      onDone()
      return
    }
    setFlipped(false)
    setI(n => n + 1)
  }

  function speak() {
    window.speechSynthesis.cancel()
    const u = new SpeechSynthesisUtterance(w.en)
    u.lang = 'en-US'
    window.speechSynthesis.speak(u)
  }

  return (
    <div className="quiz-container vocab-cards">
      <div className="quiz-stage-label">Слова цього етапу · {i + 1} з {words.length}</div>
      <div className={`vocab-card${flipped ? ' flipped' : ''}`} onClick={() => setFlipped(f => !f)}>
        <div className="vocab-card-word">{flipped ? w.ua : w.en}</div>
        <div className="vocab-card-hint">
          {flipped ? 'натисни, щоб побачити слово' : 'натисни, щоб побачити переклад'}
        </div>
      </div>
      <div className="vocab-card-actions">
        <button className="speak-btn" onClick={e => { e.stopPropagation(); speak() }}>🔊</button>
        <button className="quiz-retry-btn quiz-next-stage-btn" onClick={next}>
          {isLast ? 'Почати квіз зі слів ▶' : 'Наступне слово ▶'}
        </button>
      </div>
    </div>
  )
}
