import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  nickname: string;

  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  profileUrl: string;

  @ApiProperty()
  @IsString()
  provider: string;

  @ApiProperty()
  @IsString()
  providerId: string;

  @ApiProperty()
  @IsString()
  refreshToken: string;

  @ApiProperty()
  @IsString()
  status: string;
}
