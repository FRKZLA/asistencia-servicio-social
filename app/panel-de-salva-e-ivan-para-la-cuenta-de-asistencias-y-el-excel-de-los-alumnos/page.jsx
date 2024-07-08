import pageStyles from '@/app/page.module.css'
import Button from '@/components/Button';
import Input from '@/components/Input';
import styles from './panel.module.css'

const PanelPage = () => {
  return (
    <main className={pageStyles.main}>
      <h1>Panel de Administración</h1>
      <form action="" className={styles.form}>
        <Input
          id='pass'
          name='pass'
          title='Contraseña'
          required
        />
        <Button type='submit'>Guardar</Button>
      </form>
    </main>
  )

}

export default PanelPage;