'use client'
import { useState } from 'react'
import styles from './Dialog.module.css'


const Dialog = ({ title, children, handleClose }) => {
  const [open, setOpen] = useState(true)

  if (!children) return null
  const handleModal = () => {
    setOpen(false)
    if (handleClose) handleClose()
  }

  return (
    <main className={styles.container}>
      <dialog open={open} className={styles.dialog}>
        <div>
          <h2>{title}</h2>
        </div>
        <section>
          {children}
        </section>
        <button type='button' onClick={handleModal} className={styles.button}>Aceptar</button>
      </dialog>
    </main>
  )
}

export default Dialog