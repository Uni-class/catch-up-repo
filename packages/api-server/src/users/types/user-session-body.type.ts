import { IsNotEmpty, IsString } from 'class-validator';

export class UserSessionBodyType {
  @IsNotEmpty()
  @IsString()
  displayName?: string;
}
