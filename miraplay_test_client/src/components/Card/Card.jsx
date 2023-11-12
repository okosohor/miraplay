import './Card.scss';
import steam from '../../images/Steam.svg';
import epicGames from '../../images/epic-games.svg';
import wargaming from './../../images/wargaming.svg';
import ea from './../../images/ea.svg';

export const Card = ({ game }) => {
  const launchersLogo = {
    'Steam': steam,
    'Epic Games': epicGames,
    'Wargaming': wargaming,
    'EA': ea,
  };

  const {
    commonGameName,
    gameImage,
    inTop,
    genre,
    gameClass,
    gameDescription,
    gameLaunchers,
  } = game;

  return (
    <div className="card">
      <img src={gameImage} alt="" className="card__image" />
      <div className="card__description">
        <h4 className="card__title">{commonGameName}</h4>
        <p className="card__text">{gameDescription}</p>
        <div className="card__banners">
          {inTop && <span className="card__top">TOP</span>}
          <span className="card__genre">{genre}</span>
        </div>
        {gameClass === 'STANDART' && <p className="card__free">БЕЗКОШТОВНО</p>}
        <div className="card__launchers">
          {gameLaunchers.map(launcher => (
            <img 
              key={launcher}className="card__logo" 
              src={launchersLogo[launcher]} 
              alt={launcher}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
