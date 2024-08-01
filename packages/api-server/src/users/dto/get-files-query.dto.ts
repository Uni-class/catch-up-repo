import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class GetFilesQueryDto {
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  last: number;
}
