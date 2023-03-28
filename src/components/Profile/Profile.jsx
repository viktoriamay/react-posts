import { useContext } from 'react';
import { PostsContext } from './../../context/PostsContext';
import { useForm } from 'react-hook-form';
import { Form } from './../Form/Form';
import { VALIDATE_CONFIG } from './../../constants/constants';
import api from './../../utils/api';
import { useNavigate } from 'react-router-dom';
import { LeftOutlined } from '@ant-design/icons';
import './Profile.scss'

export const Profile = () => {
  const { currentUser, setCurrentUser } = useContext(PostsContext);
  // console.log({ currentUser });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onBlur' });

  const editProfile =  (data) => {
    api.editUserInfo({name: data.name, about: data.about}).then((newUser) => setCurrentUser({...newUser}));
  };

  const editAvatar =  (src) => {
     api.editUserAvatar({avatar: src.avatar}).then((newUser) => setCurrentUser({...newUser}));
  };

  const required = {
    value: true,
    message: VALIDATE_CONFIG.requiredMessage,
  };

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div>
      <div onClick={() => navigate(-1)} className="post__button_back">
          <LeftOutlined />
          <span>Назад</span>
        </div>
      <h2>Редактирование профиля</h2>
      {currentUser ? (
        <div className='profile'>
        <div className='profile__avatar'>

        <img src={currentUser.avatar} />
        </div>
        <Form className="profile__form" handleFormSubmit={handleSubmit(editAvatar)}>
            <input className='form__input'
              {...register('avatar', {
                required,
              })}
              type="text"
              name="avatar"
              placeholder="avatar"
              defaultValue={currentUser.avatar}
            />
            {errors.name && <p>{errors?.about.message}</p>}
            <button className='form__button' type='submit'>Изменить аватар</button>
          </Form>
          <Form className="profile__form" handleFormSubmit={handleSubmit(editProfile)}>
            <input className='form__input'
              {...register('name', {
                required,
              })}
              type="text"
              name="name"
              placeholder="Имя"
              defaultValue={currentUser.name}
            />
            {errors.name && <p>{errors?.name.message}</p>}
            <input className='form__input'
              {...register('about', {
                required,
              })}
              type="text"
              name="about"
              placeholder="Обо мне"
              defaultValue={currentUser.about}
            />
            {errors.name && <p>{errors?.about.message}</p>}

            <input className='form__input'
              type="email"
              name="email"
              placeholder="email"
              defaultValue={currentUser.email}
              disabled
            />

            {/* <input className='form__input'
              type="text"
              name="id"
              placeholder="id"
              defaultValue={currentUser._id}
              disabled
            /> */}

            <button className='form__button' type="submit">Изменить данные профиля</button>
          </Form>
            <button className='form__button form__button_profile' type="button" onClick={handleLogout}>
              Выход
            </button>
          
        </div>
      ) : (
        <div>Error</div>
      )}
    </div>
  );
};
