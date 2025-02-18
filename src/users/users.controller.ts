import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from 'src/dto/create-user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get('getAll')
    async getAll(){
        return this.usersService.getAll()
    }

    @Post('register')
    async register(@Body() createUserDto: CreateUserDto) {
      return this.usersService.createUser(createUserDto);
    }
}
