import {base_url} from "@/app/lib/endpoints/endpoints";
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