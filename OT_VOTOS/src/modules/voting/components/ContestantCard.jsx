import { VOTE_CLASS } from '../constants/index.js';

/**
 * Tarjeta clickable para un concursante con su voto actual.
 * @param {{contestant: import('../types.js').Contestant, vote?: string, isActive: boolean, onClick: (contestant: import('../types.js').Contestant) => void}} props
 */
function ContestantCard({ contestant, vote, isActive, onClick }) {
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
}

export default ContestantCard;
