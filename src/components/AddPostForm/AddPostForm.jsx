import { Form } from './../Form/Form';
import { useForm } from 'react-hook-form';
import { VALIDATE_CONFIG } from './../../constants/constants';
import api from './../../utils/api';
import { useContext, useEffect, useState } from 'react';
import { PostsContext } from './../../context/PostsContext';
import './AddPostForm.scss';
export const AddPostForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onBlur' });

  const { posts, setPosts, addPost } = useContext(PostsContext);

  const required = {
    value: true,
    message: VALIDATE_CONFIG.requiredMessage,
  };

  /* const onSendComment = (data) => {
    // setIsLoading(true);
    api
      .addComment(post._id, data)
      .then((result) => {
        setPost({ ...result });
        // openNotification('success', 'Успешно', 'Ваш отзыв успешно отправлен');
      })
 
  }; */

  /*  const handlePostLike = (post) => {
    // найти в посте в массиве лайков тот айди, который будет равен каррентЮзер._айди

    // другая запись функции выше без дополнительных переменных:
    // const liked = post.likes.some((id) => id === currentUser?._id);

    api.changeLikePost(post?._id, liked).then((newCard) => {
      const newPosts = posts?.map((postState) => {
        // console.log('Карточка из стейта', postState);
        // console.log('Карточка с сервера', newCard);
        return postState?._id === newCard?._id ? newCard : postState;
      });
      

        // отфильтруй так, чтобы кард айди не содержал новый кард айди
        setFavorites((prevState) =>
          prevState.filter((card) => card._id !== newCard._id),
        );
      }

      // в конце показываем карточки (сетим посты, отрисовываем) с учетом изменений (то есть изменяем те посты в которых что то поменялось)
      setPosts(newPosts);
    });
  }; */

  const [imageSrc, setImageSrc] = useState();

  function handleImageChange(event) {
    setImageSrc(event.target.value);
  }

  return (
    <>
      <Form
        className="add_post_form"
        handleFormSubmit={handleSubmit(addPost)}
        title="Добавьте ваш пост">
        <input
          className="form__input"
          {...register('title', {
            required,
          })}
          type="text"
          name="title"
          placeholder="Заголовок"
          defaultValue={''}
        />
        {errors.title && <span>{errors?.title.message}</span>}

        <textarea
          className="form__textarea"
          {...register('text', {
            required,
          })}
          type="text"
          name="text"
          placeholder="Описание"
          defaultValue={''}
        />
        {errors.text && <span>{errors?.text.message}</span>}

        <input
          className="form__input"
          {...register('image', {
            required,
          })}
          type="text"
          name="image"
          placeholder="Изображение"
          defaultValue={''}
          onChange={handleImageChange}
        />
        {imageSrc && <img src={imageSrc} alt="add-post-pic" />}
        {errors.image && <span>{errors?.image.message}</span>}
        <button className="form__button" type="submit">
          Добавить пост
        </button>
      </Form>
    </>
  );
};
