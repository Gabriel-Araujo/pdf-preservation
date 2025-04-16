import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { ArchivematicaService } from '../archivematica/archivematica.service';
import { mkdirSync, writeFileSync } from 'fs';
import { readFileSync } from 'node:fs';
import * as process from 'node:process';
import { DatabaseService } from '../database/database.service';
import { ArchiveFile } from '../archivematica/entities/file';

const base_path =
    process.env.ARCHIVE_PATH ?? '/var/archivematica/archivematica/users';
@Injectable()
export class FilesService {
    constructor(
        private readonly userService: UsersService,
        private readonly archivematicaService: ArchivematicaService,
        private readonly databaseService: DatabaseService,
    ) {}
    async handleFileUpload(
        file: Express.Multer.File,
        metadata: string,
        userEmail: string,
    ) {
        if (metadata.length === 0) {
            throw new BadRequestException('No metadata file uploaded');
        }

        let _metadata = metadata.split('&').map((i: string) => i.split('='));

        if (!_metadata.find((i) => i[0] === 'filename')) {
            throw new BadRequestException('No filename');
        }

        let metadata_body = '';

        let metadata_header = _metadata.reduce(
            (accumulator: string, current: string[]) => {
                metadata_body += `${current[1]},`;
                return accumulator + current[0] + ',';
            },
            '',
        );

        metadata_body = metadata_body.substring(0, metadata_body.length - 1);
        metadata_header =
            metadata_header.substring(0, metadata_header.length - 1) + '\n';

        let user = await this.userService.findOneByEmail(userEmail);

        if (!user) {
            throw new BadRequestException('No user');
        }

        let date = new Date().toISOString().replaceAll(':', '_');

        mkdirSync(`${base_path}/${user.id}/${date}/metadata`, {
            recursive: true,
        });
        mkdirSync(`${base_path}/${user.id}/${date}/objects`, {
            recursive: true,
        });

        writeFileSync(
            `${base_path}/${user.id}/${date}/metadata/metadata.csv`,
            metadata_header + metadata_body,
        );

        writeFileSync(
            `${base_path}/${user.id}/${date}/objects/${file.originalname}`,
            file.buffer,
        );

        let config = readFileSync('processingMCP.xml');
        writeFileSync(
            `${base_path}/${user.id}/${date}/processingMCP.xml`,
            config,
        );

        let location = await this.archivematicaService.get_default_ts();

        if (!location) {
            throw new InternalServerErrorException();
        }

        let resourse_path = `${location.uuid}:archivematica/users/${user.id}/${date}`;
        let encoded_path = Buffer.from(resourse_path).toString('base64');

        const res = await this.archivematicaService.init_automated_transfer(
            file.originalname.split('.')[0],
            encoded_path,
        );
        return this.databaseService.file.create({
            data: {
                uuid: res.id,
                date: new Date(),
            },
        });
    }

    async get_files_list(queries?: string[]) {
        let files =
            await this.archivematicaService.get_archive_files_list(queries);

        const get_dates = async (objects: ArchiveFile[]) => {
            let files: any = [];
            for (const object of objects) {
                let date = (
                    await this.databaseService.file.findFirst({
                        where: { uuid: object.uuid },
                    })
                )?.date;
                files.push({
                    uuid: object.uuid,
                    date: date,
                    name: object.current_full_path
                        .split('/')
                        .at(-1)
                        ?.split('-')
                        ?.at(0),
                });
            }
            return files;
        };

        let objects = files.objects.map(async (file) => ({
            uuid: file.uuid,
            stored_date: (
                await this.databaseService.file.findFirst({
                    where: { uuid: file.uuid },
                })
            )?.date,
            size: file.size,
            package_type: file.package_type,
            related_packages: file.related_packages,
            name: file.current_full_path.split('/').at(-1)?.split('-')?.at(0),
        }));

        let c = objects.flatMap(async (i) => await i);

        return {
            page: {
                limit: files.meta.limit,
                offset: files.meta.offset,
                total_count: files.meta.total_count,
            },
            objects: await get_dates(files.objects),
        };
    }

    async get_file(uuid: string) {
        let archive = await this.archivematicaService.download_file(uuid);

        if (!archive) {
            throw new NotFoundException('File not found');
        }

        return archive;
    }
}
