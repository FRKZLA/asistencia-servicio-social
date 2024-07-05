'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

import { getUsuarios } from '@/app/actions'
import styles from './list.module.css'

const ListOfAlumnos = () => {
  const [alumnos, setAlumnos] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setLoading(true)
    getUsuarios()
      .then((response) => {
        console.log(response)
        setAlumnos(response)
        setLoading(false)
      })
  }, [])


  return (
    <article className={styles.flex_container}>
      {loading && <p className={styles.center}>Cargando...</p>}
      {alumnos.map((alumno) => (
        <Link href={`/alumnos/${alumno.id}`} key={alumno.id} className={styles.item}>
          <h3># {alumno.id}</h3>
          <p>{alumno.nombre}</p>
        </Link>
      ))}
    </article>
  )
}

export default ListOfAlumnos