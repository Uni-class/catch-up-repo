import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Note extends Document {
  @Prop()
  userId: number;

  @Prop()
  sessionId: number;

  @Prop()
  fileId: number;

  @Prop()
  pageNumber: number;

  @Prop({ type: Object })
  data: any;
}

export const NoteSchema = SchemaFactory.createForClass(Note);
