import { useState } from 'react'
import { WORD_DICTIONARY } from '../data/wordDictionary'

function tokenize(text) {
  return text.match(/[a-zA-Z']+|[^a-zA-Z]+/g) || []
}

export default function ClickableText({ text, className }) {
  const tokens = tokenize(text)
  const [activeIdx, setActiveIdx] = useState(null)

  return (
    <span className={className} onClick={e => e.stopPropagation()}>
      {tokens.map((tok, i) => {
        if (!/^[a-zA-Z]/.test(tok)) return <span key={i}>{tok}</span>

        const normalized = tok.toLowerCase().replace(/[^a-z']/g, '')
        const translation = WORD_DICTIONARY[normalized]
        if (!translation) return <span key={i}>{tok}</span>

        const isActive = activeIdx === i
        return (
          <span
            key={i}
            className="vocab-word"
            onClick={e => { e.stopPropagation(); setActiveIdx(prev => (prev === i ? null : i)) }}
          >
            {tok}
            {isActive && (
              <span className="vocab-tooltip">
                <span className="vocab-tooltip-text">{translation}</span>
              </span>
            )}
          </span>
        )
      })}
    </span>
  )
}
