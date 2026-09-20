import { useState, useEffect } from 'react'

type Operacion = '+' | '-' | '×' | '÷'

function App() {
  // Estado para los rangos de 'a' y 'b'
  const [minA, setMinA] = useState<number>(1)
  const [maxA, setMaxA] = useState<number>(10)
  
  const [minB, setMinB] = useState<number>(1)
  const [maxB, setMaxB] = useState<number>(10)

  // Operación seleccionada
  const [operacion, setOperacion] = useState<Operacion>('+')

  // Números generados
  const [numA, setNumA] = useState<number | null>(null)
  const [numB, setNumB] = useState<number | null>(null)

  // Estado del juego
  const [userAnswer, setUserAnswer] = useState<string>('')
  const [feedback, setFeedback] = useState<{ msg: string; tipo: 'exito' | 'error' | null }>({ msg: '', tipo: null })
  const [puntos, setPuntos] = useState<number>(0)

  // Función auxiliar para obtener un entero aleatorio
  const getRandomInt = (min: number, max: number) => {
    const minVal = Math.min(min, max)
    const maxVal = Math.max(min, max)
    return Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal
  }

  // Generar un nuevo problema matemático
  const generarNumeros = () => {
    let a = getRandomInt(minA, maxA)
    let b = getRandomInt(minB, maxB)

    // Ajustes de lógica según la operación
    if (operacion === '÷') {
      // Evitar división por 0
      if (b === 0) b = 1;
      // Para asegurar divisiones exactas (a sea múltiplo de b)
      a = a * b;
    } else if (operacion === '-') {
      // Evitar que dé negativo asegurando que a >= b
      if (a < b) {
        const temp = a;
        a = b;
        b = temp;
      }
    }

    setNumA(a)
    setNumB(b)
    setUserAnswer('')
    setFeedback({ msg: '', tipo: null })
  }

  // Generar el primer ejercicio al cargar la app
  useEffect(() => {
    generarNumeros()
  }, [operacion])

  // Calcular el resultado correcto
  const calcularResultadoCorrecto = (): number | null => {
    if (numA === null || numB === null) return null
    switch (operacion) {
      case '+': return numA + numB
      case '-': return numA - numB
      case '×': return numA * numB
      case '÷': return numA / numB
      default: return null
    }
  }

  // Validar si la respuesta del niño es correcta
  const comprobarRespuesta = (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    
    if (userAnswer.trim() === '') return

    const correcto = calcularResultadoCorrecto()
    const respuestaNum = Number(userAnswer)

    if (respuestaNum === correcto) {
      setFeedback({ msg: '🎉 ¡Excelente! ¡Resultado Correcto!', tipo: 'exito' })
      setPuntos(prev => prev + 1)
    } else {
      setFeedback({ msg: `❌ Casi... El resultado era ${correcto}. ¡Inténtalo de nuevo!`, tipo: 'error' })
    }
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🎓 Matemáticas Divertidas 🧮</h1>

      {/* Marcador de Puntos */}
      <div style={styles.scoreBoard}>
        ⭐ Puntos: <strong>{puntos}</strong>
      </div>

      {/* Selector de Operación */}
      <div style={styles.opContainer}>
        {(['+', '-', '×', '÷'] as Operacion[]).map((op) => (
          <button
            key={op}
            style={{
              ...styles.opBtn,
              backgroundColor: operacion === op ? '#4A90E2' : '#e0e0e0',
              color: operacion === op ? '#fff' : '#333',
            }}
            onClick={() => setOperacion(op)}
          >
            {op}
          </button>
        ))}
      </div>

      {/* Tarjeta de Ejercicio Visual */}
      <div style={styles.numbersCard}>
        <div style={styles.numberBox}>
          <span style={styles.label}>Número A</span>
          <span style={styles.bigNumber}>{numA !== null ? numA : '?'}</span>
        </div>

        <div style={styles.operatorSymbol}>
          {operacion}
        </div>

        <div style={styles.numberBox}>
          <span style={styles.label}>Número B</span>
          <span style={styles.bigNumber}>{numB !== null ? numB : '?'}</span>
        </div>
      </div>

      {/* Formulario de Respuesta */}
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

      {/* Mensaje de Feedback */}
      {feedback.tipo && (
        <div style={{
          ...styles.feedbackBox,
          backgroundColor: feedback.tipo === 'exito' ? '#d4edda' : '#f8d7da',
          color: feedback.tipo === 'exito' ? '#155724' : '#721c24',
          borderColor: feedback.tipo === 'exito' ? '#c3e6cb' : '#f5c6cb',
        }}>
          {feedback.msg}
        </div>
      )}

      {/* Botón para Siguiente Pregunta */}
      <button style={styles.generateBtn} onClick={generarNumeros}>
        🎲 ¡Siguiente Ejercicio!
      </button>

      {/* Configuración de Rangos */}
      <div style={styles.configCard}>
        <h2 style={styles.subtitle}>⚙️ Personalizar Rangos</h2>

        <div style={styles.rangeGroup}>
          <p style={styles.rangeTitle}><strong>Rango Número A:</strong></p>
          <div style={styles.inputsRow}>
            <label>
              Mín: 
              <input
                type="number"
                value={minA}
                onChange={(e) => setMinA(Number(e.target.value))}
                style={styles.input}
              />
            </label>
            <label>
              Máx: 
              <input
                type="number"
                value={maxA}
                onChange={(e) => setMaxA(Number(e.target.value))}
                style={styles.input}
              />
            </label>
          </div>
        </div>

        <div style={styles.rangeGroup}>
          <p style={styles.rangeTitle}><strong>Rango Número B:</strong></p>
          <div style={styles.inputsRow}>
            <label>
              Mín: 
              <input
                type="number"
                value={minB}
                onChange={(e) => setMinB(Number(e.target.value))}
                style={styles.input}
              />
            </label>
            <label>
              Máx: 
              <input
                type="number"
                value={maxB}
                onChange={(e) => setMaxB(Number(e.target.value))}
                style={styles.input}
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}

// Estilos dinámicos y limpios
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
  scoreBoard: {
    fontSize: '1.2rem',
    color: '#f39c12',
    marginBottom: '15px',
  },
  opContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    marginBottom: '20px',
  },
  opBtn: {
    width: '50px',
    height: '50px',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  numbersCard: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#f4f6f8',
    padding: '20px',
    borderRadius: '16px',
    marginBottom: '20px',
  },
  numberBox: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
  },
  operatorSymbol: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#4A90E2',
  },
  label: {
    fontSize: '0.9rem',
    color: '#666',
    fontWeight: 'bold',
  },
  bigNumber: {
    fontSize: '3.2rem',
    fontWeight: 'bold',
    color: '#2C3E50',
  },
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
  configCard: {
    backgroundColor: '#fff',
    border: '1px solid #e0e0e0',
    borderRadius: '16px',
    padding: '20px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  },
  subtitle: {
    fontSize: '1.2rem',
    color: '#333',
    marginTop: 0,
    marginBottom: '15px',
  },
  rangeGroup: {
    marginBottom: '15px',
    textAlign: 'left' as const,
  },
  rangeTitle: {
    margin: '0 0 8px 0',
    color: '#555',
  },
  inputsRow: {
    display: 'flex',
    gap: '15px',
  },
  input: {
    width: '70px',
    padding: '8px',
    marginLeft: '5px',
    fontSize: '1rem',
    borderRadius: '6px',
    border: '1px solid #ccc',
  },
}

export default App