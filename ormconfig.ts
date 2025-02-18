import { DataSource } from 'typeorm';
import { config } from 'dotenv';

config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5000,
  username: process.env.DB_USER || 'nestuser',
  password: process.env.DB_PASSWORD || '123',
  database: process.env.DB_NAME || 'nestdb',
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/migrations/*.js'],
  synchronize: true,
});
