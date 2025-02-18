import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Role } from './entities/role.entity';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 5000,
      username: process.env.DB_USER || 'nestuser',
      password: process.env.DB_PASSWORD || 'nestpassword',
      database: process.env.DB_NAME || 'nestdb',
      entities: [User, Role],
      synchronize: true,
    }),
    UsersModule,
    RolesModule,
    AuthModule
  ],
})
export class AppModule {}
