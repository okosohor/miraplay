import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { fetchGames } from '../../redux/slices/gamesSlice';
import { category } from '../../utils/GamesCategory';
import { Card } from '../Card/Card';
import { Selector } from '../Selector';
import './CardList.scss';



export const CardList = () => {
  const [page, setPage] = useState(1);
  const [sortByNew, setSortByNew] = useState(true);
  const [gamesCategory, setGamesCategory] = useState(category[0].value);
  const dispatch = useDispatch();
  const data = useSelector(state => state.games);
  
  useEffect(() => {
    const config = { 
      page,
      isFreshGamesFirst: sortByNew,
      genre: gamesCategory,
      gamesToShow: 9,
    };
    dispatch(fetchGames(config));
  }, [gamesCategory, sortByNew, page, dispatch]);

  const isAuth = useSelector(state => Boolean(state.auth.data));

  if(!isAuth) {
    return (
      <Navigate to="/login"/>
    );
  }

  return (
    <div className="card-list">
      <div className="card-list__container">
        <h2 className="card-list__title">Всі ігри</h2>
        <Selector 
          gamesCategory={gamesCategory} 
          setSortByNew={setSortByNew} 
          sortByNew={sortByNew} 
          setGamesCategory={setGamesCategory}
        />
        <div className="card-list__list">
          { data.games?.map(game => (
            <Card key={game._id} game={game}/>
          ))}
        </div>
        {data.gamesListLength && data.gamesListLength !== data.games?.length && (
          <button 
            className="card-list__list-button"
            onClick={() => (setPage((prevPage) => prevPage + 1))}
          >
            Показати ще
          </button>
        )}
      </div>
    </div>
  );
};
