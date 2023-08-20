import { Injectable } from '@nestjs/common';
import { CreateUserDtoType } from './dto/create-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { User } from './entities/user.entity';

@Injectable()
export class UsersRepository {
    constructor(private readonly prisma: PrismaService) { }

    async createUser(data: CreateUserDtoType): Promise<User> {
        const createdUser = await this.prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: data.password,
                birthDate: data.birthDate,
                gender: data.gender,
                role: data.role,
            },
        });

        return createdUser;
    }

    async findUserByEmail(email: string): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: { email },
        });
    }

}
