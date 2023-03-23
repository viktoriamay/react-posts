import { CardList } from '../../components/CardList/CardList';
import { useContext } from 'react';
import { PostsContext } from '../../context/PostsContext';

export const PostsPage = ({currentUser}) => {
  const { posts, handlePostLike } = useContext(PostsContext);
  return (
    <div>
      <CardList posts={posts} handlePostLike={handlePostLike} currentUser={currentUser} />
    </div>
  );
};
