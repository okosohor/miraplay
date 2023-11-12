import { Link, Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import { fetchAuth, resetErrors } from '../../redux/slices/authSlice';
import './Login.scss';

export const Login = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(state => Boolean(state.auth.data));
  const isLoading = useSelector(state => state.auth.isLoading);
  const serverError = useSelector(state => state.auth.errorMessage);

  const { register, handleSubmit, setError, formState: {errors} } = useForm ({
    defaultValues: {
      login: '',
      password: '',
    },
    mode: 'onSubmit',
  });

  const handleRegisterClick = () => {
    dispatch(resetErrors());
  };

  const onSubmit =  async (params) => {
    const data = await dispatch(fetchAuth(params));

    if(data.payload && 'token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token);
    } 
  };

  if(isAuth) {
    return <Navigate to="/games"/>;
  }

  return (
    <div className="login">
      {isLoading && <p className="login__loading-text">Завантаження...</p>}
      <form className="login__form" onSubmit={(handleSubmit(onSubmit))}>
        <p className="login__input-title">Введіть логін :</p>
        <input 
          className={cn('login__input',{'login__input--error': errors.login?.message})} 
          type="text"
          autoComplete="off"
          onChange={() => {
            setError('login', {
              type: 'manual',
              message: '',
            });
          }}
          {...register('login', {
            required: 'Введіть логін', 
            minLength: {value:3, message:'Мінімальна довжина 3 символи',
            }}
          )}
        />
        <p className="login__error">{errors.login?.message}</p>
        <p className="login__input-title">Введіть пароль :</p>
        <input 
          className={cn('login__input',{'login__input--error': errors.password?.message})}
          type="password"
          onChange={() => {
            setError('password', {
              type: 'manual',
              message: '',
            });
          }}
          {...register('password', {
            required: 'Введіть пароль', 
            minLength: {value:5, message:'Мінімальна довжина 5 символів'},
          })}
        />
        <p className="login__error login__error--active">{errors.password?.message}</p>
        <p className="login__error">{serverError}</p>
        <button disabled={isLoading} type="submit" className="login__button">Увійти</button>
      </form>
      <Link to={'/register'}>
        <button onClick={handleRegisterClick} disabled={isLoading} className="login__button">Реєстрація</button>
      </Link>
    </div>
  );
};
