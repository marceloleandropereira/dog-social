import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../Forms/Button';
import Input from '../Forms/Input';

const LoginForm = () => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleLogin(event) {
    event.preventDefault();
    fetch('https://dogsapi.origamid.dev/json/jwt-auth/v1/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then((json) => {
      console.log(json);
    })
  }

  return (
    <section>
      <h1>Login</h1>

      <form action="" onSubmit={handleLogin}>
        <Input label="User" type="text" name="username" />
        <Input label="Password" type="password" name="password" />

        <Button>Login</Button>
      </form>

      <Link to="/login/create">Create</Link>
    </section>
  )
}

export default LoginForm
