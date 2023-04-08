import { useState, useEffect, useMemo, useCallback } from 'react';
import api from '../../utils/api';
import { Header } from '../Header/Header';
import { SearchInfo } from '../SearchInfo/SearchInfo';
import './App.scss';
import useDebounce from './../../hooks/useDebounce';
import { Search } from '../Search/Search';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { PostPage } from '../../pages/PostPage/PostPage';
import { PostsContext } from '../../context/PostsContext';
import { FavoritePage } from '../../pages/FavoritePage/FavoritePage';
import { PostsPage } from '../../pages/PostsPage/PostsPage';
import { Profile } from '../Profile/Profile';
import { authApi } from './../../utils/authApi';
import { UsersProfile } from './../UsersProfile/UsersProfile';
import { Unauthorized } from './../Unauthorized/Unauthorized';
import { Footer } from './../Footer/Footer';
import { PolicyPage } from './../../pages/PolicyPage/PolicyPage';
import { openNotification } from './../Notification/Notification';

function App() {
  const [posts, setPosts] = useState([]); // посты
  const [currentUser, setCurrentUser] = useState(null); // пользователь
  const [users, setUsers] = useState([]); // все юзеры
  const [searchQuery, setSearchQuery] = useState(''); // поисковой запрос
  const [favorites, setFavorites] = useState([]); //лайки
  const [isAuth, setIsAuth] = useState(false); // авторизация по токену
  const [sortedId, setSortedId] = useState('newest'); // сортировка
  const [tokenResp, setTokenResp] = useState(false); //токен
  const [activeModal, setActiveModal] = useState(false); // модалка
  const [activeHeaderModal, setActiveHeaderModal] = useState({
    // модалка в хедере
    isOpen: false,
    component: 'register',
  });

  const tabs = useMemo(() => {
    return [
      { id: 'newest', title: 'Самые новые' },
      { id: 'popular', title: 'Популярные' },
      { id: 'discussed', title: 'Обсуждаемые' },
      { id: 'oldest', title: 'Самые старые' },
    ];
  }, []);

  const options = useMemo(() => {
    return {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    };
  }, []);

  const handleChangeSort = (id) => {
    // сортировка постов
    setSortedId(id);
    sortedData(id);
  };

  const handleCloseModal = () => {
    setActiveModal(false);
  };

  const handleHeaderCloseModal = () => {
    setActiveHeaderModal({ ...activeHeaderModal, isOpen: false });
  };

  const getUserCommentsInfo = (id) => {
    // получение данных пользователя (аватар и имя) по айди в комментариях
    if (!users.length) return { name: '', avatar: '' };
    const user = users.find((el) => el._id === id);
    return {
      name: user?.name ?? 'User',
      avatar: user?.avatar ?? 'User',
      id: user?._id ?? 'User',
    };
  };

  const handleLogout = () => {
    // выход из аккаунта
    localStorage.removeItem('token');
    navigate('/');
  };

  // возвращает накопленное сёрчКвери
  const debounceSearchQuery = useDebounce(searchQuery, 1000);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) {
      return;
    }

    Promise.all([api.getPostsList(), api.getUserInfo()]).then(
      // получение информации о постах и текущем юзере
      ([postsData, userData]) => {
        setPosts(postsData);
        setCurrentUser(userData);

        const favPosts = postsData?.filter((post) =>
          isLiked(post?.likes, userData?._id),
        );
        setFavorites(favPosts);
      },
    );
  }, [isAuth]);

  const changeInput = (e) => {
    setSearchQuery(e.target.value); // добавляем в стейт сёрчКвери значение из инпута
  };

  const filterPostsRequest = () => {
    const searchQuery = debounceSearchQuery;
    api
      .search(searchQuery)
      .then((filteredPosts) => {
        if (searchQuery.includes('#')) {
          const postsFilteredByTag = filteredPosts?.filter((post) => {
            const result = post?.tags?.includes(searchQuery.replace('#', ''));
            return result;
          });
          setPosts([...postsFilteredByTag]);
        } else {
          setPosts([...filteredPosts]);
        }
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    if (!isAuth) {
      return;
    }

    filterPostsRequest(); // реквест (запрос на сервер по вводимому значению в инпут) вызывается только тогда, когда изменяется дебаунсквери
  }, [debounceSearchQuery]);

  const formSubmitRequest = (e) => {
    // фильтрация постов по нажатию на сабмит в сёрче, после текстового запроса
    e.preventDefault();
    filterPostsRequest();
    navigate('/');
  };

  // метод some возвращает тру в данном случае если среди массива лайков поста (там хранятся айди тех, кто поставил лайки) есть каррентЮзер__айди
  const isLiked = (likes, userId) => likes?.some((id) => id === userId); // проверка отлайкан ли пост

  const handlePostLike = useCallback(
    (post) => {
      // постановка лайка на пост

      const liked = isLiked(post?.likes, currentUser?._id);

      api.changeLikePost(post?._id, liked).then((newCard) => {
        const newPosts = posts?.map((postState) => {
          // получаем массив новых карточек после постановки лайка и возвращаем старые карточки, если лайк не поставлен и новую если поставлен
          return postState?._id === newCard?._id ? newCard : postState;
        });

        if (!liked) {
          setFavorites((prevState) => [...prevState, newCard]);
        } else {
          setFavorites((prevState) => {
            return prevState?.filter((card) => card?._id !== newCard?._id);
          });
        }
        setPosts(newPosts);
      });
    },
    [currentUser?._id, posts],
  );

  const sortedData = (currentSort) => {
    // сортировка постов
    switch (currentSort) {
      case 'popular':
        setPosts([
          ...posts?.sort((a, b) => b?.likes?.length - a?.likes?.length),
        ]);
        break;
      case 'discussed':
        setPosts([
          ...posts?.sort((a, b) => b?.comments?.length - a?.comments?.length),
        ]);
        break;
      case 'newest':
        setPosts([
          ...posts?.sort(
            (a, b) => new Date(b?.created_at) - new Date(a?.created_at),
          ),
        ]);
        break;
      case 'oldest':
        setPosts([
          ...posts?.sort(
            (a, b) => new Date(a?.created_at) - new Date(b?.created_at),
          ),
        ]);
        break;
      default:
        setPosts([
          ...posts.sort((a, b) => b?.likes?.length - a?.likes?.length),
        ]);
        break;
    }
  };

  const addPostRequest = (data) => {
    // добавление поста
    const tags = data.tags.replaceAll(' ', '').split(',');

    api
      .addPost({ ...data, tags })
      .then((newPost) => {
        setPosts((state) => [newPost, ...state]);
      })
      .catch()
      .finally(handleHeaderCloseModal);
  };

  const deletePostRequest = (postId) => {
    // удаление поста
    api
      .deletePost(postId)
      .then(() => {
        const updatedPosts = posts.filter((post) => post._id !== postId);
        setPosts(updatedPosts);

        setFavorites((prevState) => {
          return prevState?.filter((card) => card?._id !== postId);
        });

        return updatedPosts;
      })
      .then(navigate('/'));
  };

  const loginRequest = (data) => {
    // вход по логину
    authApi
      .login(data)
      .then((result) => {
        const { token } = result;
        localStorage.setItem('token', token);
        setIsAuth(true);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(handleHeaderCloseModal);
  };

  const registrationRequest = (data) => {
    // регистрация
    authApi
      .registration({ ...data, group: 'group-9' })
      .then((result) => {
        const { token } = result;
        localStorage.setItem('token', token);
        setIsAuth(true);
      })
      .catch((error) => console.log(error))
      .finally(handleHeaderCloseModal);
  };

  const resetPasswordRequest = (formData) => {
    // восстановление пароля по токену
    if (tokenResp) {
      // если токен есть, происходит запрос на изменение пароля с помощью токена
      authApi
        .resetPasswordToken({ password: formData.password }, formData.token)
        .then(({ token, data }) => {
          if (token) {
            localStorage.setItem('token', token);
            localStorage.setItem('userData', JSON.stringify(data));
            setIsAuth(true);
          }
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(handleHeaderCloseModal);
    } else {
      // если токена нет, то происходит запрос на отправку письма для восстановления пароля
      authApi
        .resetPassword(formData)
        .then(() => {
          setTokenResp(true);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  useEffect(() => {
    api.getUsers().then((data) => setUsers(data)); // получение всех юзеров
  }, []);

  const editProfileRequest = (data) => {
    // изменение данных пользователя
    api
      .editUserInfo({ name: data.name, about: data.about })
      .then((newUser) => {
        setCurrentUser({ ...newUser });
        openNotification('success', 'Успешно', 'Ваши данные успешно изменены');
      })
      .catch(() => {
        openNotification('error', 'Ошибка', 'Не получилось изменить данные');
      });
  };

  const editAvatarRequest = (src) => {
    // изменение аватара
    api
      .editUserAvatar({ avatar: src.avatar })
      .then((newUser) => {
        setCurrentUser({ ...newUser });
        openNotification('success', 'Успешно', 'Ваш аватар успешно изменён');
      })
      .catch(() => {
        openNotification('error', 'Ошибка', 'Не получилось изменить аватар');
      });
  };

  useEffect(() => {
    // проверка наличия токена
    const haveToken = localStorage.getItem('token');
    setIsAuth(!!haveToken);
  });

  // console.log({favorites});
  const valueContextProvider = {
    posts,
    setPosts,
    favorites,
    setFavorites,
    handlePostLike,
    currentUser,
    onSortData: sortedData,
    setActiveModal,
    activeModal,
    setIsAuth,
    isAuth,
    setCurrentUser,
    addPostRequest,
    deletePostRequest,
    setActiveHeaderModal,
    activeHeaderModal,
    handleHeaderCloseModal,
    loginRequest,
    registrationRequest,
    resetPasswordRequest,
    tokenResp,
    setTokenResp,
    options,
    users,
    setUsers,
    editProfileRequest,
    editAvatarRequest,
    handleLogout,
    tabs,
    sortedId,
    setSortedId,
    handleChangeSort,
    handleCloseModal,
    getUserCommentsInfo,
    formSubmitRequest,
    changeInput,
    isLiked,
  };

  return (
    <div className="App">
      <PostsContext.Provider value={valueContextProvider}>
        <Header>
          <Search />
        </Header>

        <main className="main container">
          <SearchInfo searchText={searchQuery} searchCount={posts?.length} />
          <Routes>
            {!isAuth ? (
              <Route path="/" element={<Unauthorized />} />
            ) : (
              <Route path="/" element={<PostsPage />} />
            )}
            <Route path="/post/:postId" element={<PostPage />} />
            <Route path="/favorites" element={<FavoritePage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/user/:userId" element={<UsersProfile />} />
            <Route path="/policy" element={<PolicyPage />} />

            <Route path="*" element={<div>Not Found</div>} />
          </Routes>
        </main>
        <Footer />
      </PostsContext.Provider>
    </div>
  );
}

export default App;
