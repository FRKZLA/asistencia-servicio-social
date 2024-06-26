import pageStyles from '@/app/page.module.css'
import styles from './add.module.css'
import Button from '@/components/Button';

const AlumnoAddPage = () => {
  return (
    <main className={pageStyles.main}>
      <h1>Agregar Alumno</h1>
      <form action="" className={styles.form}>
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
            step='60000000000'
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
        <Button>
          Agregar
        </Button>
      </form>
    </main>
  );
}

export default AlumnoAddPage;