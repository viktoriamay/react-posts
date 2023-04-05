import { useContext } from 'react';
import { Card } from '../Card/Card';
import './CardList.scss';
import { PostsContext } from './../../context/PostsContext';

export const CardList = ({handlePostLike, posts = [], currentUser, favorites }) => {
console.log({posts});
  return (
    <div className="cards">
      {posts?.map((post) => (
        <Card
        // posts={favorites}
          key={post._id}
          {...post}
          post={post}
          currentUser={currentUser}
          handlePostLike={handlePostLike}
        />
      ))}
    </div>
  );
};
