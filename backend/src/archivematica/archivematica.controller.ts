import { Controller, Get } from '@nestjs/common';
import { ArchivematicaService } from './archivematica.service';

@Controller('archivematica')
export class ArchivematicaController {
    constructor(private readonly archivematicaService: ArchivematicaService) {}

    @Get()
    async completed() {
        return await this.archivematicaService.test();
    }
}
