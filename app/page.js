'use client'
import styles from "./page.module.css";

import Dialog from "@/components/Dialog";
import { postEntry } from "./actions";
import { useFormState } from 'react-dom'

const initialState = {
  error: null,
  isEntry: null
}

export default function Home() {
  const [state, formAction] = useFormState(postEntry, initialState)
  console.log(state)

  const handleDialogClose = () => {
    formAction({ error: null })
  }

  return (
    <form action={formAction} className={styles.main}>
      <h1>Registrar Entrada/Salida</h1>
      <Dialog title="Error" handleClose={handleDialogClose}>
        {state.error}
      </Dialog>
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
