import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService,
  ) {}

  @EventPattern('order-created')
  async orderCreatedProduct(@Payload() message:any) {
    try {
    console.log('Recebido: ', message)

    const { productId, quantity } = message

    await this.productsService.decreaseQuantity(productId, quantity);
    
    } catch (error) {
      console.error(error)
    }
  }

  @Post('/register')
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Patch('update-stock/:id')
  updateStock(@Param('id') id:string, @Body('stock') stock: number) {
    const updateDto = new UpdateProductDto()
    updateDto.stock = stock
    return this.productsService.updateStock(id, updateDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
