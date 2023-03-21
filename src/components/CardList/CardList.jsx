import { Card } from '../Card/Card';
import './CardList.scss';

export const CardList = ({ posts, currentUser, handlePostLike }) => {
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
