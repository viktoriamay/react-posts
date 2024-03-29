import {
  HeartOutlined,
  LoginOutlined,
  PlusCircleOutlined,
  SmileOutlined,
} from '@ant-design/icons';
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PostsContext } from '../../context/PostsContext';
import { Logo } from '../Logo/Logo';
import './Header.scss';
import { Authorization } from './../Authorization/Authorization';
import { Modal } from '../Modal/Modal';
import { AddPostForm } from './../AddPostForm/AddPostForm';
import { BurgerMenu } from '../BurgerMenu/BurgerMenu';

export const Header = ({ children }) => {
  const {
    favorites,
    isAuth,
    setIsAuth,
    activeHeaderModal,
    setActiveHeaderModal,
  } = useContext(PostsContext);

  const navigate = useNavigate();

  const handleCloseModal = () => {
    setActiveHeaderModal({ ...activeHeaderModal, isOpen: false });
  };

  const [logoTitle, setLogoTitle] = useState(true);

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__action_menu">
            <Link to={'/react-posts'}>
              <Logo logoTitle={logoTitle} />
            </Link>
            {children}
          </div>
          <div className="header__icons_menu">
            {isAuth && (
              <>
                <BurgerMenu
                  activeHeaderModal={activeHeaderModal}
                  setActiveHeaderModal={setActiveHeaderModal}
                />
                <PlusCircleOutlined
                  onClick={() =>
                    setActiveHeaderModal({ component: 'addPost', isOpen: true })
                  }
                  className="header__nav_icon project_icon__svg"
                />
                <Link to={'/favorites'} className='header__fav_link'>
                  <div className="header__favorites_icon_wrapper">
                    {favorites?.length !== 0 && (
                      <span className="header__favorites_counter">
                        {favorites?.length}
                      </span>
                    )}
                    <HeartOutlined className="project_icon__svg" />
                  </div>
                </Link>
              </>
            )}
            {isAuth ? (
              <SmileOutlined
                onClick={() => navigate('/profile')}
                className="header__nav_icon project_icon__svg"></SmileOutlined>
            ) : (
              <LoginOutlined
                className="project_icon__svg"
                onClick={() =>
                  setActiveHeaderModal({ component: 'register', isOpen: true })
                }
              />
            )}
          </div>
        </div>
      </div>
      <div className="modal__container">
        <Modal
          activeHeaderModal={activeHeaderModal.isOpen}
          setActiveHeaderModal={setActiveHeaderModal}>
          {activeHeaderModal.component === 'addPost' && <AddPostForm />}
          {activeHeaderModal.component === 'register' && (
            <Authorization
              activeHeaderModal={activeHeaderModal.isOpen}
              setIsAuth={setIsAuth}
              handleCloseModal={handleCloseModal}
            />
          )}
        </Modal>
      </div>
    </header>
  );
};
