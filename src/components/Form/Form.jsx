

export const Form =({title, handleFormSubmit, children}) => {
<form onSubmit={handleFormSubmit}>
  <h1 className="form__title">{title}</h1>
  {children}
</form>
}