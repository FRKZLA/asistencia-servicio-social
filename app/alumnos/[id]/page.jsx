'use client'
import pageStyles from '@/app/page.module.css'
import styles from './id.module.css'
import Link from 'next/link'
import BackButton from '@/components/BackButton'
import { convertMinutesToString } from '@/helpers/convertMinutesToString'
import useAlumno from '@/hook/useAlumno'
import { useEffect, useState } from 'react'
import { getDiasFestivos } from '@/app/actions'

const MINUTOS_A_REALIZAR = 480 * 60

const AlumnoByIdPage = ({ params: { id } }) => {
  const { personalInfo, asistencias, isLoading, totalMin, totalByDay, horasFaltantes } = useAlumno(id)
  const [diasFestivos, setDiasFestivos] = useState(null)

  useEffect(() => {
    getDiasFestivos()
      .then(setDiasFestivos)
  }, [])

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
              <hr />
              <h3>Conteo de horas</h3>
              <h4>Realizadas: {convertMinutesToString(totalMin)} (Incluye las horas de días festivos)</h4>
              {
                horasFaltantes > 0 ? (
                  <h4 className='danger'>Faltan {horasFaltantes} horas en total</h4>
                ) : (
                  <h4 className='success'>Está al corriente</h4>
                )
              }
            </section>
            <section className={styles.info}>
              <h2>Días Festivos</h2>
              {
                diasFestivos ? Object.entries(diasFestivos)
                  .map(([key, value]) => {
                    const date = new Date(key)
                    // convertimos la fecha a un string legible

                    const dateStr = date.toLocaleDateString('es', {
                      month: 'long',
                      day: 'numeric'
                    })
                    return <h4 key={key}>{dateStr} - {value.name}</h4>
                  })
                  :
                  <h4>No hay días festivos</h4>
              }
              Se sumaron {diasFestivos ? Object.keys(diasFestivos).length * 4 : 0} horas
            </section>
            {
              Object.entries(asistencias)
                .sort((a, b) => parseInt(b[0]) - parseInt(a[0]))
                .map(([key, asistencia]) => (
                  <section key={key} className={styles.info}>
                    <h2>{new Date(`2024-${key}-1`).toDateString().split(' ')[1]}</h2>
                    {
                      asistencia
                        .sort((a, b) => parseInt(a.id.split('-')[2]) - parseInt(b.id.split('-')[2]))
                        .map((dia) => (
                          <aside key={dia.id}>
                            <hr />
                            <h4>{dia.id.split('-')[2].padStart(2, '0')}: {dia.entrada} - {dia.salida ? dia.salida : 'No marcó salida'}</h4>
                          </aside>
                        ))
                    }
                    Total: {convertMinutesToString(totalByDay[key])} horas
                  </section>))
            }
          </>
        )
      }
    </div>
  )
}

export default AlumnoByIdPage