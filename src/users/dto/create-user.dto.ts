import { IsBoolean, IsNotEmpty, IsString, IsIn } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsString()
  @IsNotEmpty()
  public username: string;

  @IsString()
  @IsNotEmpty()
  public password: string;

  @IsString()
  @IsNotEmpty()
  @IsIn(['user', 'admin'])
  public role: string;

  @IsBoolean()
  public isActive: boolean;
}
