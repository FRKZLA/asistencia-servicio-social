import FloatingButtonComponent from '@/components/FloatingButton'
import pageStyles from '../page.module.css'

const ListOfAlumnos = () => {
  return <main className={pageStyles.main}>
    <h1>Lista de Alumnos</h1>
    <FloatingButtonComponent />
  </main>

}

export default ListOfAlumnos