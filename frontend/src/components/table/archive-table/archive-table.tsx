"use client"
import {createColumnHelper, flexRender, getCoreRowModel, useReactTable} from "@tanstack/react-table";
import {getFiles} from "@/app/lib/endpoints/files";
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
        cell: info => info.getValue(),
        header: () => <span>Data</span>
    })
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
    );
}

export {ArchiveTable};