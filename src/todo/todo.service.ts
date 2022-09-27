import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectModel } from '@nestjs/sequelize';
import { TodoModel } from './models';
import { ETodoStatus } from './enum';
import { UserModel } from 'src/users/models';
import { ChangeStatusTodoDto } from './dto/change-status-todo.dto';
import { User } from 'src/users/entities';
import { ERole } from 'src/role/enums';
@Injectable()
export class TodoService {
  constructor(
    @InjectModel(TodoModel)
    private todoModel: typeof TodoModel,
  ) {}

  /**
   *
   * @description: Use to create Todo
   *
   * @param createTodoDto  object containing todo data
   *
   * @return - return the created todo object or throw error on exception
   *
   */
  create(createTodoDto: CreateTodoDto) {
    try {
      return this.todoModel.create({
        ...createTodoDto,
        status: ETodoStatus.NEW,
      });
    } catch (error) {
      throw error;
    }
  }

  /**
   *
   * @description: Use to get All the todo's
   *
   * @param data - todo filter data
   *
   * @return - return the All todo's or throw error on exception
   *
   */
  findAll(data = {}) {
    try {
      return this.todoModel.findAll(data);
    } catch (error) {
      throw error;
    }
  }

  /**
   *
   * @description: Use to get single todo
   *
   *  @param id - todo id
   *
   * @return - return the todo or throw error on exception
   *
   */
  async findOne(id: number) {
    try {
      const todo = await this.todoModel.findOne({
        where: { id: id },
        include: [{ model: UserModel, attributes: ['name'] }],
      });
      if (!todo) {
        throw new NotFoundException('Todo not found');
      }
      return todo;
    } catch (error) {
      throw error;
    }
  }

  /**
   *
   * @description: This is the helper function Use to check the validity of the todo
   *
   * @param id - todo id
   * @param user - instance of current logged in user
   *
   * @return - return the todo or throw error on exception
   *
   */
  async checkTodoValidatety(id: number, user: User) {
    try {
      const todo = await this.findOne(id);
      if (todo.status === ETodoStatus.Done)
        throw new BadRequestException("You can't update this todo");
      if (user.role !== ERole.Admin && todo.userId !== user.id) {
        throw new UnauthorizedException(
          'You are not allowed to update this todo',
        );
      }

      return todo;
    } catch (error) {
      throw error;
    }
  }

  /**
   *
   * @description - used to update the todo
   *
   * @param id - todo id
   * @param updateTodoDto - object of the todo with updated data
   * @param user - instance of current logged in user
   *
   * @return - return the updated todo or throw error on exception
   *
   */
  async update(id: number, updateTodoDto: UpdateTodoDto, user: User) {
    try {
      const todo = await this.checkTodoValidatety(id, user);
      todo.title = updateTodoDto.title;
      todo.description = updateTodoDto.description;
      await todo.save();

      return todo;
    } catch (error) {
      throw error;
    }
  }

  /**
   *
   * @description - used to update the todo status
   *
   * @param id - todo id
   * @param statusDto - contains the status of the todo
   * @param user - instance of current logged in user
   *
   * @return - return the updated todo or throw error on exception
   *
   */
  async updateStatus(id: number, statusDto: ChangeStatusTodoDto, user: User) {
    try {
      const todo = await this.checkTodoValidatety(id, user);
      todo.status = statusDto.status;
      await todo.save();

      return todo;
    } catch (error) {
      throw error;
    }
  }

  /**
   *
   * @description - used to soft delete the todo
   *
   * @param id - todo id
   *
   * @return - return the true on delete or throw error on exception
   *
   */
  async remove(id: number) {
    try {
      const check = await this.todoModel.destroy({ where: { id } });
      if (!check) throw new NotFoundException('Todo not found');
      return true;
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
   * @return - return the todo or throw error on exception
   *
   */
  restore(id: number) {
    try {
      return this.todoModel.restore({ where: { id } });
    } catch (error) {
      throw error;
    }
  }
}
