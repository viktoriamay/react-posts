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
import { useNavigate } from 'react-router-dom';
import { authApi } from './../../utils/authApi';

export const LoginForm = ({ setShowAuthComponent, handleCloseModal }) => {
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

  const navigate = useNavigate();

  const sendData = (data) => {
    authApi
      .login(data)
      .then((result) => {
        const { token } = result;
        localStorage.setItem('token', token);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(handleCloseModal());
  };

  return (
    <Form
      handleFormSubmit={handleSubmit(sendData)}
      className="login"
      title="Login">
      <input {...emailRegister} type="email" name="email" placeholder="Email" />
      {errors.email && <p>{errors?.email?.message}</p>}
      <input
        {...passwordRegister}
        type="password"
        name="password"
        placeholder="Password"
      />
      {errors.password && <p>{errors?.password?.message}</p>}
      <button type="submit">Login</button>
      <div onClick={() => setShowAuthComponent('reset-pass')}>
        Reset password
      </div>
      <div onClick={() => setShowAuthComponent('register')}>Register</div>
    </Form>
  );
};
