import { CardList } from '../../components/CardList/CardList';
import { useContext } from 'react';
import { PostsContext } from '../../context/PostsContext';
import { Sort } from '../../components/Sort/Sort';

export const PostsPage = ({}) => {
  
  const { posts, isAuth } = useContext(PostsContext);

  return (
    <>
      {isAuth && (
        <div>
          <Sort />
          <CardList posts={posts} />
        </div>
      )}
    </>
  );
};
