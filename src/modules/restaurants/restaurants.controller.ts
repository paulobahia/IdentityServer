import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpCode } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { JwtGuard } from '../auths/strategies/jwt/jwt.guard';
import { Restaurant } from './entities/restaurant.entity';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { ApiTags } from '@nestjs/swagger';
import { RestaurantId } from '../../decorators/request-context';

@ApiTags('Restaurants')
@Controller('api/restaurants')
@UseGuards(JwtGuard)
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) { }

  @Post()
  @HttpCode(204)
  async createRestaurant(@Body() data: CreateRestaurantDto): Promise<Restaurant> {
    return this.restaurantsService.createRestaurant(data)
  }

  @Post("restaurant-code")
  async generateCode(@Body() data: { role: string }, @RestaurantId() restaurantId: string) {
    const restaurantCode = await this.restaurantsService.generateCode(data.role, restaurantId);
    return restaurantCode;
  }

}
