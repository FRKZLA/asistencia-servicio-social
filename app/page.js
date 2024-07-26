'use client'
import styles from "./page.module.css";

import Dialog from "@/components/Dialog";
import { postEntry } from "./actions";
import { useFormState, useFormStatus } from 'react-dom'
import Button from "@/components/Button";

const initialState = {
  error: null,
  message: null,
  isEntry: null
}

export default function Home() {
  const [state, formAction] = useFormState(postEntry, initialState)
  const { pending } = useFormStatus()

  console.log(pending)

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
          <Dialog title={state.error ? 'Error' : 'Mensaje'} handleClose={handleDialogClose} isError={state.error}>
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
      <Button>
        Enviar
      </Button>
    </form>
  );
}
