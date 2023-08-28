import { Headers, Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken';
import { MessagesHelper } from '../helpers/messages.helper';
import { Restaurant } from 'src/modules/restaurants/entities/restaurant.entity';
import { RestaurantsService } from 'src/modules/restaurants/restaurants.service';

interface JwtPayload {
    sub: string;
    token: string;
    role: string;
    restaurantId: string;
}

@Injectable()
export class RestaurantMiddleware implements NestMiddleware {
    constructor(private readonly restaurantsService: RestaurantsService) { }

    use(req: Request, res: Response, next: NextFunction) {
        const token = req.headers.authorization?.split(' ')[1];

        if (token) {
            try {
                const decoded = verify(token, process.env.JWT_SECRET_KEY!) as JwtPayload;
                const isValid = this.validateRestaurantId(decoded.restaurantId)

                if (isValid != null) {
                    req.user = decoded.restaurantId
                }

            } catch (error) {
                throw new UnauthorizedException(MessagesHelper.TOKEN_INVALID)
            }
        }

        next();
    }

    private async validateRestaurantId(restaurantIdHeader: string | undefined): Promise<Restaurant | null> {
        if (restaurantIdHeader != undefined) {
            const Restaurant = await this.restaurantsService.getRestaurantById(restaurantIdHeader)
            if (Restaurant) {
                return Restaurant
            }
        }
        return null
    }
}

