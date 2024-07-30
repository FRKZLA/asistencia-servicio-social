'use client'
import { useRef, useState, useEffect } from 'react';
import pageStyles from '@/app/page.module.css'
import Button from '@/components/Button';
import Input from '@/components/Input';
import styles from './panel.module.css'
import { utils, writeFileXLSX } from "xlsx";
import { getAsistencias, getUsuario, getUsuarios } from '../actions';
import parseAsistenciaByMonth from '@/helpers/parseAsistenciasByMonth';
import useAlumno from '@/hook/useAlumno';

const PanelPage = () => {
  const [tabla, setTabla] = useState({})
  useEffect(() => {
    parseAsistenciaByMonth(6).then(data => {
      console.log(Object.values(data))
      setTabla(data)
    })
  }, [])

  const tableRef = useRef(null);
  const handleExport = () => {
    const wb = utils.table_to_book(tableRef.current);
    // write to XLSX
    writeFileXLSX(wb, "Reporte.xlsx");
  }

  return (
    <main className={pageStyles.main}>
      <h1>Panel</h1>
      <section>
        Junio
      </section>
      <table ref={tableRef}>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Asistencias</th>
          </tr>
        </thead>
        <tbody>
          {
            Object.values(tabla).map((alumno, index) => (
              <tr key={index}>
                <td>{alumno.nombre}</td>
                <td>{alumno.asistencias}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
      <Button onClick={handleExport} className={styles.btn_excel}>Exportar a Excel</Button>
    </main>
  )

}

export default PanelPage;