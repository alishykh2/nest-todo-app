import { Column, Model, Table, HasMany, Unique } from 'sequelize-typescript';
import { TodoModel } from 'src/todo/models';

@Table({
  paranoid: true,
})
export class UserModel extends Model {
  paranoid: true;

  @Column
  name: string;

  @Unique('username')
  @Column
  username: string;

  @Column
  password: string;

  @Column
  role: string;

  @Column({ defaultValue: true })
  isActive: boolean;

  @HasMany(() => TodoModel)
  todos: TodoModel[];
}
