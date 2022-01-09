import styles from '../../styles/Button.module.scss';

const Button = ({ type, handleClick=null, value, loading=false, small=false, leng=null }) => {
  return (
    loading ?
    <div>Carregando...</div> :
    <input className={`${styles.btn} ${small ? styles.small : ''}`} style={{ width: leng ? leng : "100%" }} type={type} onClick={(e) => handleClick ? handleClick(e) : null} value={value} />
  )
}

export default Button
