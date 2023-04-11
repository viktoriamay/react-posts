import { useContext, useMemo, useState } from 'react';
import { PostsContext } from './../../context/PostsContext';
import './Sort.scss';

export const Sort = () => {
  const {
    tabs,
    sortedId,
    setSortedId,
    handleChangeSort,
    setPosts,
    posts,
    isMobileView,
  } = useContext(PostsContext);

  const [sortIndex, setSortIndex] = useState(0);

  const selectOptions = [
    { key: 'Самые новые', type: 'newest' },
    { key: 'Популярные', type: 'popular' },
    { key: 'Обсуждаемые', type: 'discussed' },
    { key: 'Самые старые', type: 'oldest' },
  ];

  const sortSelectFunctions = {
    popular: (a, b) => b?.likes?.length - a?.likes?.length,
    oldest: (a, b) => new Date(a?.created_at) - new Date(b?.created_at),
    newest: (a, b) => new Date(b?.created_at) - new Date(a?.created_at),
    discussed: (a, b) => b?.comments?.length - a?.comments?.length,
  };

  const handleSortSelectChange = (index) => {
    setSortIndex(index);
    const { key, type } = selectOptions[index];
    const sortFunc = sortSelectFunctions[type];
    setPosts([...posts].sort(sortFunc));
  };

  const handleSelectChange = (value) => {
    setSortedId(value);
    // вызываем обработчик сортировки
    handleChangeSort(value);
  };

  const sortedItems = useMemo(() => {
    const { key, type } = selectOptions[sortIndex];
    const sortFunc = sortSelectFunctions[type];
    return [...posts].sort(sortFunc);
  }, [posts, sortIndex, sortSelectFunctions]);

  return (
    <>
      {isMobileView && (
        <div className="sort__container">
          <select
            className="sort__mobile"
            value={sortIndex}
            onChange={(e) => handleSortSelectChange(+e.target.value)}>
            {selectOptions.map(({ key }, index) => (
              <option key={key} value={index}>
                {key}
              </option>
            ))}
          </select>
        </div>
      )}
      {!isMobileView && (
        <div className="sort">
          {tabs.map(({ id, title }) => (
            <span
              key={id}
              className={
                id === sortedId ? 'sort__item sort__item_active' : 'sort__item'
              }
              onClick={() => handleSelectChange(id)}>
              {title}
            </span>
          ))}
        </div>
      )}
    </>
  );
};
