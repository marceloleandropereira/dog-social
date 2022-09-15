import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { UserContext } from '../../UserContext'
import { ReactComponent as Pictures} from '../../Assets/feed.svg'
import { ReactComponent as Stats} from '../../Assets/stats.svg'
import { ReactComponent as Add} from '../../Assets/add.svg'
import { ReactComponent as Logout} from '../../Assets/logout.svg'
import styles from './UserHeaderNav.module.css'
import useMedia from '../../Hooks/useMedia'

const UserHeaderNav = () => {
  const mobile = useMedia('(max-width: 40rem)');
  const { userLogout } = React.useContext(UserContext);
  const [mobileMenu, setMobileMenu] = React.useState(false);

  const { pathname } = useLocation();

  React.useEffect(() => {
    setMobileMenu(false);
  }, [pathname])

  return (
    <>
      {mobile && 
        <button 
          aria-label='Menu'
          className={`${styles.mobileButton} ${mobileMenu && styles.mobileButtonActive}`}
          onClick={() => setMobileMenu(!mobileMenu)} 
        />
      }
      <nav className={`${mobile ? styles.navMobile : styles.nav} ${mobileMenu && styles.navMobileActive}`}>
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
    </>
  )
}

export default UserHeaderNav
