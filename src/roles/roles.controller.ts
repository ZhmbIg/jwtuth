import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { Role } from 'src/entities/role.entity';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/role.guard';

@Controller('roles')
@UseGuards(RolesGuard)
export class RolesController {
  constructor(private readonly roleService: RolesService) {}

  @Get('getAll')
  async getAll(): Promise<Role[]> {
    return await this.roleService.getAllRoles();
  }

  @Post('create')
  @Roles('admin') // пример использования декоратора ролей
  async register(@Body() body: { role: string; description: string }) {
    return this.roleService.createRole(body.role, body.description);
  }
}
