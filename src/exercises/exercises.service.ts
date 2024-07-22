import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateExerciseDto } from './dtos/create-exercise.dto';
import { Exercise, ExerciseDocument } from './schemas/exercise.schema';

@Injectable()
export class ExercisesService {
  constructor(
    @InjectModel(Exercise.name) private exerciseModel: Model<ExerciseDocument>,
  ) {}

  async findAll(): Promise<Exercise[]> {
    return this.exerciseModel.find().exec();
  }

  async create(createExerciseDto: CreateExerciseDto): Promise<Exercise> {
    const createdExercise = new this.exerciseModel(createExerciseDto);
    return createdExercise.save();
  }
}
