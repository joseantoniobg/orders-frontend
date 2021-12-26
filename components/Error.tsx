import { useState } from 'react';
import styles from '../styles/Error.module.scss';

const Error = ({ error, setError }) => {

  const handleClose = () => {
    setError(null);
  }

  return (
    error && error != '' && <div className={styles.error}>
            <p>{error}</p>
            <button className={styles['close-button']} onClick={handleClose}>X</button>
    </div>
  )
}

export default Error
