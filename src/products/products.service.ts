import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductStatus } from './entities/product.entity';
import { Model } from 'mongoose';
import { CreateOrderDto } from 'src/orders/dto/create-order.dto';

@Injectable()
export class ProductsService {

  constructor(
    @InjectModel(Product.name) private productSchema: Model<Product>
  ){}
  // Criar o produto
  create(createProductDto: CreateProductDto) {
    return this.productSchema.create({
      name: createProductDto.name,
      description: createProductDto.description,
      stock: createProductDto.stock,
      pStatus: ProductStatus.AVAILABLE
    });
  }

  async findAll() {
    return this.productSchema.find();
  }

  findOne(id: string) {
    return this.productSchema.findById(id);
  }

  // Atualizar o produto
  async update(id: string, updateProductDto: UpdateProductDto) {

    const product = await this.productSchema.findById(id);
    if (!product) {
      throw new NotFoundException("Product not found")
    }

    return await this.productSchema.updateOne({
      name: updateProductDto.name,
      description: updateProductDto.description,
    });
  }

  remove(id: string) {
    return this.productSchema.deleteOne({ _id: id});
  }

  // Função para fazer pedido

  async decreaseQuantity(createOrderDto: CreateOrderDto): Promise<Product> {
    
    const product = await this.productSchema.findById(createOrderDto.productId)

    if(!product) {
      throw new NotFoundException("Product not found")
    }

    if(product.stock < createOrderDto.quantity) {
      throw new BadRequestException('Insufficient stock')
    }

    product.stock -= createOrderDto.quantity;

    if (product.stock === 0) {
      product.pStatus = ProductStatus.SOLDOUT
    }
    
    return product.save();
  }
}
