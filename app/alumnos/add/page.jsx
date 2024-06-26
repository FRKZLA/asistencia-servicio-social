import pageStyles from '@/app/page.module.css'
import styles from './add.module.css'
import Button from '@/components/Button';

const AlumnoAddPage = () => {
  return (
    <main className={pageStyles.main}>
      <h1>Agregar Alumno</h1>
      <form action="" className={styles.form}>
        <h2>Nuevo Alumno</h2>
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
        <Button>
          Agregar
        </Button>
      </form>
    </main>
  );
}

export default AlumnoAddPage;