import { useState } from 'react'
import { MathProvider, useMath } from './contexto/MathContext'
import { Timer } from './componentes/Timer'
import { ExerciseCard } from './componentes/ExerciseCard'
import { AnswerForm } from './componentes/AnswerForm'
import { ConfigModal } from './componentes/ConfigModal'

function AppContent() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { estadoJuego, iniciarJuego, reiniciarJuego, correctas, totalEjercicios } = useMath()

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>🎓 Matemáticas Divertidas 🧮</h1>
        <button
          style={styles.configBtn}
          onClick={() => setIsModalOpen(true)}
          title="Configurar Ejercicios"
        >
          ⚙️
        </button>
      </header>

      {/* 1. PANTALLA INICIAL (ANTES DE EMPEZAR) */}
      {estadoJuego === 'configuracion' && (
        <div style={styles.welcomeCard}>
          <p style={styles.welcomeText}>
            ¡Acepta el reto! Configura tus ejercicios con el icono ⚙️ y presiona empezar cuando estés listo.
          </p>
          <button style={styles.startBtn} onClick={iniciarJuego}>
            🚀 Empezar
          </button>
        </div>
      )}

      {/* 2. PANTALLA DURANTE EL JUEGO */}
      {estadoJuego === 'jugando' && (
        <div style={styles.gameSection}>
          <Timer />
          <ExerciseCard />
          <AnswerForm />
        </div>
      )}

      {/* 3. PANTALLA DE RESULTADOS (CUANDO FINALIZA) */}
      {estadoJuego === 'finalizado' && (
        <div style={styles.resultCard}>
          <h2>🎉 ¡Ejercicios finalizados!</h2>
          <p style={styles.resultText}>
            Acertaste <strong>{correctas}</strong> de <strong>{totalEjercicios}</strong> ejercicios.
          </p>
          <div style={styles.actionButtons}>
            <button style={styles.startBtn} onClick={iniciarJuego}>
              🔄 Intentar de nuevo
            </button>
            <button style={styles.secondaryBtn} onClick={reiniciarJuego}>
              ⚙️ Cambiar Configuración
            </button>
          </div>
        </div>
      )}

      {/* MODAL DE CONFIGURACIÓN */}
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

const styles: Record<string, React.CSSProperties> = {
  container: {
    width: '100%',
    maxWidth: '500px',
    margin: '0 auto',
    padding: '16px',
    fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
    textAlign: 'center',
    position: 'relative',
    boxSizing: 'border-box',
    overflowX: 'hidden',
  },
  header: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '20px',
  },
  title: {
    color: '#4A90E2',
    fontSize: '1.8rem',
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
  gameSection: {
    width: '100%',
    boxSizing: 'border-box',
  },
  welcomeCard: {
    backgroundColor: '#f8f9fa',
    padding: '30px 20px',
    borderRadius: '16px',
    border: '2px dashed #4A90E2',
    marginTop: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
    boxSizing: 'border-box',
  },
  welcomeText: {
    fontSize: '1.1rem',
    color: '#555',
    margin: 0,
    lineHeight: '1.5',
  },
  startBtn: {
    backgroundColor: '#2ECC71',
    color: '#fff',
    border: 'none',
    padding: '12px 28px',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    borderRadius: '10px',
    cursor: 'pointer',
    boxShadow: '0 4px 10px rgba(46, 204, 113, 0.3)',
    transition: 'transform 0.2s, background-color 0.2s',
  },
  resultCard: {
    backgroundColor: '#fff',
    padding: '30px 20px',
    borderRadius: '16px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
    marginTop: '20px',
    boxSizing: 'border-box',
  },
  resultText: {
    fontSize: '1.2rem',
    color: '#333',
    margin: '15px 0 25px 0',
  },
  actionButtons: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  secondaryBtn: {
    backgroundColor: '#e0e0e0',
    color: '#333',
    border: 'none',
    padding: '10px 20px',
    fontSize: '1rem',
    fontWeight: 'bold',
    borderRadius: '8px',
    cursor: 'pointer',
  },
}