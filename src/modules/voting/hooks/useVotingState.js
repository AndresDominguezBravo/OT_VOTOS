import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import { CONCURSANTES } from '../constants/index.js';
import { exportSummaryAsImage } from '../utils/exportSummary.js';
import { clearVotes, loadVotes, persistVotes } from '../utils/storage.js';

/**
 * Lógica principal de gestión de votos y acciones asociadas.
 */
export const useVotingState = () => {
  const [votes, setVotes] = useState(loadVotes);
  const [showExpulsados, setShowExpulsados] = useState(false);
  const [activeSheetId, setActiveSheetId] = useState(null);
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const captureRef = useRef(null);
  const [isConfirmResetOpen, setIsConfirmResetOpen] = useState(false);

  useEffect(() => {
    persistVotes(votes);
  }, [votes]);

  const contestants = useMemo(() => {
    const visibles = CONCURSANTES.filter((contestant) => !contestant.expulsado);
    if (showExpulsados) {
      const expulsados = CONCURSANTES.filter((contestant) => contestant.expulsado);
      return [...visibles, ...expulsados];
    }
    return visibles;
  }, [showExpulsados]);

  const votedContestants = useMemo(() => {
    return CONCURSANTES.reduce((accumulator, contestant) => {
      const vote = votes[contestant.id];
      if (vote) accumulator.push({ contestant, vote });
      return accumulator;
    }, []);
  }, [votes]);

  const toggleExpulsados = useCallback(() => {
    setShowExpulsados((previous) => !previous);
  }, []);

  const performReset = useCallback(() => {
    setVotes({});
    setActiveSheetId(null);
    clearVotes();
  }, []);

  const openResetConfirm = useCallback(() => {
    setIsConfirmResetOpen(true);
  }, []);

  const closeResetConfirm = useCallback(() => {
    setIsConfirmResetOpen(false);
  }, []);

  const confirmReset = useCallback(() => {
    performReset();
    setIsConfirmResetOpen(false);
  }, [performReset]);

  const openSummary = useCallback(() => {
    setActiveSheetId(null);
    setIsSummaryOpen(true);
  }, []);

  const closeSummary = useCallback(() => {
    setIsSummaryOpen(false);
  }, []);

  const toggleSheet = useCallback((contestantId) => {
    setActiveSheetId((previous) => (previous === contestantId ? null : contestantId));
  }, []);

  const selectVote = useCallback((contestantId, option) => {
    setVotes((previous) => ({
      ...previous,
      [contestantId]: option
    }));
    setActiveSheetId(null);
  }, []);

  const exportSummary = useCallback(async () => {
    const node = captureRef.current;
    if (!node) return;
    setIsExporting(true);
    try {
      await exportSummaryAsImage(node);
    } catch (error) {
      console.error('No se pudo exportar el resumen', error);
    } finally {
      setIsExporting(false);
    }
  }, []);

  return {
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
  };
};
