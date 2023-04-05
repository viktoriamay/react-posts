import { Form } from './../Form/Form';
import './Authorization.scss';
import { useForm } from 'react-hook-form';
import {
  EMAIL_REGEXP,
  VALIDATE_CONFIG,
  PASS_REGEXP,
} from './../../constants/constants';
import { useContext } from 'react';
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
      className="form__modals"
      title="Восстановление пароля">
      <input
        {...emailRegister}
        type="email"
        name="email"
        placeholder="Email"
        disabled={tokenResp}
        className='form__input'
      />
      {errors.email && <span className="form__errors">{errors?.email?.message}</span>}

      <div className={tokenResp ? 'reset_pass__active' : 'reset_pass__hide'} >
        <input
          {...passwordRegister}
          type="password"
          name="password"
          placeholder="Пароль"
          disabled={tokenResp ? false : true}
          className='form__input'
        />
        {errors.password && <span className="form__errors">{errors?.password?.message}</span>}
        <input
          {...tokenRegister}
          type="text"
          name="token"
          placeholder="Token"
          disabled={tokenResp ? false : true}
          className='form__input'
        />
        {errors.token && <span className="form__errors">{errors?.token?.message}</span>}
      </div>

      <button className='form__button' type="submit">Восстановить пароль</button>

      <div className='auth__navigation' onClick={() => setShowAuthComponent('login')}>Вход</div>
    </Form>
  );
};
