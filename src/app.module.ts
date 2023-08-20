import { Module } from '@nestjs/common';
import { PrismaModule } from './modules/prisma/prisma.module';
import { AuthsModule } from './modules/auths/auths.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [UsersModule, PrismaModule, AuthsModule],
})
export class AppModule { }
