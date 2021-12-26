import styles from '../../styles/Button.module.scss';

const Button = ({ type, handleClick=null, value, loading=false }) => {
  return (
    loading ?
    <div>Carregando...</div> :
    <input className={styles.btn} type={type} onClick={(e) => handleClick ? handleClick(e) : null} value={value} />
  )
}

export default Button
