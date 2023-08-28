import { BadRequestException, Injectable } from '@nestjs/common';
import { Restaurant } from './entities/restaurant.entity';
import { RestaurantsRepository } from './restaurants.repository';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { decrypt, encrypt } from '../../utils/crypto';

@Injectable()
export class RestaurantsService {
  constructor(private readonly restaurantsRepository: RestaurantsRepository) { }

  async getRestaurantById(restaurantId: string): Promise<Restaurant | null> {
    return await this.restaurantsRepository.findRestaurantById(restaurantId)
  }

  async createRestaurant(data: CreateRestaurantDto): Promise<Restaurant> {
    try {
      return await this.restaurantsRepository.createRestaurant(data)
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async generateCode(role: string, restaurantId: string): Promise<string> {
    const rawCode = `${restaurantId}%${role}`;
    const encodedCode = encrypt(rawCode)
    return encodedCode;
  }

  async decodeCode(encryptedCode: string): Promise<{ restaurantId: string; role: string; }> {
    const decodeCode = decrypt(encryptedCode)
    return decodeCode;
  }

}
