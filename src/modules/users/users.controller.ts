import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, UseGuards, Req, Headers } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { JwtGuard } from '../auths/strategies/jwt/jwt.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { RestaurantId } from 'src/decorators/request-context';

@Controller('api/users')
@UseGuards(JwtGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  @HttpCode(204)
  async createUser(@Body() data: CreateUserDto): Promise<User> {
    return this.usersService.createUser(data)
  }

  @Get()
  async getAllUsersByRestaurant(@RestaurantId() restaurantId: string) {
    return await this.usersService.getAllUsersByRestaurantId(restaurantId)
  }

  @Get('check-email')
  @HttpCode(204)
  async checkExistEmail(@Body() body: { email: string }) {
    await this.usersService.checkExistEmail(body.email)
  }
}
