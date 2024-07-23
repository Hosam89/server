import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { ExercisesModule } from './exercises/exercises.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/strong'),
    UserModule,
    ExercisesModule,
    AuthModule,
  ],
})
export class AppModule {}
