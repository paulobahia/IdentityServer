import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDtoType } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { JwtGuard } from '../auths/strategies/jwt/jwt.guard';

@Controller('api/users')
@UseGuards(JwtGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  @HttpCode(204)
  async createUser(@Body() data: CreateUserDtoType): Promise<User> {
    return this.usersService.createUser(data)
  }
}
