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
          <p className="footer__madeby">
            <span>Made by viktoriamay</span>
            <span>© {new Date().getFullYear()}</span>
          </p>
          <div className="footer__socials">
            <a href="https://github.com/viktoriamay" target="_blank">
              <GithubOutlined className="project_icon__svg" />
            </a>
            <a href="mailto:viktoriagmay@gmail.com" target="_blank">
              <MessageOutlined className="project_icon__svg" />
            </a>
            <a href="https://t.me/etern8ty" target="_blank">
              <SendOutlined className="project_icon__svg" />
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
