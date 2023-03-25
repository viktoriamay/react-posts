import { useState, useEffect } from 'react';
import { RegisterForm } from './RegisterForm';
import { LoginForm } from './LoginForm';
import { ResetPassForm } from './ResetPassForm';

export const Authorization = ({ activeModal }) => {
  const [showAuthComponent, setShowAuthComponent] = useState('login');

  useEffect(() => {
    if (!activeModal) {
      setShowAuthComponent('login');
    }
  }, [activeModal]);
  
  return (
    <div>
      {showAuthComponent === 'login' && (
        <LoginForm setShowAuthComponent={setShowAuthComponent}  />
      )}
      {showAuthComponent === 'register' && (
        <RegisterForm setShowAuthComponent={setShowAuthComponent} />
      )}
      {showAuthComponent === 'reset-pass' && <ResetPassForm setShowAuthComponent={setShowAuthComponent} />}
    </div>
  );
};
