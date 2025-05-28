import { Injectable, NotFoundException } from '@nestjs/common';
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

    return await this.productSchema.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          name: updateProductDto.name,
          description: updateProductDto.description,
        }
      }
    );
  }

  remove(id: string) {
    return this.productSchema.deleteOne({ _id: id});
  }

  // Atualizar o estoque
  async updateStock(id: string, updateProductDto: UpdateProductDto) {

    const product = await this.productSchema.findById(id)

    if (!product) {
      throw new NotFoundException("Product not found")
    }

    const newStock = updateProductDto.stock;
    const updateStatus = newStock > 0 ? ProductStatus.AVAILABLE : ProductStatus.SOLDOUT;

    return await this.productSchema.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          stock: newStock,
          pStatus: updateStatus
        }, 
      },
      { new: true }      
    );

  }


  // Função diminuir estoque apos a order
  async decreaseQuantity(id: string, quantity: number) {

    const product = await this.productSchema.findById(id);

    if(!product) {
      throw new NotFoundException("Product not found");
    }

    const newStock = product.stock -quantity
    const updateStatus = newStock > 0 ? ProductStatus.AVAILABLE : ProductStatus.SOLDOUT

    const result =  await this.productSchema.updateOne(
      { _id: id },
      { $set: { stock: newStock, pStatus: updateStatus }}
    );

    return result;
  }
}
