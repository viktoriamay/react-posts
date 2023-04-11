import { ReactComponent as MainLogo } from './img/main-logo.svg';
import './Logo.scss'

export const Logo = ({logoTitle}) => {
  return (
    <div className='logo'>
      <MainLogo className='logo__img' />
      <div className={ logoTitle ? 'logo__title_wrapper' : 'title__footer'}>
        <p className='logo__title'>React</p>
        <p className='logo__title'>Posts</p>
      </div>
    </div>
  )
}