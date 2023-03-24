export const LoginForm = ({setShowAuthComponent}) => {
  return (
    <div>
      <form>
Login
      <input />
      <button onClick={() => setShowAuthComponent('register')}>Register</button>
      </form>
    </div>
  )
}