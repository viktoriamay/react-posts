import { ReactComponent as MainLogo } from './img/main-logo.svg';
import './Logo.scss'

export const Logo = () => {
  return (
    <div className='logo'>
      <MainLogo className='logo__img' />
      <div className='logo__title_wrapper'>
        <p className='logo__title'>React</p>
        <p className='logo__title'>Posts</p>
      </div>
    </div>
  )
}