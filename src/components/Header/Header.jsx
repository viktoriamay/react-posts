import {
  HeartOutlined,
  PlusCircleOutlined,
  SmileOutlined,
} from '@ant-design/icons';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { PostsContext } from '../../context/PostsContext';
import { Logo } from '../Logo/Logo';
import { Search } from '../Search/Search';
import './Header.scss';
import { Authorization } from './../Authorization/Authorization';
import { Modal } from '../Modal/Modal';
import { RegisterForm } from '../Authorization/RegisterForm';

export const Header = ({
  handleCloseModal,
  children,
  currentUser,
  setActiveModal,
  activeModal,

  add,
  setAdd,
  auth,
  setAuth,
}) => {
  const { favorites } = useContext(PostsContext);
  // console.log(currentUser?.name); не забывать ставить ?
  const [modal, setModal] = useState({ isOpen: false, component: 'register' });

  const handleFunc = () => {
    setModal({ ...modal, isOpen: false });
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
              onClick={() => console.log()}
              className="header__add_icon"
            />
            <Link to={'/favorites'}>
              {favorites.length !== 0 && (
                <span style={{ color: 'white' }}>{favorites.length}</span>
              )}
              <HeartOutlined className="header__favorites_icon" />
            </Link>
            <SmileOutlined onClick={() => setModal({component: 'register', isOpen: true})}
            className="header__login_icon"></SmileOutlined>
          </div>
        </div>
      </div>
      <Modal activeModal={modal.isOpen} setActiveModal={handleFunc} >
        {activeModal.component === 'register' && <RegisterForm />}
      </Modal>
    </header>
  );
};
