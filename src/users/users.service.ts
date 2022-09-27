import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserModel } from './models';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto, UpdateUserDto } from './dto';
import { encrytPassword } from 'src/auth/utils';
import { TodoModel } from 'src/todo/models';
import { Sequelize } from 'sequelize';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UserModel)
    private userModel: typeof UserModel,
  ) {}

  /**
   *
   * @description - used to get the single user
   *
   * @param data - object for the options
   *
   * @return - return data or throw an error
   *
   */
  async findOne(data: any) {
    try {
      const user = await this.userModel.findOne(data);
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      return user;
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
  async findAll(): Promise<UserModel[]> {
    try {
      return this.userModel.findAll({
        attributes: {
          include: [],
          exclude: ['password', 'deletedAt'],
        },
      });
    } catch (error) {
      throw error;
    }
  }

  /**
   *
   * @description - used to create the user
   *
   * @param createUserDto - object containing the create user data
   *
   * @return - return data or throw an error
   *
   */
  async create(createUserDto: CreateUserDto) {
    try {
      console.log('creating user');
      createUserDto.password = await encrytPassword(createUserDto.password);

      const user = await this.userModel.create({
        ...createUserDto,
      });
      return user;
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        throw new BadRequestException([error.errors[0].message]);
      }
      throw error;
    }
  }

  /**
   *
   * @description - used to update the todo
   *
   * @param id - user id
   * @param updateUserDto - object containing the create todo data
   *
   * @return - return data or throw an error
   *
   */
  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.userModel.findByPk(id);
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      user.name = updateUserDto.name;
      user.username = updateUserDto.username;
      await user.save();
      return user;
    } catch (error) {
      throw error;
    }
  }

  /**
   *
   * @description - used to soft delete the todo
   *
   * @param id - user id
   *
   * @return - return data or throw an error
   *
   */
  async remove(id: number) {
    try {
      const check = await this.userModel.destroy({ where: { id } });
      if (!check) throw new NotFoundException('User not found');
      return true;
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

  async getSingle(id: number) {
    try {
      const user = await this.userModel.findByPk(id, {
        attributes: {
          exclude: ['password', 'deletedAt'],
        },
        include: [
          {
            model: TodoModel,
            attributes: ['id', 'title', 'description', 'status'],
          },
        ],
      });
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      return user;
    } catch (error) {
      throw error;
    }
  }

  /**
   *
   * @description - used to restore the user
   *
   * @param id - user id
   *
   * @return - return the user or throw error on exception
   *
   */
  restore(id: number) {
    try {
      return this.userModel.restore({ where: { id } });
    } catch (error) {
      throw error;
    }
  }
}
