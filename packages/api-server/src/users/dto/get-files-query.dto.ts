import { IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetFilesQueryDto {
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  size: number = 100;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  page: number = 1;
}
