import { Form } from './../Form/Form';
import './Authorization.scss';
import { useContext } from 'react';
import {
  EMAIL_REGEXP,
  VALIDATE_CONFIG,
  PASS_REGEXP,
} from './../../constants/constants';

import { useForm } from 'react-hook-form';
import { PostsContext } from './../../context/PostsContext';

export const LoginForm = ({ setShowAuthComponent, headerCloseModal }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onChange' });

  const emailRegister = register('email', {
    required: {
      value: true,
      message: VALIDATE_CONFIG.requiredMessage,
    },
    pattern: {
      value: EMAIL_REGEXP,
      message: VALIDATE_CONFIG.email,
    },
  });

  const passwordRegister = register('password', {
    required: {
      value: true,
      message: VALIDATE_CONFIG.requiredMessage,
    },
    pattern: {
      value: PASS_REGEXP,
      message: VALIDATE_CONFIG.password,
    },
  });

  const { loginRequest } = useContext(PostsContext);

  return (
    <Form
      handleFormSubmit={handleSubmit(loginRequest)}
      className="form__modals"
      title="Вход">
      <input
        {...emailRegister}
        type="email"
        name="email"
        placeholder="Email"
        className="form__input"
      />
      {errors.email && <span className="form__errors">{errors?.email?.message}</span>}
      <input
        {...passwordRegister}
        type="password"
        name="password"
        placeholder="Пароль"
        className="form__input"
      />
      {errors.password && <span className="form__errors">{errors?.password?.message}</span>}
      <button className="form__button" type="submit">
        Вход
      </button>
      <div
        className="auth__navigation"
        onClick={() => setShowAuthComponent('reset-pass')}>
        Восстановление пароля
      </div>
      <div
        className="auth__navigation"
        onClick={() => setShowAuthComponent('register')}>
        Регистрация
      </div>
    </Form>
  );
};