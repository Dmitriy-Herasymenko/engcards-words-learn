const THEORIES = {
  toBe: {
    title: 'Verb To Be (Шпаргалка)',
    rows: [
      ['Хто?', 'To Be', 'Приклад'],
      [<b>I</b>, 'am', <>I <b>am</b> a dev</>],
      [<b>He/She/It</b>, 'is', <>It <b>is</b> a bug</>],
      [<b>We/You/They</b>, 'are', <>They <b>are</b> fast</>],
    ],
    notes: <>❌ <b>not</b> (isn't/aren't) | ❓ <b>Am/Is/Are</b> на початок</>,
  },
  pronouns: {
    title: 'Personal Pronouns (Займенники)',
    rows: [
      ['Хто?', 'Англійська', 'Особливість'],
      [<b>Я</b>, 'I', 'Завжди з великої'],
      [<b>Він / Вона</b>, 'He / She', 'Тільки для людей'],
      [<b>Воно</b>, 'It', 'Предмети, тварини'],
      [<b>Ми</b>, 'We', 'Я + хтось ще'],
      [<b>Вони</b>, 'They', 'Множина'],
    ],
    notes: <>💡 <b>You</b> — завжди множина в граматиці</>,
  },
  articles: {
    title: 'Articles: A / An / The',
    rows: [
      ['Артикль', 'Коли?', 'Приклад'],
      [<b>A</b>, 'Перед приголосними', <><b>a</b> bug, <b>a</b> dev</>],
      [<b>An</b>, 'Перед голосними', <><b>an</b> apple, <b>an</b> API</>],
      [<b>The</b>, 'Щось конкретне / єдине', <><b>the</b> code is fixed</>],
    ],
    notes: <>💡 <b>A / An</b> — тільки для однини!<br />💡 <b>The</b> — якщо знаємо, про що саме мова.</>,
  },
  articleRules: {
    title: 'Articles: 7 Правил',
    rows: [
      ['Правило', 'Коли?', 'Приклад'],
      [<b>a) A / An</b>, 'Злічуваний іменник в однині', "I've got a car"],
      [<b>b) ---</b>, 'Іменники у множині', "I don't like buses"],
      [<b>c) ---</b>, 'Міста та країни', 'Madrid is in Spain'],
      [<b>d) ---</b>, 'Усталені фрази без артикля', 'by bus, on foot, at work'],
      [<b>e) The</b>, 'Єдиний у своєму роді', 'the moon, the Eiffel Tower'],
      [<b>f) The</b>, 'Усталені фрази з the', 'in the morning, on the right'],
      [<b>g) The</b>, 'Найвищий ступінь порівняння', 'the most beautiful, the worst'],
    ],
    notes: <>💡 Без артикля = поясни чому!<br />💡 <b>---</b> у квізі = без артикля</>,
  },
  presentSimple: {
    title: 'Present Simple (Теперішній час)',
    rows: [
      ['Особа', 'Дія (Verb)', 'Приклад'],
      ['I, You, We, They', <><b>V1</b> (без змін)</>, <>I <b>play</b> games</>],
      ['He, She, It', <><b>V1 + s/es</b></>, <>She <b>plays</b> games</>],
    ],
    notes: <>❌ <b>Don't / Doesn't</b> для заперечення.<br />❓ <b>Do / Does</b> на початку для питання.</>,
  },
}

const COL_LABELS = ['col-0', 'col-1', 'col-2']

export default function TheoryBlock({ type }) {
  const t = THEORIES[type]
  if (!t) return null

  const [headers, ...bodyRows] = t.rows

  return (
    <div className="theory-block">
      <div className="theory-card">
        <h3 style={{ marginTop: 0, color: '#38bdf8' }}>{t.title}</h3>
        <table className="theory-table mobile-optim">
          <thead>
            <tr>
              {headers.map((h, i) => <th key={i}>{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {bodyRows.map((row, ri) => (
              <tr key={ri}>
                {row.map((cell, ci) => (
                  <td key={ci} data-label={headers[ci]}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="theory-notes">{t.notes}</div>
      </div>
    </div>
  )
}
