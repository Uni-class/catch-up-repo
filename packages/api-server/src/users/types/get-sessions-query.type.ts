import { IsIn, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetSessionsQuery {
  @ApiProperty()
  @IsIn(['host', 'participant'])
  role: 'host' | 'participant';

  @ApiProperty()
  @IsNumber()
  size: number;

  @ApiProperty()
  @IsNumber()
  page: number;
}
