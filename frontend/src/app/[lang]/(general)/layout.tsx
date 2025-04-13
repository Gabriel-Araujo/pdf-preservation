import {ReactNode} from "react";
import styles from "./general.module.css"


export default function GeneralLayout({children}: Readonly<{ children: ReactNode; }>) {
    return (
        <div className={styles.general}>
            <nav className={styles.nav}></nav>
            <main className={styles.main}>
                {children}
            </main>
        </div>);
}