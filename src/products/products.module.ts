import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { User } from 'src/users/entities/user.entity';
import { UsersModule } from 'src/users/users.module';

import { RedisService } from 'src/redis/redis.service';

@Module({
  imports: [

    TypeOrmModule.forFeature([Product, User]),
    UsersModule,
  ],
  controllers: [ProductsController],
  providers: [ProductsService,RedisService],
})
export class ProductsModule {}
