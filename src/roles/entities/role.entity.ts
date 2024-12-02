
import { User } from "../../users/entities/user.entity";
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToOne,
    JoinColumn,
  } from "typeorm";

  @Entity()
  export class Role {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({unique: true})
    name: string;

    @OneToOne(() => User,(user) => user.role)
    @JoinColumn()
    user: User;

}
