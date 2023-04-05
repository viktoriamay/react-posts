import { useContext, useState, useEffect } from 'react';
import { PostsContext } from '../../context/PostsContext';
import { Sort } from '../../components/Sort/Sort';
import { Card } from '../../components/Card/Card';
import { Pagination } from 'antd';
import './PostsPage.scss';

export const PostsPage = () => {
  const { posts } = useContext(PostsContext);

  const [paginated, setPaginated] = useState([]);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(6);

  const locale = {
    items_per_page: 'постов на странице',
    jump_to: 'Перейти',
    page: '',
    prev_page: 'Предыдущая страница',
    next_page: 'Следующая страница',
    prev_5: 'Предыдущие 5 страниц',
    next_5: 'Следующие 5 страниц',
    prev_3: 'Предыдущие 3 страницы',
    next_3: 'Следующие 3 страницы',
  };

  useEffect(() => {
    const sliced = posts.slice((page - 1) * size, size * page);
    setPaginated(sliced);
  }, [page, posts, size]);

  useEffect(() => {
    setPage(1);
  }, [posts.length, size]);

  return (
    <div>
      {posts?.length > 1 && <Sort />}
      <div className="cards">
        {paginated.map((post) => (
          <Card key={post?._id + Math.random()} {...post} post={post} />
        ))}
      </div>
      {posts?.length > 6 && (
        <Pagination
          locale={locale}
          defaultCurrent={1}
          current={page}
          total={Math.ceil(posts.length)}
          showSizeChanger
          defaultPageSize={6}
          pageSizeOptions={[6, 9, 30]}
          className="pagination"
          pageSize={size}
          onChange={(page, size) => {
            setPage(page);
            setSize(size);
          }}
        />
      )}
    </div>
  );
};
