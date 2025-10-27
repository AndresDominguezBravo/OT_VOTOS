/**
 * Modal de confirmación para reiniciar los votos.
 * @param {{open: boolean, onCancel: () => void, onConfirm: () => void}} props
 */
function ConfirmResetModal({ open, onCancel, onConfirm }) {
  if (!open) return null;

  return (
    <div className="modal-overlay open" onClick={onCancel}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-label="Confirmar reinicio de votos"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="modal-header">
          <div className="modal-title">¿Reiniciar todos los votos?</div>
        </div>
        <p
          style={{
            color: 'var(--muted)',
            margin: '0 0 12px 2px'
          }}
        >
          Esta acción eliminará los votos guardados en este dispositivo.
        </p>
        <div className="modal-actions">
          <button type="button" className="modal-btn ghost" onClick={onCancel}>
            Cancelar
          </button>
          <button type="button" className="modal-btn danger" onClick={onConfirm}>
            Reiniciar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmResetModal;
