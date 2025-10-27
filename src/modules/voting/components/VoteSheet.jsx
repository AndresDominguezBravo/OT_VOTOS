import { useEffect, useRef } from 'react';
import { OPCIONES } from '../constants/index.js';

/**
 * Lista de opciones de voto mostrada debajo de la tarjeta seleccionada.
 * @param {{contestant: import('../types.js').Contestant, selectedVote?: string, onSelect: (option: string) => void}} props
 */
function VoteSheet({ contestant, selectedVote, onSelect }) {
  const sheetRef = useRef(null);

  useEffect(() => {
    const node = sheetRef.current;
    if (!node) return undefined;
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
}

export default VoteSheet;
