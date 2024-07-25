"use client";
import styles from "./page.module.css";

import Dialog from "@/components/Dialog";
import { postEntry } from "./actions";
import { useFormState, useFormStatus } from "react-dom";
import { useState } from "react";
import QRScanner from "@/components/QRScanner";

const initialState = {
  error: null,
  message: null,
  isEntry: null,
};

export default function Home() {
  const [state, formAction] = useFormState(postEntry, initialState);
  const { pending } = useFormStatus();
  const [resetKey, setResetKey] = useState(0);

  const handleDialogClose = () => {
    const newForm = new FormData();
    newForm.set("close", true);
    formAction(newForm);
  };

  const handleScanSuccess = async (decodedText, decodedResult) => {
    const newForm = new FormData();
    newForm.set("matricula", decodedText);
    formAction(newForm);

    // Reiniciar el escáner después de 5 segundos
    setTimeout(() => {
      setResetKey((prevKey) => prevKey + 1);
    }, 5000);
  };

  const handleScanError = (error) => {
    console.error("Error al escanear el código QR: ", error);
  };

  return (
    <form action={formAction} className={styles.main}>
      <h1>Registrar Entrada/Salida</h1>
      {state.message && (
        <Dialog
          title={state.error ? "Error" : "Mensaje"}
          handleClose={handleDialogClose}
        >
          {state.message}
        </Dialog>
      )}
      <QRScanner
        key={resetKey}
        onScanSuccess={handleScanSuccess}
        onScanError={handleScanError}
      />
    </form>
  );
}
