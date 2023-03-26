import { Form } from './../Form/Form';
import './Authorization.scss';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {
  EMAIL_REGEXP,
  VALIDATE_CONFIG,
  PASS_REGEXP,
} from './../../constants/constants';
import { authApi } from './../../utils/authApi';
import { useContext } from 'react';
import { PostsContext } from './../../context/PostsContext';

export const RegisterForm = ({ setShowAuthComponent, handleCloseModal }) => {
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

const {setIsAuth} = useContext(PostsContext);


  const sendData = (data) => {
    authApi
      .registration({...data, group: 'group-9'})
      .then((result) => {
        const { token } = result;
        localStorage.setItem('token', token);
        setIsAuth(true)

      })
      .catch((error) => console.log(error))
      .finally(handleCloseModal());
    console.log({ data });
  };

  const navigate = useNavigate();

  return (
    <Form
      handleFormSubmit={handleSubmit(sendData)}
      className="login"
      title="Register">
      <input {...emailRegister} type="email" name="email" placeholder="Email" />
      {errors.email && <p>{errors?.email?.message}</p>}
      <input
        {...passwordRegister}
        type="password"
        name="password"
        placeholder="Password"
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
      <button type="submit">Register</button>

      <div onClick={() => setShowAuthComponent('login')}>Login</div>
    </Form>
  );
};
