"use client"

import {signup} from "@/app/actions/auth";
import styles from "./signup.module.css"
import {useActionState} from "react";


export function SignupForm({dict} :{dict: any}) {
    const [state, action, pending] = useActionState(signup, undefined);

    return (
        <form action={action}>
            <div>
                <h3>{dict.entry.signup}</h3>
            </div>
            <div>
                <label htmlFor="name">Name</label>
                <input name="name" id={styles.name_input} placeholder={dict.global.name} type="text"/>
            </div>
            {state?.errors?.name && <p>{state.errors.name}</p>}
            <div>
                <label htmlFor="email">Email</label>
                <input name="email" id={styles.email_input} placeholder={dict.global.email} type="text"/>
            </div>
            {state?.errors?.email && <p>{state.errors.email}</p>}
            <div>
                <label htmlFor="password">Password</label>
                <input name="password" id={styles.password_input} placeholder={dict.global.password} type="password"/>
            </div>
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
            <div>
                <button>{dict.global.cancel}</button>
                <button type={"submit"}>{dict.entry.signup}</button>
            </div>
        </form>
    );
}