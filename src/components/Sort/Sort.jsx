import { useContext, useState } from 'react';
import { PostsContext } from './../../context/PostsContext';
import './Sort.scss';

export const Sort = () => {
  const tabs = [
    { id: 'newest', title: 'Самые новые ' },
    { id: 'popular', title: 'Популярные ' },
    { id: 'discussed', title: 'Обсуждаемые ' },
    { id: 'oldest', title: 'Самые старые ' },
  ];

  const [sortedId, setSortedId] = useState('newest');

  const { onSortData } = useContext(PostsContext);

  const handleChangeSort = (id) => {
    setSortedId(id);
    onSortData(id);
  };
  // можно деструктурировать, и вместо (tab) => <span>{tab.title}</span> ) писать так как показано ниже
  return (
    <div className="sort">
      {tabs.map(({ id, title }) => (
        <span
          className={id === sortedId ? 'active' : 'non'}
          key={id}
          onClick={() => handleChangeSort(id)}>
          {title}
        </span>
      ))}
    </div>
  );
};
