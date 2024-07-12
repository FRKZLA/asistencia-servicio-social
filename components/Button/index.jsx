'use client'
import { useFormStatus } from 'react-dom'
import styles from './Button.module.css'

const Button = ({ children, ...props }) => {
  const { pending } = useFormStatus()
  let className = styles.button

  // Merge the class names
  if (props.className) {
    className += ` ${props.className}`
  }

  return (
    <button
      disabled={pending}
      {...props}
      className={className}
    >
      {children}
    </button>
  )
}

export default Button