import { useLocation } from "react-router-dom";

export const SearchInfo = ({ searchText, searchCount }) => {

  const location = useLocation()

  return (
    location.pathname === '/' && (searchText && searchCount !== 0 ? (
      <div>
        По запросу {searchText} найдено постов: {searchCount}
      </div>
    ) : (
      searchText && <div>По вашему запросу ничего не найдено</div>
    ))
  )
};