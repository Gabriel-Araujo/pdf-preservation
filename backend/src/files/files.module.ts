import { Module } from '@nestjs/common';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { UsersModule } from '../users/users.module';
import { ArchivematicaModule } from '../archivematica/archivematica.module';
import { DatabaseModule } from '../database/database.module';

@Module({
    imports: [UsersModule, ArchivematicaModule, DatabaseModule],
    controllers: [FilesController],
    providers: [FilesService],
})
export class FilesModule {}
