import { Card } from '../Card/Card';
import './CardList.scss';
import { useEffect, useState } from 'react';
import { Pagination } from 'antd';

export const CardList = ({ posts = [] }) => {
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
    <>
      <div className="cards">
        {paginated?.map((post) => (
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
    </>
  );
};
