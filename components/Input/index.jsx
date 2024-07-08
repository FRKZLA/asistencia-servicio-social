import styles from './input.module.css'

const Input = ({ value, onChange, ...props }) => {
  return (
    <section className={styles.input_container}>
      <input
        type="text"
        name='hora_salida'
        className={styles.input}
        {...props}
      />
      <label htmlFor="matricula" className={styles.label}>{props.title}</label>
    </section>
  )

}

export default Input;