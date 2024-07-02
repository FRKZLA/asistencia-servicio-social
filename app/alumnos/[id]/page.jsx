import pageStyles from '@/app/page.module.css'
import styles from './id.module.css'
import Link from 'next/link'

const AlumnoByIdPage = ({ params: { id } }) => {
  return (
    <div className={pageStyles.main}>
      <h1 className={styles.title}>
        <Link href='/alumnos' className={styles.back_button}>
          {`<`}-
        </Link>
        Agregar Alumno
      </h1>
    </div>
  )
}

export default AlumnoByIdPage