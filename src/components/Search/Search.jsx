import { SearchOutlined } from '@ant-design/icons';
import './Search.scss';
import { useContext } from 'react';
import { PostsContext } from './../../context/PostsContext';

export const Search = () => {
  const { isAuth, formSubmitRequest, changeInput } = useContext(PostsContext);

  // на форму вешаем функцию из апы фильтрации постов formSubmitRequest по нажатию на сабмит
  // на инпут вешаем функцию из апы changeInput, которая вытаскивает вводимое в инпут значение

  return (
    <>
      {isAuth && (
        <form className="search" onSubmit={formSubmitRequest}>
          <input
            type="text"
            className="search__input"
            placeholder="Поиск"
            onInput={changeInput}
          />
          <button className="search__btn">
            <SearchOutlined />
          </button>
        </form>
      )}
    </>
  );
};
