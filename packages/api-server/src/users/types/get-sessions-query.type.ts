import { IsIn, IsNumber } from 'class-validator';

export class GetSessionsQuery {
  @IsIn(['host', 'participant'])
  role: 'host' | 'participant';

  @IsNumber()
  size: number;

  @IsNumber()
  page: number;
}
