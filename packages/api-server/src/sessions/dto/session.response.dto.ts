import { ApiProperty } from '@nestjs/swagger';
import { File } from '../../files/entities/file.entity';
import { Session } from '../entities/session.entity';

export class SessionResponseDto {
  @ApiProperty()
  sessionId: number;

  @ApiProperty()
  sessionName: string;

  @ApiProperty()
  hostId: number;

  @ApiProperty()
  createdAt: string;

  @ApiProperty({ type: [File] })
  fileList: File[];

  public constructor(session: Session, fileList: File[]) {
    this.sessionId = session.sessionId;
    this.sessionName = session.sessionName;
    this.hostId = session.hostId;
    this.createdAt = session.createdAt;
    this.fileList = fileList;
  }
}
