import { useEffect, useState } from 'react'
import { getUsuario, getAsistencias } from '@/app/actions'
import { getDiasFestivos } from '@/app/actions'

const useAlumno = (id) => {
  const [personalInfo, setPersonalInfo] = useState(null)
  const [asistencias, setAsistencias] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [totalMin, setTotalMin] = useState(0)
  const [totalByDay, setTotalByDay] = useState({})
  const [horasFaltantes, setHorasFaltantes] = useState(0)

  useEffect(() => {
    Promise.all([getUsuario(id), getAsistencias(id), getDiasFestivos()])
      .then(([usuario, asistencias, diasFestivos]) => {
        setPersonalInfo(usuario)
        setAsistencias(asistencias)
        setIsLoading(false)
        let total = Object.entries(asistencias)
          .reduce((acc, asistencia) => {
            const sum = asistencia[1]
              .reduce((acc, dia) => {
                if (!dia.entrada || !dia.salida) return acc

                const entrada = new Date(`2024-01-01 ${dia.entrada}`).getTime()
                const salida = new Date(`2024-01-01 ${dia.salida}`).getTime()

                return acc + parseInt((salida - entrada) / 1000 / 60)
              }, 0)

            setTotalByDay((prev) => ({
              ...prev,
              [asistencia[0]]: sum
            }))
            return acc + sum
          }
            , 0)
        setTotalMin(total)

        const initialDate = new Date(`2024-7-1`)
        const finalDate = new Date().setDate(new Date().getDate() - 1)
        let sumaHoras = 0

        for (let i = initialDate; i < finalDate; i.setDate(i.getDate() + 1)) {
          if (i.getDay() === 0 || i.getDay() === 6) {
            continue
          }
          // TODO: Tomar en cuenta los días festivos
          //console.log(i.getDay())
          sumaHoras += 4
        }

        // Sumar los días festivos
        Object.entries(diasFestivos)
          .forEach(([key, value]) => {
            const minutosAgregar = 60 * 4
            total += minutosAgregar
            setTotalMin((prev) => prev + minutosAgregar)


          })

        const horasPendientes = Math.floor(480 - (total / 60))
        setHorasFaltantes(horasPendientes)
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