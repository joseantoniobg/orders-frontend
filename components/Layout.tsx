import { useRouter } from 'next/router';
import Head from 'next/head';
import Header from './Header';
import styles from '../styles/Layout.module.scss';
import Footer from './Footer';
import Menu from './Menu';
import { useContext, useState } from 'react';
import UserContext from '../context/UserContext';
import Loading from './Loading';

export default function Layout({title, keywords, description, children}) {
  const router = useRouter();
  const { user, loading } = useContext(UserContext);
  const [show, setShow] = useState(true);

  return (
    <div>
      {loading && <Loading />}
      <Head>
        <title>{title}</title>
        <meta name='description' content={description} />
        <meta name='keywords' content={keywords} />
      </Head>
      <Header />
      <main className={user && styles.main}>
        {user && <Menu show={show} setShow={setShow} />}
        <div className={styles.container} style={{ marginLeft: !show ? '7rem' : '2rem' }}>
          {children}
        </div>
      </main>
      <Footer />
    </div>
  )
}