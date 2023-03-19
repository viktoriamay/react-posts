import { Logo } from '../Logo/Logo';
import './Header.scss';

export const Header = () => {
  return (
    <header className="header">
      <div className="container">
      <div className='header__wrapper'>
        <Logo />
      </div>
      </div>
    </header>
  )
}