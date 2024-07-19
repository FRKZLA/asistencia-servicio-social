import { useEffect, useState } from 'react'
import { getUsuario, getAsistencias } from '@/app/actions'

const useAlumno = (id) => {
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

            // Si está en el mes actual
            const initialDate = new Date(`2024-${asistencia[0]}-1`)
            const finalDate = new Date().setDate(new Date().getDate() - 1)
            const anotherDate = new Date(initialDate.getFullYear(), asistencia[0], 0)
            let sumaHoras = 0

            let useDate;
            if (parseInt(asistencia[0]) === dateNow.getMonth() + 1) {
              useDate = finalDate
            } else {
              useDate = anotherDate
            }

            for (let i = initialDate; i < useDate; i.setDate(i.getDate() + 1)) {
              if (i.getDay() === 0 || i.getDay() === 6) {
                continue
              }
              //console.log(i.getDay())
              sumaHoras += 4
            }
            setHorasFaltantes(prev => ({
              ...prev,
              [asistencia[0]]: Math.floor(sumaHoras - (sum / 60))
            }))

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

  return {
    personalInfo,
    asistencias,
    isLoading,
    totalMin,
    totalByDay,
    horasFaltantes
  }

}

export default useAlumno;