import React from 'react'
import styles from '../styles/Menu.module.scss';
import { useState, useContext } from 'react';
import UserContext from '../context/UserContext';
import Link from 'next/link';

const Menu = () => {
  const [show, setShow] = useState(true);
  const { user } = useContext(UserContext);

  return (
    <div className={`${styles.menu} ${show ? styles['menu-open'] : styles['menu-closed']}`}>
          <button className={styles.toggle} onClick={() => setShow(!show)}>⇄</button>
          <ul>
            {user.roles.filter(r => r.id_role_child === null)
            .map(role =>
            (<><li className={styles['list-item']} key={role.unique_key}>
              <Link href={role.link}>{role.description}</Link>
             </li>
             {user.roles.filter(subRole => subRole.id_role_child === role.id_role).map(subRole => (<li className={styles['list-sub-item']} key={subRole.unique_key}><Link href={subRole.link}>{subRole.description}</Link></li>))}
             </>))}
          </ul>
    </div>
  )
}

export default Menu
