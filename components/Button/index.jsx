'use client'
import { useFormStatus } from 'react-dom'
import styles from './Button.module.css'

const Button = ({ children, ...props }) => {
  const { pending } = useFormStatus()
  return (
    <button
      className={styles.button}
      disabled={pending}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button