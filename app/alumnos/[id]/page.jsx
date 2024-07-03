'use client'
import { useEffect, useState } from 'react'
import pageStyles from '@/app/page.module.css'
import styles from './id.module.css'
import Link from 'next/link'
import BackButton from '@/components/BackButton'
import { getUsuario, getAsistencias } from '@/app/actions'

const AlumnoByIdPage = ({ params: { id } }) => {
  const [personalInfo, setPersonalInfo] = useState(null)
  const [asistencias, setAsistencias] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    Promise.all([getUsuario(id), getAsistencias(id)])
      .then(([usuario, asistencias]) => {
        console.log(Object.entries(asistencias))
        setPersonalInfo(usuario)
        setAsistencias(asistencias)
        setIsLoading(false)
      })
  }, [id])

  return (
    <div className={pageStyles.main}>
      <BackButton href='/alumnos' title='Alumno' />
      {isLoading && <h3>Cargando...</h3>}
      {
        !isLoading && (
          <>
            <section className={styles.info}>
              <h2>Información Personal</h2>
              <hr />
              <h4>Nombre: {personalInfo.nombre}</h4>
              <h4>Matrícula: {personalInfo.id}</h4>
              <h4>Horario: {personalInfo.hora_entrada} - {personalInfo.hora_salida}</h4>
            </section>
            {
              Object.entries(asistencias).map(([key, asistencia]) => (
                <section key={key} className={styles.info}>
                  <h2>{new Date(`2024-${key}-1`).toDateString().split(' ')[1]}</h2>
                  {
                    asistencia.map((dia) => (
                      <aside key={dia.id}>
                        <hr />
                        <h4>{dia.id.split('-')[2].padStart(2, '0')}: {dia.entrada} - {dia.salida}</h4>
                      </aside>
                    ))
                  }
                </section>))
            }
          </>
        )
      }
    </div>
  )
}

export default AlumnoByIdPage