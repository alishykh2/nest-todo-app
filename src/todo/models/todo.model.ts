import {
  Column,
  Model,
  Table,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { UserModel } from 'src/users/models/user.model';

@Table({
  paranoid: true,
})
export class TodoModel extends Model {
  paranoid: true;

  @Column
  title: string;

  @Column
  description: string;

  @ForeignKey(() => UserModel)
  @Column
  userId: number;

  @BelongsTo(() => UserModel)
  public user: UserModel;

  @Column
  public date: Date;

  @Column
  public status: string;
}
