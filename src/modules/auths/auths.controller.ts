import { Req, Post, Controller, UseGuards, Res, HttpCode } from '@nestjs/common';
import { AuthsService } from './auths.service';
import { LocalGuard } from './strategies/local/local.guard';
import { Response } from 'express';

@Controller('api/auth')
@UseGuards(LocalGuard)
export class AuthsController {
  constructor(private readonly authsService: AuthsService) { }

  @Post('login')
  @HttpCode(200)
  async login(@Req() req: any, @Res({ passthrough: true }) response: Response) {
    const jwt = await this.authsService.authUser(req.user);
    response.cookie('jwt', jwt, { httpOnly: true, maxAge: 3600000, sameSite: 'strict' })
  }
}
