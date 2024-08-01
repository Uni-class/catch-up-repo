import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateUserDto {
  @ApiProperty()
  @Transform(({ value }) =>
    String(value).trim() === '' ? undefined : String(value).trim(),
  )
  @IsNotEmpty({ message: 'Nickname is empty' })
  @IsString()
  nickname: string;

  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty()
  @Transform(({ value }) =>
    String(value).trim() === '' ? undefined : String(value).trim(),
  )
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
