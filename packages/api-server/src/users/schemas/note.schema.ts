import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ minimize: false })
export class Note extends Document {
  @Prop({ require: true, type: Number })
  userId: number;

  @Prop({ require: true, type: Number })
  sessionId: number;

  @Prop({ require: true, type: Number })
  fileId: number;

  @Prop({ require: true, type: Number })
  pageNumber: number;

  @Prop({ require: true, type: Object, default: {} })
  data: object;
}

export const NoteSchema = SchemaFactory.createForClass(Note);
