import {getDictionary} from "@/app/[lang]/dictionaries";
import {Breadcrumb} from "@/components";

export default async function Page({params}: { params: Promise<{ lang: "en" | "br" }> }) {
    const {lang} = await params;
    const dict = await getDictionary(lang);

    return (
        <>
            <Breadcrumb />
            <div>{dict.global.user}</div>
        </>
    );
}