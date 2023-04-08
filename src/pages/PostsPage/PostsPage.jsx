import { CardList } from '../../components/CardList/CardList';
import { useContext } from 'react';
import { PostsContext } from '../../context/PostsContext';
import { Sort } from '../../components/Sort/Sort';

export const PostsPage = () => {
  const { posts, isAuth } = useContext(PostsContext);

  return (
    <>
      {isAuth && (
        <>
          {posts?.length > 1 && <Sort />}
          <CardList posts={posts} />
        </>
      )}
    </>
  );
};
