import {FormState, SigninFormSchema, SignupFormSchema} from '@/app/lib/definitions'
import {decodeJwt} from "jose";
import {setCookie} from "cookies-next";
import {redirect} from "next/navigation";
import {login, register} from "@/app/lib/endpoints/endpoints";

const EMAIL = "email"
const PASSWORD = "password"
const NAME = "name"
export async function signup(state: FormState, formData: FormData) {
    const [name, email, password] = [
        formData.get(NAME),
        formData.get(EMAIL),
        formData.get(PASSWORD)
    ];

    const validatedFields = SignupFormSchema.safeParse({
        name: name,
        email: email,
        password: password,
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    const result = await register(name, email, password);


    if (result.status !== 201) {
        alert("Something bad happened.")
        return {
            message: 'An error occurred while creating your account.',
        }
    }
}

export async function signin(state: FormState, formData: FormData) {
    const [email, password] = [
        formData.get(EMAIL),
        formData.get(PASSWORD)
    ];

    const validatedFields = SigninFormSchema.safeParse({
        email: email,
        password: password,
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    const result = await login(email?.toString(), password?.toString())

    if (result.status === 401) {
        return {
            message: "401"
        }
    }

    if (result.status !== 200) {
        alert("Something bad happened.")
        return {
            message: 'An error occurred while login to your account.',
        }
    }

    const token: string = (await result.json());
    const payload= decodeJwt(token);

    setCookie("token", token, { maxAge: payload.exp})

    redirect("/")
}
