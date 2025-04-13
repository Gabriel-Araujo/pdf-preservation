import {Breadcrumb, BreadcrumbLink} from "@/components";
import {get_profile} from "@/app/lib/endpoints/user";
import {getDictionary} from "@/app/[lang]/dictionaries";
import {redirect} from "next/navigation";

export default async function Page({params}: { params: Promise<{ lang: "en" | "br" }> }) {
    const {lang} = await params;
    const dict = await getDictionary(lang);
    const profile = await get_profile();

    if (!profile) {
        redirect("/login");
    }

    return (
        <>
            <Breadcrumb>
                <BreadcrumbLink href={`/${lang}`}>{dict.global.profile}</BreadcrumbLink>
            </Breadcrumb>
            <div style={{ display: "flex", flexDirection: "column", rowGap: ".5rem" }}>
                <div>
                    <span>{dict.global.name}: </span>
                    <span>{profile.name}</span>
                </div>
                <div>
                    <span>{dict.global.email}: </span>
                    <span>{profile.email}</span>
                </div>
                <div>
                    <span>{dict.global.type}: </span>
                    <span>{profile.type === "Admin" ? dict.global.admin : dict.global.user}</span>
                </div>
            </div>
        </>
    );
}