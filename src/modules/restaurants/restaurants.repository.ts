import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Restaurant } from '@prisma/client';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';

@Injectable()
export class RestaurantsRepository {
    constructor(private readonly prisma: PrismaService) { }

    async findRestaurantById(id: string): Promise<Restaurant | null> {
        return this.prisma.restaurant.findUnique({
            where: { id }
        })
    }

    async createRestaurant(createRestaurantDto: CreateRestaurantDto): Promise<Restaurant> {
        return this.prisma.restaurant.create({ data: createRestaurantDto });
    }
}