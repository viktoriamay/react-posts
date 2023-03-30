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
import { useState, useContext } from 'react';
import { PostsContext } from './../../context/PostsContext';

export const ResetPassForm = ({ setShowAuthComponent, headerCloseModal }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onBlur' });
  
  const { resetPasswordRequest, tokenResp } = useContext(PostsContext);

  const tokenRegister =
    tokenResp &&
    register('token', {
      required: {
        value: !!tokenResp,
        message: VALIDATE_CONFIG.requiredMessage,
      }
    });

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

  const passwordRegister =
    tokenResp &&
    register('password', {
      required: {
        value: !!tokenResp,
        message: VALIDATE_CONFIG.requiredMessage,
      },
      pattern: {
        value: PASS_REGEXP,
        message: VALIDATE_CONFIG.password,
      },
    });

  return (
    <Form
      handleFormSubmit={handleSubmit(resetPasswordRequest)}
      className="login"
      title="Восстановление пароля">
      <input
        className=""
        {...emailRegister}
        type="email"
        name="email"
        placeholder="Email"
        disabled={tokenResp}
      />
      {errors.email && <p>{errors?.email?.message}</p>}

      <div style={tokenResp ? { display: 'block' } : { display: 'none' }}>
        <input
          {...passwordRegister}
          type="password"
          name="password"
          placeholder="Пароль"
          disabled={tokenResp ? false : true}
        />
        {errors.password && <p>{errors?.password?.message}</p>}
        <input
          {...tokenRegister}
          type="text"
          name="token"
          placeholder="Token"
          disabled={tokenResp ? false : true}
        />
      </div>

      <button type="submit">Восстановить пароль</button>

      <div onClick={() => setShowAuthComponent('login')}>Вход</div>
    </Form>
  );
};
