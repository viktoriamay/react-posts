import {
  HeartOutlined,
  PlusCircleOutlined,
  SmileOutlined,
} from '@ant-design/icons';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { PostsContext } from '../../context/PostsContext';
import { Logo } from '../Logo/Logo';
import { Search } from '../Search/Search';
import './Header.scss';

export const Header = ({ children, currentUser }) => {
  const { favorites } = useContext(PostsContext);
  // console.log(currentUser?.name); не забывать ставить ?

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
            <PlusCircleOutlined className="header__add_icon" />
            <Link to={'/favorites'}>{
favorites.length !== 0 &&
            <span style={{color: 'white'}}>{favorites.length}</span>
            }
              <HeartOutlined className="header__favorites_icon" />
            </Link>
            <SmileOutlined className="header__login_icon" />
          </div>
        </div>
      </div>
    </header>
  );
};
