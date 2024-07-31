import { PartialType, PickType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserProfileDto extends PickType(PartialType(CreateUserDto), [
  'nickname',
  'email',
]) {
  profileUrl?: string;
}
