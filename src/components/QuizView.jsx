import TheoryBlock from './TheoryBlock'
import QuizGame from './QuizGame'

export default function QuizView({ quizData, theory }) {
  return (
    <section className="view-section">
      <TheoryBlock type={theory} />
      <QuizGame data={quizData} />
    </section>
  )
}
