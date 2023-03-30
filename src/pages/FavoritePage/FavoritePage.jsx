import { CardList } from '../../components/CardList/CardList';
import { useContext } from 'react';
import { PostsContext } from '../../context/PostsContext';

export const FavoritePage = () => {
  const { favorites, handlePostLike, currentUser } = useContext(PostsContext);

  return (
    <div>
      <h2>Избранное</h2>
      <CardList
        posts={favorites}
        handlePostLike={handlePostLike}
        currentUser={currentUser}></CardList>
    </div>
  );
};
