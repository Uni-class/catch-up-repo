import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GuestBodyDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  id: string;
}
