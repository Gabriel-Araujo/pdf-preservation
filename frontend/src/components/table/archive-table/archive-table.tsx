"use client"
import {createColumnHelper, flexRender, getCoreRowModel, useReactTable} from "@tanstack/react-table";
import {downloadFile, getFiles} from "@/app/lib/endpoints/files";
import {useEffect, useState} from "react";
import styles from "../table.module.css"

type ArchiveFile = {
    uuid: string;
    stored_date: string;
    size: number;
    name: string;
}

const columnHelper = createColumnHelper<ArchiveFile>()

const columns = [
    columnHelper.accessor("uuid", {
        cell: info => info.getValue(),
        header: () => <span>Id</span>
    }),
    columnHelper.accessor("name", {
        cell: info => info.getValue(),
        header: () => <span>Nome</span>,
    }),
    columnHelper.accessor("stored_date", {
        cell: info => {
            const date = new Date(info.getValue());
            return <span>{date.toLocaleString()}</span>
        },
        header: () => <span>Data</span>
    }),
    {
        id: "actions",
        cell: ({ row }) => {const download = row.original
            return (
                <div style={{display: "inline-flex", columnGap: "1rem"}}>
                    <button className={styles.actionButton} onClick={() => downloadFile(download.uuid)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" style={{cursor: "pointer"}}
                             className="bi bi-cloud-arrow-down" viewBox="0 0 16 16">
                            <path fillRule="evenodd"
                                  d="M7.646 10.854a.5.5 0 0 0 .708 0l2-2a.5.5 0 0 0-.708-.708L8.5 9.293V5.5a.5.5 0 0 0-1 0v3.793L6.354 8.146a.5.5 0 1 0-.708.708z"/>
                            <path
                                d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383m.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z"/>
                        </svg>
                    </button>
                    <button className={styles.actionButton}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                             className="bi bi-eyeglasses" viewBox="0 0 16 16" style={{cursor: "pointer"}}>
                            <path
                                d="M4 6a2 2 0 1 1 0 4 2 2 0 0 1 0-4m2.625.547a3 3 0 0 0-5.584.953H.5a.5.5 0 0 0 0 1h.541A3 3 0 0 0 7 8a1 1 0 0 1 2 0 3 3 0 0 0 5.959.5h.541a.5.5 0 0 0 0-1h-.541a3 3 0 0 0-5.584-.953A2 2 0 0 0 8 6c-.532 0-1.016.208-1.375.547M14 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0"/>
                        </svg>
                    </button>
                </div>
            );
        }
    }
]

function ArchiveTable() {
    const [data, setData] = useState<ArchiveFile[]>([]);
    // const [pagination, setPagination] = useState({})
    useEffect(() => {
        getFiles()
            .then(res => res?.json())
            .then(data => {
                setData(data.objects)
                // setPagination(data.page)
            })
    }, [])

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div style={{overflow: 'auto', height: '100vh', width: "100%", display: "flex", justifyContent: 'center', alignItems: 'start'}}>
            <table className={styles.table}>
                <thead className={styles.tableHeader}>
                {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id} className={styles.tableRow}>
                        {headerGroup.headers.map(header => (
                            <th key={header.id} className={styles.tableCell}>
                                {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                            </th>
                        ))}
                    </tr>
                ))}
                </thead>
                <tbody className={styles.tableBody}>
                {table.getRowModel().rows.map(row => (
                    <tr key={row.id} className={styles.tableRow}>
                        {row.getVisibleCells().map(cell => (
                            <td key={cell.id} className={styles.tableCell}>
                                <span>{flexRender(cell.column.columnDef.cell, cell.getContext())}</span>
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export {ArchiveTable};