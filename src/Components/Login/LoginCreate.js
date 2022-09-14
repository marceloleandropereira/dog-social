import React from 'react'
import Input from '../Forms/Input'
import Button from '../Forms/Button'
import useForm from '../../Hooks/useForm';
import { USER_POST } from '../../api';
import { UserContext } from '../../UserContext'

const LoginCreate = () => {
  const username = useForm();
  const email = useForm('email');
  const password = useForm('password');

  const { userLogin } = React.useContext(UserContext);

  async function handleSubmit(event) {
    event.preventDefault();
    const { url, options } = USER_POST({
      username: username.value,
      email: email.value,
      password: password.value
    });
    const response = await fetch(url, options);
    if (response.ok) userLogin(username.value, username.password);
  }

  return (
    <section className='animeLeft'>
      <h1 className='title'>Create</h1>

      <form onSubmit={handleSubmit}>
        <Input label="Username" type="text" name="username" {...username} />
        <Input label="Email" type="text" name="email" {...email} />
        <Input label="Password" type="password" name="password" {...password} />
        
        <Button>Create</Button>
      </form>
      
    </section>
  )
}

export default LoginCreate
