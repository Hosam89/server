import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard('local'))
  @Get()
  async getAllUsers() {
    return await this.userService.findAll();
  }

  @UseGuards(AuthGuard('local'))
  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return await this.userService.findById(id);
  }

  @UseGuards(AuthGuard('local'))
  @Get('search/:query')
  async getUserByQuery(@Param('query') query: string) {
    return await this.userService.findUserByQuery(query);
  }

  @UseGuards(AuthGuard('local'))
  @Get('role/:role')
  async getUsersByRole(@Param('role') role: string) {
    return await this.userService.findAllUsersWithRole(role);
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }
}
