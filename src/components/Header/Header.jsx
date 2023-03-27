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
import { Search } from '../Search/Search';
import './Header.scss';
import { Authorization } from './../Authorization/Authorization';
import { Modal } from '../Modal/Modal';
import { RegisterForm } from '../Authorization/RegisterForm';
import { AddPostForm } from './../AddPostForm/AddPostForm';

export const Header = ({
  children,
  currentUser,
  setActiveModal,
  activeModal,
  setIsAuth,
}) => {
  
  const { favorites, isAuth } = useContext(PostsContext);
  // console.log(currentUser?.name); не забывать ставить ?
  const [activeHeaderModal, setActiveHeaderModal] = useState({
    isOpen: false,
    component: 'register',
  });



  const handleCloseModal = () => {
    setActiveHeaderModal({ ...activeHeaderModal, isOpen: false });
  };

  const navigate = useNavigate();

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
                {favorites.length !== 0 && (
                  <span style={{ color: 'white' }}>{favorites.length}</span>
                )}
                <HeartOutlined className="header__favorites_icon" />
              </Link>
            )}
            {isAuth ? (
              <SmileOutlined onClick={() => navigate('/profile')}
                
                className="header__login_icon"></SmileOutlined>
            ) : (
              <LoginOutlined onClick={() =>
                  setActiveHeaderModal({ component: 'register', isOpen: true })
                }  />
            )}
          </div>
        </div>
      </div>
      <div className="modal__container">
        <Modal
          activeModal={activeHeaderModal.isOpen}
          setActiveModal={handleCloseModal}>
          {activeHeaderModal.component === 'addPost' && <AddPostForm />}
          {activeHeaderModal.component === 'register' && (
            <Authorization
              activeModal={activeHeaderModal.isOpen}
              setIsAuth={setIsAuth}
              handleCloseModal={handleCloseModal}
            />
          )}
        </Modal>
      </div>
    </header>
  );
};
