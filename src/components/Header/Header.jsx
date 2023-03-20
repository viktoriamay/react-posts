import { HeartOutlined, PlusCircleOutlined, SmileOutlined } from '@ant-design/icons';
import { Logo } from '../Logo/Logo';
import { Search } from '../Search/Search';
import './Header.scss';

export const Header = ({onSubmit: formSubmitRequest, onInput: changeInput}) => {
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__action_menu">
            <Logo />
            <Search onSubmit={formSubmitRequest} onInput={changeInput} />
          </div>
          <div className="header__icons_menu">
            <PlusCircleOutlined className="header__add_icon" />
            <HeartOutlined className="header__favorites_icon" />
            <SmileOutlined className="header__login_icon" />
          </div>
        </div>
      </div>
    </header>
  );
};
