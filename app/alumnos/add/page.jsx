'use client'
import { useFormState } from 'react-dom';
import pageStyles from '@/app/page.module.css'
import styles from './add.module.css'
import Button from '@/components/Button';
import Dialog from '@/components/Dialog';

import { postAlumno } from '@/app/actions';
import Link from 'next/link';
import BackButton from '@/components/BackButton';

const initialState = {
  error: null,
  message: null
}

const AlumnoAddPage = () => {
  const [state, formAction] = useFormState(postAlumno, initialState);
  console.log(state)

  const handleDialogClose = () => {
    const newForm = new FormData()

    newForm.set('close', true)
    formAction(newForm)
  }

  return (
    <main className={pageStyles.main}>
      <BackButton href='/alumnos' title='Agregar Alumno' />
      <form action={formAction} className={styles.form}>
        <h3>Nuevo Alumno</h3>
        <section className={styles.input_container}>
          <input
            type="text"
            id="nombre"
            name="nombre"
            required
            className={styles.input}
          />
          <label htmlFor="nombre" className={styles.label}>Nombre:</label>
        </section>
        <section className={styles.input_container}>
          <input
            type="number"
            id='matricula'
            name='matricula'
            required
            className={styles.input}
          />
          <label htmlFor="matricula" className={styles.label}>Matrícula:</label>
        </section>
        <section className={styles.input_container}>
          <input
            type="time"
            id='hora_entrada'
            name='hora_entrada'
            min='07:00'
            max='21:00'
            required
            className={styles.input}
          />
          <label htmlFor="hora_entrada" className={styles.label}>Hora de Entrada:</label>
        </section>
        <section className={styles.input_container}>
          <input
            type="time"
            id='hora_salida'
            name='hora_salida'
            min='07:00'
            max='21:00'
            required
            className={styles.input}
          />
          <label htmlFor="matricula" className={styles.label}>Hora de Salida:</label>
        </section>
        <section className={styles.input_container}>
          <select
            id="ciclo"
            name="ciclo"
            required
            className={styles.input}
          >
            <option value="EJ-2025">EJ-2025</option>
          </select>
          <label htmlFor="ciclo" className={styles.label}>Ciclo:</label>
        </section>
        <Button>
          Agregar
        </Button>
      </form>
      {
        state.message && (
          <Dialog title={state.error ? 'Error' : 'Mensaje'} handleClose={handleDialogClose}>
            {state.message}
          </Dialog>
        )
      }
    </main>
  );
}

export default AlumnoAddPage;