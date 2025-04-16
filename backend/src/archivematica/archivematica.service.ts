import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import * as process from 'node:process';
import Location from './entities/location';
import { readFileSync } from 'node:fs';
import { ArchiveFile } from './entities/file';
import { Page } from './entities/page';
import { writeFileSync } from 'fs';

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
        let _queries = 'package_type=transfer';
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
        return (
            await this.httpService.axiosRef.get(
                `${this.storage}/api/v2/file/${uuid}/extract_file/?relative_path_to_file=data/metadata/metadata.csv`,
                {
                    headers: {
                        ...this.fixed_header,
                        responseType: 'blob',
                    },
                },
            )
        ).data;
    }

    async download_file(uuid: string) {
        let metadata = await this.get_metadata(uuid);

        if (!metadata) {
            return null;
        }

        let metadata_array: string[] = metadata.split('\n');
        let filename_index = metadata_array[0].indexOf('filename');
        let filename = metadata_array[1].split(',')[filename_index];

        let response = await this.httpService.axiosRef.get(
            `${this.storage}/api/v2/file/${uuid}/extract_file/?relative_path_to_file=data/${filename}`,
            {
                headers: {
                    ...this.fixed_header,
                    responseType: 'blob',
                },
            },
        );
        writeFileSync('/tmp/a.pdf', response.data);
        return [metadata, response.data];
    }
}
