import styles from './form.module.css'

const Form = ({ children, ...props }) => {
  const method = props?.method || 'POST';
  return (
    <form className={styles.form} method={method}>
      {children}
    </form>
  );

}

export default Form;