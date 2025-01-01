import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards, Put } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from 'src/jwt-auth/jwt-auth.guard';
import { RolesGuard } from 'src/roles/roles.guard';
import { Roles } from 'src/roles/roles.decorator';
import { RoleEnum } from 'src/roles/enums/roles.enums';


@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @Roles(RoleEnum.ADMIN)
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Post('create')
  async create(@Request() request, @Body() createProductDto: CreateProductDto) {
    const userId = request.user.id; // Extract user ID from the request
    return this.productsService.create(createProductDto, userId);
  }

  @Get('list')
   async findAll() {
    return await this.productsService.findAll();
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
