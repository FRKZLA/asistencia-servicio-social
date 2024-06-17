import Image from "next/image";
import styles from "./page.module.css";

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { query, collection, getDocs, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBcai_tSl5H56O3MMD1MSgm67XQHSoRLUw",
  authDomain: "servicioasistencia-6262b.firebaseapp.com",
  projectId: "servicioasistencia-6262b",
  storageBucket: "servicioasistencia-6262b.appspot.com",
  messagingSenderId: "1095776365906",
  appId: "1:1095776365906:web:fb21ad604ba489182b5e8b",
  measurementId: "G-YHG78HVDRR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);


async function getUsuarios() {
  const q = query(collection(db, "usuarios"));

  const querySnapshot = await getDocs(q);
  let data = []
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    const datos = doc.data()
    data.push({
      id: doc.id,
      ...datos
    })
  });
  return data
}


export default async function Home() {
   async function postEntry(formData) {
    'use server'

    const hora = new Date().toTimeString().split('').slice(0, 5).join('')
    const matricula = formData.get('matricula')
    console.log({matricula, hora})

    const fecha = new Date()
    const fecha_string = `${fecha.getFullYear()}-${fecha.getMonth() + 1}-${fecha.getDate()}`
    console.log(fecha_string)

    const entradaHoy = doc(db, "usuarios", matricula)

    const docSnap = await getDoc(entradaHoy);

    if (!docSnap.exists()) {
      // TODO: Hacer un alert que diga que la matricula es incorrecta
      return null
    }
    
    const querySnapshot = await getDocs(collection(db, "usuarios", matricula, "asistencia"));

    let isEntry = true 
    querySnapshot.forEach(dia => {
      if (dia.id === fecha_string) {
        isEntry = false
      }
    })

    console.log({isEntry})

    const entryRef = doc(db, "usuarios", matricula, "asistencia", fecha_string);
    console.log(entryRef)
    if (isEntry) {
      setDoc(entryRef, { entrada: hora }, { merge: true });
    } else {
      setDoc(entryRef, { salida : hora }, { merge: true });
    }


  }
  return (
    <form action={postEntry} className={styles.main}>
      <h1>Registrar Entrada/Salida</h1>
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
