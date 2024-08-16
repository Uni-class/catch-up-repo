import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class SessionStatusResponseDto {
  @ApiProperty()
  @IsOptional()
  sessionCode: string;
}
