import { useState, useEffect } from 'react'
import Header from './components/Header'
import FlashcardView from './components/FlashcardView'
import QuizView from './components/QuizView'
import DictionaryView from './components/DictionaryView'
import MediaView from './components/MediaView'
import EpisodeView from './components/EpisodeView'
import { beginnerWords, intermediateWords, advancedWords } from './data/words'
import { toBeQuiz, pronounsQuiz, articlesQuiz, articleRulesQuiz, presentSimpleQuiz } from './data/quizzes'
import { extraEnglishSeries } from './data/extraEnglish'

const QUIZZES = {
  toBe:          { data: toBeQuiz,          theory: 'toBe',          title: 'Тренажер: To Be' },
  pronouns:      { data: pronounsQuiz,      theory: 'pronouns',      title: 'Тренажер: Pronouns' },
  articles:      { data: articlesQuiz,      theory: 'articles',      title: 'Тренажер: Артиклі' },
  articleRules:  { data: articleRulesQuiz,  theory: 'articleRules',  title: 'Тренажер: Articles (Rules a–g)' },
  presentSimple: { data: presentSimpleQuiz, theory: 'presentSimple', title: 'Тренажер: Present Simple' },
}

const ALL_SERIES = [extraEnglishSeries]

export default function App() {
  const [view, setView] = useState({ type: 'flashcard', title: 'Beginner' })
  const [currentWords, setCurrentWords] = useState(beginnerWords)
  const [savedWords, setSavedWords] = useState(
    () => JSON.parse(localStorage.getItem('savedWords')) || []
  )
  const [activeQuiz, setActiveQuiz] = useState(QUIZZES.toBe)
  const [activeEpisode, setActiveEpisode] = useState(null)

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

  function openEpisode(episode, seriesTitle) {
    setActiveEpisode(episode)
    setView({ type: 'episode', title: `${seriesTitle} — EP ${episode.number}: ${episode.title}` })
  }

  function toggleSave(word) {
    setSavedWords(prev =>
      prev.some(w => w.id === word.id)
        ? prev.filter(w => w.id !== word.id)
        : [...prev, word]
    )
  }

  function addWordFromEpisode(entry) {
    const word = {
      id: `ep_${entry.word}`,
      wordEng: entry.word,
      wordUA: entry.translation,
      transcription: '',
      example: '',
    }
    setSavedWords(prev =>
      prev.some(w => w.id === word.id) ? prev : [...prev, word]
    )
  }

  function studyWords(count) {
    const pool = [...savedWords].sort(() => Math.random() - 0.5).slice(0, count)
    setCurrentWords(pool)
    setView({ type: 'flashcard', title: `Вчити (${pool.length} слів)` })
  }

  return (
    <>
      <Header
        savedCount={savedWords.length}
        onSelectLevel={selectLevel}
        onShowSaved={showSaved}
        onStartQuiz={startQuiz}
        onOpenDictionary={() => setView({ type: 'dictionary', title: 'Мій словник' })}
        onOpenMedia={() => setView({ type: 'media', title: 'Медіа' })}
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
            onStudy={studyWords}
          />
        )}

        {view.type === 'media' && (
          <MediaView series={ALL_SERIES} onOpenEpisode={openEpisode} />
        )}

        {view.type === 'episode' && activeEpisode && (
          <EpisodeView
            key={activeEpisode.id}
            episode={activeEpisode}
            savedWords={savedWords}
            onAddWord={addWordFromEpisode}
          />
        )}
      </main>
    </>
  )
}
