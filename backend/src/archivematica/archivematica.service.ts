import { Injectable } from '@nestjs/common';
import {HttpService} from "@nestjs/axios";
import * as process from "node:process";

@Injectable()
export class ArchivematicaService {
    dashboard = "http://127.0.0.1:62080"
    fixed_header = {
        "authorization": `ApiKey ${process.env.ARCHIVE__USER}:${process.env.ARCHIVE__KEY}`
    }
    constructor(private readonly  httpService: HttpService) {}

    async test() {
        console.log(this.fixed_header)
        return this.httpService.axiosRef
            .get("http://172.18.0.1:62080/api/transfer/completed", {
                headers: {...this.fixed_header}
            })
    }
}
