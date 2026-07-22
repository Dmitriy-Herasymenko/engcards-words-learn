import { useState, useEffect } from 'react'
import Header from './components/Header'
import FlashcardView from './components/FlashcardView'
import QuizView from './components/QuizView'
import DictionaryView from './components/DictionaryView'
import MediaView from './components/MediaView'
import EpisodeView from './components/EpisodeView'
import TrainerGroupView from './components/TrainerGroupView'
import RestaurantGame from './components/RestaurantGame'
import { beginnerWords, intermediateWords, advancedWords } from './data/words'
import {
  toBeQuiz, pronounsQuiz, articlesQuiz, articleRulesQuiz,
  presentSimpleQuiz, pastSimpleQuiz, presentContinuousQuiz, futureSimpleQuiz, presentPerfectQuiz,
} from './data/quizzes'
import { extraEnglishSeries } from './data/extraEnglish'

const QUIZZES = {
  toBe:          { data: toBeQuiz,          theory: 'toBe',          title: 'Тренажер: To Be',        short: 'Verb To Be',    desc: 'Am / Is / Are — базове дієслово-звʼязка' },
  pronouns:      { data: pronounsQuiz,      theory: 'pronouns',      title: 'Тренажер: Pronouns',      short: 'Pronouns',      desc: 'Особові та присвійні займенники' },
  articles:      { data: articlesQuiz,      theory: 'articles',      title: 'Тренажер: Артиклі',       short: 'A / An / The',  desc: 'Коли ставити який артикль' },
  articleRules:  { data: articleRulesQuiz,  theory: 'articleRules',  title: 'Тренажер: Articles (Rules a–g)', short: 'Правила a–g', desc: '7 правил вживання артиклів' },
  presentSimple:      { data: presentSimpleQuiz,      theory: 'presentSimple',      title: 'Тренажер: Present Simple',      short: 'Present Simple',      desc: 'Теперішній простий час' },
  pastSimple:         { data: pastSimpleQuiz,         theory: 'pastSimple',         title: 'Тренажер: Past Simple',         short: 'Past Simple',         desc: 'Минулий простий час' },
  presentContinuous:  { data: presentContinuousQuiz,  theory: 'presentContinuous',  title: 'Тренажер: Present Continuous',  short: 'Present Continuous',  desc: 'Дія, що триває зараз' },
  futureSimple:       { data: futureSimpleQuiz,       theory: 'futureSimple',       title: 'Тренажер: Future Simple',       short: 'Future Simple',       desc: 'Майбутній простий час' },
  presentPerfect:      { data: presentPerfectQuiz,     theory: 'presentPerfect',     title: 'Тренажер: Present Perfect',     short: 'Present Perfect',     desc: 'Результат дії зараз' },
}

const QUIZ_GROUPS = {
  basics:  { title: 'Основи',  desc: 'Стартова граматика англійської', items: ['toBe', 'pronouns'] },
  tenses:  { title: 'Часи',    desc: '5 основних часів англійської мови', items: ['presentSimple', 'pastSimple', 'presentContinuous', 'futureSimple', 'presentPerfect'] },
  articles: { title: 'Артиклі', desc: 'Все про a / an / the',           items: ['articles', 'articleRules'] },
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

  function openTrainerGroup(key) {
    const group = QUIZ_GROUPS[key]
    setView({ type: 'trainerGroup', title: group.title, groupKey: key })
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
        quizGroups={QUIZ_GROUPS}
        onOpenTrainerGroup={openTrainerGroup}
        onOpenDictionary={() => setView({ type: 'dictionary', title: 'Мій словник' })}
        onOpenMedia={() => setView({ type: 'media', title: 'Медіа' })}
        onOpenRestaurant={() => setView({ type: 'restaurant', title: 'У ресторані' })}
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

        {view.type === 'trainerGroup' && (
          <TrainerGroupView
            key={view.groupKey}
            group={QUIZ_GROUPS[view.groupKey]}
            quizzes={QUIZZES}
            onStartQuiz={startQuiz}
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

        {view.type === 'restaurant' && (
          <RestaurantGame key={view.title} />
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
