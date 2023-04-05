import { useState, useEffect, useContext, useCallback } from 'react';
import { Post } from '../../components/Post/Post';
import { useParams } from 'react-router-dom';
import { PostsContext } from './../../context/PostsContext';
import api from './../../utils/api';
import { Spinner } from '../../components/Spinner/Spinner';
import { openNotification } from './../../components/Notification/Notification';

export const PostPage = ({ userById }) => {
  const [postCurrentUser, setPostCurrentUser] = useState(null); // текущий юзер на странице поста
  const [post, setPost] = useState(null); // текущий пост
  const [isLoading, setIsLoading] = useState(false);

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
    isLiked,
    currentUser,
  } = useContext(PostsContext);

  const isLike = post?.likes?.some((id) => id === currentUser?._id);
  const [isClicked, setClicked] = useState(isLike);
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
      .finally(() => setIsLoading(false));
  }, [params.postId]);

  const onPostLike = () => {
    handlePostLike(post);
    const liked = isLiked(post.likes, currentUser?._id);
    if (liked) {
      const filteredLikes = post.likes.filter((e) => e !== currentUser._id);
      setPost({ ...post, likes: filteredLikes });
    } else {
      const addedLikes = [...post.likes, `${currentUser._id}`];
      setPost({ ...post, likes: addedLikes });
    }
    // setClicked((state) => !state);
  };

  const editPostRequest = (data) => {
    const tags = data.tags.replaceAll(' ', '').split(',');

    api
      .editPost(post._id, { ...data, tags })
      .then((result) => {
        const updatedPost = { ...result, data }; // создаем новый объект для обновления состояния post
        setPost(updatedPost);
        return updatedPost;
      })
      .then((updatedPost) => {
        const updatedPosts = posts.map((prevPost) => {
          return prevPost?._id === updatedPost?._id ? updatedPost : prevPost;
        });
        setPosts(updatedPosts);
        return updatedPost;
      })
      .then((updatedPost) => {
        const updatedFavorites = favorites?.map((prevFavorite) => {
          return prevFavorite?._id === updatedPost._id
            ? updatedPost
            : prevFavorite;
        });
        setFavorites(updatedFavorites);
      })
      .finally(postCloseModal());
  };

  const sendCommentRequest = (data) => {
    // setIsLoading(true);
    api
      .addComment(post._id, data)
      .then((result) => {
        const updatedPost = { ...result };
        setPost(updatedPost);
        openNotification('success', 'Успешно', 'Ваш комментарий успешно отправлен');
        return updatedPost; // возвращаем обновленный пост из метода then
      })
      .then((updatedPost) => {
        const updatedPosts = posts?.map((prevPost) => {
          return prevPost?._id === updatedPost?._id ? updatedPost : prevPost;
        });
        setPosts(updatedPosts); // передаем новое состояние posts в setPosts
        return updatedPost; // возвращаем обновленный пост из метода then
      })
      .then((updatedPost) => {
        const updatedFavorites = favorites?.map((prevFavorite) => {
          return prevFavorite?._id === updatedPost._id
            ? updatedPost
            : prevFavorite;
        });
        setFavorites(updatedFavorites);
      })
      .catch((error) => {
        openNotification('error', 'Ошибка', 'Не получилось отправить комментарий');
      })
      .finally(() => {
        // setIsLoading(false);
      });
  };

  const deleteCommentRequest = (id) => {
    api
      .deleteComment(post._id, id)
      .then((result) => {
        const updatedPost = { ...result };
        setPost(updatedPost);
        openNotification('success', 'Успешно', 'Ваш комментарий успешно удалён');
        return updatedPost;
      })
      .then((updatedPost) => {
        const updatedPosts = posts?.map((prevPost) => {
          return prevPost?._id === updatedPost?._id ? updatedPost : prevPost;
        });

        setPosts(updatedPosts);
        return updatedPost;
      })

      .then((updatedPost) => {
        const updatedFavorites = favorites?.map((prevFavorite) => {
          return prevFavorite?._id === updatedPost?._id
            ? updatedPost
            : prevFavorite;
        });
        setFavorites(updatedFavorites);
      })
      .catch((error) => {
        openNotification('error', 'Ошибка', 'Не получилось удалить комментарий');
      });
  };

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <Post
            {...post}
            post={post}
            setPost={setPost}
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
            setClicked={setClicked}
          />
        </>
      )}
    </>
  );
};
