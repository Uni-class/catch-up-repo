import { ApiProperty, PartialType, PickType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import {IsNumber, IsOptional, IsString} from 'class-validator';

export class UpdateUserDto extends PickType(PartialType(CreateUserDto), [
  'nickname',
  'email',
]) {
  @IsOptional()
  @IsString()
  profileUrl: string;
}
