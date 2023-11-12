import { CardList } from '../../components/CardList';
import { Header } from '../../components/Header';
import './GamesPage.scss';

export const GamesPage = () => {

  return (
    <div className="games-page">
      <Header/>
      <CardList/>
    </div>
  );
};
