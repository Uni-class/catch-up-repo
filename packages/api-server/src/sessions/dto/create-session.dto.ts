import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsNotEmpty,
  IsNumber,
  IsArray,
  IsString,
} from 'class-validator';

export class CreateSessionDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'SessionName is empty' })
  @IsString()
  sessionName: string;

  @IsOptional()
  @IsNumber()
  hostId: number;

  @ApiProperty({ type: [Number] })
  @IsArray()
  @IsNumber({}, { each: true })
  sessionFileIds: number[];
}
