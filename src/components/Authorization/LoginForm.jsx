import { Form } from './../Form/Form';

export const LoginForm = ({setShowAuthComponent}) => {
  return (
    <div>
      <Form>
Login
      <input />
      <div onClick={() => setShowAuthComponent('register')}>Register</div>
      </Form>
    </div>
  )
}