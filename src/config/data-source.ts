import { User } from '../users/entities/user.entity';
import { Role } from '../roles/entities/role.entity'; 
import {config} from 'dotenv';
import { config as dotenvConfig } from 'dotenv';
import { DataSource } from "typeorm";
dotenvConfig({ path: '.env' });
config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '123',
  database: 'reservation',
  entities: [User,Role],
  synchronize: true,
});