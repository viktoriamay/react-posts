import { useState, useEffect, useContext, useCallback } from 'react';
import { Post } from '../../components/Post/Post';
import { useParams } from 'react-router-dom';
import { PostsContext } from './../../context/PostsContext';
import api from './../../utils/api';
import { Spinner } from '../../components/Spinner/Spinner';

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
    isLiked,
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
      .finally(() => setIsLoading(false));
  }, [params.postId, favorites]);

  const onPostLike = () => {
    handlePostLike(post);
    const liked = isLiked(post.likes, postCurrentUser?._id);
    if (liked) {
      const filteredLikes = post.likes.filter((e) => e !== postCurrentUser._id);
      setPost({ ...post, likes: filteredLikes });
    } else {
      const addedLikes = [...post.likes, `${postCurrentUser._id}`];
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

        // const updatedFavorites = favorites?.map((prevFavorite) => {
        //   return prevFavorite?._id === updatedPost?._id
        //     ? updatedPost
        //     : prevFavorite;
        // });
        // setFavorites(updatedFavorites);
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
          return prevPost?._id === updatedPost?._id ? updatedPost : prevPost;
        });
        setPosts(updatedPosts); // передаем новое состояние posts в setPosts

        // const updatedFavorites = favorites?.map((prevFavorite) => {
        //   return prevFavorite?._id === updatedPost._id
        //   ? updatedPost
        //   : prevFavorite;
        // });
        // setFavorites(updatedFavorites);

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
        // openNotification('error', 'Ошибка', 'Не получилось отправить отзыв');
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
        // openNotification('success', 'Успешно', 'Ваш отзыв успешно отправлен');
        return updatedPost;
      })
      .then((updatedPost) => {
        const updatedPosts = posts?.map((prevPost) => {
          return prevPost?._id === updatedPost?._id ? updatedPost : prevPost
        }
        );

        setPosts(updatedPosts);

        // const updatedFavorites = favorites?.map((prevFavorite) => {
        //   return prevFavorite?._id === updatedPost?._id
        //     ? updatedPost
        //     : prevFavorite;
        // });
        // setFavorites(updatedFavorites);
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
        // openNotification('error', 'Ошибка', 'Не получилось отправить отзыв');
      });
  }

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
            setClicked={setClicked}
          />
        </>
      )}
    </>
  );
};
