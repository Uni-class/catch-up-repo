import { ApiProperty, PartialType, PickType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsNumber } from 'class-validator';

export class UpdateUserDto extends PickType(PartialType(CreateUserDto), [
  'nickname',
  'email',
  'profileUrl',
]) {
  @ApiProperty()
  @IsNumber()
  userId: number;
}
