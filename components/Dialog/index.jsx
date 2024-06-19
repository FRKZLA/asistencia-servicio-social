'use client'
import { useFormStatus } from 'react-dom'
import { useState } from 'react'


const Dialog = ({ title, children }) => {
  const { pending } = useFormStatus()
  const [open, setOpen] = useState(true)
  return (
    <dialog open={open}>
      <div>
        <h2>{title}</h2>
        <button type='button' onClick={() => setOpen(false)}>X</button>
      </div>
      {children}
    </dialog>
  )
}

export default Dialog