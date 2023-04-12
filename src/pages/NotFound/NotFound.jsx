import { Link } from 'react-router-dom';
import './NotFound.scss';
import { FrownOutlined } from '@ant-design/icons';

export const NotFound = () => {
  return (
    <div className="not_found">
      <h2 className="not_found__title">
        Страница не найдена <FrownOutlined />
      </h2>
      <Link to="/react-posts" className="not_found__link">
        Обратно на главную
      </Link>
    </div>
  );
};
