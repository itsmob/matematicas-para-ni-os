import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

export type Operacion = '+' | '-' | '×' | '÷'
export type ModoJuego = 'libre' | 'cronometro'
export type EstadoJuego = 'configuracion' | 'jugando' | 'finalizado'

interface MathContextType {
  // Configuración
  operacion: Operacion
  minA: number
  maxA: number
  minB: number
  maxB: number
  modoJuego: ModoJuego
  tiempoLimite: number // Tiempo global en segundos para toda la sesión
  totalEjercicios: number

  // Estado del juego / sesión
  estadoJuego: EstadoJuego
  ejercicioActual: number
  numA: number | null
  numB: number | null
  userAnswer: string
  feedback: { msg: string; tipo: 'exito' | 'error' | null }
  correctas: number
  incorrectas: number
  tiempoRestante: number

  // Setters de configuración
  setOperacion: (op: Operacion) => void
  setMinA: (val: number) => void
  setMaxA: (val: number) => void
  setMinB: (val: number) => void
  setMaxB: (val: number) => void
  setModoJuego: (modo: ModoJuego) => void
  setTiempoLimite: (val: number) => void
  setTotalEjercicios: (val: number) => void
  setUserAnswer: (ans: string) => void

  // Acciones
  iniciarJuego: () => void
  reiniciarJuego: () => void
  comprobarRespuesta: (e?: React.FormEvent) => void
}

const MathContext = createContext<MathContextType | undefined>(undefined)

export const MathProvider = ({ children }: { children: ReactNode }) => {
  // 1. Estados de Configuración
  const [operacion, setOperacion] = useState<Operacion>('+')
  const [minA, setMinA] = useState<number>(1)
  const [maxA, setMaxA] = useState<number>(10)
  const [minB, setMinB] = useState<number>(1)
  const [maxB, setMaxB] = useState<number>(10)
  const [modoJuego, setModoJuego] = useState<ModoJuego>('libre')
  const [tiempoLimite, setTiempoLimite] = useState<number>(300) // 5 minutos por defecto (300 s)
  const [totalEjercicios, setTotalEjercicios] = useState<number>(10)

  // 2. Estados del Juego
  const [estadoJuego, setEstadoJuego] = useState<EstadoJuego>('configuracion')
  const [ejercicioActual, setEjercicioActual] = useState<number>(1)
  const [numA, setNumA] = useState<number | null>(null)
  const [numB, setNumB] = useState<number | null>(null)
  const [userAnswer, setUserAnswer] = useState<string>('')
  const [feedback, setFeedback] = useState<{ msg: string; tipo: 'exito' | 'error' | null }>({
    msg: '',
    tipo: null,
  })

  // Puntuación y Tiempo
  const [correctas, setCorrectas] = useState<number>(0)
  const [incorrectas, setIncorrectas] = useState<number>(0)
  const [tiempoRestante, setTiempoRestante] = useState<number>(300)

  // Sincronizar tiempoRestante con tiempoLimite cuando se edita la configuración
  useEffect(() => {
    if (estadoJuego === 'configuracion') {
      setTiempoRestante(tiempoLimite)
    }
  }, [tiempoLimite, estadoJuego])

  // Generador de números aleatorios
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

  // Iniciar una nueva sesión de ejercicios
  const iniciarJuego = () => {
    setCorrectas(0)
    setIncorrectas(0)
    setEjercicioActual(1)
    setTiempoRestante(tiempoLimite) // Reinicia el contador con el tiempo seleccionado
    setEstadoJuego('jugando')
    generarNumeros()
  }

  // Volver a la pantalla de configuración / reinicio
  const reiniciarJuego = () => {
    setEstadoJuego('configuracion')
    setUserAnswer('')
    setFeedback({ msg: '', tipo: null })
  }

  // Manejo del temporizador global en modo 'cronometro'
  useEffect(() => {
    if (estadoJuego !== 'jugando' || modoJuego !== 'cronometro') return

    const timer = setInterval(() => {
      setTiempoRestante((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          setEstadoJuego('finalizado')
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [estadoJuego, modoJuego])

  // Calcular el resultado esperado
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

  // Comprobar la respuesta e ir advancing
  const comprobarRespuesta = (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (userAnswer.trim() === '' || estadoJuego !== 'jugando') return

    const correcto = calcularResultadoCorrecto()
    const respuestaNum = Number(userAnswer)

    const esCorrecto = respuestaNum === correcto

    if (esCorrecto) {
      setCorrectas((prev) => prev + 1)
      setFeedback({ msg: '🎉 ¡Correcto!', tipo: 'exito' })
    } else {
      setIncorrectas((prev) => prev + 1)
      setFeedback({ msg: `❌ El resultado era ${correcto}.`, tipo: 'error' })
    }

    // Avanzar al siguiente ejercicio o finalizar
    setTimeout(() => {
      if (ejercicioActual < totalEjercicios) {
        setEjercicioActual((prev) => prev + 1)
        generarNumeros()
      } else {
        setEstadoJuego('finalizado')
      }
    }, 1000)
  }

  return (
    <MathContext.Provider
      value={{
        operacion,
        minA,
        maxA,
        minB,
        maxB,
        modoJuego,
        tiempoLimite,
        totalEjercicios,
        estadoJuego,
        ejercicioActual,
        numA,
        numB,
        userAnswer,
        feedback,
        correctas,
        incorrectas,
        tiempoRestante,
        setOperacion,
        setMinA,
        setMaxA,
        setMinB,
        setMaxB,
        setModoJuego,
        setTiempoLimite,
        setTotalEjercicios,
        setUserAnswer,
        iniciarJuego,
        reiniciarJuego,
        comprobarRespuesta,
      }}
    >
      {children}
    </MathContext.Provider>
  )
}

export const useMath = () => {
  const context = useContext(MathContext)
  if (!context) {
    throw new Error('useMath debe usarse dentro de un MathProvider')
  }
  return context
}