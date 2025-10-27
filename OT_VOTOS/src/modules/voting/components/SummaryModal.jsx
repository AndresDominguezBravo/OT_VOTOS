import { useEffect, useRef } from 'react';
import SummaryMiniCard from './SummaryMiniCard.jsx';

/**
 * Modal que muestra el resumen de votos y permite exportarlo.
 * @param {{items: Array<{contestant: import('../types.js').Contestant, vote: string}>, onClose: () => void, onExport: () => void, captureRef: import('react').RefObject<HTMLDivElement>, isExporting: boolean}} props
 */
function SummaryModal({ items, onClose, onExport, captureRef, isExporting }) {
  const overlayRef = useRef(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return undefined;
    const frame = requestAnimationFrame(() => overlay.classList.add('open'));
    return () => {
      cancelAnimationFrame(frame);
      overlay.classList.remove('open');
    };
  }, []);

  const handleOverlayClick = (event) => {
    if (event.target === overlayRef.current) {
      onClose();
    }
  };

  return (
    <div
      className="modal-overlay"
      ref={overlayRef}
      onClick={handleOverlayClick}
    >
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-label="Resumen de votos"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="modal-header">
          <div className="modal-title">Resumen de votos</div>
          <div className="modal-actions">
            <button
              type="button"
              className="modal-btn ghost"
              onClick={onClose}
            >
              Cerrar
            </button>
            <button
              type="button"
              className="modal-btn primary"
              onClick={onExport}
              disabled={items.length === 0 || isExporting}
            >
              {isExporting ? 'Generando...' : 'Guardar PNG'}
            </button>
          </div>
        </div>
        <div id="captureArea" ref={captureRef}>
          {items.length === 0 ? (
            <p
              style={{
                color: 'var(--muted)',
                margin: '6px 0 0 2px'
              }}
            >
              Aún no hay votos. Selecciona alguno para generar tu resumen.
            </p>
          ) : (
            <div className="summary-grid">
              {items.map(({ contestant, vote }) => (
                <SummaryMiniCard
                  key={contestant.id}
                  contestant={contestant}
                  vote={vote}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SummaryModal;
