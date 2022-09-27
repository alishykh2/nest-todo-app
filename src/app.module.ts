import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TodoModule } from './todo/todo.module';
import { AbilityModule } from './ability/ability.module';
import { User } from './users/entities/user.entity';
import { RoleModule } from './role/role.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from './users/models';
import { TodoModel } from './todo/models';
@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: '',
      database: 'nest_todo_app_test',
      models: [UserModel, TodoModel],
      autoLoadModels: true,
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    TodoModule,
    AbilityModule,
    User,
    RoleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [User],
})
export class AppModule {}
