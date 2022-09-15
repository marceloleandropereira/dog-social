import React from 'react'
import { NavLink } from 'react-router-dom'
import { UserContext } from '../../UserContext'
import { ReactComponent as Pictures} from '../../Assets/feed.svg'
import { ReactComponent as Stats} from '../../Assets/stats.svg'
import { ReactComponent as Add} from '../../Assets/add.svg'
import { ReactComponent as Logout} from '../../Assets/logout.svg'
import styles from './UserHeaderNav.module.css'

const UserHeaderNav = () => {
  const [mobile, setMobile] = React.useState(null);
  const { userLogout } = React.useContext(UserContext);

  return (
    <nav className={styles.nav}>
      <NavLink to="/account" end>
        <Pictures />
        {mobile && 'Pictures'}
      </NavLink>
      <NavLink to="/account/stats">
        <Stats />
        {mobile && 'Stats'}
      </NavLink>
      <NavLink to="/account/post">
        <Add />
        {mobile && 'Add Picture'}
      </NavLink>
      <button onClick={userLogout}>
        <Logout />
        {mobile && 'Logout'}
      </button>
    </nav>
  )
}

export default UserHeaderNav
