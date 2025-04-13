import { BadRequestException, Injectable } from '@nestjs/common';
import { mkdirSync, writeFileSync } from 'fs';
import { UsersService } from '../users/users.service';
import * as process from 'node:process';

const base_path =
    process.env.ARCHIVE_PATH ?? '/var/archivematica/archivematica/users';
@Injectable()
export class FilesService {
    constructor(private readonly userService: UsersService) {}
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
    }
}
