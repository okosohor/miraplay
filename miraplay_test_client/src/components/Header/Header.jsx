import { useDispatch, useSelector } from 'react-redux';
import './Header.scss';
import { logout } from '../../redux/slices/authSlice';


export const Header = () => {
  const login = useSelector(state => state.auth.data?.login);
  const dispatch = useDispatch();
  const handleClick = () => {
    if(window.confirm('Ви впевнені що хочете вийти?')) {
      dispatch(logout());
      window.localStorage.removeItem('token');
    }
  };

  return (
    <div className="header">
      <div className="header__container">
        <div className="header__logo">
          <p className="header__title">miraplay</p>
          <p className="header__subtitle">Cloud Gaming</p>
        </div>
        <div className="header__user">
          <p className="header__user-login">{login}</p>
          <button className="header__user-logout" onClick={handleClick}>Вихід</button>
        </div>
      </div>
    </div>
  );
};
