import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import { Product } from './products/entities/product.entity';
import { User } from './users/entities/user.entity';
import{ChatMessage} from './chat/chatMessage'
import { RedisModule } from './redis/redis.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TaskModule } from './task/task.module';
import { TaskService } from './task.service';
import { BullModule } from '@nestjs/bullmq';
import { QueueModule } from './queue/queue.module';
import { EventsModule } from './events/events.module';
import { ChatModule } from './chat/chat.module';



@Module({
  imports: [
    EventsModule,
    BullModule.forRoot({
      connection: {
        host: 'localhost',
        port: 6379,
      },
    }),

    forwardRef(() => TaskModule),
    forwardRef(() => ProductsModule),
    ScheduleModule.forRoot(),
    // RedisModule,
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User, Product,ChatMessage],
      synchronize: true,
    }),

    UsersModule,
    ProductsModule,
    AuthModule,  
    RedisModule,
    QueueModule,
    ChatModule,
  ],
  providers:[TaskService],
  exports: [TaskService],
})
export class AppModule {}
