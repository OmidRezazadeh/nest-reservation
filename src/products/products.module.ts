import { forwardRef, Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { User } from 'src/users/entities/user.entity';
import { UsersModule } from 'src/users/users.module';
import { TaskModule } from '../task/task.module';
import { RedisService } from 'src/redis/redis.service';
import { TaskService } from 'src/task.service';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forFeature([Product, User]),
    UsersModule,
    forwardRef(() => TaskModule), // Use forwardRef to handle circular dependency
  ],
  controllers: [ProductsController],
  providers: [ProductsService,RedisService,TaskService],
  exports: [ProductsService], // Export if used elsewhere

})
export class ProductsModule {}
