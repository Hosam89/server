import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers() {
    return await this.userService.findAll();
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return await this.userService.findById(id);
  }

  @Get('search/:query')
  async getUserByQuery(@Param('query') query: string) {
    return await this.userService.findUserByQuery(query);
  }

  @Get('role/:role')
  async getUsersByRole(@Param('role') role: string) {
    return await this.userService.findAllUsersWithRole(role);
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }
}
