'use client'
import { useEffect, useState } from 'react'
import pageStyles from '@/app/page.module.css'
import styles from './id.module.css'
import Link from 'next/link'
import BackButton from '@/components/BackButton'
import { getUsuario } from '@/app/actions'

const AlumnoByIdPage = ({ params: { id } }) => {
  const [data, setData] = useState(null)

  useEffect(() => {
    getUsuario(id).then(setData)
  }, [id])

  console.log(data)
  return (
    <div className={pageStyles.main}>
      <BackButton href='/alumnos' title='Alumno' />
      {data === null && <h3>Cargando...</h3>}
      {
        data && (
          <>
            <section className={styles.info}>
              <h2>Información Personal</h2>
              <hr />
              <h4>Nombre: {data.nombre}</h4>
              <h4>Matrícula: {data.id}</h4>
              <h4>Horario: {data.hora_entrada} - {data.hora_salida}</h4>
            </section>
          </>
        )
      }
    </div>
  )
}

export default AlumnoByIdPage