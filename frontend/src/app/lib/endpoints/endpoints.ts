const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
}

export const base_url = process.env.BACKEND_HOST === "" ? "http://localhost:5000": process.env.ROOT_HOST;

export const login = async (email?: string, password?: string) => {

    if (!base_url) {
        throw new Error("Missing url.");
    }

    return fetch(base_url + `/auth/login`, {
        method: "POST",
        mode: 'cors',
        body: JSON.stringify({"email": email, "password": password}),
        headers: {...headers}
    })
}

export const register = async (name?: File | string | null, email?: File | string | null, password?: File | string | null) => {
    if (!base_url) {
        throw new Error("Missing url.");
    }

    return fetch(base_url + "/auth/signup", {
        method: 'POST',
        mode: "cors",
        body: JSON.stringify({
            "name": name,
            "email": email,
            "password": password
        }),
        headers: {...headers},
    })
}