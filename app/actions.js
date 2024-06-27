'use server'
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

export async function postEntry(prevState, formData) {
  if (formData.get('close')) {
    return {
      error: null,
      message: null,
      isEntry: null
    }
  }

  // El offset es para convertir utc a local
  const OFFSET = 6 * 60 * 60 * 1000
  const fecha = new Date(new Date - OFFSET)
  const hora = fecha.toUTCString().split(' ')[4].split('').slice(0, 5).join('')
  const matricula = formData.get('matricula')
  console.log({ matricula, hora })

  const fecha_string = `${fecha.getFullYear()}-${fecha.getMonth() + 1}-${fecha.getDate()}`
  console.log(fecha_string)

  const entradaHoy = doc(db, "usuarios", matricula)

  const docSnap = await getDoc(entradaHoy);

  if (!docSnap.exists()) {
    // TODO: Hacer un alert que diga que la matricula es incorrecta
    return {
      error: true,
      message: "La matrícula no existe"
    }
  }

  const querySnapshot = await getDocs(collection(db, "usuarios", matricula, "asistencia"));

  let isEntry = true
  querySnapshot.forEach(dia => {
    if (dia.id === fecha_string) {
      isEntry = false
    }
  })

  console.log({ isEntry })

  const entryRef = doc(db, "usuarios", matricula, "asistencia", fecha_string);
  if (isEntry) {
    setDoc(entryRef, { entrada: hora }, { merge: true });
  } else {
    setDoc(entryRef, { salida: hora }, { merge: true });
  }

  return {
    error: false,
    isEntry: isEntry,
    message: isEntry ? `Entrada registrada a las ${hora}` : `Salida registrada a las ${hora}`
  }
}

export async function postAlumno(prevState, formData) {
  const matricula = formData.get('matricula')
  const nombre = formData.get('nombre')
  const hora_entrada = formData.get('hora_entrada')
  const hora_salida = formData.get('hora_salida')

  const docRef = doc(db, "usuarios", matricula);
  await setDoc(docRef, {
    nombre,
    hora_entrada,
    hora_salida
  });

  return {
    error: false,
    message: `Alumno registrado correctamente`
  }
}

export async function getUsuarios() {
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

