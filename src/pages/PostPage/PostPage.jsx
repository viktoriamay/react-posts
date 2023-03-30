import Spinner from '../../components/Spinner/Spinner';
import { useState, useEffect, useContext } from 'react';
import { Post } from '../../components/Post/Post';
import { useParams } from 'react-router-dom';
import { PostsContext } from './../../context/PostsContext';
import api from './../../utils/api';

export const PostPage = () => {
  const [postCurrentUser, setPostCurrentUser] = useState(null); // текущий юзер на странице поста
  const [post, setPost] = useState(null); // текущий пост
  const [isLoading, setIsLoading] = useState(false);

  const isLike = post?.likes?.some((id) => id === postCurrentUser?._id);
  const [isClicked, setClicked] = useState(isLike);

  const [activePostModal, setActivePostModal] = useState({
    isOpen: false,
    component: 'editPost',
  });

  const {
    favorites,
    setPosts,
    activeModal,
    setActiveModal,
    handlePostLike,
    users,
    getUserCommentsAvatar,
    getUserComments,
  } = useContext(PostsContext);

  // парамс это то, что приходит в апе в роутах path="/post/:postId", а именно :postId - динамический путь это и есть парамс
  const params = useParams();

  // можно деструктуризовать и использовать напрямую, а не params.postId
  // const {postId} = useParams();
  // console.log({params}); напоминалка посмотреть что там хранится

  const postCloseModal = () => {
    setActivePostModal({ ...activePostModal, isOpen: false });
  };

  useEffect(() => {
    setIsLoading(true);
    // вызываем апи получения данных юзера и данных поста
    // в получение данных поста добавляем параметр постАйди, который мы получаем из юзПарамс, который в свою очередь ловится, когда мы наживаем на карточку (оно ловится потому что в карде в линке мы указали to={`/post/${props._id}`} именно props._id и ловится в парамсе и является айди поста)
    // далее мы кладем данные с сервера с стейт юзера и в стейт поста
    // ловится не массив постДата, а данные о текущем посте, так как метод апи ловит по айди конкретный пост
    // стейт передаём далее в пост и там ловим в пропсах, и прокидываем динамически в вёрстку
    Promise.all([api.getUserInfo(), api.getPostById(params.postId)])
      .then(([userData, postData]) => {
        setPostCurrentUser(userData);
        setPost(postData);
      })
      .catch((error) => console.log(error))
      .finally(setIsLoading(false));
  }, [params.postId, favorites]);

  const onPostLike = () => {
    handlePostLike(post);
    setPost({ ...post });
    setClicked((state) => !state);
  };

  const editPostRequest = (data) => {
    const tags = data.tags.replaceAll(' ', '').split(',');

    api
      .editPost(post._id, { ...data, tags })
      .then((result) => {
        const updatedPost = { ...result, data }; // создаем новый объект для обновления состояния post
        setPost(updatedPost);
      })
      .then((updatedPost) => {
        setPosts((state) =>
          state.map((post) =>
            post?._id === updatedPost?._id ? updatedPost : post,
          ),
        );
      })
      .finally(postCloseModal());
  };

  const sendCommentRequest = (data) => {
    // setIsLoading(true);
    api
      .addComment(post._id, data)
      .then((result) => {
        setPost({ ...result });
        // openNotification('success', 'Успешно', 'Ваш отзыв успешно отправлен');
      })
      .catch((error) => {
        // openNotification('error', 'Ошибка', 'Не получилось отправить отзыв');
      })
      .finally(() => {
        // setIsLoading(false);
      });
  };

  const deleteCommentRequest = (comment) => {
    api
      .deleteComment(post._id, comment)
      .then((result) => {
        setPost({ ...result });
        // openNotification('success', 'Успешно', 'Ваш отзыв успешно отправлен');
      })
      .catch((error) => {
        // openNotification('error', 'Ошибка', 'Не получилось отправить отзыв');
      });
  };

  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
        <Post
          {...post}
          post={post}
          setPost={setPost}
          postCurrentUser={postCurrentUser}
          onPostLike={onPostLike}
          sendCommentRequest={sendCommentRequest}
          deleteCommentRequest={deleteCommentRequest}
          editPostRequest={editPostRequest}
          users={users}
          getUserCommentsAvatar={getUserCommentsAvatar}
          getUserComments={getUserComments}
          isLike={isLike}
          
          activePostModal={activePostModal}
          setActivePostModal={setActivePostModal}
          activeModal={activeModal}
          setActiveModal={setActiveModal}
          postCloseModal={postCloseModal}
        />
      )}
    </div>
  );
};
