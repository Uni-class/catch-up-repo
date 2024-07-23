import { IsIn } from 'class-validator';

export class Role {
  @IsIn(['host', 'participant'])
  role: 'host' | 'participant';
}
