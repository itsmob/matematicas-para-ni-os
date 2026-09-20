import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

export type Operacion = '+' | '-' | '×' | '÷'

interface MathContextType {
  minA: number
  maxA: number
  minB: number
  maxB: number
  operacion: Operacion
  numA: number | null
  numB: number | null
  userAnswer: string
  feedback: { msg: string; tipo: 'exito' | 'error' | null }
  puntos: number
  setMinA: (val: number) => void
  setMaxA: (val: number) => void
  setMinB: (val: number) => void
  setMaxB: (val: number) => void
  setOperacion: (op: Operacion) => void
  setUserAnswer: (ans: string) => void
  generarNumeros: () => void
  comprobarRespuesta: (e?: React.FormEvent) => void
}

const MathContext = createContext<MathContextType | undefined>(undefined)

export const MathProvider = ({ children }: { children: ReactNode }) => {
  const [minA, setMinA] = useState<number>(1)
  const [maxA, setMaxA] = useState<number>(10)
  const [minB, setMinB] = useState<number>(1)
  const [maxB, setMaxB] = useState<number>(10)

  const [operacion, setOperacion] = useState<Operacion>('+')
  const [numA, setNumA] = useState<number | null>(null)
  const [numB, setNumB] = useState<number | null>(null)

  const [userAnswer, setUserAnswer] = useState<string>('')
  const [feedback, setFeedback] = useState<{ msg: string; tipo: 'exito' | 'error' | null }>({ msg: '', tipo: null })
  const [puntos, setPuntos] = useState<number>(0)

  const getRandomInt = (min: number, max: number) => {
    const minVal = Math.min(min, max)
    const maxVal = Math.max(min, max)
    return Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal
  }

  const generarNumeros = () => {
    let a = getRandomInt(minA, maxA)
    let b = getRandomInt(minB, maxB)

    if (operacion === '÷') {
      if (b === 0) b = 1
      a = a * b
    } else if (operacion === '-') {
      if (a < b) {
        const temp = a
        a = b
        b = temp
      }
    }

    setNumA(a)
    setNumB(b)
    setUserAnswer('')
    setFeedback({ msg: '', tipo: null })
  }

  useEffect(() => {
    generarNumeros()
  }, [operacion])

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

  const comprobarRespuesta = (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (userAnswer.trim() === '') return

    const correcto = calcularResultadoCorrecto()
    const respuestaNum = Number(userAnswer)

    if (respuestaNum === correcto) {
      setFeedback({ msg: '🎉 ¡Excelente! ¡Resultado Correcto!', tipo: 'exito' })
      setPuntos((prev) => prev + 1)
    } else {
      setFeedback({ msg: `❌ Casi... El resultado era ${correcto}. ¡Inténtalo de nuevo!`, tipo: 'error' })
    }
  }

  return (
    <MathContext.Provider
      value={{
        minA,
        maxA,
        minB,
        maxB,
        operacion,
        numA,
        numB,
        userAnswer,
        feedback,
        puntos,
        setMinA,
        setMaxA,
        setMinB,
        setMaxB,
        setOperacion,
        setUserAnswer,
        generarNumeros,
        comprobarRespuesta,
      }}
    >
      {children}
    </MathContext.Provider>
  )
}

// Hook personalizado para usar el contexto con facilidad
export const useMath = () => {
  const context = useContext(MathContext)
  if (!context) {
    throw new Error('useMath debe usarse dentro de un MathProvider')
  }
  return context
}
