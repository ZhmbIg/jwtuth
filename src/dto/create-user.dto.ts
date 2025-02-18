import { IsString, IsEmail, MinLength, MaxLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail({}, { message: 'Неверный формат email' })
  email: string;

  @IsString()
  @MinLength(6, { message: 'Пароль должен содержать минимум 6 символов' })
  @MaxLength(20, { message: 'Пароль не должен превышать 20 символов' })
  password: string;

  @IsString()
  @MinLength(3, { message: 'Роль должна содержать минимум 3 символа' })
  role: string;
}
