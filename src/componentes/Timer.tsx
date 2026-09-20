import { useMath } from '../contexto/MathContext'

const formatearTiempo = (segundosTotales: number): string => {
  const mins = Math.floor(segundosTotales / 60)
  const segs = segundosTotales % 60
  const minsStr = mins < 10 ? `0${mins}` : `${mins}`
  const segsStr = segs < 10 ? `0${segs}` : `${segs}`
  return `${minsStr}:${segsStr}`
}

export const Timer = () => {
  const { modoJuego, tiempo } = useMath()
  const esCronometro = modoJuego === 'cronometro'

  return (
    <div
      style={{
        ...styles.timerContainer,
        backgroundColor: esCronometro && tiempo <= 10 ? '#fff5f5' : '#f8f9fa',
        borderColor: esCronometro && tiempo <= 10 ? '#feb2b2' : '#e2e8f0',
      }}
    >
      <span style={styles.icon}>{esCronometro ? '⏳' : '⏱️'}</span>
      <div style={styles.textGroup}>
        <span style={styles.label}>
          {esCronometro ? 'Tiempo restante' : 'Tiempo transcurrido'}
        </span>
        <span
          style={{
            ...styles.timeDisplay,
            color: esCronometro && tiempo <= 10 ? '#e53e3e' : '#2d3748',
          }}
        >
          {formatearTiempo(tiempo)}
        </span>
      </div>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  timerContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    padding: '8px 16px',
    borderRadius: '12px',
    border: '1px solid #e2e8f0',
    marginBottom: '16px',
    width: '100%',
    boxSizing: 'border-box',
    transition: 'background-color 0.3s, border-color 0.3s',
  },
  icon: {
    fontSize: '1.4rem',
  },
  textGroup: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  label: {
    fontSize: '0.75rem',
    color: '#718096',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  timeDisplay: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    fontVariantNumeric: 'tabular-nums',
  },
}