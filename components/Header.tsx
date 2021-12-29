import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { useContext } from 'react';

import Link from 'next/link';
import styles from '../styles/Header.module.scss';
import UserContext from '../context/UserContext';

export default function Header() {
  const {user, logOut} = useContext(UserContext);

  return (
    user && <header className={styles.header}>
      <div className={styles.logo}>
        <Link href='/'>
          <a>Pedidos</a>
        </Link>
      </div>
      <nav>
        <ul>
          <li>
            Bem vindo, {user.name}!
          </li>
          <li>
            <Link href='/'>
              <button onClick={() => logOut()} className='btn-secondary btn-icon'><FaSignOutAlt /> Log Out</button>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
