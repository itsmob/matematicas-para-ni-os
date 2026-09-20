import { useMath } from '../contexto/MathContext'

export const RangeConfig = () => {
  const { minA, setMinA, maxA, setMaxA, minB, setMinB, maxB, setMaxB } = useMath()

  return (
    <div style={styles.configCard}>
      <h2 style={styles.subtitle}>⚙️ Personalizar Rangos</h2>

      <div style={styles.rangeGroup}>
        <p style={styles.rangeTitle}>
          <strong>Rango Número A:</strong>
        </p>
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
        <p style={styles.rangeTitle}>
          <strong>Rango Número B:</strong>
        </p>
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
  )
}

const styles = {
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