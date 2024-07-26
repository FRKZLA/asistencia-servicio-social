'use client'
import { useState } from 'react'
import styles from './Dialog.module.css'
import Button from '../Button'


const Dialog = ({ title, children, handleClose, isError }) => {
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
          <h2 className={isError ? styles.text_error : ''}>{title}</h2>
        </div>
        <section>
          {children}
        </section>
        <Button type='button' onClick={handleModal} isError={isError} className={styles.button} autoFocus>Aceptar</Button>
      </dialog>
    </main>
  )
}

export default Dialog