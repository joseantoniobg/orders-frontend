import styles from '../styles/Loading.module.scss';

const Loading = () => {
  return (
    <div className={styles.loading}>
       <div className={styles['loading-content']}>
         <div className={styles.spin}></div>
       </div>
    </div>
  )
}

export default Loading
