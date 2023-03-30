import './Modal.scss';
import cn from 'classnames';
import { useEffect } from 'react';

export const Modal = ({
  children,
  activeHeaderModal,
  setActiveHeaderModal,
}) => {
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

  return (
    <div
      className={cn('modal', { ['active']: activeHeaderModal })}
      onClick={() => setActiveHeaderModal(false)}>
      <div
        className={cn('modal_content', { ['active']: activeHeaderModal })}
        onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};
