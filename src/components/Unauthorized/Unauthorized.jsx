import './Unauthorized.scss';
import logo from '../Spinner/spin.svg';

export const Unauthorized = () => {
  return (
    <div className="unauthorized">
      <div className="unauthorized__animation">
        <img src={logo} className="unauthorized__logo" alt='auth-logo' />
      </div>
      <h2>Авторизуйтесь</h2>
    </div>
  );
};
