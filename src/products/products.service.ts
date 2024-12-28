import { Get, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createProductDto: CreateProductDto, userId: number) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error('User not found');
    }

    const product = this.productRepository.save({
      ...createProductDto,
      user,
    });
    return product;
  }

  findAll() {
    return this.productRepository.find({
      relations:['user']
    });
  }

  findOne(id: number) {
    return this.productRepository.findOne({
      where:{id},
      relations:['user']
    });
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return this.productRepository.update({id},{...updateProductDto}) ;
  }

  async remove(id: number) {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    await this.productRepository.remove(product);
    return { message: `Product with ID ${id} has been deleted` };
  }


}

