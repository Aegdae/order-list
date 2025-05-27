import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductStatus } from './entities/product.entity';
import { Model } from 'mongoose';

@Injectable()
export class ProductsService {

  constructor(
    @InjectModel(Product.name) private productSchema: Model<Product>
  ){}

  create(createProductDto: CreateProductDto) {
    return this.productSchema.create({
      name: createProductDto.name,
      description: createProductDto.description,
      quantity: createProductDto.quantity,
      pStatus: ProductStatus.AVAILABLE
    });
  }

  findAll() {
    return this.productSchema.find();
  }

  findOne(id: string) {
    return this.productSchema.findById(id);
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: string) {
    return `This action removes a #${id} product`;
  }
}
