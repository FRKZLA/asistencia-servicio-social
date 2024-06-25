'use client'
import styles from "./page.module.css";

import Dialog from "@/components/Dialog";
import { postEntry } from "./actions";
import { useFormState } from 'react-dom'

const initialState = {
  error: null,
  message: null,
  isEntry: null
}

export default function Home() {
  const [state, formAction] = useFormState(postEntry, initialState)

  const handleDialogClose = () => {
    const newForm = new FormData()

    newForm.set('close', true)
    formAction(newForm)
  }

  return (
    <form action={formAction} className={styles.main}>
      <h1>Registrar Entrada/Salida</h1>
      {
        state.message && (
          <Dialog title={state.error ? 'Error' : 'Mensaje'} handleClose={handleDialogClose}>
            {state.message}
          </Dialog>
        )
      }
      <input
        type="number"
        name="matricula"
        placeholder="Ingresa Matrícula"
        className={styles.input}
        required
      />
      <button
        className={styles.button}>
        Enviar
      </button>
    </form>
  );
}
