import {
    Controller,
    Post,
    Request,
    UploadedFiles,
    UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { FilesService } from './files.service';

@Controller('files')
export class FilesController {
    constructor(private readonly filesService: FilesService) {}

    @Post('/upload')
    @UseInterceptors(FilesInterceptor('file'))
    uploadFile(
        @UploadedFiles() files: Array<Express.Multer.File>,
        @Request() req: any,
    ) {
        console.log(files);
        this.filesService.handleFileUpload(files, req.user.email);
    }
}
