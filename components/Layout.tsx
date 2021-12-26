import { useRouter } from 'next/router';
import Head from 'next/head';
import Header from './Header';
import styles from '../styles/Layout.module.scss';
import Footer from './Footer';

export default function Layout({title, keywords, description, children}) {
  const router = useRouter();
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name='description' content={description} />
        <meta name='keywords' content={keywords} />
      </Head>
      <Header />
      <div className={styles.container}>
        {children}
      </div>
      <Footer />
    </div>
  )
}

Layout.defaultProps = {
  title: 'DJ Events | Find the hottest parties',
  keywords: 'events, djs, music, edm',
  description: 'Find the lattest DJ and other musical events'
}