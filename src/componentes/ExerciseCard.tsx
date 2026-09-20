import { useMath } from '../contexto/MathContext'

export const ExerciseCard = () => {
  const { numA, numB, operacion } = useMath()

  return (
    <div style={styles.numbersCard}>
      <div style={styles.numberBox}>
        <span style={styles.label}>Número A</span>
        <span style={styles.bigNumber}>{numA !== null ? numA : '?'}</span>
      </div>

      <div style={styles.operatorSymbol}>{operacion}</div>

      <div style={styles.numberBox}>
        <span style={styles.label}>Número B</span>
        <span style={styles.bigNumber}>{numB !== null ? numB : '?'}</span>
      </div>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  numbersCard: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f6f8',
    padding: '16px 12px',
    borderRadius: '16px',
    marginBottom: '16px',
    boxSizing: 'border-box',
    width: '100%',
    maxWidth: '100%',
    overflow: 'hidden',
  },
  numberBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: '1 1 0%',
    minWidth: 0, // Clave en Flexbox para permitir encoger el contenido
    overflow: 'hidden',
  },
  operatorSymbol: {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    color: '#4A90E2',
    padding: '0 8px',
    userSelect: 'none',
    flexShrink: 0,
  },
  label: {
    fontSize: '0.75rem',
    color: '#7f8c8d',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    marginBottom: '4px',
    whiteSpace: 'nowrap',
  },
  bigNumber: {
    fontSize: '2.2rem',
    fontWeight: 'bold',
    color: '#2C3E50',
    lineHeight: 1.1,
    wordBreak: 'break-all',
    textAlign: 'center',
    maxWidth: '100%',
  },
}