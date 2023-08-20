import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDtoType } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  @HttpCode(204)
  async createUser(@Body() data: CreateUserDtoType): Promise<User> {
    return this.usersService.createUser(data)
  }
}
