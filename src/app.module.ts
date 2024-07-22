import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { ExercisesModule } from './exercises/exercises.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/strong'),
    UserModule,
    ExercisesModule,
  ],
})
export class AppModule {}
