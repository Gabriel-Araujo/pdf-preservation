import {
    BadRequestException,
    Controller,
    Get,
    HttpStatus,
    Param,
    Post,
    Request,
    Response,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from './files.service';
import { Response as Res } from 'express';
import { ArchivematicaService } from '../archivematica/archivematica.service';

@Controller('files')
export class FilesController {
    constructor(private readonly filesService: FilesService, private readonly archiveService: ArchivematicaService) {}

    @Post('/upload')
    @UseInterceptors(FileInterceptor('file'))
    uploadFile(@UploadedFile() file: Express.Multer.File, @Request() req: any) {
        let metadata = req.headers['metadata'];
        if (!metadata || metadata?.length === 0) {
            throw new BadRequestException('No metadata');
        }

        return this.filesService.handleFileUpload(
            file,
            metadata,
            req.user.email,
        );
    }

    @Get()
    getArchiveFiles() {
        return this.filesService.get_files_list();
    }

    // TODO Implementar metadata
    @Get(':uuid')
    async downloadFile(@Param('uuid') id: string, @Response() res: Res) {
        const metadata = await this.archiveService.get_metadata(id);
        if (!metadata) {return null;}


        /* let _metadata = metadata.split('\n').map((p) => p.split(','));
        // let metadata_string = '';

        let i = 0;
        _metadata[0].forEach((param: string) => {
            metadata_string += `${param}=${_metadata[1][i++]}&`;
        });
         */

        let metadata_string =
        metadata.slice(1, metadata.length).reduce((acc, current) => {
            if (current) {return acc + `${current[0]}=${current[1]}&`;}
            return ""
        }, "")

        console.log(metadata_string);


        return res
            .status(HttpStatus.OK)
            .set('content-type', 'application/pdf')
            .set('vary', 'Accept, Accept-Language, Cookie')
            .set('x-frame-options', 'DENY')
            .set('cache-control', 'no-cache')
            .set(
                'metadata',
                metadata_string.substring(0, metadata_string.length - 1),
            )
            .set(
                'content-disposition',
                `attachment; filename="${metadata[0][1]}.pdf"`,
            ).send(await this.filesService.get_file(id)
                .then(res => new Blob([res?.data], { type: 'application/pdf' }))
                .then(blob => blob.arrayBuffer().then(buf => Buffer.from(buf)))
            );
    }
}
