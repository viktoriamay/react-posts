import { useState, useEffect } from 'react';
import { RegisterForm } from './RegisterForm';
import { LoginForm } from './LoginForm';
import { ResetPassForm } from './ResetPassForm';

export const Authorization = ({ activeModal, headerCloseModal }) => {
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
          headerCloseModal={headerCloseModal}
          setShowAuthComponent={setShowAuthComponent}
        />
      )}
      {showAuthComponent === 'register' && (
        <RegisterForm
          headerCloseModal={headerCloseModal}
          setShowAuthComponent={setShowAuthComponent}
        />
      )}
      {showAuthComponent === 'reset-pass' && (
        <ResetPassForm
          headerCloseModal={headerCloseModal}
          setShowAuthComponent={setShowAuthComponent}
        />
      )}
    </div>
  );
};
