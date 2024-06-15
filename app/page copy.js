import Image from "next/image";
import styles from "./page.module.css";

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { query, collection, getDocs } from "firebase/firestore";

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


async function getData() {
  const q = query(collection(db, "logAsistencia"));

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
  const data = await getData()
  return (
    <main className={styles.main}>
      {data.map(alumno => {
        return (
          <section key={alumno.id}>
            <span>{alumno.matricula}</span>
          </section>
        )
      })}
    </main>
  );
}
