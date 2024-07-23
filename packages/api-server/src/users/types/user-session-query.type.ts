import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UserSessionQueryType {
  @IsNotEmpty()
  @IsNumber()
  sessionId: number;

  @IsString()
  displayName?: string;
}
