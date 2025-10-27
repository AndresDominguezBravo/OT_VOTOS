import { Fragment } from 'react';
import ActionsBar from './modules/voting/components/ActionsBar.jsx';
import ContestantCard from './modules/voting/components/ContestantCard.jsx';
import ConfirmResetModal from './modules/voting/components/ConfirmResetModal.jsx';
import SummaryModal from './modules/voting/components/SummaryModal.jsx';
import VoteSheet from './modules/voting/components/VoteSheet.jsx';
import { useVotingState } from './modules/voting/hooks/useVotingState.js';

function App() {
  const {
    contestants,
    votes,
    votedContestants,
    showExpulsados,
    activeSheetId,
    isSummaryOpen,
    isExporting,
    isConfirmResetOpen,
    captureRef,
    toggleExpulsados,
    openResetConfirm,
    closeResetConfirm,
    confirmReset,
    openSummary,
    closeSummary,
    toggleSheet,
    selectVote,
    exportSummary
  } = useVotingState();

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
          onToggleExpulsados={toggleExpulsados}
          onShare={openSummary}
          onReset={openResetConfirm}
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
                onClick={() => {
                  if (contestant.expulsado) return;
                  toggleSheet(contestant.id);
                }}
              />
              {isActive && !contestant.expulsado && (
                <VoteSheet
                  contestant={contestant}
                  selectedVote={vote}
                  onSelect={(option) => selectVote(contestant.id, option)}
                />
              )}
            </Fragment>
          );
        })}
      </main>

      {isSummaryOpen && (
        <SummaryModal
          items={votedContestants}
          onClose={closeSummary}
          onExport={exportSummary}
          captureRef={captureRef}
          isExporting={isExporting}
        />
      )}

      <ConfirmResetModal
        open={isConfirmResetOpen}
        onCancel={closeResetConfirm}
        onConfirm={confirmReset}
      />
    </>
  );
}

export default App;
