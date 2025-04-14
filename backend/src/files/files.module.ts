import { Module } from '@nestjs/common';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { UsersModule } from '../users/users.module';
import { ArchivematicaModule } from '../archivematica/archivematica.module';

@Module({
    imports: [UsersModule, ArchivematicaModule],
    controllers: [FilesController],
    providers: [FilesService],
})
export class FilesModule {}
