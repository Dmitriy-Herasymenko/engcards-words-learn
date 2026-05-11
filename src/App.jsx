import { useState, useEffect } from 'react'
import Header from './components/Header'
import FlashcardView from './components/FlashcardView'
import QuizView from './components/QuizView'
import DictionaryView from './components/DictionaryView'
import { beginnerWords, intermediateWords, advancedWords } from './data/words'
import { toBeQuiz, pronounsQuiz, articlesQuiz, articleRulesQuiz, presentSimpleQuiz } from './data/quizzes'

const QUIZZES = {
  toBe:          { data: toBeQuiz,          theory: 'toBe',          title: 'Тренажер: To Be' },
  pronouns:      { data: pronounsQuiz,      theory: 'pronouns',      title: 'Тренажер: Pronouns' },
  articles:      { data: articlesQuiz,      theory: 'articles',      title: 'Тренажер: Артиклі' },
  articleRules:  { data: articleRulesQuiz,  theory: 'articleRules',  title: 'Тренажер: Articles (Rules a–g)' },
  presentSimple: { data: presentSimpleQuiz, theory: 'presentSimple', title: 'Тренажер: Present Simple' },
}

export default function App() {
  const [view, setView] = useState({ type: 'flashcard', title: 'Beginner' })
  const [currentWords, setCurrentWords] = useState(beginnerWords)
  const [savedWords, setSavedWords] = useState(
    () => JSON.parse(localStorage.getItem('savedWords')) || []
  )
  const [activeQuiz, setActiveQuiz] = useState(QUIZZES.toBe)

  useEffect(() => {
    localStorage.setItem('savedWords', JSON.stringify(savedWords))
  }, [savedWords])

  function selectLevel(words, title) {
    setCurrentWords(words)
    setView({ type: 'flashcard', title })
  }

  function showSaved() {
    setCurrentWords([...savedWords])
    setView({ type: 'flashcard', title: 'Обране' })
  }

  function startQuiz(key) {
    const quiz = QUIZZES[key]
    setActiveQuiz(quiz)
    setView({ type: 'quiz', title: quiz.title })
  }

  function toggleSave(word) {
    setSavedWords(prev =>
      prev.some(w => w.id === word.id)
        ? prev.filter(w => w.id !== word.id)
        : [...prev, word]
    )
  }

  return (
    <>
      <Header
        savedCount={savedWords.length}
        onSelectLevel={selectLevel}
        onShowSaved={showSaved}
        onStartQuiz={startQuiz}
        onOpenDictionary={() => setView({ type: 'dictionary', title: 'Мій словник' })}
        beginnerWords={beginnerWords}
        intermediateWords={intermediateWords}
        advancedWords={advancedWords}
      />
      <main id="app-viewport">
        <h1 className="page-title">{view.title}</h1>
        {view.type === 'flashcard' && (
          <FlashcardView
            key={view.title}
            words={currentWords}
            savedWords={savedWords}
            onToggleSave={toggleSave}
          />
        )}
        {view.type === 'quiz' && (
          <QuizView
            key={activeQuiz.theory}
            quizData={activeQuiz.data}
            theory={activeQuiz.theory}
          />
        )}
        {view.type === 'dictionary' && (
          <DictionaryView
            savedWords={savedWords}
            onDelete={id => setSavedWords(prev => prev.filter(w => w.id !== id))}
          />
        )}
      </main>
    </>
  )
}
