import { Product } from 'src/products/entities/product.entity';
import { Role } from '../../roles/entities/role.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,

  JoinColumn, ManyToOne,OneToMany
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
  
  @Column({ nullable: true }) // Explicit foreign key
  roleId: number;

  @CreateDateColumn()
  created_at: Date; // Automatically set when created

  @UpdateDateColumn()
  updated_at: Date; // Automatically updated on save

  @ManyToOne(() =>Role,(role)=> role.users,{eager:true})
  role: Role;

  @OneToMany(() => Product, (product) => product.user, { cascade: true })
  products: Product[];
}
