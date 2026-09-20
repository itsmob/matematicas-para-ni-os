import { useMath } from '../contexto/MathContext'

const OPCIONES_MINUTOS = [5, 10, 15, 20, 25]

export const TimeSelector = () => {
  const { tiempoLimite, setTiempoLimite } = useMath()

  // Convertimos el tiempo límite en segundos a minutos para saber cuál está seleccionado
  const minutosActuales = Math.round(tiempoLimite / 60)

  return (
    <div style={styles.container}>
      <label style={styles.label}>Tiempo Límite Total (minutos):</label>
      <div style={styles.buttonsGrid}>
        {OPCIONES_MINUTOS.map((minutos) => {
          const isSelected = minutosActuales === minutos
          return (
            <button
              key={minutos}
              type="button"
              style={{
                ...styles.timeBtn,
                backgroundColor: isSelected ? '#4A90E2' : '#e0e0e0',
                color: isSelected ? '#fff' : '#333',
              }}
              onClick={() => setTiempoLimite(minutos * 60)}
            >
              {minutos} min
            </button>
          )
        })}
      </div>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  label: {
    fontSize: '0.9rem',
    color: '#555',
    fontWeight: 'bold',
  },
  buttonsGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
  },
  timeBtn: {
    flex: '1 1 calc(20% - 8px)',
    minWidth: '60px',
    padding: '8px 4px',
    border: 'none',
    borderRadius: '8px',
    fontSize: '0.9rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
}