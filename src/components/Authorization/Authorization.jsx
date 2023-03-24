import { RegisterForm } from './RegisterForm';
import { useState, useEffect } from 'react';
import { LoginForm } from './LoginForm';

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
        <LoginForm setShowAuthComponent={setShowAuthComponent} />
      )}
      {showAuthComponent === 'register' && (
        <RegisterForm setShowAuthComponent={setShowAuthComponent} />
      )}
      {showAuthComponent === 'reset-pass' && <div>ResetPass component</div>}
    </div>
  );
};
