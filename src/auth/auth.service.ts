import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { comparePassword } from './utils';
import { LoginDto } from './dto';
import { RegisterDto } from './dto/register.dto';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    try {
      const user = await this.usersService.findOne({
        where: {
          username: username,
        },
      });
      if (!(await comparePassword(password, user.password))) {
        throw new BadRequestException(401, 'Invalid Credentials');
      }
      if (!user.isActive) {
        throw new UnauthorizedException();
      }
      return user;
    } catch (error) {
      throw error;
    }
  }

  async login(loginDto: LoginDto) {
    try {
      const user = await this.validateUser(
        loginDto.username,
        loginDto.password,
      );
      const payload = {
        name: user.name,
        username: user.username,
        id: user.id,
        role: user.role,
      };

      return {
        access_token: this.jwtService.sign(payload),
        user: payload,
      };
    } catch (error) {
      throw error;
    }
  }

  async register(registerDto: RegisterDto) {
    try {
      await this.usersService.create(registerDto);
      return {
        message: 'User registerted',
      };
    } catch (error) {
      throw error;
    }
  }
}
