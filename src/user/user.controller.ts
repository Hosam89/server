import { Controller, Get, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { JwtGaurd } from 'src/auth/guard';

//the name of the guard is decleard in the jwt strategy
@UseGuards(JwtGaurd)
@Controller('users')
export class UserController {
  //If the get is empty it will be the controller route
  @Get('me')
  getMe(@GetUser() user: User) {
    return user;
  }
}
