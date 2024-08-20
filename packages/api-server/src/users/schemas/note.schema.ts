import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Document } from 'mongoose';

export type CatDocument = HydratedDocument<Note>;

@Schema()
export class Note extends Document {
  @Prop()
  userId: string;

  @Prop()
  sessionId: string;

  @Prop()
  fileId: number;

  @Prop({ type: Object })
  data: any;
}

export const NoteSchema = SchemaFactory.createForClass(Note);
