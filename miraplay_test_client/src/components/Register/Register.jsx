import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import { fetchRegister, resetData } from '../../redux/slices/registerSlice';
import './Register.scss';

export const Register = () => {
  const dispatch = useDispatch();
  const { data, isLoading, errorMessage}= useSelector(state => state.register);
  const { register, watch, handleSubmit, setError, formState: { errors } } = useForm ({
    defaultValues: {
      email: '',
      login: '',
      password: '',
      confPassword: '',
      
    },
    mode: 'onSubmit',
  });

  const onSubmit =  async (params) => {
    const { confPassword, ...paramsToSend} = params;
    dispatch(fetchRegister(paramsToSend));
  };

  const clearData = () => {
    dispatch(resetData());
  };

  return (
    <div className="register">
      {isLoading && <p className="register__loading-text">Завантаження...</p>}
      <form className="register__form" onSubmit={(handleSubmit(onSubmit))}>
        <p className="register__input-title">Введіть електронну пошту :</p>
        <input 
          className={cn('register__input', {'register__input--error': errors.email?.message})} 
          type="text"
          autoComplete="off"
          {...register('email', 
            {
              required: 'Введіть емейл', 
              email: 'Введіть коректну електронну пошту',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: 'Введіть коректну електронну пошту'},
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
          autoComplete="off"
          onChange={() => {
            setError('login', {
              type: 'manual',
              message: '',
            });
          }}
          {...register('login', {
            required: 'Введіть логін', 
            minLength: {value:3, message:'Мінімальна довжина 3 символи'},
            maxLength: {value:25, message:'Логін занадто довгий'},
          })}
        />
        <p className="register__error">{errors.login?.message}</p>
        <p className="register__input-title">Введіть пароль :</p>
        <input 
          className={cn('register__input', {'register__input--error': errors.password?.message})}
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
        <p className="register__error">{errors.password?.message}</p>
        <p className="register__input-title">Продублюйте пароль :</p>
        <input 
          className={cn('register__input', {'register__input--error': errors.confPassword?.message})}
          type="password"
          onChange={() => {
            setError('confPassword', {
              type: 'manual',
              message: '',
            });
          }}
          {...register('confPassword', 
            {
              required: 'Продублюйте пароль', 
              minLength: {value:5, message:'Мінімальна довжина 5 символів'},
              validate: (value) => {if (watch('password') !== value) {
                return 'Паролі не збігаються';
              }},
            })}
        />
        <p className="register__error ">{errors.confPassword?.message}</p>
        <p className="register__error ">{errorMessage}</p>
        <button disabled={isLoading} type="submit" className="register__button">Зареєструватися</button>
      </form>
      <Link to={'/login'}>
        <button disabled={isLoading} className="register__button">Натисни, якщо вже маєш аккаунт</button>
      </Link>
      {data && 
      <Link to={'/login'} onClick={clearData}>
        <p className="register__success-message">Вітаємо з успішною реєстрацією, натисніть на цей текст для авторизації</p>
      </Link>
      }
    </div>
  );
};
