import { useContext } from 'react';
import { PostsContext } from './../../context/PostsContext';
import { useForm } from 'react-hook-form';
import { Form } from './../Form/Form';
import { VALIDATE_CONFIG } from './../../constants/constants';
import { LogoutOutlined } from '@ant-design/icons';
import './Profile.scss';
import { PagesBackButton } from '../PagesBackButton/PagesBackButton';
import { Spinner } from './../Spinner/Spinner';

export const Profile = () => {
  const { currentUser, editProfileRequest, editAvatarRequest, handleLogout } =
    useContext(PostsContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onChange' });

  const required = {
    value: true,
    message: VALIDATE_CONFIG.requiredMessage,
  };

  return (
    <div>
      <div className="button_back_offset">
        <PagesBackButton />
        <LogoutOutlined onClick={handleLogout} className="header__login_icon" />
      </div>
      <h2>Редактирование профиля</h2>
      {currentUser ? (
        <div className="profile">
          <div className="profile__avatar">
            <img src={currentUser?.avatar} alt="user-avatar" />
          </div>
          <Form
            className="profile__form"
            handleFormSubmit={handleSubmit(editAvatarRequest)}>
            <div className="profile__input_block">
              <input
                className="form__input"
                {...register('avatar', {
                  required,
                })}
                type="text"
                name="avatar"
                placeholder="Avatar"
                defaultValue={currentUser?.avatar}
              />
              {errors.avatar && (
                <span className="form__errors profile_form__errors">
                  {errors?.avatar.message}
                </span>
              )}
            </div>
            <button className="form__button profile__button" type="submit">
              Изменить аватар
            </button>
          </Form>
          <Form
            className="profile__form form__form"
            handleFormSubmit={handleSubmit(editProfileRequest)}>
            <div className="profile__input_block">
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
              {errors.name && (
                <span className="form__errors profile_form__errors">
                  {errors?.name.message}
                </span>
              )}
            </div>
            <div className="profile__input_block">
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
              {errors.about && (
                <span className="form__errors profile_form__errors">
                  {errors?.about.message}
                </span>
              )}
            </div>

            <input
              className="form__input"
              type="email"
              name="email"
              placeholder="email"
              defaultValue={currentUser.email}
              disabled
            />

            <button className="form__button profile__button" type="submit">
              Изменить данные профиля
            </button>
          </Form>
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
};
