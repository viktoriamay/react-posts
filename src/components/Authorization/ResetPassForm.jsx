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

export const ResetPassForm = ({ setShowAuthComponent, handleCloseModal }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onBlur' });

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
  const [tokenResp, setTokenResp] = useState(false);
const {setIsAuth} = useContext(PostsContext);
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

    const tokenRegister =
    tokenResp &&
    register('token', {
      required: {
        value: !!tokenResp,
        message: VALIDATE_CONFIG.requiredMessage,
      }
    });
    

  const sendData = (formData) => {
    if (tokenResp) {
      authApi
        .resetPasswordToken({ password: formData.password }, formData.token)
        .then(({ token, data }) => {
          if (token) {
            localStorage.setItem('token', token);
            localStorage.setItem('userData', JSON.stringify(data));
            setIsAuth(true);
          }
        })
        .catch((error) => {
          console.error(error);
        }).finally(handleCloseModal());;
    } else {
      authApi
        .resetPassword(formData)
        .then(() => {
          setTokenResp(true);
        })
        .catch((error) => {
          console.error(error);
        })
    }
  };

  const navigate = useNavigate();

  return (
    <Form
      handleFormSubmit={handleSubmit(sendData)}
      className="login"
      title="ResetPass">
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
          placeholder="Password"
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

      <button type="submit">Reset Password</button>

      <div onClick={() => setShowAuthComponent('login')}>Login</div>
    </Form>
  );
};
