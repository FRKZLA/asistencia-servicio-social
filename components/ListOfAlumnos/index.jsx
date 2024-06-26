'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

import { getUsuarios } from '@/app/actions'

const ListOfAlumnos = () => {
  const [alumnos, setAlumnos] = useState([])
  useEffect(() => {
    getUsuarios()
      .then((response) => {
        console.log(response)
        setAlumnos(response)
      })

  }, [])


  return <ul>
    {alumnos.map((alumno, index) => (
      <li key={index}>
        <Link href={`/alumnos/${alumno.id}`}>
          {alumno.nombre}
        </Link>
      </li>
    ))}
  </ul>
}

export default ListOfAlumnos