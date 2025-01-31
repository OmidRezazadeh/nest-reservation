import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserRepository } from './user.repository';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserSubscriber } from './subscribers/user-subscriber';
import { DateService } from 'src/date/DateService';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [UserRepository, UsersService,UserSubscriber,DateService],
    exports: [UserRepository, UsersService],
    controllers: [UsersController]
})
export class UsersModule {}
