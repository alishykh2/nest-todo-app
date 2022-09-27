import { Controller, Get, Request, Post, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { Public } from './auth/decorators/public.dedorator';
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  // @UseGuards(LocalAuthGuard)
  @Public()
  getHello(@Request() req): string {
    console.log('Hello ' + JSON.stringify(req.user));
    return this.appService.getHello();
  }
}
