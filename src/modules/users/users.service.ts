import { Injectable, ConflictException, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { CreateUserDto, CreateUserDtoType } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UsersRepository } from './users.repository';
import { MessagesHelper } from 'src/helpers/messages.helper';
import { encodePassword } from 'src/utils/bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) { }

  async createUser(data: CreateUserDtoType): Promise<User> {
    try {
      await CreateUserDto.parseAsync(data)

      const existingUser = await this.usersRepository.findUserByEmail(data.email)

      if (existingUser) {
        throw new ConflictException(MessagesHelper.EMAIL_ALREADY_EXISTS)
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
}
