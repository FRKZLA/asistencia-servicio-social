'use client'
import styles from "./page.module.css";

import Dialog from "@/components/Dialog";
import { postEntry } from "./actions";

export default function Home() {

  return (
    <form action={postEntry} className={styles.main}>
      <h1>Registrar Entrada/Salida</h1>
      <Dialog title="Error">
        <p>La matrícula no existe</p>
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
