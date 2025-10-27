import { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { CONCURSANTES, OPCIONES, VOTE_CLASS } from './data/contestants.js';

const STORAGE_KEY = 'votosOT';

const loadInitialVotes = () => {
  if (typeof window === 'undefined') return {};
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    console.warn('No se pudieron leer los votos guardados', error);
    return {};
  }
};

const saveVotes = (votes) => {
  if (typeof window === 'undefined') return;
  try {
    const keys = Object.keys(votes);
    if (keys.length === 0) {
      window.localStorage.removeItem(STORAGE_KEY);
    } else {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(votes));
    }
  } catch (error) {
    console.warn('No se pudieron guardar los votos', error);
  }
};

const ContestantCard = ({ contestant, vote, isActive, onClick }) => {
  const classNames = ['card'];
  if (contestant.expulsado) classNames.push('expulsado');
  if (vote && VOTE_CLASS[vote]) classNames.push(VOTE_CLASS[vote]);

  const handleKeyDown = (event) => {
    if (contestant.expulsado) return;
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onClick(contestant);
    }
  };

  return (
    <div
      className={classNames.join(' ')}
      data-id={contestant.id}
      data-active={isActive ? 'true' : undefined}
      onClick={() => !contestant.expulsado && onClick(contestant)}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={contestant.expulsado ? -1 : 0}
      aria-disabled={contestant.expulsado}
      aria-pressed={isActive}
    >
      <div className="avatar-wrap">
        <img
          className="avatar"
          src={contestant.foto}
          alt={contestant.nombre}
          loading="lazy"
        />
      </div>
      <div className="info">
        <div className="name">
          {contestant.nombre}
          {contestant.expulsado ? ' (Expulsado)' : ''}
        </div>
        <div className="vote-status">{vote || 'Sin voto'}</div>
      </div>
    </div>
  );
};

const VoteSheet = ({ contestant, selectedVote, onSelect }) => {
  const sheetRef = useRef(null);

  useEffect(() => {
    const node = sheetRef.current;
    if (!node) return;
    const frame = requestAnimationFrame(() => node.classList.add('active'));
    return () => {
      cancelAnimationFrame(frame);
      node.classList.remove('active');
    };
  }, []);

  const handleSelect = (option) => {
    onSelect(option);
  };

  const handleOptionKeyDown = (event, option) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onSelect(option);
    }
  };

  return (
    <div className="sheet" data-id={contestant.id} ref={sheetRef}>
      <h3>Votar a {contestant.nombre}</h3>
      <div className="options">
        {OPCIONES.map((option) => {
          const classNames = ['option-btn'];
          if (selectedVote === option) classNames.push('selected');
          return (
            <div
              key={option}
              className={classNames.join(' ')}
              data-value={option}
              role="button"
              tabIndex={0}
              onClick={() => handleSelect(option)}
              onKeyDown={(event) => handleOptionKeyDown(event, option)}
            >
              {option}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const SummaryMiniCard = ({ contestant, vote }) => {
  const classNames = ['mini-card'];
  if (vote && VOTE_CLASS[vote]) classNames.push(VOTE_CLASS[vote]);
  if (contestant.expulsado) classNames.push('expulsado');

  return (
    <div className={classNames.join(' ')}>
      <div className="mini-avatar-wrap">
        <img
          className="mini-avatar"
          src={contestant.foto}
          alt={contestant.nombre}
          loading="lazy"
        />
      </div>
      <div className="mini-info">
        <div className="mini-name">{contestant.nombre}</div>
        <div className="mini-vote">{vote}</div>
      </div>
    </div>
  );
};

const SummaryModal = ({
  items,
  onClose,
  onExport,
  captureRef,
  isExporting
}) => {
  const overlayRef = useRef(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;
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
};

const ActionsBar = ({ showExpulsados, onToggleExpulsados, onShare, onReset }) => (
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

function App() {
  const [votes, setVotes] = useState(loadInitialVotes);
  const [showExpulsados, setShowExpulsados] = useState(false);
  const [activeSheetId, setActiveSheetId] = useState(null);
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const captureRef = useRef(null);

  useEffect(() => {
    saveVotes(votes);
  }, [votes]);

  const contestants = useMemo(() => {
    const visibles = CONCURSANTES.filter((c) => !c.expulsado);
    if (showExpulsados) {
      const expulsados = CONCURSANTES.filter((c) => c.expulsado);
      return [...visibles, ...expulsados];
    }
    return visibles;
  }, [showExpulsados]);

  const votedContestants = useMemo(() => {
    return CONCURSANTES.reduce((acc, contestant) => {
      const vote = votes[contestant.id];
      if (vote) acc.push({ contestant, vote });
      return acc;
    }, []);
  }, [votes]);

  const handleToggleExpulsados = () => {
    setShowExpulsados((prev) => !prev);
  };

  const handleResetVotes = () => {
    setVotes({});
    setActiveSheetId(null);
    saveVotes({});
  };

  const handleShare = () => {
    setActiveSheetId(null);
    setIsSummaryOpen(true);
  };

  const handleCloseSummary = () => {
    setIsSummaryOpen(false);
  };

  const handleCardClick = (contestant) => {
    if (contestant.expulsado) return;
    setActiveSheetId((prev) => (prev === contestant.id ? null : contestant.id));
  };

  const handleSelectVote = (contestantId, option) => {
    setVotes((prev) => ({
      ...prev,
      [contestantId]: option
    }));
    setActiveSheetId(null);
  };

  const handleExportSummary = async () => {
    const captureNode = captureRef.current;
    if (!captureNode) return;
    setIsExporting(true);
    try {
      const canvas = await html2canvas(captureNode, {
        backgroundColor:
          getComputedStyle(document.body).backgroundColor || '#0c0d14',
        scale: window.devicePixelRatio > 1 ? 2 : 1
      });
      const url = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      const now = new Date();
      const pad = (value) => String(value).padStart(2, '0');
      link.download = `votos-ot25_${now.getFullYear()}-${pad(
        now.getMonth() + 1
      )}-${pad(now.getDate())}_${pad(now.getHours())}${pad(
        now.getMinutes()
      )}.png`;
      link.href = url;
      link.click();
    } catch (error) {
      console.error('No se pudo exportar el resumen', error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <>
      <header className="appbar">
        <div className="brand">
          <div className="badge" />
          <div>
            <div className="title">Votaciones OT 2025</div>
            <div className="sub">Selecciona una opción por concursante</div>
          </div>
        </div>
      </header>

      <main className="container">
        <ActionsBar
          showExpulsados={showExpulsados}
          onToggleExpulsados={handleToggleExpulsados}
          onShare={handleShare}
          onReset={handleResetVotes}
        />

        {contestants.map((contestant) => {
          const vote = votes[contestant.id];
          const isActive = activeSheetId === contestant.id;
          return (
            <Fragment key={contestant.id}>
              <ContestantCard
                contestant={contestant}
                vote={vote}
                isActive={isActive}
                onClick={handleCardClick}
              />
              {isActive && !contestant.expulsado && (
                <VoteSheet
                  contestant={contestant}
                  selectedVote={vote}
                  onSelect={(option) => handleSelectVote(contestant.id, option)}
                />
              )}
            </Fragment>
          );
        })}
      </main>

      {isSummaryOpen && (
        <SummaryModal
          items={votedContestants}
          onClose={handleCloseSummary}
          onExport={handleExportSummary}
          captureRef={captureRef}
          isExporting={isExporting}
        />
      )}
    </>
  );
}

export default App;
