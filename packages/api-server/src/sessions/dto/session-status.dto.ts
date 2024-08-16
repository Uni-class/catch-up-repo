import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty } from 'class-validator';

export class SessionStatusDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsIn(['open', 'close'])
  status: 'open' | 'close';
}
