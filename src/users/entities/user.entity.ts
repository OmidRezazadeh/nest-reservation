import { Role } from '../../roles/entities/role.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';


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

  @OneToOne(() => Role, (role) => role.user)
  @JoinColumn()
  role: Role;
}
