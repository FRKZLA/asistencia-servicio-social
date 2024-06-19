'use client'
import { useState } from 'react'


const Dialog = ({ title, children }) => {
  const [open, setOpen] = useState(true)

  if (!children) return null

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