import Spinner from '../../components/Spinner/Spinner';
import { useState, useEffect, useContext } from 'react';
import { Post } from '../../components/Post/Post';
import { useParams } from 'react-router-dom';
import { PostsContext } from './../../context/PostsContext';
import api from './../../utils/api';

export const PostPage = ({ userById }) => {
  const [postCurrentUser, setPostCurrentUser] = useState(null); // текущий юзер на странице поста
  const [post, setPost] = useState(null); // текущий пост
  const [isLoading, setIsLoading] = useState(false);
  const isLike = post?.likes?.some((id) => id === postCurrentUser?._id);
  const [isClicked, setClicked] = useState(isLike);

  const {
    favorites,
    setFavorites,
    setPosts,
    posts,
    activeModal,
    setActiveModal,
    handlePostLike,
    users,
    activeHeaderModal,
    setActiveHeaderModal,
    getUserCommentsInfo,
  } = useContext(PostsContext);

  // парамс это то, что приходит в апе в роутах path="/post/:postId", а именно :postId - динамический путь это и есть парамс
  const params = useParams();

  const postCloseModal = () => {
    setActiveHeaderModal({ ...activeHeaderModal, isOpen: false });
  };

  useEffect(() => {
    setIsLoading(true);

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
        return updatedPost
      })
      .then((updatedPost) => {
        const updatedPosts = posts.map((prevPost) => {
          return prevPost._id === updatedPost._id ? updatedPost : prevPost;
        })

        setPosts(updatedPosts)
        setFavorites(updatedPosts)
      })
      .finally(postCloseModal());
  };

  const sendCommentRequest = (data) => {
    // setIsLoading(true);
    api
      .addComment(post._id, data)
      .then((result) => {
        const updatedPost = { ...result };
        // console.log(...result);
        setPost(updatedPost);
        // openNotification('success', 'Успешно', 'Ваш отзыв успешно отправлен');
        return updatedPost; // возвращаем обновленный пост из метода then
      })
      .then((updatedPost) => {
        const updatedPosts = posts?.map((prevPost) => {
          // получаем массив новых карточек после постановки лайка и возвращаем старые карточки, если лайк не поставлен и новую если поставлен
          return prevPost?._id === updatedPost?._id ? updatedPost : prevPost;
        });

        setPosts(updatedPosts); // передаем новое состояние posts в setPosts
        setFavorites(updatedPosts)
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
        const updatedPost = { ...result };
        setPost(updatedPost);
        // openNotification('success', 'Успешно', 'Ваш отзыв успешно отправлен');
        return updatedPost;
      })
      .then((updatedPost) => {
        const updatedPosts = posts.map((prevPost) => {
          return prevPost._id === updatedPost._id ? updatedPost : prevPost;
        });
        setPosts(updatedPosts);
        setFavorites(updatedPosts)

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
          isLike={isLike}
          activeHeaderModal={activeHeaderModal}
          setActiveHeaderModal={setActiveHeaderModal}
          activeModal={activeModal}
          setActiveModal={setActiveModal}
          postCloseModal={postCloseModal}
          getUserCommentsInfo={getUserCommentsInfo}
        />
      )}
    </div>
  );
};
