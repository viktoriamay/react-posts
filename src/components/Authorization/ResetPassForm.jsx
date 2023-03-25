import { Form } from './../Form/Form';
import './Authorization.scss';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {
  EMAIL_REGEXP,
  VALIDATE_CONFIG,
  PASS_REGEXP,
} from './../../constants/constants';

export const ResetPassForm = ({ setShowAuthComponent }) => {
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

  const sendData = (data) => {
    console.log({ data });
  };

  const navigate = useNavigate()

  return (
    <Form
      handleFormSubmit={handleSubmit(sendData)}
      className="login"
      title="ResetPass">
      <input {...emailRegister} type="email" name="email" placeholder="Email" />
      {errors.email && <p>{errors?.email?.message}</p>}
      <input
        {...passwordRegister}
        type="password"
        name="password"
        placeholder="Password"
      />
      {errors.password && <p>{errors?.password?.message}</p>}
      <input
        {...passwordRegister}
        type="text"
        name="token"
        placeholder="Token"
      />
      <button type="submit">Reset Password</button>
      
      <div onClick={() => setShowAuthComponent('login')}>Login</div>
    </Form>
  );
};
