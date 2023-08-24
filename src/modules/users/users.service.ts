import { Injectable, ConflictException, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UsersRepository } from './users.repository';
import { MessagesHelper } from 'src/helpers/messages.helper';
import { encodePassword } from 'src/utils/bcrypt';
import { RestaurantsService } from '../restaurants/restaurants.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository, private readonly restaurantsService: RestaurantsService) { }

  async createUser(data: CreateUserDto): Promise<User> {
    try {

      const existingUser = await this.usersRepository.findUserByEmail(data.email)

      if (existingUser) {
        throw new ConflictException(MessagesHelper.EMAIL_ALREADY_EXISTS)
      }

      const existRestaurant = await this.restaurantsService.getRestaurantById(data.restaurantId)

      if (!existRestaurant) {
        throw new ConflictException(MessagesHelper.RESTAURANTID_NOT_FOUND)
      }

      const password = encodePassword(data.password)

      return this.usersRepository.createUser({ ...data, password });

    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findUserByEmail(email);
  }

  async getUserById(id: string): Promise<User | null> {
    return this.usersRepository.findUserById(id);
  }

  async getAllUsersByRestaurantId(id: string) {
    return this.usersRepository.findAllUsersByRestaurantId(id)
  }
}
