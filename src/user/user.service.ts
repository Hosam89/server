import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findById(id: string): Promise<User> {
    try {
      const user = await this.userModel.findById(id).exec();
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user;
    } catch (error) {
      if (error.name === 'CastError') {
        throw new BadRequestException('Invalid user ID format');
      }
      throw error;
    }
  }

  async findUserByQuery(query: string): Promise<User> {
    try {
      const user = await this.userModel
        .findOne({ $or: [{ email: query }, { name: query }] })
        .exec();
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user;
    } catch (error) {
      if (error.name === 'CastError') {
        throw new BadRequestException('Invalid user ID format');
      }
      throw error;
    }
  }

  async findAllUsersWithRole(role: string): Promise<User[]> {
    return this.userModel.find({ role }).exec();
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }
}
