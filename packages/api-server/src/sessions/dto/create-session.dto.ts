import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsArray, IsString } from 'class-validator';

export class CreateSessionDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'SessionName is empty' })
  @IsString()
  sessionName: string;

  hostId: number;

  @ApiProperty()
  @IsArray()
  @IsNumber({}, { each: true })
  sessionFileId: number[];
}
