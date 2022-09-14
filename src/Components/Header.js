import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Header.module.css'
import { ReactComponent as DogPaw } from '../Assets/dog_paw.svg'
import { UserContext } from '../UserContext'

const Header = () => {
  const { userData, userLogout } = React.useContext(UserContext);

  return (
    <header className={styles.header}>
      <nav className={`${styles.nav} container`}>
        <Link className={styles.logo} to="/" aria-label="Dogs - Home">
          <DogPaw className={styles.icon} />
        </Link>
        { userData ? 
          (
            <Link className={styles.login} to="/account">
              {userData.nome}
              <button onClick={userLogout}>Sair</button>
            </Link>
          ) : (
            <Link className={styles.login} to="/login">
              Login / Create
            </Link>
          )

        }
      </nav>
    </header>
  )
}

export default Header
