import {User} from "@/app/[lang]/(general)/_entities/user";
import {cookies} from "next/headers";
import {base_url} from "./endpoints";

export const get_profile = async (): Promise<User| null> => {
    console.log("kkk=", base_url);

    if (!base_url) {
        throw new Error("Missing url.");
    }

    const token = (await cookies()).get("token")?.value;

    if (!token) {
        return null;
    }
    return (await fetch(base_url + "/users", {
        method: "GET",
        headers: {Authorization: `Bearer ${token}`},
    })).json();
}