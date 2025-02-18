import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { relative } from 'path';
import { Role } from 'src/entities/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RolesService {

    constructor(
        @InjectRepository(Role) private roleRepository: Repository<Role>
    ){}

    async getAllRoles(): Promise<Role[]>{
        return await this.roleRepository.find()
    }

    async createRole(role: string, description: string): Promise<Role>{
        const existingRole = await this.roleRepository.findOne({where: {role}});
        if (existingRole){
            throw new BadRequestException('Такая роль уже существует');
        }
        const creationRole = await this.roleRepository.create({role: role, description:description })
        return this.roleRepository.save(creationRole)
    }
}
