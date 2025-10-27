import { VOTE_CLASS } from '../constants/index.js';

/**
 * Tarjeta compacta utilizada en el resumen compartible.
 * @param {{contestant: import('../types.js').Contestant, vote: string}} props
 */
function SummaryMiniCard({ contestant, vote }) {
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
}

export default SummaryMiniCard;
