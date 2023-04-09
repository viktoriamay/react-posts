import { MenuOutlined } from '@ant-design/icons';
import './BurgerMenu.scss';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export const BurgerMenu = ({ setActiveHeaderModal, activeHeaderModal }) => {
  const [activeNav, setActiveNav] = useState(false);

  const onToggleNav = () => {
    setActiveNav((activeNav) => !activeNav);
  };

  const onCloseNav = () => {
    setActiveNav(false);
  };

    document.addEventListener('click', () => {
      setActiveNav(false);
    })

    return (
    <div className="burger_menu" onClick={(e) => e.stopPropagation()}>
      <MenuOutlined className="project_icon__svg" onClick={onToggleNav} />
      <div
        className={
          activeNav
            ? 'burger_menu__navigation active'
            : 'burger_menu__navigation'
        }>
        <div
          onClick={() => {
            setActiveHeaderModal({ component: 'addPost', isOpen: true });
            onCloseNav();
          }}
          className="burger_menu__navigation_item">
          Добавить пост
        </div>
        <Link to={'/favorites'} onClick={onCloseNav} className="burger_menu__navigation_item">
          Избранное
        </Link>
        <Link to={'/profile'} onClick={onCloseNav} className="burger_menu__navigation_item">
          Мой профиль
        </Link>
      </div>
    </div>
  );
};
