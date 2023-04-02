import { useNavigate } from 'react-router-dom';
import { LeftOutlined } from '@ant-design/icons';
import './PagesBackButton.scss'

export const PagesBackButton = () => {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate(-1)} className="button_back">
      <LeftOutlined />
      <span>Назад</span>
    </div>
  );
};
