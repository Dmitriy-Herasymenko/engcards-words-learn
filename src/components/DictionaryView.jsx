import { useState } from 'react'

const STUDY_COUNTS = [5, 10, 15]

export default function DictionaryView({ savedWords, onDelete, onStudy }) {
  const [studyCount, setStudyCount] = useState(null)

  function handleStudy() {
    if (!studyCount) return
    const count = studyCount === 'all' ? savedWords.length : studyCount
    onStudy(Math.min(count, savedWords.length))
  }

  return (
    <section className="view-section">
      <div className="saved-section">
        {savedWords.length > 0 && (
          <div className="study-mode-bar">
            <span className="study-mode-label">Вчити слова:</span>
            <div className="study-count-btns">
              {STUDY_COUNTS.map(n => (
                <button
                  key={n}
                  className={`study-count-btn${studyCount === n ? ' active' : ''}${savedWords.length < n ? ' disabled' : ''}`}
                  onClick={() => savedWords.length >= n && setStudyCount(n)}
                >
                  {n}
                </button>
              ))}
              <button
                className={`study-count-btn${studyCount === 'all' ? ' active' : ''}`}
                onClick={() => setStudyCount('all')}
              >
                Всі ({savedWords.length})
              </button>
            </div>
            <button
              className="study-start-btn"
              disabled={!studyCount}
              onClick={handleStudy}
            >
              ▶ Почати
            </button>
          </div>
        )}

        {savedWords.length === 0 ? (
          <div className="dict-empty">Словник порожній. Додавайте слова з карток або епізодів!</div>
        ) : (
          <table>
            <thead>
              <tr>
                <th data-label="English">English</th>
                <th data-label="Українською">Українською</th>
                <th data-label="Дія">Дія</th>
              </tr>
            </thead>
            <tbody>
              {savedWords.map(word => (
                <tr key={word.id}>
                  <td data-label="English"><b>{word.wordEng}</b></td>
                  <td data-label="Українською">{word.wordUA}</td>
                  <td data-label="Дія">
                    <button className="delete-cell-btn" onClick={() => onDelete(word.id)}>
                      Видалити
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  )
}
