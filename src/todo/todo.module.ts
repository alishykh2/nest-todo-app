import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { TodoModel } from './models';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([TodoModel])],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}
