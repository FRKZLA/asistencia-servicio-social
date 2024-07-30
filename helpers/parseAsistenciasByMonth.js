import { getAsistencias, getUsuarios } from "@/app/actions"

const parseAsistenciaByMonth = async (month) => {
  const alumnos = await getUsuarios()
  const res = {}

  await Promise.all(alumnos.map(alumno => getAsistencias(alumno.id)))
    .then(data => {
      console.log({ data })
      data.map((asistencias, index) => {
        const asistenciasDelMes = asistencias[month] || []
        res[alumnos[index].id] = {
          nombre: alumnos[index].nombre,
          asistencias: asistenciasDelMes.length,
        }
      })
      console.log(res)
    })



  return res
}

export default parseAsistenciaByMonth