import { useState } from 'react'

export default function Header({
  savedCount,
  onSelectLevel,
  onShowSaved,
  onStartQuiz,
  onOpenDictionary,
  onOpenMedia,
  beginnerWords,
  intermediateWords,
  advancedWords,
}) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(null)

  function closeMenu() {
    setMenuOpen(false)
    setOpenDropdown(null)
    document.body.classList.remove('menu-open')
  }

  function toggleMenu() {
    const next = !menuOpen
    setMenuOpen(next)
    document.body.classList.toggle('menu-open', next)
  }

  function toggleDropdown(name) {
    if (window.innerWidth <= 850) {
      setOpenDropdown(prev => (prev === name ? null : name))
    }
  }

  function act(fn) {
    fn()
    closeMenu()
  }

  return (
    <header className="main-header">
      <div className="logo">EngFlow</div>

      <button
        className={`burger-menu${menuOpen ? ' open' : ''}`}
        onClick={toggleMenu}
      >
        <span /><span /><span />
      </button>

      <nav className={`nav-menu${menuOpen ? ' open' : ''}`}>
        <div className={`nav-item dropdown${openDropdown === 'cards' ? ' active-mobile' : ''}`}>
          <button className="nav-link" onClick={() => toggleDropdown('cards')}>Картки ▾</button>
          <div className="dropdown-content">
            <button onClick={() => act(() => onSelectLevel(beginnerWords, 'Beginner'))}>Beginner</button>
            <button onClick={() => act(() => onSelectLevel(intermediateWords, 'Intermediate'))}>Intermediate</button>
            <button onClick={() => act(() => onSelectLevel(advancedWords, 'Advanced'))}>Advanced</button>
            <button onClick={() => act(onShowSaved)}>⭐ Обране ({savedCount})</button>
          </div>
        </div>

        <div className={`nav-item dropdown${openDropdown === 'trainer' ? ' active-mobile' : ''}`}>
          <button className="nav-link" onClick={() => toggleDropdown('trainer')}>Тренажер ▾</button>
          <div className="dropdown-content">
            <button onClick={() => act(() => onStartQuiz('toBe'))}>Verb To Be (All-in-one)</button>
            <button onClick={() => act(() => onStartQuiz('pronouns'))}>Pronouns</button>
            <button onClick={() => act(() => onStartQuiz('articles'))}>Articles (A, An, The)</button>
            <button onClick={() => act(() => onStartQuiz('articleRules'))}>Articles (Правила a–g)</button>
            <button onClick={() => act(() => onStartQuiz('presentSimple'))}>Present Simple</button>
            <button disabled style={{ opacity: 0.5 }}>⏳ Скоро...</button>
          </div>
        </div>

        <div className={`nav-item dropdown${openDropdown === 'media' ? ' active-mobile' : ''}`}>
          <button className="nav-link" onClick={() => toggleDropdown('media')}>Медіа ▾</button>
          <div className="dropdown-content">
            <button onClick={() => act(onOpenMedia)}>🎬 Extra English (A2)</button>
          </div>
        </div>

        <button className="nav-link" onClick={() => act(onOpenDictionary)}>📋 Словник</button>
      </nav>
    </header>
  )
}
