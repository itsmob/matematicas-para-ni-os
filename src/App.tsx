import { MathProvider } from './contexto/MathContext'
import { ScoreBoard } from './componentes/ScoreBoard'
import { OperationSelector } from './componentes/OperationSelector'
import { ExerciseCard } from './componentes/ExerciseCard'
import { AnswerForm } from './componentes/AnswerForm'
import { RangeConfig } from './componentes/RangeConfig'

function AppContent() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🎓 Matemáticas Divertidas 🧮</h1>
      <ScoreBoard />
      <OperationSelector />
      <ExerciseCard />
      <AnswerForm />
      <RangeConfig />
    </div>
  )
}

export default function App() {
  return (
    <MathProvider>
      <AppContent />
    </MathProvider>
  )
}

const styles = {
  container: {
    maxWidth: '500px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
    textAlign: 'center' as const,
  },
  title: {
    color: '#4A90E2',
    fontSize: '2rem',
    marginBottom: '10px',
  },
}