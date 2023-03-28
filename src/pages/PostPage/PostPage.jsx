import Spinner from '../../components/Spinner/Spinner';
import { useState, useEffect, useContext } from 'react';
// import api from '../../utils/api';
import { Post } from '../../components/Post/Post';
import { useParams, useNavigate } from 'react-router-dom';
import { PostsContext } from './../../context/PostsContext';
import api from './../../utils/api';

export const PostPage = ({ handlePostLike /* setPosts */ }) => {
  const [cards, setCards] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [post, setPost] = useState(null);

  const { favorites, setPosts, posts } = useContext(PostsContext);
  // const handlePostLike = () => {};

  // парамс это то, что приходит в апе в роутах path="/post/:postId", а именно :postId - динамический путь это и есть парамс
  const params = useParams();

  // можно деструктуризовать и использовать напрямую, а не params.postId
  // const {postId} = useParams();
  // console.log({params}); напоминалка посмотреть что там хранится

  useEffect(() => {
    setIsLoading(true);
    // вызываем апи получения данных юзера и данных поста
    // в получение данных поста добавляем параметр постАйди, который мы получаем из юзПарамс, который в свою очередь ловится, когда мы наживаем на карточку (оно ловится потому что в карде в линке мы указали to={`/post/${props._id}`} именно props._id и ловится в парамсе и является айди поста)
    // далее мы кладем данные с сервера с стейт юзера и в стейт поста
    // ловится не массив постДата, а данные о текущем посте, так как метод апи ловит по айди конкретный пост
    // стейт передаём далее в пост и там ловим в пропсах, и прокидываем динамически в вёрстку
    Promise.all([api.getUserInfo(), api.getPostById(params.postId)])
      .then(([userData, postData]) => {
        setCurrentUser(userData);
        setPost(postData);
        // console.log({ postData });
      })
      .catch((error) => console.log(error))
      .finally(setIsLoading(false));
  }, [params.postId, favorites]);

  const onPostLike = () => {
    handlePostLike(post);
    setPost({ ...post });
  };

  const onSendComment = (data) => {
    // setIsLoading(true);
    api
      .addComment(post._id, data)
      .then((result) => {
        setPost({ ...result });
        // openNotification('success', 'Успешно', 'Ваш отзыв успешно отправлен');
      })
      .catch((error) => {
        // openNotification('error', 'Ошибка', 'Не получилось отправить отзыв');
      });
    /* .finally(() => {
        setIsLoading(false);
      }); */
  };


  /* const editPost = (data) => {
    api.editPost(post._id, data).then((result) => {setPost({...result, ...data})}).then((post) => {
      setPosts((state) => [post, ...state]);
    });
  } */

  /* const editPost = (data) => {
    api.editPost(post._id, data)
      .then((result) => {
        setPost({...result, data});
        return result;
      })
      .then((post) => {
        setPosts(post);
      });
  } */

  /* const editPost = (data) => {
    api.editPost(post._id, data)
      .then((result) => {
        setPost({...result, ...data});
        if(currentUser?._id !== post?.author?._id) {
          return post
        }
        // currentUser._id === props.post.author._id
        return result;
      })
      .then((updatedPost) => {
        setPosts((state) => state.map((post) => post._id === updatedPost._id ? updatedPost : post));
      });
  } */

  const editPost = (data) => {
    api.editPost(post._id, data)
      .then((result) => {
        const updatedPost = {...result, data}; // создаем новый объект для обновления состояния post
        if (currentUser?._id !== post?.author?._id) {
          return post; // не изменять состояние post, если это не пост текущего пользователя
        }
        setPost(updatedPost);
        // return updatedPost; // возвращаем новый объект, а не result
      })
      .then((updatedPost) => {
        setPosts((state) => state.map((post) => post?._id === updatedPost._id ? updatedPost : post));
      });
  }

  console.log(currentUser?._id);
  console.log(post?.author?._id);


  const onDeleteComment = (comment) => {
    console.log(comment);
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

  const navigate = useNavigate();

  
  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
        <Post
          {...post}
          post={post}
          setPost={setPost}
          currentUser={currentUser}
          onPostLike={onPostLike}
          onSendComment={onSendComment}
          onDeleteComment={onDeleteComment}
          editPost={editPost}
          // onDeletePost={onDeletePost}
        />
      )}
    </div>
  );
};
