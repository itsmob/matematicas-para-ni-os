import { RangeConfig } from './RangeConfig'

interface ConfigModalProps {
  isOpen: boolean
  onClose: () => void
}

export const ConfigModal = ({ isOpen, onClose }: ConfigModalProps) => {
  if (!isOpen) return null

  return (
    <div style={styles.modalOverlay} onClick={onClose}>
      <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div style={styles.modalHeader}>
          <h2 style={styles.modalTitle}>Configuración</h2>
          <button style={styles.closeBtn} onClick={onClose}>
            ✖
          </button>
        </div>

        <RangeConfig />

        <button style={styles.saveBtn} onClick={onClose}>
          Guardar y Cerrar
        </button>
      </div>
    </div>
  )
}

const styles = {
  modalOverlay: {
    position: 'fixed' as const,
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
    boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
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