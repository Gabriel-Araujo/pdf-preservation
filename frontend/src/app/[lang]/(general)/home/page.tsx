import {getDictionary} from "@/app/[lang]/dictionaries";
import {ArchiveTable, Breadcrumb, HomeMenuBar} from "@/components";


export default async function Page({params}: { params: Promise<{ lang: "en" | "br" }> }) {
    const {lang} = await params;
    const dict = await getDictionary(lang);

    const d = {
        upload: dict.global.upload,
        title: dict.metadata.title,
        description: dict.metadata.description,
        language: dict.metadata.language,
        rights: dict.metadata.rights,
    }

    return (
        <>
            <Breadcrumb />
            <HomeMenuBar dict={d} />
            <ArchiveTable />
        </>
    );
}