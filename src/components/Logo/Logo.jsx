import { ReactComponent as MainLogo } from './img/main-logo.svg';
import './Logo.scss'

export const Logo = () => {
  return (
    <div className='logo'>
      <MainLogo className='logo__img' />
      <div className='logo_title_wrapper'>
        <p className='logo_title'>React</p>
        <p className='logo_title'>Posts</p>
      </div>
    </div>
  )
}