import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { RestaurantsService } from '../restaurants/restaurants.service';
import { RestaurantsRepository } from '../restaurants/restaurants.repository';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, RestaurantsService, RestaurantsRepository],
})
export class UsersModule {}
