import {
  GithubOutlined,
  MessageOutlined,
  SendOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { Logo } from '../Logo/Logo';
import './Footer.scss';

export const Footer = () => {
  return (
    <div className="footer">
      <div className="container">
        <div className="footer__wrapper">
          <p>Made by viktoriamay</p>
          <div className="footer__socials">
            <a href="https://github.com/viktoriamay" target="_blank">
              <GithubOutlined className="header__login_icon" />
            </a>
            <a href="mailto:alterkelly@mail.ru" target="_blank">
              <MessageOutlined className="header__login_icon" />
            </a>
            <a href="https://t.me/etern8ty" target="_blank">
              <SendOutlined className="header__login_icon" />
            </a>
          </div>
          <Link to={'/'}>
            <Logo />
          </Link>
        </div>
      </div>
    </div>
  );
};
