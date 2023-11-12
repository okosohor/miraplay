import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import cn from 'classnames';
import './Register.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRegister, resetData } from '../../redux/slices/registerSlice';

export const Register = () => {
  const dispatch = useDispatch();
  const { data, isLoading, errorMessage}= useSelector(state => state.register);
  const { register, watch, handleSubmit, setError, formState: {errors, isValid} } = useForm ({
    defaultValues: {
      email: '',
      login: '',
      password: '',
      confPassword: '',
      
    },
    mode: 'onSubmit',
  });

  const clearData = () => {
    dispatch(resetData());
  };


  const onSubmit =  async (params) => {

    const { confPassword, ...paramsToSend} = params;

    // registerData = await dispatch(fetchRegister(paramsToSend));

    dispatch(fetchRegister(paramsToSend));

    // IF DATA NAVIGATE TO


    // if(data.payload && 'token' in data.payload) {
    //   window.localStorage.setItem('token', data.payload.token);
    // } 
  
  };
  // const dispatch = useDispatch();
  // const serverError = useSelector(state => state.auth.errorMessage);
  // console.log(serverError);

  // if(isAuth) {
  //   return <Navigate to="/games"/>;
  // }
  return (
    <div className="register">
      {isLoading && <p className="register__loading-text">Завантаження...</p>}
      <form className="register__form" onSubmit={(handleSubmit(onSubmit))}>
        <p className="register__input-title">Введіть емейл :</p>
        <input 
          className={cn('register__input', {'register__input--error': errors.email?.message})} 
          type="text"
          autoComplete="off"
          {...register('email', 
            {
              required: 'Введіть емейл', 
              email: 'Введіть коректний емейл',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: 'Введіть коректний емейл'},
            })}
            
          onChange={() => {
            setError('email', {
              type: 'manual',
              message: '',
            });
          }}
        />
        <p className="register__error">{errors.email?.message}</p>
        <p className="register__input-title">Введіть логін :</p>
        <input 
          className={cn('register__input', {'register__input--error': errors.login?.message})}
          type="text" 
          {...register('login', {required: 'Введіть логін', minLength: {value:3, message:'Мінімальна довжина 3 символи'}})}
          autoComplete="off"
          onChange={() => {
            setError('login', {
              type: 'manual',
              message: '',
            });
          }}
        />
        <p className="register__error">{errors.login?.message}</p>
        <p className="register__input-title">Введіть пароль :</p>
        <input 
          className={cn('register__input', {'register__input--error': errors.password?.message})}
          type="password"
          {...register('password', {required: 'Введіть пароль', minLength: {value:5, message:'Мінімальна довжина 5 символів'}})}
          onChange={() => {
            setError('password', {
              type: 'manual',
              message: '',
            });
          }}
          
        />
        <p className="register__error">{errors.password?.message}</p>
        <p className="register__input-title">Продублюйте пароль :</p>
        <input 
          className={cn('register__input', {'register__input--error': errors.confPassword?.message})}
          type="password" 
          {...register('confPassword', 
            {
              required: 'Продублюйте пароль', 
              minLength: {value:5, message:'Мінімальна довжина 5 символів'},
              validate: (value) => {if (watch('password') !== value) {
                return 'Паролі не збігаються';
              }},
            })}
          onChange={() => {
            setError('confPassword', {
              type: 'manual',
              message: '',
            });
          }}
        />
        <p className="register__error ">{errors.confPassword?.message}</p>
        <p className="register__error ">{errorMessage}</p>
        <button disabled={isLoading} type="submit" className="register__button">Зареєструватися</button>
      </form>
      <Link to={'/login'}>
        <button disabled={isLoading} className="register__button">Натисни якщо вже маєш аккаунт</button>
      </Link>
      {data && 
      <Link to={'/login'} onClick={clearData}>
        <p className="register__success-message">Вітаємо з успішною реєстрацією, натисніть на цей текст для авторизації</p>
      </Link>
      }
    </div>
  );
};
