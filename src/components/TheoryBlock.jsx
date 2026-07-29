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
  pastSimple: {
    title: 'Past Simple (Минулий час)',
    rows: [
      ['Тип дієслова', 'Форма', 'Приклад'],
      ['Правильні', <><b>V1 + ed</b></>, <>I <b>worked</b> yesterday</>],
      ['Неправильні', <><b>V2</b> (2-а форма)</>, <>She <b>went</b> home</>],
      ['To Be', <><b>was / were</b></>, <>We <b>were</b> busy</>],
    ],
    notes: <>❌ <b>Didn't</b> + V1 для заперечення.<br />❓ <b>Did</b> + V1 на початку для питання.</>,
  },
  presentContinuous: {
    title: 'Present Continuous (Триває зараз)',
    rows: [
      ['Особа', 'Форма', 'Приклад'],
      ['I', <><b>am + Ving</b></>, <>I <b>am working</b></>],
      ['He/She/It', <><b>is + Ving</b></>, <>She <b>is writing</b></>],
      ['We/You/They', <><b>are + Ving</b></>, <>They <b>are waiting</b></>],
    ],
    notes: <>💡 Слова-маркери: <b>now, right now, at the moment, look!</b><br />❌ <b>am/is/are + not</b> для заперечення.</>,
  },
  futureSimple: {
    title: 'Future Simple (Майбутній час)',
    rows: [
      ['Особа', 'Форма', 'Приклад'],
      ['Будь-яка', <><b>will + V1</b></>, <>I <b>will help</b> you</>],
      ['Заперечення', <><b>won't + V1</b></>, <>She <b>won't come</b></>],
      ['Питання', <><b>Will + ...?</b></>, <><b>Will</b> you help me?</>],
    ],
    notes: <>💡 Слова-маркери: <b>tomorrow, next week, soon, I think...</b><br />💡 <b>Will</b> однакове для всіх осіб.</>,
  },
  presentPerfect: {
    title: 'Present Perfect (Результат зараз)',
    rows: [
      ['Особа', 'Форма', 'Приклад'],
      ['I/You/We/They', <><b>have + V3</b></>, <>I <b>have finished</b></>],
      ['He/She/It', <><b>has + V3</b></>, <>She <b>has sent</b> it</>],
    ],
    notes: <>💡 Слова-маркери: <b>already, just, yet, ever, never</b>.<br />❌ <b>Haven't / Hasn't</b> + V3 для заперечення.</>,
  },
  wordOrderStatement: {
    title: 'Розповідне речення (Порядок слів)',
    rows: [
      ['Хто?', 'Дія', 'Що/Кого?'],
      [<b>I</b>, 'love', 'coffee'],
      [<b>She</b>, 'reads', 'a book'],
      [<b>We</b>, 'live', 'in a city'],
    ],
    notes: <>💡 Завжди спочатку <b>хто</b> (підмет), потім <b>дія</b> (дієслово), потім <b>що</b> (додаток).<br />❌ Ніколи не міняй місцями — це не як в українській!</>,
  },
  wordOrderQuestion: {
    title: 'Питальне речення (Порядок слів)',
    rows: [
      ['Помічник', 'Хто?', 'Дія?'],
      [<b>Do</b>, 'you', 'like coffee?'],
      [<b>Does</b>, 'she', 'read a book?'],
      [<b>Are</b>, 'you', 'ready?'],
    ],
    notes: <>💡 Спочатку — помічник (<b>Do/Does/Is/Are/Can/Will</b>), потім хто, потім дія.<br />❓ Питальне слово (What/Where/When) ставиться на самий початок.</>,
  },
  wordOrderNegative: {
    title: 'Заперечне речення (Порядок слів)',
    rows: [
      ['Хто?', 'Заперечення', 'Дія'],
      [<b>I</b>, "don't", 'love coffee'],
      [<b>She</b>, "doesn't", 'read a book'],
      [<b>They</b>, "aren't", 'ready'],
    ],
    notes: <>💡 Спочатку хто, потім заперечення (<b>don't / doesn't / isn't / aren't</b>), потім дія.<br />❌ Слово "not" не ставиться в кінці речення!</>,
  },
  adjectivesComparison: {
    title: 'Прикметник. Ступені порівняння',
    rows: [
      ['Тип слова', 'Форма', 'Приклад'],
      ['Коротке (1 склад)', <><b>+er / +est</b></>, <>tall → <b>taller</b> → <b>the tallest</b></>],
      ['Довге (2+ склади)', <><b>more / most</b></>, <>beautiful → <b>more beautiful</b> → <b>the most beautiful</b></>],
      ['Виключення', <><b>особлива форма</b></>, <>good → <b>better</b> → <b>the best</b></>],
    ],
    notes: <>💡 Короткі слова (1 склад) — додаємо <b>-er/-est</b>.<br />💡 Довгі слова (2+ склади) — додаємо <b>more/most</b> перед словом.<br />❌ good, bad, far — виключення, вчимо напам'ять!</>,
  },
  prepositionsInOnTo: {
    title: 'Прийменники: In / On / To',
    rows: [
      ['Прийменник', 'Коли?', 'Приклад'],
      [<b>In</b>, 'місяць, рік, місто, кімната', <>in July, <b>in</b> Kyiv, <b>in</b> the room</>],
      [<b>On</b>, 'день, дата, поверхня', <>on Monday, <b>on</b> the table</>],
      [<b>To</b>, 'рух, напрямок (куди?)', <>go <b>to</b> school, <b>to</b> the party</>],
    ],
    notes: <>💡 <b>In</b> — всередині чогось (місяць/місто/кімната).<br />💡 <b>On</b> — на поверхні (стіл/день тижня).<br />💡 <b>To</b> — рух у напрямку (йти/їхати кудись).</>,
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
        <h3 style={{ marginTop: 0, color: 'var(--ink)', textTransform: 'uppercase', letterSpacing: '0.006em', fontWeight: 400 }}>{t.title}</h3>
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
