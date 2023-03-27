import { Form } from '../Form/Form';
import { useForm } from 'react-hook-form';
import { VALIDATE_CONFIG } from '../../constants/constants';
import { useContext, useEffect, useState } from 'react';
import { PostsContext } from '../../context/PostsContext';
import { Modal } from '../Modal/Modal';

export const EditPostForm = ({editPost}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onBlur' });

  const { posts, setPosts, addPost, setActiveModal, activeModal } = useContext(PostsContext);

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

  



  


  const [activeHeaderModal, setActiveHeaderModal] = useState({
    isOpen: false,
    component: 'register',
  });


  return (
    <>
      <Form handleFormSubmit={handleSubmit(editPost)}>
        <input
          {...register('title', {
            required,
          })}
          type="text"
          name="title"
          placeholder="title"
          defaultValue={''}
        />
        <input
          {...register('text', {
            required,
          })}
          type="text"
          name="text"
          placeholder="text"
          defaultValue={''}
        />
        {errors.name && <p>{errors?.name.message}</p>}
        <button type="submit">Edit post</button>
      </Form>
    </>
  );
};
