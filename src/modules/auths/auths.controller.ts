import { Req, Post, Controller, Body, UseGuards } from '@nestjs/common';
import { AuthsService } from './auths.service';
import { LocalGuard } from './strategies/local/local.guard';

@Controller('api/auth')
@UseGuards(LocalGuard)
export class AuthsController {
  constructor(private readonly authsService: AuthsService) { }

  @Post('login')
  async login(@Req() req: any) {
    return this.authsService.authUser(req.user);
  }
}
