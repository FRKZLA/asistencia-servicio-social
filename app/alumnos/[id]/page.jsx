'use client'
import pageStyles from '@/app/page.module.css'
import styles from './id.module.css'
import Link from 'next/link'
import BackButton from '@/components/BackButton'
import { convertMinutesToString } from '@/helpers/convertMinutesToString'
import useAlumno from '@/hook/useAlumno'

const MINUTOS_A_REALIZAR = 480 * 60

const AlumnoByIdPage = ({ params: { id } }) => {
  const { personalInfo, asistencias, isLoading, totalMin, totalByDay, horasFaltantes } = useAlumno(id)

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
              <h4>Realizadas: {convertMinutesToString(totalMin)}</h4>
              {
                horasFaltantes > 0 ? (
                  <h4 className='danger'>Faltan {horasFaltantes} horas en el mes</h4>
                ) : (
                  <h4 className='success'>Está al corriente</h4>
                )
              }
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