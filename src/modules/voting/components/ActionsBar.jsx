/**
 * Barra de acciones superior con los botones principales de la vista.
 * @param {{showExpulsados: boolean, onToggleExpulsados: () => void, onShare: () => void, onReset: () => void}} props
 */
function ActionsBar({ showExpulsados, onToggleExpulsados, onShare, onReset }) {
  return (
    <div className="actions-bar">
      <button
        type="button"
        className="action-btn ghost"
        onClick={onToggleExpulsados}
      >
        {showExpulsados ? 'Ocultar expulsados' : 'Mostrar expulsados'}
      </button>
      <button
        type="button"
        className="action-btn primary"
        onClick={onShare}
      >
        Compartir votos
      </button>
      <button
        type="button"
        className="action-btn danger"
        onClick={onReset}
      >
        Reiniciar votos
      </button>
    </div>
  );
}

export default ActionsBar;
