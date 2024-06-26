'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

import { getUsuarios } from '@/app/actions'
import styles from './list.module.css'

const ListOfAlumnos = () => {
  const [alumnos, setAlumnos] = useState([])
  useEffect(() => {
    getUsuarios()
      .then((response) => {
        console.log(response)
        setAlumnos(response)
      })

  }, [])


  return (
    <article className={styles.flex_container}>
      {alumnos.map((alumno) => (
        <Link href={`/alumnos/${alumno.id}`} key={alumno.id}>
          <h3>Matrícula: {alumno.matricula}</h3>
          <p>Nombre: {alumno.nombre}</p>
        </Link>
      ))}
    </article>
  )
}

export default ListOfAlumnos