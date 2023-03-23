
import { CardList } from '../../components/CardList/CardList';
import { Card } from './../../components/Card/Card';
import { useContext } from 'react';
import { PostsContext } from '../../context/PostsContext';

export const FavoritePage = ({currentUser}) => {

  const { favorites, handlePostLike } = useContext(PostsContext);

  return (
    <div>
      <h2>Избранное</h2>
      <CardList posts={favorites} handlePostLike={handlePostLike} currentUser={currentUser}>
       
      </CardList>
    </div>
  )
}