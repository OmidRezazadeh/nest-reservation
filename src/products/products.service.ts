import { Get, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository, QueryRunner } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async updateTitle(productId:number,queryRunner:QueryRunner){
    await queryRunner.manager.update(Product,productId,{
      title:"ok"
    });

  }
  async create(createProductDto: CreateProductDto, userId: number , queryRunner: QueryRunner) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error('User not found');
    }

    const product = queryRunner.manager.save(Product,{
      ...createProductDto,
      user,
    });
    return product;
  }

   async findAll(page: number, limit: number) {
    console.log(page,limit);
    const skip = (page - 1) * limit;

   const [data,total]= await this.productRepository.findAndCount({
      relations:['user'],
      take: limit,
      skip: skip,
    });

    return {
      data,
      total,
      page,
      lastPage: Math.ceil(total / limit),
    };
  }


  findOne(id: number) {
    return this.productRepository.findOne({
      where:{id},
      relations:['user']
    });
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    console.log()
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

