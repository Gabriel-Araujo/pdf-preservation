import { Module } from '@nestjs/common';
import { ArchivematicaService } from './archivematica.service';
import { HttpModule } from '@nestjs/axios';
import { ArchivematicaController } from './archivematica.controller';


@Module({
  imports: [HttpModule],
  providers: [ArchivematicaService],
  controllers: [ArchivematicaController],
  exports: [ArchivematicaService]
})
export class ArchivematicaModule {}
