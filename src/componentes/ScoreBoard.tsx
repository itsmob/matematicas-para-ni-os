import { useMath } from '../contexto/MathContext'

export const ScoreBoard = () => {
  const { correctas, incorrectas } = useMath()

  return (
    <div style={styles.scoreBoard}>
      ⭐ Correctas: <strong>{correctas}</strong> | Incorrectas: <strong>{incorrectas}</strong>
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