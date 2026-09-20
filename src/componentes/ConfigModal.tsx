import { useMath } from '../contexto/MathContext'
import { OperationSelector } from './OperationSelector'
import { RangeConfig } from './RangeConfig'
import { ExerciseCountSelector } from './ExerciseCountSelector'
import { TimeSelector } from './TimeSelector'

interface ConfigModalProps {
  isOpen: boolean
  onClose: () => void
}

export const ConfigModal = ({ isOpen, onClose }: ConfigModalProps) => {
  const { modoJuego, setModoJuego, reiniciarJuego } = useMath()

  if (!isOpen) return null

  const handleSave = () => {
    reiniciarJuego()
    onClose()
  }

  return (
    <div style={styles.modalOverlay} onClick={onClose}>
      <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div style={styles.modalHeader}>
          <h2 style={styles.modalTitle}>Configuración</h2>
          <button type="button" style={styles.closeBtn} onClick={onClose}>
            ✖
          </button>
        </div>

        {/* Selector de Operación */}
        <div style={styles.section}>
          <p style={styles.sectionTitle}><strong>Tipo de Operación:</strong></p>
          <OperationSelector />
        </div>

        {/* Configuración de Rangos (Mínimos y Máximos) */}
        <div style={styles.section}>
          <RangeConfig />
        </div>

        {/* Cantidad de Ejercicios */}
        <div style={styles.section}>
          <ExerciseCountSelector />
        </div>

        {/* Configuración del Modo de Juego / Reloj */}
        <div style={styles.section}>
          <p style={styles.sectionTitle}><strong>Modo de reloj:</strong></p>
          <div style={styles.modeContainer}>
            <button
              type="button"
              style={{
                ...styles.modeBtn,
                backgroundColor: modoJuego === 'libre' ? '#4A90E2' : '#e0e0e0',
                color: modoJuego === 'libre' ? '#fff' : '#333',
              }}
              onClick={() => setModoJuego('libre')}
            >
              Libre
            </button>
            <button
              type="button"
              style={{
                ...styles.modeBtn,
                backgroundColor: modoJuego === 'cronometro' ? '#4A90E2' : '#e0e0e0',
                color: modoJuego === 'cronometro' ? '#fff' : '#333',
              }}
              onClick={() => setModoJuego('cronometro')}
            >
              Contra Reloj
            </button>
          </div>
        </div>

        {/* Selector de Tiempo en Minutos (Solo si está activo Contra Reloj) */}
        {modoJuego === 'cronometro' && (
          <div style={styles.section}>
            <TimeSelector />
          </div>
        )}

        <button type="button" style={styles.saveBtn} onClick={handleSave}>
          Guardar y Cerrar
        </button>
      </div>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    padding: '20px',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: '16px',
    padding: '20px',
    width: '100%',
    maxWidth: '420px',
    maxHeight: '90vh',
    overflowY: 'auto',
    boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
    boxSizing: 'border-box',
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '15px',
  },
  modalTitle: {
    margin: 0,
    fontSize: '1.3rem',
    color: '#333',
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    fontSize: '1.2rem',
    cursor: 'pointer',
    color: '#888',
  },
  section: {
    marginBottom: '15px',
  },
  sectionTitle: {
    margin: '0 0 10px 0',
    color: '#555',
  },
  modeContainer: {
    display: 'flex',
    gap: '10px',
  },
  modeBtn: {
    flex: 1,
    padding: '8px 12px',
    border: 'none',
    borderRadius: '8px',
    fontSize: '0.95rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  saveBtn: {
    marginTop: '15px',
    backgroundColor: '#4A90E2',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    width: '100%',
  },
}