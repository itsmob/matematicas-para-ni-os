import { useState } from 'react'
import { MathProvider } from './contexto/MathContext'
import { ScoreBoard } from './componentes/ScoreBoard'
import { OperationSelector } from './componentes/OperationSelector'
import { ExerciseCard } from './componentes/ExerciseCard'
import { AnswerForm } from './componentes/AnswerForm'
import { ConfigModal } from './componentes/ConfigModal'

function AppContent() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>🎓 Matemáticas Divertidas 🧮</h1>
        <button
          style={styles.configBtn}
          onClick={() => setIsModalOpen(true)}
          title="Configurar Rangos"
        >
          ⚙️
        </button>
      </header>

      <ScoreBoard />
      <OperationSelector />
      <ExerciseCard />
      <AnswerForm />

      <ConfigModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
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
    position: 'relative' as const,
  },
  header: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '10px',
  },
  title: {
    color: '#4A90E2',
    fontSize: '2rem',
    margin: 0,
  },
  configBtn: {
    background: 'none',
    border: 'none',
    fontSize: '1.5rem',
    cursor: 'pointer',
    padding: '5px',
    borderRadius: '50%',
    transition: 'transform 0.2s',
  },
}