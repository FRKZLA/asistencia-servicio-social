'use client'
import pageStyles from '@/app/page.module.css'
import Form from '@/components/Form/page';
import Input from '@/components/Input';

const AddAlumnosPage = () => {
  return (
    <div className={pageStyles.main}>
      <h1>Agregar asistencias</h1>
      <Form action="">
        <h2>Ingresa una fecha</h2>
        <Input
          type="date"
          min='2024-06-01'
          max='2024-06-30'
          title='Fecha'
        />
      </Form>
    </div>
  )

}

export default AddAlumnosPage;