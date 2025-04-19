"use client"
import styles from "../../general.module.css"
import tableStyles from "@/components/table/table.module.css"
import {downloadFile, getMetadata} from "@/app/lib/endpoints/files";
import {useEffect, useMemo, useState} from "react";
import {Breadcrumb, BreadcrumbLink, FileMenuBar} from "@/components";

export default function Page({params}: {params: Promise<{id: string}>}) {
    const [blob, setBlob] = useState<Blob | null>(null);
    const [metadata, setMetadata] = useState<object | null>(null);
    const [uuid, setUUID] = useState<string | null>(null);
    const pdf_window = useMemo(() => blob ? window.URL.createObjectURL(blob) : undefined, [blob]);

    useEffect(() => {
        params.then(p => {
            downloadFile(p.id)
                .then(res => res?.blob())
                .then(b => setBlob(b ?? null));

            getMetadata(p.id)
                .then(res => setMetadata(res))

            setUUID(p.id)
        })
    }, [params])


    return (
        <div style={{display: "flex", flexDirection: "column", rowGap: ".5rem"}}>
            <Breadcrumb>
                <BreadcrumbLink href={""}>Detalhes</BreadcrumbLink>
            </Breadcrumb>

            <div style={{display: "flex", alignItems: "end", columnGap: ".5rem"}}>
                <div style={{overflow: 'auto', width: "100%", display: "flex", justifyContent: 'center', alignItems: 'start', flexDirection: "column"}}>
                    <h4>Metadata</h4>
                    <table className={tableStyles.table}>
                        <thead className={tableStyles.tableHeader}>
                        <tr className={tableStyles.tableRow}>
                            {metadata ? Object.entries(metadata).map(([key,]) => <th key={key} className={tableStyles.tableCell}>{key}</th>) : null}
                        </tr>
                        </thead>
                        <tbody className={tableStyles.tableBody}>
                        <tr className={tableStyles.tableRow}>
                            {metadata ? Object.entries(metadata).map(([, value]) => <td key={value} className={tableStyles.tableCell}>{value}</td>): null}
                        </tr>
                        </tbody>
                    </table>
                </div>

                {uuid ? <FileMenuBar uuid={uuid} /> : null}
            </div>

            <embed src={pdf_window} type={"application/pdf"} className={styles.embed}/>
        </div>
    );
}