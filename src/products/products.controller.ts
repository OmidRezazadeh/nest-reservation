import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Request,
  UseGuards,
  Put,
  InternalServerErrorException,Inject} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from 'src/jwt-auth/jwt-auth.guard';
import { RolesGuard } from 'src/roles/roles.guard';
import { Roles } from 'src/roles/roles.decorator';
import { RoleEnum } from 'src/roles/enums/roles.enums';
import { DataSource, QueryRunner } from 'typeorm';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly dataSource: DataSource,

    @Inject(CACHE_MANAGER) private cacheManager: Cache
   
  ) {}
  @Roles(RoleEnum.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('create')
  async create(@Request() request, @Body() createProductDto: CreateProductDto) {
    const queryRunner: QueryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const userId = request.user.id;
      const product = this.productsService.create(
        createProductDto,
        userId,
        queryRunner,
      );


      const productId = (await product).id;
      await this.productsService.updateTitle(productId, queryRunner);
      await queryRunner.commitTransaction();
      return product;
    } catch (error) {
      // Rollback the transaction on error
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(
        'Transaction failed, changes rolled back.',
      );
    } finally {
      // Release the queryRunner
      await queryRunner.release();
    }
  }

  @Get('list')
  async findAll() {
    const cacheKey = 'all-products';
    const cachedData = await this.cacheManager.get('all-products');
  
  
    if (cachedData) {
      console.log('Returning data from cache:', cachedData);
      return { source: 'cache', value: cachedData };
    }
  
    console.log('Fetching data from the database');
    const products = await this.productsService.findAll();
  
    await this.cacheManager.set(cacheKey, products);
    console.log('Data cached:', products);
  
    return products;
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.productsService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.productsService.remove(id);
  }
}
