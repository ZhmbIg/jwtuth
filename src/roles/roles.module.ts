import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from 'src/entities/role.entity';
import { RolesGuard } from 'src/auth/role.guard';
import { Reflector } from '@nestjs/core';

@Module({
  imports:[TypeOrmModule.forFeature([Role])] ,
  providers: [RolesService, RolesGuard, Reflector],
  controllers: [RolesController],
  exports: [RolesService]
})
export class RolesModule {}
