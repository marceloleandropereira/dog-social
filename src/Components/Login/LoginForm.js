import React from 'react'
import { Link } from 'react-router-dom'
import Error from '../../Helper/Error';
import useForm from '../../Hooks/useForm';
import { UserContext } from '../../UserContext';
import Button from '../Forms/Button';
import Input from '../Forms/Input';
import styles from './LoginForm.module.css'
import stylesButton from '../Forms/Button.module.css'

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
    <section className='animeLeft'>
      <h1 className="title">Login</h1>

      <form className={styles.form} onSubmit={handleLogin}>
        <Input label="Username" type="text" name="username" {...username} />
        <Input label="Password" type="password" name="password" {...password} />
        {loading ? 
          (<Button disabled>Carregando...</Button>) 
          :
          <Button>Login</Button>
        }
        
        <Error error={error} />
      </form>

      <Link className={styles.lostPassword} to="/login/loss">
        Lost the password?
      </Link>
      <div className={styles.create}>
        <h2 className={styles.subtitle}>Create</h2>
        <p>Still don't have an account? Register on the site.</p>
        <Link className={stylesButton.button} to="/login/create">
          Create
        </Link>
      </div>
    </section>
  )
}

export default LoginForm
