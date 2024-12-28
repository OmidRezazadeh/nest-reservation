import { User } from '../users/entities/user.entity';
import { Role } from '../roles/entities/role.entity'; 
import {config} from 'dotenv';
import { config as dotenvConfig } from 'dotenv';
import { DataSource } from "typeorm";
import { Product } from 'src/products/entities/product.entity';
dotenvConfig({ path: '.env' });
config();

export const AppDataSource = new DataSource({
  type:process.env.DB_TYPE as any,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [User,Role,Product],
  synchronize: true,
});