'use client'
import { useEffect, useState } from 'react'
import pageStyles from '@/app/page.module.css'
import styles from './id.module.css'
import Link from 'next/link'
import BackButton from '@/components/BackButton'
import { getUsuario, getAsistencias } from '@/app/actions'
import { convertMinutesToString } from '@/helpers/convertMinutesToString'

const MINUTOS_A_REALIZAR = 480 * 60

const AlumnoByIdPage = ({ params: { id } }) => {
  const [personalInfo, setPersonalInfo] = useState(null)
  const [asistencias, setAsistencias] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [totalMin, setTotalMin] = useState(0)
  const [totalByDay, setTotalByDay] = useState({})
  const [horasFaltantes, setHorasFaltantes] = useState(0)

  const dateNow = new Date()

  useEffect(() => {
    Promise.all([getUsuario(id), getAsistencias(id)])
      .then(([usuario, asistencias]) => {
        setPersonalInfo(usuario)
        setAsistencias(asistencias)
        setIsLoading(false)
        const total = Object.entries(asistencias)
          .reduce((acc, asistencia) => {
            const sum = asistencia[1]
              .reduce((acc, dia) => {
                if (!dia.entrada || !dia.salida) return acc

                const entrada = new Date(`2024-01-01 ${dia.entrada}`).getTime()
                const salida = new Date(`2024-01-01 ${dia.salida}`).getTime()

                return acc + parseInt((salida - entrada) / 1000 / 60)
              }, 0)

            console.log(sum / 60)

            // Si está en el mes actual
            if (parseInt(asistencia[0]) === dateNow.getMonth() + 1) {
              const initialDate = new Date(`2024-${asistencia[0]}-1`)
              const finalDate = new Date().setDate(new Date().getDate() - 1)
              let sumaHoras = 0

              for (let i = initialDate; i < finalDate; i.setDate(i.getDate() + 1)) {
                if (i.getDay() === 0 || i.getDay() === 6) {
                  continue
                }
                //console.log(i.getDay())
                sumaHoras += 4
              }
              setHorasFaltantes(Math.floor(sumaHoras - (sum / 60)))
            }

            setTotalByDay((prev) => ({
              ...prev,
              [asistencia[0]]: sum
            }))
            return acc + sum
          }
            , 0)
        setTotalMin(total)
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
              <hr />
              <h3>Conteo de horas</h3>
              <h4>Realizadas: {convertMinutesToString(totalMin)}</h4>
              <h4>Faltantes: {Math.floor((MINUTOS_A_REALIZAR - totalMin) / 60)}</h4>
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
                    {
                      horasFaltantes > 0 && (
                        <h4>Faltan {horasFaltantes} horas</h4>
                      )
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