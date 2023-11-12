import { useEffect, useState } from 'react';
import cn from 'classnames';
import { Card } from '../Card/Card';
import './CardList.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGames } from '../../redux/slices/gamesSlice';
import { Navigate } from 'react-router-dom';

const category = [
  {title:'ВСІ', value:['ALL', 'FREE', 'MOBA', 'SHOOTERS', 'LAUNCHERS', 'MMORPG', 'STRATEGY', 'FIGHTING', 'RACING', 'SURVIVAL', 'ONLINE']},
  {title:'БЕЗКОШТОВНІ', value:'FREE'},
  {title:'MOBA', value:'MOBA'},
  {title:'ШУТЕРИ', value:'SHOOTERS'},
  {title:'ЛАУНЧЕРИ', value:'LAUNCHERS'},
  {title:'MMO', value:'MMORPG'},
  {title:'СТРАТЕГІЇ', value:'STRATEGY'},
  {title:'РИБОЛОВЛЯ', value:'FIGHTING'},
  {title:'ГОНКИ', value:'RACING'},
  {title:'ВИЖИВАННЯ', value:'SURVIVAL'},
  {title:'ОНЛАЙН', value:'ONLINE'},
];

export const CardList = () => {
  const [page, setPage] = useState(1);
  const [sortByNew, setSortByNew] = useState(true);
  // const [data, setData] = useState([]);
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

    // async function fetchData() {
    //   try {
    //     const response = await fetch('https://api.miraplay.cloud/games/by_page', {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify(postData),
    //     });
    
    //     if (!response.ok) {
    //       throw new Error('Something went wrong');
    //     }
    
    //     const data = await response.json();
    //     setData(data);
    //   } catch (error) {
    //     throw new Error(error);
    //   }
    // }
    
    
    // fetchData();
    


    // console.log(gamesCategory);
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
        <div className="card-list__selector-block">
          <div className="card-list__category">
            {category.map(({ title, value }) => (
              <button key={title} className={cn('card-list__category-button', { 'card-list__category-button--selected': value === gamesCategory})} onClick={() => setGamesCategory(value)}>{title}</button>
            ))}
          </div>
          <div className="card-list__sort">
            <p className="card-list__sort-title">Показувати спочатку:</p>
            <button 
              className={cn('card-list__sort-button', {'card-list__sort-button--selected' : sortByNew})}  
              onClick={() => setSortByNew(true)}
            >
              Новіші
            </button>
            <button 
              className={cn('card-list__sort-button', {'card-list__sort-button--selected' : !sortByNew})}
              onClick={() => setSortByNew(false)}
            >
              Старіші
            </button>
          </div>
        </div>

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
