import { SearchOutlined } from '@ant-design/icons';
import './Search.scss'

export const Search = () => {
  return (
    <form className="search">
      <input 
        type="text"
        className="search__input"
        placeholder="Поиск" />
      <button className="search__btn">
      <SearchOutlined />
      </button>
    </form>
  )
}