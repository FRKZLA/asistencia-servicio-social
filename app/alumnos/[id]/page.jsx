import pageStyles from '@/app/page.module.css'

const AlumnoByIdPage = ({ params: { id } }) => {
  return (
    <div className={pageStyles.main}>
      <h1>Alumno {id}</h1>
    </div>
  )
}

export default AlumnoByIdPage