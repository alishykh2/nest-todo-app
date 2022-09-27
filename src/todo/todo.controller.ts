import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

import { Roles } from 'src/role/decorators/roles.decorator';
import { ERole } from 'src/role/enums';
import { ChangeStatusTodoDto } from './dto/change-status-todo.dto';
import { GetUser } from 'src/auth/utils';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  /**
   *
   * @description - used to create the todo
   *
   * @param createTodoDto - object containing the create todo data
   *
   * @return - return data and message
   *
   */
  @Post()
  // @UseGuards(PoliciesGuard)
  // @CheckPolicies((ability: AppAbility) => ability.can(Action.Create, User))
  async create(@Body() createTodoDto: CreateTodoDto) {
    try {
      return {
        message: 'Todo created successfully',
        data: await this.todoService.create(createTodoDto),
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   *
   * @description - used to get all the todo's
   *
   *
   * @return - return All the todo's data
   */
  @Get()
  @Roles(ERole.Admin)
  findAll() {
    try {
      return this.todoService.findAll();
    } catch (error) {
      throw error;
    }
  }

  /**
   *
   * @description - used to get all the todo's
   *
   *
   * @return - return All the todo's data
   */
  @Get(':id/user')
  @Roles(ERole.Admin)
  getUsersAllTodo(@Param('id') id: number) {
    try {
      return this.todoService.findAll({
        where: {
          userId: id,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  /**
   *
   * @description - used to get the single todo
   *
   * @param id - todo id
   *
   * @return - return data
   *
   */
  @Get(':id')
  @Roles(ERole.Admin, ERole.User)
  findOne(@Param('id') id: number) {
    try {
      return this.todoService.findOne(+id);
    } catch (error) {
      throw error;
    }
  }

  /**
   *
   * @description - used to update the todo
   *
   * @param id - todo id
   * @param updateTodoDto - object containing the update todo data
   *
   * @return - return data and message
   *
   */
  @Patch(':id')
  @Roles(ERole.Admin)
  async update(
    @Param('id') id: number,
    @Body() updateTodoDto: UpdateTodoDto,
    @GetUser() user,
  ) {
    try {
      return {
        message: 'Todo updated successfully',
        data: await this.todoService.update(+id, updateTodoDto, user),
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   *
   * @description - used to change todo status
   *
   * @param id - todo id
   * @param changeStatusTodoDto - object containing the status of todo
   *
   * @return - return data and message
   *
   */
  @Post(':id/change-status')
  @Roles(ERole.User)
  async changeStatus(
    @Param('id') id: string,
    @Body() changeStatusTodoDto: ChangeStatusTodoDto,
    @GetUser() user,
  ) {
    try {
      return {
        message: 'Status Updated successfully',
        data: await this.todoService.updateStatus(
          +id,
          changeStatusTodoDto,
          user,
        ),
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   *
   * @description - used to delete the todo
   *
   * @param id - todo id
   *
   * @return - return message
   *
   */
  @Delete(':id')
  @Roles(ERole.Admin)
  async remove(@Param('id') id: string) {
    try {
      await this.todoService.remove(+id);
      return {
        message: 'Todo deleted successfully',
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   *
   * @description - used to restore the todo
   *
   * @param id - todo id
   *
   * @return - return message
   *
   */
  @Post(':id/restore')
  @Roles(ERole.Admin)
  async restore(@Param('id') id: string) {
    try {
      await this.todoService.restore(+id);
      return {
        message: 'Todo restored successfully',
      };
    } catch (error) {
      throw error;
    }
  }
}
