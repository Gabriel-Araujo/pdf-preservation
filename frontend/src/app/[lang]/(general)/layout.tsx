import {ReactNode} from "react";
import styles from "./general.module.css"
import {NavItem, NavMenu} from "@/components";
import {getDictionary} from "@/app/[lang]/dictionaries";

const house =
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
         className="bi bi-house-door-fill" viewBox="0 0 16 16">
        <path
            d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5"/>
    </svg>

const profile =
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
         className="bi bi-person-lines-fill" viewBox="0 0 16 16">
        <path
            d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5m.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1z"/>
    </svg>

export default async function GeneralLayout({children, params}: Readonly<{ children: ReactNode, params: Promise<{lang: "en" | "br"}> }>) {
    const {lang} = await params;
    const dict = await getDictionary(lang);

    return (
        <div className={styles.general}>
            <NavMenu>
                <NavItem href={"/home"}>{house} {dict.global.home}</NavItem>
                <NavItem href={"/profile"}>{profile} {dict.global.profile}</NavItem>
            </NavMenu>
            <main className={styles.main}>
                {children}
            </main>
        </div>);
}