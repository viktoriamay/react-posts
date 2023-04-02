import { useContext } from 'react';
import { PostsContext } from './../../context/PostsContext';
import { useForm } from 'react-hook-form';
import { Form } from './../Form/Form';
import { VALIDATE_CONFIG } from './../../constants/constants';
import { useNavigate } from 'react-router-dom';
import { LeftOutlined } from '@ant-design/icons';
import './Profile.scss';
import { PagesBackButton } from '../PagesBackButton/PagesBackButton';

export const Profile = () => {
  const { currentUser, editProfileRequest, editAvatarRequest, handleLogout } =
    useContext(PostsContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onBlur' });

  const required = {
    value: true,
    message: VALIDATE_CONFIG.requiredMessage,
  };

  const navigate = useNavigate();

  return (
    <div>
      <div className='button_back_offset'>
        <PagesBackButton />
      </div>
      <h2>Редактирование профиля</h2>
      {currentUser ? (
        <div className="profile">
          <div className="profile__avatar">
            <img src={currentUser.avatar} alt="user-avatar" />
          </div>
          <Form
            className="profile__form"
            handleFormSubmit={handleSubmit(editAvatarRequest)}>
            <input
              className="form__input"
              {...register('avatar', {
                required,
              })}
              type="text"
              name="avatar"
              placeholder="avatar"
              defaultValue={currentUser.avatar}
            />
            {errors.name && <p>{errors?.about.message}</p>}
            <button className="form__button" type="submit">
              Изменить аватар
            </button>
          </Form>
          <Form
            className="profile__form"
            handleFormSubmit={handleSubmit(editProfileRequest)}>
            <input
              className="form__input"
              {...register('name', {
                required,
              })}
              type="text"
              name="name"
              placeholder="Имя"
              defaultValue={currentUser.name}
            />
            {errors.name && <p>{errors?.name.message}</p>}
            <input
              className="form__input"
              {...register('about', {
                required,
              })}
              type="text"
              name="about"
              placeholder="Обо мне"
              defaultValue={currentUser.about}
            />
            {errors.name && <p>{errors?.about.message}</p>}

            <input
              className="form__input"
              type="email"
              name="email"
              placeholder="email"
              defaultValue={currentUser.email}
              disabled
            />

            <button className="form__button" type="submit">
              Изменить данные профиля
            </button>
          </Form>
          <button
            className="form__button form__button_profile"
            type="button"
            onClick={handleLogout}>
            Выход
          </button>
        </div>
      ) : (
        <div>Error</div>
      )}
    </div>
  );
};
