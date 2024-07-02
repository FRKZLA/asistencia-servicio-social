import Link from "next/link"
import styles from './back_button.module.css'

const BackButtonComponent = ({ href = '#', title = '' }) => {
  return (
    <h1 className={styles.title}>
      <Link href={href} className={styles.back_button}>
        {`<`}-
      </Link>
      {title}
    </h1>
  )
}

export default BackButtonComponent