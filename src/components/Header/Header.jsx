import {
  HeartOutlined,
  PlusCircleOutlined,
  SmileOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { Logo } from '../Logo/Logo';
import { Search } from '../Search/Search';
import './Header.scss';

export const Header = ({ children, currentUser }) => {

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
            <Link to={'/favorites'}>

            <HeartOutlined  className="header__favorites_icon" />
            </Link>
            <SmileOutlined className="header__login_icon" />
          </div>
        </div>
      </div>
    </header>
  );
};
