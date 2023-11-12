import React from 'react';
import { Link } from 'react-router-dom';
import './Error.scss';

export const Error = () => {
  return (
    <div className="error">
      <div className="error__content">
        <p className="error__title">Справи кепські, щось пішло не так...</p>
        <Link to={'/'}>
          <button className="error__button">Додомцю</button>
        </Link>
      </div>
    </div>
  );
};
