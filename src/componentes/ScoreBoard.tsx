import { useMath } from '../contexto/MathContext'

export const ScoreBoard = () => {
  const { puntos } = useMath()

  return (
    <div style={styles.scoreBoard}>
      ⭐ Puntos: <strong>{puntos}</strong>
    </div>
  )
}

const styles = {
  scoreBoard: {
    fontSize: '1.2rem',
    color: '#f39c12',
    marginBottom: '15px',
  },
}