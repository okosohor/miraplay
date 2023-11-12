import { useDispatch, useSelector } from 'react-redux';
import { ErrorPage } from '../../pages/ErrorPage';
import { GamesPage } from '../../pages/GamesPage';
import { LoginPage } from '../../pages/LoginPage';
import { RegisterPage } from '../../pages/RegisterPage';
import './App.css';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { fetchAuthMe } from '../../redux/slices/authSlice';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAuthMe());
  },[dispatch]);
  const isAuth = useSelector(state => Boolean(state.auth.data));

  return (
    <Routes>
      <Route path="/" element={<Navigate to={isAuth ? '/games' : '/login'}/>}/>
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/register" element={<RegisterPage />}/>
      <Route path="/games" element={<GamesPage />}/>
      <Route path="*" element={<ErrorPage />}/>
    </Routes>
  );
}

export default App;
