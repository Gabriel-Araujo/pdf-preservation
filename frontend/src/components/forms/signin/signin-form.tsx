"use client"

import {MouseEvent, useActionState} from "react";

import {signin} from "@/app/actions/auth";
import {redirect} from "next/navigation";

import styles from "../../components.module.css"
import {Button, Input} from "@/components";


// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export function SigninForm({dict}) {
    const [state, action, isPending] = useActionState(signin, undefined);

    async function handleCancel(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        redirect("login")
    }


    return (
        <form action={action} className={styles.signup_form}>
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
                            {state.errors.password?.map((error) => (
                                <li key={error}>- {error}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
            <div style={{flexDirection: "row", alignItems: "end"}}>
                <Button disabled={isPending} type={"button"} variant={"danger"} onClick={handleCancel}>{dict.global.cancel}</Button>
                <Button disabled={isPending} type={"submit"} variant={"success"}>{dict.entry.login}</Button>
            </div>
        </form>
    );

}