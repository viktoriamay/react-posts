import spinnerLogo from './spin.svg';
import './Spinner.scss';

export const Spinner = () => {
  return (
    <div className="spinner">
      <img className="spinner__logo" src={spinnerLogo} alt='spinner-logo' />
    </div>
  );
};
