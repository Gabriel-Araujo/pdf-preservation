import {ReactNode} from "react";
import styles from "./entry.module.css"

export default function EntryLayout({children}: {children: ReactNode}) {
    return <div className={styles.main}>{children}</div>
}