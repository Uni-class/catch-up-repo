import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { File } from './entities/file.entity';
import { ConfigService } from '@nestjs/config';
import { FileUploadResponseDto } from './dto/file-upload.response.dto';

@Injectable()
export class FilesService {
  private readonly s3Client: S3Client;

  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(File)
    private readonly fileRepository: Repository<File>,
  ) {
    this.s3Client = new S3Client({
      region: this.configService.get<string>('S3_REGION'),
      credentials: {
        accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY'),
        secretAccessKey: this.configService.get<string>(
          'AWS_SECRET_ACCESS_KEY',
        ),
      },
    });
  }

  async create(createFileDto: CreateFileDto) {
    return 'This action adds a new file';
  }

  async findOne(id: number) {
    return await this.fileRepository.findOne({
      where: { fileId: id },
    });
  }

  async update(id: number, updateFileDto: UpdateFileDto) {
    return `This action updates a #${id} file`;
  }

  async remove(id: number) {
    const file = await this.fileRepository.findOne({
      where: { fileId: id },
    });
    return await this.fileRepository.softRemove(file);
  }

  async uploadFile(
    userId: number,
    file: Express.Multer.File,
  ): Promise<FileUploadResponseDto> {
    if (!file) throw new BadRequestException(`File not exists`);
    const fileDto: CreateFileDto = await this.s3Upload(userId, file);
    const newFile: File = this.fileRepository.create(fileDto);
    await this.fileRepository.save(newFile);
    return new FileUploadResponseDto(true);
  }

  async s3Upload(userId: number, file: Express.Multer.File) {
    const key: string = `${Date.now().toString()}-${file.originalname}`;
    const param = {
      Key: key,
      Body: file.buffer,
      Bucket: this.configService.get<string>('S3_BUCKET_NAME'),
    };

    const command = new PutObjectCommand(param);
    const res = await this.s3Client.send(command);
    if (res.$metadata.httpStatusCode !== 200)
      throw new InternalServerErrorException(
        new FileUploadResponseDto(
          false,
          'Something went wrong while uploading file to S3 Bucket.',
        ),
      );
    return {
      ownerId: userId,
      name: key,
      url: this.configService.get<string>('S3_INSTANCE_URL') + key,
    };
  }

  async getFileAsUser(
    fileId: number,
    userId: number | null = null,
  ): Promise<File> {
    const file = await this.findOne(fileId);
    if (!file || (userId && file.ownerId !== userId)) {
      throw new BadRequestException(
        `File with ID: ${fileId} does not exist or you do not have permission to access it.`,
      );
    }
    return file;
  }
}
