import React from 'react'
import { Link } from 'react-router-dom'
import useForm from '../../Hooks/useForm';
import Button from '../Forms/Button';
import Input from '../Forms/Input';

const LoginForm = () => {
  const username = useForm();
  const password = useForm();

  function handleLogin(event) {
    event.preventDefault();

    if (username.validate() && password.validate()) {
      fetch('https://dogsapi.origamid.dev/json/jwt-auth/v1/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
      })
      .then(response => response.json())
      .then((json) => {
        console.log(json);
      });
    }
  }

  return (
    <section>
      <h1>Login</h1>

      <form action="" onSubmit={handleLogin}>
        <Input label="Username" type="text" name="username" {...username} />
        <Input label="Password" type="password" name="password" {...password} />

        <Button>Login</Button>
      </form>

      <Link to="/login/create">Create</Link>
    </section>
  )
}

export default LoginForm
