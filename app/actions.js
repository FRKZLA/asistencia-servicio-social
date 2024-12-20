'use server'
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { query, collection, getDocs, doc, getDoc, setDoc } from "firebase/firestore";
import { redirect } from "next/navigation";

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

  try {
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
      await setDoc(entryRef, { entrada: hora }, { merge: true });
    } else {
      await setDoc(entryRef, { salida: hora }, { merge: true });
    }

    return {
      error: false,
      isEntry: isEntry,
      message: isEntry ? `Entrada registrada a las ${hora}` : `Salida registrada a las ${hora}`
    }
  } catch (e) {
    console.error(e)
    return {
      error: true,
      message: 'Error al registrar la entrada/salida. Por favor, intenta de nuevo.'
    }
  }
}

export async function postAlumno(prevState, formData) {
  if (formData.get('close')) {
    if (prevState.error) {
      return {
        error: null,
        message: null
      }
    } else {
      redirect('/alumnos')
    }
  }


  const matricula = formData.get('matricula')
  const nombre = formData.get('nombre')
  const hora_entrada = formData.get('hora_entrada')
  const hora_salida = formData.get('hora_salida')
  const ciclo = formData.get('ciclo')

  // Check if the matricula already exists
  const docSnap = await getDoc(doc(db, "usuarios", matricula));
  if (docSnap.exists()) {
    return {
      error: true,
      message: `La matrícula ${matricula} ya existe`
    }
  }

  const docRef = doc(db, "usuarios", matricula);
  await setDoc(docRef, {
    nombre,
    hora_entrada,
    hora_salida,
    ciclo
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
    if (datos.ciclo === 'EJ2025') {
      data.push({
        id: doc.id,
        ...datos
      })
    }
  });
  return data
}

export async function getUsuario(id) {
  const docRef = doc(db, "usuarios", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return {
      id: docSnap.id,
      ...docSnap.data()
    }
  } else {
    return {
      error: true,
      message: `El usuario con matrícula ${id} no existe`
    }
  }
}

export async function getAsistencias(id) {
  // query with order
  const q = query(collection(db, "usuarios", id, "asistencia"));

  const querySnapshot = await getDocs(q);
  let data = {}
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    const datos = doc.data()
    // agrupar por mes
    const mes = doc.id.split('-')[1]
    if (!data[mes]) {
      data[mes] = []
    }

    data[mes].push({
      id: doc.id,
      ...datos
    })
  });
  return data
}

export async function getToken(prevState, formData) {
  const pass = formData.get('pass')

  if (pass !== 'country-monopoly-handclasp') {
    return {
      error: true,
      message: 'Contraseña incorrecta',
      isLogged: false
    }
  }

  return {
    isLogged: true
  }
}

export async function getReporteAlumnos() {
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

export async function getDiasFestivos() {
  const q = query(collection(db, "dias_festivos"));

  const querySnapshot = await getDocs(q);
  let data = {}
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    const datos = doc.data()
    if (datos.ciclo === 'EJ2025') {
      data[datos.date] = datos
    }

  });
  console.log(data)
  return data
}

export async function postNewDay(prevState, formData) {
  const date = formData.get('date')
  try {
    // formdata to array
    const entries = Array.from(formData.entries())
    const asistencias = entries
      .filter(([key, value]) => key !== 'date')
      .filter(([_, value]) => value !== '')
      .filter(([key, _]) => key.split('-')[0] === 'entrada' || key.split('-')[0] === 'salida')

    for (let i = 0; i < asistencias.length; i++) {
      const [key, value] = asistencias[i]
      console.log(key, value)
      const matricula = key.split('-')[1]
      const isEntrada = key.split('-')[0] === 'entrada'

      const kind = isEntrada ? 'entrada' : 'salida'

      const docRef = doc(db, "usuarios", matricula, "asistencia", date);
      await setDoc(docRef, { [kind]: value }, { merge: true });
    }
  } catch (e) {
    console.error(e)
    return {
      error: true,
      message: 'Error al registrar las asistencias. Por favor, intenta de nuevo.'
    }
  }

  return {
    error: false,
    message: `Asistencias del día ${date} registradas correctamente`
  }
}
