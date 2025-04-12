import {getDictionary} from "@/app/[lang]/dictionaries";
import styles from "@/app/[lang]/(entry)/entry.module.css";
import {SigninForm} from "@/components/forms";

export const metadata = {
    title: "Pdf Archive - Login",
    description: "Login page"
}

export default async function Page({params}: { params: Promise<{ lang: "en" | "br" }> }) {
    const {lang} = await params;
    const dict = await getDictionary(lang);

    return (<main className={styles.signupForm}>
        <h3 >{dict.entry.login}</h3>
        <SigninForm dict={dict} />
    </main>);
}