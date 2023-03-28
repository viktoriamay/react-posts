import { useLocation } from 'react-router-dom';
import './SearchInfo.scss';

export const SearchInfo = ({ searchText, searchCount }) => {
  const location = useLocation();

  return (
    location.pathname === '/' &&
    (searchText && searchCount !== 0 ? (
      <div className="search__info">
        По запросу <span className="search__info_request">{searchText}</span>{' '}
        найдено постов:{' '}
        <span className="search__info_request">{searchCount}</span>
      </div>
    ) : (
      searchText && (
        <div className="search__info">По вашему запросу ничего не найдено</div>
      )
    ))
  );
};
