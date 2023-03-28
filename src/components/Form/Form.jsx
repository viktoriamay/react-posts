import './Form.scss';
import React from 'react';

export const Form = ({ title, handleFormSubmit, children, className }) => {
  return (
    <form className={className  ? `${className} form` : 'form'} onSubmit={handleFormSubmit}>
    {React.Children.count(children) > 0 && (
    <h3 className={`form__title ${title ? '' : 'hidden'}`}>{title}</h3>
  )}
      {children}
    </form>
  );
};
