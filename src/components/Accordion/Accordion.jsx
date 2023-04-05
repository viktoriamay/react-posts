import { useState } from 'react';
import './Accordion.scss';

export const Accordion = ({ children, title }) => {
  const [selected, setSelected] = useState(false);

  const toggleState = () => {
    setSelected(!selected);
  }
  
  return (
    <div className={selected ? 'accordion active' : 'accordion'}>
      <button className={'accordion__button'} onClick={toggleState}>
        <h3 className='accordion__title'>{title}</h3>
      </button>
      <div className={'accordion__content'}>
        <p className={'accordion__text'}>{children}</p>
      </div>
    </div>
  );
};