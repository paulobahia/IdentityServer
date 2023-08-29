import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, UseGuards, Req, Headers } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { JwtGuard } from '../auths/strategies/jwt/jwt.guard';
import { CreateUserDto, PostUserDto } from './dto/create-user.dto';
import { RestaurantId } from 'src/decorators/request-context.decorator';
import { ApiTags } from '@nestjs/swagger';
import { IsPublic } from 'src/decorators/is-public.decorator';

@ApiTags('Users')
@Controller('api/users')
@UseGuards(JwtGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  @HttpCode(204)
  async createUser(@Body() data: PostUserDto): Promise<User> {
    return this.usersService.createUser(data)
  }

  @Get()
  async getAllUsersByRestaurant(@RestaurantId() restaurantId: string) {
    return await this.usersService.getAllUsersByRestaurantId(restaurantId)
  }

  @IsPublic()
  @HttpCode(204)
  @Post('check-email')
  async checkExistEmail(@Body() data: { email: string }) {
    await this.usersService.checkExistEmail(data.email)
  }

  @IsPublic()
  @Post('reset-password')
  async resetPassword(@Body() data: { email: string }) {
    await this.usersService.resetPassword(data.email)
  }
}
