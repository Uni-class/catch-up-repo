import { IsIn, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetSessionsQuery {
  @ApiProperty()
  @IsIn(['host', 'participant'])
  role: 'host' | 'participant';

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  size: number = 100;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  page: number = 1;
}
