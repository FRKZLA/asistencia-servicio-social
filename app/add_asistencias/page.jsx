'use client'
import pageStyles from '@/app/page.module.css'
import Form from '@/components/Form/page';
import Input from '@/components/Input';
import ListOfAlumnos from '@/components/ListOfAlumnos';
import { useEffect, useState } from 'react';
import { useFormState } from 'react-dom'
import { postNewDay } from '@/app/actions';

import Button from '@/components/Button';
import Dialog from '@/components/Dialog';

const initialState = {
  error: null,
  message: null
}

const AddAlumnosPage = () => {
  const [state, setState] = useState(initialState)
  const [stateForm, formAction] = useFormState(postNewDay, initialState);

  useEffect(() => {
    setState(stateForm)
  }, [stateForm])

  const handleClose = () => {
    setState(initialState)
  }

  return (
    <main className={pageStyles.main}>
      <h1>Agregar asistencias</h1>
      <Form action={formAction}>
        <h2>Ingresa una fecha</h2>
        <Input
          name="date"
          type="date"
          min='2024-06-01'
          max='2024-06-30'
          title='Fecha'
          required
        // onChange={(e) => setDay(e.target.value)}
        />
        <ListOfAlumnos lateral />
        <Button>Guardar</Button>
      </Form>
      {
        state.message && (
          <Dialog title={state.error ? 'Error' : 'Mensaje'} handleClose={handleClose}>
            {state.message}
          </Dialog>
        )
      }
    </main>
  )

}

export default AddAlumnosPage;