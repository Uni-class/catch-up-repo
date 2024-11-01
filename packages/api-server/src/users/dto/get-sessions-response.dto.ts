import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { Session } from '../../sessions/entities/session.entity';

export class GetSessionsResponseDto {
  @ApiProperty()
  @IsNumber()
  totalPages: number;

  @ApiProperty()
  @IsNumber()
  page: number;

  @ApiProperty({ type: [Session] })
  sessions: Session[];

  constructor(totalPages: number, page: number, sessions: Session[]) {
    this.totalPages = totalPages;
    this.page = page;
    this.sessions = sessions;
  }
}
