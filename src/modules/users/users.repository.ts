import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersRepository {
    constructor(private readonly prisma: PrismaService) { }

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        return this.prisma.user.create({
            data: {
                birthDate: createUserDto.birthDate,
                email: createUserDto.email,
                gender: createUserDto.gender,
                name: createUserDto.name,
                password: createUserDto.password,
                role: createUserDto.role,
                restaurantId: createUserDto.restaurantId
            }
        });
    }

    async findUserByEmail(email: string): Promise<User | null> {
        const user = await this.prisma.user.findUnique({
            where: { email },
        });

        return user as User | null;
    }

    async findUserById(id: string): Promise<User | null> {
        const user = await this.prisma.user.findUnique({
            where: { id }
        })

        return user as User | null;
    }

    async findAllUsersByRestaurantId(id: string): Promise<User[] | null> {
        const users = await this.prisma.user.findMany({
            where: { restaurantId: id },
            select: {
                id: true,
                name: true,
                email: true,
                birthDate: true,
                gender: true,
                role: true,
            }
        })

        return users as User[] | null
    }


}
