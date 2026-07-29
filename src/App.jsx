import { useState, useEffect } from 'react'
import Header from './components/Header'
import FlashcardView from './components/FlashcardView'
import QuizView from './components/QuizView'
import DictionaryView from './components/DictionaryView'
import MediaView from './components/MediaView'
import EpisodeView from './components/EpisodeView'
import TrainerGroupView from './components/TrainerGroupView'
import RestaurantGame from './components/RestaurantGame'
import RoadmapView from './components/RoadmapView'
import ProgressView from './components/ProgressView'
import { beginnerWords, intermediateWords, advancedWords } from './data/words'
import {
  toBeQuiz, pronounsQuiz, articlesQuiz, articleRulesQuiz,
  presentSimpleQuiz, pastSimpleQuiz, presentContinuousQuiz, futureSimpleQuiz, presentPerfectQuiz,
  wordOrderStatementQuiz, wordOrderQuestionQuiz, wordOrderNegativeQuiz,
  adjectivesComparisonQuiz, prepositionsInOnToQuiz,
} from './data/quizzes'
import { extraEnglishSeries } from './data/extraEnglish'
import { loadProgress, saveProgress, loadStageProgress, saveStageProgress, isLevelUnlocked, PASS_THRESHOLD } from './utils/progress'

const QUIZZES = {
  wordOrderStatement: { data: wordOrderStatementQuiz, theory: 'wordOrderStatement', title: 'Тренажер: Розповідне речення', short: 'Розповідне речення', desc: 'Порядок слів: хто + дія + що' },
  wordOrderQuestion:  { data: wordOrderQuestionQuiz,  theory: 'wordOrderQuestion',  title: 'Тренажер: Питальне речення',   short: 'Питальне речення',   desc: 'Порядок слів у питаннях' },
  wordOrderNegative:  { data: wordOrderNegativeQuiz,  theory: 'wordOrderNegative',  title: 'Тренажер: Заперечне речення',  short: 'Заперечне речення',  desc: 'Порядок слів у запереченнях' },
  toBe:          { data: toBeQuiz,          theory: 'toBe',          title: 'Тренажер: To Be',        short: 'Verb To Be',    desc: 'Am / Is / Are — базове дієслово-звʼязка' },
  pronouns:      { data: pronounsQuiz,      theory: 'pronouns',      title: 'Тренажер: Pronouns',      short: 'Pronouns',      desc: 'Особові та присвійні займенники' },
  articles:      { data: articlesQuiz,      theory: 'articles',      title: 'Тренажер: Артиклі',       short: 'A / An / The',  desc: 'Коли ставити який артикль' },
  articleRules:  { data: articleRulesQuiz,  theory: 'articleRules',  title: 'Тренажер: Articles (Rules a–g)', short: 'Правила a–g', desc: '7 правил вживання артиклів' },
  adjectivesComparison: { data: adjectivesComparisonQuiz, theory: 'adjectivesComparison', title: 'Тренажер: Ступені порівняння', short: 'Ступені порівняння', desc: 'Прикметник: er/est, more/most' },
  prepositionsInOnTo:   { data: prepositionsInOnToQuiz,   theory: 'prepositionsInOnTo',   title: 'Тренажер: In / On / To',      short: 'In / On / To',      desc: 'Прийменники місця та руху' },
  presentSimple:      { data: presentSimpleQuiz,      theory: 'presentSimple',      title: 'Тренажер: Present Simple',      short: 'Present Simple',      desc: 'Теперішній простий час' },
  pastSimple:         { data: pastSimpleQuiz,         theory: 'pastSimple',         title: 'Тренажер: Past Simple',         short: 'Past Simple',         desc: 'Минулий простий час' },
  presentContinuous:  { data: presentContinuousQuiz,  theory: 'presentContinuous',  title: 'Тренажер: Present Continuous',  short: 'Present Continuous',  desc: 'Дія, що триває зараз' },
  futureSimple:       { data: futureSimpleQuiz,       theory: 'futureSimple',       title: 'Тренажер: Future Simple',       short: 'Future Simple',       desc: 'Майбутній простий час' },
  presentPerfect:      { data: presentPerfectQuiz,     theory: 'presentPerfect',     title: 'Тренажер: Present Perfect',     short: 'Present Perfect',     desc: 'Результат дії зараз' },
}

const QUIZ_GROUPS = {
  wordOrder: { title: 'Порядок слів у реченні', desc: 'Розповідне, питальне та заперечне речення', items: ['wordOrderStatement', 'wordOrderQuestion', 'wordOrderNegative'] },
  basics:  { title: 'Основи',  desc: 'Стартова граматика англійської', items: ['toBe', 'pronouns', 'articles', 'articleRules', 'adjectivesComparison', 'prepositionsInOnTo'] },
  tenses:  { title: 'Часи',    desc: '5 основних часів англійської мови', items: ['presentSimple', 'pastSimple', 'presentContinuous', 'futureSimple', 'presentPerfect'] },
}

const LEVEL_ORDER = ['wordOrder', 'basics', 'tenses']

const ALL_SERIES = [extraEnglishSeries]

export default function App() {
  const [view, setView] = useState({ type: 'roadmap', title: 'Роадмеп' })
  const [currentWords, setCurrentWords] = useState(beginnerWords)
  const [savedWords, setSavedWords] = useState(
    () => JSON.parse(localStorage.getItem('savedWords')) || []
  )
  const [activeQuiz, setActiveQuiz] = useState(QUIZZES.toBe)
  const [activeQuizKey, setActiveQuizKey] = useState('toBe')
  const [activeGroupKey, setActiveGroupKey] = useState('basics')
  const [activeEpisode, setActiveEpisode] = useState(null)
  const [progress, setProgress] = useState(() => loadProgress())
  const [stageProgress, setStageProgress] = useState(() => loadStageProgress())
  const [lockedNotice, setLockedNotice] = useState(null)

  useEffect(() => {
    localStorage.setItem('savedWords', JSON.stringify(savedWords))
  }, [savedWords])

  useEffect(() => {
    saveProgress(progress)
  }, [progress])

  useEffect(() => {
    saveStageProgress(stageProgress)
  }, [stageProgress])

  function recordQuizResult(key, pct) {
    setProgress(prev => ({ ...prev, [key]: Math.max(prev[key] || 0, pct) }))
  }

  function recordStageResult(key, stageIdx, pct) {
    setStageProgress(prev => {
      const quizStages = { ...(prev[key] || {}) }
      quizStages[stageIdx] = Math.max(quizStages[stageIdx] || 0, pct)
      return { ...prev, [key]: quizStages }
    })
  }

  function isGroupUnlocked(groupKey) {
    const idx = LEVEL_ORDER.indexOf(groupKey)
    if (idx === -1) return true
    return isLevelUnlocked(idx, LEVEL_ORDER, QUIZ_GROUPS, progress)
  }

  function selectLevel(words, title) {
    setCurrentWords(words)
    setView({ type: 'flashcard', title })
  }

  function showSaved() {
    setCurrentWords([...savedWords])
    setView({ type: 'flashcard', title: 'Обране' })
  }

  function startQuiz(key, groupKey) {
    const quiz = QUIZZES[key]
    setActiveQuiz(quiz)
    setActiveQuizKey(key)
    if (groupKey) setActiveGroupKey(groupKey)
    setView({ type: 'quiz', title: quiz.title })
  }

  function openTrainerGroup(key) {
    const group = QUIZ_GROUPS[key]
    if (!isGroupUnlocked(key)) {
      const idx = LEVEL_ORDER.indexOf(key)
      const prevGroup = QUIZ_GROUPS[LEVEL_ORDER[idx - 1]]
      setLockedNotice(`Спочатку пройди «${prevGroup.title}» на ${PASS_THRESHOLD}%+, щоб відкрити «${group.title}»`)
      setView({ type: 'roadmap', title: 'Роадмеп' })
      return
    }
    setLockedNotice(null)
    setView({ type: 'trainerGroup', title: group.title, groupKey: key })
  }

  function openRoadmap() {
    setLockedNotice(null)
    setView({ type: 'roadmap', title: 'Роадмеп' })
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
        onOpenRoadmap={openRoadmap}
        onOpenProgress={() => setView({ type: 'progress', title: 'Прогрес' })}
        isGroupUnlocked={isGroupUnlocked}
        beginnerWords={beginnerWords}
        intermediateWords={intermediateWords}
        advancedWords={advancedWords}
      />
      <main id="app-viewport">
        <h1 className="page-title">{view.title}</h1>

        {view.type === 'roadmap' && (
          <RoadmapView
            levelOrder={LEVEL_ORDER}
            groups={QUIZ_GROUPS}
            progress={progress}
            quizzes={QUIZZES}
            onOpenGroup={openTrainerGroup}
            lockedNotice={lockedNotice}
          />
        )}

        {view.type === 'progress' && (
          <ProgressView groups={QUIZ_GROUPS} quizzes={QUIZZES} progress={progress} />
        )}

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
            group={QUIZ_GROUPS[activeGroupKey]}
            quizzes={QUIZZES}
            activeKey={activeQuizKey}
            progress={progress}
            stageProgress={stageProgress[activeQuizKey] || {}}
            onNavQuiz={key => startQuiz(key, activeGroupKey)}
            onBackToGroup={() => openTrainerGroup(activeGroupKey)}
            onQuizComplete={recordQuizResult}
            onStageComplete={(stageIdx, pct) => recordStageResult(activeQuizKey, stageIdx, pct)}
          />
        )}

        {view.type === 'trainerGroup' && (
          <TrainerGroupView
            key={view.groupKey}
            group={QUIZ_GROUPS[view.groupKey]}
            groupKey={view.groupKey}
            quizzes={QUIZZES}
            progress={progress}
            onStartQuiz={key => startQuiz(key, view.groupKey)}
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
