import { useForm } from 'react-hook-form';

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onChange' });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3>Reg</h3>
      <input
        className="register__input"
        type="email"
        placeholder="email"
        {...register('email', {
          required: true,
          maxLength: 20,
        })}
      />
      <div>{errors?.name && <p>{errors?.name?.message}</p>}</div>
      <input
        className="register__input"
        type="password"
        placeholder="password"
        {...register('password', {
          required: true,
          minLength: 6,
        })}
      />
      <button className="form__button" type="submit">
        Reg
      </button>
    </form>
  );
};
