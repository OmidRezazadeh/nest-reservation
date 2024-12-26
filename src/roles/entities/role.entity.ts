
import { User } from "../../users/entities/user.entity";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
   OneToMany
} from "typeorm";

  @Entity()
  export class Role {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({unique: true})
    name: string;

    @OneToMany(() => User,(user) => user.role)
    users: User[];

}
