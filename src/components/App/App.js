import { useState, useEffect } from 'react';
import api from '../../utils/api';
import { Card } from '../Card/Card';
import { CardList } from '../CardList/CardList';
import { Header } from '../Header/Header';
import { SearchInfo } from '../SearchInfo/SearchInfo';
import './App.scss';
import useDebounce from './../../hooks/useDebounce';
import { Search } from '../Search/Search';
import Spinner from '../Spinner/Spinner';
import { Route, Routes } from 'react-router-dom';
import { PostPage } from '../../pages/PostPage/PostPage';

function App() {
  const [posts, setPosts] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState([]);

  // возвращает накопленное сёрчКвери
  const debounceSearchQuery = useDebounce(searchQuery, 1000);

  // здесь мы получаем информацию с сервера апи запросами и помещаем данные в соответствующие стейты
  useEffect(() => {
    // промисы нужны для того, чтобы вся информация с апи приходила одновременно, то есть один апи запрос ждал другой, пока они не подгрузятся, чтобы не было такого, что более поздний запрос (и необходимая информация по нему) пришел раньше, чем более нужный ранний;
    // то есть ждём пока все запросы выполнятся и тогда выводим данные
    // кладем апи запросы в массив, так как тут два запроса, в зенах данные с сервера по апи запросу
    Promise.all([api.getPostsList(), api.getUserInfo()]).then(
      ([postsData, userData]) => {
        setPosts(postsData);
        setCurrentUser(userData);
        /* const favProducts = postsData.posts.filter((post) =>
        isLiked(post.likes, userData._id) 
        );
        setFavorites(favProducts); */
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
  }, []);

  // console.log(posts[0]._id); вывод в консоль данных айди первого элемента (поста) в массиве с сервера

  const changeInput = (e) => {
    // добавляем в стейт сёрчКвери значение из инпута
    setSearchQuery(e.target.value);
  };

  // фильтрация карточек по запросу в поисковой строке
  // создаем переменную фильтр, обращаемся к апи данным постов, фильтруем посты (пост из стейта), в фильтр кладем поле тайтл из поста, приводим его к нижнему регистру, но фильтруем то что содержит (инклюдес) серчКвери, то есть то, что мы написали в поисковой строке
  // затем сетим (изменяем) посты на измененный новый массив отфильтрованных
  const filterPostsRequest = () => {
    const filteredPosts = posts.filter((post) =>
      post.title.toUpperCase().includes(searchQuery.toUpperCase()),
    );
    setPosts([...filteredPosts]);

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
    filterPostsRequest();
  }, [debounceSearchQuery]);

  // создаем функцию фильтрации постов по нажатию на баттон сабмит в сёрче
  const formSubmitRequest = (e) => {
    e.preventDefault();
    filterPostsRequest();
  };

  // метод some возвращает тру в данном случае если среди массива лайков поста (там хранятся айди тех, кто поставил лайки) есть каррентЮзерю_айди
  const isLiked = (likes, userId) => likes?.some((id) => id === userId);

  const handlePostLike = (post) => {
    // найти в посте в массиве лайков тот айди, который будет равен каррентЮзер._айди
    const liked = isLiked(post.likes, currentUser?._id);

    // другая запись функции выше без дополнительных переменных:
    // const liked = post.likes.some((id) => id === currentUser?._id);

    // обращаемся к апи запросу, передаем туда айди поста, на который ставим лайк и данные по лайку (если залайкан, то есть в массиве лайков есть наш айди), а в самом апи меняем методы пут и делит (если не отлайкан, то добавляем те метод пут, если отлайкан, то удаляем метод делит). Удаляем и добавляем в массив лайков наш айди
    // так как после постановки лайка у нас поменялся вид карточки (это ньюКард), нам нужно её засетить заново
    // newPosts это массив новых карточек после постановки лайка. Мы берем старые посты, мапим их (пробегаемся по всем постам) и возвращаем старые карточки, если лайк не поставлен (то есть в карточке нет в массиве лайков айди пользователя (это считается старой карточкой) по сравнению с массивом лайков в новой карточке), и новую если поставлен
    api.changeLikePost(post._id, liked).then((newCard) => {
      const newPosts = posts.map((postState) => {
        // console.log('Карточка из стейта', postState);
        // console.log('Карточка с сервера', newCard);
        return postState._id === newCard._id ? newCard : postState;
      });
      // в конце показываем карточки (сетим посты, отрисовываем) с учетом изменений (то есть изменяем те посты в которых что то поменялось)
      setPosts(newPosts);
    });
  };

  return (
    <div className="App">
      <Header currentUser={currentUser}>
        {/* прокидываем пропсы, => formSubmitRequest={formSubmitRequest} changeInput={changeInput} то же самое что и ниже.  */}
        <Search onSubmit={formSubmitRequest} onInput={changeInput} />
      </Header>

      <main className="main container">
        {/* прокидываем данные с вводимого значения в инпуте через условную переменную сёрчТекст. серчКаунт это количество постов (элементов в массиве) после фильтрации по запросу */}
        <SearchInfo searchText={searchQuery} searchCount={posts.length} />

        {/* прокидываем данные с постов в кардлист, чтобы принять их в карде */}
        <Routes>
          <Route
            path="/"
            element={
              <CardList
                posts={posts}
                currentUser={currentUser}
                handlePostLike={handlePostLike}
              />
            }
          />

          <Route path="/post" element={<PostPage posts={posts} />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
