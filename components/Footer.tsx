import Link from 'next/link';
import styles from '../styles/Footer.module.scss';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <p>Copyright &copy; JABG {currentYear}</p>
      <p>
        <Link href="/about">Sobre este projeto</Link>
      </p>
    </footer>
  )
}
