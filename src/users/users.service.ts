import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/entities/role.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/dto/create-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Role) private roleRepository: Repository<Role>
    ){}

    async getAll(): Promise<User[]> {
        return this.userRepository.find()
    }

    async createUser(createUserDto: CreateUserDto): Promise<User>{
        const {email, password, role} = createUserDto
        const existingUser = await this.userRepository.findOne({where: {email}});
        
        if (existingUser){
            throw new BadRequestException('Пользователь с таким email уже существует');
        }

        const roleEntity = await this.roleRepository.findOne({ where: { role: role } });
        if (!roleEntity) {
            throw new BadRequestException('Роль не найдена');
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const user = this.userRepository.create({
            email,
            password: hashPassword,
            roles: [roleEntity],
        });

        return await this.userRepository.save(user)
    }

}
