import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '../users/entities/user.entity';

@Entity()
export class ChatMessage {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.senderMessages)
  senderId: User;

  @ManyToOne(() => User, (user) => user.receivedMessages)
  receiverId: User;

  @Column()
  message: string;

  @CreateDateColumn()
  createdAt: Date;
}
