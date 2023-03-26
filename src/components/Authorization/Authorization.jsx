import { useState, useEffect } from 'react';
import { RegisterForm } from './RegisterForm';
import { LoginForm } from './LoginForm';
import { ResetPassForm } from './ResetPassForm';

export const Authorization = ({ activeModal, handleCloseModal }) => {
  const [showAuthComponent, setShowAuthComponent] = useState('login');

  useEffect(() => {
    if (!activeModal) {
      setShowAuthComponent('login');
    }
  }, [activeModal]);

  return (
    <div>
      {showAuthComponent === 'login' && (
        <LoginForm
          handleCloseModal={handleCloseModal}
          setShowAuthComponent={setShowAuthComponent}
        />
      )}
      {showAuthComponent === 'register' && (
        <RegisterForm
          handleCloseModal={handleCloseModal}
          setShowAuthComponent={setShowAuthComponent}
        />
      )}
      {showAuthComponent === 'reset-pass' && (
        <ResetPassForm
          handleCloseModal={handleCloseModal}
          setShowAuthComponent={setShowAuthComponent}
        />
      )}
    </div>
  );
};
