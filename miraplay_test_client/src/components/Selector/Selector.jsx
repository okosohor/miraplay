import React from 'react';
import cn from 'classnames';
import { category } from '../../utils/GamesCategory';
import './Selector.scss';

export const Selector = ({ setSortByNew, sortByNew, setGamesCategory, gamesCategory}) => {
  return (
    <div className="selector">
      <div className="selector__category">
        {category.map(({ title, value }) => (
          <button key={title} className={cn('selector__category-button', { 'selector__category-button--selected': value === gamesCategory})} onClick={() => setGamesCategory(value)}>{title}</button>
        ))}
      </div>
      <div className="selector__sort">
        <p className="selector__sort-title">Показувати спочатку:</p>
        <button 
          className={cn('selector__sort-button', {'selector__sort-button--selected' : sortByNew})}  
          onClick={() => setSortByNew(true)}
        >
          Новіші
        </button>
        <button 
          className={cn('selector__sort-button', {'selector__sort-button--selected' : !sortByNew})}
          onClick={() => setSortByNew(false)}
        >
          Старіші
        </button>
      </div>
    </div>
  );
};
