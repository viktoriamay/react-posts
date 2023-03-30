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

const { registrationRequest} = useContext(PostsContext);

  const navigate = useNavigate();

  return (
    <Form
      handleFormSubmit={handleSubmit(registrationRequest)}
      className="login"
      title="Регистрация">
      <input {...emailRegister} type="email" name="email" placeholder="Email" />
      {errors.email && <p>{errors?.email?.message}</p>}
      <input
        {...passwordRegister}
        type="password"
        name="password"
        placeholder="Пароль"
      />
      {errors.password && <p>{errors?.password?.message}</p>}
      <p
        className="auth__info"
        onClick={() => {
          navigate('/policy');
        }}
        style={{ textAlign: 'left', fontSize: '12px', lineHeight: '14px' }}>
        Регистрируясь на сайте, вы соглашаетесь с нашими Правилами и Политикой
        конфиденциальности и соглашаетесь на информационную рассылку.
      </p>
      <button type="submit">Регистрация</button>

      <div onClick={() => setShowAuthComponent('login')}>Вход</div>
    </Form>
  );
};
