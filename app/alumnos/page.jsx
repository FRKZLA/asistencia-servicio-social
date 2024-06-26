import FloatingButtonComponent from '@/components/FloatingButton'
import ListOfAlumnos from '@/components/ListOfAlumnos'
import pageStyles from '../page.module.css'

const ListOfAlumnosPage = () => {
  return (
    <main className={pageStyles.main}>
      <h1>Lista de Alumnos</h1>
      <ListOfAlumnos />
      <FloatingButtonComponent href='/alumnos/add' />
    </main>
  )
}

export default ListOfAlumnosPage