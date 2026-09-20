import { useMath } from '../contexto/MathContext'

export const AnswerForm = () => {
  const { userAnswer, setUserAnswer, comprobarRespuesta, feedback, generarNumeros } = useMath()

  return (
    <>
      <form onSubmit={comprobarRespuesta} style={styles.answerSection}>
        <input
          type="number"
          placeholder="Tu respuesta"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          style={styles.answerInput}
        />
        <button type="submit" style={styles.checkBtn}>
          ✔️ Comprobar
        </button>
      </form>

      {feedback.tipo && (
        <div
          style={{
            ...styles.feedbackBox,
            backgroundColor: feedback.tipo === 'exito' ? '#d4edda' : '#f8d7da',
            color: feedback.tipo === 'exito' ? '#155724' : '#721c24',
            borderColor: feedback.tipo === 'exito' ? '#c3e6cb' : '#f5c6cb',
          }}
        >
          {feedback.msg}
        </div>
      )}

      <button style={styles.generateBtn} onClick={generarNumeros}>
        🎲 ¡Siguiente Ejercicio!
      </button>
    </>
  )
}

const styles = {
  answerSection: {
    display: 'flex',
    gap: '10px',
    justifyContent: 'center',
    marginBottom: '15px',
  },
  answerInput: {
    width: '140px',
    fontSize: '1.4rem',
    textAlign: 'center' as const,
    padding: '10px',
    borderRadius: '10px',
    border: '2px solid #4A90E2',
    outline: 'none',
  },
  checkBtn: {
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    borderRadius: '10px',
    cursor: 'pointer',
  },
  feedbackBox: {
    padding: '12px',
    borderRadius: '10px',
    marginBottom: '15px',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    border: '1px solid',
  },
  generateBtn: {
    backgroundColor: '#2ECC71',
    color: 'white',
    border: 'none',
    padding: '12px 25px',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    borderRadius: '25px',
    cursor: 'pointer',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    width: '100%',
    marginBottom: '25px',
  },
}