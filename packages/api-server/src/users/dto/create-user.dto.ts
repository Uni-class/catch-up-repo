import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Nickname is empty' })
  @IsString()
  nickname: string;

  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  profileUrl: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Provider is empty' })
  @IsString()
  provider: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'ProviderId is empty' })
  @IsString()
  providerId: string;

  @ApiProperty()
  @IsString()
  refreshToken: string;

  @ApiProperty()
  @IsString()
  status: string;
}
