export const SearchInfo = ({ searchText, searchCount }) => {
  return (
    searchText && searchCount !== 0 ? (
      <div>
        По запросу {searchText} найдено постов: {searchCount}
      </div>
    ) : (
      searchText && <div>По вашему запросу ничего не найдено</div>
    )
  )
};