import { Logo } from '../Logo/Logo';
import { Search } from '../Search/Search';
import './Header.scss';

export const Header = () => {
  return (
    <header className="header">
      <div className="container">
      <div className='header__wrapper'>
        <Logo />
        <Search />
      </div>
      </div>
    </header>
  )
}