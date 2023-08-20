import { Module } from '@nestjs/common';
import { AuthsService } from './auths.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthsController } from './auths.controller';
import { JwtStrategy } from './strategies/jwt/jwt-strategy';
import { LocalStrategy } from './strategies/local/local.strategy';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { UsersService } from '../users/users.service';
import { UsersRepository } from '../users/users.repository';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    PassportModule,
    JwtModule.register({
      privateKey: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthsController],
  providers: [AuthsService, JwtStrategy, LocalStrategy, UsersService, UsersRepository],
})
export class AuthsModule { }
