import './Form.scss';

export const Form = ({ title, handleFormSubmit, children }) => {
  return (
    <form className="form" onSubmit={handleFormSubmit}>
      <h1 className="form__title">{title}</h1>
      {children}
    </form>
  );
};
