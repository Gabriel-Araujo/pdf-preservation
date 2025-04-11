import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './auth/decorators/public.decorator';
import {ArchivematicaService} from "./archivematica/archivematica.service";

@Controller()
export class AppController {
    constructor(
        private readonly appService: AppService,
        private readonly archiveService: ArchivematicaService,
    ) {}

    @Public()
    @Get()
    async getHello() {
        let a = await this.archiveService.test();

        return a.data;
    }
}
