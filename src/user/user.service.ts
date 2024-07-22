import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UserService {
  private users: CreateUserDto[] = [];

  findAll() {
    return this.users;
  }

  create(createUserDto: CreateUserDto) {
    this.users.push(createUserDto);
    return createUserDto;
  }
}
