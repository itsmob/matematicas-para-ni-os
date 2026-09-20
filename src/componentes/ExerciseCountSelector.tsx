// src/componentes/ExerciseCountSelector.tsx
import { useMath } from '../contexto/MathContext'

const OPCIONES_EJERCICIOS = [10, 20, 30, 40, 50]

export const ExerciseCountSelector = () => {
  const { totalEjercicios, setTotalEjercicios } = useMath()

  return (
    <div style={styles.container}>
      <p style={styles.label}><strong>Cantidad de Ejercicios:</strong></p>
      <div style={styles.buttonsContainer}>
        {OPCIONES_EJERCICIOS.map((cantidad) => {
          const isSelected = totalEjercicios === cantidad
          return (
            <button
              key={cantidad}
              type="button"
              style={{
                ...styles.btn,
                backgroundColor: isSelected ? '#4A90E2' : '#f0f0f0',
                color: isSelected ? '#fff' : '#333',
                border: isSelected ? '2px solid #357ABD' : '1px solid #ccc',
              }}
              onClick={() => setTotalEjercicios(cantidad)}
            >
              {cantidad}
            </button>
          )
        })}
      </div>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    marginBottom: '15px',
  },
  label: {
    margin: '0 0 8px 0',
    fontSize: '0.9rem',
    color: '#555',
  },
  buttonsContainer: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap',
  },
  btn: {
    flex: '1 1 calc(20% - 8px)',
    minWidth: '45px',
    padding: '8px 0',
    borderRadius: '8px',
    fontSize: '0.95rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
}