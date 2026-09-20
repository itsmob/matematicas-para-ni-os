import { useMath, type Operacion } from '../contexto/MathContext'

export const OperationSelector = () => {
  const { operacion, setOperacion } = useMath()
  const operaciones: Operacion[] = ['+', '-', '×', '÷']

  return (
    <div style={styles.opContainer}>
      {operaciones.map((op) => (
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
  )
}

const styles = {
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
}