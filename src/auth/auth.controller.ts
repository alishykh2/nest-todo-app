import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';
import { Public } from 'src/auth/decorators/public.dedorator';
import { AuthService } from './auth.service';
import { LoginDto } from './dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   *
   * @description - used for login
   *
   * @param loginDto - login dto
   *
   * @return - return All the access_token and info
   */
  @Post('/login')
  @Public()
  @UseGuards(LocalAuthGuard)
  login(@Body() loginDto: LoginDto) {
    try {
      return this.authService.login(loginDto);
    } catch (error) {
      throw error;
    }
  }

  /**
   *
   * @description - used for register
   *
   * @param regisetrDto - register dto
   *
   * @return - return created user
   */
  @Post('/register')
  @Public()
  @UseGuards(LocalAuthGuard)
  register(@Body() regisetrDto: RegisterDto) {
    try {
      return this.authService.register(regisetrDto);
    } catch (error) {
      throw error;
    }
  }
}
