import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';
import { User } from '../users/entities/user.entity';

interface AuthenticatedUser {
    id: string;
    email: string;
    token: string;
    role: string;
    restaurantId: string;
}

@Injectable()
export class AuthsService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) { }

    async validateUser(email: string, password: string): Promise<User | null> {
        try {
            const user = await this.usersService.getUserByEmail(email);

            if (user && compareSync(password, user.password)) {
                return user
            }

            return null

        } catch (error) {
            return null
        }
    }


    async validateUserById(id: string): Promise<User | null> {
        return this.usersService.getUserById(id);
    }

    async authUser(data: AuthenticatedUser) {
        const payload = { sub: data.id, email: data.email, role: data.role, restaurantId: data.restaurantId }
        return this.jwtService.sign(payload)
    }
}
