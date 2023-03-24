import './Modal.scss';
import cn from 'classnames';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { RegisterForm } from '../Authorization/RegisterForm';

export const Modal = ({
  children,
  activeModal,
  setActiveModal,
  handleCloseModal,
}) => {
  // const [active, setActive] = useState(false);
  // console.log({ children });
  const onKeydown = (e) => {
    switch (e.key) {
      case 'Escape':
        handleCloseModal();
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', onKeydown);
    return () => document.removeEventListener('keydown', onKeydown);
  });

  const navigate = useNavigate();

 /*  const handleClickCloseModal = () => {
    setActiveModal(false);
    navigate('/');
  }; */

  /* const closeModalEsc = (e) => {
    if (e.key === 'Escape') {
      setActiveModal(false);
      navigate('/');
    }
  } */

  return (
    <div
      className={cn('modal', { ['active']: activeModal })}
      onClick={() =>     setActiveModal(false)}
      // tabIndex={1} для того, чтобы можно было делать события клавиатуры
      // onKeyDown={closeModalEsc}

      // role="button"
    >
      <div
        className={cn('modal_content', { ['active']: activeModal })}
        onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};
