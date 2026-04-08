import { Controller, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadService } from '@app/common/services/file-upload.service';
import { pdfFileFilter } from '@app/common/utils/file-upload.utils';

@Controller('documents')
export class DocumentsController {
    constructor(private readonly fileService: FileUploadService) { }

    @Post('upload-cv')
    @UseInterceptors(FileInterceptor('file', {
        fileFilter: pdfFileFilter,
        limits: { fileSize: 5 * 1024 * 1024 }
    }))
    async uploadUserCV(@UploadedFile() file: Express.Multer.File) {
        return await this.fileService.uploadFile(file, 'cv-records');
    }
}