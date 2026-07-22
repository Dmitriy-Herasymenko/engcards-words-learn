import { useState, useMemo } from 'react'
import { RESTAURANT_STEPS, DISHES, CHARACTERS, BUDGET } from '../data/restaurantGame'

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function buildMenuOptions(pool) {
  const correctKey = pool[Math.floor(Math.random() * pool.length)]
  const rest = Object.keys(DISHES).filter(k => k !== correctKey)
  const distractors = shuffle(rest).slice(0, 4)
  const keys = shuffle([correctKey, ...distractors])
  return {
    hint: DISHES[correctKey].hint,
    options: keys.map(k => ({ dish: k, correct: k === correctKey })),
  }
}

export default function RestaurantGame() {
  const [stepIndex, setStepIndex] = useState(0)
  const [roundKey, setRoundKey] = useState(0)
  const [wrongPicks, setWrongPicks] = useState([])
  const [correctPick, setCorrectPick] = useState(null)
  const [score, setScore] = useState(0)
  const [order, setOrder] = useState([])

  const total = RESTAURANT_STEPS.length
  const finished = stepIndex >= total
  const step = !finished ? RESTAURANT_STEPS[stepIndex] : null
  const spent = order.reduce((sum, key) => sum + DISHES[key].price, 0)
  const remaining = BUDGET - spent

  const menuData = useMemo(() => {
    if (!step || step.type !== 'menu') return null
    return buildMenuOptions(step.pool)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stepIndex, roundKey])

  const items = useMemo(() => {
    if (!step) return []
    if (step.type === 'menu') return menuData.options
    return shuffle(step.choices)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stepIndex, roundKey, menuData])

  function choose(i, item, dishKey) {
    if (correctPick !== null || wrongPicks.includes(i)) return

    if (item.correct) {
      setCorrectPick(i)
      setScore(s => (wrongPicks.length === 0 ? s + 1 : s))
      if (dishKey) setOrder(o => [...o, dishKey])
      setTimeout(() => {
        setWrongPicks([])
        setCorrectPick(null)
        setStepIndex(idx => idx + 1)
      }, 900)
    } else {
      setWrongPicks(w => [...w, i])
    }
  }

  function restart() {
    setStepIndex(0)
    setRoundKey(k => k + 1)
    setWrongPicks([])
    setCorrectPick(null)
    setScore(0)
    setOrder([])
  }

  if (finished) {
    // If the bill is bigger than the budget, drop the priciest dishes until it fits.
    const kept = [...order]
    const dropped = []
    let billTotal = kept.reduce((sum, key) => sum + DISHES[key].price, 0)
    while (billTotal > BUDGET && kept.length > 0) {
      let pricestIdx = 0
      for (let i = 1; i < kept.length; i++) {
        if (DISHES[kept[i]].price > DISHES[kept[pricestIdx]].price) pricestIdx = i
      }
      const [removed] = kept.splice(pricestIdx, 1)
      dropped.push(removed)
      billTotal -= DISHES[removed].price
    }

    return (
      <section className="view-section">
        <div className="rg-summary">
          <div className="rg-summary-title">🎉 Bon appétit!</div>
          <div className="rg-summary-score">{score} / {total}</div>
          <div className="rg-summary-label">правильних реплік з першої спроби</div>
          {order.length > 0 && (
            <div className="rg-receipt">
              {kept.map((key, i) => {
                const d = DISHES[key]
                return (
                  <div className="rg-receipt-row" key={i}>
                    <img src={d.img} alt={d.name} className="rg-receipt-img" />
                    <span className="rg-receipt-name">{d.name}</span>
                    <span className="rg-receipt-price">${d.price}</span>
                  </div>
                )
              })}
              {dropped.length > 0 && (
                <>
                  <div className="rg-receipt-warning">
                    ⚠️ Не вистачило грошей ($ {BUDGET}) — довелось відмовитись від:
                  </div>
                  {dropped.map((key, i) => {
                    const d = DISHES[key]
                    return (
                      <div className="rg-receipt-row rg-receipt-dropped" key={`d${i}`}>
                        <img src={d.img} alt={d.name} className="rg-receipt-img" />
                        <span className="rg-receipt-name">{d.name}</span>
                        <span className="rg-receipt-price">${d.price}</span>
                      </div>
                    )
                  })}
                </>
              )}
              <div className="rg-receipt-total">
                <span>Total</span>
                <span>${billTotal}</span>
              </div>
              <div className="rg-receipt-budget">
                <span>Бюджет ${BUDGET}</span>
                <span>Залишок ${BUDGET - billTotal}</span>
              </div>
            </div>
          )}
          <button className="rg-restart-btn" onClick={restart}>Зіграти ще раз</button>
        </div>
      </section>
    )
  }

  const character = CHARACTERS[step.speaker]
  const isRetrying = wrongPicks.length > 0 && correctPick === null
  const lineText = step.type === 'menu' ? menuData.hint : step.text
  const lowFunds = remaining <= 6

  return (
    <section className="view-section">
      <div className="rg-progress">
        {RESTAURANT_STEPS.map((_, i) => (
          <span key={i} className={`rg-dot${i < stepIndex ? ' done' : ''}${i === stepIndex ? ' active' : ''}`} />
        ))}
      </div>

      <div className="rg-tray">
        <span className={`rg-cash${lowFunds ? ' low' : ''}`}>💰 ${remaining}</span>
        {order.map((key, i) => (
          <img key={i} src={DISHES[key].img} alt={DISHES[key].name} className="rg-tray-item" />
        ))}
      </div>

      <div className="rg-scene" key={stepIndex}>
        <img className="rg-avatar-big" src={character.photo} alt={character.name} />
        <div className={`rg-bubble rg-comic${isRetrying ? ' shake' : ''}`}>
          <span className="rg-speaker">{character.name}</span>
          <p className="rg-line">{lineText}</p>
          {isRetrying && <p className="rg-retry">🔁 {step.retry}</p>}
        </div>
      </div>

      {step.type === 'line' && (
        <div className="rg-choices">
          {items.map((c, i) => {
            const isWrong = wrongPicks.includes(i)
            const isCorrect = correctPick === i
            return (
              <button
                key={i}
                className={`rg-choice${isCorrect ? ' correct pop' : ''}${isWrong ? ' wrong shake' : ''}`}
                onClick={() => choose(i, c)}
                disabled={correctPick !== null || isWrong}
              >
                {c.text}
              </button>
            )
          })}
        </div>
      )}

      {step.type === 'menu' && (
        <div className="rg-menu-grid">
          {items.map((opt, i) => {
            const d = DISHES[opt.dish]
            const isWrong = wrongPicks.includes(i)
            const isCorrect = correctPick === i
            return (
              <button
                key={i}
                className={`rg-dish-card${isCorrect ? ' correct pop' : ''}${isWrong ? ' wrong shake' : ''}`}
                onClick={() => choose(i, opt, opt.dish)}
                disabled={correctPick !== null || isWrong}
              >
                <img src={d.img} alt={d.name} className="rg-dish-img" />
                <span className="rg-dish-name">{d.name}</span>
                <span className="rg-dish-price">${d.price}</span>
              </button>
            )
          })}
        </div>
      )}
    </section>
  )
}
