import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { useContext } from 'react';

import Link from 'next/link';
import styles from '../styles/Header.module.scss';
import UserContext from '../context/UserContext';

export default function Header() {
  const {user, logOut} = useContext(UserContext);

  return (
    <header className={styles.header}>
      {user && <><div className={styles.logo}>
        <Link href='/'>
          <a>DJ Events</a>
        </Link>
      </div>
      <nav>
        <ul>
          <li>
            <Link href='/events'>
              <a>Events</a>
            </Link>
          </li>
          {user ?
          <>
            <li>
              Bem vindo, {user.login}
            </li>
            <li>
              <Link href='/events/add'>
                <a>Add New Event</a>
              </Link>
            </li>
            <li>
              <Link href='/'>
                <button onClick={() => logOut()} className='btn-secondary btn-icon'><FaSignOutAlt /> Log Out</button>
              </Link>
            </li>
          </> :
          <>
            <li>
              <Link href='/account/login'>
                <a className='btn-secondary btn-icon'><FaSignInAlt /> Login</a>
              </Link>
            </li>
          </>}


        </ul>
      </nav></>}
    </header>
  )
}
