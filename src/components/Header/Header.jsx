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

export const Header = ({ children }) => {
  const { favorites, isAuth, setIsAuth, activeHeaderModal, setActiveHeaderModal } = useContext(PostsContext);
  // console.log(currentUser?.name); не забывать ставить ?
  // const [activeHeaderModal, setActiveHeaderModal] = useState({
  //   isOpen: false,
  //   component: 'register',
  // });

  const navigate = useNavigate();

  const handleCloseModal = () => {
    setActiveHeaderModal({ ...activeHeaderModal, isOpen: false });
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__action_menu">
            <Link to={'/'}>
              <Logo />
            </Link>
            {children}
          </div>
          <div className="header__icons_menu">
            <PlusCircleOutlined
              onClick={() =>
                setActiveHeaderModal({ component: 'addPost', isOpen: true })
              }
              className="header__add_icon"
            />
            {isAuth && (
              <Link to={'/favorites'}>
                <div className="header__favorites_icon_wrapper">
                  {favorites.length !== 0 && (
                    <span className="header__favorites_counter">
                      {favorites.length}
                    </span>
                  )}
                  <HeartOutlined className="header__favorites_icon" />
                </div>
              </Link>
            )}
            {isAuth ? (
              <SmileOutlined
                onClick={() => navigate('/profile')}
                className="header__login_icon"></SmileOutlined>
            ) : (
              <LoginOutlined
                className="header__add_icon"
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
