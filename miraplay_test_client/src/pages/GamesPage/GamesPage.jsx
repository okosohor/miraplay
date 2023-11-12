import { CardList } from '../../components/CardList';
import { Header } from '../../components/Header';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './GamesPage.scss';

export const GamesPage = () => {
  const isAuth = useSelector(state => Boolean(state.auth.data));

  return (
    <div className="games-page">
      <Header/>
      <CardList/>
    </div>
  );
};
