"use client"

import {signup} from "@/app/actions/auth";
import styles from "../../components.module.css"
import { useActionState, MouseEvent} from "react";
import {Button, Input} from "@/components";
import {redirect} from "next/navigation";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export function SignupForm({dict} ) {
    const [state, action] = useActionState(signup, undefined);

    async function handleCancel(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        redirect("login")
    }
    return (
        <form action={action} className={styles.signup_form}>

            <div>
                <label htmlFor="name">{dict.global.name}</label>
                <Input name={"name"} placeholder={dict.global.name} type="text" />
                {state?.errors?.name && <p>{state.errors.name}</p>}
            </div>
            <div>
                <label htmlFor="email">Email</label>
                <Input name="email" id={styles.email_input} placeholder={dict.global.email} type="text"/>
                {state?.errors?.email && <p>{state.errors.email}</p>}
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <Input name="password" id={styles.password_input} placeholder={dict.global.password} type="password"/>
                {state?.errors?.password && (
                    <div>
                        <p>Password must:</p>
                        <ul>
                            {state.errors.password.map((error) => (
                                <li key={error}>- {error}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
            <div style={{flexDirection: "row", alignItems: "end"}}>
                <Button type={"button"} id={styles.danger} onClick={handleCancel}>{dict.global.cancel}</Button>
                <Button type={"submit"} id={styles.success}>{dict.entry.signup}</Button>
            </div>
        </form>
    );
}