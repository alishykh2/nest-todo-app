import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';

import { User } from 'src/users/entities/user.entity';
import { PoliciesGuard } from 'src/ability/guards/abilities.guard';
import { CheckPolicies } from 'src/ability/decorators/abilities.decorator';
import { Roles } from 'src/role/decorators/roles.decorator';
import { ERole } from 'src/role/enums';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dto';
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';
import { Public } from 'src/auth/decorators/public.dedorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  /**
   *
   * @description - used to create user
   *
   * @param createTodoDto - object conating the todo data
   *
   * @return - return data or throw an error
   *
   */
  @Post()
  @Roles(ERole.Admin)
  create(@Body() createTodoDto: CreateUserDto) {
    try {
      return this.userService.create(createTodoDto);
    } catch (error) {
      throw error;
    }
  }

  /**
   *
   * @description - used to get All users
   *
   *
   * @return - return data or throw an error
   *
   */
  @Get()
  @Roles(ERole.Admin)
  findAll() {
    try {
      return this.userService.findAll();
    } catch (error) {
      throw error;
    }
  }

  /**
   *
   * @description - used to get the single user
   *
   * @param id - user id
   *
   * @return - return data or throw an error
   *
   */
  @Get(':id')
  @Roles(ERole.Admin)
  findOne(@Param('id') id: string) {
    try {
      return this.userService.getSingle(+id);
    } catch (error) {
      throw error;
    }
  }

  /**
   *
   * @description - used to upate the user
   *
   * @param id - user id
   * @param updateTodoDto - object containing updated data
   *
   * @return - return data or throw an error
   *
   */
  @Patch(':id')
  @Roles(ERole.Admin)
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateUserDto) {
    try {
      return this.userService.update(+id, updateTodoDto);
    } catch (error) {
      throw error;
    }
  }

  /**
   *
   * @description - used to delete the user
   *
   * @param id - user id
   *
   * @return - return message or throw an error
   *
   */
  @Delete(':id')
  @Roles(ERole.Admin)
  async remove(@Param('id') id: string) {
    try {
      await this.userService.remove(+id);
      return {
        message: 'User Deleted Successfully',
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   *
   * @description - used to restore the todo
   *
   * @param id - user id
   *
   * @return - return message
   *
   */
  @Post(':id/restore')
  @Roles(ERole.Admin)
  async restore(@Param('id') id: string) {
    await this.userService.restore(+id);
    return {
      message: 'User restored successfully',
    };
  }
}
