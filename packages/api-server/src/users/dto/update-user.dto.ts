import { ApiProperty, PartialType, PickType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateUserDto extends PickType(PartialType(CreateUserDto), [
  'nickname',
  'email',
  'profileUrl',
]) {
  @ApiProperty()
  @IsNotEmpty({ message: 'UserId is empty' })
  userId: number;
}
