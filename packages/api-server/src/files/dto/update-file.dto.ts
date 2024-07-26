import { PartialType, PickType } from '@nestjs/swagger';
import { CreateFileDto } from './create-file.dto';

export class UpdateFileDto extends PickType(CreateFileDto, ['name']) {}
