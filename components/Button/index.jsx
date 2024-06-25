import { useFormStatus } from 'react-dom'
import styles from './Button.module.css'

const Button = ({ children }) => {
  const { pending } = useFormStatus()
  return (
    <button 
      className={styles.button}
      disabled={pending}
    >
      {children}
    </button>
  )
}

export default Button