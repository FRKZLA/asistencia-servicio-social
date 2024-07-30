import { getAsistencias, getUsuarios } from "@/app/actions"

const parseAsistenciaByMonth = async (month) => {
  const alumnos = await getUsuarios()
  const res = {}

  await Promise.all(alumnos.map(alumno => getAsistencias(alumno.id)))
    .then(data => {
      data.map((asistencias, index) => {
        const asistenciasDelMes = asistencias[month] || []
        const total = asistenciasDelMes
          .reduce((acc, dia) => {
            if (!dia.entrada || !dia.salida) return acc

            const entrada = new Date(`2024-01-01 ${dia.entrada}`).getTime()
            const salida = new Date(`2024-01-01 ${dia.salida}`).getTime()

            return acc + parseInt((salida - entrada) / 1000 / 60)
          }, 0)


        console.log({ total })

        res[alumnos[index].id] = {
          nombre: alumnos[index].nombre,
          asistencias: asistenciasDelMes.length,
          horas: Math.ceil(total / 60),
          faltantes: 40 - Math.ceil(total / 60)
        }
      })
      // console.log(res)
    })



  return res
}

export default parseAsistenciaByMonth