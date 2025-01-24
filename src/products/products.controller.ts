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
  InternalServerErrorException,
  Inject,
  Query,
  forwardRef,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from 'src/jwt-auth/jwt-auth.guard';
import { RolesGuard } from 'src/roles/roles.guard';
import { Roles } from 'src/roles/roles.decorator';
import { RoleEnum } from 'src/roles/enums/roles.enums';
import { DataSource, QueryRunner } from 'typeorm';
import { RedisService } from '../redis/redis.service';
import {  RedisKeys } from 'src/redis/redis-keys.constants';
import { TaskService } from '../task.service';
@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly dataSource: DataSource,
    private readonly redisService: RedisService,
    @Inject(forwardRef(() => TaskService))
    private readonly taskService: TaskService
  ) {

    }


  @Post('add')
   add(
    @Body() body: { name: string; cronTime: string; message: string }
  ){
     const { name, cronTime, message } = body;
      this.taskService.addCronJob(name, cronTime)
      console.log(`Dynamic Cron job "${name}" executed: ${message}`);
    return { message: `Cron job "${name}" added with schedule "${cronTime}"` };
  }
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

          // Cache the newly created product
          const productCacheKey = RedisKeys.PRODUCTS_LIST;
          await this.redisService.deleteValue(productCacheKey);
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
  async findAll(
    @Query('page') page: string = '1', // Default to 1 if not provided
    @Query('limit') limit: string = '10', // Default to 10 if not provided
  ) {
 
  const productCacheList= RedisKeys.PRODUCTS_LIST
    const cachedProducts = await this.redisService.getValue(productCacheList);
    if (cachedProducts) {
      console.log('Returning products from Redis cache');
      return JSON.parse(cachedProducts);
    }
    const pageNumber = parseInt(page); // Convert to number
    const limitNumber = parseInt(limit); // Convert to number

    const products = await this.productsService.findAll(pageNumber, limitNumber);
    await this.redisService.setValue(productCacheList, JSON.stringify(products));
    return products;
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    const cacheKey = RedisKeys.PRODUCT_BY_ID(id);
    await this.redisService.deleteValue(cacheKey);
    const listCacheKey = RedisKeys.PRODUCTS_LIST;
    await this.redisService.deleteValue(listCacheKey);
    return this.productsService.remove(id);
  }
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.productsService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateProductDto: UpdateProductDto) {
    
     await this.productsService.update(id, updateProductDto);
     const listCacheKey = RedisKeys.PRODUCTS_LIST;
    await this.redisService.deleteValue(listCacheKey);

  }

}
