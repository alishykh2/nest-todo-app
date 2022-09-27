import { IsString, IsIn } from 'class-validator';
import { ETodoStatus } from '../enum';

export class ChangeStatusTodoDto {
  @IsString()
  @IsIn([ETodoStatus.NEW, ETodoStatus.IN_PROGRESS, ETodoStatus.Done])
  public status: string;
}
