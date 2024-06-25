import styles from './float_button.module.css'
import Link from 'next/link'

const FloatingButtonComponent = ({ href = '#' }) => {
  return (
    <Link className={styles.button} href={href}>
      +
    </Link>
  )
}

export default FloatingButtonComponent