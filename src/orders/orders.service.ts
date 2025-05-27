import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from './entities/order.entity';
import { Model } from 'mongoose';
import { User } from 'src/users/entities/user.entity';
import { Product } from 'src/products/entities/product.entity';

@Injectable()
export class OrdersService {

  constructor(
    @InjectModel(Order.name) private orderSchema: Model<Order>,
    @InjectModel(User.name) private userSchema: Model<User>,
    @InjectModel(Product.name) private productSchema: Model<Product>
  ){}

  findAll() {
    return this.orderSchema.find();
  }

  findOne(id: string) {
    return this.orderSchema.findById(id);
  }

  // async productBuy(){
  //  
  //}
}
