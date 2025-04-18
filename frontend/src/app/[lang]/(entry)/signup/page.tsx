import styles from "../entry.module.css"
import {getDictionary} from "@/app/[lang]/dictionaries";
import {SignupForm} from "@/components/forms";

export const metadata = {
    title: "Pdf Archive - Sign Up",
    description: "Sign up page"
}

export default async function Page({params}: { params: Promise<{ lang: "en" | "br" }> }) {
    const {lang} = await params;
    const dict = await getDictionary(lang);
    return (
        <main className={styles.signupForm}>
            <h3 >{dict.entry.signup}</h3>
            <SignupForm dict={dict} />
        </main>
    );
}