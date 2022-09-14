import React from 'react'
import { Link } from 'react-router-dom'
import useForm from '../../Hooks/useForm';
import { UserContext } from '../../UserContext';
import Button from '../Forms/Button';
import Input from '../Forms/Input';

const LoginForm = () => {
  const username = useForm();
  const password = useForm()

  const { userLogin, error, loading } = React.useContext(UserContext);

  async function handleLogin(event) {
    event.preventDefault();

    if (username.validate() && password.validate()) {
      userLogin(username.value, password.value);
    }
  }

  return (
    <section>
      <h1>Login</h1>

      <form action="" onSubmit={handleLogin}>
        <Input label="Username" type="text" name="username" {...username} />
        <Input label="Password" type="password" name="password" {...password} />
        {loading ? 
          (<Button disabled>Carregando...</Button>) 
          :
          <Button>Login</Button>
        }
        
        {error && <p>{error}</p>}
      </form>

      <Link to="/login/create">Create</Link>
    </section>
  )
}

export default LoginForm
