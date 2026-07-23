import { useState } from 'react'

export default function Header({
  savedCount,
  onSelectLevel,
  onShowSaved,
  quizGroups,
  onOpenTrainerGroup,
  onOpenDictionary,
  onOpenMedia,
  onOpenRestaurant,
  onOpenRoadmap,
  onOpenProgress,
  isGroupUnlocked,
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
    if (window.innerWidth <= 1220) {
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

      <div className="header-right">
        <button
          className={`burger-menu${menuOpen ? ' open' : ''}`}
          onClick={toggleMenu}
        >
          <span /><span /><span />
        </button>

        <nav className={`nav-menu${menuOpen ? ' open' : ''}`}>
          <button className="nav-link" onClick={() => act(onOpenRoadmap)}>🗺️ Роадмеп</button>
          <button className="nav-link" onClick={() => act(onOpenProgress)}>📊 Прогрес</button>

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
              {Object.entries(quizGroups).map(([key, group]) => {
                const unlocked = isGroupUnlocked ? isGroupUnlocked(key) : true
                return (
                  <button
                    key={key}
                    onClick={() => act(() => onOpenTrainerGroup(key))}
                    style={!unlocked ? { opacity: 0.5 } : undefined}
                  >
                    {unlocked ? group.title : `🔒 ${group.title}`}
                  </button>
                )
              })}
              <button disabled style={{ opacity: 0.5 }}>⏳ Скоро...</button>
            </div>
          </div>

          <div className={`nav-item dropdown${openDropdown === 'media' ? ' active-mobile' : ''}`}>
            <button className="nav-link" onClick={() => toggleDropdown('media')}>Медіа ▾</button>
            <div className="dropdown-content">
              <button onClick={() => act(onOpenMedia)}>🎬 Extra English (A2)</button>
            </div>
          </div>

          <div className={`nav-item dropdown${openDropdown === 'games' ? ' active-mobile' : ''}`}>
            <button className="nav-link" onClick={() => toggleDropdown('games')}>Ігри ▾</button>
            <div className="dropdown-content">
              <button onClick={() => act(onOpenRestaurant)}>🍽️ У ресторані</button>
              <button disabled style={{ opacity: 0.5 }}>⏳ Скоро...</button>
            </div>
          </div>

          <button className="nav-link" onClick={() => act(onOpenDictionary)}>📋 Словник</button>
        </nav>
      </div>
    </header>
  )
}
