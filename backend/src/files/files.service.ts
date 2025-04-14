import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
} from '@nestjs/common';
import { mkdirSync, writeFileSync } from 'fs';
import { UsersService } from '../users/users.service';
import * as process from 'node:process';
import { ArchivematicaService } from '../archivematica/archivematica.service';
import { readFileSync } from 'node:fs';

const base_path =
    process.env.ARCHIVE_PATH ?? '/var/archivematica/archivematica/users';
@Injectable()
export class FilesService {
    constructor(
        private readonly userService: UsersService,
        private readonly archivematicaService: ArchivematicaService,
    ) {}
    async handleFileUpload(
        files: Array<Express.Multer.File>,
        userEmail: string,
    ) {
        if (files.length === 0) {
            throw new BadRequestException('No files uploaded');
        }

        let metadata = files.find(
            (file) => file.originalname === 'metadata.csv',
        );

        if (!metadata) {
            throw new BadRequestException('No metadata file uploaded');
        }

        let user = await this.userService.findOneByEmail(userEmail);
        if (!user) {
            throw new BadRequestException('No user');
        }
        let date = new Date().toISOString().replaceAll(':', '_');
        let rest = files.filter((file) => file.originalname !== 'metadata.csv');

        if (rest.length === 0) {
            throw new BadRequestException(
                'At lest one file should be uploaded',
            );
        }

        mkdirSync(`${base_path}/${user.id}/${date}/metadata`, {
            recursive: true,
        });
        mkdirSync(`${base_path}/${user.id}/${date}/objects`, {
            recursive: true,
        });

        writeFileSync(
            `${base_path}/${user.id}/${date}/metadata/metadata.csv`,
            metadata.buffer,
        );

        rest.forEach((file) => {
            writeFileSync(
                `${base_path}/${user.id}/${date}/objects/${file.originalname}`,
                file.buffer,
            );
        });

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

        console.log(resourse_path);
        console.log(encoded_path);

        return this.archivematicaService.init_automated_transfer(
            rest[0].originalname.split('.')[0],
            encoded_path,
        );
    }
}
