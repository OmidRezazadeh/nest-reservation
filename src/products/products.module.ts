import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { User } from 'src/users/entities/user.entity';
import { UserRepository } from 'src/users/user.repository';

@Module({
  imports:[TypeOrmModule.forFeature([Product,User])],
  controllers: [ProductsController],
  providers: [ProductsService,UserRepository],
})
export class ProductsModule {}
