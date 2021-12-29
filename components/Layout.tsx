import { useRouter } from 'next/router';
import Head from 'next/head';
import Header from './Header';
import styles from '../styles/Layout.module.scss';
import Footer from './Footer';
import Menu from './Menu';
import { useContext } from 'react';
import UserContext from '../context/UserContext';
import Loading from './Loading';

export default function Layout({title, keywords, description, children}) {
  const router = useRouter();
  const { user, loading } = useContext(UserContext);

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
        {user && <Menu />}
        <div className={styles.container}>
          {children}
        </div>
      </main>
      <Footer />
    </div>
  )
}

Layout.defaultProps = {
  title: 'Sistema de Pedidos',
  keywords: 'pedidos, restaurantes, ponta a ponta, processos',
  description: 'Controle seu negócio de ponta a ponta'
}