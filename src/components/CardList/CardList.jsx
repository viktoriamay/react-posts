import { useContext } from 'react';
import { Card } from '../Card/Card';
import './CardList.scss';
import { PostsContext } from './../../context/PostsContext';

export const CardList = ({currentUser, handlePostLike }) => {

  const {posts = [] } = useContext(PostsContext);
  return (
    <div className="cards">
      {posts.map((post) => (
        <Card
          key={post._id}
          {...post}
          currentUser={currentUser}
          handlePostLike={handlePostLike}
        />
      ))}
    </div>
  );
};
