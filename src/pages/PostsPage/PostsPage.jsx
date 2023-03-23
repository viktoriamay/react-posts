import { CardList } from '../../components/CardList/CardList';
import { useContext } from 'react';
import { PostsContext } from '../../context/PostsContext';

export const PostsPage = () => {
  const { posts, handlePostLike } = useContext(PostsContext);
  return (
    <div>
      <CardList posts={posts} handlePostLike={handlePostLike} />
    </div>
  );
};
