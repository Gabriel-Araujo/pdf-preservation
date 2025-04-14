import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import * as process from 'node:process';
import Location from './entities/location';
import { readFileSync } from 'node:fs';

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
}
