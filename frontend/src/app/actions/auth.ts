import { SignupFormSchema, FormState } from '@/app/lib/definitions'

export async function signup(state: FormState, formData: FormData) {
    const url = "http://localhost:5000/auth/signup";
    console.log(url);

    const validatedFields = SignupFormSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
    });

    if (!validatedFields.success) {
        console.log("Ola")
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }



    if (!url) {
        return {
            message: 'An error occurred while creating your account.',
        }
    }


    const data = {
        "name": formData.get('name'),
        "email": formData.get('email'),
        "password": formData.get('password'),
    }

    const s = JSON.stringify(data);

    console.log(s)
    console.log(formData)


    let result = await fetch(url, {
        method: 'POST',
        body: s,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        },
        mode: "cors",
    })


    if (result.status !== 201) {
        return {
            message: 'An error occurred while creating your account.',
        }
    }
}
