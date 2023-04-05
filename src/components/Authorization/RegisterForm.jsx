import { Form } from './../Form/Form';
import './Authorization.scss';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {
  EMAIL_REGEXP,
  VALIDATE_CONFIG,
  PASS_REGEXP,
} from './../../constants/constants';
import { useContext } from 'react';
import { PostsContext } from './../../context/PostsContext';

export const RegisterForm = ({ setShowAuthComponent, headerCloseModal }) => {
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

  const { registrationRequest, handleHeaderCloseModal } =
    useContext(PostsContext);

  const navigate = useNavigate();

  return (
    <Form
      handleFormSubmit={handleSubmit(registrationRequest)}
      className="form__modals"
      title="Регистрация">
      <input
        {...emailRegister}
        type="email"
        name="email"
        placeholder="Email"
        className="form__input"
      />
      {errors.email && (
        <span className="form__errors">{errors?.email?.message}</span>
      )}
      <input
        {...passwordRegister}
        type="password"
        name="password"
        placeholder="Пароль"
        className="form__input"
      />
      {errors.password && (
        <span className="form__errors">{errors?.password?.message}</span>
      )}
      <span
        className="auth__info"
        onClick={() => {
          navigate('/policy');
          handleHeaderCloseModal();
        }}>
        Регистрируясь на сайте, вы соглашаетесь с нашими Правилами и Политикой
        конфиденциальности и соглашаетесь на информационную рассылку.
      </span>
      <button className="form__button" type="submit">
        Регистрация
      </button>

      <div
        className="auth__navigation"
        onClick={() => setShowAuthComponent('login')}>
        Вход
      </div>
    </Form>
  );
};