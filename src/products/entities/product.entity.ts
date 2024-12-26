import { User } from "src/users/entities/user.entity";
import {PrimaryGeneratedColumn,Entity, Column, ManyToOne, JoinColumn } from "typeorm";
@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id:number;

    @Column({nullable:true})
    title:string;

    @Column({nullable:true})
    description:string;

    @Column({nullable:true})
    price:number;
    @JoinColumn({name:"user_id"})
    @ManyToOne(() => User, (user) => user.products, { onDelete: 'CASCADE' })
    user: User;
}
