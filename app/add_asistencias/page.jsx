'use client'
import pageStyles from '@/app/page.module.css'
import Form from '@/components/Form/page';
import Input from '@/components/Input';
import ListOfAlumnos from '@/components/ListOfAlumnos';
import { useState } from 'react';
import { useFormState } from 'react-dom'
import { postNewDay } from '@/app/actions';

import Button from '@/components/Button';

const initialState = {
  error: null,
  message: null
}

const AddAlumnosPage = () => {
  // const [state, formAction] = useFormState(postNewDay, initialState);
  return (
    <main className={pageStyles.main}>
      <h1>Agregar asistencias</h1>
      <Form action={postNewDay}>
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
    </main>
  )

}

export default AddAlumnosPage;