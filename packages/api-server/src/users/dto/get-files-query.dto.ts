import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetFilesQueryDto {
  @ApiProperty()
  @IsNumber()
  size: number;

  @ApiProperty()
  @IsNumber()
  page: number;
}
