import { CardList } from '../../components/CardList/CardList';
import { useContext } from 'react';
import { PostsContext } from '../../context/PostsContext';
import { PagesBackButton } from '../../components/PagesBackButton/PagesBackButton';

export const FavoritePage = () => {
  const { favorites, handlePostLike, currentUser } = useContext(PostsContext);

  return (
    <div>
      <div className="button_back_offset">
        <PagesBackButton />
      </div>
      <h2>Избранное</h2>
      <CardList
        posts={favorites}
        handlePostLike={handlePostLike}
        currentUser={currentUser}></CardList>
    </div>
  );
};
