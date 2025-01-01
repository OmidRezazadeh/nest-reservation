import { Product } from 'src/products/entities/product.entity';
import { RoleEnum } from 'src/roles/enums/roles.enums';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany
} from "typeorm";


@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ length: 50 })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ length: 100 })
  password: string;

  @Column({ default: 'active' })
  status: string; // 'active', 'inactive', etc.
  

  @Column({ nullable: true, default:RoleEnum.USER })
  role_name: string;

  @OneToMany(() => Product, (product) => product.user, { cascade: true })
  products: Product[];

  @CreateDateColumn()
  created_at: Date; // Automatically set when created

  @UpdateDateColumn()
  updated_at: Date; // Automatically updated on save




}
