import './Form.scss';

export const Form = ({ title, handleFormSubmit, children, className }) => {
  return (
    <form className={className  ? `${className} form` : 'form'} onSubmit={handleFormSubmit}>
      <h3 className="form__title">{title}</h3>
      {children}
    </form>
  );
};
