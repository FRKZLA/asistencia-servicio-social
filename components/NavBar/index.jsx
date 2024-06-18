'use client'

import Link from "next/link"
import styles from './navbar.module.css'
import { usePathname } from 'next/navigation'

const NavBar = () => {
    const pathname = usePathname()

    return (
        <main className={styles.container}>
            <Link href="/" className={styles.item + ` ${pathname === '/' ? styles.active : ''}`}>
                Entrada y Salida
            </Link>
            <Link href="/alumnos" className={styles.item + ` ${pathname === '/alumnos' ? styles.active : ''}`}>
                Lista de Alumnos
            </Link>
        </main>
    )

}

export default NavBar