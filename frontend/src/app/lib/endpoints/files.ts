import {base_url, headers} from "@/app/lib/endpoints/endpoints";
import {getCookie} from "cookies-next";

export const upload = async (metadata: string, file: File) => {
    //const token = (await cookies()).get("token")?.value;
    const token = getCookie("token");
    console.log(token);
    if (!token) {
        return null;
    }
    const formData = new FormData();
    formData.append("file", file);

    return await fetch(base_url + "/files/upload", {
        method: "POST",
        headers: {
            "metadata": metadata,
            "authorization": `Bearer ${token}`,
        },
        body: formData
    })
}

export const getFiles = async () => {
    const token = getCookie("token");
    console.log(token);

    if (!token) {return null;}

    return fetch(base_url + "/files", {
        method: "GET",
        headers: {...headers, "authorization": `Bearer ${token}`,}
    });
}

export const downloadFile = async (uuid: string) => {
    const token = getCookie("token");
    if (!token) {return null;}

    return await fetch(base_url + `/files/${uuid}`, {
        method: "GET",
        headers: {...headers, "authorization": `Bearer ${token}`}
    })
}

export const getMetadata = async (uuid: string) => {
    const token = getCookie("token");
    if (!token) {return null;}

    return await fetch(base_url + `/files/${uuid}/metadata`, {
        method: "GET",
        headers: {...headers, "authorization": `Bearer ${token}`}
    }).then(res => res.json())
}