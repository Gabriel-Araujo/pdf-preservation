
import styles from "../entry.module.css"
import {getDictionary} from "@/app/[lang]/dictionaries";
import {SignupForm} from "@/components/signup/signup-form";

export const metadata = {
    title: "Pdf Archive - Sign Up",
    description: "Sign up page"
}

export default async function Page({params}: { params: Promise<{ lang: "en" | "br" }> }) {
    const {lang} = await params;
    const dict = await getDictionary(lang);
    return (
        <main className={styles.signupForm}>
            <SignupForm dict={dict} />
        </main>
    );
}