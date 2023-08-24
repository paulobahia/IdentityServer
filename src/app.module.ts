import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { PrismaModule } from './modules/prisma/prisma.module';
import { AuthsModule } from './modules/auths/auths.module';
import { UsersModule } from './modules/users/users.module';
import { RestaurantsModule } from './modules/restaurants/restaurants.module';
import { RestaurantMiddleware } from './middlewares/restaurant-id.middleware';
import { RestaurantsService } from './modules/restaurants/restaurants.service';
import { RestaurantsRepository } from './modules/restaurants/restaurants.repository';

@Module({
  imports: [UsersModule, PrismaModule, AuthsModule, RestaurantsModule],
  providers: [RestaurantsService, RestaurantsRepository]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RestaurantMiddleware).forRoutes('*');
  }
}
