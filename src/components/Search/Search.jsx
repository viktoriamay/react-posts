import { SearchOutlined } from '@ant-design/icons';
import './Search.scss'

export const Search = ({onSubmit: formSubmitRequest, onInput: changeInput}) => {

  // на форму вешаем функцию из апы фильтрации постов formSubmitRequest по нажатию на сабмит
  // на инпут вешаем функцию из апы changeInput, которая вытаскивает вводимое в инпут значение


  return (
    <form className="search" onSubmit={formSubmitRequest}>
      <input 
        type="text"
        className="search__input"
        placeholder="Поиск"
        onInput={changeInput} />
      <button className="search__btn">
      <SearchOutlined />
      </button>
    </form>
  )
}