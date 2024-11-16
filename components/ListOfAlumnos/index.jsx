'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

import { getUsuarios } from '@/app/actions'
import styles from './list.module.css'

const ListOfAlumnos = ({ children, lateral = false }) => {
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

  let itemClassName = styles.item
  if (lateral) {
    itemClassName += ' ' + styles.lateral
  }

  return (
    <article className={styles.flex_container}>
      {loading && <p className={styles.center}>Cargando...</p>}
      {alumnos.map((alumno) => (
        <section key={alumno.id} className={itemClassName}>
          <Link href={`/alumnos/${alumno.id}`}>
            <h3># {alumno.id}</h3>
            <p>{alumno.nombre}</p>
          </Link>
          {children}
        </section>
      ))}
    </article>
  )
}

export default ListOfAlumnos