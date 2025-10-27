const STORAGE_KEY = 'votosOT';

const isBrowser = () => typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';

/**
 * Recupera los votos persistidos en localStorage.
 * @returns {import('../types.js').VoteMap}
 */
export const loadVotes = () => {
  if (!isBrowser()) return {};
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    console.warn('No se pudieron leer los votos guardados', error);
    return {};
  }
};

/**
 * Persiste los votos en localStorage.
 * @param {import('../types.js').VoteMap} votes
 */
export const persistVotes = (votes) => {
  if (!isBrowser()) return;
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

/**
 * Elimina cualquier voto persistido.
 */
export const clearVotes = () => {
  if (!isBrowser()) return;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.warn('No se pudieron limpiar los votos', error);
  }
};
