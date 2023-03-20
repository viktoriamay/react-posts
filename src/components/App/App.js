import { useState, useEffect } from 'react';
import api from '../../utils/api';
import { Card } from '../Card/Card';
import { CardList } from '../CardList/CardList';
import { Header } from '../Header/Header';
import './App.scss';

function App() {

  const [posts, setPosts] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // здесь мы получаем информацию с сервера апи запросами и помещаем данные в соответствующие стейты
  useEffect(() => {
    // промисы нужны для того, чтобы вся информация с апи приходила одновременно, то есть один апи запрос ждал другой, пока они не подгрузятся, чтобы не было такого, что более поздний запрос (и необходимая информация по нему) пришел раньше, чем более нужный ранний;
    // то есть ждём пока все запросы выполнятся и тогда выводим данные
    // кладем апи запросы в массив, так как тут два запроса, в зенах данные с сервера по апи запросу
    Promise.all([api.getPostsList(), api.getUserInfo()]).then(
      ([postsData, userData]) => {
        setPosts(postsData);
        setCurrentUser(userData);
      }
    );

    /* БЕЗ ПРОМИСА
        
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
    /* const filteredPosts = posts.filter((post) => post.title.toUpperCase().includes(searchQuery.toUpperCase()));
    setPosts([...filteredPosts]); */

    api.search(searchQuery).then((filteredPosts) => {
      setPosts([...filteredPosts]);
    })
  }

  // добавляем функцию фильтрации постов в юзэффект
  // следим за запросом в поисковой строке
  useEffect(() => {
    filterPostsRequest();
  }, [searchQuery]);

  // создаем функцию фильтрации постов по нажатию на баттон сабмит в сёрче
  const formSubmitRequest = (e) => {
    e.preventDefault();
    filterPostsRequest();
  }

  return (
    <div className="App">

      {/* прокидываем пропсы, => formSubmitRequest={formSubmitRequest} changeInput={changeInput} то же самое что и ниже.  */}
      <Header onSubmit={formSubmitRequest} onInput={changeInput} />

      <main className="main container">
        {/* прокидываем данные с постов в кардлист, чтобы принять их в карде */}
      <CardList posts={posts} />

      </main>
    </div>
  );
}

export default App;
