import styles from "./Button.module.css";
function Button({ type, onClick, disabled,children }) {
  return (
    <button className={`${styles.btn} ${styles[type]}`} disabled={disabled} onClick={onClick} >
      {children}
    </button>
  );
}

export default Button;
