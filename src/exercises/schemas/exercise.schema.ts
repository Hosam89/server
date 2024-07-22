import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ExerciseDocument = Exercise & Document;

@Schema()
export class Exercise {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  duration: number;

  @Prop({ required: true })
  muscleGroup: string;

  @Prop({ required: true })
  reputation: number;

  @Prop({ required: true })
  difficulty: string;
}

export const ExerciseSchema = SchemaFactory.createForClass(Exercise);
