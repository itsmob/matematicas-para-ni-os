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

const styles = {
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
}