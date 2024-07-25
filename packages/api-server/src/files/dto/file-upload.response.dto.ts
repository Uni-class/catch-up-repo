import { ApiProperty } from '@nestjs/swagger';

export class FileUploadResponseDto {
  @ApiProperty()
  success: boolean;

  @ApiProperty()
  message?: string;

  public constructor(success: boolean, message?: string) {
    this.success = success;
    if (message) this.message = message;
  }
}
