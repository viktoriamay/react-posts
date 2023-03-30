import { useContext, useState } from 'react';
import { PostsContext } from './../../context/PostsContext';
import './Sort.scss';

export const Sort = () => {
  const { tabs, sortedId, handleChangeSort } = useContext(PostsContext);
  
  return (
    <div className="sort">
      {tabs.map(({ id, title }) => (
        <span
          className={id === sortedId ? 'sort__item sort__item_active' : 'sort__item'}
          key={id}
          onClick={() => handleChangeSort(id)}>
          {title}
        </span>
      ))}
    </div>
  );
};
