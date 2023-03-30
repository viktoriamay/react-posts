import { useState, useEffect } from 'react';
import api from '../../utils/api';
import { Header } from '../Header/Header';
import { SearchInfo } from '../SearchInfo/SearchInfo';
import './App.scss';
import useDebounce from './../../hooks/useDebounce';
import { Search } from '../Search/Search';
import Spinner from '../Spinner/Spinner';
import { Route, Routes, useNavigate} from 'react-router-dom';
import { PostPage } from '../../pages/PostPage/PostPage';
import { PostsContext } from '../../context/PostsContext';
import { FavoritePage } from '../../pages/FavoritePage/FavoritePage';
import { PostsPage } from '../../pages/PostsPage/PostsPage';
import { Profile } from '../Profile/Profile';
import { authApi } from './../../utils/authApi';

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

  const tabs = [ // вкладки сортировки
    { id: 'newest', title: 'Самые новые ' },
    { id: 'popular', title: 'Популярные ' },
    { id: 'discussed', title: 'Обсуждаемые ' },
    { id: 'oldest', title: 'Самые старые ' },
  ];

  const options = { // перевод даты в формат 12 окт 2021
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };

  const handleChangeSort = (id) => { // сортировка постов
    setSortedId(id);
    sortedData(id);
  };

  const handleCloseModal = () => {
    setActiveModal(false);
  };

  const handleHeaderCloseModal = () => {
    setActiveHeaderModal({ ...activeHeaderModal, isOpen: false });
  };

  const getUserCommentsAvatar = (id) => { // получение данных пользователя (аватар) по айди в комментариях
    if (!users.length) return '';
    const user = users.find((el) => el._id === id);
    return user?.avatar ?? 'User';
  };

  const getUserComments = (id) => { // получение данных пользователя (имя) по айди в комментариях
    if (!users.length) return '';
    const user = users.find((el) => el._id === id);
    return user?.name ?? 'User';
  };

  const handleLogout = () => { // выход из аккаунта
    localStorage.removeItem('token');
    navigate('/');
  };

  // возвращает накопленное сёрчКвери
  const debounceSearchQuery = useDebounce(searchQuery, 1000);

  const navigate = useNavigate();

  // здесь мы получаем информацию с сервера апи запросами и помещаем данные в соответствующие стейты
  useEffect(() => {
    if (!isAuth) {
      return;
    }
    // промисы нужны для того, чтобы вся информация с апи приходила одновременно, то есть один апи запрос ждал другой, пока они не подгрузятся, чтобы не было такого, что более поздний запрос (и необходимая информация по нему) пришел раньше, чем более нужный ранний;
    // то есть ждём пока все запросы выполнятся и тогда выводим данные
    // кладем апи запросы в массив, так как тут два запроса, в зенах данные с сервера по апи запросу
    Promise.all([api.getPostsList(), api.getUserInfo()]).then(
      ([postsData, userData]) => {
        setPosts(postsData);
        setCurrentUser(userData);

        const favProducts = postsData.filter((post) =>
          isLiked(post.likes, userData._id),
        );
        setFavorites(favProducts);
      },
    );

    /* ----- БЕЗ ПРОМИСА -----
        
    // закинула информацию в карточки с апи запроса
    getPostsList().then((postsData) => {
      setPosts(postsData);
    });

    // закинула информацию в юзера с апи запроса
    getUserInfo().then((userData) => {
      setCurrentUser(userData); 
    }); */
  }, [isAuth]);

  // console.log(posts[0]._id); вывод в консоль данных айди первого элемента (поста) в массиве с сервера

  const changeInput = (e) => {
    // добавляем в стейт сёрчКвери значение из инпута
    setSearchQuery(e.target.value);
  };

  // фильтрация карточек по запросу в поисковой строке
  // создаем переменную фильтр, обращаемся к апи данным постов, фильтруем посты (пост из стейта), в фильтр кладем поле тайтл из поста, приводим его к нижнему регистру, но фильтруем то что содержит (инклюдес) серчКвери, то есть то, что мы написали в поисковой строке
  // затем сетим (изменяем) посты на измененный новый массив отфильтрованных
  const filterPostsRequest = () => {
    /* фильтрация постов на фронте
      const filteredPosts = posts.filter((post) =>
      post.title.toUpperCase().includes(searchQuery.toUpperCase()),
    );
    setPosts([...filteredPosts]); */

    api
      .search(searchQuery)
      .then((filteredPosts) => {
        setPosts([...filteredPosts]);
      })
      .catch((error) => console.log(error));
  };

  // добавляем функцию фильтрации постов в юзэффект
  // следим за запросом в поисковой строке
  // теперь следим за запросом в поисковой строке, но с учётом задержки (так как значение из инпута мы положили в стейт)
  // реквест (запрос на сервер по вводимому значению в инпут) вызывается только тогда, когда изменяется дебаунсквери
  useEffect(() => {
    if (!isAuth) {
      return;
    }
    filterPostsRequest();
  }, [debounceSearchQuery]);

  const formSubmitRequest = (e) => { // фильтрация постов по нажатию на сабмит в сёрче, после текстового запроса
    e.preventDefault();
    filterPostsRequest();
    navigate('/');
  };

  // метод some возвращает тру в данном случае если среди массива лайков поста (там хранятся айди тех, кто поставил лайки) есть каррентЮзер__айди
  const isLiked = (likes, userId) => likes?.some((id) => id === userId); // проверка отлайкан ли пост

  const handlePostLike = (post) => { // постановка лайка на пост

    // найти в посте в массиве лайков тот айди, который будет равен каррентЮзер._айди
    const liked = isLiked(post?.likes, currentUser?._id);

    // другая запись функции выше без дополнительных переменных:
    // const liked = post.likes.some((id) => id === currentUser?._id);

    // обращаемся к апи запросу, передаем туда айди поста, на который ставим лайк и данные по лайку (если залайкан, то есть в массиве лайков есть наш айди), а в самом апи меняем методы пут и делит (если не отлайкан, то добавляем те метод пут, если отлайкан, то удаляем метод делит). Удаляем и добавляем в массив лайков наш айди
    // так как после постановки лайка у нас поменялся вид карточки (это ньюКард), нам нужно её засетить заново
    // newPosts это массив новых карточек после постановки лайка. Мы берем старые посты, мапим их (пробегаемся по всем постам) и возвращаем старые карточки, если лайк не поставлен (то есть в карточке нет в массиве лайков айди пользователя (это считается старой карточкой) по сравнению с массивом лайков в новой карточке), и новую если поставлен
    api.changeLikePost(post?._id, liked).then((newCard) => {
      const newPosts = posts?.map((postState) => {
        // console.log('Карточка из стейта', postState);
        // console.log('Карточка с сервера', newCard);
        return postState?._id === newCard?._id ? newCard : postState;
      });
      // если было не отлайкано (но я его нажала), добавть в фейврит предыдущий список карточек(количество лайков до моего лайка)
      // а затем верни развёрнутый массив уже отлайканных до моего предыдущего лайка карточек + добавь в него карточку которую я лайкнула только что
      if (!liked) {
        setFavorites((prevState) => [...prevState, newCard]);
      } else {
        // если было отлайкано (и я его убрала) , то добавь в стейт старый массив отлайканных карточек, а затем отфильтруй старый массив отлайканных карточек (количество лайков до того как я его удалила) и убери ту карточку (из старого стейта), айди которой равен айди только что нажатой карточке

        // отфильтруй так, чтобы кард айди не содержал новый кард айди
        setFavorites((prevState) =>
          prevState.filter((card) => card._id !== newCard._id),
        );
      }

      // в конце показываем карточки (сетим посты, отрисовываем) с учетом изменений (то есть изменяем те посты в которых что то поменялось)
      setPosts(newPosts);
    });
  };

  const sortedData = (currentSort) => { // сортировка постов
    switch (currentSort) {
      case 'popular':
        setPosts([
          ...posts.sort((a, b) => b?.likes?.length - a?.likes?.length),
        ]);
        break;
      case 'discussed':
        setPosts([
          ...posts.sort((a, b) => b?.comments?.length - a?.comments?.length),
        ]);
        break;
      case 'newest':
        setPosts([
          ...posts.sort(
            (a, b) => new Date(b?.created_at) - new Date(a?.created_at),
          ),
        ]);
        break;
      case 'oldest':
        setPosts([
          ...posts.sort(
            (a, b) => new Date(a?.created_at) - new Date(b?.created_at),
          ),
        ]);
        break;
      default:
        // чтобы обновить стейт, необходимо ... сделать в карточках, чтобы реакт увидел новый массив. если возвращается объект необходимо его поместить в фигуоные скобки
        setPosts([
          ...posts.sort((a, b) => b?.likes?.length - a?.likes?.length),
        ]);

        break;
    }
  };

  const addPostRequest = (data) => { // добавление поста
    const tags = data.tags.replaceAll(' ', '').split(',');

    api
      .addPost({ ...data, tags })
      .then((newPost) => {
        setPosts((state) => [newPost, ...state]);
      })
      .catch()
      .finally(handleHeaderCloseModal());
  };

  const deletePost = (postId) => { // удаление поста
    api
      .deletePost(postId)
      .then(() => {
        const updatedPosts = posts.filter((post) => post._id !== postId);
        setPosts(updatedPosts);
      })
      .then(navigate('/'));
  };

  const loginRequest = (data) => { // вход по логину
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
      .finally(handleCloseModal());
  };

  const registrationRequest = (data) => { // регистрация
    authApi
      .registration({ ...data, group: 'group-9' })
      .then((result) => {
        const { token } = result;
        localStorage.setItem('token', token);
        setIsAuth(true);
      })
      .catch((error) => console.log(error))
      .finally(handleCloseModal());
  };

  const resetPasswordRequest = (formData) => { // восстановление пароля по токену
    if (tokenResp) { // если токен есть, происходит запрос на изменение пароля с помощью токена
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
        .finally(handleCloseModal());
    } else { // если токена нет, то происходит запрос на отправку письма для восстановления пароля
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

  const editProfileRequest = (data) => { // изменение данных пользователя
    api
      .editUserInfo({ name: data.name, about: data.about })
      .then((newUser) => setCurrentUser({ ...newUser }));
  };

  const editAvatarRequest = (src) => { // изменение аватара
    api
      .editUserAvatar({ avatar: src.avatar })
      .then((newUser) => setCurrentUser({ ...newUser }));
  };

  useEffect(() => { // проверка наличия токена
    const haveToken = localStorage.getItem('token');
    setIsAuth(!!haveToken);
  });

  const valueContextProvider = {
    posts,
    setPosts,
    favorites,
    handlePostLike,
    currentUser,
    onSortData: sortedData,
    setActiveModal,
    activeModal,
    setIsAuth,
    isAuth,
    setCurrentUser,
    addPostRequest,
    deletePost,
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
    getUserCommentsAvatar,
    getUserComments,
    formSubmitRequest,
    changeInput,
  };

  return (
    <div className="App">
      <PostsContext.Provider value={valueContextProvider}>
        <Header>
          <Search />
        </Header>

        <main className="main container">
          {/* прокидываем данные с вводимого значения в инпуте через условную переменную сёрчТекст. серчКаунт это количество постов (элементов в массиве) после фильтрации по запросу */}
          <SearchInfo searchText={searchQuery} searchCount={posts.length} />
          <Routes>
            <Route path="/" element={<PostsPage />} />
            <Route path="/post/:postId" element={<PostPage />} />
            <Route path="/favorites" element={<FavoritePage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<div>Not Found</div>} />
          </Routes>
        </main>
      </PostsContext.Provider>
    </div>
  );
}

export default App;
