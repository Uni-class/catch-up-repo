import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { File } from '../../files/entities/file.entity';

export class GetFilesResponseDto {
  @ApiProperty()
  @IsNumber()
  totalPages: number;

  @ApiProperty()
  @IsNumber()
  page: number;

  @ApiProperty({ type: [File] })
  files: File[];

  constructor(totalPages: number, page: number, sessions: File[]) {
    this.totalPages = totalPages;
    this.page = page;
    this.files = sessions;
  }
}
