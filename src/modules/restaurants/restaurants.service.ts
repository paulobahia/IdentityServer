import { BadRequestException, Injectable } from '@nestjs/common';
import { Restaurant } from './entities/restaurant.entity';
import { RestaurantsRepository } from './restaurants.repository';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';


@Injectable()
export class RestaurantsService {
  constructor(private readonly restaurantsRepository: RestaurantsRepository) { }

  async getRestaurantById(restaurantId: string): Promise<Restaurant | null> {
    return this.restaurantsRepository.findRestaurantById(restaurantId)
  }

  async createRestaurant(data: CreateRestaurantDto): Promise<Restaurant> {
    try {
      return this.restaurantsRepository.createRestaurant(data)
    } catch (error) {
      throw new BadRequestException(error);

    }
  }

}
