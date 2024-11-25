'use client'
import { useFormState } from 'react-dom'
import { useEffect, useState } from 'react';
import pageStyles from '@/app/page.module.css'
import Button from '@/components/Button';
import Input from '@/components/Input';
import styles from './panel.module.css'

import { getToken } from '../actions';
import Dialog from '@/components/Dialog';

const initialState = {
  error: null,
  message: null
}

const PanelPage = () => {
  const [state, setState] = useState(initialState)
  const [stateForm, formAction] = useFormState(getToken, initialState);

  useEffect(() => {
    setState(stateForm)
    if (stateForm.isLogged) {
      window.sessionStorage.setItem('_20459173190857', true)
    }
  }, [stateForm])

  const handleClose = () => {
    setState(initialState)
  }

  return (
    <main className={pageStyles.main}>
      <h1>Panel de Administración</h1>
      <form action={formAction} className={styles.form}>
        <Input
          id='pass'
          name='pass'
          title='Contraseña'
          required
        />
        <Button type='submit'>Guardar</Button>
      </form>
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

export default PanelPage;