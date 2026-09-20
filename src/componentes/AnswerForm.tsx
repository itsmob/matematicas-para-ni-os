import { useMath } from '../contexto/MathContext'

export const AnswerForm = () => {
  const { userAnswer, setUserAnswer, comprobarRespuesta } = useMath()

  // Agregar dígito al presionar un botón numérico
  const handleNumberClick = (val: string) => {
    // Evita acumular ceros a la izquierda innecesarios
    if (userAnswer === '0') {
      setUserAnswer(val)
    } else {
      setUserAnswer(userAnswer + val)
    }
  }

  // Eliminar el último dígito ingresado
  const handleDelete = () => {
    setUserAnswer(userAnswer.slice(0, -1))
  }

  return (
    <div style={styles.container}>
      {/* Visualizador de la respuesta ingresada */}
      <div style={styles.displayBox}>
        <input
          type="text"
          readOnly
          placeholder="0"
          value={userAnswer}
          style={styles.answerInput}
        />
      </div>

      {/* Teclado numérico táctil */}
      <form onSubmit={comprobarRespuesta} style={styles.keypad}>
        {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
          <button
            key={num}
            type="button"
            style={styles.keyBtn}
            onClick={() => handleNumberClick(num)}
          >
            {num}
          </button>
        ))}

        {/* Fila inferior: Borrar | 0 | Siguiente */}
        <button
          type="button"
          style={{ ...styles.keyBtn, ...styles.deleteBtn }}
          onClick={handleDelete}
          title="Borrar último dígito"
        >
          ⌫
        </button>

        <button
          type="button"
          style={styles.keyBtn}
          onClick={() => handleNumberClick('0')}
        >
          0
        </button>

        <button type="submit" style={styles.nextBtn}>
          Siguiente ➔
        </button>
      </form>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    width: '100%',
    maxWidth: '100%',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
  },
  displayBox: {
    width: '100%',
    boxSizing: 'border-box',
  },
  answerInput: {
    width: '100%',
    fontSize: '2rem',
    fontWeight: 'bold',
    textAlign: 'center',
    padding: '10px',
    borderRadius: '12px',
    border: '2px solid #4A90E2',
    backgroundColor: '#ffffff',
    color: '#2C3E50',
    outline: 'none',
    boxSizing: 'border-box',
    letterSpacing: '2px',
  },
  keypad: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '10px',
    width: '100%',
    boxSizing: 'border-box',
  },
  keyBtn: {
    backgroundColor: '#ffffff',
    color: '#2C3E50',
    border: '2px solid #e2e8f0',
    borderRadius: '12px',
    padding: '14px 0',
    fontSize: '1.4rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    userSelect: 'none',
    boxSizing: 'border-box',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    transition: 'background-color 0.1s, transform 0.1s',
  },
  deleteBtn: {
    backgroundColor: '#fff5f5',
    color: '#e53e3e',
    borderColor: '#fed7d7',
  },
  nextBtn: {
    backgroundColor: '#2ECC71',
    color: '#ffffff',
    border: 'none',
    borderRadius: '12px',
    padding: '14px 0',
    fontSize: '1.05rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    userSelect: 'none',
    boxSizing: 'border-box',
    boxShadow: '0 4px 10px rgba(46, 204, 113, 0.3)',
  },
}