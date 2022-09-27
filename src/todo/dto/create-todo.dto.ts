import { IsNotEmpty, IsString, IsIn, IsOptional } from 'class-validator';
import { ETodoStatus } from '../enum';

export class CreateTodoDto {
  @IsString()
  @IsNotEmpty()
  public title: string;

  @IsString()
  @IsNotEmpty()
  public description: string;

  @IsString()
  @IsNotEmpty()
  public userId: string;

  @IsString()
  public date: string;

  @IsOptional()
  @IsString()
  @IsIn([ETodoStatus.NEW, ETodoStatus.IN_PROGRESS, ETodoStatus.Done])
  public status: string;
}
