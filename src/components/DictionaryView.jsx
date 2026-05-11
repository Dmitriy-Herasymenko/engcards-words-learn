export default function DictionaryView({ savedWords, onDelete }) {
  return (
    <section className="view-section">
      <div className="saved-section">
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
      </div>
    </section>
  )
}
