'use client'
import { useRef } from 'react';
import pageStyles from '@/app/page.module.css'
import Button from '@/components/Button';
import Input from '@/components/Input';
import styles from './panel.module.css'
import { utils, writeFileXLSX } from "xlsx";

const PanelPage = () => {
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
      <section>
        Julio
      </section>
      <table ref={tableRef}>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Asistencias</th>
            <th>Retrasos</th>
            <th>Faltas</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Alumno 1</td>
            <td>Apellido 1</td>
            <td>10</td>
            <td>2</td>
            <td>0</td>
            <td>
              <Button>Editar</Button>
              <Button>Eliminar</Button>
            </td>
          </tr>
          <tr>
            <td>Alumno 2</td>
            <td>Apellido 2</td>
            <td>10</td>
            <td>2</td>
            <td>0</td>
            <td>
              <Button>Editar</Button>
              <Button>Eliminar</Button>
            </td>
          </tr>
        </tbody>
      </table>
      <Button onClick={handleExport} className={styles.btn_excel}>Exportar a Excel</Button>
    </main>
  )

}

export default PanelPage;