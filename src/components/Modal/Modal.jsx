import './Modal.scss';
import cn from 'classnames';
import { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { RegisterForm } from '../Authorization/RegisterForm';
import { PostsContext } from './../../context/PostsContext';

export const Modal = ({
  children,
  activeHeaderModal,
  setActiveHeaderModal,
  handleCloseModal,
  
}) => {
  // const [active, setActive] = useState(false);

  const { /* activeHeaderModal, setActiveHeaderModal */ } = useContext(PostsContext);

  // console.log({ children });
  const onKeydown = (e) => {
    switch (e.key) {
      case 'Escape':
        setActiveHeaderModal(false);
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
      className={cn('modal', { ['active']: activeHeaderModal })}
      onClick={() =>     setActiveHeaderModal(false)}
      // tabIndex={1} для того, чтобы можно было делать события клавиатуры
      // onKeyDown={closeModalEsc}

      // role="button"
    >
      <div
        className={cn('modal_content', { ['active']: activeHeaderModal })}
        onClick={(e) => e.stopPropagation()}
        >
        {children}
      </div>
    </div>
  );
};
