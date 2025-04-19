import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import * as process from 'node:process';
import Location from './entities/location';
import { readFileSync } from 'node:fs';
import { ArchiveFile } from './entities/file';
import { Page } from './entities/page';

@Injectable()
export class ArchivematicaService {
    dashboard = process.env.DASHBOARD_URL ?? 'http://localhost:62080';
    storage = process.env.STORAGE_URL ?? 'http://localhost:62081';

    fixed_header = {
        authorization: `ApiKey ${process.env.ARCHIVE__USER}:${process.env.ARCHIVE__KEY}`,
    };
    constructor(private readonly httpService: HttpService) {}

    async test() {
        console.log(this.fixed_header);
        let config = readFileSync('ProcessingMCP.xml');
        console.log(config);

        return (
            await this.httpService.axiosRef.get(
                `${this.dashboard}/api/transfer/completed/`,
                {
                    headers: { ...this.fixed_header },
                },
            )
        ).data;
    }

    async get_default_ts(): Promise<Location | null> {
        let response = (
            await this.httpService.axiosRef.get(
                `${this.storage}/api/v2/location/?purpose=TS`,
                {
                    headers: { ...this.fixed_header },
                },
            )
        ).data;

        return response?.objects?.[0];
    }

    async init_automated_transfer(name: string, encoded_path: string) {
        return (
            await this.httpService.axiosRef.post(
                `${this.dashboard}/api/v2beta/package/`,
                {
                    name: name,
                    path: encoded_path,
                    // processing_config: 'automated',
                    auto_approve: true,
                },
                { headers: { ...this.fixed_header } },
            )
        ).data;
    }

    async get_archive_files_list(
        queries?: readonly string[],
    ): Promise<{ meta: Page; objects: ArchiveFile[] }> {
        let _queries = 'package_type=AIP';
        if (queries) {
            queries.forEach((query) => (_queries += '&' + query));
        }
        return (
            await this.httpService.axiosRef.get(
                `${this.storage}/api/v2/file/?${_queries}`,
                {
                    headers: { ...this.fixed_header },
                },
            )
        ).data;
    }

    async get_file(uuid: string): Promise<ArchiveFile | null> {
        let archive = await this.httpService.axiosRef.get(
            `${this.storage}/api/v2/file/${uuid}/`,
            {
                headers: { ...this.fixed_header },
            },
        );
        if (archive.status !== 200) {
            return null;
        }
        return archive.data;
    }

    async get_metadata(uuid: string) {
        let archive_file = await this.get_file(uuid);

        if (!archive_file) {
            return null;
        }

        const current_path = archive_file.current_path.split('/');
        const zip_name = current_path.at(-1)?.split('.')[0];
        const file_name = zip_name?.split('-')[0];
        const aip_uuid = zip_name?.split(file_name + '-')[1];

        if (!aip_uuid) {
            return null;
        }

        let t: string[] = await this.httpService.axiosRef
            .get(
                `${this.storage}/api/v2/file/${uuid}/extract_file/?relative_path_to_file=${zip_name}/data/METS.${aip_uuid}.xml`,
                {
                    headers: {
                        ...this.fixed_header,
                        responseType: 'blob',
                    },
                },
            )
            .then((res) => res.data)
            .then(data => data.split("\n"))
            .then(data => data.map((i: string) => i.trim()));

        const start_index = t.findIndex(i => i.includes("<dcterms:dublincore"))
        const end_index = t.findIndex(i => i.includes("</dcterms:dublincore"))
        const filename = get_original_filename(t)
        t = t.slice(start_index+1, end_index);

        return  [["filename", filename], ...t.map(i => treat_mets_metadata(i))]
    }

    async download_file(uuid: string) {
        let archive_file = await this.get_file(uuid);

        if (!archive_file) {
            return null;
        }

        const current_path = archive_file.current_path.split('/');
        const zip_name = current_path.at(-1);
        const file_name = zip_name?.split(`-${uuid}`)[0];

        if (!file_name) {
            return null;
        }

        return this.httpService.axiosRef.get(
            `${this.storage}/api/v2/file/${uuid}/extract_file/?relative_path_to_file=${file_name}-${uuid}/data/objects/${file_name}.pdf`,
            {
                responseType: "arraybuffer",
                headers: {
                    ...this.fixed_header,
                },
            },
        );
    }
}

function treat_mets_metadata(field: Readonly<string>) {
    let _field = field;

    _field = _field.substring(4, _field.length - 1);

    const field_name = _field.substring(0, _field.indexOf(">"))
    const field_value = _field.substring(_field.indexOf(">")+1, _field.indexOf("<"));

    return [field_name, field_value];
}

function get_original_filename(mets: string[]) {
    const uuid_field = mets.find(i => i.includes("<premis:objectIdentifierValue>"))
    const uuid = uuid_field?.split("<premis:objectIdentifierValue>")[1].split("</premis:objectIdentifierValue>")[0]

    const original_field = mets.find(i => i.includes("<premis:originalName>"))

    return original_field?.split("<premis:originalName>")[1].split("</premis:originalName>")[0].split(`-${uuid}`)[0] || "";
}