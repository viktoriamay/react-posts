import { useContext } from 'react';
import { PostsContext } from './../../context/PostsContext';
import { useForm } from 'react-hook-form';
import { Form } from './../Form/Form';
import { VALIDATE_CONFIG } from './../../constants/constants';
import api from './../../utils/api';
import { useNavigate } from 'react-router-dom';

export const Profile = () => {
  const { currentUser, setCurrentUser } = useContext(PostsContext);
  console.log({ currentUser });

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
      Profile
      <span>Back</span>
      {currentUser ? (
        <>
          <Form className="" handleFormSubmit={handleSubmit(editProfile)}>
            <input
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
              {...register('about', {
                required,
              })}
              type="text"
              name="about"
              placeholder="about"
              defaultValue={currentUser.about}
            />
            {errors.name && <p>{errors?.about.message}</p>}

            <input
              type="email"
              name="email"
              placeholder="email"
              defaultValue={currentUser.email}
              disabled
            />

            <input
              type="text"
              name="id"
              placeholder="id"
              defaultValue={currentUser._id}
              disabled
            />

            <button type="submit">Edit profile</button>
            <button type="button" onClick={handleLogout}>
              Exit
            </button>
          </Form>
          <Form className="" handleFormSubmit={handleSubmit(editAvatar)}>
            <input
              {...register('avatar', {
                required,
              })}
              type="text"
              name="avatar"
              placeholder="avatar"
              defaultValue={currentUser.avatar}
            />
            {errors.name && <p>{errors?.about.message}</p>}
            <button type='submit'>Edit ava</button>
          </Form>
          <img src={currentUser.avatar} />
        </>
      ) : (
        <div>Error</div>
      )}
    </div>
  );
};
