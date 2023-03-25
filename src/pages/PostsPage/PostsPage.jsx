import { CardList } from '../../components/CardList/CardList';
import { useContext } from 'react';
import { PostsContext } from '../../context/PostsContext';
import { Sort } from '../../components/Sort/Sort';

export const PostsPage = ({currentUser}) => {
  const { posts, handlePostLike } = useContext(PostsContext);
  return (
    <div>
    <Sort />
      <CardList posts={posts} handlePostLike={handlePostLike} currentUser={currentUser} />
    </div>
  );
};
